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
import { useEffect, useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { Button } from '@mui/material'

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



const UserForm = (props: UserFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userBanks, setUserBanks] = useState([])
  useEffect(() => {
    if (props.user?.user_bank) {
      setUserBanks(props.user.user_bank)
    }
  }, [])

  const onSubmit = (data: FormUser) => {
    //data.user_banks = userBanks.map((bank, index) => ({...bank, index}))
    let new_data = {
      age: data.age,
      email: data.email,
      name: data.name,
      user_banks: userBanks.map((bank) => ({
        name: bank.name,
        balance: bank.balance
      }))
    }
    console.log(new_data)
    props.onSave(new_data, props?.user?.id)
  }
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);
  const onEnterBank = () => {
    setUserBanks([...userBanks, { name: '', balance: ''}])

    console.log('abc');
  }
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
        { userBanks.length!== 0 && <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Banks</h3>
          <table className="table-auto">
            <thead>
              <tr>
                <th>Name</th>
                <th>Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userBanks.map((bank, index) => (
                <tr key={index}>
                  <td>
                    <TextField
                    value={bank.name}
                      name={`user_banks[${index}].name`}
                      defaultValue={bank.name}
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      validation={{ required: true }}
                      onChange={(e)=> {
                        setUserBanks(prev=> {
                          const newBanks = [...prev]
                          newBanks[index].name = e.target.value
                          return newBanks
                        })
                      }}
                    />
                    <FieldError name={`user_banks[${index}].name`} className="rw-field-error" />
                  </td>
                  <td>
                    <NumberField
                    value={bank.balance}
                      name={`user_banks[${index}].balance`}
                      defaultValue={bank.balance}
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      validation={{ required: true }}
                      onChange={(e)=> {
                        setUserBanks(prev=> {
                          const newBanks = [...prev]
                          newBanks[index].balance = parseFloat(e.target.value)
                          return newBanks
                        })
                      }}

                    />
                    <FieldError name={`user_banks[${index}].balance`} className="rw-field-error" />
                  </td>
                  <td><Button variant='contained' color="error" onClick={()=> {
                    const banks = [...userBanks]
                    banks.splice(index, 1)
                    setUserBanks(banks)
                  }}>delete</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}

        <div className="mb-12">
        <button
          type="button"
          onClick={() => onEnterBank()}
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

    </div>
  )
}

export default UserForm
