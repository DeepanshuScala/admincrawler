import React, { useState } from "react";
import Text from "../../common/Text";
import { Add } from "@mui/icons-material";
import { postData } from "../../utils/api";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import PrimaryButton from "../../common/FormElements/Button/PrimaryButton";

const ImageGalleryHeader = ({ fetchImage }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setLoading(true);

        const formData = new FormData();
        formData.append("image", file);

        const res = await postData("business-profile/gallery/upload", formData);

        if (res.data) {
          enqueueSnackbar(res.data.message ?? "", {
            variant: "success",
          });
          fetchImage();
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
      } else {
        enqueueSnackbar("Only images allowed", {
          variant: "error",
        });
      }
    }
  };

  return (
    <div className="my-4 md:mx-10 mx-5">
      <div className="flex justify-between items-center">
        <div>
          <Text className="text-[24px] mob:text-[16px] font-bold">
            Image Gallery
          </Text>
        </div>

        <div className="flex justify-between items-center gap-3">
          <div>
            <input
              id="businessImage"
              type="file"
              name="businessImage"
              className="hidden"
              onChange={handleSubmit}
            />
            {/* <Text className="text-[18px] text-[#45818E] mob:text-[16px] font-bold">
              Drag & Drop images here or
            </Text> */}
          </div>
          <div>
            {/* @tobe make it common button */}
            <label htmlFor="businessImage">
              {" "}
              <PrimaryButton
                inputClass="w-fit min-w-[150px] py-0.5 "
                loading={loading}
              >
                <Add className="!text-white" />
                <span>Add</span>
              </PrimaryButton>
            </label>

            {/* <div className="bg-[#45818E] text-white cursor-pointer px-3 py-0.5 rounded-md flex justify-center items-center gap-1">
              <Add className="!text-white" />
              <span>Upload Image</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryHeader;
