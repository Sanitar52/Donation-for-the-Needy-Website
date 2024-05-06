export const schema = gql`
  type Institution {
    id: Int!
    donations: [Donation]!
    name: String
    description: String
    contactInformation: String
    logo: String
    balance: Float!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    institutions: [Institution!]! @requireAuth
    institution(id: Int!): Institution @requireAuth
    topDonatedInstitutions: [Institution!]! @skipAuth
  }

  input CreateInstitutionInput {
    name: String
    description: String
    contactInformation: String
    logo: String
    balance: Float!
  }

  input UpdateInstitutionInput {
    name: String
    description: String
    contactInformation: String
    logo: String
    balance: Float
  }

  input UpdateInstitutionBalanceInput {
    balance: Float!
  }

  type Mutation {
    createInstitution(input: CreateInstitutionInput!): Institution! @requireAuth
    updateInstitution(id: Int!, input: UpdateInstitutionInput!): Institution!
      @requireAuth
    updateInstitutionBalance(id: Int!, balance: Float!): Institution! @requireAuth
    deleteInstitution(id: Int!): Institution! @requireAuth
  }
`
