import InputField from "components/fields/InputFiles";
import Checkbox from "components/checkbox";
import { useState } from "react";
import { login } from "./../../redux/actions/auth/auth";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Auth({ login, isAuthenticated }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { username, password } = formData;
  const navigate = useNavigate()

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(username, password)
    if (isAuthenticated) {
      navigate("/"); // Redirigir a la página principal
    }
  }

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <form onSubmit={e=>{onSubmit(e)}} method="POST">
        
        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
        Instituto Técnico IGLA
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
            Inicie sesión para mantenerse conectado.
        </p>
        <input type="hidden" name="remember" defaultValue="true" />
        {/* Email */}
        <InputField
          onChange={e=>onChange(e)}
          required={true}
          name="username"
          value={username}
          variant="auth"
          extra="mb-3"
          label="Usuario*"
          id="username"
          type="text"
        />
        {/* Password */}
        <InputField
          onChange={e=>onChange(e)}
          required={true}
          name="password"
          value={password}
          variant="auth"
          extra="mb-3"
          label="Contraseña*"
          placeholder="Min. 8 caracteres"
          id="password"
          type="password"
        />
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Mantenme conectado
            </p>
          </div>
          <a className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white" href=" ">
            ¿Has olvidado tu contraseña?
          </a>
        </div>
        <button type="submit" className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Iniciar Sesión
        </button>
      </div>
      </form>
    </div>
  );
}

const mapStateToProps=state=>({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})

export default connect(mapStateToProps,{
  login
}) (Auth)