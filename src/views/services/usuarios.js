// apiUtils.js
import axios from 'axios';

export const deleteItem = async (slug, get_docentes_list, successDeleteDocente, errorDeleteDocente) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    };
    try {
        if (slug) {
            const statusValue = slug.estado == 0 ? 'alta' : 'baja';
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/${slug.rol}/${slug.id}/${statusValue}`, config);
            if (res.status === 200) {
                get_docentes_list();
                const successMessage = res.data.success;
                successDeleteDocente(successMessage);
            } else {
                const errorMessage = res.data.error;
                errorDeleteDocente(errorMessage);
            }
        }
    } catch (err) {
        console.error('Error al enviar:', err);
    }
};

export const guardarInformacion = async (slug, get_docentes_list, successDeleteDocente, errorDeleteDocente) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/create-docentes/store`, slug, config);
        if (res.status === 200) {
            get_docentes_list();
            const successMessage = res.data.success;
            successDeleteDocente(successMessage);
        } else {
            const errorMessage = res.data.error;
            errorDeleteDocente(errorMessage);
        }
    } catch (err) {
        console.error('Error al enviar:', err);
    }
};

export const guardarInfoPersonal = async (slug, get_list, successDeleteDocente, errorDeleteDocente) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/personal-new/store`, slug, config);
        if (res.status === 200) {
            get_list();
            const successMessage = res.data.success;
            successDeleteDocente(successMessage);
        } else {
            const errorMessage = res.data.error;
            errorDeleteDocente(errorMessage);
        }
    } catch (err) {
        console.error('Error al enviar:', err);
    }
};

export const actualizarInformacion = async (slug, get_docentes_list, successDeleteDocente, errorDeleteDocente) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/admin-docentes/${slug.id}/edit`, slug, config);
        if (res.status === 200) {
            get_docentes_list();
            const successMessage = res.data.success;
            successDeleteDocente(successMessage);
        } else {
            const errorMessage = res.data.error;
            errorDeleteDocente(errorMessage);
        }
    } catch (err) {
        console.error('Error al enviar:', err);
    }
};
