import Footer from "components/footer/Footer";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { routes } from "routes";
import User from "views/admin/user";
import Docentes from "views/admin/user/docentes";
import Estudiantes from "views/admin/user/estudiantes";
import Personal from "views/admin/user/personal";
import Usuarios from "views/admin/user/usuarios";

export default function Admin(props) {
    const { ...rest } = props;
    const location = useLocation();
    const [ open, setOpen ] = React.useState(true);
    const [currentRoute, setCurrentRoute] = React.useState("Dashboard");

    React.useEffect(() => {
        window.addEventListener("resize", () =>
            window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
        );
    })

    React.useEffect(() => {
        getActiveRoute(routes);
    }, [location.pathname]);

    const getActiveRoute = (routes) => {
        let activeRoute = "Pagina Principal";
        for (let i = 0; i < routes.length; i++) {
          if (
            window.location.href.indexOf(
              routes[i].layout + "/" + routes[i].path
            ) !== -1
          ) {
            setCurrentRoute(routes[i].name);
          }
        }
        return activeRoute;
      };
    const getActiveNavbar = (routes) => {
        let activeNavbar = false;
        for (let i = 0; i < routes.length; i++) {
          if (
            window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
          ) {
            return routes[i].secondary;
          }
        }
        return activeNavbar;
      };
      const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin" && prop.path === "users") {
                return (
                    <Route key={key} path={`/${prop.path}`} element={prop.component}>
                        <Route path="usuarios" element={<Usuarios />} />
                        <Route path="estudiantes" element={<Estudiantes />} />
                        <Route path="docentes" element={<Docentes />} />
                        <Route path="personal" element={<Personal />} />
                    </Route>
                );
            } else if (prop.layout === "/admin") {
                return (
                    <Route key={key} path={`/${prop.path}`} element={prop.component} />
                );
            } else {
                return null;
            }
        });
    };
    

      document.documentElement.dir = "ltr";

    return (
        <div className="felx h-full w-full">
            <Sidebar open={open} onClose={() => setOpen(false)} />
            <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
                <main className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[300px]`}>
                    <div className="h-full">
                        <Navbar
                            onOpenSidenav={() => setOpen(true)}
                            logoText={"React JS"}
                            brandText={currentRoute}
                            secondary={getActiveNavbar(routes)}
                            {...rest}
                        />
                        <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                            <Routes>
                                {getRoutes(routes)}
                                <Route path="/" element={<Navigate to="/" />} />
                            </Routes>
                        </div>
                        <div className="p-3">
                            <Footer/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}