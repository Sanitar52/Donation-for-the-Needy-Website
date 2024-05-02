import type {
  DeleteInstitutionMutation,
  DeleteInstitutionMutationVariables,
  FindInstitutionById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_INSTITUTION_MUTATION: TypedDocumentNode<
  DeleteInstitutionMutation,
  DeleteInstitutionMutationVariables
> = gql`
  mutation DeleteInstitutionMutation($id: Int!) {
    deleteInstitution(id: $id) {
      id
    }
  }
`

interface Props {
  institution: NonNullable<FindInstitutionById['institution']>
}

const Institution = ({ institution }: Props) => {
  const [deleteInstitution] = useMutation(DELETE_INSTITUTION_MUTATION, {
    onCompleted: () => {
      toast.success('Institution deleted')
      navigate(routes.institutions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteInstitutionMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete institution ' + id + '?')) {
      deleteInstitution({ variables: { id } })
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
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(institution.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Institution
