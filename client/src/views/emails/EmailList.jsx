import React, { useState, useEffect } from "react";
import { axiosApi } from "../../axiosClient";
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";


const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchEmails = async (page) => {
    try {
      setLoading(true);
      const response = await axiosApi.get(`/emails?page=${page}`);
      setEmails(response.data.emails);
      const perPage = response.data.itemsPerPage;
      const totalPages = response.data.totalPages;
      setTotalPages(Math.ceil(totalPages / perPage));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails(currentPage);
  }, [currentPage]);

  const handleView = async (id) => {
    try {
      await axiosApi.get(`/emails/${id}`);
    } catch (error) {
      console.error("Error viewing email:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await axiosApi.put(`/emails/${id}`);
      fetchEmails(currentPage);
    } catch (error) {
      console.error("Error editing email:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this email?")) {
      try {
        await axiosApi.delete(`/emails/${id}`);
        fetchEmails(currentPage);
      } catch (error) {
        console.error("Error deleting email:", error);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const renderPaginationNumbers = () => {
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded-md mx-1 ${
            currentPage === i
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="py-3 px-6">Subject</th>
              <th className="py-3 px-6">Sender</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr
                key={email._id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="py-4 px-6">{email.subject}</td>
                <td className="py-4 px-6">{email.sender.firstName}</td>
                <td className="py-4 px-6">
                  <buttont
                    onClick={() => handleEdit(email._id)}
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      email.isRead
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {email.isRead ? "Read" : "Unread"}
                  </buttont>
                </td>
                <td className="py-4 px-6">
                  {new Date(email.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <Link
                      onClick={() => handleView(email._id)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleEdit(email._id)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(email._id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-md ${
                currentPage === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex space-x-1">{renderPaginationNumbers()}</div>
            <span
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className={`p-2 rounded-md ${
                currentPage === totalPages - 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailList;
