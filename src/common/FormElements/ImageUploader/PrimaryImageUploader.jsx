import React from "react";
// for futur purpose not using right now
const PrimaryImageUploader = ({ setImage, setImageBlob, children }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImageBlob(file);
        // formik.setFieldValue("businessImage", reader.result);
        // formik.setFieldValue("imageBlob", file);
      };
      reader.readAsDataURL(file);
    }
  };

  return <>{children}</>;
};

export default PrimaryImageUploader;
