import React, { useEffect, useState } from "react";
import Button from "../../utils/Button";
import axios from "axios";
import AddCoursePopUp from "./AddCoursePopUp";

const CourseContainer = () => {
  const [courses, setCourses] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(null); // State to track the active row

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDeleteCourse = (courseId) => {
    axios
      .delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/v1/admin/delete-course/${courseId}`)
      .then((response) => {
        // Remove the deleted course from the list
        setCourses(courses.filter((course) => course._id !== courseId));
        setActiveRow(null); // Reset the active row
      })
      .catch((error) => {
        console.error("There was an error deleting the course!", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/v1/admin/get-all-courses`)
      .then((response) => {
        setCourses(response.data.data);
      });
  }, []);

  return (
    <div className="w-full">
      {isPopupOpen && <AddCoursePopUp onClose={closePopup} />}
      <div
        className={`overlay ${isPopupOpen ? "show" : ""}`}
        onClick={closePopup}
      ></div>
      <div className="flex items-start justify-between ">
        <h2 className="text-[20px] font-bold">Courses</h2>
        <Button title="Add Course" onClick={openPopup} />
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-5">
        <thead className="">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Course ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Course Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Course By
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
          {courses.map((course, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                {course._id.slice(0, 7)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={course.imageUrl} width={50} height={50} alt="course" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{course.author}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {course.updatedAt}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{course.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {activeRow === index ? (
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteCourse(course._id)}
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

export default CourseContainer;
