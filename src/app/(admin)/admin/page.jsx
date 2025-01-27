import { BsThreeDots } from "react-icons/bs";
import { FiSearch, FiRefreshCw } from "react-icons/fi";
import { IoExportOutline } from "react-icons/io5";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-8">
      <div className="bg-white rounded-3xl p-6 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-semibold">Sales Overview</h1>
            <nav className="flex gap-6">
              <button className="px-4 py-2 bg-black text-white rounded-full">
                Overview
              </button>
              <button className="px-4 py-2">Performance</button>
              <button className="px-4 py-2">Activity</button>
              <button className="px-4 py-2">Product</button>
              <button className="px-4 py-2">Task</button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FiSearch className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FiRefreshCw className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-200" />{" "}
            {/* Avatar placeholder */}
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-black text-white rounded-full">
              Summary
            </button>
            <button className="px-4 py-2">Insight</button>
            <button className="px-4 py-2">Service</button>
            <button className="px-4 py-2">Analytic</button>
            <button className="px-4 py-2">Target</button>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
              <IoExportOutline className="w-5 h-5" />
              Export Data
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <BsThreeDots className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
            <h3 className="text-lg mb-4">Overall Revenue</h3>
            <p className="text-4xl font-bold mb-2">$25,912</p>
            <p className="text-sm opacity-80">Than last month</p>
          </div>

          {/* Total Insight Card */}
          <div className="bg-white border border-gray-200 p-6 rounded-2xl">
            <h3 className="text-lg mb-4">Total Insight</h3>
            <p className="text-4xl font-bold mb-2">129,521</p>
            <p className="text-sm text-red-500">Than last month</p>
          </div>

          {/* Finance Balance Card */}
          <div className="bg-white border border-gray-200 p-6 rounded-2xl">
            <h3 className="text-lg mb-4">Finance Balance</h3>
            <p className="text-4xl font-bold mb-2">$9,421,642</p>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-full w-2/3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Sales Summary Chart */}
          <div className="bg-white border border-gray-200 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Sales Summary</h3>
              <div className="flex gap-2">
                <select className="px-3 py-1 border rounded-lg">
                  <option>This Year</option>
                </select>
                <select className="px-3 py-1 border rounded-lg">
                  <option>Summary</option>
                </select>
                <button className="p-1 hover:bg-gray-100 rounded-lg">
                  <BsThreeDots className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg">
              {/* Add your preferred chart library here */}
            </div>
          </div>

          {/* Sales Category Chart */}
          <div className="bg-white border border-gray-200 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Sales Category</h3>
              <button className="p-1 hover:bg-gray-100 rounded-lg">
                <BsThreeDots className="w-5 h-5" />
              </button>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              {/* Add your preferred chart library here */}
              <div className="text-center">
                <p className="text-4xl font-bold">8,214</p>
                <p className="text-gray-500">Product sales</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
