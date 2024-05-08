import { useState } from 'react'
import otp from '../../../public/otp.png'

const GsmPhoneVerificationModal = ({ isOpen, onClose, onConfirm }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const [isCodeError, setIsCodeError] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)
  const [isCodeResending, setIsCodeResending] = useState(false)
  const [isCodeResendError, setIsCodeResendError] = useState(false)
  const [isCodeResent, setIsCodeResent] = useState(false)
  const [isPhoneNumberError, setIsPhoneNumberError] = useState(false)
  const apiKey = process.env.REDWOOD_ENV_OTP_API_KEY
  const mainUrl = process.env.REDWOOD_ENV_OTP_URL
  const apiUrl = '/api/v3/otp/otp_get.php'

  const handleSendCode = async () => {
    if (phoneNumber.length !== 10) {
      setIsPhoneNumberError(true)
      return
    }

    const phoneRegex = /^[0-9]+$/
    if (!phoneRegex.test(phoneNumber)) {
      setIsPhoneNumberError(true)
      return
    }

    setIsPhoneNumberError(false)
    setIsSendingCode(true)

    try {
      const response = await fetch(
        `${mainUrl}${apiUrl}?api_key=${apiKey}&mobile=90${phoneNumber}&digits=4&report=1&lang=1&response_type=json`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()

      if (result.result === true) {
        setIsCodeSent(true)
        setOtpCode(result.otp_code)
      } else {
        setIsCodeError(true)
      }

    } catch (error) {
      console.error('Error while sending code:', error)
      setIsCodeError(true)

    } finally {
      setIsSendingCode(false)
    }
  }

  const handleVerifyCode = () => {
    setIsVerifyingCode(true)
    setTimeout(() => {
      if (code === otpCode) {
        setIsCodeVerified(true)
      } else {
        setIsCodeError(true)
      }
      setIsVerifyingCode(false)
    }, 2000)
  }

  const handleResendCode = () => {
    setIsCodeResending(true)
    setTimeout(() => {
      setIsCodeResending(false)
      setIsCodeResent(true)
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <img src={otp} alt="OTP" className="h-6 w-6" />
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {isSendingCode || isCodeResending
              ? 'Sending Code...'
              : isCodeSent || isCodeResent
              ? 'Enter the number we have sent to your phone'
              : 'Verify Phone Number'}
          </h3>
          <div className="mt-2">
            <input
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value)
                setIsPhoneNumberError(false)
              }}
              className="block w-full p-3 mt-2 border border-gray-300 rounded shadow-sm"
              placeholder="Phone Number"
              maxLength={10}
            />
            {isPhoneNumberError && (
              <p className="text-red-500 text-sm mt-2">
                You need to enter the correct phone number
              </p>
            )}
            {isCodeSent && (
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="block w-full p-3 mt-2 border border-gray-300 rounded shadow-sm"
                placeholder="Enter Verification Code"
              />
            )}
            {isCodeError && (
              <p className="text-red-500 text-sm mt-2">Invalid code. Please try again.</p>
            )}
            {isCodeResendError && (
              <p className="text-red-500 text-sm mt-2">Failed to resend code. Please try again.</p>
            )}
            {isCodeResent && (
              <p className="text-green-500 text-sm mt-2">Code resent successfully.</p>
            )}
            <div className="flex justify-between mt-4">
              {isCodeSent && (
                <button
                  onClick={handleResendCode}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
                >
                  Resend Code
                </button>
              )}
              <button
                onClick={isCodeSent ? handleVerifyCode : handleSendCode}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                {isCodeSent ? 'Verify Code' : 'Send Code'}
              </button>
            </div>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={() => onConfirm(phoneNumber)}
              className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2"
            >
              Confirm
            </button>
          </div>
          <div className="items-center px-4 py-3">
            <button
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

export default GsmPhoneVerificationModal
