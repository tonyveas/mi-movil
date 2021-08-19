import axios from 'axios';
import VariableGlobal from './VariableGlobal'

export default class AxiosUsers {
    static instanceAxios = axios.create({
        baseURL: VariableGlobal.baseURL,
    });

    static login = (credenciales:any) => {
        return AxiosUsers.instanceAxios.post(`/login`, credenciales);
    }

    static mostrar_usuarios = () => {
        return AxiosUsers.instanceAxios.get(`/mostrar_usuarios`);
    }

    static deshabilitar_usuario = (usuario:any) => {
        return AxiosUsers.instanceAxios.post(`/deshabilitar_usuario`, usuario);
    }

    static obtener_usuario_por_cedula = (cedula:any) => {
        return AxiosUsers.instanceAxios.post(`/obtener_usuario_por_cedula`, cedula);
    }

    static actualizar_usuario_administrador = (user:any) => {
        return AxiosUsers.instanceAxios.post(`/actualizar_usuario_administrador`, user);
    }

    static obtener_perfil_por_cedula = (cedula:any) => {
        return AxiosUsers.instanceAxios.post(`/obtener_perfil_por_cedula`, cedula);
    }

    static actualizar_perfil = (perfil:any) => {
        return AxiosUsers.instanceAxios.post(`/actualizar_perfil`, perfil);
    }

    static mostrar_pacientes = () => {
        return AxiosUsers.instanceAxios.get(`/mostrar_pacientes`);
    }

    static mostrar_informacion_expediente = (cedula:any) => {
        return AxiosUsers.instanceAxios.post(`/mostrar_informacion_expediente`, cedula);
    }

    static mostrar_informacion_cita_paciente = (info:any) => {
        return AxiosUsers.instanceAxios.post(`/mostrar_informacion_cita_paciente`, info);
    }

    static informacion = (info:any) => {
        return AxiosUsers.instanceAxios.post(`/informacion`, info);
    }

    static info_paciente = (cedula:any) => {
        return AxiosUsers.instanceAxios.get(`/info_paciente/${cedula}`);
    }

    static usuarios = (info:any) => {
        return AxiosUsers.instanceAxios.post(`/usuarios`,info);
    }

    static pacientes = (info:any) => {
        return AxiosUsers.instanceAxios.post(`/pacientes`,info);
    }

}