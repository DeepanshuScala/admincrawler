import React, { useState } from "react";
import { useFormik, FormikProvider, ErrorMessage } from "formik";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PrimaryButton from "../../common/FormElements/Button/PrimaryButton";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import * as Yup from "yup";
import { axiosTempInstance } from "../../config/axiosInstance";
import { enqueueSnackbar } from "notistack";
import { postData } from "../../utils/api";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import loginLogo from "../../assets/img/LogoSign.svg";
import logo from "../../assets/img/logo.svg"
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [verfiyOtp, setVerifyOtp] = useState();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    email: Yup.string().email("Invalid Email").required("Email is required."),
    gender: Yup.string().required("Gender is required."),
    age: Yup.number()
      .typeError("Age is number.")
      .positive("Must be a positive value")
      .required("Age is required."),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(12, "Too Long!")
      .required("Password is required "),
    confirmPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required")
      .min(3)
      .matches(/^\S*$/, "Password cannot be all whitespace"),
  });

  const handleResendOtp = async (userId) => {
    // setLoading(true);
    const res = await postData("auth/resend/otp", {
      type: "email",
      user: userId,
    });
    if (res.data) {
      enqueueSnackbar(res.data.message ?? "", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(
        res.error?.message
          ? formatErrorMessage(res.error?.message)
          : "Something went wrong",
        {
          variant: "error",
        }
      );
    }
    // setLoading(false);
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      age: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const res = await postData("auth/signup", {
        ...values,
        age: +values.age,
      });
      if (res.data) {
        // setUserId(res.data.id);
        console.log(res.data, "?>>>>>>> signup response");
        enqueueSnackbar(res.data.message ?? "", {
          variant: "success",
        });
        setVerifyOtp(res.data.user);
        // navigate("/login");
        resetForm();
        // setUserId("");
        // setEmail("");
        // setOpenForgetModel(false);
        // resetForm();
      } else {
        enqueueSnackbar(
          res.error?.message
            ? formatErrorMessage(res.error?.message)
            : "Something went wrong",
          {
            variant: "error",
          }
        );
      }
      setLoading(false);
    },
  });

  const { handleChange, handleBlur, handleSubmit } = formik;

  const verifyOtpFormik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object().shape({
      otp: Yup.string()
        .matches(/^\d{6}$/, "OTP must be a 6-digit number")
        .length(6, "OTP , should be of 6 digit")
        .required("OTP is required."),
    }),
    onSubmit: async (values, resetForm) => {
      setLoading(true);
      const res = await postData("auth/verify/otp", {
        user: verfiyOtp?._id,
        otp: +values.otp,
        type: "email",
      });
      if (res.data) {
        // setUserId(res.data.id);
        console.log(res.data, "?>>>>>>> signup response");
        enqueueSnackbar(res.data.message ?? "", {
          variant: "success",
        });
        setVerifyOtp(res.data.user);
        navigate("/login");
        resetForm();
        // setUserId("");
        // setEmail("");
        // setOpenForgetModel(false);
        // resetForm();
      } else {
        enqueueSnackbar(
          res.error?.message
            ? formatErrorMessage(res.error?.message)
            : "Something went wrong",
          {
            variant: "error",
          }
        );
      }
      setLoading(false);
    },
  });

  return (
    <>
      <div className="w-full h-[100%]  flex ">
        {/* left section  */}
        <div className=" hidden md:flex w-full h-min-screen bg-[#282823]  justify-center items-center">
          <img src={loginLogo} alt="" className="w-[107px]" />
        </div>
        {/* Right section */}
        <div className="w-full h-full  flex flex-col  justify-center items-center mb-[20px]  ">
      
          <div
            className={classNames([
              " md:w-[480px]  p-4  rounded-lg",
              {
                "mt-36": !!verfiyOtp,
                "mt-5": !verfiyOtp,
              },
            ])}
          >
            <div className="w-full md:flex md:justify-center md:items-center mt-8">
               <img src={logo} className=""/>
            </div>
              
            <KeyboardBackspaceIcon className="mt-4"/>
            
            <h1 className="text-black text-h1 text-[] font-ubuntu font-bold mb-4 mt-2">
              {verfiyOtp
                ? "Verify Otp"
                : "Register for a PinnTag account for your business"}
            </h1>
            <p className=" font-ubuntu text-subtitle1 text-[#6C7278]">
              Let’s login into your Pinntag Business account first
            </p>
            {verfiyOtp ? (
              <FormikProvider value={verifyOtpFormik}>
                <div className="mb-3">
                  <input
                    className="model-input"
                    name="otp"
                    placeholder="OTP"
                    value={verifyOtpFormik.values.otp}
                    onChange={verifyOtpFormik.handleChange}
                    onBlur={verifyOtpFormik.handleBlur}
                  />
                  <span className="font-semibold pl-1 text-sm text-red-600">
                    <ErrorMessage name="confirmPassword" />
                  </span>
                </div>
                <div className="mb-3">
                  <h1
                    onClick={() => {
                      handleResendOtp(verfiyOtp?._id);
                    }}
                    className="text-sm cursor-pointer text-[#45818E] font-semibold text-right"
                  >
                    Resend Otp ?
                  </h1>
                </div>
                <div className="flex justify-center">
                  <PrimaryButton
                    onClick={verifyOtpFormik.handleSubmit}
                    inputClass="py-2 w-1/3"
                    loading={loading}
                  >
                    Verify otp
                  </PrimaryButton>
                </div>
              </FormikProvider>
            ) : (
              <FormikProvider value={formik}>
                <div className="mt-8">
                  {/* USER NAME */}
                  <div className="mb-4 flex space-x-3">
                       <div>
                           <input
                        type="text"
                        className="border border-[#DCE4E8] placeholder-opacity-0 transition duration-200  w-full h-[56px] px-4 rounded-xl  outline-none"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    <span className="font-semibold text-sm text-red-600 ">
                      <ErrorMessage name="firstName" />
                    </span>
                       </div>
                   
                    <div className="">
                  <input
                    type="text"
                    className="border border-[#DCE4E8] placeholder-opacity-0 transition duration-200  w-full h-[56px] px-4 rounded-xl  outline-none"
                    name="lastName"
                    placeholder="Last name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="font-semibold text-sm text-red-600">
                    <ErrorMessage name="lastName" />
                  </span>
                </div> 
                  </div>
                  {/* EMAIL */}
                  <div className="mb-4">
                    
                      <input
                        type="text"
                        className="border border-[#DCE4E8] border-opacity-50 placeholder-opacity-0 transition duration-200  w-full h-[56px] rounded-xl px-4  outline-none"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                     

                    <span className="font-semibold text-sm text-red-600 ">
                      <ErrorMessage name="email" />
                    </span>
                  </div>
                  {/* Password */}
                  <div className="mb-4">
                   
                      <div className=" relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="border border-[#DCE4E8] border-opacity-50  placeholder-opacity-0 transition duration-200  w-full h-[56px] rounded-xl px-4  outline-none"
                          name="password"
                          placeholder="Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <span
                          onClick={() => {
                            setShowPassword((prev) => !prev);
                          }}
                          className="absolute top-[50%] right-[10px] translate-y-[-50%] cursor-pointer"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <RemoveRedEyeIcon />
                          )}
                        </span>
                      </div>
                     

                    <span className="font-semibold text-sm text-red-600">
                      <ErrorMessage name="password" />
                    </span>
                  </div>
                   {/* CONFIRMPASSWORD */}
                  <div className="mb-4 relative">
                      <input
                        type={"password"}
                        className="border border-[#DCE4E8] border-opacity-50  placeholder-opacity-0 transition duration-200  w-full h-[56px] rounded-xl px-4  outline-none"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    

                    <span className="font-semibold text-sm text-red-600">
                      <ErrorMessage name="confirmPassword" />
                    </span>
                  </div>
               
                  {/* AGE & GENDER */}
                  <div className="flex space-x-3">
                    <div className="mb-4 w-full">
                  <input
                    type="text"
                    className="border border-[#DCE4E8] placeholder-opacity-0 transition duration-200  w-full h-[56px] px-4 rounded-xl  outline-none"
                    name="age"
                    placeholder="Age"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="font-semibold text-sm text-red-600">
                    <ErrorMessage name="age" />
                  </span>
                </div> 

                 <div className=" w-full mb-4">
                  <select
                    className="w-full border text-[#ACB5BB] border-[#DCE4E8] placeholder-opacity-0 transition duration-200  h-[56px] px-4 rounded-xl  outline-none"
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option>Gender</option>
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                    <option value={"other"}>Other</option>
                    <option value={"rather_not_say"}>Rather not say</option>
                  </select>
                  <span className="font-semibold text-sm text-red-600">
                    <ErrorMessage name="gender" />
                  </span>
                </div>
                  </div>
               

                  <div className="mb-3">
                  <input
                    type="text"
                    className="border border-[#DCE4E8] placeholder-opacity-0 transition duration-200  w-full h-[56px] px-4 rounded-xl  outline-none"
                    name="bonusCode"
                    placeholder="Bonus code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="font-semibold text-sm text-red-600">
                    <ErrorMessage name="bonusCode" />
                  </span>
                </div> 
                   <div className="mb-2">
                <Link to="/login">
                  <h1
                    // onClick={() => setOpenForgetModel(true)}
                    className="text-sm cursor-pointer text-[#45818E] font-semibold text-right"
                  >
                    Sign in ?
                  </h1>
                </Link>
              </div>
                  <div className="flex justify-center">
                    <PrimaryButton
                      onClick={formik.handleSubmit}
                      inputClass="py-2 w-full h-[58px] bg-[#03B4BF] rounded-full"
                      loading={loading}
                    >
                      Sign up
                    </PrimaryButton>
                  </div>
                  <div className="mt-1">
                    <h1 className="text-sm cursor-pointer font-semibold text-center">
                      ALready have an account ?{" "}
                      <Link to="/login">
                        <span className="text-[#45818E]">Sign in</span>
                      </Link>
                    </h1>
                  </div>
                </div>
              </FormikProvider>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
