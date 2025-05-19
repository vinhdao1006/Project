import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Admin_ava from "@/assets/image/admin_ava.png";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Search,
  Users,
  Stethoscope,
  CalendarCheck,
  BedDouble,
  TrendingUp,
  Activity,
  ClipboardList,
  Clock,
  Calendar,
} from "lucide-react";
import SideBar from "./SideBar";
import Header from "./Header";

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-12 min-h-screen max-w-screen bg-gray-50">
      {/* Sidebar */}
      <div className="col-span-2">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="col-span-10">
        <Header />
        <main className="pt-16 flex flex-col mt-7">
          <div className="p-8 flex-1 m-auto">
            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Patients Card */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Total Patients
                      </p>
                      <h3 className="text-3xl font-bold text-gray-900">965</h3>
                      <p className="text-xs text-green-600 mt-2 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        <span>5.2% from last month</span>
                      </p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Appointments Card */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Appointments
                      </p>
                      <h3 className="text-3xl font-bold text-gray-900">128</h3>
                      <p className="text-xs text-green-600 mt-2 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        <span>12% from last week</span>
                      </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <CalendarCheck className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bedrooms Card */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Bed Rooms
                      </p>
                      <h3 className="text-3xl font-bold text-gray-900">315</h3>
                      <div className="flex mt-2 items-center">
                        <div className="flex-1 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-purple-600 h-full rounded-full"
                            style={{ width: "78%" }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600 ml-2">
                          78%
                        </span>
                      </div>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <BedDouble className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Doctors Card */}
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Doctors
                      </p>
                      <h3 className="text-3xl font-bold text-gray-900">45</h3>
                      <p className="text-xs text-bimec-green mt-2 flex items-center">
                        <span>8 specialists available today</span>
                      </p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <Stethoscope className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="border-none shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">
                        Patient Overview
                      </h3>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8"
                        >
                          Weekly
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 bg-bimec-light-green text-bimec-green border-none"
                        >
                          Monthly
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 h-56">
                    {/* Chart placeholder */}
                    <div className="w-full h-full bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-10 h-10 text-gray-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">
                        Revenue Analytics
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8"
                      >
                        View Report
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 h-56">
                    {/* Chart placeholder */}
                    <div className="w-full h-full bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-10 h-10 text-gray-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Schedule & Reports */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Doctors' Schedule */}
              <Card className="border-none shadow-md">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">
                        Doctors' Schedule
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8 text-bimec-green"
                      >
                        View All
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 space-y-4 h-72 overflow-auto">
                    {/* Schedule items */}
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-50"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bimec-green to-bimec-heavy-green flex items-center justify-center text-white font-medium text-xs mr-3">
                          DS
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">
                            Dr. Sarah Johnson
                          </h4>
                          <p className="text-xs text-gray-500">Cardiologist</p>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>09:00 AM</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reports */}
              <Card className="border-none shadow-md">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">
                        Recent Reports
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8 text-bimec-green"
                      >
                        Download All
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 space-y-4 h-72 overflow-auto">
                    {/* Report items */}
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-50"
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                          <ClipboardList className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">
                            Monthly Patient Report
                          </h4>
                          <p className="text-xs text-gray-500">
                            Generated on May 12, 2025
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                        >
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Appointments Calendar */}
              <Card className="border-none shadow-md">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">
                        Upcoming Appointments
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8 text-bimec-green"
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        Calendar
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 space-y-3 h-72 overflow-auto">
                    {/* Calendar items */}
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="p-3 border border-gray-100 rounded-lg hover:border-bimec-green/30 hover:bg-bimec-light-green/10 transition-colors"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium bg-bimec-light-green text-bimec-green px-2 py-0.5 rounded">
                            {item === 1 ? "Today" : "Tomorrow"}
                          </span>
                          <span className="text-xs text-gray-500">
                            10:30 AM
                          </span>
                        </div>
                        <h4 className="text-sm font-medium">James Wilson</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Stethoscope className="w-3 h-3 mr-1" />
                          <span>General Checkup</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
