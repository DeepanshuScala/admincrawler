import React, { useEffect, useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Text from "../../common/Text";
import { useParams } from "react-router";
import { getData, postData } from "../../utils/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PrimaryButton from "../../common/FormElements/Button/PrimaryButton";
import SimpleMap from "../../component/location/simplemap";
import Image from "../../component/image";
import { LoadScriptNext } from "@react-google-maps/api";


const PrevDate = ({ dateData }) => {
  // console.log(dateData)
  const prevDateArr = dateData.map(data => {
    const { date: dateString, durations = [] } = data;
    const convDate = new Date(dateString);
    const day = convDate.getDate();
    const daysListArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = daysListArr[convDate.getDay()]; // Changed to getDay() for local time

    const { startTime = "", endTime = "" } = durations.length > 0 ? durations[0] : {};
    const [startHour, startMinute] = startTime.split("T")[1].split(":");
    const [endHour, endMinute] = endTime.split("T")[1].split(":");
    const startDateTime = new Date(convDate).setHours(startHour, startMinute, 0, 0);
    const endDateTime = new Date(convDate).setHours(endHour, endMinute, 0, 0);

    const startTimeFormatted = new Date(startDateTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    const endTimeFormatted = new Date(endDateTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    return {
      day,
      startTime: startTimeFormatted,
      endTime: endTimeFormatted,
      dayName
    };
  });

  // console.log(prevDateArr);

  return (
    <>
      {prevDateArr.map((item, index) => (
        <li key={index} className="bg-[#DDDDD7] rounded-xl p-4 text-center">
          <div className="text-2xl text-black font-semibold mb-1">{item.day}</div>
          <div className="text-xs font-normal text-[#7C7C72]">{item.dayName}</div>
          <div className="text-[10px] font-normal text-[#009CA6]">{item.startTime} - {item.endTime}</div>
        </li>
      ))}
    </>
  );

}

const ViewEvent = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loader, setloader] = useState(true)

  const fetchEventData = async (id) => {
    setloader(true)
    const resposne = await postData(`event/crawled/edit/${id}`);
    if (resposne.data) {
      const eventData = resposne.data?.event;
      setData(eventData);
      setloader(false)
    } else {
      console.log(resposne.error, "Error while fetching business details");
    }
  };


  useEffect(() => {
    fetchEventData(id);
  }, []);


  const googleMapsApiKey = 'AIzaSyDUvDUk0y7o4O_XPRHxnHcgONZgkszf5Hs';


  console.log(data)
  return (
    <>
      {
        loader ? 'loader ... ' :
          <div className="flex flex-col h-full md:max-w-lg p-3 mb-2 rounded-md mx-auto border border-gray-200">

            <div className="img-part mb-6">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
              >
                {data?.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image.url} alt={`Slide ${index}`} className="swiper-image w-full h-[300px]" />
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
                  {data?.category?.name}
                </div>
              </div>

              <div className="preview-text pb-4 border-b border-[#DDDDD7] mb-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">{data?.title}</h2>
                  
                </div>

                <div className="text-base font-normal text-[#7C7C72]">
                  {data?.description}
                </div>

              </div>

              <div className="date-preview pb-4 border-b border-[#DDDDD7] mb-8">
                <div className="mb-2">
                  <h4 className="text-xl text-black font-semibold">
                    Choose when
                  </h4>

                </div>

                <div>
                  <ul className="flex gap-2.5">
                    <PrevDate dateData={data?.schedule} />
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
                    {data?.coordinates.lat && data?.coordinates.lng? (
                      
                          
                              <LoadScriptNext  googleMapsApiKey={googleMapsApiKey}>
                                <SimpleMap mapContainerStyle={{ width: '100%', height: '400px' }} googleMapsApiKey={googleMapsApiKey} lat={data.coordinates.lat} lng={data.coordinates.lng} />
                                
                              </LoadScriptNext>
          
                          
                        
                        ):
                        (
                          <div>No map data available</div>
                        )
                    }
              
                </div>

              </div>

            </div>
          </div>
      }




    </>
  );
};

export default ViewEvent;