import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

const AuthPage = () => {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default AuthPage;
