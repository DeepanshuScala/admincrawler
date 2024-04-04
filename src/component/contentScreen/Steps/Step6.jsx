import React, { useState } from "react";
import SecondaryButton from "../../../common/FormElements/Button/SecondaryButton";
import { DEC } from "../../../utils/constants/commonConstants";
import PrimaryButton from "../../../common/FormElements/Button/PrimaryButton";
import CheckBox from "../../../common/FormElements/CheckBox/CheckBox";
import { postData } from "../../../utils/api";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../../utils/formatErrorMessage";
import { ReactComponent as FacebookIcon } from '../../../assets/social-icon/facebook_icon.svg'
import { ReactComponent as InstaIcon } from '../../../assets/social-icon/instagram_icon.svg'
import { ReactComponent as LinkedIcon } from '../../../assets/social-icon/linkedin_icon.svg'
import { ReactComponent as SnapIcon } from '../../../assets/social-icon/snapchat_icon.svg'
import { ReactComponent as TwitterIcon } from '../../../assets/social-icon/x_icon.svg'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";

const Step6 = ({
  handleStep,
  handleClose,
  id,
  currentStep,
  fetchAllEvents,
  eventData,
}) => {
  const [postBoolean, setPostBoolean] = useState({
    facebook: false,
    twitter: false,
    instagram: false,
  });
  const handlePublishPost = async () => {
    const res = await postData(`event/social/post`, {
      eventId: id,
      ...postBoolean,
    });
    if (res.data) {
      enqueueSnackbar(res.data.message ?? "", {
        variant: "success",
      });
      handleClose();
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

  const handleChange = (e) => {
    const { name, checked } = e.target;
    // console.log(e, ">>>>>>>>", e.target.checked)
    setPostBoolean((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="font-bold text-base text-center mt-2">
          Would you like to post your content to your social media accounts ?
        </h1>

        <div className="mt-4 mb-5">
          <div className="social-share-div flex items-center justify-center gap-2">
            <div className="flex flex-col gap-2">
              <FacebookShareButton
                url={window.location.href}
                quote={eventData.title}
                hashtag={'#portfolio...'}
              >
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
            </div>
            <div className="flex flex-col gap-2">
              <TwitterShareButton
                url={window.location.href}
                quote={eventData.title}
                hashtag={'#portfolio...'}
              >
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>
            </div>
            <div className="flex flex-col gap-2">
              <LinkedinShareButton
                url={window.location.href}
                quote={eventData.title}
                hashtag={'#portfolio...'}
              >
                <LinkedIcon size={40} round={true} />
              </LinkedinShareButton>
            </div>
            {/* <div className="flex flex-col gap-2">
              <FacebookIcon className="w-[60px] h-[60px]" />
              <input
                name="facebook"
                type="checkbox"
                class="common-checkbox"
                id="choice1-1"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">

              <InstaIcon className="w-[60px] h-[60px]" />
              <input
                name="instagram"
                type="checkbox"
                class="common-checkbox"
                id="choice1-1"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">

              <LinkedIcon className="w-[60px] h-[60px]" />
              <input
                name="linkedin"
                type="checkbox"
                class="common-checkbox"
                id="choice1-1"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">

              <SnapIcon className="w-[60px] h-[60px]" />
              <input
                name="snapchat"
                type="checkbox"
                class="common-checkbox"
                id="choice1-1"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">

              <TwitterIcon className="w-[60px] h-[60px]" />
              <input
                name="twitter"
                type="checkbox"
                class="common-checkbox"
                id="choice1-1"
                onChange={handleChange}
              />
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-auto pb-3 gap-2">
        <div>
          <SecondaryButton inputClass='bg-[#E3E3D8] tex-[#74746E] min-w-[140px]' onClick={() => handleClose()}>
            <>Skip</>
          </SecondaryButton>
        </div>
        <div>
          {/* handleStep(INC) */}
          <PrimaryButton
            // loading={loading}
            inputClass={"min-w-[140px]"}
            // onClick={handlePublishPost}
            onClick={() => handleClose()}
          >
            <span>DOne</span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Step6;
