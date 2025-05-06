import { NavLink } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="text-2xl font-bold text-bimec-heavy-green">BIMEC</div>
            <nav className="space-y-2 grid grid-cols-1 mt-8 gap-1">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded ${
                            isActive
                                ? "text-bimec-green font-bold bg-bimec-light-green"
                                : "text-bimec-black hover:text-bimec-green hover:border-bimec-green"
                        }`
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/admin/appointments"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded  ${
                            isActive
                                ? "text-bimec-green font-bold  bg-bimec-light-green"
                                : "text-bimec-black  hover:text-bimec-green hover:border-bimec-green"
                        }`
                    }
                >
                    Appointments
                </NavLink>
                <NavLink
                    to="/admin/patients"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded  ${
                            isActive
                                ? "text-bimec-green font-bold  bg-bimec-light-green"
                                : "text-bimec-black  hover:text-bimec-green hover:border-bimec-green"
                        }`
                    }
                >
                    Patients
                </NavLink>
                <NavLink
                    to="/admin/doctors"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded  ${
                            isActive
                                ? "text-bimec-green font-bold  bg-bimec-light-green"
                                : "text-bimec-black  hover:text-bimec-green hover:border-bimec-green"
                        }`
                    }
                >
                    Doctors
                </NavLink>
                <NavLink
                    to="/admin/departments"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded  ${
                            isActive
                                ? "text-bimec-green font-bold  bg-bimec-light-green"
                                : "text-bimec-black  hover:text-bimec-green hover:border-bimec-green"
                        }`
                    }
                >
                    Departments
                </NavLink>
                <NavLink
                    to="/admin/doctor-schedule"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded  ${
                            isActive
                                ? "text-bimec-green font-bold  bg-bimec-light-green"
                                : "text-bimec-black  hover:text-bimec-green hover:border-bimec-green"
                        }`
                    }
                >
                    Doctor's Schedule
                </NavLink>
            </nav>
        </div>
    );
};

export default SideBar;