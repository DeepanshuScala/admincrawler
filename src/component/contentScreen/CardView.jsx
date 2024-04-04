import React, { useState } from "react";
import { socialMediaPost } from "../../contentmanagement/sidepanal";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { ReactComponent as Deleteicon } from '../../assets/icons/delete.svg'
import { ReactComponent as Editicon } from '../../assets/icons/Edit.svg'
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Image from "../image";
import Text from "../../common/Text";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import ContentLoader from "../../common/Loader/contentLoader";

const CardView = ({ data, setEventId, deleteEvent ,loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleChangeItemsPerPage = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1); // Reset to first page after changing items per page
  };

  const pageCount = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="md:mx-12 mx-5">
      {
      loading ? <ContentLoader /> :
      data ? (
        <>
          <div class="md:grid lg:grid-cols-4 md:grid-cols-3 gap-4 flex flex-nowrap contant-res-design">
            {data?.map((items) => {
              return (
                <div className="relative flex flex-col items-center justify-center overflow-hidden border border-grey rounded-xl contant-res-design-child">

                  <div className="absolute flex justify-end w-full px-3 top-2 z-10">
                    <div className="flex gap-2">
                      {/* <Link to={`/dashboard/content/${items._id}`}>
                      <RemoveRedEyeIcon
                        // onClick={() => setEventId(items._id)}
                        className="p-1 rounded-full cursor-pointer !text-white bg-black"
                      />
                    </Link> */}
                      <Editicon
                        onClick={() => setEventId(items._id)}
                        className="cursor-pointer p-1.5 rounded-full w-[30px] h-[30px] !text-grey bg-white"
                      />
                      <Deleteicon
                        onClick={() => deleteEvent(items._id)}
                        className="cursor-pointer p-1.5 rounded-full w-[30px] h-[30px] !text-white bg-red-500"
                      />
                    </div>
                  </div>
                  <div className="flex h-full items-center justify-center w-full bg-cover relative">
                    <Image
                      src={
                        items.images[0]?.url ?? "https://via.placeholder.com/150"
                      }
                      className={"h-[165px] md:h-[165px] lg:h-[165px] xl:h-[165px]  w-full"}
                      alt={"evnt_img"}
                    />
                    <div className={`card-status ${items.status} text-sm font-normal leading-4 flex items-center justify-center capitalize`}>
                      {items.status}
                    </div>
                    {/* max-w-full w-[50%] object-contain */}
                  </div>
                  <div className="w-full p-4 bg-white">
                    <Text className="font-medium text-lg text-black leading-5">
                      {items.description}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 w-full flex justify-between items-center md:flex-row flex-col gap-3">
            <Pagination count={pageCount} page={currentPage} onChange={handleChangePage} shape="rounded" className="pagination-cust" />
            <div className="flex items-center gap-4 ">
              <span className="ml-4 text-xs font-normal text-[#61615A]">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, data.length)} of {data.length} entries
              </span>
              <div className="form-select-div">
                <select class="form-select" labelId="items-per-page-select-label"
                  id="items-per-page-select" value={itemsPerPage}
                  onChange={handleChangeItemsPerPage}>
                  {[5, 10, 15, 20].map((size) => (
                    <option key={size} value={size}>
                      Show {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-10 text-center text-[#666] font-semibold text-lg">
            <p>No Events created yet!</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CardView;
