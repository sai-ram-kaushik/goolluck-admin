import React from "react";
import WorkshopContainer from "../components/workshopComponents/WorkshopContainer";

const Workshop = () => {
  return (
    <div className="py-5 px-5 md:px-10 w-full bg-container flex flex-col items-start gap-4 rounded-xl">
      <WorkshopContainer />
    </div>
  );
};

export default Workshop;
