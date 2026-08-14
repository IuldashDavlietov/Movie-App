import { useState } from "react";
import Input from "./Input";


const getFirebaseErrorMessage = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already in use.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

export default function AuthForm({ isRegister, onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isRegister && (!formData.firstName.trim() || !formData.lastName.trim())) {
      setError('Please enter your first and last name.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      if (isRegister) {
        const displayName = `${formData.firstName} ${formData.lastName}`.trim();
        await onSubmit({ email: formData.email, password: formData.password, displayName });
      } else {
        await onSubmit({ email: formData.email, password: formData.password });
      }
    } catch (err) {
      const errorMessage = getFirebaseErrorMessage(err.code);
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md p-8 rounded-2xl border border-cyan-500/50">

      {isRegister && (
        <>
          <Input
            label="First name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange} />
          <Input
            label="Last name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange} />
        </>)}

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange} />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange} />

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">{error}</div>
      )}

      <button
        type="submit"
        className="mt-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-lg transition-colors cursor-pointer">
        {isRegister ? 'Register' : 'Login'}
      </button>
    </form>
  );
}