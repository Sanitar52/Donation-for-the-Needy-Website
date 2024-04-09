import type {
  CreateInstitutionMutation,
  CreateInstitutionInput,
  CreateInstitutionMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InstitutionForm from 'src/components/Institution/InstitutionForm'

const CREATE_INSTITUTION_MUTATION: TypedDocumentNode<
  CreateInstitutionMutation,
  CreateInstitutionMutationVariables
> = gql`
  mutation CreateInstitutionMutation($input: CreateInstitutionInput!) {
    createInstitution(input: $input) {
      id
    }
  }
`

const NewInstitution = () => {
  const [createInstitution, { loading, error }] = useMutation(
    CREATE_INSTITUTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Institution created')
        navigate(routes.institutions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateInstitutionInput) => {
    createInstitution({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Institution</h2>
      </header>
      <div className="rw-segment-main">
        <InstitutionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewInstitution
