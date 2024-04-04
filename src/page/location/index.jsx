import React, { useCallback, useEffect, useState } from "react";
import Text from "../../common/Text";
import {
  Add,
  CalendarMonth,
  FilterAlt,
  MenuOutlined,
} from "@mui/icons-material";
import LocationGrid from "../../component/location/locationgrid";
import CreateContent from "../../component/contentScreen/CreateContent";
import ContentHeader from "../../component/contentScreen/ContentHeader";
import ListView from "../../component/contentScreen/ListView";
import { deleteData, getData, getDataTemp } from "../../utils/api";
import swal from "@sweetalert/with-react";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import ContentLoader from "../../common/Loader/contentLoader";
import { useSearchParams } from "react-router-dom";
import LocationHeader from "../../component/location/locationHeader";

const Content = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

  const fetchLocation = async () => {
    // setLoading(true);
    const res = await getData("business-profile/locations");
    if (res.data) {
        setData(res.data); 
    } else {

    }
    // setLoading(false);
    
  };
  useEffect(() => {
    fetchLocation();
  },[])
  
  return (
    <>
    <LocationHeader/>
    <LocationGrid data={data}/>
    </>
  );
};

export default Content;
