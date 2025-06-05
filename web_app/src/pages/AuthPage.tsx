import { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {isRegistering ? "Register" : "Login"}
      </h1>

      {isRegistering ? (
        <>
          <RegisterForm />
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => setIsRegistering(false)}
              className="text-blue-600 hover:underline"
            >
              Login here
            </button>
          </p>
        </>
      ) : (
        <>
          <LoginForm />
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => setIsRegistering(true)}
              className="text-blue-600 hover:underline"
            >
              Register here
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;
