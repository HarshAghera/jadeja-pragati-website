import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { FileText, CheckCircle, XCircle, Mail, Loader } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface BlogType {
  _id: string;
  title: string;
  createdAt: string;
  deletedAt?: string;
  isPublished: boolean;
  author?: {
    name: string;
  };
}

type Activity = {
  id: string;
  title: string;
  author?: string;
  type: "created" | "deleted";
  time: string;
  source: "blog" | "contact";
};

const Dashboard: React.FC = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [unpublishedCount, setUnpublishedCount] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [activityChartData, setActivityChartData] = useState<
    { date: string; count: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

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

        const { value } = await blogResp.json();
        const blogs: BlogType[] = value.data;
        const total = value.total;
        const published = blogs.filter((b) => b.isPublished).length;
        const unpublished = total - published;

        const now = new Date();
        const dailyCount: Record<string, number> = {};
        for (let i = 0; i < days; i++) {
          const d = new Date(now);
          d.setDate(now.getDate() - i);
          const str = d.toLocaleDateString("en-CA");
          dailyCount[str] = 0;
        }

        const recent: Activity[] = [];
        blogs.forEach((blog) => {
          const createdDate = new Date(blog.createdAt);
          const createdStr = createdDate.toLocaleDateString("en-CA");
          if (dailyCount[createdStr] !== undefined) dailyCount[createdStr]++;

          const hoursSinceCreated =
            (now.getTime() - createdDate.getTime()) / 36e5;
          if (hoursSinceCreated <= 24) {
            recent.push({
              id: blog._id,
              title: blog.title,
              author: blog.author?.name,
              type: "created",
              time: blog.createdAt,
              source: "blog",
            });
          }

          if (blog.deletedAt) {
            const deletedDate = new Date(blog.deletedAt);
            const hoursSinceDeleted =
              (now.getTime() - deletedDate.getTime()) / 36e5;
            if (hoursSinceDeleted <= 24) {
              recent.push({
                id: blog._id,
                title: blog.title,
                author: blog.author?.name,
                type: "deleted",
                time: blog.deletedAt,
                source: "blog",
              });
            }
          }
        });

        const chartData = Object.keys(dailyCount)
          .sort()
          .map((date) => ({ date, count: dailyCount[date] }));

        interface ContactType {
          _id: string;
          name: string;
          email: string;
          createdAt: string;
        }

        const contactsResp = await fetch(`${API_BASE_URL}/contacts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!contactsResp.ok) throw new Error("Contacts fetch failed");

        const { value: contactsValue } = await contactsResp.json();
        const contactsTotal = Array.isArray(contactsValue)
          ? contactsValue.length
          : contactsValue?.value?.length || contactsValue.length || 0;

        const recentContacts: Activity[] = [];

        if (Array.isArray(contactsValue)) {
          (contactsValue as ContactType[]).forEach((contact) => {
            const contactDate = new Date(contact.createdAt);
            const hoursSinceContact =
              (now.getTime() - contactDate.getTime()) / 36e5;

            if (hoursSinceContact <= 24) {
              recentContacts.push({
                id: contact._id,
                title: contact.name,
                author: contact.email,
                type: "created",
                time: contact.createdAt,
                source: "contact",
              });
            }
          });
        }

        const combinedActivities = [...recent, ...recentContacts].sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        setTotalCount(total);
        setPublishedCount(published);
        setUnpublishedCount(unpublished);
        setRecentActivities(combinedActivities);
        setActivityChartData(chartData);
        setTotalContacts(contactsTotal);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setTotalCount(0);
        setPublishedCount(0);
        setUnpublishedCount(0);
        setRecentActivities([]);
        setActivityChartData([]);
        setTotalContacts(0);
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

  const filteredChartData = activityChartData.filter((item) => {
    const date = new Date(item.date);
    return (
      date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
    );
  });

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
      label: "Unpublished Blogs",
      value: unpublishedCount,
      icon: (
        <div className="bg-red-100 p-3 rounded-full mb-2">
          <XCircle className="w-6 h-6 text-red-500" />
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
  ];

  const pieData = [
    { name: "Published", value: publishedCount },
    { name: "Unpublished", value: unpublishedCount },
  ];
  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <motion.div
      className="px-2 sm:px-4 md:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-8"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={fadeIn}
          className="bg-white border rounded-xl p-6 shadow-md"
        >
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h5 className="text-base font-semibold text-gray-800">
              📊 Blogs Created in {months[selectedMonth]} {selectedYear}
            </h5>

            <div className="flex gap-3">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
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
                className="border rounded px-2 py-1 text-sm"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
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
              <div className="flex items-center justify-center h-full animate-pulse">
                <div className="text-center">
                  <div className="text-3xl mb-2">🕊️</div>
                  <p className="text-gray-500 text-2xl font-medium">
                    No blogs were created in this month
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
                    const day = date.getDate();
                    const month = date.toLocaleString("en-US", {
                      month: "long",
                    });
                    return `${month} ${day}`;
                  }}
                  interval={0}
                  ticks={filteredChartData
                    .filter((_, i) => i % 7 === 0)
                    .map((entry) => entry.date)}
                />
                <YAxis allowDecimals={false} />
                <RechartsTooltip
                  formatter={(value: number) =>
                    value === 0
                      ? "No Blogs"
                      : [`${value} Blog${value > 1 ? "s" : ""}`]
                  }
                  labelFormatter={(value) => {
                    const d = new Date(value);
                    return d.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });
                  }}
                />
                <Bar
                  dataKey="count"
                  radius={[6, 6, 0, 0]}
                  animationDuration={1000}
                  isAnimationActive
                >
                  {filteredChartData.map((entry, index) => {
                    const barDate = new Date(entry.date);
                    const today = new Date();
                    const isToday =
                      barDate.getDate() === today.getDate() &&
                      barDate.getMonth() === today.getMonth() &&
                      barDate.getFullYear() === today.getFullYear();
                    const isWeekend =
                      barDate.getDay() === 0 || barDate.getDay() === 6;

                    let fill = "url(#barGradient)";
                    if (entry.count === 0) {
                      fill = "#ccc";
                    } else if (isToday) {
                      fill = "#0077FF";
                    } else if (isWeekend) {
                      fill = "#FF9F1C";
                    }

                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={fill}
                        fillOpacity={entry.count === 0 ? 0.3 : 1}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white border rounded-xl p-6 shadow-md"
        >
          <h5 className="text-base font-semibold text-gray-800 mb-4">
            🥧 Blog Publish Distribution
          </h5>
          <ResponsiveContainer width="100%" height={250}>
            {isLoading ? (
              <div className="flex justify-center items-center h-full animate-pulse">
                <div className="text-center text-gray-500">
                  <Loader className="mx-auto animate-spin mb-2 text-purple-600" />
                  <p className="font-medium">Loading chart data...</p>
                </div>
              </div>
            ) : (
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${
                      typeof percent === "number"
                        ? (percent * 100).toFixed(0)
                        : "0"
                    }%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1000}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        variants={fadeIn}
        className="bg-white border border-gray-200 rounded-xl pl-2 pr-4 sm:pr-10 py-6 shadow-lg"
      >
        <h3 className="text-gray-800 font-semibold mb-4 text-sm sm:text-lg flex items-center gap-2">
          <span className="text-indigo-600 text-base sm:text-xl">🕒</span>
          <span className="leading-tight">Recent Activity (Last 24 hrs)</span>
        </h3>

        {isLoading ? (
          <ul className="space-y-3 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <li key={i}>
                <div className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                    <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                </div>
              </li>
            ))}
          </ul>
        ) : recentActivities.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <div className="text-3xl mb-2">💤</div>
            <p className="font-medium text-lg">No recent activity found</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {recentActivities.map((activity, i) => (
              <motion.li
                key={activity.id + activity.time}
                variants={fadeIn}
                custom={i * 0.1}
              >
                <div className="flex sm:hidden justify-between items-center text-xs bg-gray-50 border border-gray-200 px-3 py-2 rounded-md">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 truncate max-w-[160px]">
                      {activity.title}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-0.5 rounded-full font-semibold ${
                          activity.source === "blog"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {activity.source.toUpperCase()}
                      </span>
                      <span
                        className={`flex items-center gap-1 font-medium ${
                          activity.type === "created"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {activity.type === "created" ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-red-500" />
                        )}
                        {activity.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-500 ml-2 whitespace-nowrap">
                    {new Date(activity.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="hidden sm:flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center bg-gray-50 hover:bg-indigo-100/20 hover:shadow-md hover:scale-[1.01] transition-all duration-300 p-4 rounded-lg border border-gray-200 hover:border-indigo-300">
                  <div className="text-sm text-gray-800 space-y-1 sm:space-y-0 sm:space-x-3 sm:flex sm:items-center flex-wrap">
                    <span className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                      {activity.title}
                    </span>

                    {activity.author && (
                      <span className="text-gray-500 sm:inline block text-xs">
                        by {activity.author}
                      </span>
                    )}

                    <span className="flex items-center gap-1 text-xs font-medium text-gray-700">
                      {activity.type === "created" ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-red-500" />
                      )}
                      <span
                        className={`${
                          activity.type === "created"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {activity.type.toUpperCase()}
                      </span>
                    </span>

                    <span
                      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                        activity.source === "blog"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {activity.source.toUpperCase()}
                    </span>
                  </div>

                  <span className="text-xs text-gray-500 sm:ml-2 sm:mt-0 mt-1">
                    {new Date(activity.time).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
