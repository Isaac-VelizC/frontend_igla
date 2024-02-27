import Dashboard from "views/admin/Home";
import {
  MdOutlineHome,
  MdCalendarMonth,
  MdPayment,
  MdOutlinePeople,
  MdOutlineFileOpen,
  MdOutlineList,
  MdNoMeals,
  MdOutlineTask,
  MdSubject,
  MdLock
} from "react-icons/md";
import Users from "views/admin/user";
import Materia from "views/admin/Materia";
import Payment from "views/admin/Pay";
import Reports from "views/admin/reports";
import Calendary from "views/admin/calendar";
import Inventary from "views/admin/inventary";
import Recipe from "views/admin/recipe";
import EvaluacionDocente from "views/admin/EvalDocente";
import Login from "views/auth/login";
import Usuarios from "views/admin/user/usuarios";
import Estudiantes from "views/admin/user/estudiantes";
import Docentes from "views/admin/user/docentes";
import Personal from "views/admin/user/personal";

const routes = [
  {
    name: "Panel Adminsitrador",
    layout: "/admin",
    path: "home",
    icon: <MdOutlineHome className="h-6 w-6"/>,
    component: <Dashboard/>,
  },
  {
    name: "Usuarios",
    layout: "/admin",
    path: "users",
    icon: <MdOutlinePeople className="h-6 w-6" />,
    component: <Users/>,
  },
  {
    name: "Materias",
    layout: "/admin",
    path: "materias",
    icon: <MdSubject className="h-6 w-6" />,
    component: <Materia/>,
  },
  {
    name: "Pagos",
    layout: "/admin",
    path: "pagos",
    icon: <MdPayment className="h-6 w-6" />,
    component: <Payment/>,
  },
  {
    name: "Reportes",
    layout: "/admin",
    path: "reportes",
    icon: <MdOutlineFileOpen className="h-6 w-6" />,
    component: <Reports/>,
  },
  {
    name: "Calendario Academico",
    layout: "/admin",
    path: "calendario",
    icon: <MdCalendarMonth className="h-6 w-6" />,
    component: <Calendary/>,
  },
  {
    name: "Evaluacion Docente",
    layout: "/admin",
    path: "evaluacion-Docente",
    icon: <MdOutlineTask className="h-6 w-6" />,
    component: <EvaluacionDocente/>,
  },
  {
    name: "Inventario Ingredientes",
    layout: "/admin",
    path: "inentary",
    icon: <MdOutlineList className="h-6 w-6" />,
    component: <Inventary/>,
  },
  {
    name: "Recetas",
    layout: "/admin",
    path: "recets",
    icon: <MdNoMeals className="h-6 w-6" />,
    component: <Recipe/>,
  },
  {
    name: "Login",
    layout: "/auth",
    path: "login",
    icon: <MdLock className="h-6 w-6" />,
    component: <Login />,
  },
]

const rutasTabs = [
  /**TABS DE USUARIOS */
  {
    name: "Usuarios",
    layout: "/admin",
    path: "users/usuarios",
    component: <Usuarios />,
  },
  {
    name: "Estudiantes",
    layout: "/admin",
    path: "users/estudiantes",
    component: <Estudiantes />,
  },
  {
    name: "Docentes",
    layout: "/admin",
    path: "users/docentes",
    component: <Docentes />,
  },
  {
    name: "Personal",
    layout: "/admin",
    path: "users/personal",
    component: <Personal />,
  },
  /**FIN TABS DE USUARIOS */
]

export { routes, rutasTabs };