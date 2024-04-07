import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import loginLogo from "../../assets/img/LogoSign.svg";
import logo from "../../assets/img/logo.svg"
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import PrimaryButton from "../../common/FormElements/Button/PrimaryButton";
import { axiosInstance, axiosTempInstance } from "../../config/axiosInstance";
import { PINNTAG_USER } from "../../config/routes/RoleProtectedRoute";
import { useAuthentication } from "../../context/authContext";
import ForgotPasswordModel from "../../component/authScreen/ForgotPasswordModel";
import { formatErrorMessage } from "../../utils/formatErrorMessage";

const Login = () => {
  const [openForgetModel, setOpenForgetModel] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useAuthentication();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosTempInstance.post("/auth/admin/login", {
        ...formData,
      });
      setUser(response.data);
      localStorage.setItem(
        PINNTAG_USER,
        JSON.stringify({ ...response.data, me: response?.data?.token })
      );
      enqueueSnackbar("Login successfully", { variant: "success" });
      axiosTempInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response?.data?.token}`;
      // axiosInstance.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${response?.data?.tokens[0]?.businessToken}`;
      window.location.href = '/dashboard';
    } catch (err) {
      console.log(err, "...... err");
      enqueueSnackbar(
        err?.response?.data?.message
          ? formatErrorMessage(err?.response?.data?.message)
          : "Wrong credentials",
        {
          variant: "error",
        }
      );
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex w-full h-screen">
        {/*Left section  */}
        <div className=" hidden md:flex w-full h-screen bg-[#282823]  justify-center items-center">
          <img src={loginLogo} alt="" className="w-[107px]" />
        </div>
        {/* Right Section */}
        <div className="w-full flex flex-col  items-center p-4  rounded-lg md:mt-36 mt-7">
           <div className="w-full md:flex  md:justify-center md:items-center">
               <img src={logo} className=""/>
            </div>
            
          <div className=" w-full md:w-[480px] mt-8 ">
          <KeyboardBackspaceIcon className="mt-4"/>
          <h1 className="text-black text-h1 text-[] font-ubuntu font-bold mb-4 mt-8">
            Admin PinnTag
          </h1>
          <div className="mt-8">
            <div className="mb-4">
              <input
                type="text"
                className="border border-[#DCE4E8] placeholder-opacity-0 transition duration-200  w-full h-[56px] px-4 rounded-xl  outline-none"
                name="email"
                placeholder="Login"
                onChange={handleChange}
              />
            </div>
            <div className="mb-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                className="border border-[#DCE4E8] placeholder-opacity-0 transition duration-200  w-full h-[56px] px-4 rounded-xl  outline-none"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <span
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
                className="absolute top-[50%] right-[10px] translate-y-[-50%] cursor-pointer"
              >
                {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
              </span>
            </div>
            <div className="flex justify-center">
              <PrimaryButton
                onClick={handleSubmit}
                inputClass="py-2 w-1/3"
                loading={loading}
                isSocialAuth={true}
              >
                LogIn
              </PrimaryButton>
            </div>
          </div>
          </div>
          
        </div>
      </div>
      <ForgotPasswordModel
        openForgetModel={openForgetModel}
        setOpenForgetModel={setOpenForgetModel}
      />
    </>
  );
};

export default Login;
