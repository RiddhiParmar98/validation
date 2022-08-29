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
        className="w-[50%] h-60 xs:w-full md:w-[80%] "
        src={isEdit ? fileData?.croppedUrl ?? fileData?.url : fileData?.url}
        crop={crop[index]}
        onImageLoaded={setSelectFile}
        onChange={(e) => {
          handleCropped(e, index);
        }}
        onComplete={(e) => makeCroppedImage(e, index)}
      >
        <Image
          className="w-[50%] h-60 xs:w-full"
          src={isEdit ? fileData?.croppedUrl ?? fileData?.url : fileData?.url}
          alt="no preview available"
          id={index}
         
        />
      </ReactCrop>
    </React.Fragment>
  );
};

export default ImageCropper;
