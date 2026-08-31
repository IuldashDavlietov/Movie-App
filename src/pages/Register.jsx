import { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
export default function Register() {
  const { signUp } = useContext(AuthContext);
  const handleRegister = async ({ email, password, displayName }) => {
    await signUp(email, password, displayName);
    toast.success("Account created successfully!");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <AuthForm isRegister={true} onSubmit={handleRegister} />
    </div>
  );
}
