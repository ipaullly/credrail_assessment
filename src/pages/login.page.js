import React, { useContext, useState } from 'react'
import { Input } from '../components/input.component'
import { FormProvider, useForm } from 'react-hook-form'
import { email_validation, password_validation } from '../utils/inputValidations'
import { useFetch } from '../utils/useFetch'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../AppContext'
import { BsFillExclamationSquareFill } from 'react-icons/bs'
import { IoLogInOutline } from 'react-icons/io5'

const Login = () => {
  const methods = useForm();
  const { setUserInfo } = useContext(AppContext);
  const [loginError, setLoginError] = useState(false)
    // navigate function
  let navigate = useNavigate();

  const [url, setUrl] = useState(`${process.env.REACT_APP_API_URL}/users`);
  const { data: userList } = useFetch(url);

  const onSubmit = methods.handleSubmit(data => {
    console.log('login data',data)
    console.log('users data',userList)
    const duplicateVal = userList.filter(user => (user.email === data.email) && (user.password === data.password))
    console.log('login account', duplicateVal)
    if (duplicateVal.length) {
      setUserInfo(duplicateVal[0])
      navigate('/')
    } else {
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false)
      }, 3000);
    }
  })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={e => e.preventDefault()}
        noValidate
        className="mt-36 flex flex-col items-center justify-center mx-auto"
      >
        <h2 className='my-10 text-3xl capitalize'>Login</h2>
        <div className="flex flex-col items-center justify-around w-1/3">
          <Input {...email_validation} />
          <Input {...password_validation} />
        </div>
        <div className="mt-5 flex flex-col items-center">
            {loginError && (
              <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
                <BsFillExclamationSquareFill /> Account with provided log in details doesn't exist
              </p>
            )}
            <button
              onClick={onSubmit}
              className="flex items-center gap-1 p-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800"
            >
              <IoLogInOutline />
              Log in
            </button>
            <Link to="/signup" className="underline mt-3 text-amber-600">
              create an account?
            </Link>
          </div>
      </form>
    </FormProvider>
  )
}

export default Login