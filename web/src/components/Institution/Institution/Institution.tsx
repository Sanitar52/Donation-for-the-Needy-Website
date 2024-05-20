import type {
  UpdateInstitutionMutation,
  UpdateInstitutionMutationVariables,
  FindInstitutionById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const SOFT_DELETE_INSTITUTION_MUTATION: TypedDocumentNode<
  UpdateInstitutionMutation,
  UpdateInstitutionMutationVariables
> = gql`
  mutation UpdateInstitutionMutation($id: Int!, $input: UpdateInstitutionInput!) {
    updateInstitution(id: $id, input: $input) {
      id
      isActive
    }
  }
`

interface Props {
  institution: NonNullable<FindInstitutionById['institution']>
}

const Institution = ({ institution }: Props) => {
  const [updateInstitution] = useMutation(SOFT_DELETE_INSTITUTION_MUTATION, {
    onCompleted: () => {
      toast.success('Institution deleted')
      navigate(routes.institutions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSoftDeleteClick = (id: UpdateInstitutionMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete institution ' + id + ' ?')) {
      updateInstitution({ variables: { id, input: { isActive: false } } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Institution {institution.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{institution.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{institution.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{institution.description}</td>
            </tr>
            <tr>
              <th>Contact information</th>
              <td>{institution.contactInformation}</td>
            </tr>
            <tr>
              <th>Logo</th>
              <td>{institution.logo}</td>
            </tr>
            <tr>
              <th>Balance</th>
              <td>{institution.balance}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(institution.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(institution.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editInstitution({ id: institution.id })}
          className="rw-button rw-button-blue"
        >
          Details
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onSoftDeleteClick(institution.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Institution
