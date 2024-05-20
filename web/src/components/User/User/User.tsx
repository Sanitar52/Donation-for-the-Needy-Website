import type {
  UpdateUserMutation,
  UpdateUserMutationVariables,
  FindUserById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'
import { Breadcrumbs } from '@mui/material'

const SOFT_DELETE_USER_MUTATION: TypedDocumentNode<
  UpdateUserMutation,
  UpdateUserMutationVariables
> = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      isActive
    }
  }
`

interface Props {
  user: NonNullable<FindUserById['user']>
}

const User = ({ user }: Props) => {
  const [updateUser] = useMutation(SOFT_DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSoftDeleteClick = (id: UpdateUserMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete user ' + id + ' ?')) {
      updateUser({ variables: { id, input: { isActive: false } } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            User {user.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{user.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Age</th>
              <td>{user.age}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(user.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(user.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUser({ id: user.id })}
          className="rw-button rw-button-blue"
        >
          Details
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onSoftDeleteClick(user.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default User
