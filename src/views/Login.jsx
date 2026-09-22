import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {showRegister ? <RegisterForm /> : <LoginForm />}
      <button onClick={() => setShowRegister(!showRegister)}>
        {showRegister ? "Back to Login" : "Create an Account"}
      </button>
    </>
  );
};

export default Login;
