import React, { useState } from "react";
import SecondaryButton from "../../../common/FormElements/Button/SecondaryButton";
import { DEC, INC } from "../../../utils/constants/commonConstants";
import PrimaryButton from "../../../common/FormElements/Button/PrimaryButton";
import Image from "../../image";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { enqueueSnackbar } from "notistack";
import { postData } from "../../../utils/api";
import { formatErrorMessage } from "../../../utils/formatErrorMessage";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import { Marker } from "react-leaflet";
import SimpleMap from "../../location/simplemap";

// const PrevDate = ({ dateData }) => {
//   const prevDateArr = dateData.map(data => {
//     const { date: dateString, durations = {} } = data;
//     const { startTime = "", endTime = "" } = durations;
//     const convDate = new Date(dateString);
//     const day = convDate.getDate();
//     const daysListArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const dayName = daysListArr[convDate.getDay()]; // Changed to getDay() for local time

//     const [hoursStart, minutesStart] = startTime.split(":");
//     const startDateTime = new Date(convDate).setHours(hoursStart, minutesStart, 0, 0);
//     const isoStringStart = new Date(startDateTime).toISOString();

//     const [hoursEnd, minutesEnd] = endTime.split(":");
//     const endDateTime = new Date(convDate).setHours(hoursEnd, minutesEnd, 0, 0);
//     const isoStringEnd = new Date(endDateTime).toISOString();

//     return {
//       day,
//       startTime: isoStringStart,
//       endTime: isoStringEnd,
//       dayName
//     };
//   });

//   return (
//     <>
//       {prevDateArr.map((item, index) => (
//         <li key={index} className="bg-[#DDDDD7] rounded-xl p-4 text-center">
//           <div className="text-2xl text-black font-semibold mb-1">{item.day}</div>
//           <div className="text-xs font-normal text-[#7C7C72]">{item.dayName}</div>
//           <div className="text-[10px] font-normal text-[#009CA6]">{item.startTime} - {item.endTime}</div>
//         </li>
//       ))}
//     </>
//   );
// };

const Step5 = ({
  handleStep,
  handleClose,
  id,
  currentStep,
  fetchAllEvents,
  eventData,
  fetchEventData,
  step4Data
}) => {
  const [loading, setLoading] = useState(false);
  const mapContainerStyle = {
    width: '600px',
    height: '200px',
  };
  const googleMapsApiKey = 'AIzaSyDUvDUk0y7o4O_XPRHxnHcgONZgkszf5Hs';
  const handlesubmit = async() => {
    setLoading(true);
    const res = await postData(`event/crawled/edit/${id}`, { status: 'published' });
    if (res.data) {
      enqueueSnackbar(res.data.message ?? "", {
        variant: "success",
      });
      fetchAllEvents();
      //fetchEventData(id);
      handleStep(INC);
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
  }
  return (
    <div className="flex flex-col h-full">

      <div className="img-part mb-6">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
        >
          {step4Data?.images?.map((image,index) => (
            <SwiperSlide key={index}>
              <img src={image.url} alt={`Slide ${index}`} className="swiper-image w-full h-[300px]"/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="preview-detail">

        <div className="tags flex items-center justify-between mb-4">
          <div className="text-[#623B16] text-sm font-semibold py-1.5 px-2 flex items-center bg-[#F59438] rounded-md">
            <span>
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.76775 3.16666H2.96024C2.96024 3.16666 2.66699 4.23332 2.66699 6.0111C2.66699 7.23506 3.26212 7.59915 3.72072 7.87972C4.00816 8.05557 4.24196 8.19861 4.24196 8.49999C4.24196 8.81008 4.1671 9.09223 4.07673 9.43284C3.93914 9.95142 3.76561 10.6055 3.76561 11.7C3.76561 13.5133 4.38815 13.8333 4.86422 13.8333C5.34028 13.8333 5.96283 13.4067 5.96283 11.7C5.96283 10.6823 5.79345 10.0186 5.6567 9.48275C5.56411 9.11996 5.48648 8.81577 5.48648 8.49999C5.48648 8.20025 5.71775 8.06235 6.00304 7.89224C6.46225 7.61843 7.06145 7.26116 7.06145 6.0111C7.06145 4.83777 6.73172 3.16666 6.73172 3.16666H5.9614C5.96249 3.17843 5.96296 3.19025 5.96283 3.20207V6.0111C5.96352 6.05822 5.95455 6.10499 5.93646 6.14872C5.91836 6.19244 5.8915 6.23223 5.85742 6.26579C5.82335 6.29934 5.78275 6.32598 5.73798 6.34417C5.69321 6.36236 5.64516 6.37172 5.59663 6.37172C5.5481 6.37172 5.50005 6.36236 5.45528 6.34417C5.41051 6.32598 5.3699 6.29934 5.33583 6.26579C5.30176 6.23223 5.27489 6.19244 5.2568 6.14872C5.2387 6.10499 5.22974 6.05822 5.23042 6.0111V3.20207C5.23053 3.19024 5.23125 3.17842 5.23257 3.16666H4.49658C4.49767 3.17843 4.49814 3.19025 4.49801 3.20207V6.0111C4.4987 6.05822 4.48974 6.10499 4.47164 6.14872C4.45354 6.19244 4.42668 6.23223 4.39261 6.26579C4.35853 6.29934 4.31793 6.32598 4.27316 6.34417C4.22839 6.36236 4.18034 6.37172 4.13181 6.37172C4.08328 6.37172 4.03523 6.36236 3.99046 6.34417C3.94569 6.32598 3.90509 6.29934 3.87101 6.26579C3.83694 6.23223 3.81008 6.19244 3.79198 6.14872C3.77388 6.10499 3.76492 6.05822 3.76561 6.0111V3.20207C3.76571 3.19024 3.76643 3.17842 3.76775 3.16666Z" fill="#623B16" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.55341 3.18782L12.8551 3.18332L12.9042 3.54118C12.9216 3.6682 13.3314 6.67058 13.3337 8.12106C13.3351 9.13489 12.812 10.0549 11.9096 10.669C11.7405 10.7841 11.6403 10.9721 11.6406 11.1722L11.6431 12.65C11.644 13.1671 12.0621 13.2211 12.478 13.2748C12.8897 13.328 13.2992 13.3809 13.3 13.8825L9.14104 13.8879C9.14024 13.3863 9.54975 13.3324 9.96133 13.2781C10.3771 13.2233 10.7949 13.1682 10.7942 12.6512L10.792 11.1735C10.7917 10.9734 10.6908 10.7855 10.5216 10.671C9.61727 10.0593 9.09128 9.14011 9.08977 8.12648C9.08876 7.47369 9.16982 6.51092 9.26034 5.63281L9.46322 3.87432C9.47265 3.80101 9.48438 3.70846 9.49305 3.64C9.49933 3.59037 9.50401 3.55342 9.50506 3.54565L9.55341 3.18782ZM12.3469 6.06469C12.2651 5.24597 12.1673 4.45027 12.1101 4.00725L10.3009 4.00989C10.1938 4.86082 9.93704 7.01487 9.93868 8.12566C9.94014 9.11987 10.5804 9.71894 11.0664 10.0324C10.7624 9.6348 10.5762 8.77343 10.5752 8.12452C10.5745 7.59571 10.6349 6.81987 10.708 6.06667L12.3469 6.06469Z" fill="#623B16" />
              </svg>
            </span>
            {step4Data.category.name}
          </div>

          <div className="text-sm text-black font-normal flex items-center gap-1.5">
            Verified Business
            <span>
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.1785 6.9268L10.1542 6.07322L7.28821 9.5124L5.80441 8.02861L4.8616 8.97141L7.37781 11.4876L11.1785 6.9268Z" fill="black" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99967 1.83334C4.31778 1.83334 1.33301 4.81811 1.33301 8.50001C1.33301 12.1819 4.31778 15.1667 7.99967 15.1667C11.6816 15.1667 14.6663 12.1819 14.6663 8.50001C14.6663 4.81811 11.6816 1.83334 7.99967 1.83334ZM2.66634 8.50001C2.66634 5.55449 5.05416 3.16668 7.99967 3.16668C10.9452 3.16668 13.333 5.55449 13.333 8.50001C13.333 11.4455 10.9452 13.8333 7.99967 13.8333C5.05416 13.8333 2.66634 11.4455 2.66634 8.50001Z" fill="black" />
                <path d="M11.3705 7.08685L11.5306 6.89479L11.3385 6.73474L10.3142 5.88117L10.1222 5.72112L9.96214 5.91317L7.27141 9.14205L5.98119 7.85183L5.80441 7.67505L5.62764 7.85183L4.68483 8.79464L4.50805 8.97141L4.68483 9.14819L7.20103 11.6644L7.39461 11.858L7.56986 11.6477L11.3705 7.08685ZM7.99967 1.58334C4.17971 1.58334 1.08301 4.68004 1.08301 8.50001C1.08301 12.32 4.17971 15.4167 7.99967 15.4167C11.8196 15.4167 14.9163 12.32 14.9163 8.50001C14.9163 4.68004 11.8196 1.58334 7.99967 1.58334ZM2.91634 8.50001C2.91634 5.69256 5.19223 3.41668 7.99967 3.41668C10.8071 3.41668 13.083 5.69256 13.083 8.50001C13.083 11.3075 10.8071 13.5833 7.99967 13.5833C5.19223 13.5833 2.91634 11.3075 2.91634 8.50001Z" stroke="white" stroke-opacity="0.5" stroke-width="0.5" />
              </svg>
            </span>
          </div>
        </div>

        <div className="preview-text pb-4 border-b border-[#DDDDD7] mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{step4Data.title}</h2>
            <span className="cursor-pointer">
              <MoreVertIcon className="text-black w-6 h-6" />
            </span>
          </div>

          <div className="text-lg text-black mb-4">
            by <span className="text-[#009CA6]">Spectrum Lounge & Bar</span>
          </div>
          <div className="text-base font-normal text-[#7C7C72]">
            {step4Data.description}
          </div>

        </div>

        <div className="date-preview pb-4 border-b border-[#DDDDD7] mb-8">
          <div className="mb-2">
            <h4 className="text-xl text-black font-semibold">
              Choose when
            </h4>
            <div className="text-[#7C7C72] text-sm font-normal">
              The offer started 2 days ago
            </div>
          </div>

          <div>
            <ul className="flex gap-2.5">
              {/* <PrevDate dateData={step4Data?.schedule} /> */}
            </ul>
          </div>

        </div>

        <div className="map-preview pb-4 border-b border-[#DDDDD7] mb-8">
          <div className="mb-2">
            <h4 className="text-xl text-black font-semibold">
              Choose Where
            </h4>
            <div className="text-[#7C7C72] text-sm font-normal">
            </div>
          </div>

          <div>
            <ul className="flex gap-2.5 contant-res-design">
                  <li>
                    <SimpleMap mapContainerStyle={mapContainerStyle} googleMapsApiKey={googleMapsApiKey} lat={step4Data.coordinates.latitude} lng={step4Data.coordinates.longitude} />
                  </li>
            </ul>
          </div>

        </div>

        <div className="bar-preview">
          <div className="w-[64px] h-[64px] rounded-full border border-gray-400">
            <Image src={step4Data?.creatorDetails?.profilePhoto} alt={'profile img'} className="w-[64px] h-[64px] rounded-full " />
          </div>
          <div className="text-2xl font-semibold text-black mb-0.5">
            {step4Data?.creatorDetails?.name}
          </div>
          <div className="text-lg font-normal text-[#7C7C72] mb-2">
            Where Moments Shine • <span className="text-[#009CA6]">{step4Data?.creatorDetails?.followersCount}</span> followers
          </div>

          <div className="text-base font-normal text-[#7C7C72] mb-4">
            {step4Data?.creatorDetails?.bio}
          </div>

          <PrimaryButton
            inputClass={"max-w-[140px] mb-4"}>

            <span>Follow</span>
          </PrimaryButton>

          <div className="social-link">
            <ul>
              <li className="flex items-center gap-2 text-base font-medium mb-1">
                <span>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0658 2.5L9.93418 2.5C9.0477 2.49995 8.28387 2.49991 7.67221 2.58214C7.0167 2.67028 6.38835 2.86902 5.87868 3.37868C5.36902 3.88835 5.17028 4.5167 5.08215 5.17221C4.99991 5.78387 4.99995 6.54768 5 7.43417L5 17.5658C4.99995 18.4523 4.99991 19.2161 5.08215 19.8278C5.17028 20.4833 5.36902 21.1117 5.87868 21.6213C6.38835 22.131 7.0167 22.3297 7.67221 22.4179C8.28388 22.5001 9.0477 22.5001 9.9342 22.5H14.0658C14.9523 22.5001 15.7161 22.5001 16.3278 22.4179C16.9833 22.3297 17.6117 22.131 18.1213 21.6213C18.631 21.1117 18.8297 20.4833 18.9179 19.8278C19.0001 19.2161 19.0001 18.4523 19 17.5658L19 7.43417C19.0001 6.54769 19.0001 5.78387 18.9179 5.17221C18.8297 4.5167 18.631 3.88835 18.1213 3.37868C17.6117 2.86902 16.9833 2.67028 16.3278 2.58214C15.7161 2.49991 14.9523 2.49995 14.0658 2.5ZM16.0613 4.56431C16.495 4.62263 16.631 4.71677 16.7071 4.7929C16.7832 4.86902 16.8774 5.00497 16.9357 5.43871C16.9979 5.90122 17 6.52892 17 7.5L17 17.5C17 18.4711 16.9979 19.0988 16.9357 19.5613C16.8774 19.995 16.7832 20.131 16.7071 20.2071C16.631 20.2832 16.495 20.3774 16.0613 20.4357C15.5988 20.4979 14.9711 20.5 14 20.5H10C9.02893 20.5 8.40121 20.4979 7.93871 20.4357C7.50497 20.3774 7.36902 20.2832 7.2929 20.2071C7.21677 20.131 7.12262 19.995 7.06431 19.5613C7.00213 19.0988 7 18.4711 7 17.5L7.00001 7.5C7.00001 6.52892 7.00213 5.90121 7.06431 5.43871C7.12263 5.00497 7.21677 4.86902 7.2929 4.7929C7.36902 4.71677 7.50497 4.62263 7.93871 4.56431C8.40122 4.50213 9.02893 4.5 10 4.5C10 4.97141 10 5.20711 10.1465 5.35356C10.2929 5.5 10.5286 5.5 11 5.5L13 5.5C13.4714 5.5 13.7071 5.5 13.8536 5.35356C14 5.20711 14 4.97141 14 4.5C14.9711 4.5 15.5988 4.50213 16.0613 4.56431ZM11 18.5C11 19.0523 11.4477 19.5 12 19.5C12.5523 19.5 13 19.0523 13 18.5C13 17.9477 12.5523 17.5 12 17.5C11.4477 17.5 11 17.9477 11 18.5Z" fill="#7C7C72" />
                  </svg>

                </span>
                <span className="text-[#009CA6]">{step4Data?.creatorDetails?.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-base font-medium mb-1">
                <span>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.93417 5.5C7.95604 5.5 7.97799 5.5 8 5.5L16.0658 5.5C16.9523 5.49995 17.7161 5.49991 18.3278 5.58215C18.9833 5.67028 19.6117 5.86902 20.1213 6.37868C20.631 6.88835 20.8297 7.5167 20.9179 8.17221C21.0001 8.78388 21.0001 9.5477 21 10.4342V14.5658C21.0001 15.4523 21.0001 16.2161 20.9179 16.8278C20.8297 17.4833 20.631 18.1117 20.1213 18.6213C19.6117 19.131 18.9833 19.3297 18.3278 19.4179C17.7161 19.5001 16.9523 19.5001 16.0658 19.5H7.93417C7.04769 19.5001 6.28387 19.5001 5.67221 19.4179C5.0167 19.3297 4.38835 19.131 3.87868 18.6213C3.36902 18.1117 3.17028 17.4833 3.08215 16.8278C2.99991 16.2161 2.99995 15.4523 3 14.5658L3 10.5C3 10.478 3 10.456 3 10.4342C2.99995 9.54769 2.99991 8.78387 3.08215 8.17221C3.17028 7.5167 3.36902 6.88835 3.87868 6.37868C4.38835 5.86902 5.0167 5.67028 5.67221 5.58215C6.28387 5.49991 7.04769 5.49995 7.93417 5.5ZM5.93871 7.56431C5.50497 7.62263 5.36902 7.71677 5.2929 7.7929C5.21677 7.86902 5.12263 8.00497 5.06431 8.43871C5.00213 8.90122 5 9.52893 5 10.5V14.5C5 15.4711 5.00213 16.0988 5.06431 16.5613C5.12263 16.995 5.21677 17.131 5.2929 17.2071C5.36902 17.2832 5.50497 17.3774 5.93871 17.4357C6.40122 17.4979 7.02893 17.5 8 17.5H16C16.9711 17.5 17.5988 17.4979 18.0613 17.4357C18.495 17.3774 18.631 17.2832 18.7071 17.2071C18.7832 17.131 18.8774 16.995 18.9357 16.5613C18.9979 16.0988 19 15.4711 19 14.5V10.5C19 9.52893 18.9979 8.90122 18.9357 8.43871C18.8774 8.00497 18.7832 7.86902 18.7071 7.7929C18.631 7.71677 18.495 7.62263 18.0613 7.56431C17.5988 7.50213 16.9711 7.5 16 7.5H8C7.02893 7.5 6.40122 7.50213 5.93871 7.56431Z" fill="#7C7C72" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6584 13.9472L3.55279 10.3944L4.44722 8.60558L11.5528 12.1584C11.8343 12.2991 12.1657 12.2991 12.4472 12.1584L19.5528 8.60558L20.4472 10.3944L13.3416 13.9472C12.4971 14.3695 11.5029 14.3695 10.6584 13.9472Z" fill="#7C7C72" />
                  </svg>

                </span>
                <span className="text-[#009CA6]">{step4Data?.creatorDetails?.email}</span>
              </li>
              <li className="flex items-center gap-2 text-base font-medium mb-1">
                <span>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C7.02944 3.5 3 7.52944 3 12.5C3 17.4706 7.02944 21.5 12 21.5C16.9706 21.5 21 17.4706 21 12.5C21 7.52944 16.9706 3.5 12 3.5ZM5.13334 11.1333C5.04586 11.5753 5 12.0323 5 12.5C5 16.0265 7.60771 18.9439 11 19.4291V18C10.5 18 9.5 17.8 9.5 17V15.5L5.13334 11.1333ZM17.2825 17.0931C18.3523 15.8638 19 14.2575 19 12.5C19 9.5084 17.1233 6.95511 14.483 5.95317C14.4208 6.82347 14.1722 8 13.5 8H11V9.5C11 10 10.9 11 10.5 11H8.5V12.5H13.5C13.8333 12.5 14.5 12.8 14.5 14V16H16C16.3543 16.1181 16.9598 16.4706 17.2825 17.0931Z" fill="#7C7C72" />
                  </svg>

                </span>
                <span className="text-[#009CA6]">{step4Data?.creatorDetails?.website}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <div className="flex justify-between items-center mt-auto pb-3 gap-2">
        <div className="flex items-center gap-1">
          <input class="form-check-input accent-[#009CA6]" type="checkbox" value="" name="savetemplate" id="savetemplate" c />
          <label class="form-check-label" for="savetemplate">
            Save as template
          </label>
        </div>
        <div className="flex items-center gap-1.5">
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
              // loading={loading}
              inputClass={"min-w-[140px]"}
              onClick={handlesubmit}
            >
              <span>Publish</span>
            </PrimaryButton>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Step5;
