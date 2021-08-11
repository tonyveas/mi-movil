import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosExamenes {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });


  static almacenar_examen = async (firma:any) => {
    try {
      const response = await axios
        .post(VariableGlobal.baseURL_upload_images, firma, {
          headers: { 'content-type': 'multipart/form-data' }
        });
      console.log("Response examen: ", response);
      return response;
    } catch (err) {
      console.log("err: ", err);
      return err;
    }
  }

  static almacenar_informacion_examen = (informacion_examen:any) => {
    return AxiosExamenes.instanceAxios.post(`/saveImages`, informacion_examen);
  }

  static almacenar_examenes_cita_paciente = (examenes:any, info:any) => {
    return AxiosExamenes.instanceAxios.post(`/almacenar_examenes_cita_paciente`, examenes, info);
  }

}