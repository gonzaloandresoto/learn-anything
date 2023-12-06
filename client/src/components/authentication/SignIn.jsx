import React from 'react';
import useAuthContext from '../../hooks/useAuthContext';

function SignIn() {
  const { signIn } = useAuthContext();
  return <div>SignIn</div>;
}

export default SignIn;
