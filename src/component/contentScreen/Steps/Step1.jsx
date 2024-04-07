import React, { useEffect, useState } from "react";
import {
  ErrorMessage,
  FieldArray,
  Form,
  FormikProvider,
  useFormik,
} from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { deleteData, getData, postData } from "../../../utils/api";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../../utils/formatErrorMessage";
import SecondaryButton from "../../../common/FormElements/Button/SecondaryButton";
import PrimaryButton from "../../../common/FormElements/Button/PrimaryButton";
import { DEC, INC } from "../CreateContent";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import { ReactComponent as ImageIcon } from '../../../assets/icons/img-ico.svg';

const Step1 = ({
  handleStep,
  handleClose,
  currentStep,
  setId,
  fetchAllEvents,
  eventData,
  fetchEventData,
  id,
}) => {
  console.log(eventData)
  const [categories, setCategories] = useState();
  // const [keywords, setkeywords] = useState([]);
  const [loading, setLoading] = useState(false);

  const initState = {
    type: "",
    title: "",
    images: [],
    imageUrls: [],
    description: "",
    category: "",
    keywords: [],
  };

  useEffect(() => {
    if (eventData) {
      // console.log( ">>>>>>> event data keywords ", eventData.keywords, ">>> type", typeof eventData.keywords)

      setValues({
        ...initState,
        type: eventData.type,
        title: eventData.title,
        description: eventData.description,
        category: eventData.category,
        // keywords: eventData.keywords.map((event) => {
        //   return keywords.find(({ _id }) => event === _id);
        // }),
        keywords:
          typeof eventData.keywords === "string"
            ? JSON.parse(eventData.keywords)
            : eventData.keywords,
        images: eventData?.images,
        imageUrls: eventData?.images?.map(({ url }) => url),
      });
    }
  }, [eventData]);

  const getCategories = async () => {
    const res = await getData("categories");
    if (res.data) {
      setCategories(res.data.categories);
    } else {
      console.error("Something went error", res);
    }
  };

  // const getKeywords = async () => {
  //   const res = await getData("keywords");
  //   if (res.data) {
  //     setkeywords(res.data.keywords);
  //     // formik.setFieldValue("keywords", [res.data.keywords[0]])
  //   } else {
  //     console.error("Something went error", res);
  //   }
  // };

  useEffect(() => {
    getCategories();
    // getKeywords();
  }, []);


  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Type is required."),
    title: Yup.string().required("Title is required."),
    description: Yup.string().required("Description is required."),
    category: Yup.string().required("Category is required"),
    image: Yup.array()
      .min(1, "Minimum 1 image is required.")
      .max(5, "Maximum 5 images allowed."),
    keywords: Yup.array()
      .min(1, "Minimum 1 keyword is required."),
  });

  const formik = useFormik({
    initialValues: initState,
    validationSchema,
    onSubmit: async (values) => {
      if (id) {
        const copyValue = {
          ...values,
          // keywords: JSON.stringify(values?.keywords),
        };
        delete copyValue?.image;
        const res = await postData(`event/crawled/edit/${id}`, {
          ...copyValue,
        });

        if (res.data) {
          enqueueSnackbar(res.data.message ?? "", {
            variant: "success",
          });
          //fetchEventData(id);
          fetchAllEvents();
          handleStep(INC);
        } else {
          console.log(res, ">>>>>>");
          enqueueSnackbar(
            res.error?.message
              ? formatErrorMessage(res.error?.message)
              : "Something went wrong",
            {
              variant: "error",
            }
          );
        }
      } else {
        setLoading(true);
        let formData = new FormData();
        for (let key in values) {
          if (key == "imageUrls") {
          } else {
            if (key == "image") {
              values.images.forEach((image, index) => {
                formData.append(`image`, image);
              });
            } else if (key === "keywords") {
              // values.keywords.forEach((key, index) => {
              //   formData.append(`keywords`, key._id);
              // });
              formData.append("keywords", JSON.stringify(values.keywords));
            } else {
              formData.append([key], values[key]);
            }
          }
        }
        const res = await postData("event", formData);

        if (res.data) {
          setId(res.data.event?._id);
          enqueueSnackbar(res.data.message ?? "", {
            variant: "success",
          });
          fetchAllEvents();
          handleStep(INC);
        } else {
          console.log(res, ">>>>>>");
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
      setLoading(false);
    },
  });

  const { setFieldValue, handleChange, handleBlur, values, errors, setValues } =
    formik;

  const handleUploadImages = (event) => {
    const files = event.target.files;
    console.log(files)
    formik.setFieldValue("image", [...values.image, ...files]);

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    console.log(urls, ">>>>>>> urls");
    formik.setFieldValue("imageUrls", [...values.imageUrls, ...urls]);
    if (id) {
      handleUpdateImage(Array.from(files));
    }
  };

  const handleRemoveImage = (index) => {
    if (id) {
      //
      if (values.image[index]?._id) {
        handleDeleteImage(values.image[index]?._id);
      }
    }
    setFieldValue("image", [
      ...values?.image?.slice(0, index),
      ...values?.image?.slice(index + 1),
    ]);
    setFieldValue("imageUrls", [
      ...values?.imageUrls?.slice(0, index),
      ...values?.imageUrls?.slice(index + 1),
    ]);
    // that means event first step is being getting edited.
  };

  const handleDeleteImage = async (id) => {
    const res = await deleteData(`event/image/${id}`);
    if (res.data) {
      enqueueSnackbar(res.data.message ?? "", {
        variant: "success",
      });
      fetchEventData();
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
  };

  const handleUpdateImage = async (files) => {
    const formData = new FormData();
    files.forEach((image, index) => {
      formData.append(`image`, image);
    });
    const res = await postData(`event/images/add/${id}`, formData);
    if (res.data) {
      // setId(res.data.event?._id);
      enqueueSnackbar(res.data.message ?? "", {
        variant: "success",
      });
      fetchEventData();
      // handleStep(INC);
    } else {
      console.log(res, ">>>>>>");
      enqueueSnackbar(
        res.error?.message
          ? formatErrorMessage(res.error?.message)
          : "Something went wrong",
        {
          variant: "error",
        }
      );
    }
  };
  return (
    <>
      <FormikProvider value={formik}>
        <Form>
          {/* <Form> */}
          {/* <div className="mb-3">
        <select className="secondary-select w-full" placeholder="Category">
          <option>Create from Template</option>
          <option>category1</option>
          <option>category1</option>
          <option>category1</option>
        </select>
      </div> */}
          <div className="mb-4">
            <select
              className="secondary-select w-full common-input"
              name="type"
              onChange={handleChange}
              value={values?.type}
              onBlur={handleBlur}
            >
              <option>Offer type (Offer or Event)</option>
              <option value={"business_event"}>Business Event</option>
              <option value={"social_event"}>Social Event</option>
              <option value={"offer"}>Offer</option>
            </select>
            <span className="font-semibold pl-1 text-sm text-red-600">
              <ErrorMessage name="type" />
            </span>
          </div>
          <div className="mb-3">
{/* 
            <label
              htmlFor="image"
              className="bg-[#F2F2F2] cursor-pointer w-full h-[100px] flex items-center justify-center text-sm font-medium flex-col gap-2 rounded-md"
            >
              <ImageIcon className="w-6 h-6" /> <span>Add Image</span>
            </label>

            {
              (values.imageUrls?.length > 0) ?
                <div className="overflow-auto py-3 image-vertical-scroll">
                  <div className="flex gap-3">
                    {values?.imageUrls?.map((image, index) => {
                      return (
                        <div className="relative">
                          <HighlightOffOutlinedIcon
                            onClick={() => handleRemoveImage(index)}
                            className="cursor-pointer absolute right-[-10px] top-[-12px] !text-white text-xl rounded-full font-extrabold !bg-black "
                          />
                          <label
                            key={index}
                            className="w-32 h-20 flex justify-center items-center border-2 border-black rounded-md text-sm font-semibold"
                          >
                            <img className="w-full h-full" src={image} alt="img" />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div> : null
            }



            <input
              id="image"
              type="file"
              multiple
              name="image"
              className="hidden"
              onChange={handleUploadImages}
            />
            <span className="font-semibold pl-1 text-sm text-red-600">
              <ErrorMessage name="images" />
            </span> */}
          </div>
          <div className="mb-3">
            <input
              placeholder="Offer Title"
              name="title"
              className="common-input"
              onChange={handleChange}
              value={values?.title}
              onBlur={handleBlur}
            />
            <span className="font-semibold pl-1 text-sm text-red-600">
              <ErrorMessage name="title" />
            </span>
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Description"
              className="common-textarea"
              rows={4}
              value={values?.description}
              onBlur={handleBlur}
              name="description"
              onChange={handleChange}
            />
            <span className="font-semibold pl-1 text-sm text-red-600">
              <ErrorMessage name="description" />
            </span>
          </div>
          <div className="mb-3">
            <select
              className="secondary-select w-full common-input"
              placeholder="Category"
              name="category"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.category}
            >
              <option>Category</option>
              {categories?.map((category, index) => {
                return (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            <span className="font-semibold pl-1 text-sm text-red-600">
              <ErrorMessage name="category" />
            </span>
          </div>
          {/* <div className="mb-3">
        <input
          placeholder="Keywords: For example, #Cocktails"
          className="common-input"
        />
      </div> */}
          {/* <FieldArray
            name="keywords"
            render={(arrayHelpers) => (
              <div className="">
                <div className="mb-2 flex gap-3 text-[#333]">
                  <h1 className="text-base font-semibold">Keywords</h1>
                  <span>
                    <AddCircleOutlineOutlinedIcon
                      onClick={() => arrayHelpers.push("")}
                      className="!text-base cursor-pointer hover:text-[#555]"
                    />
                  </span>
                </div>
                <div className="">
                  {values.keywords && values.keywords.length > 0 ? (
                    <>
                      {values.keywords.map((keyword, index) => {
                        return (
                          <div className="mb-3">
                            <div
                              key={index}
                              className=" flex gap-3 items-center"
                            >
                              <input
                                name={`keywords.${index}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Keywords: For example, #Cocktails"
                                className="common-input"
                                value={keyword}
                              />
                              <span>
                                <RemoveCircleOutlineOutlinedIcon
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="!text-base cursor-pointer hover:text-[#555]"
                                />
                              </span>
                            </div>
                            <span className="font-semibold text-sm text-red-600 mb-2">
                              <ErrorMessage name={`keywords.${index}`} />
                            </span>
                          </div>
                        );
                      })}
                    </>
                  ) : null}
                </div>
                <span className="font-semibold text-sm text-red-600">
                  <ErrorMessage name="keywords" />
                </span>
              </div>
            )}
          /> */}

          <div className="flex justify-end items-center mt-auto pb-3 gap-2">
            <div>
              {currentStep === 1 ? (
                <SecondaryButton inputClass='bg-[#E3E3D8] tex-[#74746E] min-w-[140px]'
                  onClick={() => handleClose()}>
                  <>Cancel</>
                </SecondaryButton>
              ) : (
                <SecondaryButton inputClass='bg-[#E3E3D8] tex-[#74746E] min-w-[140px]' onClick={() => handleStep(DEC)}>
                  <>Back</>
                </SecondaryButton>
              )}
            </div>
            <div>
              {/* handleStep(INC) */}
              <PrimaryButton
                loading={loading}
                inputClass={"min-w-[140px]"}
                onClick={formik.handleSubmit}
              >
                <span>Next</span>
                <ChevronRightIcon className="!text-white" />
              </PrimaryButton>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default Step1;

// FOR FUTURE REFRENCE :

// <Autocomplete
//   multiple
//   limitTags={2}
//   size="small"
//   id="multiple-limit-tags"
//   options={keywords}
//   getOptionLabel={(option) => option?.name}
//   // defaultValue={[
//   //   keywords?.[2], keywords?.[3]
//   // ]}
//   value={values.keywords}
//   isOptionEqualToValue={(option, value) => {
//     return option?._id === value?._id;
//   }}
//   onChange={(e, value) => {
//     formik.setFieldValue("keywords", value);
//   }}
//   sx={{
//     outline: "none",
//     "& :hover": {
//       outline: "none",
//     },
//   }}
//   renderInput={(params) => (
//     <TextField
//       sx={{
//         width: "100% !important",
//         border: "2px solid #00000095",
//         borderRadius: "5px",
//       }}
//       name="keywords"
//       onBlur={handleBlur}
//       {...params}
//       placeholder="Keywords: For example, #Cocktails"
//     />
//   )}
// />;
