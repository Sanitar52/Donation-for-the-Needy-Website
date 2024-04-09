export const schema = gql`
  type Institution {
    id: Int!
    donations: [Donation]!
    name: String
    description: String
    contactInformation: String
    logo: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    institutions: [Institution!]! @requireAuth
    institution(id: Int!): Institution @requireAuth
  }

  input CreateInstitutionInput {
    name: String
    description: String
    contactInformation: String
    logo: String
  }

  input UpdateInstitutionInput {
    name: String
    description: String
    contactInformation: String
    logo: String
  }

  type Mutation {
    createInstitution(input: CreateInstitutionInput!): Institution! @requireAuth
    updateInstitution(id: Int!, input: UpdateInstitutionInput!): Institution!
      @requireAuth
    deleteInstitution(id: Int!): Institution! @requireAuth
  }
`
