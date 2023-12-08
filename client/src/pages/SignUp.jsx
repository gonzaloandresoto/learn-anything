import React from 'react';
import useAuthContext from '../hooks/useAuthContext';
import FormInput from '../components/authentication/InputForm';

function SignUp() {
  const { signUp } = useAuthContext();
  return (
    <div className='flex grow items-center justify-center bg-tertiary-tan'>
      <FormInput
        greeting={'Welcome to Ola'}
        CTA={'Create an account to join'}
        authFunction={signUp}
        buttonCTA={'Sign up'}
        fallbackCTA={'Already have an account?'}
        otherCTA={'Sign in'}
        route={'/signin'}
      />
    </div>
  );
}

export default SignUp;
