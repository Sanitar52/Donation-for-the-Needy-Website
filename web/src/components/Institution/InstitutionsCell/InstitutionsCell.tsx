import type { FindInstitutions, FindInstitutionsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Institutions from 'src/components/Institution/Institutions'

export const QUERY: TypedDocumentNode<
  FindInstitutions,
  FindInstitutionsVariables
> = gql`
  query FindInstitutions {
    institutions {
      id
      name
      description
      contactInformation
      logo
      balance
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No institutions yet. '}
      <Link to={routes.newInstitution()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindInstitutions>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  institutions,
}: CellSuccessProps<FindInstitutions, FindInstitutionsVariables>) => {
  return <Institutions institutions={institutions} />
}
