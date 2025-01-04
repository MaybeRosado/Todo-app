import { useState } from "react";
import { loginUser } from "../services/auth";
import Register from "./Register";
import PasswordReset from "./PasswordReset";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState("login"); // "login", "register", or "reset"

  const getErrorMessage = (error) => {
    if (error?.code) {
      const errorMessages = {
        "auth/invalid-email": "Invalid email format",
        "auth/user-disabled": "This account has been disabled",
        "auth/user-not-found": "No account exists with this email",
        "auth/wrong-password": "Incorrect password",
        "auth/invalid-credential": "Invalid email or password",
        "auth/too-many-requests": "Too many failed attempts. Please try again later",
        "auth/network-request-failed": "Connection error. Please check your internet connection",
        "auth/invalid-login-credentials": "Invalid email or password"
      };
      return errorMessages[error.code] || `Authentication error: ${error.code}`;
    }

    return error?.message || "An error occurred during login";
  };

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const loggedUser = await loginUser(email, password);
      setUser(loggedUser);
    } catch (error) {
      console.error("Login error:", error);
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSuccess = (newUser) => {
    setUser(newUser);
    setView("login");
    setError("");
  };

  const renderView = () => {
    switch (view) {
      case "register":
        return (
          <Register
            setUser={setUser}
            toggleForm={() => setView("login")}
            handleRegisterSuccess={handleRegisterSuccess}
          />
        );
      case "reset":
        return <PasswordReset onBack={() => setView("login")} />;
      default:
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-center mt-4 space-y-2">
              <button
                type="button"
                onClick={() => setView("reset")}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </button>
              
              <div>
                <p className="text-sm text-gray-600">Don't have an account?</p>
                <button
                  type="button"
                  onClick={() => setView("register")}
                  className="mt-1 text-indigo-600 hover:text-indigo-500"
                  disabled={isLoading}
                >
                  Create an account
                </button>
              </div>
            </div>
          </form>
        );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {view === "login" ? "Login" : view === "register" ? "Register" : "Reset Password"}
      </h2>
      {renderView()}
    </div>
  );
};

export default Login;