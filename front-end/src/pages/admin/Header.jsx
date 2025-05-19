import React, { useEffect, useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

function Header() {
  const [user, setUser] = useState({
    firstname: "...",
    lastname: "...",
    role: "...",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Map routes to their corresponding names
  const routeNames = {
    "/admin/appointments": "Appointments",
    "/admin/patients": "Patients",
    "/admin/doctor-schedule": "Schedule",
    "/admin/dashboard": "Dashboard",
    "/admin/departments": "Departments",
    "/admin/doctors": "Doctors",
  };

  const activeRouteName = routeNames[location.pathname] || "Dashboard";

  // get user info
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3001/api/users/user-info",
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/notifications/get-notifications"
        );
        const newNotifications = res.data.filter((n) => !n.read);

        // Show toast ONLY if unread count increased
        if (newNotifications.length > unreadCount) {
          toast.info("You have new notifications");
        }

        setNotifications(res.data);
        setUnreadCount(newNotifications.length);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);
  }, [unreadCount]);

  const handleLogout = () => {
    navigate("/login");
  };

  // handle mark notification as read
  const markAllAsRead = async (e) => {
    e.stopPropagation(); // Prevent menu from closing
    try {
      await axios.put(
        "http://localhost:3001/api/notifications/mark-all-as-read"
      );
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success("Marked all notifications as read");
    } catch (error) {
      console.error("Failed to mark notifications as read", error);
    }
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return '';
    const now = new Date();
    const notifDate = new Date(timestamp);
    const diffMs = now - notifDate;
    
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }
  };

  return (
    <header className="fixed top-0 right-0 z-10 flex items-center justify-between h-16 px-6 py-5 bg-white border-b border-gray-100 ml-50 w-[calc(100%-16rem)]">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-900">{activeRouteName}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Menu as="div" className="relative">
          <Menu.Button
            className="relative w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 text-gray-600
               transition-all duration-200 hover:bg-bimec-light-green hover:text-bimec-green"
          >
            <BellIcon className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full shadow-lg animate-pulse">
                {unreadCount}
              </span>
            )}
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 focus:outline-none overflow-hidden z-50">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-bimec-light-green/30 to-white">
                <h3 className="font-bold text-gray-800 flex items-center">
                  <BellIcon className="w-5 h-5 mr-2 text-bimec-green" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-2 bg-bimec-green text-white text-xs px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </h3>
                <button 
                  onClick={markAllAsRead}
                  className="text-xs font-medium text-bimec-green hover:text-bimec-heavy-green transition-colors flex items-center"
                >
                  <CheckCircleIcon className="w-4 h-4 mr-1" />
                  Mark all as read
                </button>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <BellIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">No notifications yet</p>
                    <p className="text-xs text-gray-400 mt-1">We'll notify you when something arrives</p>
                  </div>
                ) : (
                  <div>
                    {notifications.map((n, idx) => (
                      <div
                        key={idx}
                        className={`px-4 py-3 border-b border-gray-50 cursor-pointer transition-colors hover:bg-gray-50 ${
                          !n.read ? "bg-bimec-light-green/10" : ""
                        }`}
                        onClick={async () => {
                          if (!n.read) {
                            await axios.put(
                              `http://localhost:3001/api/notifications/mark-as-read/${n._id}`
                            );
                            setNotifications((prev) =>
                              prev.map((notif) =>
                                notif._id === n._id
                                  ? { ...notif, read: true }
                                  : notif
                              )
                            );
                            setUnreadCount((prev) => prev - 1);
                          }
                        }}
                      >
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${n.read ? 'bg-gray-200' : 'bg-bimec-green'} mr-3`}></div>
                          <div className="flex-1">
                            <p className={`text-sm ${n.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                              {n.message}
                            </p>
                            <div className="flex items-center mt-1 text-xs text-gray-400">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              <span>{formatTimeAgo(n.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
                <button 
                  onClick={() => navigate('/admin/notifications')}
                  className="text-xs font-medium text-bimec-green hover:text-bimec-heavy-green transition-colors"
                >
                  View all notifications
                </button>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        {/* User Profile Dropdown */}
        {isLoading ? (
          // Loading state
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="flex flex-col">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
            </div>
          </div>
        ) : (
          <Menu as="div" className="relative">
            <Menu.Button className="group flex items-center space-x-3 px-4 py-2 rounded-full bg-gray-50 hover:bg-bimec-light-green transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bimec-green to-bimec-heavy-green flex items-center justify-center text-white font-medium shadow-sm group-hover:shadow-md transition-shadow duration-300">
                {user.firstname ? user.firstname.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  {user.firstname + " " + user.lastname}
                </span>
                <span className="text-xs text-gray-500">{user.role}</span>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-500 group-hover:rotate-180 transition-transform duration-300" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-30">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user.firstname + " " + user.lastname}
                  </p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate("/admin/profile")}
                      className={`flex items-center space-x-3 w-full px-4 py-3 text-sm transition-colors duration-200 ${
                        active
                          ? "bg-bimec-light-green text-bimec-heavy-green"
                          : "text-gray-700"
                      }`}
                    >
                      <UserIcon className="w-5 h-5" />
                      <span>Profile</span>
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate("/admin/settings")}
                      className={`flex items-center space-x-3 w-full px-4 py-3 text-sm transition-colors duration-200 ${
                        active
                          ? "bg-bimec-light-green text-bimec-heavy-green"
                          : "text-gray-700"
                      }`}
                    >
                      <Cog6ToothIcon className="w-5 h-5" />
                      <span>Settings</span>
                    </button>
                  )}
                </Menu.Item>

                <div className="border-t border-gray-100">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`flex items-center space-x-3 w-full px-4 py-3 text-sm transition-colors duration-200 ${
                          active ? "bg-red-50 text-red-600" : "text-gray-700"
                        }`}
                      >
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        )}
      </div>
    </header>
  );
}

export default Header;