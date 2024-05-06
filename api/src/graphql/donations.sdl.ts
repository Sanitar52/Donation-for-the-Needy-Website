export const schema = gql`
  type Donation {
    id: Int!
    institutionId: Int!
    institution: Institution!
    userId: Int!
    user: User!
    userBankId: Int!
    userBank: UserBank!
    amount: Float!
    paymentMethod: String!
    paymentStatus: PaymentStatus!
    donationDate: DateTime!

  }

  enum PaymentStatus {
    Pending
    Completed
    Cancelled
  }

  type Query {
    donations: [Donation!]! @requireAuth
    donation(id: Int!): Donation @requireAuth
    recentDonations: [Donation!]! @skipAuth
  }

  input CreateDonationInput {
    institutionId: Int!
    userId: Int!
    userBankId: Int!
    amount: Float!
    paymentMethod: String!
    paymentStatus: PaymentStatus!
    donationDate: DateTime!
  }

  input UpdateDonationInput {
    institutionId: Int
    userId: Int
    userBankId: Int
    amount: Float
    paymentMethod: String
    paymentStatus: PaymentStatus
    donationDate: DateTime
  }

  type Mutation {
    createDonation(input: CreateDonationInput!): Donation! @requireAuth
    updateDonation(id: Int!, input: UpdateDonationInput!): Donation!
      @requireAuth
    deleteDonation(id: Int!): Donation! @requireAuth
  }
`
