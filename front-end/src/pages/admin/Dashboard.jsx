import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Admin_ava from "@/assets/image/admin_ava.png";
import { Button } from "@/components/ui/button";
import { CalendarDays, Search, Users, Stethoscope, CalendarCheck, BedDouble } from "lucide-react";
import SideBar from './SideBar';

const AdminDashboard = () => {
    const [user, setUser] = useState({ name: "..." });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3001/user-info', {
          method: 'GET',
          credentials: 'include', 
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data);
        } 
        else {   
            console.error("Failed to fetch user info:", response.statusText);
        }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    fetchUserData();
  }, []);

  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="col-span-2 bg-white shadow-lg p-4 space-y-4">
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="col-span-10 p-6 space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <input type="text" placeholder="Search anything" className="w-1/3 border rounded px-4 py-2" />
            <div className="flex items-center space-x-4">
                <img src={Admin_ava} alt="Admin" className="w-10 h-10 rounded-full" />
                <span className="font-bold">{user.firstname + " " + user.lastname}</span>
            </div>
        </div>

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
                <div className="text-sm text-gray-500">Consultants</div>
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