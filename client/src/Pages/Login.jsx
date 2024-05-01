import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { LoginUserdata, googleAuthApi } from "../API/ApiCall";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const LoginIn = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [errmsg, setErrmsg] = useState("");
  const [loading, setloading] = useState(false);
  const GoogleAuth = (credentialResponse) => {
    console.log(credentialResponse.credential);
    const credentials = jwtDecode(credentialResponse.credential);
    setloading(true);
    googleAuthApi(credentials)
      .then(({ data }) => {
        console.log(data);

        localStorage.setItem("Userdata", data.AccessToken);
        navigate("/");
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  const LoginUser = (e) => {
    e.preventDefault();

    setErrmsg("");

    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);

    LoginUserdata(UserData)
      .then(({ data }) => {
        console.log(data?.AccessToken);
        localStorage.setItem("Userdata", data?.AccessToken);
        navigate("/");
      })
      .catch((err) => {
        setErrmsg("email/password is incorrect");
      });

    // Validate(UserData.email).then(data=>
    //   {
    //     navigate('/home')
    //   }).catch(err=>
    //     {
    //       navigate('/addetails')
    //     })
  };
console.log(location.state);
  return (
    <div className="bg-gray-900">
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
          <p className=" items-center flex text-2xl flex justify-center font-bold mb-3 text-white">
            Login
          </p>
          <p className="text-red-500 font-bold flex justify-center">{errmsg}</p>

          {location?.state ? (
            <p className="text-green-500 font-bold flex justify-center mb-2">
              {location?.state}
            </p>
          ) : (
            <></>
          )}
          <form onSubmit={LoginUser} action="">
            <input
              required
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  px-4 py-2  border-solid "
              type="text"
              placeholder="Email Address"
            />
            <input
              required
              name="password"
              className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  px-4 py-2  border-solid "
              type="password"
              placeholder="Password"
            />
            <div className="mt-4 flex justify-between font-semibold text-sm"></div>
            <div className="text-center md:text-left flex justify-center">
              <button
                className="mt-4  bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                Login
              </button>
            </div>
            <p className="text-white text-center p-2">OR</p>
            <div className="flex justify-center">
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                <GoogleOAuthProvider clientId="297430789385-crn1f3e9mib7ho92vk4udvtf8i107cjd.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    GoogleAuth(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
              )}
            </div>
          </form>

          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left flex justify-center">
            Don't have an account?{" "}
            <a
              onClick={() => {
                navigate("/register");
              }}
              className="text-red-600 hover:underline hover:underline-offset-4"
              href="#!"
            >
              Register
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginIn;
