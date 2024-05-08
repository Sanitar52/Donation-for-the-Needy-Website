import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import PaymentMethodModal from 'src/components/PaymentMethodModal/'
import GsmPhoneVerificationModal from 'src/components/GsmPhoneVerificationModal/'
import gsmbg2 from '../../../../web/public/gsmbg2.png'
import { Form, Submit } from '@redwoodjs/forms'

const GsmLoadBalancePage = () => {
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = React.useState(false)
  const [isGsmPhoneVerificationModalOpen, setIsGsmPhoneVerificationModalOpen] = React.useState(false)
  const [isGsmPhoneVerified, setIsGsmPhoneVerified] = React.useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState('')
  const [userId, setUserId] = React.useState('')
  const [bankAccountId, setBankAccountId] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [amountError, setAmountError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!amount) {
      setAmountError(true)
      return
    }
    setIsLoading(true)
    // Call the API to make the payment
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
          placeholder="5350533370"
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
        className={`${
          isLoading ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-600 hover:dark:bg-blue-800'
        } mt-10 w-full max-w-md h-16 py-2 px-12 text-gray font-bold rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50`}
      >
        {isLoading ? 'Processing...' : 'TL Yükle'}
      </Submit>
    </Form></div>
      <PaymentMethodModal
        isOpen={isPaymentMethodModalOpen}
        onClose={() => setIsPaymentMethodModalOpen(false)}
        onConfirm={(user, bankAccount) => {
          setSelectedPaymentMethod(`${user} - ${bankAccount}`)
          setUserIdAndBankAccountId(user, bankAccount)
          setIsPaymentMethodModalOpen(false)
        }}
      />
      <GsmPhoneVerificationModal
        isOpen={isGsmPhoneVerificationModalOpen}
        onClose={() => setIsGsmPhoneVerificationModalOpen(false)}
        onConfirm={() => {
          setIsGsmPhoneVerified(true)
          setIsGsmPhoneVerificationModalOpen(false)
        }}
      />

    </>
  )
}

export default GsmLoadBalancePage
