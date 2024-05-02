import type { EditInstitutionById, UpdateInstitutionInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormInstitution = NonNullable<EditInstitutionById['institution']>

interface InstitutionFormProps {
  institution?: EditInstitutionById['institution']
  onSave: (data: UpdateInstitutionInput, id?: FormInstitution['id']) => void
  error: RWGqlError
  loading: boolean
}

const InstitutionForm = (props: InstitutionFormProps) => {
  const onSubmit = (data: FormInstitution) => {
    props.onSave(data, props?.institution?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormInstitution> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.institution?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.institution?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="contactInformation"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Contact information
        </Label>

        <TextField
          name="contactInformation"
          defaultValue={props.institution?.contactInformation}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="contactInformation" className="rw-field-error" />

        <Label
          name="logo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Logo
        </Label>

        <TextField
          name="logo"
          defaultValue={props.institution?.logo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="logo" className="rw-field-error" />

        <Label
          name="balance"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Balance
        </Label>

        <TextField
          name="balance"
          defaultValue={props.institution?.balance}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="balance" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default InstitutionForm
