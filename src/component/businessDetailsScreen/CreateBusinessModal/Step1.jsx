import React, { useState } from "react";
// import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import SecondaryButton from "../../../common/FormElements/Button/SecondaryButton";
import { DEC, INC } from "../../../utils/constants/commonConstants";
import PrimaryButton from "../../../common/FormElements/Button/PrimaryButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ReactComponent as ImageIcon } from '../../../assets/icons/img-ico.svg';
import StepWizard from "../../contentScreen/StepWizard";


const Step1 = ({ handleStep, handleClose, currentStep }) => {

  const [isyearClick, setIsYearClick] = useState(true);
  const [isMonthlyClick, setIsMonthlyClick] = useState(false)

  const handleMonthlyClick = () => {
    setIsMonthlyClick(true);
    setIsYearClick(false)
  };

  const handleIsYearClick = () => {
    setIsYearClick(true)
    setIsMonthlyClick(false)
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-subtitle font-medium text-[#232323]">
          Add Business | Details
        </p>
        <CloseIcon onClick={() => handleClose()} />
      </div>
      <div className="mb-3">
        <StepWizard step={currentStep - 1} />
      </div>

      <div className=" mt-5">
        <div className="mb-3">
          <h1 className="text-base font-bold mb-3">Subscription type</h1>
          <div className="flex ededede items-center space-x-2">
            <button
              className={`${isyearClick
                ? "bg-[#009CA6] text-white"
                : "bg-tertiaryDark text-[#7C7C72]"
                } rounded-lg w-[109px] h-[48px] flex justify-center items-center`}
              onClick={handleIsYearClick}
            >
              Yearly
            </button>
            <button
              className={`${isMonthlyClick
                ? "bg-[#009CA6] text-white"
                : "bg-tertiaryDark text-[#7C7C72]"
                } rounded-lg w-[109px] h-[48px] flex justify-center items-center`}
              onClick={handleMonthlyClick}
            >
              Monthly
            </button>
            <p className="text-base font-normal text-[#009CA6]">$360 / year / location</p>
          </div>
          <div className="w-full border-b border-[#DDDDD7] mt-3" />

        </div>
        <div className="mb-5 ">
          <select className="common-input" name="type">
            <option className=" ">Type</option>
            <option value={"business_event"}>Business</option>
            <option value={"social_event"}>Non-Profit</option>
          </select>
        </div>
        <div className=" mb-5">
          <label
            htmlFor="image"
            className="bg-[#F2F2F2] cursor-pointer w-full h-[100px] flex items-center justify-center text-sm font-medium flex-col gap-2 rounded-md"
          >
            <ImageIcon className="w-6 h-6" /> <span>Add Image</span>
          </label>
        </div>
        <div className="mb-5">
          <input
            placeholder="Business Name"
            name="title"
            className="common-input"
          />
        </div>
        <div className="mb-5">
          <textarea
            placeholder="Description"
            className="common-textarea"
            rows={5}
            // value={values?.description}
            // onBlur={handleBlur}
            name="description"
          // onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <select name="type" className="common-input">
            <option>Category</option>
            <option value={"business_event"}>Category 1</option>
            <option value={"social_event"}>Category 2</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end items-center mt-auto pb-3 gap-2">
        <div>
          {true ? (
            <SecondaryButton inputClass='bg-[#E3E3D8] tex-[#74746E] min-w-[140px]' onClick={() => handleClose()}>
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
            // loading={loading}
            inputClass={"min-w-[144px]"}
            onClick={() => handleStep(INC)}
          // onClick={formik.handleSubmit}
          >
            <span>Next</span>
            {/* <ChevronRightIcon className="!text-white" /> */}
          </PrimaryButton>
        </div>
      </div>

    </div>
  );
};

export default Step1;
