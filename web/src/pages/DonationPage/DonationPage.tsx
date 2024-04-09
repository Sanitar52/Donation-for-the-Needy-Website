import { Form, Submit, SubmitHandler, set } from '@redwoodjs/forms';
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web';
import { useEffect, useState } from 'react';
import { CreateDonationInput, CreateDonationInputVariables } from 'types/graphql';
import UsersCell from 'src/components/User/UsersCell';
import { toast, Toast, Toaster, useToaster } from '@redwoodjs/web/dist/toast';

const GET_INSTITUTIONS = gql`
  query FindInstitutions {
    institutions {
      id
      name
    }
  }
`;
const CREATE_DONATION_MUTATION = gql`
  mutation CreateDonationInput($input: CreateDonationInput!) {
    createDonation(input: $input) {
      id
      institutionId
      userId
      userBankId
      paymentMethod
      amount
    }
  }
`;
const GET_USERS = gql`
  query FindUsers {
    users {
      id
      name
    }
  }
`;
const GET_BANK_ACCOUNTS_BY_USER_ID = gql`
  query UserBanksByUserId($userId: Int!) {
    userBanksByUserId(userId: $userId) {
      id
      name
    }
  }
`;
const PaymentMethodModal = ({ isOpen, onClose, onConfirm }) => {
  const [userId, setUserId] = useState<Number>();
  const [user, setUser] = useState<any>('');
  const [bankAccount, setBankAccount] = useState<any>('');
  const [bankAccountId, setBankAccountId] = useState<Number>();
  const [userNameList, setUserNameList] = useState([]);
  const [userBankAccountList, setUserBankAccountList] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState('');

  const { loading: loadingUserData, error: userErrorData, data: userData } = useQuery(GET_USERS);

  const { loading: loadingUserBankData, error: userBankErrorData, data: userBankData } = useQuery(GET_BANK_ACCOUNTS_BY_USER_ID, {
    variables: { userId: userId },
    skip: !userId,
  });

  useEffect(() => {
    if (userData) {
      setUserNameList(userData.users.map((user) => user.name));
    }
  }, [userData]);


  const onUserChange = (userName) => {
    // Assuming userData is available and contains a users array
    const user = userData?.users.find((u) => u.name === userName);
    setUser(user.name);
    if (user) {
      setUserId(user.id); // This triggers the query for user banks
    }
  };
  useEffect(() => {
    if (userBankData) {
      // Assuming userBankData has a structure that includes a list of bank accounts
      setUserBankAccountList(userBankData?.userBanksByUserId?.map((bank) => bank.name));
    }
  }, [userBankData]);
  const onBankAccountChange = (bankAccount) => {
    console.log(bankAccount)
    setBankAccount(bankAccount);
    setBankAccountId(userBankData?.userBanksByUserId.find((bank) => bank.name === bankAccount).id);
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            {/* Icon or Image */}
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Select Payment Method</h3>
          <div className="mt-2">
            {/* User Type Dropdown */}
            <select value={user} onChange={(e) => onUserChange(e.target.value)} className="block w-full p-3 mt-2 border border-gray-300 rounded shadow-sm">
              <option>Select Which User You Are</option>
              {userNameList &&
                userNameList.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}

            </select>
            {/* Bank Account Dropdown */}
            <select value={bankAccount} onChange={(e) => { setBankAccount(e.target.value), onBankAccountChange(e.target.value) }} className="block w-full p-3 mt-2 border border-gray-300 rounded shadow-sm">
              <option>Select Bank Account</option>
              {userBankAccountList &&
                userBankAccountList.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              {/* Bank Account Options */}
            </select>
          </div>
          <div className="items-center px-4 py-3">
            <button id="ok-btn" onClick={() => onConfirm(user, bankAccount)} className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2">
              Confirm
            </button>
          </div>
          <div className="items-center px-4 py-3">
            <button id="close-btn" onClick={onClose} className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DonationPage = () => {
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<Number>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);
  const [userId, setUserId] = useState<Number>();
  const [user, setUser] = useState<any>('');
  const [bankAccount, setBankAccount] = useState<any>('');
  const [bankAccountId, setBankAccountId] = useState<Number>();

  const { loading: loadingInstitutionsData, error: institutionErrorData, data: institutionsData } = useQuery(GET_INSTITUTIONS);
  const { loading: loadingUserData, error: userErrorData, data: userData } = useQuery(GET_USERS);

  const { loading: loadingUserBankData, error: userBankErrorData, data: userBankData } = useQuery(GET_BANK_ACCOUNTS_BY_USER_ID, {
    variables: { userId: userId },
    skip: !userId,
  });


  const setUserIdAndBankAccountId = (userName: string, bankAccountName: string) => {
    const userDetails = userData?.users.find((u) => u.name === userName);
    setUserId(userDetails.id);
    const bankAccountDetails = userBankData?.userBanksByUserId.find((bank) => bank.name === bankAccountName);
    setBankAccountId(bankAccountDetails.id);
  }

  const [createDonation] = useMutation<
    CreateDonationInput,
    CreateDonationInputVariables>
    (CREATE_DONATION_MUTATION);
  const onSubmit: SubmitHandler<CreateDonationInput> = async () => {
    setIsLoading(true);
    const institutionId: number = parseInt(selectedInstitution.toString())
    try {
      await createDonation({
        variables: {
          input: {
            institutionId: institutionId,
            userId: userId,
            userBankId: bankAccountId,
            amount: parseFloat(amount),
            paymentMethod: selectedPaymentMethod,
            paymentStatus: 'Pending',
            donationDate: new Date(),
          },
        },
      });

      toast.success('Donation created', { duration: 5000 });
    }
    catch (error) {
      console.error('Failed to donate:', error);
      toast.error('Failed to donate');
    }
    finally {
      setIsLoading(false);
    }
  };

  if (loadingInstitutionsData) return <div>Loading...</div>;
  if (institutionErrorData) return <div>Error: {institutionErrorData.message}</div>;
  // Inside your DonationPage component, before the return statement


  return (
    <>
      <MetaTags title="Donation" description="Donation page" />

      <div className="min-h-screen bg-yellow-500">
        <div className="max-w-full mx-auto rounded-full">
          <div className="bg-white p-6 rounded-lg shadow-2xl ">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Donation</h2>
          </div>
        </div>

        <Form onSubmit={onSubmit} className="flex flex-col items-center justify-center min-h-screen pt-0 pb-10 -mt-40 rounded-lg">
          <div className="mb-6 w-full max-w-xs">
            <label htmlFor="selectedInstitution" className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Organisation
            </label>
            <select
              name="institutionId"
              id="institutionId"
              value={selectedInstitution}
              onChange={(e) => { setSelectedInstitution(e.target.value); }}
              className="block w-full p-3 border text-center border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
            >
              <option>Select an institution</option>
              {institutionsData?.institutions?.map((institution) => (
                <option key={institution.id} value={institution.id}>
                  {institution.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 w-full max-w-xs" onClick={() => setIsPaymentMethodModalOpen(true)}>
            <label htmlFor="selectedPaymentMethod" className="block text-sm font-medium text-gray-700 mb-2 text-center">Payment Method</label>
            <input
              readOnly
              value={selectedPaymentMethod}
              className="cursor-pointer block w-full p-3 text-center border border-gray-300 rounded shadow-sm focus:outline-none"
              placeholder="Select Payment Method"
            />
          </div>

          <div className="mb-6 w-full max-w-xs">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full p-3 border text-center border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
              placeholder="0,00 TL"
            />
          </div>
          <Submit
            disabled={isLoading}
            className={`${isLoading ? 'bg-gray-400 hover:bg-gray-400' : 'bg-white hover:bg-yellow-600'} mt-10 w-full max-w-md h-16 py-2 px-12 text-gray font-bold rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50`}
          >
            {isLoading ? 'Processing...' : 'Bağış Yap'}
          </Submit>
        </Form>

      </div>
      <PaymentMethodModal
        isOpen={isPaymentMethodModalOpen}
        onClose={() => setIsPaymentMethodModalOpen(false)}
        onConfirm={(user, bankAccount) => {

          // Process the selected options and close the modal
          setSelectedPaymentMethod(`${user} - ${bankAccount}`);
          console.log(user, bankAccount); // Or update state as needed
          setUserIdAndBankAccountId(user, bankAccount);
          setIsPaymentMethodModalOpen(false);
        }}
      />
    </>
  );
};

export default DonationPage;
``
