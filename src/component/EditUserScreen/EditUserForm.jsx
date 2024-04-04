import React, { useState } from "react";
import Text from "../../common/Text";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import SecondaryButton from "../../common/FormElements/Button/SecondaryButton";
import FullButton from "../../common/FormElements/Button/FullButton";
import Image from '../../component/image'

const EditUserForm = () => {
  const [phone, setPhone] = useState("");

  return (
    <div className=" w-full md:w-[878px]">
      <div className=" w-full mx-12 my-4">
        <Text className="text-[24px] mob:text-[16px] font-bold">
          User Details
        </Text>
        <p>Update your business persona</p>
        <div className="w-full border border-[#DCE4E8] mt-7"/>
        <div className="mt-4 flex items-center space-x-3">
        <Image
          src={"/assets/images/ProfileIcon.svg"}
          alt="mainlogo"
          className={"mob:!h-[60px] mob:!w-[60px] w-[90px] h-[90px] "}
        />
        <button className="bg-black rounded-full h-[48px] w-[156px] "><p className="text-white whitespace-nowrap p-2">Upload new</p></button>
        <button className=" bg-tertiaryDark rounded-full h-[48px] w-[144px] "><p className="text-black p-2">Delete</p></button>
        </div>
      </div>
      <div className=" w-full mx-12 mt-6">
        <div className="w-full">
          <div className="mb-4">
            <div className=" w-full flex space-x-2 h-[66px] ">
              <input
                name="firstName"
                className="placeholder:text-[black] py-2 px-4 text-lg  outline-none rounded-2xl w-full border border-[#DCE4E8] focus:border-ButtonPrimary"
                placeholder="First Name"
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
              <hr className=" border-black border" />
              <input
                name="lastName"
                className="placeholder:text-[black] focus:border-ButtonPrimary py-2 px-4 text-lg  outline-none rounded-2xl w-full border border-[#DCE4E8]"
                placeholder="Last Name"
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
            </div>

            <div className="w-full mt-6 border border-[#DCE4E8]"/>
          </div>
         
            <p className="mt-6 text-[24px] font-ubuntu font-bold">Address</p>
            <div className="flex mb-6 mt-6 w-full space-x-4">

              <select name="type" id="" className="  w-full h-[66px] border border-tertiaryDark rounded-2xl outline-none py-2 px-4 focus:border-ButtonPrimary">
              <option>Country</option>
              <option value={"business_event"}>USA</option>
              <option value={"social_event"}>UK</option>
              </select>
              <input type="text" placeholder="City" className=" placeholder:text-[black] w-full border border-tertiaryDark rounded-2xl py-2 px-4 outline-none focus:border-ButtonPrimary" />
            {/* <select
              className="secondary-select w-full !border !text-base !p-[6px] "
              name="type"
            >
              <option>Country</option>
              <option value={"business_event"}>USA</option>
              <option value={"social_event"}>UK</option>
            </select> */}
          
          </div>
          <div className=" w-full mb-4 flex space-x-4">
          
            <div className="w-full">
              <input
                placeholder="ST"
                className="placeholder:text-[black] focus:border-ButtonPrimary h-[56px] py-2 px-4 text-lg  outline-none rounded-2xl w-full border border-[#DCE4E8]"
              />
            </div>
            <div className="w-full">
              <input
                placeholder="Zip"
                className="placeholder:text-[black] focus:border-ButtonPrimary h-[56px] py-2 px-4 text-lg  outline-none rounded-2xl w-full border border-[#DCE4E8]"
              />
            </div>
          </div>
          <div className="mb-6 flex w-full space-x-4">
            <input
              placeholder="Email"
              className="placeholder:text-[black] focus:border-ButtonPrimary py-2 px-4 text-lg  outline-none rounded-2xl w-full border border-[#DCE4E8]"
            />
                <div className="w-full h-[56px] ">
            <PhoneInput
              country={"us"}
              value={phone}
              inputClass="!w-full !h-[56px] rounded-2xl !focus:border-ButtonPrimary "
              // containerClass="common-input !border"
              onChange={(phone) => setPhone(phone)}
            />
          </div>
          </div>

          <div className="w-full border border-[#DCE4E8] mt-7"/>
       
          <div className=" w-full mt-5">
            <h1 className="font-semibold text-lg mb-2">Security Information</h1>
            <div className=" w-full flex gap-2">
              <input
              type="text"
              placeholder="User Name"
              className="placeholder:text-[black] focus:border-ButtonPrimary py-2 px-4 text-lg  outline-none rounded-2xl w-full border border-[#DCE4E8]"/>
              <input
                type="password"
                placeholder="Password"
                className="placeholder:text-[black] focus:border-ButtonPrimary py-2 px-4 text-lg  outline-none rounded-2xl w-full border border-[#DCE4E8]"
              />
              <SecondaryButton inputClass={"w-full !border-0 !bg-tertiaryDark !text-pureBlack font-bold"}>
                Change Password
              </SecondaryButton>
            </div>
          </div>
          {/* <div className="mt-5">
            <FullButton inputClass={"bg-white text-[#45818E] border-2 border-[#45818E]"}>Save Details</FullButton>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;
