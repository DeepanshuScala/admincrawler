import React, { useEffect, useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Text from "../../common/Text";
import { useParams } from "react-router";
import { getData } from "../../utils/api";

const ViewEvent = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  const fetchEvent = async () => {
    const res = await getData(`event/created/${id}`);
    if (res.data) {
      setData(res.data?.event);
    } else {
      console.log(res, "Error while fetching business profiles");
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div className="">
      <div className="mx-12 my-4">
        <Text className="text-[24px] mob:text-[16px] font-bold">
          View Event
        </Text>
      </div>
      <div className="mx-12">
        <div className="flex gap-8 md:flex-row flex-col">
          <div className="md:w-1/2 w-full">
            <div className="mb-3">
              <img
                className="w-36 h-36 rounded-full border-4 border-[#e8e51a]"
                src={
                  data?.images?.length
                    ? data?.images[0].url
                    : "https://via.placeholder.com/150"
                }
                alt=""
              />
            </div>
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">Type</h1>
              <h3 className="text-[#666] capitalize text-sm">{data?.type}</h3>
            </div>
            
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">Status :</h1>
              <h3 className="text-[#666] capitalize text-sm">{data?.status}</h3>
            </div>
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">
                Booking Url :
              </h1>
              <h3 className="text-[#666] capitalize text-sm">
                {data?.bookingUrl}
              </h3>
            </div>
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">
                Participation Cost :
              </h1>
              <h3 className="text-[#666] capitalize text-sm">
                {data?.participationCost}
              </h3>
            </div>
            <div className="mb-2 ">
              <h1 className="text-[#222] mb-2 font-semibold text-base">
                Schedule:
              </h1>
              {data?.schedule?.map((schedule) => {
                return (
                  <div className=" ml-2 text-[#666] capitalize text-sm">
                    <div className="flex justify-between mb-1">
                      <h3 className="text-[#222] font-semibold text-sm">
                        Date :
                      </h3>
                      <p className="text-[#777] text-sm">{schedule.date}</p>
                    </div>
                    <div className="ml-3 justify-between flex mb-2">
                      <h3 className="text-[#222] font-semibold text-sm">
                        Durations :
                      </h3>
                      <ul className="">
                        {schedule.durations.map((duration) => {
                          return (
                            <li className="text-[#777] text-sm">
                              {duration.startTime} - {duration.endTime}
                            </li>
                          );
                        })}
                      </ul>
                      {/* <p></p> */}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">
                RSVP :
              </h1>
              <h3 className="text-[#666] capitalize text-sm">
                {data?.RSVP ? <span><DoneIcon /></span> : <span><CloseIcon /></span>}
              </h3>
            </div>
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">
                Notify Followers :
              </h1>
              <h3 className="text-[#666] capitalize text-sm">
                {data?.notifyFollowers ? <span><DoneIcon /></span> : <span><CloseIcon /></span>}
              </h3>
            </div>
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">
                Free :
              </h1>
              <h3 className="text-[#666] capitalize text-sm">
                {data?.isFree ? <span><DoneIcon /></span> : <span><CloseIcon /></span>}
              </h3>
            </div>

            {/* <div className="mb-2 ">
              <h1 className="text-[#222] font-semibold text-base">
                Categories
              </h1>
              <ul className="list-none ml-2 text-[#666] capitalize text-sm">
                <li>First</li>
                <li>two</li>
                <li>Falsy</li>
                <li>Hinfi</li>
              </ul>
            </div> */}
          </div>
          <div className="md:w-1/2 w-full">
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">Title :</h1>
              <h3 className="text-[#666] capitalize text-sm">{data?.title}</h3>
            </div>
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">
                Target Genders :
              </h1>
              <h3 className="text-[#666] capitalize text-sm">
                {data?.targetGenders}
              </h3>
            </div>
            <div className="mb-3 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">
                Description :
              </h1>
              <h3 className="text-[#666] capitalize text-sm max-w-50">
                {data?.description}
              </h3>
            </div>
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">
                Keywords :
              </h1>
              <h3 className="text-[#666] capitalize text-sm max-w-40">
                {data?.keywords?.map(({name}) => name).join(', ')}
              </h3>
            </div>
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">
              Age Groups :
              </h1>
              <h3 className="text-[#666] capitalize text-sm max-w-40">
                {data?.ageGroupsAllowed?.map(({name}) => name).join(', ')}
              </h3>
            </div>
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">
                Unique Code :
              </h1>
              <h3 className="text-[#666] capitalize text-sm">
                {data?.uniqueCode}
              </h3>
            </div>
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">
                Category :
              </h1>
              <h3 className="text-[#666] capitalize text-sm">
                {data?.category?.name}
              </h3>
            </div>

            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">
                Promotion Code :
              </h1>
              <h3 className="text-[#666] capitalize text-sm">
                {data?.promotionCode}
              </h3>
            </div>
            <div className="mb-2 flex justify-between">
              <h1 className="text-[#222] font-semibold text-base">
                Terms And Conditions :
              </h1>
              <h3 className="text-[#666] capitalize text-sm max-w-38">
                {data?.termsAndConditions}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
