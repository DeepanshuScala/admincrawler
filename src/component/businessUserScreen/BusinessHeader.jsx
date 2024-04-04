import React from "react";
import Text from "../../common/Text";
import { Add, FilterAlt } from "@mui/icons-material";
import PrimaryButton from "../../common/FormElements/Button/PrimaryButton";
import { ReactComponent as Filtericon } from '../../assets/icons/Filters.svg'

const BusinessHeader = ({ handleOpen }) => {

  return (
    <>
      <div className="my-4 md:mx-10 mx-5 ">

        <div className="flex justify-between items-center mb-4">
          <Text className="text-[24px] mob:text-[16px] font-bold">
            Business Users
          </Text>

          <PrimaryButton onClick={handleOpen}
            inputClass="max-w-[150px] bg-[#03B4BF] text-white font-bold"  >
            <Add className="!text-white" />
            <span>Add</span>
          </PrimaryButton>
        </div>

        <div className="flex md:justify-end justify-start items-center gap-4">


          <div className="card-search order-1 search-content flex flex-grow items-center gap-1 p-2.5 border border-[#E3E3D8] rounded-lg">
            <div>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C9.90364 16 11.652 15.3351 13.0255 14.2249C13.0661 14.4016 13.1552 14.5694 13.2929 14.7071L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L14.7071 13.2929C14.5694 13.1552 14.4016 13.0661 14.2249 13.0255C15.3351 11.652 16 9.90364 16 8C16 3.58172 12.4183 0 8 0ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8Z" fill="#74746E" />
              </svg>
            </div>
            <input
              type="search"
              name="q"
              class="py-1 text-sm text-[#595959] bg-white rounded-md pl-2 focus:outline-none focus:bg-white focus:text-gray-900 border-none"
              placeholder="Search"
            />
          </div>

          <div className="card-filter order-3 flex items-center gap-1 p-2.5 border border-[#E3E3D8] rounded-lg">
            <Filtericon className="" />
            <p className="hidden md:flex text-base font-medium text-[#74746E]">Filter</p>
          </div>

        </div>

      </div>
    </>
  );
};

export default BusinessHeader;
