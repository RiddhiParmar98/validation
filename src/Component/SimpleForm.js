import React, { useEffect, useState, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";
import Radio from "./Radio";
import Checkbox from "./Checkbox";
import Select from "./Select";
import File from "./File";
import "react-image-crop/dist/ReactCrop.css";
import UploadImageItem from "./UploadImageItem";
import TextEditor from './TextEditor';

const SimpleForm = () => {
  const {
    userData,
    setUserData,
    isEdit,
    updateData,
    setSelectFile,
    crop,
    setUpdateData,
    uploadIndex,
    setUploadIndex,
  } = useContext(UserContext);
  let navigate = useNavigate();
  const location = useLocation();

  const [imageResult, setImageResult] = useState([]);
  const [mainImageData, setMainImageData] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
 
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    if (isEdit) {
      setMainImageData([...updateData?.uploadFile]);
    }
    
    // eslint-disable-next-line
  }, []);
  // const FILE_SIZE = 1024 * 1024;
  // const SUPPORTED_FORMATS = [
  //   "image/jpg",
  //   "image/jpeg",
  //   "image/gif",
  //   "image/png",
  // ];

  const radiOptions = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
  ];

  const checkBoxOptions = [
    { key: "Javascript", value: "Javascript" },
    { key: "Python", value: "Python" },
    { key: "PHP", value: "PHP" },
    { key: "JAVA", value: "JAVA" },
  ];

  const areaOption = [
    { key: "Select an option", value: "" },
    { key: "Programming", value: "Programming" },
    { key: "Designing", value: "Designing" },
    { key: "Management", value: "Management" },
    { key: "FrontEnd", value: "FrontEnd" },
    { key: "BackEnd", value: "BackEnd" },
  ];

  const makeCroppedImage = async (e, index) => {
    const uploadImage = document.getElementById(index);
    const cloneUploadData = [...uploadFiles];
    if (uploadImage && crop[index]?.width && crop[index]?.height) {
      const cloneData = [...imageResult];
      const croppedImageURL = await getCroppedImage(
        uploadImage,
        crop[index],
        "abc.jpg"
      );
      debugger;
      cloneData[index] = croppedImageURL;
      cloneUploadData[index] = {
        ...cloneUploadData[index],
        croppedUrl: croppedImageURL,
        isCroppedUrlChange: false,
      };
      if (isEdit) {
        const tempUpdateData = [...updateData.uploadFile];
        tempUpdateData[index] = updateData.uploadFile[index];
        tempUpdateData[index].isCroppedUrlChange = false;
        setUpdateData({ ...updateData, tempUpdateData });
      }

      setImageResult(cloneData);
      setUploadFiles(cloneUploadData);
    }
  };

  const getCroppedImage = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const pixelsRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelsRatio * scaleX;
    canvas.height = crop.height * pixelsRatio * scaleY;
    ctx.setTransform(pixelsRatio, 0, 0, pixelsRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error("Canvas is empty");
            return;
          }
          blob.name = fileName;

          const fileUrl = window.URL.createObjectURL(blob);
          resolve(fileUrl);
        },
        "image/jpeg",
        1
      );
    });
  };

  let initialValues = isEdit
    ? { ...updateData }
    : {
        fullName: "",
        email: "",
        password: "",
        gender: "",
        description: "",
        toggle: false,
        language: [],
        intrestedArea: [],
        uploadFile: [],
        imageUrl: "",
      };

  const handleFileUpload = (e) => {
    const { files } = e.target;
    const cloneData = [...uploadFiles];

    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      const file = files[0];
      cloneData.push({ url, file, isCroppedUrlChange: false });
      setUploadFiles(cloneData);
      if (isEdit) {
        const newData = [...updateData?.uploadFile];
        newData.push({ croppedUrl: url, file, isCroppedUrlChange: false });
        setUpdateData({
          ...updateData,
          uploadFile: newData,
        });
      }
    }
  };

  const HandleImageDelete = (e, index) => {
    let msg = "Are you sure you want to Delete ?";
    if (!window.confirm(msg)) return false;
    else {
      if (isEdit) {
        const cloneData = { ...updateData };
        const { uploadFile } = cloneData;
        uploadFile?.splice(index, 1);
        mainImageData?.splice(index, 1);
        setUpdateData(cloneData);
        const newImageResult = [...imageResult];
        newImageResult.splice(index, 1);
        uploadIndex.splice(index, 1);
        setImageResult(newImageResult);
      } else {
        const cloneData = [...uploadFiles];
        cloneData.splice(index, 1);
        mainImageData?.splice(index, 1);
        uploadIndex.splice(index, 1);
        setUploadFiles(cloneData);
      }
      const newImageResult = [...imageResult];
      newImageResult.splice(index, 1);
      setImageResult(newImageResult);
    }
  };

  if (location?.state?.id && !isEdit) {
    let index = userData.findIndex(
      (data) => data?.user_id === location?.state?.id
    );
    initialValues = { ...userData[index < 0 ? 0 : index] };
  }

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .max(15, "Must be 15 Character or Less")
      .required("FullName is Required"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is Required"),
    description: Yup.string().min(1).required("Description Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    gender: Yup.string().required("gender is Required!"),
    language: Yup.array()
      .min(1)
      .of(Yup.string().required())
      .required("Required"),
    intrestedArea: Yup.array()
      .min(1)
      .of(Yup.string().required())
      .required("Please Select Intrested Area!"),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    const user_id = "id" + Math.random().toString(16).slice(2);
    const newData = {
      ...values,
      user_id,
      uploadFile: mainImageData,
    };
    if (isEdit) {
      const index = userData?.findIndex(
        (value) => value?.user_id === location?.state?.id
      );
      const cloneData = [...userData];
      cloneData[index] = { ...newData };
      setUserData(cloneData);

      if (location.state.id >= 0) {
        userData[location.state.id] = newData;
        setUserData(userData);
      }
    } else {
      setUserData((data) => [...data,newData]);
    }

    navigate("/");
  };
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleImageUpload = (e, index) => {
    setUploadIndex([...uploadIndex, index]);
    if (isEdit) {
      const cloneData = [...mainImageData];
      const tempUpdateData = [...updateData.uploadFile];
      tempUpdateData[index] = updateData.uploadFile[index];
      tempUpdateData[index].isCroppedUrlChange = true;
      cloneData[index] = uploadFiles[index];
      cloneData[index].isCroppedUrlChange = true;
      setMainImageData([...mainImageData, cloneData[index]]);
      setUpdateData({ ...updateData, tempUpdateData });
    }
    const cloneData = [...mainImageData];
    cloneData[index] = uploadFiles[index];
    cloneData[index].isCroppedUrlChange = true;
    setMainImageData(cloneData);
  };

  return (
    <>
      <h2 className="my-4">Fill Information</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form
            className="row g-3"
            onSubmit={formik.handleSubmit}
            action="#"
            encType="multipart/form-data"
          >
            <Label htmlFor="fullName" value="Enter Full Name" id="fullName" />
            <Input className="form-control" type="text" name="fullName" />
            <Label htmlFor="email" value="Enter Email" id="email" />
            <Input className="form-control" type="email" name="email" />

            <Label htmlFor="password" value="Enter Password" id="password" />
            <Input
              className="form-control"
              type="password"
              label="Enter Password"
              name="password"
            />
            <Label htmlFor="gender" value="Gender" id="gender" />
            <Radio name="gender" options={radiOptions} />

            <Label
              value="Choose Your Favorite Language"
              htmlFor="Language"
              id="language"
            />
            <Checkbox name="language" options={checkBoxOptions} />

            <Label
              value="Interested Area "
              htmlFor="intrestedArea"
              id="intrestedArea"
            />
            <Select
              className="form-control"
              name="intrestedArea"
              options={areaOption}
            />

            <Label value="Upload File" htmlFor="uploadFile" id="uploadFile" />
            <File
              multiple={true}
              style={{ width: "80%" }}
              className="form-control"
              type="file"
              name="uploadFile"
              ref={hiddenFileInput}
              accept="image/*"
              onChange={(e) => {
                formik.setFieldValue("uploadFile", e.target.files);
                setSelectFile(e.target.files);
                handleFileUpload(e);
              }}
              handleClick={handleClick}
            />
            {!isEdit ? (
              <>
                {uploadFiles.map((data, index) => (
                  <UploadImageItem
                    {...{ index }}
                    fileData={data}
                    key={index}
                    makeCroppedImage={(e) => makeCroppedImage(e, index)}
                    imageResult={imageResult[index]}
                    HandleImageDelete={HandleImageDelete}
                    handleImageUpload={handleImageUpload}
                    isUpload={uploadIndex.includes(index)}
                  />
                ))}
              </>
            ) : (
              <>
                {updateData?.uploadFile?.map((data, index) => (
                  <UploadImageItem
                    {...{ index }}
                    fileData={data}
                    key={index}
                    makeCroppedImage={(e) => makeCroppedImage(e, index)}
                    imageResult={imageResult[index]}
                    HandleImageDelete={HandleImageDelete}
                    handleImageUpload={handleImageUpload}
                    isUpload={uploadIndex.includes(index)}
                  />
                ))}
              </>
            )}

            <Label value="Description" htmlFor="description" id="editor" />
            <TextEditor 
              name="description"
              id="editor1"
              className="form-group"
              value={updateData?.description || initialValues?.description}
              handleEditiorChange={(e, editor) => {
                console.log('editor.getData() :>> ', editor.getData());
                formik.setFieldValue("description", editor?.getData());
              }}
            />
            <div className="mb-3">
              <Button
                className="btn btn-primary"
                type="submit"
                name={`${isEdit ? "Update" : "Submit"} `}
              />

              <Button
                className="btn btn-danger mx-2"
                type="button"
                name="cancel"
                handleOnClick={() => {
                  navigate("/");
                }}
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
export default SimpleForm;
