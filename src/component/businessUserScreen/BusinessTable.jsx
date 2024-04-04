import React, { useState } from "react";
import Image from "../image";
import swal from "@sweetalert/with-react";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteData } from "../../utils/api";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import ContentLoader from "../../common/Loader/contentLoader";
import DataTable, { createTheme } from 'react-data-table-component';
import Pagination from '@mui/material/Pagination';
import { ReactComponent as Deleteicon } from '../../assets/icons/delete.svg'
import { ReactComponent as Editicon } from '../../assets/icons/Edit.svg'
import { ReactComponent as Eyeicon } from '../../assets/icons/eye.svg'

const BusinessTable = ({ data, fetchAllBusinessDetails, loading }) => {

  const handleDeleteUser = async (id) => {
    swal({
      // title: "Are you sure?",
      title: "Are you sure that you want to delete this user?",
      icon: "warning",
      buttons: [true, "Delete"],

      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteData(`business-profile/staff/delete/${id}`);
        if (res.data) {
          enqueueSnackbar(res.data.message ?? "", {
            variant: "success",
          });
          fetchAllBusinessDetails();
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
      }
    });
  };

  if (loading) {
    return <ContentLoader />;
  }

  const columns = [
    {
      name: 'No',
      selector: (row, index) => <span className="w-full text-center flex items-center justify-center gap-2">{index + 1}</span>,
      width: '60px',
      center: true,
    },
    {
      name: 'Title',
      sortable: true,
      selector: row => <>
        <span className="flex items-center gap-2">
          <Image
            src={
              "https:www.photoshopessentials.com/newsite/wp-content/uploads/2018/08/resize-images-print-photoshop-f.jpg"
            }
            className={"w-10 h-10 rounded-sm"}
            alt={"test_image"}
          />
          <span className="font-semibold">{row.name}</span>
        </span>
      </>
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => <span className={` .card-status ${row.status} admin bg-[#EDF1F3] text-[#1A1C1E] text-xs font-normal leading-4 flex items-center justify-center capitalize py-1.5 px-2 rounded-md`}>Admin</span>,
      width: '120px',
      center: true,
    },
    {
      name: 'Action',
      sortable: true,
      selector: row => <>
        <div className="flex items-center gap-1">
          {/* <Editicon color="text-white"
            // onClick={() => setEventId(row._id)}
            className="cursor-pointer p-1.5 rounded-xl w-[30px] h-[30px] text-white bg-[#74746E]"
          /> */}
          <Deleteicon
            onClick={() => handleDeleteUser(row._id)}
            className="cursor-pointer p-1.5 rounded-xl w-[30px] h-[30px] text-white bg-red-500"
          />
        </div>
      </>,
      width: '120px',
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

  console.table(data)

  return (
    <>
      <div class="flex flex-col md:mx-10 mx-5">
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

export default BusinessTable;
