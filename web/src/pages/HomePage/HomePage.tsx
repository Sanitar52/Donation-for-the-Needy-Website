import { Link, navigate, routes } from '@redwoodjs/router'
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
import { useEffect, useRef, useState } from 'react';
import bgmain5 from '../../../public/bgmain5.png';

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
  const backgroundRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollTop = window.scrollY;
        const backgroundOffset = scrollTop * 0.5; // Adjust the value to control the scrolling speed
        backgroundRef.current.style.backgroundPositionY = `-${backgroundOffset}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
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
    <div
        ref={backgroundRef}
        className="min-h-screen bg-fixed bg-cover bg-center transition-all duration-300 relative"
        style={{ backgroundImage: `url(${bgmain5})` }}
      >
        {/*Make a HomePage navbar here on the top*/}
        <div className="max-w-full mx-auto rounded-full">
          <div className="bg-white p-6 rounded-lg shadow-2xl ">
            <h2 className="text-2xl font-bold text-gray-800 text-center">BAĞIŞ</h2>
          </div>
        </div>
    <div className="flex flex-col items-center justify-center h-screen">
      <button
      onClick={() => openPopup('createUser')}
      className=" h-auto max-w-lg button-primary-lg mb-12 w-full justify-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
      <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="2em"
      width="2em"
    >
      <path d="M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 00-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 00-80.4 119.5A373.6 373.6 0 00137 888.8a8 8 0 008 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 008.1.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 01340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 01683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" />
    </svg>
      Create User
    </button>
    <button
      onClick={() => openPopup('addInstitution')}
      className=" h-auto max-w-lg button-primary-lg mb-12 w-full justify-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
      <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="2em"
      width="2em"
    >
      <path d="M12 11h-2V9h2v2m2 0h2V9h-2v2m-.6 10H12v-3.5h-2V21H4V3h14v10.1c.3-.1.7-.1 1-.1.3 0 .7 0 1 .1V1H2v22h12.5c-.5-.6-.9-1.3-1.1-2M14 7h2V5h-2v2m2 6.8V13h-2v2h.5c.5-.5 1-.9 1.5-1.2M8 5H6v2h2V5m0 4H6v2h2V9M6 19h2v-2H6v2m6-14h-2v2h2V5m-2 10h2v-2h-2v2m-2-2H6v2h2v-2m10 2v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z" />
    </svg>
      Create Institution
    </button>
    <button
      onClick={() => navigate(routes.institutions())}
      className=" h-auto max-w-lg button-primary-lg mb-12 w-full justify-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
      <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="2em"
      width="2em"
    >
      <path d="M19 3v18h-6v-3.5h-2V21H5V3h14m-4 4h2V5h-2v2m-4 0h2V5h-2v2M7 7h2V5H7v2m8 4h2V9h-2v2m-4 0h2V9h-2v2m-4 0h2V9H7v2m8 4h2v-2h-2v2m-4 0h2v-2h-2v2m-4 0h2v-2H7v2m8 4h2v-2h-2v2m-8 0h2v-2H7v2M21 1H3v22h18V1z" />
    </svg>
      Institutions List
    </button>
    <button
      onClick={() => navigate(routes.users())}
      className=" h-auto max-w-lg button-primary-lg mb-12 w-full justify-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
       <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="2em"
      width="2em"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <path d="M13 7 A4 4 0 0 1 9 11 A4 4 0 0 1 5 7 A4 4 0 0 1 13 7 z" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
      Users List
    </button>
    <button
      onClick={() => navigate(routes.donation())}
      className=" h-auto max-w-lg button-primary-lg mb-12 w-full justify-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
      <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="2em"
      width="2em"

    >
      <path d="M4 21h9.62a3.995 3.995 0 003.037-1.397l5.102-5.952a1 1 0 00-.442-1.6l-1.968-.656a3.043 3.043 0 00-2.823.503l-3.185 2.547-.617-1.235A3.98 3.98 0 009.146 11H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h5.146c.763 0 1.448.423 1.789 1.105l.447.895H7v2h6.014a.996.996 0 00.442-.11l.003-.001.004-.002h.003l.002-.001h.004l.001-.001c.009.003.003-.001.003-.001.01 0 .002-.001.002-.001h.001l.002-.001.003-.001.002-.001.002-.001.003-.001.002-.001c.003 0 .001-.001.002-.001l.003-.002.002-.001.002-.001.003-.001.002-.001h.001l.002-.001h.001l.002-.001.002-.001c.009-.001.003-.001.003-.001l.002-.001a.915.915 0 00.11-.078l4.146-3.317c.262-.208.623-.273.94-.167l.557.186-4.133 4.823a2.029 2.029 0 01-1.52.688H4v-6zM16 2h-.017c-.163.002-1.006.039-1.983.705-.951-.648-1.774-.7-1.968-.704L12.002 2h-.004c-.801 0-1.555.313-2.119.878C9.313 3.445 9 4.198 9 5s.313 1.555.861 2.104l3.414 3.586a1.006 1.006 0 001.45-.001l3.396-3.568C18.688 6.555 19 5.802 19 5s-.313-1.555-.878-2.121A2.978 2.978 0 0016.002 2H16zm1 3c0 .267-.104.518-.311.725L14 8.55l-2.707-2.843C11.104 5.518 11 5.267 11 5s.104-.518.294-.708A.977.977 0 0111.979 4c.025.001.502.032 1.067.485.081.065.163.139.247.222l.707.707.707-.707c.084-.083.166-.157.247-.222.529-.425.976-.478 1.052-.484a.987.987 0 01.701.292c.189.189.293.44.293.707z" />
    </svg>
      Make a Donation
    </button>
    <button
      onClick={() => navigate(routes.pastDonations())}
      className=" h-auto max-w-lg button-primary-lg mb-12 w-full justify-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
      <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="2em"
      width="2em"

    >
      <path d="M4 21h9.62a3.995 3.995 0 003.037-1.397l5.102-5.952a1 1 0 00-.442-1.6l-1.968-.656a3.043 3.043 0 00-2.823.503l-3.185 2.547-.617-1.235A3.98 3.98 0 009.146 11H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h5.146c.763 0 1.448.423 1.789 1.105l.447.895H7v2h6.014a.996.996 0 00.442-.11l.003-.001.004-.002h.003l.002-.001h.004l.001-.001c.009.003.003-.001.003-.001.01 0 .002-.001.002-.001h.001l.002-.001.003-.001.002-.001.002-.001.003-.001.002-.001c.003 0 .001-.001.002-.001l.003-.002.002-.001.002-.001.003-.001.002-.001h.001l.002-.001h.001l.002-.001.002-.001c.009-.001.003-.001.003-.001l.002-.001a.915.915 0 00.11-.078l4.146-3.317c.262-.208.623-.273.94-.167l.557.186-4.133 4.823a2.029 2.029 0 01-1.52.688H4v-6zM16 2h-.017c-.163.002-1.006.039-1.983.705-.951-.648-1.774-.7-1.968-.704L12.002 2h-.004c-.801 0-1.555.313-2.119.878C9.313 3.445 9 4.198 9 5s.313 1.555.861 2.104l3.414 3.586a1.006 1.006 0 001.45-.001l3.396-3.568C18.688 6.555 19 5.802 19 5s-.313-1.555-.878-2.121A2.978 2.978 0 0016.002 2H16zm1 3c0 .267-.104.518-.311.725L14 8.55l-2.707-2.843C11.104 5.518 11 5.267 11 5s.104-.518.294-.708A.977.977 0 0111.979 4c.025.001.502.032 1.067.485.081.065.163.139.247.222l.707.707.707-.707c.084-.083.166-.157.247-.222.529-.425.976-.478 1.052-.484a.987.987 0 01.701.292c.189.189.293.44.293.707z" />
    </svg>
      Past Donations
    </button>
    </div>
    {showPopup && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-md">{renderPopup()}</div>
        </div>
      )}
    </div>
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
