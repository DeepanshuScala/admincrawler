import React, { useState } from "react";
import Image from "../image";
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Text from "../../common/Text";
import swal from "@sweetalert/with-react";
import { Mail, PhoneAndroid } from "@mui/icons-material";
import { deleteData, getDataTemp, postData } from "../../utils/api";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import { ReactComponent as Deleteicon } from '../../assets/icons/delete.svg'
import { ReactComponent as Editicon } from '../../assets/icons/Edit.svg'

import ContentLoader from "../../common/Loader/contentLoader";

const LocationGrid = ({ data }) => {
  const handleDeleteLocation = async (id) => {
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

  const openeditlocation = (id) => {

  };
  return (
    <div className="md:mx-10 mx-5 overflow-auto">
      {data && data.locations.length > 0 ? (
        <>
          <div className="flex flex-col items-center">
            <div className="md:grid lg:grid-cols-4 md:grid-cols-3 gap-4 flex flex-nowrap contant-res-design">
              {data.locations.map(({ email, _id, phone, address1, address2, city, state, zip }, index) => (
                <div className="relative flex flex-col items-center justify-center overflow-hidden border border-grey rounded-2xl contant-res-design-child" key={_id}>
                  <div className="absolute flex justify-end w-full px-3 top-2 z-10">
                    <div className="flex gap-2">
                      <Editicon className="cursor-pointer p-1.5 rounded-full w-[30px] h-[30px] !text-grey bg-white"
                        onClick={() => {
                          openeditlocation(_id);
                        }}
                      />
                      <Deleteicon className="cursor-pointer p-1.5 rounded-full w-[30px] h-[30px] !text-white bg-red-500 right-[10px] top-[10px]"
                        onClick={() => {
                          handleDeleteLocation(
                            _id
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex h-full items-center justify-center w-full bg-cover relative">
                    <Image
                      src={"/assets/images/locationimg.jpg"}
                      className="border-2 rounded-2xl h-[165px] lg:h-[165px] border-white w-full"
                      alt={"test_image"}
                    />
                  </div>
                  <div className="w-full p-4 bg-white">
                    <p className="text-[#74746E] text-sm font-normal mb-2.5" >{`${!!(address1) ? address1 : ""} ${!!(address2) ? address2 : ""} ${!!(city) ? city : ""} ${!!(state) ? state : ""} ${!!(zip) ? zip : ""}`}</p>
                    <p className="text-[#74746E]  text-sm font-normal mb-2.5 flex items-center gap-1.5">
                      <span>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0658 2.5L9.93418 2.5C9.0477 2.49995 8.28387 2.49991 7.67221 2.58214C7.0167 2.67028 6.38835 2.86902 5.87868 3.37868C5.36902 3.88835 5.17028 4.5167 5.08215 5.17221C4.99991 5.78387 4.99995 6.54768 5 7.43417L5 17.5658C4.99995 18.4523 4.99991 19.2161 5.08215 19.8278C5.17028 20.4833 5.36902 21.1117 5.87868 21.6213C6.38835 22.131 7.0167 22.3297 7.67221 22.4179C8.28388 22.5001 9.0477 22.5001 9.9342 22.5H14.0658C14.9523 22.5001 15.7161 22.5001 16.3278 22.4179C16.9833 22.3297 17.6117 22.131 18.1213 21.6213C18.631 21.1117 18.8297 20.4833 18.9179 19.8278C19.0001 19.2161 19.0001 18.4523 19 17.5658L19 7.43417C19.0001 6.54769 19.0001 5.78387 18.9179 5.17221C18.8297 4.5167 18.631 3.88835 18.1213 3.37868C17.6117 2.86902 16.9833 2.67028 16.3278 2.58214C15.7161 2.49991 14.9523 2.49995 14.0658 2.5ZM16.0613 4.56431C16.495 4.62263 16.631 4.71677 16.7071 4.7929C16.7832 4.86902 16.8774 5.00497 16.9357 5.43871C16.9979 5.90122 17 6.52892 17 7.5L17 17.5C17 18.4711 16.9979 19.0988 16.9357 19.5613C16.8774 19.995 16.7832 20.131 16.7071 20.2071C16.631 20.2832 16.495 20.3774 16.0613 20.4357C15.5988 20.4979 14.9711 20.5 14 20.5H10C9.02893 20.5 8.40121 20.4979 7.93871 20.4357C7.50497 20.3774 7.36902 20.2832 7.2929 20.2071C7.21677 20.131 7.12262 19.995 7.06431 19.5613C7.00213 19.0988 7 18.4711 7 17.5L7.00001 7.5C7.00001 6.52892 7.00213 5.90121 7.06431 5.43871C7.12263 5.00497 7.21677 4.86902 7.2929 4.7929C7.36902 4.71677 7.50497 4.62263 7.93871 4.56431C8.40122 4.50213 9.02893 4.5 10 4.5C10 4.97141 10 5.20711 10.1465 5.35356C10.2929 5.5 10.5286 5.5 11 5.5L13 5.5C13.4714 5.5 13.7071 5.5 13.8536 5.35356C14 5.20711 14 4.97141 14 4.5C14.9711 4.5 15.5988 4.50213 16.0613 4.56431ZM11 18.5C11 19.0523 11.4477 19.5 12 19.5C12.5523 19.5 13 19.0523 13 18.5C13 17.9477 12.5523 17.5 12 17.5C11.4477 17.5 11 17.9477 11 18.5Z" fill="#7C7C72" />
                        </svg>

                      </span>
                      {`${phone}`}
                    </p>
                    <p className="text-[#74746E]  text-sm font-normal flex items-center gap-1.5">
                      <span>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.93417 5.5C7.95604 5.5 7.97799 5.5 8 5.5L16.0658 5.5C16.9523 5.49995 17.7161 5.49991 18.3278 5.58215C18.9833 5.67028 19.6117 5.86902 20.1213 6.37868C20.631 6.88835 20.8297 7.5167 20.9179 8.17221C21.0001 8.78388 21.0001 9.5477 21 10.4342V14.5658C21.0001 15.4523 21.0001 16.2161 20.9179 16.8278C20.8297 17.4833 20.631 18.1117 20.1213 18.6213C19.6117 19.131 18.9833 19.3297 18.3278 19.4179C17.7161 19.5001 16.9523 19.5001 16.0658 19.5H7.93417C7.04769 19.5001 6.28387 19.5001 5.67221 19.4179C5.0167 19.3297 4.38835 19.131 3.87868 18.6213C3.36902 18.1117 3.17028 17.4833 3.08215 16.8278C2.99991 16.2161 2.99995 15.4523 3 14.5658L3 10.5C3 10.478 3 10.456 3 10.4342C2.99995 9.54769 2.99991 8.78387 3.08215 8.17221C3.17028 7.5167 3.36902 6.88835 3.87868 6.37868C4.38835 5.86902 5.0167 5.67028 5.67221 5.58215C6.28387 5.49991 7.04769 5.49995 7.93417 5.5ZM5.93871 7.56431C5.50497 7.62263 5.36902 7.71677 5.2929 7.7929C5.21677 7.86902 5.12263 8.00497 5.06431 8.43871C5.00213 8.90122 5 9.52893 5 10.5V14.5C5 15.4711 5.00213 16.0988 5.06431 16.5613C5.12263 16.995 5.21677 17.131 5.2929 17.2071C5.36902 17.2832 5.50497 17.3774 5.93871 17.4357C6.40122 17.4979 7.02893 17.5 8 17.5H16C16.9711 17.5 17.5988 17.4979 18.0613 17.4357C18.495 17.3774 18.631 17.2832 18.7071 17.2071C18.7832 17.131 18.8774 16.995 18.9357 16.5613C18.9979 16.0988 19 15.4711 19 14.5V10.5C19 9.52893 18.9979 8.90122 18.9357 8.43871C18.8774 8.00497 18.7832 7.86902 18.7071 7.7929C18.631 7.71677 18.495 7.62263 18.0613 7.56431C17.5988 7.50213 16.9711 7.5 16 7.5H8C7.02893 7.5 6.40122 7.50213 5.93871 7.56431Z" fill="#7C7C72" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6584 13.9472L3.55279 10.3944L4.44722 8.60558L11.5528 12.1584C11.8343 12.2991 12.1657 12.2991 12.4472 12.1584L19.5528 8.60558L20.4472 10.3944L13.3416 13.9472C12.4971 14.3695 11.5029 14.3695 10.6584 13.9472Z" fill="#7C7C72" />
                        </svg>

                      </span>
                      {`${email}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="mt-10 text-center text-[#666] font-semibold text-lg">
          <p>No location uploaded yet!</p>
        </div>
      )}
    </div>
  );
};

export default LocationGrid;
