import React from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import FormInput from './FormInput';

function SignIn() {
  const { signIn } = useAuthContext();
  return (
    <div className='flex grow items-center justify-center bg-secondary-tan'>
      <FormInput
        greeting={'Welcome back'}
        CTA={'Sign in to your account'}
        authFunction={signIn}
        buttonCTA={'Sign in'}
        fallbackCTA={'Dont have an account?'}
        otherCTA={'Sign up'}
        route={'/signup'}
      />
    </div>
  );
}

export default SignIn;
