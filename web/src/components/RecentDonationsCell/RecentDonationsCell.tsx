// web/src/components/DonationSliderCell/DonationSliderCell.js
import type {
  RecentDonationsQuery,
  RecentDonationsQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import RecentDonationSlider from '../RecentDonationSlider/RecentDonationSlider'

export const QUERY: TypedDocumentNode<
  RecentDonationsQuery,
  RecentDonationsQueryVariables
> = gql`
  query RecentDonationsQuery {
    recentDonations {
    amount
    id
    donationDate
    user {
      id
      name
    }
    institution {
      id
      name
      logo
    }
  }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No Recent Donations Found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  recentDonations,
}: CellSuccessProps<RecentDonationsQuery>) => {
  console.log('Recent Donations:', recentDonations) // Debugging
  return <RecentDonationSlider items={recentDonations || []} />
}
