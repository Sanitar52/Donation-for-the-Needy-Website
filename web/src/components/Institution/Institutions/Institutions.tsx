import type {
  DeleteInstitutionMutation,
  DeleteInstitutionMutationVariables,
  FindInstitutions,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Institution/InstitutionsCell'
import { timeTag, truncate } from 'src/lib/formatters'

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

const InstitutionsList = ({ institutions }: FindInstitutions) => {
  const [deleteInstitution] = useMutation(DELETE_INSTITUTION_MUTATION, {
    onCompleted: () => {
      toast.success('Institution deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteInstitutionMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete institution ' + id + '?')) {
      deleteInstitution({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Contact information</th>
            <th>Logo</th>
            <th>Balance</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {institutions.map((institution) => (
            <tr key={institution.id}>
              <td>{truncate(institution.id)}</td>
              <td>{truncate(institution.name)}</td>
              <td>{truncate(institution.description)}</td>
              <td>{truncate(institution.contactInformation)}</td>
              <td>{truncate(institution.logo)}</td>
              <td>{truncate(institution.balance)}</td>
              <td>{timeTag(institution.createdAt)}</td>
              <td>{timeTag(institution.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.institution({ id: institution.id })}
                    title={'Show institution ' + institution.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editInstitution({ id: institution.id })}
                    title={'Edit institution ' + institution.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete institution ' + institution.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(institution.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InstitutionsList
