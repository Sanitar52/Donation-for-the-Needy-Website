export const schema = gql`
  type UserBank {
    id: Int!
    userId: Int!
    user: User!
    name: String!
    balance: Float!
    isActive: Boolean!
  }

  type Query {
    userBanks: [UserBank!]! @skipAuth
    userBank(id: Int!): UserBank @skipAuth
    userBanksByUserId(userId: Int!): [UserBank!]! @skipAuth
  }

  input CreateUserBankInput {
    userId: Int!
    name: String!
    balance: Float!
  }

  input UpdateUserBankInput {
    userId: Int
    name: String
    balance: Float
    isActive: Boolean
  }

  input UpdateUserBankBalanceInput {
    balance: Float!
  }

  type Mutation {
    createUserBank(input: CreateUserBankInput!): UserBank! @skipAuth
    updateUserBank(id: Int!, input: UpdateUserBankInput!): UserBank!
      @skipAuth
    updateUserBankBalance(id: Int!, balance: Float!): UserBank! @skipAuth
    increaseUserBankBalance(id: Int!, balance: Float!): UserBank! @skipAuth
    deleteUserBank(id: Int!): UserBank! @requireAuth
  }
`
