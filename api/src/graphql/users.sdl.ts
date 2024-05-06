export const schema = gql`
  type User {
    id: Int!
    donations: [Donation]!
    user_bank: [UserBank]!
    name: String
    age: Int
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    isActive: Boolean!
  }
  input userBankInput {
    id: Int
    name: String
    balance: Float
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    name: String
    age: Int
    email: String!
    user_banks: [userBankInput!]
  }

  input UpdateUserInput {
    name: String
    age: Int
    email: String
    user_banks: [userBankInput!]
    isActive: Boolean
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
