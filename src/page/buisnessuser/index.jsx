import React, { useEffect, useState } from "react";
import BusinessHeader from "../../component/businessUserScreen/BusinessHeader";
import BusinessTable from "../../component/businessUserScreen/BusinessTable";
import AddBusiness from "../../component/businessUserScreen/AddBusiness";
import { getData, getDataTemp } from "../../utils/api";

const Buisnessuser = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState()

  const fetchAllBusinessDetails = async () => {
    setLoading(true);
    const res = await getData("business-profile/staff/members");
    if (res.data) {
      setData(res.data?.staffMembers);
    } else {
      console.log(res.error, "Error while fetching business details");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllBusinessDetails()
  }, [])



  return (
    <div>
      <BusinessHeader handleOpen={handleOpen} />
      <BusinessTable handleOpen={handleOpen} data={data} fetchAllBusinessDetails={fetchAllBusinessDetails} loading={loading} />
      <AddBusiness open={open} handleClose={handleClose} fetchAllBusinessDetails={fetchAllBusinessDetails}/>
    </div>
  );
};

export default Buisnessuser;
