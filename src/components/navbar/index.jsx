import React, { useEffect } from "react";
import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { logout, load_user } from "./../../redux/actions/auth/auth";
import { connect } from "react-redux";
import perfilDefault from "assets/img/auth/user.jpg";

const Navbar = ({ onOpenSidenav, brandText, logout, load_user, user }) => {
  const baseURL = process.env.REACT_APP_API_URL;

  const [darkmode, setDarkmode] = React.useState(false);

  const navigate = useNavigate()
 
  useEffect(()=>{
    //check_authenticated()
    load_user()
},[])

    const handleLogout=()=>{
        logout()
        navigate('/')
    }

  return (
    <nav className="sticky top-2 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white" href=" ">
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white" to="#">
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link to="#" className="font-bold capitalize hover:text-navy-700 dark:hover:text-white">
            {brandText}
          </Link>
        </p>
      </div>
      <div className="relative mt-[3px] flex h-[60px] w-[300px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[300px] xl:gap-2">
        <span className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden" onClick={onOpenSidenav}>
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full"
              src={ user&&user.photo ? `${baseURL}/storage/${user.photo}` : perfilDefault}
              alt="Perfil"
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    👋 Hola, {user&&user.name}
                  </p>{" "}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20"/>
              <div className="flex flex-col p-4">
                <a href=" " className="text-sm text-gray-800 dark:text-white hover:dark:text-white">
                  Perfil
                </a>
                <button type="button" onClick={()=>handleLogout()} className="mt-3 text-sm font-medium text-red-500 hover:text-red-500 transition duration-150 ease-out hover:ease-in">
                  Salir
                </button>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

const mapDispatchToProps = {
  logout,
  load_user
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);