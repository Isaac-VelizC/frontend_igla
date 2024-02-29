import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux';
import { get_personal_list } from "./../../../redux/actions/users/users";
import { MdImportExport } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { Dialog } from 'primereact/dialog';
import { Toast } from "primereact/toast";
import axios from 'axios';
import { Button } from 'primereact/button';
import { deleteItem, guardarInfoPersonal, actualizarInformacion } from './../../services/usuarios';
import FormDialog from 'components/dialog/dialogForm';


function Personal({ get_personal_list, personals }) {
    let emptypersonals = {
        id: null,
        nombre: '',
        ap_paterno: '',
        ap_materno: '',
        ci: '',
        telefono: null,
        rol: '',
        genero: '',
        photo: null,
        email: '',
        estado: '',
    };

    const [loading, setLoading] = useState(true);
    const [personalDialog, setPersonalDialog] = useState(false);
    const [deletePersonalDialog, setDeletePersonalDialog] = useState(false);
    const [personal, setPersonal] = useState(emptypersonals);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [isEmailUnique, setIsEmailUnique] = useState(true);
    const [isCiUnique, setIsCiUnique] = useState(true);
    const [isTelefonoUnique, setIsTelefonoUnique] = useState(true);
    const [isValidEmailNew, setIsValidEmailNew] = useState(true);
    const [isValidCiNew, setIsValidCiNew] = useState(true);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        get_personal_list();
    }, []);

    const openNew = () => {
        setPersonal(emptypersonals);
        setSubmitted(false);
        setPersonalDialog(true);
    };

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmailNew(emailPattern.test(email));
        return emailPattern.test(email);
    };

    const isValidCi = (ci) => {
        const ciPattern = /^[0-9]{7,10}[a-zA-Z]*$/;
        const isValid = ciPattern.test(ci);
        setIsValidCiNew(isValid);
        return isValid;
    };    

    const checkEmailUniqueness = async (email, id) => {
        try {
            let idUser = id !== null && id !== undefined ? id : 0;
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/check-email-unique/${email}/${idUser}`);
            setIsEmailUnique(response.data.unique);
        } catch (error) {
            setIsEmailUnique(true);
        }
    };

    const checkCiUniqueness = async (ci, id) => {
        try {
            let idUser = id !== null && id !== undefined ? id : 0;
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/check-ci-unique/${ci}/${idUser}`);
            setIsCiUnique(response.data.unique);
        } catch (error) {
            setIsCiUnique(true);
        }
    };

    const checkTelefonoUniqueness = async (telefono, id) => {
        try {
            let idUser = id !== null && id !== undefined ? id : 0;
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/check-telefono-unique/${telefono}/${idUser}`);
            setIsTelefonoUnique(response.data.unique);
        } catch (error) {
            setIsTelefonoUnique(true);
        }
    };

    const onGeneroChange = (e) => {
        let _product = { ...personal };

        _product['genero'] = e.value;
        setPersonal(_product);
    };

    const hideDialog = () => {
        setIsEmailUnique(true);
        setIsValidEmailNew(true);
        setIsCiUnique(true);
        setIsValidCiNew(true);
        setIsTelefonoUnique(true);
        setSubmitted(false);
        setPersonalDialog(false);
    };

    const confirmDeletepersonal = (personal) => {
        setPersonal(personal);
        setDeletePersonalDialog(true);
    };

    const hideDeletePersonalDialog = () => {
        setDeletePersonalDialog(false);
    };

    const editpersonal = (personal) => {
        setPersonal({ ...personal });
        setPersonalDialog(true);
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };
    const nombreCompletoBodyTemplate = (rowData) => {
        let segundo = rowData.ap_materno !== null && rowData.ap_materno !== undefined ? ' ' + rowData.ap_materno : '';
        return rowData.nombre + ' ' + rowData.ap_paterno + segundo;
    };    
    const statusBodyTemplate = (rowData) => {
        switch (rowData.estado) {
            case 0:
                return <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">Inactivo</span>
                ;
            case 1:
                return <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Activo</span>
                ;
            default:
                return null;
        }
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <button title='Editar' type="button" onClick={() => editpersonal(rowData)}
                className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-4 mb-1 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
                    <CiEdit/>
                </button>
                <button title='Borrar' type="button" onClick={() => confirmDeletepersonal(rowData)}
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-4 mb-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    <CiTrash/>
                </button>
            </>
        );
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _personal = { ...personal };
        _personal[`${name}`] = val;
        setPersonal(_personal);
    };
    

    const header = (
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <div className='text-2xl font-semibold text-gray-900 dark:text-white space-x-4' >
            <span>Lista de personals</span>
                <button type="button" 
                    className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                    onClick={exportCSV}>
                    <MdImportExport/>
                </button>
            </div>
            <label className="sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                    </svg>
                </div>
                <input type='search' onInput={(e) => setGlobalFilter(e.target.value)} className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por elementos"/>
            </div>
        </div>
    );
    const mensajeNull = (
        <div className="text-1xl py-6 text-center text-gray-600 dark:text-white">
            {loading ? (
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
            ) : (
                <p>No hay datos de personals</p>
            )}
        </div>
    );
    
    const deletePersonalDialogFooter = (
        <>
        <button type="button" onClick={hideDeletePersonalDialog}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                No
        </button>
        <button type="button" onClick={(e) => onSubmitDelete(e, personal)}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Si
        </button>
        </>
    );

    const savepersonal = async (e) => {
        try {
            setSubmitted(true);
            if (isValidEmail(personal.email)) {
                await checkEmailUniqueness(personal.email, personal.id);
            } else {
                setIsEmailUnique(false);
            }
            if (isValidCi(personal.ci)) {
                await checkCiUniqueness(personal.ci, personal.id);
            } else {
                setIsCiUnique(false);
            }
            await checkTelefonoUniqueness(personal.telefono, personal.id);
            if (isEmailUnique && isCiUnique && isTelefonoUnique) {
                if (personal.id && personal.id > 0) {
                    await onSubmitActualizar(e, personal);
                } else if (personal.id === null) {
                    await onSubmitGuardar(e, personal)
                } else {
                    throw new Error('Error al guardar la información');
                }
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al guardar la información', life: 3000 });
        }
    };

    const onSubmitGuardar = (e, slug) => {
        e.preventDefault();
        guardarInfoPersonal(slug, get_personal_list, successDeletepersonal, errorDeletepersonal);
    };

    const onSubmitActualizar = (e, slug) => {
        e.preventDefault();
        actualizarInformacion(slug, get_personal_list, successDeletepersonal, errorDeletepersonal);
    };

    const personalDialogFooter = (
        <>
            <Button label="Cancela" className='h-10' outlined onClick={hideDialog} />
            <Button label="Guardar" className='h-10' onClick={savepersonal}/>
        </>
    );

    const onSubmitDelete = (e, slug) => {
        e.preventDefault();
        deleteItem(slug, get_personal_list, successDeletepersonal, errorDeletepersonal);
    };
    
    const successDeletepersonal = (message) => {
        hideDialog();
        setDeletePersonalDialog(false);
        setPersonal(emptypersonals);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
    };
    
    const errorDeletepersonal = (message) => {
        setDeletePersonalDialog(false);
        setPersonal(emptypersonals);
        toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    };
    
    return (
        <div>
            <Toast ref={toast} />
            <div className="relative px-5 overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-end py-10">
                    <button type="button" onClick={openNew} className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Nuevo personal
                    </button>
                </div>
                <DataTable ref={dt} value={personals} paginator rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    globalFilter={globalFilter}
                    header={header}
                    emptyMessage={mensajeNull}
                >
                    <Column field="nombre" header="Nombre Completo" 
                        body={nombreCompletoBodyTemplate} sortable style={{ minWidth: '18rem' }}
                    ></Column>
                    <Column field="ci" header="Cedula" sortable style={{ minWidth: '10rem' }}
                    ></Column>
                    <Column field="telefono" header="Telefono" sortable style={{ minWidth: '10rem' }}
                    ></Column>
                    <Column field="role" header="Rol" sortable style={{ minWidth: '8rem' }}
                    ></Column>
                    <Column field="estado" header="Estado" body={statusBodyTemplate} sortable style={{ minWidth: '6rem' }}
                    ></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
            <FormDialog
                visible={personalDialog}
                onHide={() => setPersonalDialog(false)}
                valor={personal}
                submitted={submitted}
                isCiUnique={isCiUnique}
                isValidCiNew={isValidCiNew}
                isTelefonoUnique={isTelefonoUnique}
                isValidEmailNew={isValidEmailNew}
                isEmailUnique={isEmailUnique}
                onInputChange={onInputChange}
                onGeneroChange={onGeneroChange}
                formDialogFooter={personalDialogFooter}
            />

            <Dialog visible={deletePersonalDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confimación" modal footer={deletePersonalDialogFooter} onHide={hideDeletePersonalDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {personal && (
                        <span>
                            ¿Estás seguro de que quiere dar de {personal.estado == 1 ? 'baja' : 'alta'} a <b>{personal.nombre + ' ' + personal.ap_paterno}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

const mapStateToProps = state => ({
    personals: state.users.lista_personal
});

export default connect(mapStateToProps, {
    get_personal_list,
}) (Personal)