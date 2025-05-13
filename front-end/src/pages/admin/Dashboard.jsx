import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Admin_ava from "@/assets/image/admin_ava.png";
import { Button } from "@/components/ui/button";
import { CalendarDays, Search, Users, Stethoscope, CalendarCheck, BedDouble } from "lucide-react";
import SideBar from './SideBar';
import Header from './Header';

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="col-span-2 bg-white shadow-lg p-4 space-y-4">
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="col-span-10 p-6 space-y-6">
        <Header />
        
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center space-x-4 p-4">
              <Users className="text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Total Patients</div>
                <div className="text-xl font-semibold">965</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4 p-4">
              <CalendarCheck className="text-green-600" />
              <div>
                <div className="text-sm text-gray-500">Appointments</div>
                <div className="text-xl font-semibold">128</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4 p-4">
              <BedDouble className="text-purple-600" />
              <div>
                <div className="text-sm text-gray-500">Bed Rooms</div>
                <div className="text-xl font-semibold">315</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4 p-4">
              <Stethoscope className="text-red-600" />
              <div>
                <div className="text-sm text-gray-500">Doctors</div>
                <div className="text-xl font-semibold">45</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder for charts and appointments */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="h-64">{/* Chart: Patient Overview */}</Card>
          <Card className="h-64">{/* Chart: Revenue */}</Card>
        </div>

        {/* Schedule & Reports */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="h-80">{/* Doctors' Schedule */}</Card>
          <Card className="h-80">{/* Reports */}</Card>
          <Card className="h-80">{/* Appointments Calendar */}</Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;