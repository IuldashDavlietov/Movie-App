import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivatRouter from "./PrivatRouter";
import Details from "../pages/Details";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivatRouter />}>
        <Route path="/details/:id" element={<Details />} />
      </Route>
    </Routes>
  );
}
