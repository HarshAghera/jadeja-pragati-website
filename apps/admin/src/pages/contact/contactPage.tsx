import type React from "react";
import { useEffect, useState, useCallback } from "react";
import { Trash2, Mail, Phone, MessageSquare, X } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { motion, AnimatePresence } from "framer-motion";

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

  const fetchContacts = useCallback(async () => {
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
  }, [search, currentPage, rowsPerPage]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

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

  const handleExportPDF = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error fetching all data");

      const { value } = await response.json();

      const doc = new jsPDF();
      const tableColumn = ["No.", "Name", "Email", "Mobile", "Date"];
      const tableRows: (string | number)[][] = [];

      value.forEach((contact: ContactType, index: number) => {
        const row = [
          index + 1,
          contact.name,
          contact.email,
          contact.mobile,
          new Date(contact.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        ];
        tableRows.push(row);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        styles: { fontSize: 10 },
      });

      doc.text("Contact List", 14, 15);
      doc.save("contact_list.pdf");
    } catch (err) {
      toast.error("PDF export failed");
      console.error(err);
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
    <motion.div
      className="p-4 sm:p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#001f3f] hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold w-full sm:w-auto"
          onClick={handleExportPDF}
        >
          Export PDF
        </motion.button>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-sm text-sm placeholder-gray-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="18"
            height="18"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300 text-center mx-auto">
        <table className="min-w-full text-sm text-center">
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
            <AnimatePresence>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center px-4 py-6 text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center px-4 py-6 text-gray-500"
                  >
                    No contacts found.
                  </td>
                </tr>
              ) : (
                contacts.map((contact, index) => (
                  <motion.tr
                    key={contact._id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-3 text-left font-medium whitespace-nowrap">
                      {contact.name}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-blue-900" />
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-black whitespace-nowrap !no-underline"
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
                          className="text-black whitespace-nowrap !no-underline"
                        >
                          {contact.mobile}
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewMessage(contact)}
                        className="flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-900 hover:bg-blue-200 rounded-md align-middle shadow-sm mx-auto"
                      >
                        <MessageSquare size={16} />
                        View
                      </motion.button>
                    </td>
                    <td className="px-4 py-3">
                      <motion.button
                        whileHover={{ scale: 1.1, color: "#b91c1c" }}
                        whileTap={{ scale: 0.95 }}
                        title="Delete"
                        onClick={() => handleDelete(contact._id)}
                        className="text-red-600 hover:text-red-700 flex items-center justify-center align-middle mx-auto"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
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
          <motion.button
            whileHover={{ scale: currentPage > 1 ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`ml-2 px-2 py-1 rounded ${
              currentPage === 1
                ? "text-gray-300"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: currentPage < totalPages ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`ml-2 px-2 py-1 rounded ${
              currentPage === totalPages
                ? "text-gray-300"
                : "text-blue-600 hover:text-blue-800"
            }`}
          >
            Next
          </motion.button>
        </div>
      </div>

      {showMessageModal && selectedContact && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200">
            <div className="bg-[#001f3f] rounded-t-2xl px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">
                Contact Message
              </h2>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-white hover:text-red-500 transition-colors duration-200 p-1"
                aria-label="Close"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>
            <div className="p-6 space-y-5 text-sm sm:text-base bg-[#f5f5f5]">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Name
                </label>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  {selectedContact.name}
                </div>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Email
                </label>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  {selectedContact.email}
                </div>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Mobile
                </label>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  {selectedContact.mobile}
                </div>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Date
                </label>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  {new Date(selectedContact.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Message
                </label>
                <div className="bg-white p-4 rounded-lg border border-gray-200 whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 pb-6 pt-4 border-t border-gray-100 bg-[#f5f5f5] rounded-b-2xl">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMessageModal(false)}
                className="px-3 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base rounded text-white bg-[#001f3f] border border-gray-300 hover:bg-blue-800"
              >
                Close
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${selectedContact.email}?subject=Re: Your Contact Message&body=Hi ${selectedContact.name},%0D%0A%0D%0AThank you for your message.%0D%0A%0D%0ABest regards`}
                className="px-3 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base rounded-full text-white bg-[#001f3f] border border-gray-300 hover:bg-blue-800 !no-underline"
              >
                Reply via Email
              </motion.a>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Contact;
