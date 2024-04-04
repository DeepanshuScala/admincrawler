import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import PrimaryModal from "../../common/Modal/PrimaryModal";
import FullButton from "../../common/FormElements/Button/FullButton";
import { postData } from "../../utils/api";
import { Form } from "react-router-dom";
import { formatErrorMessage } from "../../utils/formatErrorMessage";

const ForgotPasswordModel = ({ setOpenForgetModel, openForgetModel }) => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const initState = {
    otp: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
      .length(6, "OTP , should be of 6 digit")
      .required("OTP is required."),
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

  const resetPasswordFormik = useFormik({
    initialValues: initState,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const res = await postData("auth/resetPassword", {
        ...values,
        id: userId,
        otp: values.otp * 1
      });
      if (res.data) {
        setUserId(res.data.id);
        enqueueSnackbar(res.data.message ?? "", {
          variant: "success",
        });
        setUserId("");
        setEmail("");
        setOpenForgetModel(false);
        resetForm();
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

  const { handleChange, handleBlur, values } = resetPasswordFormik;

  const handleSendOtp = async () => {
    setLoading(true);
    const res = await postData("auth/forgotPassword", { email });
    if (res.data) {
      setUserId(res.data.id);
      enqueueSnackbar(res.data.message ?? "", {
        variant: "success",
      });
    } else {
      console.log(res);
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
  };

  const handleResendOtp = async () => {
    setLoading(true)
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
    setLoading(false)
  };

  return (
    <>
      <PrimaryModal
        open={openForgetModel}
        handleClose={() => setOpenForgetModel(false)}
        modalClass="w-[400px] xl:w-[500px] h-fit"
      >
        {userId ? (
          <>
            <FormikProvider value={resetPasswordFormik}>
              <Form>
                <h1 className="text-lg font-semibold text-center mb-3">
                  Reset Password
                </h1>
                <div className="mb-3">
                  <input
                    type="password"
                    className="model-input"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="font-semibold pl-1 text-sm text-red-600">
                    <ErrorMessage name="password" />
                  </span>
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="model-input"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="font-semibold pl-1 text-sm text-red-600">
                    <ErrorMessage name="confirmPassword" />
                  </span>
                </div>
                <div className="mb-3">
                  <input
                    className="model-input"
                    name="otp"
                    placeholder="OTP"
                    value={values.otp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="font-semibold pl-1 text-sm text-red-600">
                    <ErrorMessage name="otp" />
                  </span>
                </div>
                <div className="mt-2">
                  <h1
                    onClick={handleResendOtp}
                    className="text-sm cursor-pointer text-[#45818E] font-semibold text-right"
                  >
                    Didn't receive a code ?
                  </h1>
                </div>
                <div className="flex justify-center">
                  <FullButton
                    loading={loading}
                    onClick={resetPasswordFormik.handleSubmit}
                    inputClass="py-2 !w-2/5 bg-[#45818E] text-white"
                  >
                    Reset password
                  </FullButton>
                </div>
              </Form>
            </FormikProvider>
          </>
        ) : (
          <>
            <h1 className="text-lg font-semibold text-center mb-2">
              Forgot Password ?
            </h1>
            <p className="text-sm font-semibold mb-4 pl-1 text-[#45818E]">
              Enter your Pinntag account email address.
            </p>
            <div>
              <input
                type="email"
                className="model-input"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <FullButton
                onClick={handleSendOtp}
                inputClass="py-2 !w-1/3 bg-[#45818E] text-white"
                loading={loading}
              >
                Next
              </FullButton>
            </div>
          </>
        )}
      </PrimaryModal>
    </>
  );
};

export default ForgotPasswordModel;
