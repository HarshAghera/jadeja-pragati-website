// src/pages/Dashboard.tsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Briefcase,
  CheckCircle,
  Clock,
  ClipboardList,
  TrendingUp,
  UserCircle,
  Calendar,
} from 'lucide-react';

interface ActivityItem {
  title: string;
  user: string;
  tag: string;
  date: string;
  tagColor: string;
}

interface CompletionDataItem {
  name: string;
  completed: number;
}

interface TeamStat {
  name: string;
  projectsCompleted: number;
}

const Dashboard: React.FC = () => {
  const activity: ActivityItem[] = [
    {
      title: 'Project "Modern Office Building" updated',
      user: 'Admin User',
      tag: 'Status change',
      date: 'Today at 10:30 AM',
      tagColor: 'bg-green-100 text-green-800',
    },
    {
      title: 'New project "Shopping Mall Renovation" added',
      user: 'Admin User',
      tag: 'New project',
      date: 'Yesterday at 2:45 PM',
      tagColor: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'About Us page content updated',
      user: 'Admin User',
      tag: 'Content update',
      date: 'April 17, 2025',
      tagColor: 'bg-purple-100 text-purple-800',
    },
  ];

  const completionData: CompletionDataItem[] = [
    { name: 'Jan', completed: 2 },
    { name: 'Feb', completed: 1 },
    { name: 'Mar', completed: 3 },
    { name: 'Apr', completed: 2 },
    { name: 'May', completed: 4 },
  ];

  const progressValue = 70;

  const teamStats: TeamStat[] = [
    { name: 'Harsh Aghera', projectsCompleted: 5 },
    { name: 'Smit Aghera', projectsCompleted: 3 },
    { name: 'Meet Padaliya', projectsCompleted: 4 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-[#0a1d56]">
        Welcome to Admin Dashboard!
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition-all">
          <p className="text-gray-500 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-red-400" /> Total Projects
          </p>
          <h3 className="text-3xl font-bold text-[#0a1d56] mt-1">10</h3>
          <a href="#" className="text-[#0a1d56] text-sm mt-2 inline-block">
            View all
          </a>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition-all">
          <p className="text-gray-500 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" /> Completed Projects
          </p>
          <h3 className="text-3xl font-bold text-green-600 mt-1">6</h3>
          <a href="#" className="text-[#0a1d56] text-sm mt-2 inline-block">
            View all
          </a>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition-all">
          <p className="text-gray-500 flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-500" /> In Progress Projects
          </p>
          <h3 className="text-3xl font-bold text-yellow-500 mt-1">3</h3>
          <a href="#" className="text-[#0a1d56] text-sm mt-2 inline-block">
            View all
          </a>
        </div>
      </div>

      {/* Completion Trends */}
      <div className="bg-white p-6 rounded-2xl shadow-md border mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#0a1d56]">
          <ClipboardList className="text-[#0a1d56]" /> Project Completion Trends
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={completionData}>
            <XAxis dataKey="name" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip />
            <Bar dataKey="completed" fill="#0a1d56" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Overall Progress */}
      <div className="bg-white p-6 rounded-2xl shadow-md border mb-10">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#0a1d56]">
          <TrendingUp className="text-[#0a1d56]" /> Overall Project Progress
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
          <div
            className="h-full bg-[#0a1d56] transition-all"
            style={{ width: `${progressValue}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">{progressValue}% Completed</p>
      </div>

      {/* Team Member Stats */}
      <div className="bg-white p-6 rounded-2xl shadow-md border mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#0a1d56]">
          <UserCircle className="text-[#0a1d56]" /> Team Member Stats
        </h3>
        <div className="space-y-4">
          {teamStats.map((teamMember, idx) => (
            <div
              key={idx}
              className="flex justify-between p-4 rounded-2xl shadow-md bg-gray-50 border"
            >
              <p className="text-[#0a1d56] font-semibold">{teamMember.name}</p>
              <p className="text-gray-600">Projects Completed: {teamMember.projectsCompleted}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#0a1d56]">
        <ClipboardList className="text-[#0a1d56]" /> Recent Activity
      </h3>
      <div className="space-y-4">
        {activity.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center border hover:shadow-lg transition-all"
          >
            <div>
              <p className="text-[#0a1d56] font-semibold">{item.title}</p>
              <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                <UserCircle className="w-4 h-4 text-gray-400" /> {item.user}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-3 md:mt-0">
              <span className={`text-xs px-3 py-1 rounded-full ${item.tagColor}`}>
                {item.tag}
              </span>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
