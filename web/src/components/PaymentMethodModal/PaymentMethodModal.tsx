import { useQuery } from "@redwoodjs/web"
import { useState, useEffect } from "react"

import { QUERY } from "../User/UsersCell"
const GET_BANK_ACCOUNTS_BY_USER_ID = gql`
  query UserBanksByUserId($userId: Int!) {
    userBanksByUserId(userId: $userId) {
      id
      name
      balance
    }
  }
`
const PaymentMethodModal = ({ isOpen, onClose, onConfirm }) => {
  const [userId, setUserId] = useState<Number>()
  const [user, setUser] = useState<any>('')
  const [bankAccount, setBankAccount] = useState<any>('')
  const [bankAccountId, setBankAccountId] = useState<Number>()
  const [userNameList, setUserNameList] = useState([])
  const [userBankAccountList, setUserBankAccountList] = useState<any>([])
  const [selectedUser, setSelectedUser] = useState('')
  const [selectedBankAccount, setSelectedBankAccount] = useState('')

  const { loading: loadingUserData, error: userErrorData, data: userData } =
    useQuery(QUERY)

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
export default PaymentMethodModal