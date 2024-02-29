import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';

const FormDialog = ({ visible, onHide, valor, submitted, isCiUnique, isValidCiNew, isTelefonoUnique, isValidEmailNew, isEmailUnique, onInputChange, onGeneroChange, formDialogFooter }) => {

    const baseURL = process.env.REACT_APP_API_URL;
    return (
        <Dialog visible={visible} style={{ width: '60rem' }} breakpoints={{ '960px': '80vw', '600px': '90vw' }} header={`Información ${valor.nombre&&valor.nombre}`} modal className="p-fluid" footer={formDialogFooter} onHide={onHide}>
            {valor.photo && <img className="m-auto rounded-full w-36 h-36" src={`${baseURL}/storage/${valor.photo}`} alt='Foto'/>}
            <div className="grid md:grid-cols-3 md:gap-6">
                <div className="relative z-0 w-full group">    
                    <label className={`block mb-2 text-sm font-medium ${submitted && !valor.nombre ? 'text-red-700 dark:text-red-500' : ''}`}>Nombre</label>
                    <input id='nombre' value={valor.nombre} onChange={(e) => onInputChange(e, 'nombre')} required
                        className={`border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 ${submitted && !valor.nombre ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : ''}`}/>
                    {submitted && !valor.nombre && 
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oops!</span> ¡nombre es requerido!
                    </p>}
                </div>
                <div className="relative z-0 w-full group">
                        <label className={`block mb-2 text-sm font-medium ${submitted && !valor.ap_paterno ? 'text-red-700 dark:text-red-500' : ''}`}>Primer Apellido</label>
                        <InputText id='ap_paterno' value={valor.ap_paterno} onChange={(e) => onInputChange(e, 'ap_paterno')} required
                            className={`border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 ${submitted && !valor.ap_paterno ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : ''}`}/>
                        {submitted && !valor.ap_paterno && 
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Oops!</span> ¡el primer apellido es requerido!
                        </p>}
                    </div>
                    <div className="relative z-0 w-full group">
                        <label className="block mb-2 text-sm font-medium">Segundo Apellido</label>
                        <InputText id='ap_materno' value={valor.ap_materno} onChange={(e) => onInputChange(e, 'ap_materno')}
                            className="border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600"/>
                    </div>
                    <div className="relative z-0 w-full group">
                        <label className={`block mb-2 text-sm font-medium ${submitted && !valor.ci ? 'text-red-700 dark:text-red-500' : ''}`}>Cedula de Identidad</label>
                        <InputText id='ci' value={valor.ci} onChange={(e) => onInputChange(e, 'ci')} required minLength={7} 
                            className={`border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 ${submitted && !valor.ci ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : ''}`}/>
                        {!isCiUnique && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> ¡La cedula de identida ya está registrado!</p>}
                        {!isValidCiNew && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> ¡La cedula de identida no es valida!</p>}
                        {submitted && !valor.ci && 
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Oops!</span> ¡el CI es requerido!
                        </p>}
                    </div>
                    <div className="relative z-0 w-full group">
                        <label className={`block mb-2 text-sm font-medium ${submitted && !valor.telefono ? 'text-red-700 dark:text-red-500' : ''}`}>Telefono</label>
                        <InputText id='telefono' value={valor.telefono} onChange={(e) => onInputChange(e, 'telefono')} required
                            className={`border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 ${submitted && !valor.telefono ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : ''}`}/>
                        {!isTelefonoUnique && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> ¡El telefono ya está registrado!</p>}
                        {submitted && !valor.telefono && 
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Oops!</span> ¡el telefono es requerido!
                        </p>}
                    </div>
                    <div className='relative z-0 w-full group'>
                        <label className="block mb-2 text-sm font-medium">Genero</label>
                        <div className='flex'>
                            <div className="flex items-center me-4">
                                <RadioButton inputId="Hombre" name="genero" value="Hombre" onChange={onGeneroChange} checked={valor.genero === 'Hombre'} />
                                <label htmlFor="hombre" className="ml-2">Hombre</label>
                            </div>
                            <div className="flex items-center me-4">
                                <RadioButton inputId="Mujer" name="genero" value="Mujer" onChange={onGeneroChange} checked={valor.genero === 'Mujer'} />
                                <label htmlFor="mujer" className="ml-2">Mujer</label>
                            </div>
                            <div className="flex items-center me-4">
                                <RadioButton inputId="Otro" name="genero" value="Otro" onChange={onGeneroChange} checked={valor.genero === 'Otro'} />
                                <label htmlFor="otro" className="ml-2">Otro</label>
                            </div>
                        </div>
                        {submitted && !valor.genero && 
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Oops!</span> ¡Por favor selecciona un genero!
                        </p>}
                    </div>
                    <div className="relative z-0 w-full group">
                        <label className={`block mb-2 text-sm font-medium ${submitted && !valor.email ? 'text-red-700 dark:text-red-500' : ''}`}>Correo Electronico</label>
                        <InputText id='email' typeof='email' value={valor.email} onChange={(e) => onInputChange(e, 'email')} required
                            className={`border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 ${submitted && !valor.email ? 'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : ''}`} />
                        {submitted && !valor.email && 
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Oops!</span> ¡El correo electrónico es requerido!
                        </p>}
                        {!isValidEmailNew && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> ¡Por favor, ingresa un correo electrónico valido!</p>}
                        {!isEmailUnique && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> ¡El correo electrónico ya está registrado!</p>}
                    </div>
            </div>
        </Dialog>
    );
};

export default FormDialog;
