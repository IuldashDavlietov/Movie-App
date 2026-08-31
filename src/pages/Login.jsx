import { useContext } from "react";
import { toast } from "react-hot-toast"; // 1. Импортируем toast
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  const handleLogin = async ({ email, password }) => {
    await login(email, password);
    toast.success("Successfully logged in!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      <AuthForm isRegister={false} onSubmit={handleLogin} />
    </div>
  );
}
