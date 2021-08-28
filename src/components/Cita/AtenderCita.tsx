import { IonPage, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonRow, IonGrid, IonCol, IonItem, IonLabel, IonList, IonInput, IonText, IonTextarea, IonButton, IonRouterLink, IonAlert, IonLoading, useIonViewWillLeave, useIonViewWillEnter, IonIcon, IonDatetime, IonSelect, IonSelectOption, IonRadioGroup, IonCardContent, IonListHeader, IonRadio, IonHeader, IonItemDivider,IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle} from '@ionic/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import {eye, eyeOff, heartOutline, home, imagesOutline, informationOutline, medkit, micOutline, removeCircle, removeCircleOutline, trash} from 'ionicons/icons';
import AxiosUsers from '../../Services/AxiosUsers';
import AxiosRoles from '../../Services/AxiosRoles';
// import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
// import { CameraResultType, CameraSource, CameraPhoto } from "@capacitor/core";
import '../../../src/components/style.css';
import moment from 'moment';
import { IonBadge, IonSegment, IonSegmentButton } from '@ionic/react';
import AxiosDiscapacidades from '../../Services/AxiosDiscapacidades';
import AxiosMedicamentos from '../../Services/AxiosMedicamentos';
import AxiosEnfermedades from '../../Services/AxiosEnfermedades';
import AxiosExamenes from '../../Services/AxiosExamenes';
import AxiosPersonas from '../../Services/AxiosPersonas';
import AxiosCitas from '../../Services/AxiosCitas';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThermometerQuarter,faWeight, faRulerVertical, faMale, 
        faLungs, faHeartbeat, faFileMedicalAlt, faDiagnoses, 
        faPercent, faHandHoldingHeart, faFileMedical} from '@fortawesome/free-solid-svg-icons';
import { number } from 'yargs';

        

const AtenderCita = (props:any) => {

    // let imagePicker : ImagePicker;

    
    // const getPictures = () => {
    //     let options: ImagePickerOptions = {  
    //           quality: 100,  
    //           width: 600,  
    //           height: 600,  
    //           outputType: 1,  
    //           maximumImagesCount: 8
    //         }; 
        
    //      imagePicker.getPictures(options)
    //           .then(selectedImg => { })
    //     }
    


    const [mostrarLoad, setMostrarLoad] = React.useState(false);
    const [alergia, setAlergia] = React.useState(false);
    const [listaRoles, setListaRoles] = React.useState([]);
    const [passwordMode, setPasswordMode] = React.useState(true);
    const [passwordModeConfirm, setPasswordModeConfirm] = React.useState(true);
    const [discapacidad, setDiscapacidad] = React.useState(false);
    const [discapacidadesSeleccionadas, setDiscapacidadesSeleccionadas] = React.useState(new Array<any>());
    const [discapacidadesAgregadas, setDiscapacidadesAgregadas] = React.useState(new Array<any>());
    const [valoresDiscapacidadesAgregadas, setValoresDiscapacidadesAgregadas] = React.useState(new Array<any>());
    const [instrucciones, setInstrucciones] = React.useState("");
    const [tratamiento, setTratamiento] = React.useState("");

    const [valoresNombresAgregadas, setValoresNombresAgregadas] = React.useState(new Array<any>());
    const [valoresCantidadesAgregadas, setValoresCantidadesAgregadas] = React.useState(new Array<any>());
    const [valoresUnidadesAgregadas, setValoresUnidadesAgregadas] = React.useState(new Array<any>());

    const [valoresMedicamentosAgregadas, setValoresMedicamentosAgregadas] = React.useState(new Array<any>());
    const [valoresDosisAgregadas, setValoresDosisAgregadas] = React.useState(new Array<any>());
    const [valoresFrecuenciasAgregadas, setValoresFrecuenciasAgregadas] = React.useState(new Array<any>());
    const [valoresDuracionesAgregadas, setValoresDuracionesAgregadas] = React.useState(new Array<any>());


    const [alergiasSeleccionadas, setAlergiasSeleccionadas] = React.useState(new Array <any>());
    const [medicamentosSeleccionadas, setMedicamentosSeleccionadas] = React.useState([]);

    const [alergiasAgregadas, setAlergiasAgregadas] = React.useState(new Array<any>());
    const [medicamentosAgregadas, setMedicamentosAgregadas] = React.useState(new Array<any>());

    const [valoresAlergiasAgregadas, setValoresAlergiasAgregadas] = React.useState(new Array<any>());


    // const [Seleccionadas, setAlergiasSeleccionadas] = React.useState([]);
    const [signosAgregadas, setSignosAgregadas] = React.useState(new Array<any>());
    const [valoresSignosAgregadas, setValoresSignosAgregadas] = React.useState(new Array<any>());

    const [enfermedadesPersistentesSeleccionadas, setEnfermedadesPersistentesSeleccionadas] = React.useState(new Array<any>());
    const [enfermedadesHereditariasSeleccionadas, setEnfermedadesHereditariasSeleccionadas] = React.useState(new Array<any>());
    const [enfermedadesDiagnosticoSeleccionadas, setEnfermedadesDiagnosticoSeleccionadas] = React.useState(new Array<any>());

    const [indexDisc, setIndexDisc] = React.useState(0);
    const [indexAlergi, setIndexAlergi] = React.useState(0);
    const [indexSigno, setIndexSigno] = React.useState(0);
    const [indexMedi, setIndexMedi] = React.useState(0);


    const [estatura, setEstatura] = React.useState(0);
    const [unidadEstatura, setUnidadEstatura] = React.useState("");

    const [peso, setPeso] = React.useState(0);
    const [unidadPeso, setUnidadPeso] = React.useState("");

    const [masaCorporal, setMasaCorporal] = React.useState(0);
    const [unidadMasaCorporal, setUnidadMasaCorporal] = React.useState("");

    const [porcentaje, setPorcentaje] = React.useState(0);
    const [unidadPorcentaje, setUnidadPorcentaje] = React.useState("");

    const [masaMuscular, setMasaMuscular] = React.useState(0);
    const [unidadMasaMuscular, setUnidadMasaMuscular] = React.useState("");

    const [tensionArterial, setTensionArterial] = React.useState(0);
    const [unidadTensionArterial, setUnidadTensionArterial] = React.useState("");

    const [frecuenciaCardiaca, setFrecuenciaCardiaca] = React.useState(0);
    const [unidadFrecuenciaCardiaca, setUnidadFrecuenciaCardiaca] = React.useState("");

    const [frecuenciaRespiratoria, setFrecuenciaRespiratoria] = React.useState(0);
    const [unidadFrecuenciaRespiratoria, setUnidaFrecuenciaRespiratoria] = React.useState("");

    const [saturacion, setSaturacion] = React.useState(0);
    const [unidadSaturacion, setUnidadSaturacion] = React.useState("");

    const [temperatura, setTemperatura] = React.useState(0);
    const [unidadTemperatura, setUnidadTemperatura] = React.useState("");

    const [diagnostico, setDiagnostico] = React.useState("");

    const [fileList, setFileList] = React.useState(new Array<any>());
    // (key: string) => (obj: Record<string, any>) => obj[key]
    const [cedula, setCedula] = React.useState("");
    const [nombre, setNombre] = React.useState("");
    const [correo, setCorreo] = React.useState("");
    const [apellido, setApellido] = React.useState("");
    const [fechaNacimiento, setFechaNacimiento] = React.useState("");
    const [sexo, setSexo] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [passwordActual, setPasswordActual] = React.useState("");
    const [passwordNuevo, setPasswordNuevo] = React.useState("");
    const [estado, setEstado] = React.useState("");
    const [idRol, setidRol] = React.useState("");
    const [usuario, setUsuario] = React.useState({});
    const [cambiarPassword, setCambiarPassword] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const [mensaje, setMensaje] = React.useState("");
    const [mostrarConfirmacion, setMostrarConfirmacion] = React.useState(false);
    const [mostrarConfirmacionEliminar, setMostrarConfirmacionEliminar] = React.useState(false);
    const [cargando, setCargando] = React.useState(false);
    const [camposIncompletos, setCamposIncompletos] = React.useState(false);
    const [incompletos, setIncompletos] = React.useState(false);
    const [alerta, setAlerta] = React.useState(false);
    const [alertaEliminar, setAlertaEliminar] = React.useState(false);
    const [actualPage, setActualPage] = React.useState(0);
    const [discapacidades, setDiscapacidades] = React.useState([]);
    const [medicamentos, setMedicamentos] = React.useState([]);
    const [enfermedades, setEnfermedades] = React.useState([]);
    const [observaciones, setObservaciones] = React.useState(""); 
    const [cedulaMedico, setCedulaMedico] = React.useState("");
    const [cedulaPaciente, setCedulaPaciente] = React.useState("");
    const [paciente, setPaciente] = React.useState([]);
    const [cuidadoresDePaciente, setCuidadoresDePaciente] = React.useState([]);

    const {ced} = useParams<{ced:string}>();
    const {id} = useParams<{id:string}>();

    useIonViewWillEnter(() => {
        //console.log('ionViewWillEnter event fired');
        mostrar_roles();
        obtener_perfil_por_cedula();
        mostrar_discapacidades();
        mostrar_medicamentos();
        mostrar_enfermedades();
        informacion();
    });

    const mostrar_enfermedades = () => {
        AxiosEnfermedades.mostrar_enfermedades().then( res => {
            setEnfermedades(res.data);
            console.log("E:",res.data);
        });
    }

    const mostrar_discapacidades = () => {
        AxiosDiscapacidades.mostrar_discapacidades().then((res)=>{
            setDiscapacidades(res.data)
            console.log(res.data);
        })
    }

    const mostrar_medicamentos = () => {
        AxiosMedicamentos.mostrar_medicamentos().then( res => {
            setMedicamentos(res.data);
            console.log(res.data);
        });
    }

    const siguiente = () => {
        setActualPage(actualPage + 1);
    }

    const anterior = () => {
        setActualPage(actualPage - 1);
    }

    const obtener_perfil_por_cedula = () => {
        let data = {"ced": ced}
        AxiosUsers.obtener_perfil_por_cedula(data).then( response => {
            setUsuario(response.data);
            setUsername(response.data.usuario);
            setCedula(response.data.cedula);
            setNombre(response.data.nombre);
            setApellido(response.data.apellido);
            setFechaNacimiento(response.data.fecha_nacimiento);
            setCorreo(response.data.correo);
            setSexo(response.data.sexo);
            setCargando(false);
        });  
      }

    const mostrar_roles = () => {
        AxiosRoles.mostrar_roles().then((res)=>{
          console.log(res.data);
          setListaRoles(res.data);
        })
    }

    const cambiar_contraseña = (e:any) => {
        setCambiarPassword(e.target.value);
    }

    const actualizar_perfil = () => {

        let u = {
            cedula: ced,
            password_nuevo: passwordNuevo,
            password_actual: passwordActual,
            nombre: nombre,
            apellido: apellido,
            fecha_nacimiento: fechaNacimiento,
            sexo: sexo,
            cambiar:cambiarPassword
        }
        AxiosUsers.actualizar_perfil(u).then ( response => {
            console.log("actualizar_perfil: ",response);
            setCargando(false);
            setMensaje("Registro actualizado satisfactoriamente")
            setAlerta(true);
        });

    }

    const validar = (e:any) => {
        e.preventDefault();
        if (nombre==="" || apellido === "" || sexo === "" || fechaNacimiento === ""){
            setIncompletos(true);
            return;
        }else{
            setMostrarConfirmacion(true)
        }
    }

    useIonViewWillLeave(() => {
        console.log('ionViewWillLeave event fired');
        setUsuario("");
        setUsername("");
        setCedula("");
        setNombre("");
        setApellido("");
        setFechaNacimiento("");
        setCorreo("");
        setSexo("");
    });

    const terminar_cita = () => {
       console.log("Terminar cita");

       
    }

    const eliminar = () => {
        setMostrarConfirmacionEliminar(false);
        setMostrarLoad(true);
        AxiosUsers.deshabilitar_usuario({cedula: ced}).then( res => {
            setMostrarLoad(false);
            setAlertaEliminar(true);
        });
        
    }

    const cambiar_tipo = () => {
        passwordMode ? setPasswordMode(false) : setPasswordMode(true)
    }

    const cambiar_tipo_confirm = () => {
        passwordModeConfirm ? setPasswordModeConfirm(false) : setPasswordModeConfirm(true)
    }

    const add_discapacidad_manualmente = () => {
        setDiscapacidadesAgregadas([...discapacidadesAgregadas, {key: indexDisc}]);
        setIndexDisc(indexDisc + 1);
    }

    const add_alergia_manualmente = () => {
        setAlergiasAgregadas([...alergiasAgregadas, {key: indexAlergi}]);
        setIndexAlergi(indexAlergi + 1);
    }

    const add_signo_manualmente = () => {
        setSignosAgregadas([...signosAgregadas, {key: indexSigno}]);
        setIndexSigno(indexSigno + 1);
    }

    const add_medicamento_manualmente = () => {
        setMedicamentosAgregadas([...medicamentosAgregadas, {key: indexMedi}]);
        setIndexMedi(indexMedi + 1);
    }

    const onChangeName = (e:any) => {
        const {name, value} = e.target;
        let val = name.split(".");
        setValoresNombresAgregadas(
            {
                ...valoresNombresAgregadas,
                ...valoresNombresAgregadas[val[0]],
                [val[1]]:value
            }
        );
        console.log("Nam: ",valoresNombresAgregadas);
    }

    const onChangeMedicamento = (e:any) => {

        const {name, value} = e.target;
        let val = name.split(".");
        setValoresMedicamentosAgregadas(
            {
                ...valoresMedicamentosAgregadas,
                ...valoresMedicamentosAgregadas[val[0]],
                [val[1]]:value
            }
        );
        console.log("Medi: ",valoresMedicamentosAgregadas);

    }

    const onChangeDosis = (e:any) =>{
        const {name, value} = e.target;
        let val = name.split(".");
        setValoresDosisAgregadas(
            {
                ...valoresDosisAgregadas,
                ...valoresDosisAgregadas[val[0]],
                [val[1]]:value
            }
        );
        console.log("Dosis: ",valoresDosisAgregadas);
    }

    const onChangeFrecuencia = (e:any) => {
        const {name, value} = e.target;
        let val = name.split(".");
        setValoresFrecuenciasAgregadas(
            {
                ...valoresFrecuenciasAgregadas,
                ...valoresFrecuenciasAgregadas[val[0]],
                [val[1]]:value
            }
        );
        console.log("Frecuencia: ",valoresFrecuenciasAgregadas);
    }

    const onChangeDuracion = (e:any) => {
        const {name, value} = e.target;
        let val = name.split(".");
        setValoresDuracionesAgregadas(
            {
                ...valoresDuracionesAgregadas,
                ...valoresDuracionesAgregadas[val[0]],
                [val[1]]:value
            }
        );
        console.log("Frecuencia: ",valoresDuracionesAgregadas);
    }

    const onChangeValor = (e:any) => {
        const {name, value} = e.target;
        let val = name.split(".");
        setValoresCantidadesAgregadas(
            {
                ...valoresCantidadesAgregadas,
                ...valoresCantidadesAgregadas[val[0]],
                [val[1]]:value
            }
        );
        console.log("Valor: ",valoresCantidadesAgregadas);
    }

    const onChangeUnidad = (e:any) => {
        const {name, value} = e.target;
        let val = name.split(".");
        setValoresUnidadesAgregadas(
            {
                ...valoresUnidadesAgregadas,
                ...valoresUnidadesAgregadas[val[0]],
                [val[1]]:value
            }
        );
        console.log("Unidad: ",valoresUnidadesAgregadas);
    }

    const onChange = (e:any) => {
        const {name, value} = e.target;
        let val = name.split(".");
        setValoresDiscapacidadesAgregadas(
            {
                ...valoresDiscapacidadesAgregadas,
                ...valoresDiscapacidadesAgregadas[val[0]],
                [val[1]]:value
            }
        );
        // setValoresDiscapacidadesAgregadas(
        //         data_disc:{
        //         ...valoresDiscapacidadesAgregadas,
        //         ...valoresDiscapacidadesAgregadas[val[0]],
        //         [val[1]]:value
        //         }
        // );
        //console.log("name: ", name);
        //console.log("value: ", value);
        console.log("data: ",valoresDiscapacidadesAgregadas);
    }

    const onChangeAlergias = (e:any) => {
        const {name, value} = e.target;
        let val = name.split(".");
        setValoresAlergiasAgregadas(
            {
                ...valoresAlergiasAgregadas,
                ...valoresAlergiasAgregadas[val[0]],
                [val[1]]:value
            }
        );
        console.log("data: ",valoresAlergiasAgregadas);
    }

    const remove_discapacidad = (id:any) => {
        let nuevas_discapacidades = discapacidadesAgregadas.filter( item => item.key!==id );
        let nuevas_discapacidades_values = valoresDiscapacidadesAgregadas;
        let prop:any = "discapacidad"+id;
        delete nuevas_discapacidades_values[prop]
        setDiscapacidadesAgregadas(nuevas_discapacidades);
        setValoresDiscapacidadesAgregadas(nuevas_discapacidades_values);
    }

    const remove_alergia = (id:any) => {
        let nuevas_alergias = alergiasAgregadas.filter( item => item.key!==id );
        let nuevas_alergias_values = valoresAlergiasAgregadas;
        let prop:any = "alergia"+id;
        delete nuevas_alergias_values[prop]
        setAlergiasAgregadas(nuevas_alergias);
        setValoresAlergiasAgregadas(nuevas_alergias_values);
    }

    const remove_signo = (id:any) => {

        let nuevos_signos = signosAgregadas.filter( item => item.key!==id );        
        let nuevos_signos_nombres = valoresNombresAgregadas;
        let nuevos_signos_valores = valoresCantidadesAgregadas;
        let nuevos_signos_unidades = valoresUnidadesAgregadas;

        let prop:any = ""+id;
        delete nuevos_signos_nombres[prop]
        delete nuevos_signos_valores[prop]
        delete nuevos_signos_unidades[prop]

        setSignosAgregadas(nuevos_signos);
        setValoresNombresAgregadas(nuevos_signos_nombres);
        setValoresCantidadesAgregadas(nuevos_signos_valores);
        setValoresUnidadesAgregadas(nuevos_signos_unidades);

    }

    const remove_medicamento = (id:any) => {

        let nuevos_medicamentos = medicamentosAgregadas.filter( item => item.key!==id );        
        let nuevos_medicamentos_nombres = valoresMedicamentosAgregadas;
        let nuevos_medicamentos_dosis = valoresDosisAgregadas;
        let nuevos_medicamentos_frecuencias = valoresFrecuenciasAgregadas;
        let nuevos_medicamentos_duraciones = valoresDuracionesAgregadas;

        let prop:any = ""+id;
        delete nuevos_medicamentos_nombres[prop]
        delete nuevos_medicamentos_dosis[prop]
        delete nuevos_medicamentos_frecuencias[prop]
        delete nuevos_medicamentos_duraciones[prop]

        setMedicamentosAgregadas(nuevos_medicamentos);
        setValoresMedicamentosAgregadas(nuevos_medicamentos_nombres);
        setValoresDosisAgregadas(nuevos_medicamentos_dosis);
        setValoresFrecuenciasAgregadas(nuevos_medicamentos_frecuencias);
        setValoresDuracionesAgregadas(nuevos_medicamentos_duraciones);

    }

    const medicamentos_agregados = () => {

    }


    const subir_imagenes = () => {
        console.log("CLICK");
        console.log("FileList: ",fileList[0]);
        let lista = fileList;
        Object.keys(fileList[0]).forEach( e => {
            let formData = new FormData();
            formData.append("image_name", fileList[0][e]);

            AxiosExamenes.almacenar_examen(formData).then( res => {
                console.log("AxiosExamenes.almacenar_examen88888888: ",res);
                let dataExamenNueva = {
                                        seguimiento: 2,
                                        diagnostico: "Sin datos",
                                        tipo_examen: "examen",
                                        medico: cedulaMedico,
                                        paciente: cedulaPaciente,
                                        comentarios: "Sin datos",
                                        cita: id,
                                        url_examen : res.data
                };

                // dataExamenNueva.url_examen = res.data;
                // console.log("CIIIIIIIIIIIIIIIIIIIIIIIII: ",dataExamenNueva);
                AxiosExamenes.almacenar_informacion_examen(dataExamenNueva).then( res2 => {
                    console.log("AxiosExamenes.almacenar_informacion_examenwwwwwwww: ",res2);
                });
            }).catch(err => {
                console.log('err.response.data', err.response.data);
            });


        });

        //for (let i = 0; i < fileList.length; i++){
        //    let formData = new FormData();
        //    let prop: any = ""+i;
            // var hotel = jsonObject.hoteles[i];
            // Object.keys(fileList[0]).forEach( e => console.log("AA:", fileList[0][e]));
            

            // console.log("EXA: ", lista[prop]);
            //console.log("fileList[0].originFileObj: ",fileList[0].originFileObj);
            //formData.append("image_name", fileList[i].originFileObj);   
            //console.log("FORM DATA: ", fileList[i].originFileObj);         
//            AxiosExamenes.almacenar_examen(formData).then( res => {
                
                // let dataExamenNueva = {
                //                         seguimiento: 2,
                //                         diagnostico: "Sin datos",
                //                         tipo_examen: "examen",
                //                         medico: cedulaMedico,
                //                         paciente: cedulaPaciente,
                //                         comentarios: "Sin datos",
                //                         cita: id
                // };

                // dataExamenNueva.url_examen = res.data;
                // console.log("CIIIIIIIIIIIIIIIIIIIIIIIII: ",dataExamenNueva);
                // AxiosExamenes.almacenar_informacion_examen(dataExamenNueva).then( res2 => {
                //     console.log("AxiosExamenes.almacenar_informacion_examenwwwwwwww: ",res2);
                // });
//            }).catch(err => {
//                console.log('err.response.data', err.response.data);
//            });

        //}
        
    }


    const subir_imagenes2 = () => {
        console.log("CLICK");
        console.log("FileList: ",fileList[0]);
        let lista = fileList;
        let lista_examenes:any = []
        Object.keys(fileList[0]).forEach( e => {

            let formData = new FormData();
            formData.append("image_name", fileList[0][e]);            
            lista_examenes.push(formData);
            console.log("AA: ",formData);
        });
        console.log("lista_examenes: ",lista_examenes[0].image_name);

        AxiosExamenes.subir_examenes({"lista_examenes":lista_examenes}).then (res => {
            console.log("EL EXAMN: ",res);
        })

        // Object.keys(fileList[0]).forEach( e => {
        //     let formData = new FormData();
        //     formData.append("image_name", fileList[0][e]);
        //     AxiosExamenes.almacenar_examen(formData).then( res => {
        //         console.log("AxiosExamenes.almacenar_examen88888888: ",res);
        //         let dataExamenNueva = {
        //                                 seguimiento: 2,
        //                                 diagnostico: "Sin datos",
        //                                 tipo_examen: "examen",
        //                                 medico: cedulaMedico,
        //                                 paciente: cedulaPaciente,
        //                                 comentarios: "Sin datos",
        //                                 cita: id,
        //                                 url_examen : res.data
        //         };
        //         AxiosExamenes.almacenar_informacion_examen(dataExamenNueva).then( res2 => {
        //             console.log("AxiosExamenes.almacenar_informacion_examenwwwwwwww: ",res2);
        //         });
        //     }).catch(err => {
        //         console.log('err.response.data', err.response.data);
        //     });
        // });

        
    }

    const informacion = () => {
        AxiosUsers.informacion({id_cita: id}).then( response => {
            console.log("id_cita: ",response);
            setCedulaMedico(response.data[0].medico);
            setCedulaPaciente(response.data[0].paciente);
            setNombre(response.data[0].nombre);
            setApellido(response.data[0].apellido);
            AxiosUsers.info_paciente(response.data[0].paciente).then( response2 => {
                console.log("LLLLLLLLLLLLLLLLLLL888888: ",response2.data);
                setPaciente(response2.data[0])
                console.log("MMMMMMM: ", response2.data[0].cedula)
                AxiosPersonas.cuidadores_de_paciente({"cedula_paciente": (response2.data[0]).cedula}).then( res =>  {
                    console.log("CUI222: ",res.data);
                    setCuidadoresDePaciente(res.data);
                });
            });
        });
    }

    const fcita = () => {
        console.log("fcita");
        console.log("discapacidadesSeleccionadas: ", discapacidadesSeleccionadas);
        let temp_discapacidades = []; // Discapacidades seleccionadas ids
        let listaDisc:any = [];       // Nombres de discapacidades que se agregan manualmente
        for (let i = 0; i< discapacidadesSeleccionadas.length; i++ ){
            let elem = discapacidadesSeleccionadas[i].split(",")
            temp_discapacidades.push(elem[1]);
        }

        Object.keys(valoresDiscapacidadesAgregadas).forEach( (e:any) => {
            listaDisc.push(valoresDiscapacidadesAgregadas[e]);
            console.log("listaDisc: ",listaDisc);
        });
        console.log("temp_discapacidades: ",temp_discapacidades);
        console.log("listaDisc: ",listaDisc);

        let data = listaDisc;
        let data_modificada = []
        for (let i = 0 ; i < data.length; i++){
            data_modificada.push({"nombre":data[i]});
        }

        let temp_alergias = [];
        let listaAler:any = [];
        for (let i = 0; i< alergiasSeleccionadas.length; i++ ){
            let elem = alergiasSeleccionadas[i].split(",")
            temp_alergias.push(elem[1]);
        }

        Object.keys(valoresAlergiasAgregadas).forEach( (e:any) => {
            listaAler.push(valoresAlergiasAgregadas[e]);
            console.log("listaAler: ",listaAler);
        });
        console.log("temp_alergias: ",temp_alergias);
        console.log("listaAler: ",listaAler);

        let data2 = listaAler;
        let data_modificada2 = []
        for (let i = 0 ; i < data2.length; i++){
            data_modificada2.push({"nombre":data2[i]});
        }

        let temp_enfermedades_hereditarias = [];
        for (let i = 0; i< enfermedadesHereditariasSeleccionadas.length; i++ ){
            let elem = enfermedadesHereditariasSeleccionadas[i].split(",")
            temp_enfermedades_hereditarias.push(elem[1]);
        }

        let data3 = temp_enfermedades_hereditarias;
        let data_modificada3 = []
        for (let i = 0 ; i < data3.length; i++){
            data_modificada3.push({"enfermedad":data3[i]});
        }

        let temp_enfermedades_persistentes = [];
        for (let i = 0; i< enfermedadesPersistentesSeleccionadas.length; i++ ){
            let elem = enfermedadesPersistentesSeleccionadas[i].split(",")
            temp_enfermedades_persistentes.push(elem[1]);
        }

        let data4 = temp_enfermedades_persistentes;
        let data_modificada4 = []
        for (let i = 0 ; i < data4.length; i++){
            data_modificada4.push({"enfermedad":data4[i]});
        }

        

        let signos_vitales_predeterminados = [{key: 'Estatura', value: estatura, unidad: unidadEstatura},
                                              {key: 'Peso', value: peso, unidad: unidadPeso},
                                              {key: 'Masa Coporal', value: masaCorporal, unidad: unidadMasaCorporal},
                                              {key: 'Porcentaje de grasa corporal', value: porcentaje, unidad: unidadPorcentaje},
                                              {key: 'Masa muscular', value: masaMuscular, unidad: unidadMasaMuscular},
                                              {key: 'Tensión arterial', value: tensionArterial, unidad: unidadTensionArterial},
                                              {key: 'Frecuencia cardíaca', value: frecuenciaCardiaca, unidad: unidadFrecuenciaCardiaca},
                                              {key: 'Frecuencia respiratoria', value: frecuenciaRespiratoria, unidad: unidadFrecuenciaRespiratoria},
                                              {key: 'Saturación de oxígeno', value: saturacion, unidad: unidadSaturacion},
                                              {key: 'Temperatura', value: temperatura, unidad: unidadTemperatura}]

        let signos_vitales_predeterminados_mod = signos_vitales_predeterminados.filter( item => (item.value!==0 && item.unidad!== ""));
        
        // let nuevas_discapacidades = discapacidadesAgregadas.filter( item => item.key!==id )

        // valoresNombresAgregadas

        // let signos_vitales_nuevos = listaSig;

        // let signos_vitales_nuevos_mod:any = [] 
        // for (let i = 0; i < signos_vitales_nuevos.length ; i++) {

        //     signos_vitales_nuevos_mod.push({key: signos_vitales_nuevos[i].nombre_signo_vital, 
        //                                     value: signos_vitales_nuevos[i].valor_signo_vital, 
        //                                     unidad: signos_vitales_nuevos[i].unidad});

        // }
        
        let signos_vitales_nuevos_mod:any = [] 
        Object.keys(valoresNombresAgregadas).forEach( (e:any) => {
            // signos_vitales_nuevos_mod.push(valoresNombresAgregadas[e]);
            // signos_vitales_nuevos_mod.push(valoresCantidadesAgregadas[e]);
            // signos_vitales_nuevos_mod.push(valoresUnidadesAgregadas[e]);
            // signos_vitales_nuevos_mod.push(valoresUnidadesAgregadas[e]);
            signos_vitales_nuevos_mod.push({key: valoresNombresAgregadas[e], 
                                            value: valoresCantidadesAgregadas[e], 
                                            unidad: valoresUnidadesAgregadas[e]});
        });
        let signos_vitales_totales = [...signos_vitales_nuevos_mod, ...signos_vitales_predeterminados_mod];
        console.log("signos_vitales_nuevos_mod: ",signos_vitales_nuevos_mod);
        console.log("signos_vitales_predeterminados: ",signos_vitales_predeterminados);
        console.log("signos_vitales_predeterminados_mod: ", signos_vitales_predeterminados_mod);
        console.log("signos_vitales_totales: ", signos_vitales_totales);

        let cita = {
            "discapacidades_agregadas_manualmente": data_modificada,
            "discapacidades_seleccionadas": temp_discapacidades,
            "alergias_agregadas_manualmente": data_modificada2,
            "alergias_seleccionadas": temp_alergias,
            "enfermedades_hereditarias_paciente": data_modificada3,
            "enfermedades_persistentes_paciente": data_modificada4,
            "paciente": cedulaPaciente,
            "signos_vitales_paciente":signos_vitales_totales,
            "id_cita": id,
            "estado":  "A",
            "observRec": observaciones,
            "planTratam": tratamiento,
            "instrucciones": instrucciones,
            "sintomas": diagnostico,
            "fecha_atencion": moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            "seguimiento": ""
        };

        AxiosCitas.guardar_cita2(cita).then( res => {
            console.log("guardar_cita2: ",res);
        }).catch( err => {
            console.log("err ",err);
        })


    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/homeusuarios"></IonBackButton>
                    </IonButtons>
                    <IonTitle >Atender cita</IonTitle>
                </IonToolbar>
                <IonToolbar color="primary">
                    {/* <IonSegment value={this.state.parametros.estado} onIonChange={(e: any) => this.cambiar_estado(e.detail.value)}> */}
                    <IonSegment value = {actualPage+''} onIonChange={(e: any) => console.log(e.detail.value)}>
                        <IonSegmentButton value="0" layout="icon-start"> {/*Pendientes */}
                            <IonIcon icon={informationOutline} />
                        </IonSegmentButton>
                        <IonSegmentButton value="1">  {/*En progreso */}
                            <IonIcon icon={heartOutline} />
                        </IonSegmentButton>
                        <IonSegmentButton value="2">  {/*Otras solicitudes: Completadas y rechazadas */}
                            <IonIcon icon={imagesOutline} />
                        </IonSegmentButton>
                        <IonSegmentButton value="3">  {/*Otras solicitudes: Completadas y rechazadas */}
                            <IonIcon icon={medkit} />
                        </IonSegmentButton>
                    </IonSegment>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {
                    actualPage === 0?
                        <>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle className = "ion-text-center">
                                        <b>

                                            <IonLabel style = {{marginLeft:95, marginRight:95}}>
                                                Antecedentes
                                            </IonLabel>

                                        </b>
                                    </IonCardTitle>
                                    
                                </IonCardHeader>
                                <IonCardContent>

                                    <IonRow style = {{marginTop: 10}}>
                                        <IonCol>            
                                            <IonRadioGroup value={discapacidad} onIonChange={e => setDiscapacidad(e.detail.value)}>
                                                    <IonItem lines = "none">
                                                        <IonLabel>Discapacidad</IonLabel>
                                                        <IonItem lines = "none">
                                                            Si<IonRadio style={{ marginRight: 3, marginLeft:3 }} value={true}/>
                                                            No<IonRadio style={{ marginRight: 3, marginLeft:3 }} value={false}/>
                                                        </IonItem>
                                                    </IonItem>
                                            </IonRadioGroup>
                                        </IonCol>
                                    </IonRow>

                                    {
                                        discapacidad?<>
                                            <IonItem lines = "none">
                                                {/* <IonLabel>Toppings</IonLabel> */}
                                                <IonSelect style={{ marginRight: 70, marginLeft:70 }}  placeholder="Seleccione las discapacidades" value={discapacidadesSeleccionadas} multiple={true} cancelText="Cancelar" okText="Aceptar" onIonChange={e => setDiscapacidadesSeleccionadas(e.detail.value)}>
                                                    {
                                                        discapacidades.map ( (item:any) => (
                                                            <IonSelectOption key = {item.id_discapacidad} value = {item.nombre+ ',' + item.id_discapacidad}>{item.nombre}</IonSelectOption>                                                
                                                        ))
                                                    }
                                                </IonSelect>
                                            </IonItem>
                                            {
                                                discapacidadesAgregadas.map( item => (
                                                            <IonItem key = {item.key}>

                                                                <IonInput name = {"disc.discapacidad"+(item.key)} className = "ion-margin-top" required disabled = {false} onIonChange = {(e:any) => onChange(e)} type="text"></IonInput>
                                                                <IonIcon className = "btn_eye_icon" icon = {removeCircleOutline} color = "primary" onClick = {() => remove_discapacidad(item.key)}></IonIcon>

                                                            </IonItem>              
                                                ))
                                            }
                                            <IonRow>
                                                <IonCol>
                                                    <IonButton onClick = {() => add_discapacidad_manualmente()} color = "medium" fill="outline" expand="full">Añadir manualmente otra discapacidad</IonButton>
                                                </IonCol>
                                            </IonRow>
                                        </>:null
                                    }
                                    <IonRow>
                                        <IonCol>            
                                            <IonRadioGroup value={alergia} onIonChange={e => setAlergia(e.detail.value)}>
                                                    <IonItem lines = "none">
                                                        <IonLabel>Alergia</IonLabel>
                                                        <IonItem lines = "none">
                                                            Si<IonRadio style={{ marginRight: 3, marginLeft:3 }} value={true}/>
                                                            No<IonRadio style={{ marginRight: 3, marginLeft:3 }} value={false}/>
                                                        </IonItem>
                                                    </IonItem>
                                            </IonRadioGroup>
                                        </IonCol>
                                    </IonRow>
                                    
                                    {   
                                        alergia?<>
                                            <IonItem>
                                                {/* <IonLabel>Toppings</IonLabel> */}
                                                <IonSelect style={{ marginRight: 90, marginLeft:90 }} placeholder="Seleccione las alergias" value={alergiasSeleccionadas} multiple={true} cancelText="Cancelar" okText="Aceptar" onIonChange={e => setAlergiasSeleccionadas(e.detail.value)}>
                                                    {
                                                        medicamentos.map ( (item:any) => (
                                                            <IonSelectOption key = {item.id_medicamento} value = {item.nombre+ ',' + item.id_medicamento}>{item.nombre}</IonSelectOption>                                                
                                                        ))
                                                    }
                                                </IonSelect>
                                            </IonItem>
                                            {
                                                alergiasAgregadas.map( item => (
                                                            <IonItem key = {item.key}>
                                                                {/* <IonLabel position="stacked">Nombre<IonText color="danger">*</IonText></IonLabel> */}
                                                                {/* <IonInput className = "ion-margin-top" required disabled = {false} type="text" value = {nombre} onIonChange={ (e:any) => setNombre(e.target.value)} ></IonInput> */}
                                                                <IonInput placeholder = "Ingrese alergia" name = {"alergi.alergia"+(item.key)} className = "ion-margin-top" required disabled = {false} onIonChange = {(e:any) => onChangeAlergias(e)} type="text"></IonInput>
                                                                <IonIcon className = "btn_eye_icon" icon = {removeCircleOutline} color = "primary" onClick = {() => remove_alergia(item.key)}></IonIcon>
                                                            </IonItem>              
                                                ))
                                            } 
                                            <IonRow>
                                                <IonCol>
                                                    <IonButton onClick = {() => add_alergia_manualmente()} color = "medium" fill="outline" expand="full">Añadir manualmente otra alergia</IonButton>
                                                </IonCol>
                                            </IonRow>
                                        </>:null
                                    }
                                    <IonRow  className = "ion-text-center">
                                        <IonCol  className = "ion-text-center">
                                            <IonItemDivider>
                                                <IonLabel style = {{marginLeft:95, marginRight:95}}>
                                                    Enfermedades persistentes
                                                </IonLabel>
                                            </IonItemDivider>
                                            <IonItem lines="none">
                                                {/* <IonLabel>Toppings</IonLabel> */}
                                                <IonSelect style={{ marginTop:10, marginRight: 22, marginLeft:22 }} className = "ion-text-center" placeholder="Seleccione las enfermedades persistentes" value={enfermedadesPersistentesSeleccionadas} multiple={true} cancelText="Cancelar" okText="Aceptar" onIonChange={e => setEnfermedadesPersistentesSeleccionadas(e.detail.value)}>
                                                    {
                                                        enfermedades.map ( (item:any) => (
                                                            <IonSelectOption key = {item.id_enfermedad} value = {item.nombreLargo + ',' + item.id_enfermedad}>{item.nombreLargo}</IonSelectOption>                                                
                                                        ))
                                                    }
                                                </IonSelect>
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>
                                    
                                    <IonRow  className = "ion-text-center">
                                        <IonCol  className = "ion-text-center">
                                            <IonItemDivider>
                                                <IonLabel style = {{marginLeft:95, marginRight:95}}>
                                                    Enfermedades hereditarias
                                                </IonLabel>
                                            </IonItemDivider>
                                            <IonItem lines="none">
                                                {/* <IonLabel>Toppings</IonLabel> */}
                                                <IonSelect style={{marginTop:10, marginRight: 22, marginLeft:22 }} className = "ion-text-center" placeholder="Seleccione las enfermedades hereditarias" value={enfermedadesHereditariasSeleccionadas} multiple={true} cancelText="Cancelar" okText="Aceptar" onIonChange={e => setEnfermedadesHereditariasSeleccionadas(e.detail.value)}>
                                                    {
                                                        enfermedades.map ( (item:any) => (
                                                            <IonSelectOption key = {item.id_enfermedad} value = {item.nombreLargo + ',' + item.id_enfermedad}>{item.nombreLargo}</IonSelectOption>                                                
                                                        ))
                                                    }
                                                </IonSelect>
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>

                                    {/* <IonTextarea rows = {5} className = "ion-margin-top" required disabled = {false} value = {descrip} onIonChange={ (e:any) => setDescrip(e.target.value)} ></IonTextarea> */}

                                    
                                    <IonRow  className = "ion-text-center">
                                        <IonCol  className = "ion-text-center">
                                            <IonItemDivider>
                                                <IonLabel style = {{marginLeft:130, marginRight:130}}>
                                                    Observaciones
                                                </IonLabel>
                                            </IonItemDivider>
                                            <IonItem>
                                                <IonTextarea rows = {5} value = {observaciones} onIonChange = { (e:any) => setObservaciones(e.target.value) } className = "ion-margin-top" required disabled = {false} ></IonTextarea>                            
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>
                                    <IonButton onClick = {() => fcita()}>Finalizar</IonButton>
                                </IonCardContent>
                            </IonCard>



                        </>:null
                }
                {
                    actualPage === 1?
                        <>
                        
                        <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle className = "ion-text-center">
                                        <b>

                                            <IonLabel style = {{marginLeft:95, marginRight:95}}>
                                                <b>Signos vitales</b>
                                            </IonLabel>

                                        </b>
                                    </IonCardTitle>
                                    
                                </IonCardHeader>
                                
                                <IonCardContent>

                                    <IonItem lines="none">
                                        <IonLabel><b>Estatura</b></IonLabel>
                                        <IonInput value = {estatura} onIonChange={ (e:any) => setEstatura(e.target.value)} type="number" className="ps-5 ms-5"></IonInput>                                        
                                        <IonInput value = {unidadEstatura} onIonChange={ (e:any) => setUnidadEstatura(e.target.value)} type="text" className="ms-5" placeholder="unidad"></IonInput>                                        

                                        {/* <IonLabel> cm</IonLabel> */}
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="me-4">
                                            <b>Peso</b>
                                        </IonLabel>
                                        <IonInput value = {peso} onIonChange={ (e:any) => setPeso(e.target.value)} type="number" className="ps-5 ms-5" ></IonInput>
                                        <IonInput value = {unidadPeso} onIonChange={ (e:any) => setUnidadPeso(e.target.value)} type="text" className="ms-5" placeholder="unidad"></IonInput>                                        

                                        {/* <IonLabel >
                                            kg
                                        </IonLabel> */}
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="">
                                            <b>M. corporal</b>
                                        </IonLabel>
                                        <IonInput value = {masaCorporal} onIonChange={ (e:any) => setMasaCorporal(e.target.value)} type="number" className="ps-5 ms-4" placeholder="valor"></IonInput>
                                        <IonInput value = {unidadMasaCorporal} onIonChange={ (e:any) => setUnidadMasaCorporal(e.target.value)} type="text" className="ms-5" placeholder="unidad"></IonInput>                                        

                                        {/* <IonLabel >
                                            Kg/m2
                                        </IonLabel> */}
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="me-1">
                                            <b>Grasa corporal</b>
                                        </IonLabel>
                                        <IonInput value = {porcentaje} onIonChange={ (e:any) => setPorcentaje(e.target.value)} type="number" className="ms-4 ps-3" placeholder="valor"></IonInput>
                                        <IonInput value = {unidadPorcentaje} onIonChange={ (e:any) => setUnidadPorcentaje(e.target.value)} type="text" className="ms-5" placeholder="unidad"></IonInput>                                        

                                        {/* <IonLabel>
                                            %
                                        </IonLabel> */}
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="me-1">
                                            <b>Masa muscular</b>
                                        </IonLabel>
                                        <IonInput value = {masaMuscular} onIonChange={ (e:any) => setMasaMuscular(e.target.value)} type="number" className="ps-4 ms-3" placeholder="valor"></IonInput>
                                        <IonInput value = {unidadMasaMuscular} onIonChange={ (e:any) => setUnidadMasaMuscular(e.target.value)} type="text" className="ms-5" placeholder="unidad"></IonInput>                                        

                                        {/* <IonLabel>
                                            %
                                        </IonLabel> */}
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="me-1">
                                            <b>Tensión arterial</b>
                                        </IonLabel>
                                        <IonInput value = {tensionArterial} onIonChange={ (e:any) => setTensionArterial(e.target.value)} type="number" className="ps-4 ms-3" placeholder="valor"></IonInput>
                                        <IonInput value = {unidadTensionArterial} onIonChange={ (e:any) => setUnidadTensionArterial(e.target.value)} type="text" className="ms-5" placeholder="unidad"></IonInput>                                        

                                        {/* <IonLabel>
                                            mmHg
                                        </IonLabel> */}
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="me-2">
                                            <b>F. cardíaca</b>
                                        </IonLabel>
                                        <IonInput value = {frecuenciaCardiaca} onIonChange={ (e:any) => setFrecuenciaCardiaca(e.target.value)} type="number" className="ps-4 ms-5" placeholder="valor"></IonInput>
                                        <IonInput value = {unidadFrecuenciaCardiaca} onIonChange={ (e:any) => setUnidadFrecuenciaCardiaca(e.target.value)} type="text" className="ms-5" placeholder="unidad"></IonInput>                                        
                                        
                                        {/* <IonLabel>
                                            bmp
                                        </IonLabel> */}
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="">
                                            <b>F. respiratoria</b>
                                        </IonLabel>
                                        <IonInput value = {frecuenciaRespiratoria} onIonChange={ (e:any) => setFrecuenciaRespiratoria(e.target.value)} type="number" className="ps-2 ms-5" placeholder="valor"></IonInput>
                                        <IonInput value = {unidadFrecuenciaRespiratoria} onIonChange={ (e:any) => setUnidaFrecuenciaRespiratoria(e.target.value)} type="text" className="ms-5" placeholder="unidad"></IonInput>                                        

                                        {/* <IonLabel>
                                            r/m
                                        </IonLabel> */}
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="">
                                            <b>S. de oxígeno</b>
                                        </IonLabel>
                                        <IonInput value = {saturacion} onIonChange={ (e:any) => setSaturacion(e.target.value)} type="number" className="ps-2 ms-5" placeholder="valor"></IonInput>
                                        <IonInput value = {unidadSaturacion} onIonChange={ (e:any) => setUnidadSaturacion(e.target.value)} type="text" className="ms-5" placeholder="unidad"></IonInput>                                        

                                        {/* <IonLabel>                                            
                                        </IonLabel> */}
                                    </IonItem>
                                    
                                    <IonItem lines="none">
                                        <IonLabel className="">
                                            <b>Temperatura</b>
                                        </IonLabel>
                                        <IonInput value = {temperatura} onIonChange={ (e:any) => setTemperatura(e.target.value)} type="number" className="ps-3 ms-5" placeholder="valor"></IonInput>
                                        <IonInput value = {unidadTemperatura} onIonChange={ (e:any) => setUnidadTemperatura(e.target.value)} type="text" className="ms-5" placeholder="unidad"></IonInput>                                        

                                        {/* <IonLabel>
                                            °C
                                        </IonLabel> */}
                                    </IonItem>


                                    {/* <IonItem lines="none">
                                        <IonInput className = "" required disabled = {false} type="text" value = {apellido} onIonChange={ (e:any) => setApellido(e.target.value)} placeholder = "nombre" ></IonInput>
                                        <IonInput type="number" className="ps-3 ms-5" placeholder="valor"></IonInput>
                                        <IonInput type="text" className="" placeholder="unidad"></IonInput>
                                    </IonItem> */}


                                    {
                                        signosAgregadas.map( item => (
                                            
                                            <IonItem key = {item.key} lines="none">
                                                <IonInput name = {"nom."+(item.key)} className = "" required disabled = {false} type="text" onIonChange = {(e:any) => onChangeName(e)} placeholder = "nombre" ></IonInput>
                                                <IonInput name = {"num."+(item.key)} type="number" onIonChange = {(e:any) => onChangeValor(e)} className="ps-3 ms-5" placeholder="valor"></IonInput>
                                                <IonInput name = {"uni."+(item.key)} type="text" onIonChange = {(e:any) => onChangeUnidad(e)} className="" placeholder="unidad"></IonInput>
                                                <IonIcon className = "btn_eye_icon" icon = {removeCircleOutline} color = "primary" onClick = {() => remove_signo(item.key)}></IonIcon>
                                            </IonItem>
                                                          
                                        ))
                                    }


                                    <IonRow>
                                        <IonCol>
                                            <IonButton onClick = {() => add_signo_manualmente()} color = "medium" fill="outline" expand="full">Añadir signo vital</IonButton>
                                        </IonCol>
                                    </IonRow>

                                    <IonButton onClick = {() => fcita()}>Finalizar</IonButton>

                                </IonCardContent>
                            </IonCard>

                        </>:null
                }
                {
                    actualPage === 2?
                        <>
                            {/* <IonButton onClick = {() => getPictures()}>UP</IonButton> */}
                            <IonCard>

                                <IonCardHeader>
                                    <IonCardTitle className = "ion-text-center">
                                        <b>

                                            <IonLabel style = {{marginLeft:95, marginRight:95}}>
                                                <b>Exámenes</b>
                                            </IonLabel>
                                            {/* <input type="file" name="examen" multiple className="custom-file-input"/> */}

                                            {/* <label className="custom-file-input" htmlFor="Upload" >
                                            </label>
                                            <input id="Upload" type="file" multiple name="_photos" accept="image/*" style={{"visibility": "hidden"}}></input> */}

                                            <label className="btn btn-primary mt-4 mb-4">
                                            <i className="fa fa-image mt-2 mb-2"></i>{fileList.length>0?'Archivos seleccionados':'Seleccione los exámenes'}<input type="file" style={{"display": "none"}} onChange = {e => setFileList([e.target.files])} name="image" multiple/>
                                            </label>
                                            <br/>
                                            <IonButton onClick = {() => subir_imagenes2()}>Subir</IonButton>
                                        </b>
                                    </IonCardTitle>
                                    
                                </IonCardHeader>

                            </IonCard>


                        </>:null
                }
                {
                    actualPage === 3?
                        <>
                            

                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle className = "ion-text-center">
                                        <b>
                                            <IonLabel>
                                                Diagnóstico y tratamiento
                                            </IonLabel>
                                        </b>
                                    </IonCardTitle>
                                    
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonRow  className = "ion-text-center">
                                        <IonCol  className = "ion-text-center">
                                            <IonItemDivider>
                                                <IonLabel style = {{marginLeft:120}}>
                                                    Diagnóstico
                                                </IonLabel>
                                            </IonItemDivider>
                                            <IonItem lines="none">
                                                {/* <IonLabel>Toppings</IonLabel> */}
                                                <IonSelect style={{ marginTop:10, marginLeft:38 }} className = "ion-text-center" placeholder="Seleccione las enfermedades" value={enfermedadesDiagnosticoSeleccionadas} multiple={true} cancelText="Cancelar" okText="Aceptar" onIonChange={e => setEnfermedadesDiagnosticoSeleccionadas(e.detail.value)}>
                                                    {
                                                        enfermedades.map ( (item:any) => (
                                                            <IonSelectOption key = {item.id_enfermedad} value = {item.nombreLargo + ',' + item.id_enfermedad}>{item.nombreLargo}</IonSelectOption>                                                
                                                        ))
                                                    }
                                                </IonSelect>
                                            </IonItem>
                                            <IonItem>
                                                <IonTextarea rows = {5} value = {diagnostico} onIonChange = { (e:any) => setDiagnostico(e.target.value) } className = "ion-margin-top" required disabled = {false} ></IonTextarea>                            
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>

                                    
                                    <IonRow  className = "ion-text-center">
                                        <IonCol  className = "ion-text-center">
                                            <IonItemDivider>
                                                <IonLabel style = {{marginLeft:85}}>
                                                    Receta medicamentos
                                                </IonLabel>
                                            </IonItemDivider>
                                                {/* <IonLabel>Toppings</IonLabel> */}
                                                
                                                {
                                                    medicamentosAgregadas.map ( item => (
                                                        <IonItem 
                                                            key = {item.key} 
                                                        lines="none">
                                                            
                                                            <IonSelect placeholder="Medicina" value={medicamentosSeleccionadas} cancelText="Cancelar" okText="Aceptar"
                                                                name = {"ned."+(item.key)} 
                                                                onIonChange = {(e:any) => onChangeMedicamento(e)}>
                                                                {
                                                                    medicamentos.map ( (item:any) => (
                                                                        <IonSelectOption key = {item.id_medicamento} value = {item.id_medicamento}>{item.nombre}</IonSelectOption>                                                
                                                                    ))
                                                                }
                                                            </IonSelect>
        
                                                            <IonInput 
                                                                name = {"dos."+(item.key)} 
                                                            type="number" onIonChange = {(e:any) => onChangeDosis(e)} className="ms-2" placeholder="Dosis"></IonInput>
                                                            <IonInput 
                                                                name = {"fre."+(item.key)} 
                                                            type="text" onIonChange = {(e:any) => onChangeFrecuencia(e)} className="me-2" placeholder="Frecuencia"></IonInput>
                                                            <IonInput 
                                                                name = {"du."+(item.key)} 
                                                            type="text" onIonChange = {(e:any) => onChangeDuracion(e)} className="me-2" placeholder="Duración"></IonInput>
                                                            <IonIcon className = "btn_eye_icon" icon = {removeCircleOutline} color = "primary" 
                                                            onClick = {() => remove_medicamento(item.key)}
                                                            ></IonIcon>
                                                        </IonItem>
        
                                                        
                                                    ))
                                                }

                                                <IonRow>
                                                    <IonCol>
                                                        <IonButton onClick = {() => add_medicamento_manualmente()} color = "medium" fill="outline" expand="full">Añadir medicamento</IonButton>
                                                    </IonCol>
                                                </IonRow>

                                            <IonItem>
                                                <IonTextarea rows = {5} value = {instrucciones} onIonChange = { (e:any) => setInstrucciones(e.target.value) } className = "ion-margin-top" required disabled = {false} ></IonTextarea>                            
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>

                                    

                                    <IonRow  className = "ion-text-center">
                                        <IonCol  className = "ion-text-center">
                                            <IonItemDivider>
                                                <IonLabel style = {{marginLeft:100}}>
                                                    Plan tratamiento
                                                </IonLabel>
                                            </IonItemDivider>
                                            <IonItem>
                                                <IonTextarea rows = {5} value = {tratamiento} onIonChange = { (e:any) => setTratamiento(e.target.value) } className = "ion-margin-top" required disabled = {false} ></IonTextarea>                            
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>



                                </IonCardContent>
                            </IonCard>


                        </>:null
                }
            </IonContent>
            <IonRow style={{marginTop: 20 }} className = "ion-text-center">
                {
                    actualPage !== 0?
                        <IonCol>
                            <IonButton onClick = {() => anterior()} color = "light" expand="full">Anterior</IonButton>
                        </IonCol>:null
                }
                <IonCol>
                    <IonButton onClick = {actualPage ===3? () => terminar_cita() : () => siguiente()} color = "primary" expand="full">{actualPage === 3?'Terminar cita': 'Siguiente'}</IonButton>
                </IonCol>
            </IonRow>
        </IonPage>
    )
}

export default AtenderCita
