import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosEnfermedadesHereditarias {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static almacenar_enfermedades_hereditarias_paciente = (enfermedades:any) => {
    return AxiosEnfermedadesHereditarias.instanceAxios.post(`/almacenar_enfermedades_hereditarias_paciente`, enfermedades);
  }

}