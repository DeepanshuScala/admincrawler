import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Popup, TileLayer } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import FullButton from "../../../common/FormElements/Button/FullButton";
import { Add } from "@mui/icons-material";
import "leaflet/dist/leaflet.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { getData, postData } from "../../../utils/api";
import CheckBox from "../../../common/FormElements/CheckBox/CheckBox";
import SecondaryButton from "../../../common/FormElements/Button/SecondaryButton";
import PrimaryButton from "../../../common/FormElements/Button/PrimaryButton";
import { DEC, INC } from "../CreateContent";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../../utils/formatErrorMessage";
import PrimaryModal from "../../../common/Modal/PrimaryModal";
import AddLocationModal from "./AddLocationModal";
import { FormControl, MenuItem, Select } from "@mui/base";
import { InputLabel } from "@mui/material";
import {GoogleMap, LoadScriptNext, Marker, useGoogleMap} from '@react-google-maps/api';
import SimpleMap from "../../location/simplemap";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const Step3 = ({
  handleStep,
  handleClose,
  id,
  currentStep,
  fetchAllEvents,
  eventData,
  fetchEventData,
}) => {
  console.log(eventData);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const googleMapsApiKey = 'AIzaSyDUvDUk0y7o4O_XPRHxnHcgONZgkszf5Hs';
  const [locations, setLocations] = useState([]);
  const [address, setAddress] = useState([]);
  const [locationIds, setLocationsId] = useState([]);
  const [loading, setLoading] = useState(false);

  const [secondaryModal, setSecondaryModal] = useState(false);
  const [age, setAge] = useState('');
  const handleSelect = (event) => {
    const selectedId = event.target.value;
    const location = locations.find(loc => loc._id === selectedId);
    setLocationsId(location)
    setSelectedLocation(location);
  };
  const AdvancedMarker = ({ position }) => {
    const map = useGoogleMap();
  
    useEffect(() => {
      if (!map) return;
  
      // Corrected the marker initialization
      const marker = new window.google.maps.Marker({
        position,
        map,
        // Add additional properties for the marker here
      });
  
      return () => marker.setMap(null); // Cleanup on component unmount
    }, [map, position]);
  
    return null; // This component does not render anything itself
  };
  
  useEffect(() => {
    //getLocations();
  }, []);

  useEffect(() => {

    if (eventData?.coordinates?.length > 0 && locations.coordinates > 0) {
      const eventLocationId = eventData.locations[0].businessLocationId; // Assuming single location selection for simplicity
      const matchedLocation = locations.find(loc => loc._id === eventLocationId);
      if (matchedLocation) {
        setSelectedLocation(matchedLocation);
      }
    }
  }, [eventData, locations]);

  const getLocations = async () => {
    setLoading(true);
    try {
      const res = await getData("/business-profile/locations");
      if (res.data) {
        setLocations(res.data.locations);
        const locIds = [true];
        const promise = res.data.locations.map((loc) => {
          locIds.push(false);
          return reverseGeoCoding(loc.latitude, loc.longitude);
        });
        setLocationsId(locIds);

        const address = await Promise.all(promise);
        setAddress(address);
      } else {
        console.error("Something went error", res);
      }
    }catch (error) {
      console.error("Error fetching locations:", error);
    }
    setLoading(false);
  };


  const reverseGeoCoding = async (lat, lng) => {
    try {
      const provider = new OpenStreetMapProvider();
      const data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDUvDUk0y7o4O_XPRHxnHcgONZgkszf5Hs`);
      // const data = await response.json();
      const results = await provider.search({ query: `${lat}, ${lng}` });
      const fullAddress =
        results.length > 0 ? results[0].label : "Unknown Address";
      // setAddress(fullAddress);
      // console.log("Full Address:", fullAddress);
      return fullAddress;
    } catch (err) {
      console.log(err, "error");
    }
  };

  const handleDragEnd = async (e, index) => {
    const { lat, lng } = e.target.getLatLng();
    // setPosition([lat, lng]);
    const newAddress = await reverseGeoCoding(lat, lng);
    const allAddress = [...address];
    allAddress[index] = newAddress;
    setAddress(allAddress);
  };

  const MapComponent = ({ position, index }) => {
    return (
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{ dragend: (e) => handleDragEnd(e, index) }}
      >
        <Popup>
          <span>(postion[0], position[1])</span>
        </Popup>
      </Marker>
    );
  };

  // const handleSelect = (e, index) => {
  //   const locations = [...locationIds];
  //   locations[index] = e.target.value;
  //   console.log(e.target.value);
  //   setLocationsId(locations);
  // };

  const handleSubmit = async () => {
    setLoading(true)
    /*
    const data = [locationIds?._id];
    
    const res = await postData(`event/crawled/edit/${id}`, { locations: data });

    if (res.data) {
      enqueueSnackbar(res.data.message ?? "", {
        variant: "success",
      });
      fetchAllEvents();
      fetchEventData(id);
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
    */
    handleStep(INC);
    setLoading(false);
  };

  return (
    <>
      <div className="mb-3">
      
      {/* <form>
        <select
          className="secondary-select w-full common-input"
              name="type"
              onChange={handleSelect}
              value={selectedLocation ? selectedLocation._id : ''}
              required
            >
              <option className="line-clamp-1" value=''>Select Location</option>
        {locations?.map((locObj, index) => {
          return (
            <option className="line-clamp-1" value={locObj._id}>{address[index]}</option>
          );
        })}
          </select>
      </form> */}

        {/* <FullButton inputClass={"!text-[#45818E] bg-[#56b6cb61]"} onClick={() => setSecondaryModal(true)}>
          <Add className="!text-[#45818E] mr-3" />
          Add Location
        </FullButton> */}
      </div>
      <span>{eventData.address}</span>
      <LoadScriptNext  googleMapsApiKey={googleMapsApiKey}>
        <SimpleMap mapContainerStyle={{ width: '100%', height: '400px' }} googleMapsApiKey={googleMapsApiKey} lat={eventData.coordinates.lat} lng={eventData.coordinates.lng} />
        {/* <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={{ lat: eventData.coordinates.lat, lng: eventData.coordinates.lng }}
          zoom={10}
        />
        <Marker // Add this Marker component
            position={{ lat: eventData.coordinates.lat, lng: eventData.coordinates.lng }}
        /> */}
      </LoadScriptNext>
      <div className="flex justify-end items-center mt-3 pb-3 gap-2">
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
      <AddLocationModal
        open={secondaryModal}
        getLocations={getLocations}
        handleClose={() => {
          setSecondaryModal(false);
        }}
      />
    </>
  );
};

export default Step3;
