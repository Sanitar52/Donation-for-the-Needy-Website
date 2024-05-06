import type {
  TopDonatedInstitutionsQuery,
  TopDonatedInstitutionsQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import InstitutionSlider from '../InstitutionSlider/InstitutionSlider'

export const QUERY: TypedDocumentNode<
  TopDonatedInstitutionsQuery,
  TopDonatedInstitutionsQueryVariables
> = gql`
  query TopDonatedInstitutionsQuery {
    topDonatedInstitutions {
      id
      name
      logo
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <InstitutionSlider title={'Our Top 5 Donated Institutions:'} items={[]} />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  topDonatedInstitutions,
}: CellSuccessProps<TopDonatedInstitutionsQuery>) => {
  const items = topDonatedInstitutions.map((item) => ({
    institutions: {
      id: item.id,
      name: item.name,
      logo: item.logo,
    },
  }))
  return (
<InstitutionSlider title={'Our Top 5 Donated Institutions:'} items={items} />
  )
}
