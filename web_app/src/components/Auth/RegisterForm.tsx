import { useState } from "react";
import { toast } from "react-toastify";
import { login, register, getMe } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { RegisterData } from "../../types/auth";

const RegisterForm = () => {
  const [form, setForm] = useState<RegisterData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await register(form);

      const loginResponse = await login({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", loginResponse.access_token);

      const user = await getMe();
      setUser(user);

      toast.success("Registered and logged in successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="first_name"
        placeholder="First Name"
        value={form.first_name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        name="last_name"
        placeholder="Last Name"
        value={form.last_name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
