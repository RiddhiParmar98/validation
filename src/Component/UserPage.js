import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Image from "./Image";

export const UserPage = () => {
  const {
    userData,
    setUserData,
    setIsEdit,
    setUpdateData,
    setSelectFile,
    preview,
    setPreview,
  } = useContext(UserContext);
  let navigate = useNavigate();

  const handleDelete = (id) => {
    const filterData = userData.filter((data, index) => data.user_id !== id);
    setUserData(filterData);
    localStorage.setItem("userData", JSON.stringify(filterData));
  };

  const handleUpdate = (id) => {
    setIsEdit(true);
    const index = userData?.findIndex((value) => value?.user_id === id);
    const editData = userData[index];
    setUpdateData({ ...editData });
    navigate(`/edit-user/${id}`, { state: { id } });
  };

  return (
    <>
      <div className="container">
        <h2 className="my-4">User Details</h2>

        <Button
          className="btn btn-success my-2"
          handleOnClick={() => {
            setIsEdit(false);
            navigate("/add-user");
            setPreview(undefined);
            setSelectFile(undefined);
          }}
          name="Add Data"
        />

        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">FullName</th>
              <th scope="col">Email Id</th>
              <th scope="col">Gender</th>
              <th scope="col">Language</th>
              <th scope="col">Intrested Area</th>
              <th scope="col">Preview Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData &&
              userData.map((data, index) => (
                <UserItem
                  data={data}
                  id={index + 1}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  key={index}
                  preview={preview}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserPage;

export const UserItem = (props) => {
  const {
    fullName,
    email,
    gender,
    language,
    intrestedArea,
    user_id,
    imageUrl,
  } = props.data;
  const { handleDelete, handleUpdate } = props;
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{fullName}</td>
      <td>{email}</td>
      <td>{gender}</td>
      <td>{language.join(", ")}</td>
      <td>{intrestedArea.join(", ")}</td>
      <td>
        <Image
          src={imageUrl}
          style={{ width: "80px", height: "80px" }}
          alt="no preview available"
        />
      </td>

      <td>
        <Button
          className="btn btn-primary mx-2"
          handleOnClick={() => {
            handleUpdate(user_id);
          }}
          name="Edit"
        />

        <Button
          className="btn btn-danger"
          handleOnClick={() => {
            handleDelete(user_id);
          }}
          name="Delete"
        />
      </td>
    </tr>
  );
};
