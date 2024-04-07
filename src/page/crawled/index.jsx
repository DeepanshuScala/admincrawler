import React, { useCallback, useEffect, useState } from "react";
import Text from "../../common/Text";
import Pagination from '@mui/material/Pagination';
import {
  Add,
  CalendarMonth,
  FilterAlt,
  MenuOutlined,
} from "@mui/icons-material";
import CardView from "../../component/contentScreen/CardView";
import CreateContent from "../../component/contentScreen/CreateContent";
import ContentHeader from "../../component/contentScreen/ContentHeader";
import ListView from "../../component/contentScreen/ListView";
import { deleteData, getData, getDataTemp } from "../../utils/api";
import swal from "@sweetalert/with-react";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import ContentLoader from "../../common/Loader/contentLoader";
import { useSearchParams } from "react-router-dom";

const Crawled = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [cardView, SetCardView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [data, setData] = useState();
  const [eventId, setEventId] = useState("");

  const fetchAllEvents = async (query) => {
    setLoading(true);
    try {
      const res = await getData(`event/crawled?page=${currentPage}&limit=${itemsPerPage}`);
      if (res.data) {
        const datares = res.data?.events;
        console.log(datares)
        if (!query || query === '') {
          setData(datares);
        } else {
          const filteredData = datares.filter((item) => item.title.toLowerCase() === query.toLowerCase());
          setData(filteredData);
        }
      } else {
        console.log(res, "Error while fetching business profiles");
      }
    } catch (error) {
      console.error("Error while fetching events:", error);
    } finally {
      setLoading(false);
    }

  };

  const deleteEvent = async (id) => {
    swal({
      title: "Are you sure that you want to delete this Event?",
      // text: "Are you sure that you want to delete this Image?",
      icon: "warning",
      buttons: [true, "Delete"],

      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteData(`event/crawled/${id}`);
        if (res.data) {
          enqueueSnackbar(res.data.message ?? "", {
            variant: "success",
          });
          fetchAllEvents();
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

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleChangeItemsPerPage = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1); // Reset to first page after changing items per page
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [viewSearchQuery, setviewSearchQuery] = useState();

  const toggleCardView = (e, viewType) => {
    e.preventDefault();
    const searchQ = searchParams.get("q");
    if (!searchQ) {
      setSearchParams({ view: viewType });
    }
    else {
      setSearchParams({ view: viewType, q: searchQ });
    }
  };

  const searchCardView = (e, query) => {
    e.preventDefault();
    const searchP = searchParams.get("view")
    if (!searchP) {
      setSearchParams({ q: query });
    }
    else {
      setSearchParams({ view: searchP, q: query });
    }

  };

  useEffect(() => {
    fetchAllEvents();
  },[currentPage, itemsPerPage]);

  useEffect(() => {
    const searchP = searchParams.get("view") || "";
    setviewSearchQuery(searchP)
    if (searchP === '') {
      SetCardView(true);
    }
    else if (searchP === 'grid') {
      SetCardView(true);
    }
    else {
      SetCardView(false);
    }
  }, [searchParams])

  useEffect(() => {
    const searchQ = searchParams.get("q");
    console.log(searchQ && (searchQ.length > 2))
    if (searchQ && (searchQ.length > 2)) {
      setLoading(true); // Set loading state to true
      fetchAllEvents(searchQ)
        .finally(() => setLoading(false));
    }
    if(searchQ === ''){
      setLoading(true); // Set loading state to true
      fetchAllEvents().finally(() => setLoading(false));
    }
  }, [searchParams]);

  // const toggleCardView = useCallback(() => {
  //   SetCardView((cardView) => !cardView);
  // }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <ContentHeader/>
      {!loading ? (
        <>
            <ListView
              loading={loading}
              data={data}
              fetchAllEvents={fetchAllEvents}
              setEventId={setEventId}
              deleteEvent={deleteEvent}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Pagination
                count={5} // Assuming 'data.total' holds the total count of items
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
                sx={{
                  '.MuiPaginationItem-page': {
                    'backgroundColor':'#009CA6', // Change to your desired color
                    '&:hover': {
                      backgroundColor: 'black', // Hover effect for regular items
                      'color': 'white',
                    },
                  },
                  '.Mui-selected': {
                    'color': 'white', // Active pagination number color
                    'backgroundColor':'black !important',
                    '&:hover': {
                      'backgroundColor': '#009CA6', // Hover effect for regular items
                    },
                  },
                }}
              />
            </div>
        </>
      ) : (
        <ContentLoader />
      )}

      <CreateContent
        open={open}
        handleClose={handleClose}
        fetchAllEvents={fetchAllEvents}
        eventId={eventId}
        setEventId={setEventId}
      />
    </>
  );
};

export default Crawled;
