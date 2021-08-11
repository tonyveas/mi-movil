import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosMedicamentos {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static mostrar_medicamentos = () => {
    return AxiosMedicamentos.instanceAxios.get(`/mostrar_medicamentos`);
  }

  static almacenar_medicamentos_cita_paciente = (informacion_medicamentos:any) => {
    return AxiosMedicamentos.instanceAxios.post(`/almacenar_medicamentos_cita_paciente`, informacion_medicamentos);
  }

  static almacenar_medicamento = (medicamento:any) => {
    return AxiosMedicamentos.instanceAxios.post(`/almacenar_medicamento`, medicamento);
  }

  static eliminar_medicamento = (id_medicamento:any) => {
    return AxiosMedicamentos.instanceAxios.delete(`/eliminar_medicamento/${id_medicamento}`);
  }

  static obtener_medicamento_por_id = (id:any) => {
    return AxiosMedicamentos.instanceAxios.get(`/obtener_medicamento_por_id/${id}`);
  }

  static actualizar_medicamento = (medicamento:any) => {
    return AxiosMedicamentos.instanceAxios.post(`/actualizar_medicamento`, medicamento);
  }

  static buscar_medicamentos = (nombre: any) => {
    return AxiosMedicamentos.instanceAxios.get(`/buscar_medicamentos/${nombre}`);
  }

  static medicamentos = (info:any) => {
    return AxiosMedicamentos.instanceAxios.post(`/medicamentos`, info);
  }

}