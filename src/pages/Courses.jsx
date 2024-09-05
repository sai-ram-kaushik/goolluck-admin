import React from "react";
import CourseContainer from "../components/courseComponent/CourseContainer";

const Courses = () => {
  return (
    <div className="py-5 px-5 md:px-10 w-full bg-container flex flex-col items-start gap-4 rounded-xl">
      <CourseContainer />
    </div>
  );
};

export default Courses;
