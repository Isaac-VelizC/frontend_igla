import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux';
import { get_user_list } from "./../../../redux/actions/users/users";
import { MdImportExport } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import { Dialog } from 'primereact/dialog';
import { Toast } from "primereact/toast";
import { deleteItem } from './../../services/usuarios';

function Usuarios({ get_user_list, users }) {
    let emptyUsers = {
        id: null,
        nombre: '',
        ap_paterno: '',
        ap_materno: '',
        ci: '',
        telefono: 0,
        role: '',
        rol: '',
        genero: '',
        photo: null,
        email: '',
        estado: '',
    };

    const [loading, setLoading] = useState(true);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    //const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [user, setUser] = useState(emptyUsers);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        get_user_list();
    }, []);

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
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
            <button title='Borrar' type="button" onClick={() => confirmDeleteUser(rowData)}
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-4 mb-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                <CiTrash/>
            </button>
        );
    };
    const header = (
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <div className='text-2xl font-semibold text-gray-900 dark:text-white space-x-4' >
            <span>Lista de Usuarios</span>
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
                <p>No hay datos de usuarios</p>
            )}
        </div>
    );
    
    const deleteProductDialogFooter = (
        <>
        <button type="button" onClick={hideDeleteUserDialog}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                No
        </button>
        <button type="button" onClick={(e) => onSubmitDelete(e, user)}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Si
        </button>
        </>
    );

    const onSubmitDelete = (e, slug) => {
        e.preventDefault();
        deleteItem(slug, get_user_list, successDeleteUser, errorDeleteUser);
    };
    
    const successDeleteUser = (message) => {
        setDeleteUserDialog(false);
        setUser(emptyUsers);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
    };
    
    const errorDeleteUser = (message) => {
        setDeleteUserDialog(false);
        setUser(emptyUsers);
        toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    };
    
    
    return (
        <div>
            <Toast ref={toast} />
            <div className="relative px-5 overflow-x-auto shadow-md sm:rounded-lg">
                <DataTable
                    ref={dt}
                    value={users}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    globalFilter={globalFilter}
                    header={header}
                    emptyMessage={mensajeNull}
                >
                    <Column field="nombre" header="Nombre Completo" 
                        body={nombreCompletoBodyTemplate} sortable 
                        style={{ minWidth: '18rem' }}
                    ></Column>
                    <Column field="ci" header="Cedula" sortable 
                        style={{ minWidth: '10rem' }}
                    ></Column>
                    <Column field="telefono" header="Telefono" sortable 
                        style={{ minWidth: '10rem' }}
                    ></Column>
                    <Column field="role" header="Rol" sortable 
                        style={{ minWidth: '8rem' }}
                    ></Column>
                    <Column field="estado" header="Estado" body={statusBodyTemplate} sortable 
                        style={{ minWidth: '6rem' }}
                    ></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
            <Dialog visible={deleteUserDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confimación" modal footer={deleteProductDialogFooter} onHide={hideDeleteUserDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && (
                        <span>
                            ¿Estás seguro de que quiere dar de {user.estado == 1 ? 'baja' : 'alta'} a <b>{user.nombre + ' ' + user.ap_paterno}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

const mapStateToProps = state => ({
    users: state.users.user_list,
});

export default connect(mapStateToProps, {
    get_user_list,
}) (Usuarios)