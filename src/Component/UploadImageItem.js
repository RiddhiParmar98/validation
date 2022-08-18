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
  HandleImageDelete,
  handleImageUpload,
  isUpload,
}) => {
  const { selectFile } = useContext(UserContext);
  return (
    <div className="card my-2 col-10">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="col-3">
            {selectFile && (
              <ImageCropper {...{ index, fileData, makeCroppedImage }} />
            )}
          </div>
          <div className="col-3">
            {imageResult && (
              <div className="mb-3">
                <Image
                  src={imageResult}
                  id="croppedImage"
                  alt="new cropped image"
                  style={{ height: "200px", width: "200px" }}
                />
              </div>
            )}
          </div>
          {/* <div className="col-2">{fileData.name}</div> */}
          <div className="col-3">
            <Button
              type="button"
              className="btn btn-outline-success btn-lg mx-1"
              handleOnClick={(e) => handleImageUpload(e, index)}
              name="Upload"
              disabled={fileData?.isCroppedUrlChange ? "disabled" : ""}
            />
            <Button
              type="button"
              className="btn btn-outline-danger btn-lg"
              name="Delete"
              handleOnClick={(e) => HandleImageDelete(e, index)}
            />
          </div>
        </div>
        <span className="badge text-bg-success">
          {fileData?.isCroppedUrlChange ? "UPLOADED" : "REQUESTED"}
        </span>
      </div>
    </div>
  );
};

export default UploadImageItem;
