import React, { useEffect, useState } from "react";
import Image from "../image";
import DataTable, { createTheme } from 'react-data-table-component';
import Pagination from '@mui/material/Pagination';
import { ReactComponent as Deleteicon } from '../../assets/icons/delete.svg'
import { ReactComponent as Editicon } from '../../assets/icons/Edit.svg'
import { ReactComponent as Eyeicon } from '../../assets/icons/eye.svg'
import { Link } from "react-router-dom";
import PrimaryButton from "../../common/FormElements/Button/PrimaryButton";
import EventDetailsModal from "./EventDetailsModal";

export default function ListView({loading, fetchAllEvents,setEventId, data, deleteEvent }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false);

  const handleCloseEventDetailsModal = () => {
    setIsEventDetailsModalOpen(false);
  };


  const columns = [
    {
      name: 'Title',
      sortable: true,
      selector: row => <>
        <span className="flex items-center gap-2">
          <span className="font-semibold">{row.title}{ !row.coordinates && <span style={{ color: 'red', marginLeft: '10px' }}>!</span> }</span>
        </span>
      </>,
      minWidth: '150px',
      maxWidth: '360px',
    },
    {
      name: 'Action',
      sortable: true,
      selector: row => <>
        <div className="flex items-center gap-1">
          {row.path && <Link className="inline-block px-2 py-2 bg-[#03B4BF] text-white font-bold text-center rounded-lg hover:bg-[#029aa9] focus:outline-none focus:ring-2 focus:ring-[#029aa9] focus:ring-opacity-50" to={row.path} target="_blank">View</Link>}
          <Link to={`/dashboard/content/${row._id}`}>
            <Eyeicon
              className="cursor-pointer p-1.5 rounded-xl w-[30px] h-[30px] text-white bg-[#009CA6]"
            />
          </Link>
          <Editicon color="text-white"
            onClick={() => setEventId(row)}
            className="cursor-pointer p-1.5 rounded-xl w-[30px] h-[30px] text-white bg-[#74746E]"
          />
          <Deleteicon
            onClick={() => deleteEvent(row._id)}
            className="cursor-pointer p-1.5 rounded-xl w-[30px] h-[30px] text-white bg-red-500"
          />
        </div>
      </>,
      width: '200px',
    },
    {
      name: 'Dates',
      sortable: true,
      selector: row => <span className="flex items-center justify-center gap-2">
        <span className="text-sm font-normal text-[#61615A]">{row.dates}</span>
      </span>,
       minWidth: '150px',
       maxWidth: '560px',
    },
    {
      name: 'Type',
      sortable: true,
      selector: row => <span className={`bg-[#EDF1F3] text-[#1A1C1E] text-xs font-normal leading-4 flex items-center justify-center capitalize py-1.5 px-2 rounded-md`}>{row.type}</span>,
      center: true,
      maxWidth: '60px',
    },
    {
      name: 'Participation Cost',
      sortable: true,
      selector: row => <span className="text-sm font-normal text-[#61615A]">{row.participationCost}</span>,
      center: true,
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
        wordWrap: 'break-word', // This will break the word to the next line
        whiteSpace: 'normal', // This allows the text to wrap
        maxWidth: '150px',
      },
    },
  };

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
    if (error) setError(''); // Clear error when a row is selected
  };
  const handlepublish = () => {
    if (selectedRows.length === 0) {
      // Using browser's alert function for simplicity
      alert('Please select at least one row.');
    } else {
      // Proceed with your submit logic here, using the selectedRows
      setEvents(selectedRows);
      setIsEventDetailsModalOpen(true);
      console.log('Selected Rows:', selectedRows);
    }
  }

  const isRowSelectable = (row) => {
    return !row.coordinates;
  };  

  return (
    <div class="md:mx-10 mx-5">
      <PrimaryButton
            inputClass="max-w-[150px] bg-[#03B4BF] text-white font-bold" onClick={handlepublish} >
            <span>Publish Event</span>
      </PrimaryButton>
      <DataTable theme="solarized" columns={columns} data={data} customStyles={customStyles} onSelectedRowsChange={handleRowSelected} selectableRowDisabled={isRowSelectable} selectableRows />
      <EventDetailsModal
        fetchAllEvents={fetchAllEvents}
        open={isEventDetailsModalOpen}
        handleClose={handleCloseEventDetailsModal}
        events={events}
      />
    </div>
  )
}