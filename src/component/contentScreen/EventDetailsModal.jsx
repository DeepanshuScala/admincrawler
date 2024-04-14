import React, { useEffect, useState } from 'react';
import { Modal, Select, MenuItem, CircularProgress } from '@mui/material';
import { getData, postData } from '../../utils/api'; // Assuming getData is your API call function
import PrimaryButton from '../../common/FormElements/Button/PrimaryButton';
import { enqueueSnackbar } from 'notistack';
import { formatErrorMessage } from '../../utils/formatErrorMessage';
import ContentLoader from '../../common/Loader/contentLoader';
import CloseIcon from "@mui/icons-material/Close";
const EventDetailsModal = ({ fetchAllEvents, open, handleClose, events }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserBusinessProfiles, setSelectedUserBusinessProfiles] = useState([]);
  const [selectedBusinessProfile, setSelectedBusinessProfile] = useState('');
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      if (events) {
        setLoading(true);
        try {
          const res = await getData(`user/list`);
          setApiData(res.data.users);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (open) {
      fetchData();
    }
  }, [events, open]);
  const handleChange = async (event) => {
    const userId = event.target.value;
    setSelectedUserId(userId);
    setSelectedBusinessProfile('');
    const selectedUser = apiData.find(user => user._id === userId);
    if (selectedUser && selectedUser.businessProfiles) {
      setSelectedUserBusinessProfiles(selectedUser.businessProfiles);
    } else {
      setSelectedUserBusinessProfiles([]);
    }
  }
  const handleBusinessProfileChange = (event) => {
    setSelectedBusinessProfile(event.target.value); // Update the selected business profile state
  };

  const handlepublish = async () => {
    setLoading(true);
    try {
      const finaldata = {
        ids: events.map(event => event._id),
        user: selectedUserId,
        businessProfile: selectedBusinessProfile,
      }
      const res = await postData(`event/crawled/publish`, {
        ...finaldata
      });
      if (res.data) {
        enqueueSnackbar(res.data.message ?? "", {
          variant: "success",
        });
        setTimeout(() => {
          setLoading(false);
          handleClose();
          fetchAllEvents();
        }, 1000);
      }
      else {
        setLoading(false);
        enqueueSnackbar(
          res.error?.message
            ? formatErrorMessage(res.error?.message)
            : "Something went wrong",
          {
            variant: "error",
          }
        );
      }
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(
        error.message
          ? formatErrorMessage(error?.message)
          : "Something went wrong",
        {
          variant: "error",
        }
      );
    }
  }

  return (
    <Modal
      class
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="md:w-1/2 min-h-[25vh] px-4 py-2.5 outline-none bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-none rounded-lg   w-[380px] sm:w-[500px] lg:w-[400px]">
        <div className="">

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-subtitle font-medium text-[#232323]">
            Publish Event
            </p>
            <CloseIcon className='cursor-pointer' onClick={handleClose} />
          </div>
        </div>

          {/* <div className="">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div> */}
          <div className="">
            <div className="w-full bg-white border-none rounded-lg">
              <div className="mb-4">
                {loading ? (
                  <ContentLoader />
                ) : (
                  <>
                 
                    <select className='secondary-select common-input' value={selectedUserId} onChange={handleChange}>
                      <option value=''>Select a user</option>
                      {apiData.map((item) => {
                        if (item.businessProfiles && item.businessProfiles.length > 0) {
                          return (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </select>
                    {selectedUserBusinessProfiles.length > 0 && (
                      <select className='secondary-select w-full common-input mb-2 mt-2' value={selectedBusinessProfile} onChange={handleBusinessProfileChange}>
                        <option value=''>Select a business</option>
                        {selectedUserBusinessProfiles.map((profile) => (
                          <option key={profile._id} value={profile._id}>
                            {profile.name}
                          </option>
                        ))}
                      </select>
                    )}
                    {selectedBusinessProfile && ( // Conditionally render the "Publish" button
                      <PrimaryButton inputClass={"min-w-[140px]"} onClick={handlepublish}>
                        <span>Publish</span>
                      </PrimaryButton>
                    )}
                  </>

                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventDetailsModal;
