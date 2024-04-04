import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Image from "../../component/image";
import Text from "../Text";
import { Link } from "react-router-dom";
import { useAuthentication } from "../../context/authContext";
import { getData, getDataTemp } from "../../utils/api";
import {
  PINNTAG_BUSINESS_PROFILE,
  PINNTAG_USER,
} from "../../config/routes/RoleProtectedRoute";
import { removeItem } from "../../utils/localStorage";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import AddIcon from '@mui/icons-material/Add';
import NotificIcon from '../../assets/icons/notification.svg'
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../utils/formatErrorMessage";

const Header = () => {

  const { user, businessUser, setBusinessUser, setUser } = useAuthentication();

  const [addBussiness, setaddBussiness] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);


  const fetchAllBusinessProfiles = async () => {
    setLoading(true);
    const res = await getDataTemp("business-profile/all");
    if (res.data) {
      setData(res.data?.businessProfiles);
    } else {
      console.log(res, "Error while fetching business profiles");
    }
    setLoading(false);
  };



  const switchToUserProfile = async () => {
    const res = await getData("auth/switch/profile");
    if (res?.data) {
      setUser(res.data);
      setBusinessUser();
      removeItem(PINNTAG_BUSINESS_PROFILE);
      localStorage.setItem(PINNTAG_USER, JSON.stringify(res.data));
      window.location.href = "/dashboard/business-details";
    } else {
      console.error(res.error, "error while switching profile");
    }
  };
  const selectBusinessHandler = async (e, id) => {
    e.preventDefault();

    const res = await getDataTemp(`business-profile/switch/${id}`);
    if (res.data) {
      console.log(res);
      setBusinessUser(res.data);
      localStorage.setItem(PINNTAG_BUSINESS_PROFILE, JSON.stringify(res.data));
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
 
  };

  return (
    <div className="bg-white fixed top-0 z-20 shadow-lg justify-between items-center flex w-full h-[72px] px-4 py-3 sm:px-6">
      {/* company details */}
      <div className={`hidden md:flex  flex-col sm:ml-[190px] px-6 transition-all bg-white ${addBussiness ? 'add-buss-menu gap-4' : null}`}>
        {
          data ?
            <div className="flex space-x-2 ">
              <Image
                src={data[0].profilePhoto}
                alt="mainlogo"
                className="h-[44px] w-[44px] sm:h-[44px] sm:w-[44px]"
              />
              <div className="hidden sm:flex flex-col justify-center pe-2 border-r border-[#DCE4E8]">
                <Text className="text-caption font-ubuntu text-[#74746E]">My business</Text>
                <Text className="text-h2 font-ubuntu font-medium">{data[0].name}</Text>
              </div>
              <div onClick={(e) => setaddBussiness(!addBussiness)} className="business-drop">
                <ArrowDropDownRoundedIcon
                  className="text-[#6C7278] w-6 h-6 cursor-pointer"
                />
              </div>
            </div> : null
        }

        {
          addBussiness ?
            <>

              {
                 data && data.length > 1 && data.slice(1).map((item, index) => (
                  <div className="flex item-center gap-3 ms-0 mb-2.5 cursor-pointer"
                  onClick={(event) =>
                    selectBusinessHandler(event, item._id)
                  }>
                    <div className="icon-part w-[44px] h-[44px] flex items-center justify-center rounded-md">
                      <Image
                        src={item.profilePhoto}
                        alt="mainlogo"
                        className="h-[44px] w-[44px] sm:h-[44px] sm:w-[44px]"
                      />
                    </div>
                    <div className="flex items-center">
                      <Text className="text-h2 font-ubuntu font-medium text-[#74746E]">{item.name}</Text>
                    </div>
                  </div>
                ))
              }


              <div className="flex item-center gap-3 ms-0 mb-2.5">
                <div className="icon-part w-[44px] h-[44px] bg-[#F5F5F3] flex items-center justify-center rounded-md">
                  <AddIcon className="w-[24] h-[24px] text-[#74746E]" />
                </div>
                <div className="flex items-center">
                  <Text className="text-h2 font-ubuntu font-medium text-[#74746E]">Add Business</Text>
                </div>
              </div>

            </>
            : null
        }

      </div>

      {/* user detail */}
      <div className="flex justify-center w-fit h-fit items-center space-x-4 sm:space-x-6 p-2 ms-auto">
        <Image
          src={NotificIcon}
          alt="notification icon"
          className="h-[24px] w-[24px] sm:h-[24px] sm:w-[24px]"
        />
        <div className="h-[30px] border border-[#DCE4E8]" />
        <div className="text-sm sm:text-base">
          {user ? (
            <div className="flex gap-2 items-center">
              <Image
                src={"/assets/images/ProfileIcon.svg"}
                alt="profile icon"
                className="h-[32px] w-[32px] sm:h-[32px] sm:w-[32px]"
              />
              <Text className="hidden sm:block text-black text-base font-medium">
                {user?.user?.firstName}
              </Text>
            </div>
          ) : (
            <Link to="/login">
              {/* Display login link or button as needed */}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
