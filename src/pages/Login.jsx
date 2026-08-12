import { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

const{login} = useContext(AuthContext);

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center">
      <h1>Sign In</h1>
      <AuthForm isRegister={false} onSubmit={login} />
    </div>
  )
}
