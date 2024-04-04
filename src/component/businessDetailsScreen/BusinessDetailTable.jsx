import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Image from "../image";
import { useNavigate } from "react-router-dom";
import { businessStatus } from "../../utils/constants/statuses";
import PrimaryButton from "../../common/FormElements/Button/PrimaryButton";
import { getDataTemp } from "../../utils/api";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import { useAuthentication } from "../../context/authContext";
import { PINNTAG_BUSINESS_PROFILE } from "../../config/routes/RoleProtectedRoute";
import ContentLoader from "../../common/Loader/contentLoader";
import DataTable, { createTheme } from 'react-data-table-component';


const BusinessDetailTable = ({ data, loader }) => {
  const { businessUser, setBusinessUser } = useAuthentication();
  const [loading, setLoading] = useState(false);
  const [businessId, setBusinessId] = useState(false);

  if (loader) {
    return <ContentLoader />;
  }

  // const navigate = useNavigate();

  const selectBusinessHandler = async (id) => {
    setBusinessId(id)
    setLoading(true);
    const res = await getDataTemp(`business-profile/switch/${id}`);
    if (res.data) {
      console.log(res);
      setBusinessUser(res.data);
      localStorage.setItem(PINNTAG_BUSINESS_PROFILE, JSON.stringify(res.data));
      window.location.href = "/dashboard/content";
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
    setLoading(false);
  };


  const columns = [
    {
      name: 'No',
      selector: (row, index) => <span className="w-full text-center flex items-center justify-center gap-2">{index + 1}</span>,
      width: '60px',
      center: true,
    },
    {
      name: 'Name',
      sortable: true,
      selector: row => <>
        <span className="flex items-center gap-2">
          <Image
            src={
              row?.profilePhoto ??
              "https://www.photoshopessentials.com/newsite/wp-content/uploads/2018/08/resize-images-print-photoshop-f.jpg"
            }
            className={"w-10 h-10 rounded-sm"}
            alt={"test_image"}
          />
          <span className="font-semibold">{row.name}</span>
        </span>
      </>
    },
    {
      name: 'Creator',
      sortable: true,
      selector: row => <span className="flex items-center justify-center gap-2">
        <Image
          src={"/assets/images/ProfileIcon.svg"}
          alt="profile icon"
          className="h-[24px] w-[24px] sm:h-[24px] sm:w-[24px]"
        />
        <span className="text-sm font-normal text-[#61615A]">Benjamin</span>
      </span>,
      width: '150px',
    },
    {
      name: 'Type',
      sortable: true,
      selector: row => <span className={`bg-[#EDF1F3] text-[#1A1C1E] text-xs font-normal leading-4 flex items-center justify-center capitalize py-1.5 px-2 rounded-md`}>{row.profileType}</span>,
      width: '120px',
      center: true,
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => <span className={` ${row.status} active bg-[#EDF1F3] text-[#1A1C1E] text-xs font-normal leading-4 flex items-center justify-center capitalize py-1.5 px-2 rounded-md`}>{businessStatus[row.status]}</span>,
      width: '120px',
      center: true,
    },
    {
      name: 'Location',
      sortable: true,
      selector: row => <span className={` text-[#1A1C1E] text-xs font-normal leading-4 flex items-center justify-center capitalize py-1.5 px-2 rounded-md`}>{row.locations?.length}</span>,
      width: '120px',
      center: true,
    },
    {
      name: 'Action',
      sortable: true,
      selector: row => <>
        <PrimaryButton  inputClass="max-w-[150px] scale-75"
          loading={loading && businessId === row._id}
          onClick={(event) =>
            selectBusinessHandler(row._id)
          }
        >
          Select Business
        </PrimaryButton>
        {/* <div className="flex items-center gap-1">
        <Eyeicon
          className="cursor-pointer p-1.5 rounded-xl w-[30px] h-[30px] text-white bg-[#009CA6]"
        />
        <Editicon color="text-white"
          onClick={() => setEventId(row._id)}
          className="cursor-pointer p-1.5 rounded-xl w-[30px] h-[30px] text-white bg-[#74746E]"
        />
        <Deleteicon
          onClick={() => deleteEvent(row._id)}
          className="cursor-pointer p-1.5 rounded-xl w-[30px] h-[30px] text-white bg-red-500"
        />
      </div> */}
      </>,
      width: '150px',
    },
  ];


  createTheme('solarized', {
    text: {
      primary: '#000000',
      secondary: '#ffffff',
    },
    background: {
      default: 'rgba(0,0,0,0)',
      text: '#FFFFFF',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#fff',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,1)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'light');

  const customStyles = {
    rows: {
      style: {
        fontSize: '14px',
        borderColor: '#ffffff',
      },
    },
    headCells: {
      style: {
        fontSize: '14px',
        color: '#ACB5BB',
        borderColor: '#ffffff',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        padding: '10px 10px',
      },
    },
  };

  return (
    <>
      {/* {!loading && <SecondarLoader />} */}
      <div class="flex flex-col mx-12">
        {data?.length > 0 ? (
          <>
            <DataTable theme="solarized" columns={columns} data={data} customStyles={customStyles} selectableRows />

           
          </>
        ) : (
          <>
            <div className="mt-10 text-center text-[#666] font-semibold text-lg">
              <p>No business user created yet!</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BusinessDetailTable;

// <tr class="border-2 border-[#000000]">
//                     <td class="whitespace-nowrap flex justify-center  px-2 py-2">
//                       <Image
//                         src={
//                           "https://www.photoshopessentials.com/newsite/wp-content/uploads/2018/08/resize-images-print-photoshop-f.jpg"
//                         }
//                         className={"w-7 h-7 rounded-3xl"}
//                         alt={"test_image"}
//                       />
//                     </td>
//                     <td class="whitespace-nowrap font-semibold px-6 py-2 underline">
//                       Robin Seth
//                     </td>
//                     <td class="whitespace-nowrap font-semibold px-6 py-2">
//                       Yearly
//                     </td>
//                     <td class="whitespace-nowrap font-semibold px-6 py-2">
//                       $360.00
//                     </td>
//                     <td class="whitespace-nowrap font-semibold px-6 py-2">
//                       Business
//                     </td>
//                     <td class="whitespace-nowrap font-semibold px-6 py-2">
//                       Active
//                     </td>
//                     <td class="whitespace-nowrap font-semibold px-6 py-2">3</td>
//                     <td class="whitespace-nowrap  px-6 py-2">
//                       <EditIcon
//                         onClick={() =>
//                           navigate("/dashboard/edit-business-details/00")
//                         }
//                         className="cursor-pointer text-white rounded-2xl bg-black "
//                       />
//                     </td>
//                   </tr>
