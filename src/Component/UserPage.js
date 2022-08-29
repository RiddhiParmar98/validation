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
    <div className="max-w-8xl w-full mx-auto mt-10 mb-1 bg-white p-8 border border-gray-300">
      <h2 className="text-4xl font-bold text-center text-gray-600 my-2">
        User Details
      </h2>
      <Button
        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-md text-md px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        handleOnClick={() => {
          setIsEdit(false);
          navigate("/add-user");
        }}
        name="Add Data"
      />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-left text-gray-500 dark:text-gray-400 mb-1">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-2 px-4">
                id
              </th>
              <th scope="col" className="py-2 px-4">
                FullName
              </th>
              <th scope="col" className="py-2 px-4">
                Email Id
              </th>
              <th scope="col" className="py-2 px-4">
                Gender
              </th>
              <th scope="col" className="py-2 px-4">
                Language
              </th>
              <th scope="col" className="py-2 px-4">
                Intrested Area
              </th>
              <th scope="col" className="py-2 px-4">
                description
              </th>
              <th scope="col" className="py-2 px-4">
                Preview Image
              </th>
              <th scope="col" className="py-2 px-4">
                Action
              </th>
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
    </div>
  );
};

export default UserPage;

export const UserItem = ({ data, handleDelete, handleUpdate, ...props }) => {
  const {
    fullName,
    email,
    gender,
    language,
    user_id,
    intrestedArea,
    uploadFile,
    description
  } = data;

  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
      {...props}
    >
      <th
        scope="row"
        className="py-4 px-5 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {props.id}
      </th>
      <td className="py-3 px-4">{fullName}</td>
      <td className="py-3 px-4">{email}</td>
      <td className="py-3 px-4">{gender}</td>
      <td className="py-3 px-4">{language.join(", ")}</td>
      <td className="py-3 px-4">{intrestedArea.join(", ")}</td>
      <td className="py-3 px-4">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-row xs:flex-wrap">
          {uploadFile?.length ? (
            <>
              {uploadFile?.map((value, index) => (
                <Image
                  className="m-1"
                  key={index}
                  src={value?.croppedUrl || value?.url}
                  style={{ width: "80px", height: "80px" }}
                  alt="no preview available"
                  id="imageUrl"
                />
              ))}
            </>
          ) : null}
        </div>
      </td>
      <td className="py-1 px-1">
        <div className="flex flex-row justify-start">
          <Button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-xs px-4 py-2.5 text-center mr-1 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            handleOnClick={() => {
              handleUpdate(user_id);
            }}
            name="Edit"
          />
          <Button
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-xs px-4 py-2.5 text-center mr-1 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            handleOnClick={() => {
              handleDelete(user_id);
            }}
            name="Delete"
          />
        </div>
      </td>
    </tr>
  );
};
