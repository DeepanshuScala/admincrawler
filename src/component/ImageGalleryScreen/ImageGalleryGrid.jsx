import React, { useState } from "react";
import Image from "../image";
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ReactComponent as Deleteicon } from '../../assets/icons/delete.svg'

import ContentLoader from "../../common/Loader/contentLoader";

const ImageGalleryGrid = ({ deleteImage, data, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  if (loading) {
    return <ContentLoader />;
  }

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
    <div className="md:mx-10 mx-5 overflow-auto">
      {data && data.length > 0 ? (
        <>
          <div className="flex flex-col items-center">
            <div className="md:grid lg:grid-cols-4 md:grid-cols-3 gap-4 flex flex-nowrap w-full contant-res-design">
              {currentItems.map(({ url, _id }, index) => (
                <div className="relative contant-res-design-child rounded-md overflow-hidden" key={index}>
                  <Deleteicon
                    className="cursor-pointer p-1.5 rounded-full w-[30px] h-[30px] !text-white bg-red-500 absolute right-[10px] top-[10px]"
                    onClick={() => deleteImage(_id)}
                  />
                  <Image
                    src={url}
                    className="border-2 rounded-2xl h-[165px] lg:h-[165px] border-white w-full"
                    alt={"test_image"}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 w-full flex justify-between items-center md:flex-row flex-col gap-3">
              <Pagination count={pageCount} page={currentPage} onChange={handleChangePage} shape="rounded" className="pagination-cust" />
              <div className="flex items-center gap-4 ">
                <span className="ml-4 text-xs font-normal text-[#61615A]">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, data.length)} of {data.length} entries
                </span>
                {/* <FormControl variant="outlined" size="small" className="form-select">
                  <Select
                    labelId="items-per-page-select-label"
                    id="items-per-page-select"
                    value={itemsPerPage}
                    onChange={handleChangeItemsPerPage}
                  >
                    {[5, 10, 15, 20].map((size) => (
                      <MenuItem key={size} value={size}>
                        Show {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
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
          </div>
        </>
      ) : (
        <div className="mt-10 text-center text-[#666] font-semibold text-lg">
          <p>No images uploaded yet!</p>
        </div>
      )}
    </div>
  );
};

export default ImageGalleryGrid;
