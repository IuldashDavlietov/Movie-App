import { useState } from "react";

export default function AuthForm({ isRegister, onSubmit }) {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      const displayName = `${formData.firstName} ${formData.lastName}`.trim();
      onSubmit(
        {
          email: formData.email,
          password: formData.password,
          displayName
        })
    } else {
      onSubmit({
        email: formData.email,
        password: formData.password,
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-6 w-full max-w-md p-8 rounded-2xl border border-cyan-500/50 ">
      {isRegister && (
        <>
          <div className="relative">
            <label> First name <input className=" peer w-full bg-transparent border-b border-gray-600 focus:border-cyan-500/50 outline-none py-2 placeholder-transparent"
              type="text"
              name='firstName'
              value={formData.firstName}
              onChange={handleChange} /> </label>
          </div>

          <div className="relative">
            <label> Last name <input className=" peer w-full bg-transparent border-b border-gray-600 focus:border-cyan-500/50 outline-none py-2 placeholder-transparent"
              type="text"
              name='lastName'
              value={formData.lastName}
              onChange={handleChange} /> </label>
          </div>
        </>)}

      <div className="relative">
        <label>Email <input className=" peer w-full bg-transparent border-b border-gray-600 focus:border-cyan-500/50 outline-none py-2 placeholder-transparent"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange} /> </label>
      </div>

      <div className="relative">
        <label> Password <input className=" peer w-full bg-transparent border-b border-gray-600 focus:border-cyan-500/50 outline-none  py-2 placeholder-transparent"
          type="password"
          name='password'
          value={formData.password}
          onChange={handleChange} /> </label>
      </div>
      <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
    </form>
  )
}
