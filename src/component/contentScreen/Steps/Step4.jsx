import React, { useEffect, useState } from "react";
import PrimarySwitch from "../../../common/FormElements/Switch/PrimarySwitch";
import SecondaryButton from "../../../common/FormElements/Button/SecondaryButton";
import PrimaryButton from "../../../common/FormElements/Button/PrimaryButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { DEC, INC } from "../CreateContent";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import classNames from "classnames";
import { getData, postData } from "../../../utils/api";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../../utils/formatErrorMessage";
import * as Yup from "yup";

const Step4 = ({
  handleStep,
  handleClose,
  id,
  currentStep,
  fetchAllEvents,
  eventData,
  setStep4Data
}) => {
  const [loading, setLoading] = useState(false);
  const [ageGroups, setAgeGroups] = useState([]);
  const validationSchema = Yup.object().shape({
    ageGroupsAllowed: Yup.array().min(1, "Minimum 1 age group is required."),
    targetGenders: Yup.array().min(1, "Minimum 1 gender is required."),
    // promotionCode: Yup.string().required("Promotion code is required"),
    // // participationCost: Yup.number("Participation cost must be number").required(
    // //   "Participation cost is required"
    // // ),
    // participationCost: Yup.string(),
    // bookingUrl: Yup.string().required("Booking URL is required"),
    // termsAndConditions: Yup.string().required(
    //   "Terms and condtions is required"
    // ),
  });

  const getAgeGroups = async () => {
    const res = await getData("ages");
    if (res.data) {
      setAgeGroups(res.data.ages);
    } else {
      console.error("Something went error", res);
    }
  };

  const initData = {
    ageGroupsAllowed: [],
    targetGenders: [],
    promotionCode: "",
    isFree: false,
    participationCost: " ",
    bookingUrl: "",
    notifyFollowers: true,
    RSVP: true,
    termsAndConditions: "",
  };

  useEffect(() => {
    getAgeGroups();
  }, []);

  useEffect(() => {
    if (eventData) {
      setValues({
        ...initData,
        ageGroupsAllowed: eventData?.ageGroupsAllowed?.map(({ _id }) => _id),
        targetGenders: eventData?.targetGenders,
        promotionCode: eventData?.promotionCode,
        isFree: eventData?.isFree,
        participationCost: eventData?.participationCost,
        bookingUrl: eventData?.bookingUrl,
        notifyFollowers: eventData?.notifyFollowers,
        RSVP: eventData?.RSVP,
        termsAndConditions: eventData?.termsAndConditions,
      });
    }
  }, [eventData]);

  const formik = useFormik({
    initialValues: initData,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const res = await postData(`event/crawled/edit/${id}`, {
        ...values
      });

      if (res.data) {
        enqueueSnackbar(res.data.message ?? "", {
          variant: "success",
        });
        fetchAllEvents();
        //handleStep(INC)

        //setStep4Data(res.data.event);
        // handleStep(INC);
        handleClose();
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

      setLoading(false);
    },
  });

  const { handleBlur, handleChange, values, setFieldValue, setValues } = formik;

  const handleGender = (gender) => {
    if (values.targetGenders.includes(gender)) {
      formik.setFieldValue("targetGenders", [
        ...values.targetGenders.filter((gen) => {
          return gen !== gender;
        }),
      ]);
    } else {
      formik.setFieldValue("targetGenders", [...values.targetGenders, gender]);
    }
  };

  const handleAgeGroups = (gender) => {
    if (values.ageGroupsAllowed.includes(gender)) {
      formik.setFieldValue("ageGroupsAllowed", [
        ...values.ageGroupsAllowed.filter((gen) => {
          return gen !== gender;
        }),
      ]);
    } else {
      formik.setFieldValue("ageGroupsAllowed", [
        ...values.ageGroupsAllowed,
        gender,
      ]);
    }
  };

  const [promotInpShow, setpromotInpShow] = useState(false);
  const [bookInpShow, setbookInpShow] = useState(false);
  const [termConInpShow, settermConInpShow] = useState(false);
  const [partCOstInpShow, setpartCOstInpShow] = useState(false);

  return (
    <>
      <FormikProvider value={formik}>
        <div>
          <div className="mb-4">
            <h1 className="text-black mb-3 font-bold">Target age groups</h1>
            <div className="grid grid-cols-4 gap-2">
              {ageGroups?.map((age) => {
                return (
                  <div
                    className={classNames([
                      "bg-[#DDDDD7] rounded-xl px-3 py-3 text-center text-[#7C7C72] text-sm capitalize cursor-pointer font-normal",
                      {
                        "active-target-age": values.ageGroupsAllowed?.includes(
                          age._id
                        ),
                      },
                    ])}
                    onClick={() => {
                      handleAgeGroups(age._id);
                    }}
                  >
                    {age.name}
                  </div>
                );
              })}
            </div>
            <span className="font-semibold text-sm text-red-600">
              <ErrorMessage name="ageGroupsAllowed" />
            </span>
          </div>

          <hr className="mb-3 text-[#7C7C72]" />

          <div className="mb-4">
            <h1 className="text-black mb-3 font-bold">Target genders</h1>
            <div className="grid grid-cols-4 gap-2">
              <div
                className={classNames([
                  "bg-[#DDDDD7] rounded-xl px-3 py-3 text-center text-[#7C7C72] text-sm capitalize cursor-pointer font-normal",
                  { "active-target-age": values.targetGenders?.includes("male") },
                ])}
                onClick={() => {
                  handleGender("male");
                }}
              >
                Male
              </div>
              <div
                className={classNames([
                  "bg-[#DDDDD7] rounded-xl px-3 py-3 text-center text-[#7C7C72] text-sm capitalize cursor-pointer font-normal",
                  { "active-target-age": values.targetGenders?.includes("female") },
                ])}
                onClick={() => {
                  handleGender("female");
                }}
              >
                Female
              </div>
              <div
                className={classNames([
                  "bg-[#DDDDD7] rounded-xl px-3 py-3 text-center text-[#7C7C72] text-sm capitalize cursor-pointer font-normal",
                  { "active-target-age": values.targetGenders?.includes("other") },
                ])}
                onClick={() => {
                  handleGender("other");
                }}
              >
                Other
              </div>
            </div>
            <span className="font-semibold pl-1 text-sm text-red-600">
              <ErrorMessage name="targetGenders" />
            </span>
          </div>

          <hr className="mb-3 text-[#7C7C72]" />

          <div className="mb-5">
            <div className="flex items-center justify-between">
              <h1 className="text-black font-bold">Promotional Code</h1>

              <PrimarySwitch
                onChange={(val) => {
                  setpromotInpShow(!promotInpShow);
                }}
                onBlur={handleBlur}
                name="promotInpShow"
                defaultValue={promotInpShow}
              />
            </div>
            {
              promotInpShow ?
                <>
                  <div>
                    <input
                      type="text"
                      name="promotionCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="model-input placeholder:text-[#7C7C72] placeholder:text-sm !border-[#DDDDD7] border-none "
                      placeholder="Enter your promo code here"
                      value={values?.promotionCode}
                    />
                  </div>
                  <span className="font-semibold text-sm text-red-600">
                    <ErrorMessage name="promotionCode" />
                  </span>
                </> : null
            }

          </div>

          <hr className="mb-3 text-[#7C7C72]" />

          <div className="mb-5">
            <div className="flex items-center justify-between">
              <h1 className="text-black font-bold">Booking URL</h1>

              <PrimarySwitch
                onChange={(val) => {
                  setbookInpShow(!bookInpShow);
                }}
                onBlur={handleBlur}
                name="bookInpShow"
                defaultValue={bookInpShow}
              />
            </div>

            {
              bookInpShow ?
                <>
                  <div>
                    <input
                      type="text"
                      name="bookingUrl"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="model-input placeholder:text-[#7C7C72] placeholder:text-sm !border-[#DDDDD7] border-none "
                      placeholder="https://yourlinkhere.com"
                      value={values?.bookingUrl}
                    />
                  </div>
                  <span className="font-semibold text-sm text-red-600">
                    <ErrorMessage name="bookingUrl" />
                  </span>
                </> : null
            }

          </div>
          <hr className="mb-3 text-[#7C7C72]" />


          <div className="mb-5 flex justify-between">
            <div>
              <h1 className="text-black font-bold">Free</h1>
              <p className="text-[#B3B3A5] text-xs">
                Promote in a dedicated area of Pinntag
              </p>
            </div>
            <div>
              <PrimarySwitch
                onChange={(val) => setFieldValue("isFree", val)}
                onBlur={handleBlur}
                name="isFree"
                defaultValue={values?.isFree}
              />
            </div>
          </div>

          <hr className="mb-3 text-[#7C7C72]" />

          <div className="mb-5 flex justify-between">
            <div className="w-2/3">
              <h1 className="text-black font-bold">RSVP</h1>
              <p className="text-[#B3B3A5] text-xs">
                You will recieve a notification for each attendance request. You
                will need to confirm each request.
              </p>
            </div>
            <div>
              <PrimarySwitch
                onChange={(val) => setFieldValue("RSVP", val)}
                defaultValue={values?.RSVP}
              />
            </div>
          </div>

          <hr className="mb-3 text-[#7C7C72]" />

          <div className="mb-5">
            <div className="flex items-center justify-between">
              <h1 className="text-black font-bold">Terms & Conditions</h1>

              <PrimarySwitch
                onChange={(val) => {
                  settermConInpShow(!termConInpShow);
                }}
                onBlur={handleBlur}
                name="termConInpShow"
                defaultValue={termConInpShow}
              />
            </div>

            {
              termConInpShow ?
                <>
                  <div>
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="model-input placeholder:text-[#7C7C72] placeholder:text-sm !border-[#DDDDD7] border-none "
                      placeholder="Paste here your terms and conditions text"
                      value={values?.termsAndConditions}
                      name="termsAndConditions"
                    />
                  </div>
                  <span className="font-semibold text-sm text-red-600">
                    <ErrorMessage name="termsAndConditions" />
                  </span>
                </> : null
            }

          </div>

          <hr className="mb-3 text-[#7C7C72]" />

          <div className="mb-5">
            <div className="flex items-center justify-between">
              <h1 className="text-black font-bold">Participation cost</h1>

              <PrimarySwitch
                onChange={(val) => {
                  setpartCOstInpShow(!partCOstInpShow);
                }}
                onBlur={handleBlur}
                name="partCOstInpShow"
                defaultValue={partCOstInpShow}
              />
            </div>

            {
              partCOstInpShow ?
                <>
                  <div>
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="model-input placeholder:text-[#7C7C72] placeholder:text-sm !border-[#DDDDD7] border-none "
                      placeholder="Participation cost"
                      name="participationCost"
                      value={values?.participationCost}
                    />
                  </div>
                  <span className="font-semibold text-sm text-red-600">
                    <ErrorMessage name="participationCost" />
                  </span>
                </> : null
            }

          </div>

          <hr className="mb-3 text-[#7C7C72]" />

          <div className="mb-5 flex justify-between">
            <div className="w-2/3">
              <h1 className="text-black font-bold">Notfiy followers</h1>
              <p className="text-[#B3B3A5] text-xs">
                Your followers will be notified of this event
              </p>
            </div>
            <div>
              <PrimarySwitch
                onChange={(val) => setFieldValue("notifyFollowers", val)}
                name="notifyFollowers"
                defaultValue={values.notifyFollowers}
              />
            </div>
          </div>

          <hr className="mb-3 text-[#7C7C72]" />


        </div>

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
              type="submit"
              loading={loading}
              inputClass={"min-w-[140px]"}
              onClick={() => formik.handleSubmit()}
            >
              <span>Done</span>
            </PrimaryButton>
          </div>
        </div>

      </FormikProvider>
    </>
  );
};

export default Step4;
