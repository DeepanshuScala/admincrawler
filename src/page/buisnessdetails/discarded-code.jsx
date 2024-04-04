import { Add, CameraAlt, Remove } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { admissionSchema } from "../../config/schema";
import Text from "../../common/Text";

const BuisnessDetails = () => {
  const [phone, setPhone] = useState();
  const {
    register,
    // getValues,
    handleSubmit,
  } = useForm();

  const {
    register: socialRegister,
    control,
    handleSubmit: socialSubmit,

    getValues,
    // formState,
  } = useForm({
    defaultValues: {
      social: [
        {
          socialMedia: "",
          userId: "",
          password: "",
        },
      ],
    },
    resolver: admissionSchema,
  });

  const {
    fields: socialName,
    append: socialAppend,
    // prepend: socialPrepend,
    remove: socialRemove,
    // swap: socialSwap,
    // move: socialMove,
    // insert: socialInsert,
    // update: socialUpdate,
  } = useFieldArray({
    control,
    name: "social",
  });

  return (
    <div className="w-full">
      <form
        className="flex w-full gap-4 px-10 py-6 mob:flex-col-reverse"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-1/2 gap-4 mob:w-full">
          <Text className="text-[24px] font-extrabold">Business Details</Text>
          <input
            placeholder="Business Name"
            className="common-input"
            {...register("buisnessname")}
          />
          <textarea
            placeholder="Description"
            className="common-textarea"
            rows={3}
            {...register("description")}
          />
          <select
            className="common-select"
            {...register("category")}
            placeholder="Category"
          >
            <option>category1</option>
            <option>category1</option>
            <option>category1</option>
            <option>category1</option>
          </select>
          <PhoneInput
            inputClass="left-[29px] mob:!w-[90%] !w-[95%] common-input"
            dropdownClass="!border-2"
            country={"us"}
            placeholder="Telephone"
            value={phone}
            onChange={setPhone}
          />
          <input
            placeholder="Email address"
            className="common-input"
            {...register("email-address")}
          />
          <input
            placeholder="Business web site"
            className="common-input"
            {...register("website-address")}
          />
        </div>
        <div className="w-1/2 flex flex-col  mob:w-full gap-[30px] items-center justify-center">
          <div>
            <Avatar
              className="!w-[200px] mob:!w-[100px] mob:!h-[100px] !border-2 !border-primary !h-[200px]"
              src={
                getValues()?.profileImage && getValues()?.profileImage[0]
                  ? URL.createObjectURL(getValues()?.profileImage[0])
                  : ""
              }
            />
          </div>
          <input
            id="profileImage"
            type="file"
            {...register("profileImage")}
            className="hidden"
          />
          <label
            htmlFor="profileImage"
            className="flex px-3 py-2 rounded-lg bg-[#45818E] text-white w-fit"
          >
            <CameraAlt className="!text-white" />
            Upload
          </label>
        </div>
      </form>
      <div>
        <form
          className="flex w-full gap-4 px-10 overflo mob:flex-col-reverse"
          onSubmit={socialSubmit}
        >
          {socialName.map((items, index) => {
            return (
              <div className="flex min-w-[30vw] flex-col w-1/2 gap-4 mob:w-full">
                <div className="flex justify-between w-full">
                  <Text className="text-[20px] font-semibold">
                    Social Media Login Details
                  </Text>
                  <div className="flex gap-4">
                    <label
                      onClick={socialAppend}
                      className="flex px-3 py-2 cursor-pointer rounded-lg bg-[#45818E] text-white w-fit"
                    >
                      <Add className="!text-white" />
                      Add
                    </label>
                    {index > 0 && (
                      <label
                        onClick={socialRemove}
                        className="flex cursor-pointer px-3 py-2 rounded-lg bg-[#DC143C] text-white w-fit"
                      >
                        <Remove className="!text-white" />
                        Remove
                      </label>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-4 rounded-lg bg-slate-100">
                  <select
                    className="common-select"
                    {...socialRegister(`social${index}Name`)}
                    placeholder="Category"
                  >
                    <option>category1</option>
                    <option>category1</option>
                    <option>category1</option>
                    <option>category1</option>
                  </select>
                  <input
                    {...socialRegister(`social${index}userId`)}
                    placeholder="User ID"
                    className="common-input"
                    {...register("userId")}
                  />
                  <input
                    {...socialRegister(`social${index}password`)}
                    placeholder="password"
                    className="common-input"
                    {...register("password")}
                  />
                </div>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
};

export default BuisnessDetails;
