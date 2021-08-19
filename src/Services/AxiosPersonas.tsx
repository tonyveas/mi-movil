import axios from 'axios';
import VariableGlobal from './VariableGlobal'

export default class AxiosPersonas {
    static instanceAxios = axios.create({
        baseURL: VariableGlobal.baseURL,
    });

    static getPacientesFilter = (filtro:any) => {
        return AxiosPersonas.instanceAxios.post(`/getPacientesFilter`, filtro);
    }

    static getPacientesCuidadorFilter = (filtro:any) => {
        return AxiosPersonas.instanceAxios.post(`/getPacientesCuidadorFilter`, filtro);
    }

    static getMedicosFilter = (filtro:any) => {
        return AxiosPersonas.instanceAxios.post(`/getMedicosFilter`, filtro);
    }

    static getCuidadoresFilter = (filtro:any) => {
        return AxiosPersonas.instanceAxios.post(`/getCuidadoresFilter`, filtro);
    }

    static getCuidadoresPacienteFilter = (filtro:any) => {
        return AxiosPersonas.instanceAxios.post(`/getCuidadoresPacienteFilter`, filtro);
    }

    static savePacienteAsociadoCuidador = (reg:any) => {
        return AxiosPersonas.instanceAxios.post(`/savePacienteAsociadoCuidador`, reg);
    }

    static deletePacienteAsociadoCuidador = (reg : any) => {
        return AxiosPersonas.instanceAxios.post(`/deletePacienteAsociadoCuidador`, reg);
    }
    
    static pacientes_cuidador = (info:any) => {
        return AxiosPersonas.instanceAxios.post(`/pacientes_cuidador`, info);
    }
    
    static pacientes_asociar = () => {
        return AxiosPersonas.instanceAxios.get(`/pacientes_asociar`);
    }

    static cuidadores_asociar = () => {
        return AxiosPersonas.instanceAxios.get(`/cuidadores_asociar`);
    }

    static cuidadores_paciente = (info:any) => {
        return AxiosPersonas.instanceAxios.post(`/cuidadores_paciente`, info);
    }

}