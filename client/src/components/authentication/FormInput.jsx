import React, { useState } from 'react';
import Loader from '../Loader';

function FormInput({
  greeting,
  CTA,
  authFunction,
  buttonCTA,
  fallbackCTA,
  otherCTA,
  route,
}) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    authFunction(formFields.email, formFields.password);
    setIsAuthenticating(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-2 py-12 px-10 gap-6 bg-primary-teal rounded-3xl'>
          <div>
            <p className='text-4xl text-tertiary-tan font-bold'>{greeting}</p>
            <p className='text-tertiary-tan font-medium'>{CTA}</p>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label className='text-tertiary-tan font-medium'>Email</label>
              <input
                type='email'
                name='email'
                value={formFields.email}
                onChange={handleChange}
                placeholder='you@email.com'
                className='w-[328px] text-primary-black bg-tertiary-grey rounded-lg px-4 py-2 outline-none placeholder:text-primary-tan'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-tertiary-tan font-medium'>Password</label>
              <input
                type='password'
                name='password'
                value={formFields.password}
                onChange={handleChange}
                placeholder=''
                className='w-[328px] text-primary-black bg-tertiary-grey rounded-lg px-4 py-2 outline-none'
              />
            </div>
          </div>
          <button
            type='submit'
            className='flex items-center justify-center w-full bg-tertiary-tan text-primary-black font-semibold py-2 rounded-lg'
          >
            {isAuthenticating ? (
              <div className='flex items-center gap-2'>
                <p>{buttonCTA}</p>
                <Loader />
              </div>
            ) : (
              <p>{buttonCTA}</p>
            )}
          </button>

          <p className='text-tertiary-tan'>
            {fallbackCTA}{' '}
            <a
              className='text-tertiary-tan font-semibold underline cursor-pointer'
              href={route}
            >
              {otherCTA}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default FormInput;
