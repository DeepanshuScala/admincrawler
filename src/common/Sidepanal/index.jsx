import React, { useState } from "react";
import { sidepanalLinks } from "../../contentmanagement/sidepanal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { CloseRounded, MenuRounded,EmailOutlinedIcon } from "@mui/icons-material";

import { useAuthentication } from "../../context/authContext";
import { clearStorage } from "../../utils/localStorage";
import { MODULE } from "../../config/routes/RoleProtectedRoute";

const Sidepanal = () => {
  const location = useLocation();
  const [isPanalOpen, setIsPanalOpen] = useState(false);
  const navigate = useNavigate();

  const { user, setUser} = useAuthentication();

  const handleLogout = () => {
    setUser(null);
    clearStorage();
    navigate("/login");
  };

  return (
    <>
      <div
        className={classNames(
          isPanalOpen ? "mob:w-full mob:h-full" : "mob:w-0 mob:px-0",
          "flex  fixed z-20 top-0 transition-[width] duration-500 ease-in-out   mob:fixed  mob:z-40  flex-col min-h-screen h-[100dvh] mob:left-0 mob:h-[calc(100vh-134px)] p-0 w-[200px] bg-pureBlack overflow-hidden"
        )}
      >
        <div className=" w-full flex md:mb-4 mb-2  p-3 pt-5">
          {/* <p className=" text-tertiaryDark text-h3 font-redHat font-bold">Pinntag</p>
          <p className=" text-primary text-h3 font-redHat">Admin</p> */}

          <div className="ms-auto">
            <CloseRounded
              onClick={() => setIsPanalOpen(false)}
              className="stroke-[3px] md:!hidden w-8 h-8 text-[#74746E]"
            />
          </div>

        </div>


        {user && (
          <>
            {sidepanalLinks.map((items) => {
                return (
                  <Link onClick={() => setIsPanalOpen(false)} to={items.Link}>
                    <div
                      className={classNames(
                        isPanalOpen ? "mob:block" : "mob:hidden",
                        location.pathname === items.Link
                          ? "bg-ButtonPrimary   text-white font-bold  "
                          : "hover:bg-tertiaryDark ",
                        "w-full transition-[display]  duration-500 ease-in-out  cursor-pointer  active:shadow-none p-4  text-[#74746E]"
                      )}
                    >
                      <div className="flex  w-full gap-2">
                        <img src={(location.pathname === items.Link) ? items.acticon : items.icons} alt="" className=" hover:text-white w-[20px] h-[20px]" />
                        <p className=" whitespace-nowrap text-sm">{items.Title}</p>
                      </div>

                    </div>
                  </Link>
                );
            })}

            <div
              className={classNames(
                isPanalOpen ? "mob:block" : "mob:hidden",
                "mt-auto w-full transition-[display] duration-500 ease-in-out cursor-pointer  py-2 text-center text-base bg-ButtonPrimary text-white font-bold"
              )}
              onClick={handleLogout}
            >
              Logout
            </div>
          </>
        )}
      </div>
      <div
        onClick={() => setIsPanalOpen(true)}
        className={classNames(
          isPanalOpen && "!hidden",
          "hidden  mob:flex justify-center items-center z-0 top-5 left-4 mob:fixed mob:z-40 w-[30px] h-[30px]"
        )}
      >
        <MenuRounded className="text-black w-[20px] h-[20px]" />
      </div>
    </>
  );
};

export default Sidepanal;
