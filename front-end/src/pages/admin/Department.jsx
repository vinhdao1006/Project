import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import SideBar from "./SideBar";
import axios from "axios";

const DepartmentCard = ({ title, description, image, users }) => (
  <Card className="w-full max-w-sm">
    <CardHeader>
      <img src={image} alt={title} className="rounded-md w-full h-40 object-cover" />
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <Button size="sm">See Detail</Button>
    </CardContent>
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
    <div className="grid grid-cols-12 min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="col-span-2 bg-white shadow-lg p-4 space-y-4">
        <SideBar />
      </aside>

      {/* Scrollable Content */}
      <ScrollArea className="col-span-10 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Departments</h2>

        {/* Show loading spinner or message */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <DepartmentCard
                key={index}
                title={dept.name}
                description={dept.description}
                image={dept.image}
                users={dept.users || 0} // Default to 0 if users are not provided
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default DepartmentsPage;