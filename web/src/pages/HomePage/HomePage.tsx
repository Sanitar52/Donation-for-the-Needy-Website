import { Link, routes } from '@redwoodjs/router'
import { MetaTags, Metadata, useMutation } from '@redwoodjs/web'
import {
  Form,
  Label,
  TextField,
  FieldError,
  Submit,
  SubmitHandler,
  SelectField,
  set,
} from '@redwoodjs/forms';
import { toast } from '@redwoodjs/web/dist/toast';
import { CreateUserInput, CreateUserInputVariables, CreateInstitutionInput, CreateInstitutionInputVariables, } from 'types/graphql'
import { useState } from 'react';

const CREATE_USER_MUTATION = gql`
  mutation CreateUserInput($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      age
      email
    }
  }
`

const CREATE_INSTITUTION_MUTATION = gql`
  mutation CreateInstitutionInput($input: CreateInstitutionInput!) {
    createInstitution(input: $input) {
      id
      name
      description
      contactInformation
      logo
    }
  }
`
const HomePage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const openPopup = (formType: string) => {
    setShowPopup(formType);
  };

  const closePopup = () => {
    setShowPopup(null);
  };
  const [createUser] = useMutation<CreateUserInput, CreateUserInputVariables>(CREATE_USER_MUTATION, {
    onCompleted: () => {
      alert('User created')
    },
  })
  const [createInstitution] = useMutation<CreateInstitutionInput, CreateInstitutionInputVariables>(CREATE_INSTITUTION_MUTATION, {
    onCompleted: () => {
      alert('Institution created')
    },
  })


  const submitUserInfo: SubmitHandler<CreateUserInput> = async (data) => {
    setIsLoading(true)
    const userAge: number = parseInt(data.age.toString())
    try {
      await createUser({ variables: { input: { ...data, age: userAge } } })
      toast.success('User created')
      setTimeout(() => {
        closePopup();
      }, 3000); // Close the popup after 3 seconds
    } catch (error) {
      toast.error('Error creating user')

    }
    finally {
      setIsLoading(false)
    }

    console.log(data)
  }
  const submitInstitutionInfo: SubmitHandler<CreateInstitutionInput> = async (data) => {
    setIsLoading(true)
    try {
      await createInstitution({ variables: { input: data } })
      toast.success('Institution created')
      setTimeout(() => {
        closePopup();
      }, 3000); // Close the popup after 3 seconds
    } catch (error) {
      toast.error('Error creating institution')

    }
    finally {
      setIsLoading(false)
    }

    console.log(data)
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <button
      onClick={() => openPopup('createUser')}
      className=" h-auto max-w-lg button-primary-lg mb-12 w-full justify-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
      <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
      </svg>
      Create User
    </button>
    <button
      onClick={() => openPopup('addInstitution')}
      className=" h-auto max-w-lg button-primary-lg mb-12 w-full justify-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
      <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
      </svg>
      Create Institution
    </button>
    </div>
    {showPopup && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-md">{renderPopup()}</div>
        </div>
      )}

    </>
  );
  function renderPopup() {
    switch (showPopup) {
      case 'createUser':
    return (
      <div className="popup">
      <Form onSubmit={submitUserInfo} className="rw-form-wrapper">
        <Label
        name="name"
        errorClassName="error"
        className="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          errorClassName="error"
          className="rw-input rw-input-error"
          validation={{
            required: {
              value: true,
              message: 'Name is required',
            },
          }}
        />
        <FieldError name="name" className="error" />
        <Label name="email" errorClassName="error" className="rw-label">
          Email
        </Label>
        <TextField
          name="email"
          defaultValue={"example@gmail.com"}
          errorClassName="error"
          className="rw-input"
        />
        <FieldError name="email" className="error" />
        <Label name="age" errorClassName="error" className="rw-label">
          Age
        </Label>
        <SelectField
          name="age"
          defaultValue={18}
          errorClassName="error"
          className="rw-input"
        >
          <option value="18">select your age</option>
          {Array.from({ length: 99 - 18 + 1 }, (_, i) => i + 18).map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}

        </SelectField>
        <FieldError name="age" className="error" />


        <div className="rw-button-group">
            <Submit
              className={`rw-button rw-button-blue ${isLoading ? 'rw-loading' : ''
                }`}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting ...' : 'Submit'}
            </Submit>
          </div>
          </Form>
          <button onClick={closePopup} className="button-secondary mt-4">
              Close
            </button>

      </div>
    )
    case 'addInstitution':
      return(
      <div className="popup">
        <Form onSubmit={submitInstitutionInfo} className="rw-form-wrapper">
          <Label
            name="name"
            errorClassName="error"
            className="rw-label rw-label-error"
          >
            Name
          </Label>
          <TextField
            name="name"
            errorClassName="error"
            className="rw-input rw-input-error"
            validation={{
              required: {
                value: true,
                message: 'Name is required',
              },
            }}
          />
          <FieldError name="name" className="error" />
          <Label name="description" errorClassName="error" className="rw-label">
            Description
          </Label>
          <TextField
            name="description"
            defaultValue={"example@gmail.com"}
            errorClassName="error"
            className="rw-input"
          />
          <FieldError name="description" className="error" />
          <Label name="contactInformation" errorClassName="error" className="rw-label">
            Contact Information
          </Label>
          <TextField
            name="contactInformation"
            defaultValue={"phone number"}
            errorClassName="error"
            className="rw-input"
          />
          <FieldError name="contactInformation" className="error" />
          <Label name="logo" errorClassName="error" className="rw-label">
            Logo
          </Label>
          <TextField
            name="logo"
            defaultValue={"logo"}
            errorClassName="error"
            className="rw-input"
          />
          <FieldError name="logo" className="error" />
          <div className="rw-button-group">
            <Submit
              className={`rw-button rw-button-blue ${isLoading ? 'rw-loading' : ''
                }`}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting ...' : 'Submit'}
            </Submit>
          </div>
          </Form>
          <button onClick={closePopup} className="button-secondary mt-4">
              Close
            </button>

      </div>
      )
    default:
      return null;
    }

  }
}

export default HomePage
