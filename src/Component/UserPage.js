import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Image from "./Image";
// import Modal from "./Modal";

export const UserPage = () => {
  const {
    userData,
    setUserData,
    setIsEdit,
    setUpdateData,
  } = useContext(UserContext);
  let navigate = useNavigate();
  const handleDelete = (id) => {
    var msj = "Are you sure that you want to delete this comment?";
    if (!window.confirm(msj)) {
      return false;
    } else {
      const filterData = userData.filter((data, index) => data.user_id !== id);
      setUserData(filterData);
    }
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
        <h2 className="my-4">User Details</h2>
        <Button
          className="btn btn-success mx-2"
          handleOnClick={() => {
            setIsEdit(false);
            navigate("/add-user");
          }}
          name="Add Data"
        />
        <div className="table-responsive">
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
                />
              ))}
          </tbody>
        </table>
        </div>
      </>
  );
};

export default UserPage;

export const UserItem = ({data, handleDelete, handleUpdate, ...props}) => {

  const {fullName,email,gender,language,user_id, intrestedArea, uploadFile} = data

  return (
    <tr {...props} >
      <th scope="row">{props.id}</th>
      <td>{fullName}</td>
      <td>{email}</td>
      <td>{gender}</td>
      <td>{language.join(", ")}</td>
      <td>{intrestedArea.join(", ")}</td>
      <td>
       {uploadFile?.length ? 
       <>
         {uploadFile?.map((value, index) => 
         <Image className="m-1" key={index}
          src={value?.croppedUrl || value?.url}
          style={{ width: "80px", height: "80px" }}
          alt="no preview available"
          id="imageUrl"
        />)}
       </> : null
       }
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
