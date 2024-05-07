import type {
  FindInstitutionQuery,
  FindInstitutionQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
// fetch all institutions with given id that are active
export const QUERY: TypedDocumentNode<
  FindInstitutionQuery,
  FindInstitutionQueryVariables
> = gql`
  query FindInstitutionQuery($id: Int!) {
    institution: institution(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindInstitutionQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  institution,
}: CellSuccessProps<FindInstitutionQuery, FindInstitutionQueryVariables>) => {
  return <div>{JSON.stringify(institution)}</div>
}
