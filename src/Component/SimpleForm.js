import React, { useEffect } from "react";
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

  const FILE_SIZE = 1024 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const radiOptions = [
    { key: "male", value: "Male" },
    { key: "female", value: "Female" },
  ];

  const checkBoxOptions = [
    { key: "Javasript", value: "Javasript" },
    { key: "Python", value: "Python" },
    { key: "PHP", value: "PHP" },
    { key: "JAVA", value: "JAVA" },
  ];

  const areaOption = [
    { key: "Select an option", value: "" },
    { key: "programming", value: "Programming" },
    { key: "designing", value: "Designing" },
    { key: "management", value: "Management" },
    { key: "frontEnd", value: "FrontEnd" },
    { key: "backEnd", value: "BackEnd" },
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
    const objectURL = URL.createObjectURL(file);
    console.log("AdddSelectFile", file);
    setPreview(objectURL);
  };

  const initialValues = isEdit
    ? { ...updateData, } : {
        fullName: "",
        email: "",
        password: "",
        gender: "",
        toggle: false,
        language: [],
        intrestedArea: [],
        uploadFile: "",
      };

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
    const newData = { ...values, user_id };
    console.log();
    if (isEdit) {
      console.log("editData", newData);
      console.log("updateData", updateData);
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
            <Input
              className="form-control"
              control="input"
              type="text"
              name="fullName"
            />
            <Label htmlFor="email" value="Enter Email" id="email" />
            <Input
              className="form-control"
              control="input"
              type="email"
              name="email"
            />

            <Label htmlFor="password" value="Enter password" id="password" />
            <Input
              className="form-control"
              control="input"
              type="password"
              label="Enter Password"
              name="password"
            />

            <Label htmlFor="gender" value="Gender" id="gender" />
            <Radio control="radio" name="gender" options={radiOptions} />

            <Label
              value="Choose Your Favriout Launguage"
              htmlFor="Language"
              id="language"
            />
            <Checkbox
              control="checkbox"
              name="language"
              options={checkBoxOptions}
            />

            <Label
              value="Intrested Area "
              htmlFor="intrestedArea"
              id="intrestedArea"
            />
            <Select
              className="form-control"
              control="select"
              name="intrestedArea"
              options={areaOption}
            />

            <Label value="Upload File" htmlFor="uploadFile" id="uploadFile" />
            <File
              control="file"
              className="form-control"
              type="file"
              name="uploadFile"
              onChange={(e) => {
                formik.setFieldValue("uploadFile", e.target.files[0]);
                setSelectFile(e.target.files[0]);
                previewData(e.target.files[0]);
              }}
            />

            {selectFile && <Image src={preview} alt="no preview available" />}

            <Button
              className="btn btn-primary"
              type="submit"
              name={`${isEdit ? "Edit" : "Submit"} `}
            />

            <Button
              className="btn btn-danger mx-2"
              type="button"
              name="cancel"
              handleOnClick={() => {
                navigate("/userpage");
              }}
            />
          </form>
        )}
      </Formik>
    </>
  );
};
export default SimpleForm;
