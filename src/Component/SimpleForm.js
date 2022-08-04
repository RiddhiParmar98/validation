import React, { useEffect, useState } from "react";
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
import Image from "./Image";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const SimpleForm = () => {
  const {
    userData,
    setUserData,
    isEdit,
    updateData,
    selectFile,
    setSelectFile,
    preview,
    setPreview,
  } = useContext(UserContext);
  let navigate = useNavigate();
  const location = useLocation();

  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    height: 30,
    aspect: 16 / 9,
  });
  const [imageResult, setImageResult] = useState(null);
  
  const FILE_SIZE = 1024 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

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

  useEffect(() => {
    if (!selectFile) {
      setPreview(undefined);
      return;
    }
    if (isEdit) {
      setSelectFile(updateData.uploadFile);
    }
    previewData(selectFile);
    // eslint-disable-next-line
  }, []);

  const previewData = (file) => {
    if (file && file.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageResult(reader.result);
        reader.readAsDataURL(file);
      });
    }
    const objectURL = URL.createObjectURL(file);
    setPreview(objectURL);
  };

  const makeCroppedImage = async () => {
    const uploadImage = document.getElementById("uploadImage");
    if (uploadImage && crop.width && crop.height) {
      const croppedImageURL = await getCroppedImage(
        uploadImage,
        crop,
        selectFile.name
      );
      setImageResult(croppedImageURL);
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
          setSelectFile(blob);
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
        toggle: false,
        language: [],
        intrestedArea: [],
        uploadFile: "",
        imageUrl: "",
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
      .required("Required"),
    email: Yup.string().email("Invalid Email Address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    gender: Yup.string().required("gender is Required!"),
    language: Yup.array()
      .min(1)
      .of(Yup.string().required())
      .required("Required"),
    uploadFile: Yup.mixed()
      .required("A file is required")
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= FILE_SIZE
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
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
      imageUrl: imageResult ? imageResult : preview,
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
      setUserData((data) => [...data, newData]);
    }
    navigate("/userpage");
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
              className="form-control"
              type="file"
              name="uploadFile"
              accept="image/*"
              onChange={(e) => {
                formik.setFieldValue("uploadFile", e.target.files[0]);
                setSelectFile(e.target.files[0]);
                previewData(e.target.files[0]);
              }}
            />

            {selectFile && (
              <React.Fragment>
                <ReactCrop
                  src={preview}
                  crop={crop}
                  onImageLoaded={setSelectFile}
                  onChange={setCrop}
                  onComplete={makeCroppedImage}
                >
                  <Image
                    src={preview}
                    alt="no preview available"
                    id="uploadImage"
                    style={{ height: "300px", width: "300px" }}
                  />
                </ReactCrop>
              </React.Fragment>
            )}

            {imageResult && (
              <div className="mb-3">
                <Image
                  src={imageResult}
                  id="croppedImage"
                  alt="new cropped image"
                  style={{ height: "300px", width: "300px" }}
                />
              </div>
            )}

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
                  navigate("/userpage");
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
