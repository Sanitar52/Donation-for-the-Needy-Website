export const schema = gql`
  type GsmPhone {
    otp_code: String
  }
  input CreateGsmPhoneVerificationInput {
    phoneNumber: String!
    mainUrl: String!
    apiUrl: String!
    apiKey: String!
  }
  type Mutation {
    createGsmPhoneVerification(input: CreateGsmPhoneVerificationInput!): GsmPhone! @skipAuth
  }
`
