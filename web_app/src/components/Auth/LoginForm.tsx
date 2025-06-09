import { useState } from "react";
import { toast } from "react-toastify";
import { login, getMe } from "../../api/auth";
import type { LoginData } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = () => {
  const [form, setForm] = useState<LoginData>({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(form);
      localStorage.setItem("token", response.access_token);

      const user = await getMe();
      setUser(user);

      toast.success("Logged in!");
      navigate("/");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
