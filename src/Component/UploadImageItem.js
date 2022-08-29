import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import Button from "./Button";
import Image from "./Image";
import ImageCropper from "./ImageCropper";

const UploadImageItem = ({
  makeCroppedImage,
  imageResult,
  fileData,
  index,
  handleImageDelete,
  handleImageUpload,
}) => {
  const { selectFile } = useContext(UserContext);
  return (
    <div className="font-sans max-w-7xl w-full mx-auto mt-10 mb-1 bg-white p-4 border rounded-lg border-gray-400 ">
      <div className="flex flex-row xs:flex-col justify-center md:flex-row ">
        <div className="basis-1/3 mx-5">
          {selectFile && (
            <ImageCropper {...{ index, fileData, makeCroppedImage }} />
          )}
        </div>
        <div className="basis-1/3 mx-5">
          {imageResult && (
            <Image
              className="h-60 xs:w-full md:w-[80%]"
              src={imageResult}
              id="croppedImage"
              alt="new cropped image"
              // style={{ height: "200px", width: "200px" }}
            />
          )}
        </div>
        <div className="basis-1/4  xs:pt-1 self-center md:pt-15">
          <div className="flex flex-row justify-start">
            <Button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-md text-md px-4 py-2.5 text-center mr-1 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              handleOnClick={(e) => handleImageUpload(e, index)}
              name="Upload"
              disabled={fileData?.isCroppedUrlChange ? "disabled" : ""}
            />
            <Button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-md px-4 py-2.5 text-center mr-1 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              name="Delete"
              handleOnClick={(e) => handleImageDelete(e, index)}
            />
          </div>

          <span className={`${fileData?.isCroppedUrlChange ? "bg-green-200" : "bg-red-200"} text-gray-900 font-bold text-xs mt-3 inline-flex items-center px-12 py-1.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300`}>
            {fileData?.isCroppedUrlChange ? "UPLOADED" : "REQUESTED"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UploadImageItem;
