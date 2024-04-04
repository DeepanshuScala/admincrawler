import React, { useEffect, useState } from "react";
import PrimaryModal from "../../../common/Modal/PrimaryModal";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import FullButton from "../../../common/FormElements/Button/FullButton";
import { Add } from "@mui/icons-material";
import { postData } from "../../../utils/api";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../../utils/formatErrorMessage";

const AddLocationModal = ({ open, handleClose, getLocations }) => {
  const [coordinates, setCoordinates] = useState([28.7041, 77.1025]);
  const [address, setAddress] = useState();
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

  const reverseGeoCoding = async (lat, lng) => {
    try {
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query: `${lat}, ${lng}` });
      const fullAddress =
        results.length > 0 ? results[0].label : "Unknown Address";
      setAddress(fullAddress);
      // console.log("Full Address:", fullAddress);
      return fullAddress;
    } catch (err) {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    // to be called only when model is openned
    if (open) {
      reverseGeoCoding(coordinates[0], coordinates[1]);
    }
  }, [open]);

  const handleDragEnd = async (e, index) => {
    const { lat, lng } = e.target.getLatLng();
    setCoordinates([lat, lng]);
    const newAddress = await reverseGeoCoding(lat, lng);
    // const allAddress = [...address];
    // allAddress[index] = newAddress;
    // setAddress(allAddress);
  };

  const handleCloseModal = () => {
    setCoordinates([28.7041, 77.1025]);
    setAddress("");
    handleClose();
  };

  const handleSubmit = async () => {
    const res = await postData("business-profile/update", {
      location: [{ latitude: coordinates[0], longitude: coordinates[1] }],
    });
    if (res.data) {
      enqueueSnackbar(res.data.message ?? "", {
        variant: "success",
      });
      getLocations()
      handleCloseModal();
    //   fetchUserDetails();
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
    <PrimaryModal
      open={open}
      handleClose={handleCloseModal}
      // modalClass="w-[380px] sm:w-[500px] md:w-1/2 lg:w-2/5 xl:w-1/3"
      modalClass="w-[300px] md:w-[400px] h-[500px]"
    >
      <h1 className="text-center font-semibold text-lg mb-2">
        Select Location
      </h1>
      <div>
        <MapContainer
          style={{
            height: "300px ",
            width: "100%",
            margin: "auto",
          }}
          center={coordinates}
          zoom={15}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <MapComponent position={coordinates} />
        </MapContainer>
        <p className="text-sm font-semibold mt-2 text-center text-[#666]">
          {" "}
          {address}
        </p>
        <FullButton
          inputClass={"!text-[#45818E] bg-[#56b6cb61]"}
          onClick={handleSubmit}
        >
          <Add className="!text-[#45818E] mr-3" />
          Save Location
        </FullButton>
      </div>
    </PrimaryModal>
  );
};

export default AddLocationModal;
