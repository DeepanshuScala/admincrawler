import React, { useState } from "react";
import { ErrorMessage, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import CheckBox from "../../common/FormElements/CheckBox/CheckBox";
import PrimaryButton from "../../common/FormElements/Button/PrimaryButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SecondaryButton from "../../common/FormElements/Button/SecondaryButton";
import PrimaryModal from "../../common/Modal/PrimaryModal";
import { Add } from "@mui/icons-material";
import { postData } from "../../utils/api";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import TextInput from "../../common/FormElements/Input/TextInput";
import PrimarySwitch from "../../common/FormElements/Switch/PrimarySwitch";
import CloseIcon from '@mui/icons-material/Close';

const PHONE_REGX =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const AddBusiness = ({ open, handleClose, fetchAllBusinessDetails }) => {
  const [loading, setLoading] = useState(false);

  const initState = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    createContent: false,
    publishContent: false,
    publishSocialMedia: false,
    manageBusinessUsers: false,
    editLocations: false,
    imageGallery: false,
    businessDetails: false,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Too short!")
      .required("First name required."),
    lastName: Yup.string().min(3, "Too short!").required("Last name required."),
    phone: Yup.string()
      .matches(PHONE_REGX, "Phone number is not valid")
      .required("Mobile Number is required."),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: initState,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true)
        console.log(values)
        console.log("12")
        const res = await postData("business-profile/create/staff/member", {
          ...values,
        });
        if (res.data) {
          enqueueSnackbar(res.data.message ?? "", {
            variant: "success",
          });
          fetchAllBusinessDetails();
          handleClose();
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
        } catch (error) {
          enqueueSnackbar(formatErrorMessage(error.message), { variant: "error" });
        } finally {
          setLoading(false);
        }
    },
  });

  const { handleBlur, handleChange, values, errors, touched } = formik;

  return (
    <PrimaryModal 
      open={open}
      handleClose={() => {
        handleClose();
        formik.resetForm();
      }}
      modalClass="max-w-[500px]">
      <FormikProvider value={formik}>
        <Form>
          <div className="pt-2 pb-4 flex justify-between">
            <h1 className="text-center font-medium text-xl">Add User</h1>
            <CloseIcon onClick={() => {
              handleClose();
              formik.resetForm();
            }} className="w-6 h-6 text-[#9A9A9A] cursor-pointer" />

          </div>

          <div className="mb-5">
          
            <TextInput name="firstName" label="First Name" onChange={handleChange}
              onBlur={handleBlur}/>
            <span className="font-semibold text-sm text-red-600">
              <ErrorMessage c name="firstName" />
            </span>
          </div>

          <div className="mb-5">
            <TextInput name="lastName" label="Last Name" onChange={handleChange}
              onBlur={handleBlur} />
            <span className="font-semibold text-sm text-red-600 ">
              <ErrorMessage name="lastName" />
            </span>
          </div>

          <div className="mb-5">
            <TextInput name="phone" label="Mobile Phone" onChange={handleChange}
              onBlur={handleBlur} />
            <span className="font-semibold pl-1 text-sm text-red-600">
              <ErrorMessage name="phone" />
            </span>
          </div>

          <div className="mb-5">
            <TextInput name="email" label="Email" onChange={handleChange}
              onBlur={handleBlur} />
            <span className="font-semibold pl-1 text-sm text-red-600">
              <ErrorMessage name="email" />
            </span>
          </div>

          <div>
            <h1 className="text-base font-bold mb-3">Privileges</h1>
            <div className="">
              <PrimarySwitch labelText="Edit business details" onChange={handleChange}
                name="businessDetails"
                defaultValue={values.businessDetails} />
            </div>
            <div className="">
              <PrimarySwitch labelText="Create content" onChange={handleChange}
                name="createContent"
                defaultValue={values.businessDetails} />
            </div>
            <div className="">

              <PrimarySwitch onChange={handleChange}
                labelText="Publish content"
                name="publishContent"
                defaultValue={values.businessDetails} />
            </div>
            <div className="">

              <PrimarySwitch onChange={handleChange}
                labelText="Publish to social Media"
                name="publishSocialMedia"
                defaultValue={values.businessDetails} />
            </div>
            <div className="">

              <PrimarySwitch onChange={handleChange}
                labelText="Edit image gallery"
                name="imageGallery"
                defaultValue={values.businessDetails} />
            </div>
            <div className="">

              <PrimarySwitch onChange={handleChange}
                labelText="Edit locations"
                name="editLocations"
                defaultValue={values.businessDetails} />
            </div>
            <div className="">

              <PrimarySwitch onChange={handleChange}
                labelText="Manage business users"
                name="manageBusinessUsers"
                defaultValue={values.businessDetails} />
            </div>
          </div>
          <div className="mt-6 flex justify-end items-center gap-2">
            <div className="flex">
              <SecondaryButton inputClass='bg-[#E3E3D8] tex-[#74746E] min-w-[140px]'
                onClick={() => handleClose()}>
                <>Cancel</>
              </SecondaryButton>
            </div>
            <div>
              <PrimaryButton
                type="submit"
                loading={loading}
                onClick={formik.handleSubmit}
                inputClass={"min-w-[140px]"}
              >
                <span>Add User</span>
              </PrimaryButton>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </PrimaryModal>
  );
};

export default AddBusiness;
