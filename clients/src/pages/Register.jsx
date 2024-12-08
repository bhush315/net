import { useState } from "react";
import axios from "axios";
import { RiLoader5Line } from "react-icons/ri";
import { RiLoaderFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorOcurred, setErrorOcurred] = useState(false);
  const [errorMssg, setErrorMssg] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorOcurred(false);

    try {
      setTimeout(async () => {
        const { data } = await axios.post(
          "http://localhost:6300/auth/api/register",
          { name, email, password }
        );
        if (data.success) {
          navigate("/dashboard");
        } else {
          if (!errorOcurred) {
            //console.error(data.message);
            setErrorMssg(data.message);
            setErrorOcurred(true);
            setTimeout(() => {
              setErrorOcurred(false);
            }, 4000);
          }
        }

        setIsLoading(false);
      }, 3000);
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
          className="flex flex-col space-y-3 bg-black/85 p-12 rounded-lg shadow-2xl "
          method="POST"
          onSubmit={submitHandler}
        >
          <h1 className="text-4xl font-bold mb-3">Register Account</h1>

          {errorOcurred ? (
            <span className="py-3 px-5 bg-yellow-400/30 rounded-md shadow-md font-bold text-center animate-pulse">
              {errorMssg}
            </span>
          ) : null}

          <input
            type="text"
            name="name"
            className="py-3 w-80 pr-4 pl-4 bg-transparent border-2 border-gray-500 outline-none focus:bg-transparent"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            className="py-3 w-80 pr-4 pl-4 bg-transparent border-2 border-gray-500 outline-none focus:bg-transparent"
            placeholder="Email or mobile number"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            className="py-3 w-80 pr-4 pl-4 bg-transparent border-2 border-gray-500 outline-none focus:bg-transparent"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            disabled={isLoading}
            className="flex items-center justify-center  gap-3 bg-[#E50914] rounded-md py-2"
          >
            {isLoading ? (
              <>
                <RiLoader5Line size="26px" className="animate-spin" />
              </>
            ) : (
              "Register"
            )}
          </button>
          <p className="text-center">OR</p>
          <span
            className="flex items-center justify-center  gap-3 bg-gray-600/30 rounded-md py-2 text-center cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign In <RiLoaderFill size="10px" className="animate-ping" />
          </span>
        </form>
      </div>
    </section>
  );
};

export default Register;
