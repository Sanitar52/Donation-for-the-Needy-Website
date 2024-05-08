import { Form, Submit, SubmitHandler } from '@redwoodjs/forms'
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import {
  CreateDonationInput,
  CreateDonationInputVariables,
} from 'types/graphql'
import donatebg3 from '../../../public/donatebg3.png'
import { Toaster, toast } from '@redwoodjs/web/dist/toast'

const GET_INSTITUTIONS = gql`
  query FindInstitutions {
    institutions {
      id
      name
      logo
      balance
    }
  }
`
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
`
const GET_USERS = gql`
  query FindUsers {
    users {
      id
      name
    }
  }
`
const GET_BANK_ACCOUNTS_BY_USER_ID = gql`
  query UserBanksByUserId($userId: Int!) {
    userBanksByUserId(userId: $userId) {
      id
      name
      balance
    }
  }
`
const UPDATE_USER_BANK_BALANCE = gql`
  mutation UpdateUserBankBalance($id: Int!, $balance: Float!) {
    updateUserBankBalance(id: $id, balance: $balance) {
      id
      balance
    }
  }
`
const UPDATE_INSTITUTION_BALANCE = gql`
  mutation UpdateInstitutionBalance($id: Int!, $balance: Float!) {
    updateInstitutionBalance(id: $id, balance: $balance) {
      id
      balance
    }
  }
`
const ConfirmationModal = ({ isOpen, onConfirm, onCancel, details }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg max-w-sm mx-auto p-6 space-y-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Confirm Donation
        </h3>
        <p className="text-sm text-gray-500">
          Are you sure you want to donate {details.amount} to{' '}
          {details.institutionName}?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
const OrganisationModal = ({ isOpen, onClose, onConfirm }) => {
  const { loading, error, data } = useQuery(GET_INSTITUTIONS)

  if (!isOpen) return null
  if (loading) return <div>Loading institutions...</div>
  if (error) return <div>Error loading institutions: {error.message}</div>

  const handleChooseInstitution = (institutionId) => {
    onConfirm(institutionId)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Select Institution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {data.institutions.map((institution) => (
              <div
                key={institution.id}
                className="bg-white p-4 shadow rounded-lg flex flex-col items-center gap-2"
              >
                <img
                  src={institution.logo}
                  alt={institution.name}
                  className="h-20 w-20 object-cover rounded-full"
                />
                <h5 className="text-lg font-medium text-gray-900">
                  {institution.name}
                </h5>
                <button
                  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-auto"
                  onClick={() => handleChooseInstitution(institution.id)}
                >
                  Choose
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const PaymentMethodModal = ({ isOpen, onClose, onConfirm }) => {
  const [userId, setUserId] = useState<Number>()
  const [user, setUser] = useState<any>('')
  const [bankAccount, setBankAccount] = useState<any>('')
  const [bankAccountId, setBankAccountId] = useState<Number>()
  const [userNameList, setUserNameList] = useState([])
  const [userBankAccountList, setUserBankAccountList] = useState<any>([])
  const [selectedUser, setSelectedUser] = useState('')

  const { loading: loadingUserData, error: userErrorData, data: userData } =
    useQuery(GET_USERS)

  const {
    loading: loadingUserBankData,
    error: userBankErrorData,
    data: userBankData,
  } = useQuery(GET_BANK_ACCOUNTS_BY_USER_ID, {
    variables: { userId: userId },
    skip: !userId,
  })

  useEffect(() => {
    if (userData) {
      setUserNameList(userData.users.map((user) => user.name))
    }
  }, [userData])

  const onUserChange = (userName) => {
    const user = userData?.users.find((u) => u.name === userName)
    setUser(user.name)
    if (user) {
      setUserId(user.id)
    }
  }
  useEffect(() => {
    if (userBankData) {
      setUserBankAccountList(
        userBankData?.userBanksByUserId?.map((bank) => bank.name)
      )
    }
  }, [userBankData])
  const onBankAccountChange = (bankAccount) => {
    setBankAccount(bankAccount)
    setBankAccountId(
      userBankData?.userBanksByUserId.find((bank) => bank.name === bankAccount)
        .id
    )
  }
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            {/* Icon or Image */}
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Select Payment Method
          </h3>
          <div className="mt-2">
            <select
              value={user}
              onChange={(e) => {
                setBankAccount(null)
                if (e.target.value === 'Select Which User You Are') {
                  setUser(null)

                  return
                }
                onUserChange(e.target.value)
              }}
              className="block w-full p-3 mt-2 border border-gray-300 rounded shadow-sm"
            >
              <option>Select Which User You Are</option>
              {userNameList &&
                userNameList.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </select>
            <select
              value={bankAccount}
              onChange={(e) => {
                if (e.target.value === 'Select Bank Account') {
                  setBankAccount(null)
                  return
                }
                setBankAccount(e.target.value), onBankAccountChange(e.target.value)
              }}
              className="block w-full p-3 mt-2 border border-gray-300 rounded shadow-sm"
            >
              <option>Select Bank Account</option>
              {userBankAccountList &&
                userBankAccountList.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
            </select>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              onClick={() => onConfirm(user, bankAccount)}
              disabled={!user || !bankAccount}
              className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2"
            >
              {!user || !bankAccount ? 'Fill to Continue' : 'Confirm'}
            </button>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="close-btn"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const DonationPage = () => {
  const [selectedInstitution, setSelectedInstitution] = useState({
    id: '',
    name: '',
  })

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(
    false
  )
  const [isOrganisationModalOpen, setIsOrganisationModalOpen] = useState(false)
  const [userId, setUserId] = useState<Number>()
  const [bankAccountId, setBankAccountId] = useState<Number>()
  const [selectedBankAccountBalance, setSelectedBankAccountBalance] = useState<
    Number
  >()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmDetails, setConfirmDetails] = useState({
    amount: '',
    institutionName: '',
  })
  const [selectedInstitutionBalance, setSelectedInstitutionBalance] = useState<
    Number
  >()
  const [bankAccountName, setBankAccountName] = useState('')

  const {
    loading: loadingInstitutionsData,
    error: institutionErrorData,
    data: institutionsData,
  } = useQuery(GET_INSTITUTIONS)
  const {
    loading: loadingUserData,
    error: userErrorData,
    data: userData,
  } = useQuery(GET_USERS)
  const {
    loading: loadingUserBankData,
    error: userBankErrorData,
    data: userBankData,
  } = useQuery(GET_BANK_ACCOUNTS_BY_USER_ID, {
    variables: { userId: userId },
    skip: !userId,
  })

  useEffect(() => {
    if (userBankData) {
      const bankAccountDetails = userBankData?.userBanksByUserId.find(
        (bank) => bank.name === bankAccountName
      )
      setBankAccountId(bankAccountDetails.id)
      setSelectedBankAccountBalance(bankAccountDetails.balance)
    }
  }, [userId, bankAccountName])

  const setUserIdAndBankAccountId = (userName: string, bankAccountName: string) => {
    const userDetails = userData?.users.find((u) => u.name === userName)
    setUserId(userDetails.id)
    setBankAccountName(bankAccountName)
  }

  const [updateUserBankBalance] = useMutation(UPDATE_USER_BANK_BALANCE)
  const [updateInstitutionBalance] = useMutation(UPDATE_INSTITUTION_BALANCE)
  const [createDonation] = useMutation<CreateDonationInput, CreateDonationInputVariables>(
    CREATE_DONATION_MUTATION
  )

  const onSubmit: SubmitHandler<CreateDonationInput> = async () => {
    const amountValue = parseFloat(amount)
    if (isNaN(amountValue) || amountValue <= 0) {
      setAmountError(true)
      toast.error('Please enter a positive amount greater than zero')
      setIsLoading(false)
      return
    }

    setAmountError(false)
    setIsLoading(true)

    if (
      selectedInstitution.name === 'Select an institution' ||
      selectedPaymentMethod === '' ||
      amount === ''
    ) {
      toast.error('Lütfen eksik alanları doldurunuz')
      setIsLoading(false)
      return
    }
    if (selectedBankAccountBalance.valueOf() < parseFloat(amount)) {
      toast.error('Yetersiz bakiye')
      setIsLoading(false)
      return
    }
    const institutionName =
      institutionsData?.institutions.find(
        (inst) => inst.id === parseFloat(selectedInstitution.id)
      )?.name || ''
    const institutionBalance =
      institutionsData?.institutions.find(
        (inst) => inst.id === parseFloat(selectedInstitution.id)
      )?.balance || 0
    setSelectedInstitutionBalance(institutionBalance)

    setConfirmDetails({ amount, institutionName })
    setShowConfirmation(true)
  }

  const handleConfirmDonation = async () => {
    setShowConfirmation(false)
    setIsLoading(true)

    try {
      const institutionId = parseInt(selectedInstitution.id.toString())
      await createDonation({
        variables: {
          input: {
            institutionId,
            userId: userId,
            userBankId: bankAccountId,
            amount: parseFloat(amount),
            paymentMethod: selectedPaymentMethod,
            paymentStatus: 'Pending',
            donationDate: new Date(),
          },
        },
      })

      toast.success('Donation created successfully', { duration: 5000 })

      // Update the user bank balance
      const updatedBalance =
        Number(selectedBankAccountBalance) - parseFloat(amount)

      await updateUserBankBalance({
        variables: {
          id: bankAccountId,
          balance: updatedBalance,
        },
      })

      const updatedInstitutionBalance =
        Number(selectedInstitutionBalance) + parseFloat(amount)

      await updateInstitutionBalance({
        variables: {
          id: institutionId,
          balance: updatedInstitutionBalance,
        },
      })

      setSelectedInstitution({ id: '', name: '' })
      setSelectedPaymentMethod('')
      setAmount('')
    } catch (error) {
      console.error('Failed to donate:', error)
      toast.error('Failed to donate')
    } finally {
      setIsLoading(false)
    }
  }

  if (loadingInstitutionsData) return <div>Loading...</div>
  if (institutionErrorData) return <div>Error: {institutionErrorData.message}</div>

  return (
    <>
      <MetaTags title="Donation" description="Donation page" />

      <div
        className="min-h-screen bg-fixed bg-cover bg-center transition-all duration-300 relative justify-center items-center mt-48"
        style={{ backgroundImage: `url(${donatebg3})` }}
      >
        <Form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center min-h-screen pt-0 pb-10 -mt-40 rounded-lg"
        >
          <div
            className="mb-6 w-full max-w-xs"
            onClick={() => setIsOrganisationModalOpen(true)}
          >
            <label
              htmlFor="selectedInstitution"
              className="block text-sm font-medium text-gray-700 mb-2 text-center"
            >
              Organisation
            </label>
            <input
              name="institutionId"
              id="institutionId"
              readOnly
              placeholder="Select an institution"
              value={selectedInstitution.name}
              className="block w-full p-3 border text-center border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-yellow-500"
            />
          </div>

          <div
            className="mb-6 w-full max-w-xs"
            onClick={() => setIsPaymentMethodModalOpen(true)}
          >
            <label
              htmlFor="selectedPaymentMethod"
              className="block text-sm font-medium text-gray-700 mb-2 text-center"
            >
              Payment Method
            </label>
            <input
              readOnly
              value={selectedPaymentMethod}
              className="cursor-pointer block w-full p-3 text-center border border-gray-300 rounded shadow-sm focus:outline-none"
              placeholder="Select Payment Method"
            />
          </div>
          <div className="mb-6 w-full max-w-xs">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2 text-center"
            >
              Amount
            </label>
            <input
              type="text"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`block w-full p-3 border text-center ${
                amountError ? 'border-red-500' : 'border-gray-300'
              } rounded shadow-sm focus:outline-none focus:ring focus:ring-yellow-500`}
              placeholder="0,00 TL"
            />
          </div>

          <Submit
            disabled={isLoading}
            className={`${
              isLoading ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-600 hover:dark:bg-blue-800'
            } mt-10 w-full max-w-md h-16 py-2 px-12 text-gray font-bold rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50`}
          >
            {isLoading ? 'Processing...' : 'Bağış Yap'}
          </Submit>
        </Form>
      </div>
      <Toaster />
      <OrganisationModal
        isOpen={isOrganisationModalOpen}
        onClose={() => setIsOrganisationModalOpen(false)}
        onConfirm={(institutionId) => {
          const institution = institutionsData.institutions.find(
            (inst) => inst.id === institutionId
          )
          setSelectedInstitution({
            id: institutionId.toString(),
            name: institution.name,
          })
          setIsOrganisationModalOpen(false)
        }}
      />
      <PaymentMethodModal
        isOpen={isPaymentMethodModalOpen}
        onClose={() => setIsPaymentMethodModalOpen(false)}
        onConfirm={(user, bankAccount) => {
          setSelectedPaymentMethod(`${user} - ${bankAccount}`)
          setUserIdAndBankAccountId(user, bankAccount)
          setIsPaymentMethodModalOpen(false)
        }}
      />
      <ConfirmationModal
        isOpen={showConfirmation}
        onConfirm={handleConfirmDonation}
        onCancel={() => {
          setIsLoading(false)
          setShowConfirmation(false)
        }}
        details={confirmDetails}
      />
    </>
  )
}

export default DonationPage
