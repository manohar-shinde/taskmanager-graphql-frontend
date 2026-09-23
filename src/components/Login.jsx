import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { LOGIN } from "../graphql/mutations";
import { setToken } from "../auth/token";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const result = await login({
        variables: {
          email,
          password,
        },
      });
      setToken(result.data.login.token);
      navigate("/tasks");
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <form className="login" onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="password"
      />

      <button type="submit">{loading ? "Loggin..." : "Login"}</button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default Login;
