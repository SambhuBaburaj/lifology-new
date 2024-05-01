import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OTPsend, RegisterDatacall, varifyOTP } from "../API/ApiCall";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const Navigate = useNavigate();
  const [err, setErr] = useState();
  const [showOtp, setShowOtp] = useState(false);
  const [otpError, setotpError] = useState("");
const [email,setemail]=useState("")
  const RegisterForm = (e) => {
    e.preventDefault();
    setErr("");
    const form = new FormData(e.target);
    const Userdata = Object.fromEntries(form);

    if (Userdata.username.length < 5) {
      setErr("username need to be atleast 5 letters");
    } else if (Userdata.password.length < 5) {
      setErr("password need to be atleast 5 letters");
    } else {
      OTPsend(Userdata)
        .then((data) => {
          setShowOtp(true);
        })
        .catch((err) => {
          setErr("email already exist");
        });
    }
  };
  const [otp, setOTP] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    // Ensure input is a number
    if (!isNaN(value) && value !== "") {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      // Move focus to the next input field
      if (index < 3 && value !== "") {
        document.getElementById(`otp${index + 1}`).focus();
      }
    } else if (value === "") {
      // Allow deleting the number
      const newOTP = [...otp];
      newOTP[index] = "";
      setOTP(newOTP);
      // Move focus to the previous input field
      if (index > 0) {
        document.getElementById(`otp${index - 1}`).focus();
      }
    }
  };

  const OtpVarify = (e) => {
    e.preventDefault();
    const stringFromArray = otp.join("");
    console.log(stringFromArray);

    varifyOTP({email:email,
      otp:stringFromArray
    }).then((data)=>
  {
   

    Navigate("/login",{ state: "account created" })


  }).catch((err)=>
{
  setotpError("otp verification failed")


})
  };

  return (
    <div className="bg-gray-900">
       <ToastContainer />
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
          <p className="text-2xl flex justify-center font-bold mb-3 text-white">
            Register
          </p>
          <p className="text-red-500 font-bold">{err}</p>
          <form onSubmit={RegisterForm} action="">
            <input
              onChange={() => {
                setShowOtp(false);
                setOTP(["", "", "", ""]);
              }}
              name="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  px-4 py-2  border-solid "
              type="text"
              placeholder="Username"
            />

            <input
              onChange={(e) => {
                setemail(e.target.value)
                setShowOtp(false);
                setOTP(["", "", "", ""]);
              }}
              name="email"
              className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  px-4 py-2  border-solid "
              type="email"
              placeholder="Email Address"
            />
            <input
              onChange={() => {
                setShowOtp(false);
                setOTP(["", "", "", ""]);
              }}
              name="password"
              className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  px-4 py-2  border-solid "
              type="password"
              placeholder="Password"
            />
            {!showOtp && (
              <div className="text-center md:text-left">
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  type="submit"
                >
                  Register
                </button>
              </div>
            )}
          </form>

          {showOtp && (
            <form onSubmit={OtpVarify} method="post">
              <p className="text-center text-white p-2">varify OTP</p>
              <p className="text-red-500 text-center ">{otpError}</p>
              <div class="flex flex-col space-y-6 p-5">
                <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="mb-4 gap-2 flex justify-between">
                    {otp.map((value, index) => (
                      <input
                        key={index}
                        type="text"
                        id={`otp${index}`}
                        name={`otp${index}`}
                        maxLength={1}
                        value={value}
                        onChange={(e) =>{ handleChange(index, e.target.value)
                          setotpError("")}
                        }
                        className="w-1/4 text-center border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
                      />
                    ))}
                  </div>
                </div>

                <div class="flex flex-col ">
                  <div className="flex justify-center">
                    <button
                      className=" bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                      type="submit"
                    >
                      varify
                    </button>
                  </div>


                </div>
              </div>
            </form>
          )}

          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Already have an account!{" "}
            <a
              onClick={() => {
                Navigate("/");
              }}
              className="text-red-600 hover:underline hover:underline-offset-4"
              href="#"
            >
              Login
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
