import React, { useEffect, useState } from "react";
import Button from "../../utils/Button";
import axios from "axios";
import AddWorkshopPopUp from "./AddWorkshopPopUp";

const WorkshopContainer = () => {
  const [workshops, setWorkshops] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDeleteWorkshop = (workshopId) => {
    axios
      .delete(
        `${import.meta.env.VITE_APP_API_ENDPOINT}/api/v1/admin/delete-workshop/${workshopId}`
      )
      .then((response) => {
        // Remove the deleted course from the list
        setWorkshops(
          workshops.filter((workshop) => workshop._id !== workshopId)
        );
        setActiveRow(null); // Reset the active row
      })
      .catch((error) => {
        console.error("There was an error deleting the course!", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/v1/admin/get-all-workshops`)
      .then((response) => {
        setWorkshops(response.data.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className="w-full">
      {isPopupOpen && <AddWorkshopPopUp onClose={closePopup} />}
      <div
        className={`overlay ${isPopupOpen ? "show" : ""}`}
        onClick={closePopup}
      ></div>
      <div className="flex items-start justify-between ">
        <h2 className="text-[20px] font-bold">Workshops</h2>
        <Button title="Add Workshop" onClick={openPopup} />
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-5">
        <thead className="">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Workshop ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Workshop Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Workshop Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Workshop By
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Order Date/Time
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {workshops.map((workshop, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                {workshop._id.slice(0, 7)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={workshop.imageUrl}
                  width={50}
                  height={50}
                  alt="course"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{workshop.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{workshop.author}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {workshop.updatedAt}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{workshop.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {activeRow === index ? (
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteWorkshop(workshop._id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => setActiveRow(index)}
                  >
                    ...
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkshopContainer;
