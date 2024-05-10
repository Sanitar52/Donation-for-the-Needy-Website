import type {
  MutationResolvers,
} from 'types/graphql'

export const createGsmPhoneVerification: MutationResolvers['createGsmPhoneVerification'] = async ({
  input
}) => {
  try {
    const response = await fetch(
      `${input.mainUrl}${input.apiUrl}?api_key=${input.apiKey}&mobile=90${input.phoneNumber}&digits=4&report=1&lang=1&response_type=json`,
      { mode: 'cors' }
    )
    const result = await response.json()

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    if (!result.otp_code) {
      throw new Error('OTP code not found in the API response.')
    }

    // Return the OTP code
    return { otp_code: result.otp_code }
  } catch (error) {
    console.error('Error in createGsmPhoneVerification:', error)
    throw new Error('Failed to fetch OTP code.')
  }
}
