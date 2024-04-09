import type {
  FindInstitutionById,
  FindInstitutionByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Institution from 'src/components/Institution/Institution'

export const QUERY: TypedDocumentNode<
  FindInstitutionById,
  FindInstitutionByIdVariables
> = gql`
  query FindInstitutionById($id: Int!) {
    institution: institution(id: $id) {
      id
      name
      description
      contactInformation
      logo
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Institution not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindInstitutionByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  institution,
}: CellSuccessProps<FindInstitutionById, FindInstitutionByIdVariables>) => {
  return <Institution institution={institution} />
}
