import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '../components/input.component'
import { confirm_password_validation, email_validation, first_name_validation, last_name_validation, password_validation, phone_validation } from '../utils/inputValidations'
import { BsFillCheckSquareFill, BsFillExclamationSquareFill } from 'react-icons/bs'
import { useFetch } from '../utils/useFetch'
import { Link, useNavigate } from 'react-router-dom'
import { MdAccountCircle } from 'react-icons/md'

const SignUp = () => {
  const methods = useForm()
  const [success, setSuccess] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(false)

  let navigate = useNavigate();

  const [url, setUrl] = useState(`${process.env.REACT_APP_API_URL}/users`);
  const { data: userList , isPending, error } = useFetch(url);

  const onSubmit = methods.handleSubmit(data => {
    console.log('signup data',data)
    let payload = {
      ...data,
      uploadedFiles: []
    }
    console.log('users data',userList)
    const duplicateVal = !!userList.filter(user => user.email === data.email).length
    console.log('is duplicate', duplicateVal)
    if (data.password !== data.confirmPassword){
      methods.setError('confirmPassword', {
        message: "Passwords don't match"
      })
    } else if(duplicateVal) {
      setIsDuplicate(true)
      setTimeout(() => {
        setIsDuplicate(false)
      }, 5000);
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        console.log('signup',data)
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          navigate('/login')
        }, 3000);
        methods.reset()
      });
    } 
  })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={e => e.preventDefault()}
        noValidate
        className="mt-10 flex flex-col items-center justify-center mx-auto"
      >
        <h2 className='my-5 text-3xl capitalize'>Sign Up</h2>
        <div className="flex flex-col items-center justify-around w-1/3">
          <Input {...first_name_validation} />
          <Input {...last_name_validation} />
          <Input {...email_validation} />
          <Input {...phone_validation} />
          <Input {...password_validation} />
          <Input {...confirm_password_validation} />
        </div>
        <div className="mt-3 flex flex-col items-center">
          {success && (
              <p className="flex items-center gap-1 mb-5 font-semibold text-green-500">
                <BsFillCheckSquareFill /> Form has been submitted successfully
              </p>
            )}
             {isDuplicate && (
              <p className="flex items-center gap-1 mb-5 font-semibold text-red-500">
                <BsFillExclamationSquareFill /> User with this email already has an account
              </p>
            )}
            <button
              onClick={onSubmit}
              className="flex items-center gap-1 p-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800"
            >
              <MdAccountCircle />
              Sign Up
            </button>
            <Link to="/login" className="underline mt-3 text-amber-600">
              Log into your account instead?
            </Link>
          </div>
      </form>
    </FormProvider>
  )
}

export default SignUp