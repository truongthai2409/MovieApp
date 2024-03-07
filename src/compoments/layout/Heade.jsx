import { NavLink } from "react-router-dom";

const Heade = () => {
    return (
        <header className="flex items-center justify-center py-10 mb-5 text-white header gap-x-5">
            <NavLink to ='/MovieApp' className={({ isActive }) => (isActive ? "text-primary" : "")}>Home</NavLink>
            <NavLink to ='/MovieApp/movie' className={({ isActive }) => (isActive ? "text-primary" : "")}>Movie</NavLink>
        </header>
    );
};

export default Heade;