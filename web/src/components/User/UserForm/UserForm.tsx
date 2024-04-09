import type { EditUserById, UpdateUserInput, CreateUserBankInput, CreateUserBankInputVariables } from 'types/graphql'

import type { RWGqlError, SubmitHandler } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
  set,
} from '@redwoodjs/forms'
import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'

type FormUser = NonNullable<EditUserById['user']>

interface UserFormProps {
  user?: EditUserById['user']
  onSave: (data: UpdateUserInput, id?: FormUser['id']) => void
  error: RWGqlError
  loading: boolean
}
const CREATE_BANK_MUTATION = gql`
  mutation CreateUserBank($input: CreateUserBankInput!) {
    createUserBank(input: $input) {
      id
      userId
      name
      balance
    }
  }
`;

const AddBankModal = ({ isOpen, onClose, onSave, userId }) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (name.trim() !== '' && balance) {
      await onSave({ userId, name, balance: parseFloat(balance) });
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              {showSuccessMessage && (
              <div className="text-lg text-green-600 w-full text-center">
                Bank added successfully!
              </div>
            )}
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Add New Bank
                </h3>
                <div className="mt-2">
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Balance</label>
                    <input
                      type="number"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      className="mt-1 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

            <button type="button" onClick={handleSubmit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
              Submit
            </button>
            <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const UserForm = (props: UserFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = (data: FormUser) => {
    props.onSave(data, props?.user?.id)
  }
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);
  const [createBank] = useMutation<
    CreateUserBankInput,
    CreateUserBankInputVariables>
   (CREATE_BANK_MUTATION);

  const handleAddBank: SubmitHandler<CreateUserBankInput> = async (bankData) => {
    setIsLoading(true);
    try {
      await createBank({
        variables: {
          input: bankData } });
    }
    catch (error) {
      console.error('Failed to create bank', error);
    }
    finally {
      setIsLoading(false);
    }

    // Here you would handle the submission logic to create a new UserBank
    // This could involve calling a mutation or sending a request to your API
    console.log(bankData);
  };
  return (
    <div className="rw-form-wrapper">
      <Form<FormUser> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.user?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="age"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Age
        </Label>

        <NumberField
          name="age"
          defaultValue={props.user?.age}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="age" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />
        <div className="mb-12">
        <button
          type="button"
          onClick={() => setIsAddBankModalOpen(true)}
          className="rw-button rw-button-blue"
        >
          Add New Bank
        </button>
      </div>

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
      <AddBankModal
      isOpen={isAddBankModalOpen}
      onClose={() => setIsAddBankModalOpen(false)}
      onSave={handleAddBank}
      userId={props.user?.id}
    />
    </div>
  )
}

export default UserForm
