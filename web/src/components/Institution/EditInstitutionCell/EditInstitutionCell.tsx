import type {
  EditInstitutionById,
  UpdateInstitutionInput,
  UpdateInstitutionMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InstitutionForm from 'src/components/Institution/InstitutionForm'

export const QUERY: TypedDocumentNode<EditInstitutionById> = gql`
  query EditInstitutionById($id: Int!) {
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

const UPDATE_INSTITUTION_MUTATION: TypedDocumentNode<
  EditInstitutionById,
  UpdateInstitutionMutationVariables
> = gql`
  mutation UpdateInstitutionMutation(
    $id: Int!
    $input: UpdateInstitutionInput!
  ) {
    updateInstitution(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  institution,
}: CellSuccessProps<EditInstitutionById>) => {
  const [updateInstitution, { loading, error }] = useMutation(
    UPDATE_INSTITUTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Institution updated')
        navigate(routes.institutions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateInstitutionInput,
    id: EditInstitutionById['institution']['id']
  ) => {
    updateInstitution({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Institution {institution?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <InstitutionForm
          institution={institution}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
