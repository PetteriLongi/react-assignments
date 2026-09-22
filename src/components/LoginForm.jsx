import useForm from "../hooks/formHooks";
import { useAuthentication } from "../hooks/apiHooks";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const navigate = useNavigate();
  const initValues = {
    username: "",
    password: "",
  };

  const { postLogin } = useAuthentication();

  const doLogin = async (inputs) => {
    try {
      const loginResult = await postLogin(inputs);
      localStorage.setItem("token", loginResult.token);
      console.log("Login successful:", loginResult);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const { handleInputChange, handleSubmit } = useForm(doLogin, initValues);

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
