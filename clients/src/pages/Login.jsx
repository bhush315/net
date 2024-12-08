import { useState } from "react";
import { RiLoader5Line } from "react-icons/ri";
import { RiLoaderFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorOcurred, setErrorOcurred] = useState(false);
  const [errorMessage, setErrormessage] = useState("");

  const LoginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorOcurred(false);

    try {
      setTimeout(async () => {
        const { data } = await axios.post(
          "http://localhost:6300/auth/api/login",
          { email, password },
          { withCredentials: true }
        );
        if (data.success) {
          navigate("/dashboard");
        } else {
          if (!errorOcurred) {
            setErrormessage(data.message);
            setErrorOcurred(true);
          }

          setTimeout(() => {
            setErrorOcurred(false);
          }, 3000);
        }

        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="relative bg-[url('/bg.jpg')] bg-center bg-cover min-h-screen">
      <div>
        <img src="../logo.svg" className="w-[150px] relative top-8 left-40" />
      </div>

      <div className="mt-14 flex justify-center items-center text-white">
        <form
          className="flex flex-col space-y-3 bg-black/85 p-12 rounded-sm"
          method="POST"
          onSubmit={LoginHandler}
        >
          <h1 className="text-4xl font-bold mb-3">Sign In</h1>
          {errorOcurred ? (
            <span className="py-3 px-5 bg-yellow-400/30 rounded-md shadow-md font-bold text-center animate-pulse">
              {errorMessage}
            </span>
          ) : null}
          <input
            type="email"
            name="username"
            className="py-3 w-80 pr-4 pl-4 bg-transparent border-2 border-gray-500 outline-none focus:bg-transparent"
            placeholder="Email or mobile number"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            className="py-3 w-80 pr-4 pl-4 bg-transparent border-2 border-gray-500"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="flex items-center justify-center  gap-3 bg-[#E50914] rounded-md py-2">
            {isLoading ? (
              <>
                <RiLoader5Line size="26px" className="animate-spin" />
              </>
            ) : (
              "Sign In"
            )}
          </button>
          <p className="text-center">OR</p>
          <span
            className="flex items-center justify-center  gap-3 bg-gray-600/30 rounded-md py-2 text-center cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign Up <RiLoaderFill size="10px" className="animate-ping" />
          </span>
        </form>
      </div>
    </section>
  );
};

export default Login;
