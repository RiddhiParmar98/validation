import React, { useContext } from "react";
import ReactCrop from "react-image-crop";
import UserContext from "../context/UserContext";
import Image from "./Image";

const ImageCropper = ({ makeCroppedImage, fileData, index }) => {
  const { crop, setCrop, setSelectFile, isEdit } = useContext(UserContext);
  const handleCropped = (e, index) => {
    const cloneData = [...crop];
    cloneData[index] = e;
    setCrop(cloneData);
  };
  return (
    <React.Fragment>
      <ReactCrop
        src={isEdit ? fileData?.croppedUrl ?? fileData?.url : fileData?.url}
        crop={crop[index]}
        onImageLoaded={setSelectFile}
        onChange={(e) => {
          handleCropped(e, index);
        }}
        onComplete={(e) => makeCroppedImage(e, index)}
      >
        <Image
          src={isEdit ? fileData?.croppedUrl ?? fileData?.url : fileData?.url}
          alt="no preview available"
          id={index}
          style={{ height: "200px", width: "200px" }}
        />
      </ReactCrop>
    </React.Fragment>
  );
};

export default ImageCropper;
