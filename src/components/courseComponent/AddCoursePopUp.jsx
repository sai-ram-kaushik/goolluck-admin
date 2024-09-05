import React, { useState, useRef } from "react";
import axios from "axios";

const AddCoursePopUp = ({ onClose }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("amount", amount);
    formData.append("desc", desc);
    formData.append("author", author);
    for (const file of fileInputRef.current.files) {
      formData.append("imageUrl", file);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_ENDPOINT}/api/v1/admin/create-course`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Course added successfully: ", response.data);
      window.location.reload();
    } catch (error) {
      console.error(
        "Course adding failed: ",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="popup md:min-w-[1080px]">
      <div className="flex w-full justify-between">
        <h2 className="text-[24px] text-secondary font-bold">Add Course</h2>
        <button onClick={onClose}>Close</button>
      </div>

      <div className="mt-10 flex items-start w-full">
        <form
          className="flex flex-col items-start gap-5 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-10 w-full">
            <div className="flex flex-col items-start w-full">
              <label className="text-secondary font-semibold">Name</label>
              <input
                type="text"
                className="w-full border-2 px-2 py-3 rounded-xl outline-none"
                placeholder="Name of the product"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-10 w-full">
            <div className="flex flex-col items-start w-full">
              <label className="text-secondary font-semibold">
                Image of the Course
              </label>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                className="w-full border-2 px-2 py-3 rounded-xl outline-none"
              />
            </div>

            <div className="flex items-start flex-col w-full">
              <label className="text-secondary font-semibold">Amount</label>
              <input
                type="number"
                className="w-full border-2 px-2 py-3 rounded-xl outline-none"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-start flex-col w-full">
            <label className="text-secondary font-semibold">
              Description of the Course
            </label>
            <input
              type="text"
              className="w-full border-2 px-2 py-3 rounded-xl outline-none"
              placeholder="About the Course"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>

          <div className="flex items-start flex-col w-full">
            <label className="text-secondary font-semibold">
              Author of the Course
            </label>
            <input
              type="text"
              className="w-full border-2 px-2 py-3 rounded-xl outline-none"
              placeholder="Author of the Course"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-secondary text-background rounded-lg py-[8px] px-[24px]"
            disabled={isLoading}
          >
            {isLoading ? "Adding Course..." : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoursePopUp;
