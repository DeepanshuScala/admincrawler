import { Modal } from "@mui/material";
import classNames from "classnames";
import React from "react";

const PrimaryModal = ({ open, handleClose, children, modalClass }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className={classNames([
          "md:w-1/2 w-full h-[90vh] pl-5 outline-none bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-none rounded-lg",
          modalClass,
        ])}
      >
        <div className="py-2 pr-5 overflow-auto h-full image-vertical-scroll">{children}</div>
      </div>
    </Modal>
  );
};

export default PrimaryModal;
