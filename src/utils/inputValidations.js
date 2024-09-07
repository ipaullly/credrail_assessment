export const name_validation = {
  name: 'name',
  label: 'name',
  type: 'text',
  id: 'name',
  placeholder: 'write your name ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}

export const first_name_validation = {
  name: 'first-name',
  label: 'First Name',
  type: 'text',
  id: 'first-name',
  placeholder: 'write your first name ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}
export const last_name_validation = {
  name: 'last-name',
  label: 'Last Name',
  type: 'text',
  id: 'Last-name',
  placeholder: 'write your last name ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}
export const email_validation = {
  name: 'email',
  label: 'Email',
  type: 'text',
  id: 'email',
  placeholder: 'write your email ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 50,
      message: "The email should have at most 50 characters",
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "invalid email address"
    }
  },
}

export const phone_validation = {
  name: 'phone',
  label: 'Phone Number',
  type: 'number',
  id: 'phone',
  placeholder: 'write your phone ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 10,
      message: 'Phone number can"t be larger than 10 characters'
    },
    pattern: {
      value: /^(?:254|\+254|0)?((?:(?:7(?:(?:3[0-9])|([01249][0-9])|(?:5[0-9])|(8[5-9])))|(?:1(?:[1][0-5]))|(?:1(?:[0][0-2]))|(?:2(?:[0][0-9])))[0-9]{6})$/i,
      message: 'Ensure you have entered in a valid safaricom/airtel line'  
    } 
    },
}

export const password_validation = {
  name: 'password',
  label: 'password',
  type: 'password',
  id: 'password',
  placeholder: 'type password ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 6,
      message: 'min 6 characters',
    },
  },
}

export const confirm_password_validation = {
  name: 'confirmPassword',
  label: 'confirm password',
  type: 'password',
  id: 'confirmPassword',
  placeholder: 'type confirm password ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 6,
      message: 'min 6 characters',
    },
  },
}