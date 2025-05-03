import { NavLink } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="text-2xl font-bold text-bimec-heavy-green">BIMEC</div>
            <nav className="space-y-2 grid grid-cols-1 mt-8 gap-1">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "text-bimec-green font-bold"
                            : "text-bimec-black hover:text-bimec-green hover:font-bold"
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/admin/appointments"
                    className={({ isActive }) =>
                        isActive
                            ? "text-bimec-green font-bold"
                            : "text-bimec-black hover:text-bimec-green hover:font-bold"
                    }
                >
                    Appointments
                </NavLink>
                <NavLink
                    to="/admin/patients"
                    className={({ isActive }) =>
                        isActive
                            ? "text-bimec-green font-bold"
                            : "text-bimec-black hover:text-bimec-green hover:font-bold"
                    }
                >
                    Patients
                </NavLink>
                <NavLink
                    to="/admin/doctors"
                    className={({ isActive }) =>
                        isActive
                            ? "text-bimec-green font-bold"
                            : "text-bimec-black hover:text-bimec-green hover:font-bold"
                    }
                >
                    Doctors
                </NavLink>
                <NavLink
                    to="/admin/departments"
                    className={({ isActive }) =>
                        isActive
                            ? "text-bimec-green font-bold"
                            : "text-bimec-black hover:text-bimec-green hover:font-bold"
                    }
                >
                    Departments
                </NavLink>
                <NavLink
                    to="/admin/schedule"
                    className={({ isActive }) =>
                        isActive
                            ? "text-bimec-green font-bold"
                            : "text-bimec-black hover:text-bimec-green hover:font-bold"
                    }
                >
                    Schedule
                </NavLink>
                <NavLink
                    to="/admin/payments"
                    className={({ isActive }) =>
                        isActive
                            ? "text-bimec-green font-bold"
                            : "text-bimec-black hover:text-bimec-green hover:font-bold"
                    }
                >
                    Payments
                </NavLink>
                <NavLink
                    to="/admin/inventory"
                    className={({ isActive }) =>
                        isActive
                            ? "text-bimec-green font-bold"
                            : "text-bimec-black hover:text-bimec-green hover:font-bold"
                    }
                >
                    Inventory
                </NavLink>
                <NavLink
                    to="/admin/personal-info"
                    className={({ isActive }) =>
                        isActive
                            ? "text-bimec-green font-bold"
                            : "text-bimec-black hover:text-bimec-green hover:font-bold"
                    }
                >
                    Personal Information
                </NavLink>
            </nav>
        </div>
    );
};

export default SideBar;