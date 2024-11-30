import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { X, Plus, Trash2 } from "lucide-react";
import card from "../assets/assign.svg";

function CreateAssignmentModal({ isOpen, onClose }) {
  const location = useLocation();
  const [formData, setFormData] = useState({
    class: "",
    dueDate: "",
    title: "",
    description: "",
    attachments: [],
  });
  const classCode = location.state?.code;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const handleRemoveFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("code", classCode);
    data.append("dueDate", formData.dueDate);
    data.append("name", formData.title);
    data.append("description", formData.description);

    if (formData.attachments) {
      for (let i = 0; i < formData.attachments.length; i++) {
        data.append("media", formData.attachments[i]);
      }
    }

    const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/assignment/create`,
        data,
        axiosConfig
      );

      console.log("Assignment created:", response.data);
      onClose();
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[80%] h-[80%] p-8 relative">
        {/* Header */}
        <div className="flex pl-[5%] justify-between items-end h-[5%]">
          <h2 className="text-2xl">Create Assignment</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="flex justify-center gap-[10%] h-[80%] items-center">
          <div className="flex flex-col space-y-6 w-[40%]">
            <div className="flex flex-col">
              <label className="block text-lg">For</label>
              <input
                type="text"
                name="class"
                placeholder="English (Class Code)"
                value={formData.class}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200"
                readOnly
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="block text-lg">Assignment Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter assignment title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="block text-lg">Description</label>
              <textarea
                name="description"
                placeholder="Write a brief description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-[#4C5858] focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-6 w-[40%]">
            <div className="flex flex-col flex-1 space-y-2">
              <label className="block text-lg">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="w-full p-[20px] rounded-lg border border-[#4C5858] focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="block text-lg">Attachments</label>
              <div className="border border-[#4C5858] rounded-lg p-4 h-[180px] overflow-y-auto">
                {formData.attachments.length === 0 && (
                  <div className="flex flex-col items-center justify-center text-center">
                    <img
                      src={card}
                      alt="Upload illustration"
                      className="w-32 h-32 mb-4"
                    />
                  </div>
                )}
                <ul className="space-y-2">
                  {formData.attachments.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <label className="mt-4 cursor-pointer flex justify-center">
                  <div className="flex items-center px-4 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition-colors">
                    <Plus className="w-5 h-5 mr-2" />
                    Add files
                  </div>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-[8%] flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-[60px] py-[12px] bg-[#066769] text-white rounded-lg transition-colors"
          >
            Create Assignment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAssignmentModal;