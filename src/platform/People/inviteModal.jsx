import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const InviteModal = ({ isOpen, onClose }) => {
    const location=useLocation();
    const classCode = location.state?.code;

  const [email, setEmail] = useState(""); 

  const [isLoading, setIsLoading] = useState(false);


  if (!isOpen) return null; 



  const handleInvite = async (e) => {
    e.preventDefault(); 

    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    setIsLoading(true); 

    const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/classroom/invite`,
        { email, code:classCode }, 

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)


      alert(`Invitation sent successfully to ${email}`);
      setEmail(""); 

    } catch (error) {

      console.error("Failed to send invite:", error);
      alert("Failed to send the invite. Please try again.");
    } finally {
      setIsLoading(false); 

    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-[400px] p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Invite People</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✖
          </button>
        </div>


        <form onSubmit={handleInvite}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            className="w-full mt-2 mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

            required
          />
          <button
            type="submit"
            disabled={isLoading} 

            className={`w-full py-2 px-4 rounded-lg ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Sending..." : "Send Invite"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteModal;
