import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { postData } from "../../../utils/api";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../../utils/formatErrorMessage";

const FacebookLoginButton = ({ fetchUserDetails, isConnected }) => {
  const [fbCredential, setFbCredential] = useState();

  const responseFacebook = async (response) => {
    if (response.accessToken) {
      // setAccessToken(response.accessToken);
      setFbCredential(response);
      const res = await postData("business-profile/connect/facebook", {
        accessToken: response.accessToken,
      });

      if (res.data) {
        enqueueSnackbar(res.data.message ?? "", {
          variant: "success",
        });
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

      fetchUserDetails();
    }
  };

  const handleLogout = () => {
    // debugger;
    setFbCredential(null);
    // setAccessToken("");
    // console.log(window.FB);
    if (window.FB) {
      window.FB.logout(function (response) {
        // user is now logged out
        console.log(response, ">>>>> response logout");
      });
    }
  };

  const handleDisconnect = async () => {
    const res = await postData("business-profile/disconnect/facebook", {});
    fetchUserDetails();

    if (res.data) {
      handleLogout();
      enqueueSnackbar(res.data.message ?? "", {
        variant: "success",
      });
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

  useEffect(() => {
    if (window.FB) {
      window.FB.getLoginStatus(function (response) {
        console.log(response, ">>>>>> response");
        setFbCredential(response?.authResponse);
      });
    }
  }, []);
  return (
    <>
      {isConnected ? (
        <>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            // onClick={handleLogout}
            onClick={handleDisconnect}
          >
            Disconnect from facebook
          </button>
        </>
      ) : (
        <FacebookLogin
          appId="403498615515373"
          autoLoad={false}
          fields="name,email,picture,accounts" // Include 'accounts' to get information about user's Pages
          callback={responseFacebook}
          render={(renderProps) => (
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={renderProps.onClick}
            >
              Connect with facebook
            </button>
          )}
        />
      )}
    </>
  );
};

export default FacebookLoginButton;
