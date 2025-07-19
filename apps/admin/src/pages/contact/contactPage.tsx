import type React from "react";
import { useEffect, useState } from "react";
import { Trash2, Mail, Phone, MessageSquare } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

interface ContactType {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Contact: React.FC = () => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(
    null
  );
  const [showMessageModal, setShowMessageModal] = useState(false);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Status ${response.status}`);

      const { value } = await response.json();

      let filteredContacts = value || [];
      if (search) {
        filteredContacts = filteredContacts.filter(
          (contact: ContactType) =>
            contact.name.toLowerCase().includes(search.toLowerCase()) ||
            contact.email.toLowerCase().includes(search.toLowerCase()) ||
            contact.mobile.includes(search)
        );
      }
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

      setContacts(paginatedContacts);
      setTotalCount(filteredContacts.length);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      setContacts([]);
      setTotalCount(0);
      toast.error("Failed to fetch contacts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage, rowsPerPage, search]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This contact will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`Status ${response.status}`);

      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      toast.success("Contact deleted successfully");

      await Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Failed to delete contact:", error);
      toast.error("Failed to delete contact");

      await Swal.fire({
        title: "Error!",
        text: "Failed to delete the contact.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleViewMessage = (contact: ContactType) => {
    setSelectedContact(contact);
    setShowMessageModal(true);
  };

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const goToPreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[#001f3f]">Contact Messages</h1>
        <input
          type="text"
          placeholder="Search contacts..."
          className="border px-3 py-2 rounded shadow-sm w-full sm:w-64"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#001f3f] text-white">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center px-4 py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : contacts.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center px-4 py-6 text-gray-500">
                  No contacts found.
                </td>
              </tr>
            ) : (
              contacts.map((contact, index) => (
                <tr key={contact._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium">{contact.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-blue-900" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-black hover:underline break-words whitespace-nowrap"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-blue-900" />
                      <a
                        href={`tel:${contact.mobile}`}
                        className="text-black hover:underline break-words whitespace-nowrap"
                      >
                        {contact.mobile}
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleViewMessage(contact)}
                      className="flex items-center gap-2 text-blue-900 hover:text-blue-400"
                      title="View Message"
                    >
                      <MessageSquare size={16} />
                      View
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      title="Delete"
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
        <div>
          <label className="mr-2 text-sm">Rows per page:</label>
          <select
            className="border px-2 py-1 rounded text-sm"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="text-sm flex flex-wrap items-center gap-2">
          {(currentPage - 1) * rowsPerPage + 1}–
          {Math.min(currentPage * rowsPerPage, totalCount)} of {totalCount}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`ml-2 px-2 py-1 rounded ${
              currentPage === 1
                ? "text-gray-300"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`ml-2 px-2 py-1 rounded ${
              currentPage === totalPages
                ? "text-gray-300"
                : "text-blue-600 hover:text-blue-800"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {showMessageModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-[#001f3f]">
                  Contact Message
                </h2>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <p className="text-gray-900">{selectedContact.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedContact.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile
                  </label>
                  <p className="text-gray-900">{selectedContact.mobile}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <p className="text-gray-900">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: Your Contact Message&body=Hi ${selectedContact.name},%0D%0A%0D%0AThank you for your message.%0D%0A%0D%0ABest regards`}
                  className="px-4 py-2 bg-[#001f3f] text-white rounded hover:bg-blue-800"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
