import React, { useEffect, useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
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
  const markAllAsRead = async () => {
    try {
      await axios.put(
        "http://localhost:3001/api/notifications/mark-all-as-read"
      );
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error("Failed to mark notifications as read", error);
    }
  };

  return (
    <header className="fixed top-0 right-0 z-20 flex items-center justify-between h-16 px-8 py-5 bg-white border-b border-gray-100 ml-64 w-[calc(100%-16rem)]">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-900">{activeRouteName}</h1>
      </div>

      <div className="flex items-center gap-5">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="w-64 h-11 pl-11 pr-4 rounded-full bg-gray-50 border-2 border-gray-200 text-sm text-gray-700 placeholder-gray-400 
                     transition-all duration-200 
                     focus:outline-none focus:border-bimec-green focus:bg-white"
          />
          <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Notifications */}
        <Menu as="div" className="relative">
          <Menu.Button
            onClick={markAllAsRead}
            aria-label="Notifications"
            className="relative w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 text-gray-600
               transition-all duration-200 hover:bg-bimec-light-green hover:text-bimec-green"
          >
            <BellIcon className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="p-4 border-b font-semibold text-gray-800">
                Notifications
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-sm text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((n, idx) => (
                  <div
                    key={idx}
                    className={`px-4 py-2 text-sm border-b cursor-pointer ${
                      n.read ? "text-gray-500" : "text-gray-900 font-semibold"
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
                    {n.message}
                  </div>
                ))
              )}
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
