import React, { useState, useEffect } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import PrimarySwitch from "../../../common/FormElements/Switch/PrimarySwitch";
import AddTimeWidget from "../AddTimeWidget";
import { postData } from "../../../utils/api";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../../utils/formatErrorMessage";
import { DEC, INC } from "../CreateContent";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import SecondaryButton from "../../../common/FormElements/Button/SecondaryButton";
import PrimaryButton from "../../../common/FormElements/Button/PrimaryButton";

const Step2 = ({
  handleStep,
  handleClose,
  id,
  currentStep,
  fetchAllEvents,
  fetchEventData,
  eventData,
}) => {
  
  const [values, setValues] = useState([new DateObject()]);
  const [range, setRange] = useState(false);
  const [multipleTime, setMultipleTime] = useState(false);
  const [dates, setDates] = useState();

  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    let obj = {};
    
    values?.forEach((rawDate) => {
     
      if (obj[rawDate.format()]) {
      } else {
        obj[rawDate.format()] = [
          {
            startTime: "00:00",
            endTime: "23:05",
          },
        ];
      }
    });

    setDates(obj);
  }, [values]);

  useEffect(() => {
    console.log('de dewd ew')
    if (eventData?.schedule?.length) {
      // setValues();
      let eventDateObj = {};
      let dateValues = [];
      eventData?.schedule?.forEach((eventDate) => {
        eventDateObj = {
          ...eventDateObj,
          [eventDate?.date]: eventDate?.durations,
        };
        const date = new DateObject({
          date: eventDate?.date,
          format: "DD-MM-YYYY",
        });
        dateValues.push(date);
      });
      console.log('here the condole')
      console.log(eventDateObj)
      setDates(eventDateObj);
      setValues(dateValues);
      setMultipleTime(eventData?.specifyForEachDay)
    }
  }, [eventData]);

  const handleAddInterval = (date) => {
    if (multipleTime) {
      let obj = { ...dates };
      console.log(obj[date], ">>>>111www");
      obj[date] = [...obj[date], { startTime: "00:00", endTime: "23:05" }];
      setDates(obj);
    } else {
      // will add one duration object to all dates
      let obj = { ...dates };
      for (const key in obj) {
        obj[key] = [...obj[key], { startTime: "00:00", endTime: "23:05" }];
      }
      setDates(obj);
    }
  };

  const onTimeChange = (value, index, timekey, date) => {
    if (multipleTime) {
      let obj = { ...dates };
      obj[date][index][timekey] = value;
      setDates(obj);
    } else {
      // change on every date and interval
      let obj = { ...dates };
      for (const key in obj) {
        obj[key][index][timekey] = value;
      }
      setDates(obj);
    }
  };

  const handleChange = (event) => {
    setValues(event);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const transformDates = (dates) => {
      return Object.keys(dates).map((date) => {
        return {
          date: new Date(Date.UTC(2024, parseInt(date.split("-")[1]) - 1, parseInt(date.split("-")[0]))),
          durations: dates[date].map((duration) => {
            const [startHour, startMinute] = duration.startTime.split(":");
            const [endHour, endMinute] = duration.endTime.split(":");
            const startDate = new Date(Date.UTC(2024, parseInt(date.split("-")[1]) - 1, parseInt(date.split("-")[0]), startHour, startMinute));
            const endDate = new Date(Date.UTC(2024, parseInt(date.split("-")[1]) - 1, parseInt(date.split("-")[0]), endHour, endMinute));

            return {
              startTime: startDate.toISOString(),
              endTime: endDate.toISOString()
            };
          }),
        };
      });
    };

    const data = transformDates(dates);

    const res = await postData(`event/crawled/edit/${id}`, {
      schedule: data,
      specifyForEachDay: multipleTime,
    });

    if (res.data) {
      enqueueSnackbar(res.data.message ?? "", {
        variant: "success",
      });
      // fetchEventData(id);
      fetchAllEvents();
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
  
    // handleStep(INC);
    setLoading(false);
  };

  return (
    <>
      <div>
        <div className="custom-calendar">
          <div className="mt-3 flex justify-between">
            <h1 className="text-base font-semibold">Dates</h1>
            {/* <PrimarySwitch
              onChange={(value) => {
                setRange(value);
                setValues();
              }}
              labelText="Select date range"
            /> */}
          </div>
          <div className="">
            <Calendar
              value={values}
              range={range}
              multiple={!range}
              className="custom-color"
              headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
              monthYearSeparator=" "
              onChange={handleChange}
              // format="ddd, D MMMM, YYYY"
              format="DD-MM-YYYY"
            />
          </div>

          <hr />

          <div className="mt-3 mb-3 flex justify-between items-center">
            <div className="w-1/2">
              <h1 className="text-lg font-semibold">Times</h1>

            </div>
            <div className="w-1/2 flex-grow">
              <PrimarySwitch className="" checked={multipleTime}
                onChange={(value) => {
                  setMultipleTime(value.target.checked);
                }}
                labelText="Specify for each day"
              />
            </div>

          </div>
          {multipleTime ? (
            <>
              {values?.map((date) => {
                return (
                  <AddTimeWidget
                    checkDate={date.format()}
                    multipleTime={multipleTime}
                    dates={dates}
                    onTimeChange={onTimeChange}
                    handleAddInterval={handleAddInterval}
                  />
                );
              })}
            </>
          ) : (
            <AddTimeWidget
              multipleTime={multipleTime}
              dates={dates}
              handleAddInterval={handleAddInterval}
              onTimeChange={onTimeChange}
            />
          )}
        </div>
      </div>


      <div className="flex justify-end items-center mt-auto pb-3 gap-2">
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
            loading={loading}
            inputClass={"min-w-[140px]"}
            onClick={() => handleSubmit()}
          >
            <span>Next</span>
          </PrimaryButton>
        </div>
      </div>

    </>
  );
};

export default Step2;
