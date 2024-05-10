import { Link, routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import PaymentMethodModal from 'src/components/PaymentMethodModal/'
import GsmPhoneVerificationModal from 'src/components/GsmPhoneVerificationModal/'
import gsmbg2 from '../../../../web/public/gsmbg2.png'
import { Form, Submit } from '@redwoodjs/forms'
import { Toaster, toast } from '@redwoodjs/web/dist/toast'
import { useEffect } from 'react'
const INCREASE_USER_BANK_BALANCE_MUTATION = gql`
  mutation IncreaseUserBankBalance($id: Int!, $balance: Float!) {
    increaseUserBankBalance(id: $id, balance: $balance) {
      id
      balance
    }
  }
`
const GsmLoadBalancePage = () => {
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = React.useState(false)
  const [isGsmPhoneVerificationModalOpen, setIsGsmPhoneVerificationModalOpen] = React.useState(false)
  const [isGsmPhoneVerified, setIsGsmPhoneVerified] = React.useState(false)
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState('')
  const [userId, setUserId] = React.useState('')
  const [bankAccountId, setBankAccountId] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [isFormFilled, setIsFormFilled] = React.useState(false)
  const [amountError, setAmountError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    if (selectedPaymentMethod && amount && isGsmPhoneVerified) {
      setIsFormFilled(true)
    } else {
      setIsFormFilled(false)
    }
  }
  )


  const [updateUserBankBalance] = useMutation(INCREASE_USER_BANK_BALANCE_MUTATION, {
    onCompleted: () => {
      toast.success(`${amount}TL Added Successfully to ${selectedPaymentMethod}'s Account `)    },
    onError: (error) => {
      toast.error(error.message)
    },

  })

  const onSubmit = async (e) => {
    if (e == undefined || e == null || e == '') {
      toast.error('Please fill in the form')
      return
    }
    if (!amount) {

      setAmountError(true)
      return
    }
    if (Number.isNaN(parseFloat(amount))) {
      setAmountError(true)
      toast.error('Amount must be a number')
      return
    }
    if (amount.includes(',')) {
      setAmountError(true)
      toast.error('Please use dot (.) instead of comma (,)')
      return
    }
    if (isNaN(Number(amount))) {
      setAmountError(true)
      return
    }
       if (Number(amount) < 1) {
      setAmountError(true)
      toast.error('Amount must be greater than 0')
      return
    }
    if (!isGsmPhoneVerified) {
      toast.error('Please verify your phone number')
      return
    }
    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method')
      return
    }
    if (!userId || !bankAccountId) {
      toast.error('Please select a payment method')
      return
    }
    setIsLoading(true)
    const userBankId: number = parseInt(bankAccountId.toString())
    const userBankBalance = parseFloat(amount)
    console.log(userBankId, userBankBalance)
    await updateUserBankBalance({
      variables:  {
        id: userBankId,
        balance: userBankBalance,
      },
    })
    setIsLoading(false)
  }
  const setUserIdAndBankAccountId = (user, bankAccount) => {
    setUserId(user)
    setBankAccountId(bankAccount)
  }
  return (
    <>
      <Metadata title="GsmLoadBalance" description="GsmLoadBalance page" />
      <div
        className="min-h-screen bg-fixed bg-cover bg-center transition-all duration-300 relative justify-center items-center mt-48"
        style={{ backgroundImage: `url(${gsmbg2})` }}
      ><Form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center min-h-screen pt-0 pb-10 -mt-40 rounded-lg"
    >
      <div
        className="mb-6 w-full max-w-xs"
        onClick={() => setIsGsmPhoneVerificationModalOpen(true)}
      >
        <label
          htmlFor="selectedInstitution"
          className="block text-sm font-medium text-gray-700 mb-2 text-center"
        >
          Phone Number
        </label>
        <input
          name="institutionId"
          id="institutionId"
          readOnly
          placeholder={'Verify Phone Number'}
          value={isGsmPhoneVerified ? phoneNumber + ' - Verified' : '' }
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
          Select Bank Account
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
        onClick={() => {
          if (!isFormFilled && !isGsmPhoneVerified && !selectedPaymentMethod && !amount) {
            toast.error('Please fill in the form');
          }
        }}
        className={`${
          isLoading ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-600 hover:dark:bg-blue-800'
        } mt-10 w-full max-w-md h-16 py-2 px-12 text-gray font-bold rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50`}
      >
        {isLoading ? 'Processing...' : 'TL Yükle'}
      </Submit>
      <Toaster />
    </Form>
    </div>
      <PaymentMethodModal
        isOpen={isPaymentMethodModalOpen}
        onClose={() => setIsPaymentMethodModalOpen(false)}
        onConfirm={(user, bankAccount, bankAccountId) => {
          setSelectedPaymentMethod(`${user} - ${bankAccount}`)
          setUserIdAndBankAccountId(user, bankAccountId)
          setIsPaymentMethodModalOpen(false)
        }}
      />
      <GsmPhoneVerificationModal
        isOpen={isGsmPhoneVerificationModalOpen}
        onClose={() => setIsGsmPhoneVerificationModalOpen(false)}
        onConfirm={(phoneNumber) => {
          setIsGsmPhoneVerified(true)
          setIsGsmPhoneVerificationModalOpen(false)
          setPhoneNumber(phoneNumber)
        }}
      />

    </>
  )
}

export default GsmLoadBalancePage
