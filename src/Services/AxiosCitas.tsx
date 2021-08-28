
import axios from 'axios';
import VariableGlobal from './VariableGlobal'

export default class AxiosCitas {
    static instanceAxios = axios.create({
        baseURL: VariableGlobal.baseURL,
    });

    static agendarCita = (cita:any) => {
        return AxiosCitas.instanceAxios.post(`/agendarCita`, cita);
    }

    static getCitasPaciente = (filter:any) => {
        return AxiosCitas.instanceAxios.post(`/getCitasPaciente`, filter);
    }

    static getCitaByID = (filter:any) => {
        return AxiosCitas.instanceAxios.post(`/getCitaByID`, filter);
    }

    static getCitasMedico = (filter:any) => {
        return AxiosCitas.instanceAxios.post(`/getCitasMedico`, filter);
    }

    static reangedarCancelarCita = (cita:any) => {
        return AxiosCitas.instanceAxios.post(`/reangedarCancelarCita`, cita);
    }

    static getCitasReporte(filtro:any){
        return AxiosCitas.instanceAxios.post(`/getCitasReporte`, filtro);
    }

    static almacenar_informacion_cita = (informacion_cita:any) => {
        return AxiosCitas.instanceAxios.post(`/almacenar_cita`, informacion_cita);
    }

    static actualizar_cita = (informacion_cita:any) => {
        return AxiosCitas.instanceAxios.post(`/actualizar_cita`, informacion_cita);
    }

    static getCitasCuidador = (filter: any) => {
        return AxiosCitas.instanceAxios.post(`/getCitasCuidador`, filter);
    }
    static citas_recordatorios_medico = (cedula:any) => {
        return AxiosCitas.instanceAxios.post(`/citas_recordatorios_medico`, cedula);
    }

    static citas_recordatorios_paciente = (cedula:any) => {
        return AxiosCitas.instanceAxios.post(`/citas_recordatorios_paciente`, cedula);
    }

    static citas_recordatorios_cuidador = (cedula:any) => {
        return AxiosCitas.instanceAxios.post(`/citas_recordatorios_cuidador`, cedula);
    }

    static guardar_cita2 = (info:any) => {
        return AxiosCitas.instanceAxios.post(`/guardar_cita2`, info);
    }

}