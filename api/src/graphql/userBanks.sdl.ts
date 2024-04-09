export const schema = gql`
  type UserBank {
    id: Int!
    userId: Int!
    user: User!
    name: String!
    balance: Float!
  }

  type Query {
    userBanks: [UserBank!]! @requireAuth
    userBank(id: Int!): UserBank @requireAuth
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
  }

  type Mutation {
    createUserBank(input: CreateUserBankInput!): UserBank! @requireAuth
    updateUserBank(id: Int!, input: UpdateUserBankInput!): UserBank!
      @requireAuth
    deleteUserBank(id: Int!): UserBank! @requireAuth
  }
`
