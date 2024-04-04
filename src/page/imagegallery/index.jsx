import React, { useEffect, useState } from "react";
import swal from "@sweetalert/with-react";
import ImageGalleryHeader from "../../component/ImageGalleryScreen/ImageGalleryHeader";
import ImageGalleryGrid from "../../component/ImageGalleryScreen/ImageGalleryGrid";
import { deleteData, getData } from "../../utils/api";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../utils/formatErrorMessage";

const Imagegallery = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchImage = async () => {
    // setLoading(true);
    const res = await getData("business-profile/gallery/data");

    if (res.data) {
      setData(res?.data?.gallery?.images);
    } else {
    }
    setLoading(false);
  };

  const deleteImage = async (id) => {
    swal({
      title: "Are you sure that you want to delete this Image?",
      // text: "Are you sure that you want to delete this Image?",
      icon: "warning",
      buttons: [true, "Delete"],

      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteData(`business-profile/gallery/delete/${id}`);
        if (res.data) {
          enqueueSnackbar(res.data.message ?? "", {
            variant: "success",
          });
          fetchImage();
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

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div>
      <ImageGalleryHeader fetchImage={fetchImage} />
      <ImageGalleryGrid deleteImage={deleteImage} loading={loading} data={data} />
    </div>
  );
};

export default Imagegallery;
