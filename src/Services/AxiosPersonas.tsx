import axios from 'axios';
import VariableGlobal from './VariableGlobal'

export default class AxiosPersonas {
    static instanceAxios = axios.create({
        baseURL: VariableGlobal.baseURL,
    });

    static getPacientesFilter = (filtro:any) => {
        return AxiosPersonas.instanceAxios.post(`/getPacientesFilter`, filtro);
    }

    static getMedicosFilter = (filtro:any) => {
        return AxiosPersonas.instanceAxios.post(`/getMedicosFilter`, filtro);
    }
}