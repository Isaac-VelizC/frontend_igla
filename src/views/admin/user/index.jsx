import { useEffect } from "react";
import { connect } from "react-redux";
import { get_estudiantes_list } from "./../../../redux/actions/users/users";
import { rutasTabs } from "routes";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

function Users({ get_estudiantes_list }) {
    
    let location = useLocation();
    useEffect(() => {
        get_estudiantes_list()
    }, [])

    const getDefaultRoute = () => {
        if (window.location.pathname === "/admin/users") {
            return <Navigate to="/admin/users/usuarios" replace />;
        }
    };

    const activeRoute = (routeName) => {
        return location.pathname.includes(routeName);
    };

    return (
        <div>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {rutasTabs.map((route, index) => (
                    <li className="me-2" key={index}>
                        <Link to={`${route.layout}/${route.path}`} 
                            aria-current="page" 
                            className={`${
                                activeRoute(route.path) === true
                                ? "inline-block p-4 text-blue-900 bg-gray-600 rounded-t-lg dark:bg-gray-900 dark:text-blue-600"
                                : "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-600 dark:text-blue-600"
                            }`}>
                            {route.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="mt-5 h-full">
                <Outlet/>
                {getDefaultRoute()}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    estudiantes: state.users.lista_estudiantes,
});

export default connect( mapStateToProps, {
    get_estudiantes_list,
}) (Users);