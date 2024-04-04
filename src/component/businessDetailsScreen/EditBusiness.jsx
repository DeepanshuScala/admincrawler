import {
  ErrorMessage,
  FieldArray,
  Form,
  FormikProvider,
  useFormik,
} from "formik";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../common/FormElements/Button/PrimaryButton";
import { Add } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SecondaryButton from "../../common/FormElements/Button/SecondaryButton";
import { useNavigate, useParams } from "react-router-dom";
import { deleteData, getDataTemp, postData } from "../../utils/api";
import FacebookLoginButton from "./SocialAuth/FacebookLoginButton";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import * as Yup from "yup";
import swal from "@sweetalert/with-react";
import { useAuthentication } from "../../context/authContext";
import { ReactComponent as Deleteicon } from '../../assets/icons/delete.svg'
import Text from "../../common/Text";

const PHONE_REGX =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const EditBusiness = () => {
  const [loading, setLoading] = useState(false);
  const {
    businessUser: { businessProfile },
    fetchUserDetails,
  } = useAuthentication();
  const initState = {
    name: "",
    businessType: "Business",
    bio: "",
    // businessCategory: "",
    businessImage: "",
    // imageBlob: "",
    // imageUrl: "",
    profilePhoto: "",
    // businessSocialMedia: [
    //   {
    //     app: "",
    //     password: "",
    //     userId: "",
    //   },
    // ],
    locations: [
      {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        website: "",
        email: "",
        phone: "",
      },
    ],
  };
  // console.log(businessUser, ">>>>>>>>>>> businessUser")

  const handleDeleteLocation = async (id, arrayHelpers, index) => {
    swal({
      // title: "Are you sure?",
      title: "Are you sure that you want to delete this location?",
      icon: "warning",
      buttons: [true, "Delete"],

      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteData(`business-profile/delete/location/${id}`);
        if (res.data) {
          arrayHelpers.remove(index);
          enqueueSnackbar(res.data.message ?? "", {
            variant: "success",
          });

          // fetchAllBusinessDetails();
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
      }
    });
  };

  useEffect(() => {
    if (businessProfile) {
      formik.setValues({
        ...initState,
        name: businessProfile?.name,
        bio: businessProfile?.bio,
        profilePhoto: businessProfile?.profilePhoto,
        locations: businessProfile?.locations,
      });
    }
  }, [businessProfile]);

  const navigate = useNavigate();
  const { id } = useParams();

  // const [data, setData] = useState();

  // const fetchBusinessDetail = async () => {
  //   const resposne = await getDataTemp(
  //     `business-profile/${businessUser?.businessProfile?._id}`
  //   );
  //   if (resposne.data) {
  //     const businessProfile = resposne.data?.businessProfile;
  //     setData(businessProfile);
  //     formik.setValues({
  //       ...initState,
  //       name: businessProfile?.name,
  //       bio: businessProfile?.bio,
  //       image: businessProfile?.image,
  //       locations: businessProfile?.locations,
  //     });
  //   } else {
  //     console.log(resposne.error, "Error while fetching business details");
  //   }
  // };

  // useEffect(() => {
  //   fetchBusinessDetail();
  // }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    bio: Yup.string().required("Bio is required."),
    locations: Yup.array().of(
      Yup.object().shape({
        address1: Yup.string().required("Address is required."),
        // address2: Yup.string().required("Bio is required."),
        city: Yup.string().required("City is required."),
        state: Yup.string().required("State is required."),
        zip: Yup.string().required("Zip is required."),
        website: Yup.string().required("Website is required."),
        email: Yup.string()
          .email("Invalid Email")
          .required("email is required."),
        phone: Yup.string()
          .matches(PHONE_REGX, "Phone number is not valid")
          .required("Mobile Number is required."),
      })
    ),
  });

  const formik = useFormik({
    initialValues: initState,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await postData("business-profile/update", {
        ...values,
        latitude: 28.7041,
        longitude: 77.1025,
      });
      if (res.data) {
        enqueueSnackbar(res.data.message ?? "", {
          variant: "success",
        });
        // fetchAllBusinessDetails();
        // handleClose();
        // resetForm();
        fetchUserDetails();
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setLoading(true);

        const formData = new FormData();
        formData.append("profilePhoto", file);

        const res = await postData("business-profile/update/photo", formData);

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
        fetchUserDetails();
        // fetchBusinessDetail();
        setLoading(false);
      } else {
        enqueueSnackbar("Only images allowed", {
          variant: "error",
        });
      }
    }
  };

  const { values, handleBlur } = formik;

  // console.log(formik.values, ">>>>> value", id);

  return (
    <div className="md:mx-10 mx-5">
      <FormikProvider value={formik}>
        <Form>

          <div className="flex items-center justify-between flex-wrap mb-5 gap-3">
            <Text className="text-[24px] mob:text-[16px] font-bold">
            Business Details
            </Text>


            <div className="gap-4 flex">
              <PrimaryButton
                inputClass="w-fit min-w-[150px] bg-[#E3E3D8] text-[#74746E] font-bold"
                onClick={() => navigate("/dashboard/business-details")} >
                Cancel
              </PrimaryButton>
              <PrimaryButton
                inputClass="w-fit min-w-[150px] font-bold"
                loading={loading}
                onClick={formik.handleSubmit}
              >
                Save
              </PrimaryButton>


            </div>
          </div>




          <div className="flex gap-6 flex-col">
            <div className="md:w-1/2 w-full">
              <div className="flex items-center gap-5 mb-8 flex-wrap">
                <div className="md:flex-grow-0 md:w-[150px] flex-grow w-full">
                  <img
                    className="w-[130px] h-[130px] rounded-md"
                    src={
                      formik.values.profilePhoto
                        ? formik.values.profilePhoto
                        : "https://via.placeholder.com/150"
                    }
                    alt=""
                  />
                </div>

                <label htmlFor="businessImage">
                  {" "}
                  <PrimaryButton
                    inputClass="w-fit min-w-[150px] bg-[#282823] text-white font-bold"
                    loading={loading}
                  >
                    Upload New
                  </PrimaryButton>

                </label>

                <label htmlFor="businessImageDeleet">
                  {" "}
                  <PrimaryButton
                    inputClass="w-fit min-w-[150px] bg-[#E3E3D8] text-[#74746E] font-bold"
                    loading={loading}
                  >
                    Delete
                  </PrimaryButton>
                </label>

                <input
                  id="businessImage"
                  type="file"
                  name="businessImage"
                  className="hidden"
                  onChange={handleImageUpload}
                  onBlur={handleBlur}
                />
              </div>

              <div className="mb-5 relative">
                <label className="common-lable" htmlFor="name">Business Name</label>
                <input
                  placeholder="Business Name"
                  name="name"
                  value={values?.name}
                  className="common-input"
                  onChange={formik.handleChange}
                  onBlur={handleBlur}
                />
                <span className="font-semibold pl-1 text-sm text-red-600">
                  <ErrorMessage name="name" />
                </span>
              </div>
              <div className="mb-5 relative">
                <label className="common-lable" htmlFor="name">Business Type</label>
                <select
                  className="common-input w-full"
                  name="businessType"
                  placeholder="Category"
                  value={values.businessType}
                  onChange={formik.handleChange}
                  onBlur={handleBlur}
                >
                  {/* <option>Type [Business/Non-profit]</option> */}
                  <option>Type </option>
                  <option>Business</option>
                  {/* <option>Non-profit</option> */}
                </select>
                <span className="font-semibold pl-1 text-sm text-red-600">
                  <ErrorMessage name="businessType" />
                </span>
              </div>
              <div className="mb-5 relative">
                <label className="common-lable" htmlFor="description">Description</label>
                <textarea
                  placeholder="Description"
                  name="bio"
                  value={values?.bio}
                  onBlur={handleBlur}
                  className="common-textarea"
                  rows={5}
                  onChange={formik.handleChange}
                />
                <span className="font-semibold pl-1 text-sm text-red-600">
                  <ErrorMessage name="bio" />
                </span>
              </div>

              <div className="mt-6">
                <div className="flex justify-between">
                  <h1 className="text-base font-semibold">
                    Social Media Login Details
                  </h1>
                </div>

                <div className="social-media-input p-5 rounded-md bg-[#FCFCFC]">

                  <div className="mb-5 relative ">
                    <label className="common-lable" htmlFor="socal-media">Social media app</label>
                    <select
                      className="common-input w-full"
                      name="socal-media"
                      placeholder="socal-media"

                    >
                      {/* <option>Type [Business/Non-profit]</option> */}
                      <option>Type </option>
                      <option>Instagram</option>
                      {/* <option>Non-profit</option> */}
                    </select>
                  </div>

                  <div className="mb-5 relative">
                    <label className="common-lable" htmlFor="UserID">User ID</label>
                    <input type="text"
                      placeholder="User ID"
                      name="UserID"
                      className="common-input"
                      value={'buffrestaurant'}
                    />
                    <span className="font-semibold pl-1 text-sm text-red-600">
                      <ErrorMessage name="name" />
                    </span>
                  </div>

                  <div className="mb-5 relative">
                    <label className="common-lable" htmlFor="Password">Password</label>
                    <input type="password"
                      placeholder="Password"
                      name="Password"
                      className="common-input"
                      value={'buffrestaurant'}
                    />
                    <span className="font-semibold pl-1 text-sm text-red-600">
                      <ErrorMessage name="name" />
                    </span>
                  </div>


                  <div className="add-another-media">
                    <button className="w-full bg-[#D3E9EB] text-[#009CA6] flex items-center justify-center gap-1.5 py-3 rounded-md text-[0.75rem] font-bold">
                      <Add className="text-[#009CA6]" />
                      Add Social Media</button>
                  </div>

                </div>


                {/* <div className="mt-3 py-3 px-2 bg-[#0000000d] rounded-md">
                  <FacebookLoginButton
                    isConnected={businessProfile?.isFacebookConnected}
                    fetchUserDetails={fetchUserDetails}
                  // setAccessToken={(accessToken) => {
                  //   formik.setFieldValue("accessToken", accessToken);
                  // }}
                  // accessToken={formik.values.accessToken}
                  />
                </div> */}
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="">
                <FieldArray
                  name="locations"
                  render={(arrayHelpers) => (
                    <div>
                      <div className="flex justify-between items-center">
                        <h1 className="text-base font-bold ">
                          Location Details
                        </h1>
                        <PrimaryButton inputClass="w-fit w-[150px] max-w-[150px] font-bold"
                          onClick={() =>
                            arrayHelpers.push({
                              address1: "",
                              address2: "",
                              city: "",
                              st: "",
                              zip: "",
                              website: "",
                              email: "",
                              telePhonenumber: "",
                            })
                          }
                        >
                          <Add className="!text-white" />
                          <span>Add</span>
                        </PrimaryButton>
                      </div>
                      {formik.values.locations?.map((location, index) => {
                        return (
                          <div className="mt-3 py-3 px-2 rounded-md">
                            <div className="flex gap-2">
                              <div className="w-[90%]">
                                <div className="mb-5 relative">
                                  <label className="common-lable" htmlFor="Address 1">Address 1</label>
                                  <input
                                    placeholder="Address 1"
                                    name={`locations[${index}].address1`}
                                    value={location.address1}
                                    className="common-input"
                                    onChange={formik.handleChange}
                                    onBlur={handleBlur}
                                  />
                                  <span className="font-semibold pl-1 text-sm text-red-600">
                                    <ErrorMessage
                                      name={`locations[${index}].address1`}
                                    />
                                  </span>
                                </div>
                                <div className="mb-5 relative">
                                  <label className="common-lable" htmlFor="Address 2">Address 2</label>
                                  <input
                                    placeholder="Address 2"
                                    name={`locations[${index}].address2`}
                                    value={location.address2}
                                    className="common-input"
                                    onChange={formik.handleChange}
                                    onBlur={handleBlur}
                                  />
                                  <span className="font-semibold pl-1 text-sm text-red-600">
                                    <ErrorMessage
                                      name={`locations[${index}].address2`}
                                    />
                                  </span>
                                </div>
                                <div className="mb-3 flex gap-2">
                                  <div className="w-2/4 relative">
                                    <label className="common-lable" htmlFor="City">City</label>
                                    <input
                                      placeholder="City"
                                      name={`locations[${index}].city`}
                                      className="common-input"
                                      value={location.city}
                                      onChange={formik.handleChange}
                                      onBlur={handleBlur}
                                    />
                                    <span className="font-semibold pl-1 text-sm text-red-600">
                                      <ErrorMessage
                                        name={`locations[${index}].city`}
                                      />
                                    </span>
                                  </div>
                                  <div className="w-1/4 relative">
                                    <label className="common-lable" htmlFor="ST">ST</label>
                                    <input
                                      placeholder="ST"
                                      value={location.state}
                                      name={`locations[${index}].state`}
                                      className="common-input"
                                      onChange={formik.handleChange}
                                      onBlur={handleBlur}
                                    />
                                    <span className="font-semibold pl-1 text-sm text-red-600">
                                      <ErrorMessage
                                        name={`locations[${index}].state`}
                                      />
                                    </span>
                                  </div>
                                  <div className="w-1/4 relative">
                                    <label className="common-lable" htmlFor="Zip">Zip</label>

                                    <input
                                      value={location.zip}
                                      placeholder="Zip"
                                      name={`locations[${index}].zip`}
                                      className="common-input"
                                      onChange={formik.handleChange}
                                      onBlur={handleBlur}
                                    />
                                    <span className="font-semibold pl-1 text-sm text-red-600">
                                      <ErrorMessage
                                        name={`locations[${index}].zip`}
                                      />
                                    </span>
                                  </div>
                                </div>
                                <div className="mb-5 relative">
                                  <label className="common-lable" htmlFor="ZWebsiteip">Website</label>

                                  <input
                                    value={location?.website}
                                    placeholder="Website"
                                    name={`locations[${index}].website`}
                                    className="common-input"
                                    onChange={formik.handleChange}
                                    onBlur={handleBlur}
                                  />
                                  <span className="font-semibold pl-1 text-sm text-red-600">
                                    <ErrorMessage
                                      name={`locations[${index}].website`}
                                    />
                                  </span>
                                </div>
                                <div className="mb-5 relative">
                                  <label className="common-lable" htmlFor="Email">Email</label>
                                  <input
                                    value={location.email}
                                    placeholder="Email"
                                    name={`locations[${index}].email`}
                                    className="common-input"
                                    onChange={formik.handleChange}
                                    onBlur={handleBlur}
                                  />
                                  <span className="font-semibold pl-1 text-sm text-red-600">
                                    <ErrorMessage
                                      name={`locations[${index}].email`}
                                    />
                                  </span>
                                </div>
                                <div className="mb-5 relative">
                                  <label className="common-lable" htmlFor="Telephone">Telephone number</label>
                                  <input
                                    value={location.phone}
                                    placeholder="Telephone number"
                                    name={`locations[${index}].phone`}
                                    className="common-input"
                                    onChange={formik.handleChange}
                                    onBlur={handleBlur}
                                  />
                                  <span className="font-semibold pl-1 text-sm text-red-600">
                                    <ErrorMessage
                                      name={`locations[${index}].phone`}
                                    />
                                  </span>
                                </div>
                              </div>
                              <div>
                                <Deleteicon
                                  className="cursor-pointer p-1.5 rounded-xl w-[30px] h-[30px] text-white bg-red-500"
                                  onClick={() => {
                                    handleDeleteLocation(
                                      location._id,
                                      arrayHelpers,
                                      index
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                />
              </div>


            </div>
          </div>



          <div className="delect-account-part border-t border-[#DCE4E8] mt-6 py-6">
            <div className="flex gap-5 items-center md:flex-nowrap flex-wrap">

              <div className="content-part md:w-2/5 w-full">
                <h5 className="text-base text-[#1A1C1E] mb-1.5 font-semibold">Delete account</h5>
                <p className="text-sm text-[#6C7278]">When you delete your account, you lose access to Pinntag account services, and we permanently delete your personal data. You can cancel the deletion for 14 days.</p>
              </div>

              <div className="btn-part md:w-3/5 w-full">
                <button className="bg-[#F15A24] text-white rounded-full flex items-center justify-center h-[48px] w-[200px] font-bold md:ms-auto">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default EditBusiness;

// const handleImageUpload = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       formik.setFieldValue("businessImage", reader.result);
//       formik.setFieldValue("imageBlob", file);
//     };
//     reader.readAsDataURL(file);
//   }
// };
