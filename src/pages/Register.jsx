import { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/AuthContext";


export default function Register() {

const{signUp} = useContext(AuthContext);

  return (
    <div className=" min-h-screen flex  flex-col items-center justify-center" >
      <h1>Sign Up</h1>
      <AuthForm isRegister={true} onSubmit={signUp} />
    </div>
  )
}
