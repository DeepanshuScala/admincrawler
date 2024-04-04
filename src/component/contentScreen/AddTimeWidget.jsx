import { Add } from "@mui/icons-material";
import classNames from "classnames";
import React from "react";

const AddTimeWidget = ({
  checkDate,
  handleAddInterval,
  dates,
  multipleTime,
  onTimeChange,
}) => {
  // const onChange = () => {

  // }
  // console.log(dates?.[Object.keys(dates)[0]], "1233454312345432");

  const getValue = (key, index) => {
    if (multipleTime) {
      return dates?.[checkDate]?.[index][key];
    } else {
      return dates?.[Object.keys(dates)[0]][index][key];
    }
  };

  return (
    <div className="mb-3">
      <div
        className={classNames({
          "": true,
          "bg-[#FDFDFC] p-3 rounded-lg": !!checkDate,
        })}
      >
        {checkDate && (
          <h1 className="text-black text-base font-semibold mb-3">
            {checkDate}
          </h1>
        )}

        {multipleTime ? (
          <>
            {dates[checkDate]?.map((date, index) => {
              return (
                <div
                className="flex gap-4 mb-3 items-center justify-between w-full"
                  key={index}
                >
                  <div className="flex-grow">
                    <input
                      type="time"
                      className={classNames({
                        "py-2 px-5 rounded-md text-base w-full text-black": true,
                        "bg-[#FDFDFC] border shadow-none border-[#E3E3D8] flex items-center justify-center text-center": !checkDate,
                      })}
                      onChange={(e) => {
                        onTimeChange(e.target.value, index, "startTime", checkDate);
                      }}
                      value={getValue("startTime", index)}
                    />
                  </div>
                  <span>-</span>
                  <div className="flex-grow">
                    <input
                      type="time"
                      className={classNames({
                        "py-2 px-5 rounded-md text-base w-full text-black": true,
                        "bg-[#0000000d]": !checkDate,
                      })}
                      onChange={(e) => {
                        onTimeChange(e.target.value, index, "endTime", checkDate);
                      }}
                      value={getValue("endTime", index)}
                    />
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
          {console.log(dates, ">>>>>>>>>>>> dates 123")}
            {dates?.[Object.keys(dates)[0]]?.map((dateObj, index) => {
              return (
                <div
                  className="flex gap-4 mb-3 items-center justify-between w-full"
                  key={index}
                >
                  <div className="flex-grow text-center">
                    <input
                      type="time"
                      className={classNames({
                        "py-2 px-5 rounded-md text-base w-full text-black": true,
                        "bg-[#FDFDFC] border shadow-none border-[#E3E3D8] flex items-center justify-center text-center": !checkDate,
                      })}
                      onChange={(e) => {
                        onTimeChange(e.target.value, index, "startTime");
                      }}
                      value={getValue("startTime", index)}
                    />
                  </div>
                  <span>-</span>
                  <div className="flex-grow">
                    <input
                      type="time"
                      className={classNames({
                        "py-2 px-5 rounded-md text-base w-full text-black": true,
                        "bg-[#FDFDFC] border shadow-none border-[#E3E3D8] flex items-center justify-center text-center": !checkDate,
                      })}
                      onChange={(e) => {
                        onTimeChange(e.target.value, index, "endTime");
                      }}
                      value={getValue("endTime", index)}
                    />
                  </div>
                </div>
              );
            })}
          </>
        )}

        <div
          className="w-full flex justify-center items-center gap-2 text-xs h-[48px] text-center mt-3 rounded-md p-2 bg-[#D3E9EB] text-[#009CA6] font-semibold cursor-pointer"
          onClick={() => handleAddInterval(checkDate)}
        >
          <Add className="text-[#009CA6] w-5 h-5 " />
          Add Interval
        </div>
      </div>
    </div>
  );
};

export default AddTimeWidget;
