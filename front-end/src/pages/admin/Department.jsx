import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SideBar from "./SideBar";
import axios from "axios";
import Header from "./Header";
import { Users, ArrowRight, Building2, Loader2 } from "lucide-react";

// Modernized Department Card component
const DepartmentCard = ({ title, description, image }) => (
  <Card className="overflow-hidden border-none shadow-sm transition-all duration-300 hover:shadow-md group relative">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
      <img src={image} alt={title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
      </div>
    </div>
    <div className="p-5">
      <p className="text-sm text-gray-600 h-16 overflow-hidden mb-3">{description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-500">
          <Users className="w-4 h-4 mr-1" />
          <span>10+ specialists</span>
        </div>
        <Button size="sm" className="bg-bimec-green hover:bg-bimec-heavy-green gap-1 rounded-lg text-xs h-8 px-3 group-hover:gap-2 transition-all duration-300">
          <span>View Details</span>
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
    </div>
  </Card>
);

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch departments from the API
    axios
      .get("http://localhost:3001/api/specialties")
      .then((response) => {
        setDepartments(response.data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="col-span-2">
        <SideBar />
      </div>

      {/* Main Content */}
      <main className="col-span-10 flex flex-col">
        <Header />
        
        {/* Content Container */}
        <div className="p-8 pt-6 flex-1">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-bimec-green" />
                Departments
              </h1>
              <p className="text-sm text-gray-500 mt-1">Browse and manage hospital departments</p>
            </div>
            <Button className="bg-bimec-green hover:bg-bimec-heavy-green rounded-lg">
              Add Department
            </Button>
          </div>
          
          {/* Departments Grid */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-bimec-green animate-spin" />
                <p className="text-sm text-gray-500">Loading departments...</p>
              </div>
            </div>
          ) : departments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl p-8 border border-gray-100">
              <Building2 className="w-16 h-16 text-gray-200 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">No departments found</h3>
              <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
                There are no departments available at the moment. Try adding a new department to get started.
              </p>
              <Button className="bg-bimec-green hover:bg-bimec-heavy-green rounded-lg">
                Add First Department
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {departments.map((dept, index) => (
                <DepartmentCard
                  key={index}
                  title={dept.name}
                  description={dept.description}
                  image={dept.image || "https://placehold.co/600x400/e6e7ee/818283?text=Department+Image"}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DepartmentsPage;