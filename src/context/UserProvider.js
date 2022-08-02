import UserContext from "./UserContext";
import React, { useState } from "react";

const UserProvider = (props) => {
  const dummyData = [
    {
      email: "vunanul@mailinator.com",
      fullName: "Colette Gould",
      gender: "Female",
      intrestedArea: ["Management", "BackEnd"],
      language: ["Python", "JAVA"],
      password: "Pa$$w0rd!",
      toggle: false,
      uploadFile: {
        type: "image/jpeg",
        size: 724005,
        name: "1.jpeg",
        lastModified: 1658301396037,
      },
      user_id: "id4085d45fc5c86",
      imageUrl:
        "blob:http://localhost:3000/7c4fe3a1-8c9a-41bb-b527-2ad309441b7c",
    },
    {
      email: "fecito@mailinator.com",
      fullName: "Kato Cantrell",
      gender: "Male",
      intrestedArea: ["BackEnd"],
      language: ["Javasript", "Python", "JAVA"],
      password: "Pa$$w0rd!",
      toggle: false,
      uploadFile: {
        type: "image/jpeg",
        size: 7190,
        name: "2.jpg",
        lastModified: 1658301588284,
      },
      user_id: "id9fbdb0fada2c4",
      imageUrl:
        "blob:http://localhost:3000/7c4fe3a1-8c9a-41bb-b527-2ad309441b7c",
    },
  ];
  const [userData, setUserData] = useState(dummyData);
  const [updateData, setUpdateData] = useState();
  const [selectFile, setSelectFile] = useState();
  const [preview, setPreview] = useState();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        isEdit,
        setIsEdit,
        updateData,
        setUpdateData,
        selectFile,
        setSelectFile,
        preview,
        setPreview,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
