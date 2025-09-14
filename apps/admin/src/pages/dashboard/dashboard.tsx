import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle,
  Mail,
  Loader,
  Book,
  Navigation,
  Briefcase,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface BlogType {
  _id: string;
  title: string;
  createdAt: string;
  deletedAt?: string;
  isPublished: boolean;
  author?: { name: string };
}

interface ContactType {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface PageType {
  _id: string;
  title: string;
  createdAt?: string;
  showInNavbar: boolean;
}

interface ProjectType {
  _id: string;
  title: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pagesInNavbar, setPagesInNavbar] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0); // ✅ added state for projects

  const [blogChartData, setBlogChartData] = useState<
    { date: string; count: number }[]
  >([]);
  const [contactChartData, setContactChartData] = useState<
    { date: string; count: number }[]
  >([]);
  const [pageChartData, setPageChartData] = useState<
    { date: string; count: number }[]
  >([]);
  const [projectChartData, setProjectChartData] = useState<
    { date: string; count: number }[]
  >([]); // ✅ added state

  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedChartType, setSelectedChartType] = useState<
    "blog" | "contact" | "page" | "project"
  >("blog"); // ✅ include "project"

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const token = localStorage.getItem("authToken");
  const days = 30;

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const now = new Date();

        const makeDailyCount = () => {
          const dailyCount: Record<string, number> = {};
          for (let i = 0; i < days; i++) {
            const d = new Date(now);
            d.setDate(now.getDate() - i);
            dailyCount[d.toLocaleDateString("en-CA")] = 0;
          }
          return dailyCount;
        };

        // Fetch Blogs
        const blogResp = await fetch(`${API_BASE_URL}/blogs/list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            page: 1,
            limit: 1000,
            sortBy: "createdAt",
            sortOrder: "desc",
            search: "",
          }),
        });
        if (!blogResp.ok) throw new Error("Blog fetch failed");
        const { value: blogValue } = await blogResp.json();
        const blogs: BlogType[] = blogValue.data;
        const total = blogValue.total;
        const published = blogs.filter((b) => b.isPublished).length;
        const blogDailyCount = makeDailyCount();
        blogs.forEach((blog) => {
          const createdDate = new Date(blog.createdAt);
          const createdStr = createdDate.toLocaleDateString("en-CA");
          if (blogDailyCount[createdStr] !== undefined)
            blogDailyCount[createdStr]++;
        });
        const blogChartArr = Object.keys(blogDailyCount)
          .sort()
          .map((date) => ({ date, count: blogDailyCount[date] }));

        const contactResp = await fetch(`${API_BASE_URL}/contacts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!contactResp.ok) throw new Error("Contacts fetch failed");
        const { value: contactsValue } = await contactResp.json();
        const contactsArray: ContactType[] = Array.isArray(contactsValue)
          ? contactsValue
          : contactsValue.data || [];
        const contactsTotal = contactsArray.length;
        const contactDailyCount = makeDailyCount();
        contactsArray.forEach((contact) => {
          const createdDate = new Date(contact.createdAt);
          const createdStr = createdDate.toLocaleDateString("en-CA");
          if (contactDailyCount[createdStr] !== undefined)
            contactDailyCount[createdStr]++;
        });
        const contactChartArr = Object.keys(contactDailyCount)
          .sort()
          .map((date) => ({ date, count: contactDailyCount[date] }));

        const pagesResp = await fetch(`${API_BASE_URL}/pages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!pagesResp.ok) throw new Error("Pages fetch failed");
        const { value: pagesValue } = await pagesResp.json();
        const pagesArray: PageType[] = Array.isArray(pagesValue)
          ? pagesValue
          : pagesValue.data || [];
        const totalPagesCount = pagesArray.length;
        const pagesInNavbarCount = pagesArray.filter(
          (p) => p.showInNavbar
        ).length;
        const pageDailyCount = makeDailyCount();
        pagesArray.forEach((page) => {
          if (page.createdAt) {
            const createdDate = new Date(page.createdAt);
            const createdStr = createdDate.toLocaleDateString("en-CA");
            if (pageDailyCount[createdStr] !== undefined)
              pageDailyCount[createdStr]++;
          }
        });
        const pageChartArr = Object.keys(pageDailyCount)
          .sort()
          .map((date) => ({ date, count: pageDailyCount[date] }));

        const projectsResp = await fetch(`${API_BASE_URL}/projects/list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            page: 1,
            limit: 1000,
            sortBy: "createdAt",
            sortOrder: "desc",
            search: "",
          }),
        });
        if (!projectsResp.ok) throw new Error("Projects fetch failed");
        const { value: projectsValue } = await projectsResp.json();
        const projectsArray: ProjectType[] = projectsValue.data;
        const totalProjectsCount = projectsValue.total;
        const projectDailyCount = makeDailyCount();
        projectsArray.forEach((project) => {
          const createdDate = new Date(project.createdAt);
          const createdStr = createdDate.toLocaleDateString("en-CA");
          if (projectDailyCount[createdStr] !== undefined)
            projectDailyCount[createdStr]++;
        });
        const projectChartArr = Object.keys(projectDailyCount)
          .sort()
          .map((date) => ({ date, count: projectDailyCount[date] }));

        setTotalCount(total);
        setPublishedCount(published);
        setBlogChartData(blogChartArr);
        setContactChartData(contactChartArr);
        setPageChartData(pageChartArr);
        setTotalContacts(contactsTotal);
        setTotalPages(totalPagesCount);
        setPagesInNavbar(pagesInNavbarCount);
        setTotalProjects(totalProjectsCount);
        setProjectChartData(projectChartArr);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchDashboardData();
  }, [token]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, type: "spring" },
    }),
  };

  const currentYear = new Date().getFullYear();
  const years = [
    currentYear - 3,
    currentYear - 2,
    currentYear - 1,
    currentYear,
  ];

  const getFilteredData = () => {
    let sourceData: { date: string; count: number }[] = [];
    if (selectedChartType === "blog") sourceData = blogChartData;
    else if (selectedChartType === "contact") sourceData = contactChartData;
    else if (selectedChartType === "page") sourceData = pageChartData;
    else if (selectedChartType === "project") sourceData = projectChartData; // ✅ added
    return sourceData.filter((item) => {
      const date = new Date(item.date);
      return (
        date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
      );
    });
  };
  const filteredChartData = getFilteredData();

  const stats = [
    {
      label: "Total Blogs",
      value: totalCount,
      icon: (
        <div className="bg-blue-100 p-3 rounded-full mb-2">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
      ),
    },
    {
      label: "Published Blogs",
      value: publishedCount,
      icon: (
        <div className="bg-green-100 p-3 rounded-full mb-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
      ),
    },
    {
      label: "Total Contacts",
      value: totalContacts,
      icon: (
        <div className="bg-purple-100 p-3 rounded-full mb-2">
          <Mail className="w-6 h-6 text-purple-600" />
        </div>
      ),
    },
    {
      label: "Total Pages",
      value: totalPages,
      icon: (
        <div className="bg-yellow-100 p-3 rounded-full mb-2">
          <Book className="w-6 h-6 text-yellow-600" />
        </div>
      ),
    },
    {
      label: "Pages in Navbar",
      value: pagesInNavbar,
      icon: (
        <div className="bg-indigo-100 p-3 rounded-full mb-2">
          <Navigation className="w-6 h-6 text-indigo-600" />
        </div>
      ),
    },
    {
      label: "Total Projects",
      value: totalProjects,
      icon: (
        <div className="bg-teal-100 p-3 rounded-full mb-2">
          <Briefcase className="w-6 h-6 text-teal-600" />
        </div>
      ),
    },
  ];

  return (
    <motion.div
      className="px-2 sm:px-4 md:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-8"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {stats.map((item) => (
          <motion.div
            key={item.label}
            variants={fadeIn}
            className="bg-white rounded-2xl shadow p-4 sm:p-6 border text-center group transition-all duration-500 ease-in-out hover:rotate-1 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col items-center justify-center">
              {item.icon}
              <h4 className="text-gray-500 text-xs sm:text-sm mb-1">
                {item.label}
              </h4>
              <p className="text-2xl sm:text-3xl font-bold text-blue-950">
                {isLoading ? (
                  <span className="block w-12 h-6 bg-gray-200 animate-pulse rounded" />
                ) : (
                  item.value
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div
          variants={fadeIn}
          className="bg-white border rounded-xl p-6 shadow-md"
        >
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h5 className="text-base font-semibold text-gray-800">
              📊{" "}
              {selectedChartType.charAt(0).toUpperCase() +
                selectedChartType.slice(1)}{" "}
              Activity in {months[selectedMonth]} {selectedYear}
            </h5>
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
              >
                {months.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                value={selectedChartType}
                onChange={(e) =>
                  setSelectedChartType(
                    e.target.value as "blog" | "contact" | "page" | "project"
                  )
                }
                className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
              >
                <option value="blog">Blogs</option>
                <option value="contact">Contacts</option>
                <option value="page">Pages</option>
                <option value="project">Projects</option>
              </select>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            {isLoading ? (
              <div className="flex justify-center items-center h-full animate-pulse">
                <div className="text-center text-gray-500">
                  <Loader className="mx-auto animate-spin mb-2 text-blue-600" />
                  <p className="font-medium">Loading chart data...</p>
                </div>
              </div>
            ) : filteredChartData.length === 0 ||
              filteredChartData.every((entry) => entry.count === 0) ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-3xl mb-2">🕊️</div>
                  <p className="text-gray-500 text-2xl font-medium">
                    No data for this selection
                  </p>
                </div>
              </div>
            ) : (
              <BarChart
                data={filteredChartData}
                margin={{ top: 20, right: 10, left: -30, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0077FF" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#0a1d56" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(dateStr) => {
                    const date = new Date(dateStr);
                    return `${date.toLocaleString("en-US", {
                      month: "short",
                    })} ${date.getDate()}`;
                  }}
                  interval={0}
                  ticks={filteredChartData
                    .filter((_, i) => i % 7 === 0)
                    .map((entry) => entry.date)}
                />
                <YAxis allowDecimals={false} />
                <RechartsTooltip
                  formatter={(value: number) => [
                    `${value} ${selectedChartType}`,
                    selectedChartType,
                  ]}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {filteredChartData.map((entry, index) => {
                    const isToday =
                      new Date(entry.date).toDateString() ===
                      new Date().toDateString();
                    return (
                      <Cell
                        key={index}
                        fill={
                          entry.count === 0
                            ? "#ccc"
                            : isToday
                            ? "#0077FF"
                            : "url(#barGradient)"
                        }
                        fillOpacity={entry.count === 0 ? 0.3 : 1}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
