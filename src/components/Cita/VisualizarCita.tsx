import { IonPage, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonRow, IonGrid, IonCol, IonItem, IonLabel, IonList, IonInput, IonText, IonTextarea, IonButton, IonRouterLink, IonAlert, IonLoading, useIonViewWillLeave, useIonViewWillEnter, IonIcon, IonDatetime, IonSelect, IonSelectOption, IonRadioGroup, IonCardContent, IonListHeader, IonRadio, IonHeader, IonItemDivider,IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle} from '@ionic/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import {eye, eyeOff, heartOutline, home, imagesOutline, informationOutline, medkit, micOutline, removeCircle, removeCircleOutline, trash} from 'ionicons/icons';
import AxiosUsers from '../../Services/AxiosUsers';
import AxiosRoles from '../../Services/AxiosRoles';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
// import { CameraResultType, CameraSource, CameraPhoto } from "@capacitor/core";
import '../../../src/components/style.css';
import moment from 'moment';
import { IonBadge, IonSegment, IonSegmentButton } from '@ionic/react';
import AxiosDiscapacidades from '../../Services/AxiosDiscapacidades';
import AxiosMedicamentos from '../../Services/AxiosMedicamentos';
import AxiosEnfermedades from '../../Services/AxiosEnfermedades';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThermometerQuarter,faWeight, faRulerVertical, faMale, 
        faLungs, faHeartbeat, faFileMedicalAlt, faDiagnoses, 
        faPercent, faHandHoldingHeart, faFileMedical} from '@fortawesome/free-solid-svg-icons';

        

const VisualizarCita = (props:any) => {

    let imagePicker : ImagePicker;

    
    const getPictures = () => {
        let options: ImagePickerOptions = {  
              //here Quality of images, defaults to 100  
              quality: 100,  
              //here Width of an Image  
              width: 600,  
              //here Height of an Image  
              height: 600,  
              /** Output type, defaults to 0 (FILE_URI). 
        
              * FILE_URI :0 (number) it returns a actual path for an image 
        
              */  
              
              outputType: 1,  
              //here Maximum image count for selection, defaults to 15.  
              //while setting a number 15 we can load 15 images in one selection.
        
              maximumImagesCount: 8
              // max images to be selected, defaults to 15. If this is set to 1  
            }; 
        
         imagePicker.getPictures(options)
              .then(selectedImg => { })
        }
    


    const [mostrarLoad, setMostrarLoad] = React.useState(false);
    const [alergia, setAlergia] = React.useState(false);
    const [listaRoles, setListaRoles] = React.useState([]);
    const [passwordMode, setPasswordMode] = React.useState(true);
    const [passwordModeConfirm, setPasswordModeConfirm] = React.useState(true);
    const [discapacidad, setDiscapacidad] = React.useState(false);
    const [discapacidadesSeleccionadas, setDiscapacidadesSeleccionadas] = React.useState([]);
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


    const [alergiasSeleccionadas, setAlergiasSeleccionadas] = React.useState([]);
    const [medicamentosSeleccionadas, setMedicamentosSeleccionadas] = React.useState([]);

    const [alergiasAgregadas, setAlergiasAgregadas] = React.useState(new Array<any>());
    const [medicamentosAgregadas, setMedicamentosAgregadas] = React.useState(new Array<any>());

    const [valoresAlergiasAgregadas, setValoresAlergiasAgregadas] = React.useState(new Array<any>());


    // const [Seleccionadas, setAlergiasSeleccionadas] = React.useState([]);
    const [signosAgregadas, setSignosAgregadas] = React.useState(new Array<any>());
    const [valoresSignosAgregadas, setValoresSignosAgregadas] = React.useState(new Array<any>());

    const [enfermedadesPersistentesSeleccionadas, setEnfermedadesPersistentesSeleccionadas] = React.useState([]);
    const [enfermedadesHereditariasSeleccionadas, setEnfermedadesHereditariasSeleccionadas] = React.useState([]);
    const [enfermedadesDiagnosticoSeleccionadas, setEnfermedadesDiagnosticoSeleccionadas] = React.useState([]);

    const [indexDisc, setIndexDisc] = React.useState(0);
    const [indexAlergi, setIndexAlergi] = React.useState(0);
    const [indexSigno, setIndexSigno] = React.useState(0);
    const [indexMedi, setIndexMedi] = React.useState(0);


 
    const [diagnostico, setDiagnostico] = React.useState("");

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
    const [descripcion, setDiscripcion] = React.useState("");

    const [discapacidades, setDiscapacidades] = React.useState([]);
    const [medicamentos, setMedicamentos] = React.useState([]);
    const [enfermedades, setEnfermedades] = React.useState([]);
    const [observaciones, setObservaciones] = React.useState(""); 
    const [listaDisc, setListaDisc] = React.useState([]);
    const [listaMed, setListaMed] = React.useState([]);
    const [listaAler, setListaAler] = React.useState([]);
    const [listaSig, setListaSig] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [seguimiento, setSeguimiento] = React.useState(false);
    const [exito, setExito] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([]);

    const [paciente, setPaciente] = React.useState({});
    const [infoExpediente, setInfoExpediente] = React.useState([]);
    const [listaSignosVitales, setListaSignosVitales] = React.useState([]);
    const [alergias, setAlergias] = React.useState(new Array<any>());
    const [listaDiscapacidades, setListaDiscapacidades] = React.useState(new Array<any>());
    const [enfermedadadesPersistentes, setEnfermedadesPersistentes] = React.useState(new Array<any>());
    const [enfermedadesHereditarias, setEnfermedadesHereditarias] = React.useState(new Array<any>());
    const [enfermedadesCita, setEnfermedadesCita] = React.useState(new Array<any>());
    const [citas, setCitas] = React.useState({"observRec":"", "instrucciones":"", "planTratam":""});
    const [examanes, setExamenes] = React.useState([]);
    const [listaMedicamentos, setListaMedicamentos] = React.useState([]);

    const {ced} = useParams<{ced:string}>();
    const { id } = useParams<{id:string}>();

    console.log("CED: ",ced);
    console.log("ID: ",id);

    useIonViewWillEnter(() => {
        console.log('ionViewWillEnter event fired');
        mostrar_roles();
        obtener_perfil_por_cedula();
        mostrar_discapacidades();
        mostrar_medicamentos();
        mostrar_enfermedades();
        mostrar_informacion_cita_paciente();
    });

    const mostrar_informacion_cita_paciente = () => {
        //message.loading({ content: 'Cargando cita...', key, duration: 50});
        setCargando(true);
        AxiosUsers.mostrar_informacion_cita_paciente({cedula: ced, cita:id}).then( response => {
            console.log("RESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS: ", response.data[5]);
            let info_paciente = response.data[0][0];
            let alergias = response.data[1];
            let discapacidades2 = response.data[2];
            let enfermedades_persistentes = response.data[3];
            let enfermedades_hereditarias = response.data[4];
            let signos_vitales = response.data[5];
            let cita = response.data[6];
            let examenes = response.data[7];
            let d = "";
            if (response.data[1].length !== 0){
                for (let i = 0; i < response.data[1].length; i++){
                    // d = d + response.data[1][i].nombre_alergia + ' ,';
                    if (i === response.data[1].length -1){
                        d = d + response.data[1][i].nombre_alergia;                    
                    }else{
                        d = d + response.data[1][i].nombre_alergia + ', ';
                    }
                }
                setDiscripcion(d);
            }
            let dis2 = [];
            if (response.data[2].length !== 0){
                for (let i = 0; i < response.data[2].length; i++){
                    dis2.push((response.data[2][i]).nombre_discapacidad+','+(response.data[2][i]).discapacidad);
                }
                // setDiscripcion(d);
            }

            let alergi2 = [];
            if (response.data[1].length !== 0){
                for (let i = 0; i < response.data[1].length; i++){
                    alergi2.push((response.data[1][i]).nombre_alergia+','+(response.data[1][i]).medicamento_alergia);
                }
                // setDiscripcion(d);
            }

            let persis2 = [];
            if (response.data[3].length !== 0){
                for (let i = 0; i < response.data[3].length; i++){
                    persis2.push((response.data[3][i]).nombre_enfermedad+','+(response.data[3][i]).id_enfermedad);
                }
                // setDiscripcion(d);
            }

            let here2 = [];
            if (response.data[4].length !== 0){
                for (let i = 0; i < response.data[4].length; i++){
                    here2.push((response.data[4][i]).nombre_enfermedad+','+(response.data[4][i]).id_enfermedad);
                }
                // setDiscripcion(d);
            }

            let enfcita = [];
            if (response.data[8].length !== 0){
                for (let i = 0; i < response.data[8].length; i++){
                    enfcita.push((response.data[8][i]).nombre_enfermedad+','+(response.data[8][i]).id_enfermedad);
                }
                // setDiscripcion(d);
            }

            let lista = response.data[9].map( (elemento:any) => ({
                medicamento: elemento.nombre_medicamento,
                dosis: elemento.dosis,
                frecuencia: elemento.frecuencia,
                duracion: elemento.duracion,
              }));
            //setLoading(false)
            setDataSource(lista);
            console.log("DIS: ", dis2);
            setInfoExpediente(response.data);
            setPaciente(response.data[0][0]);
            setListaSignosVitales(response.data[5]);
            setAlergias(alergi2);
            setListaDiscapacidades(dis2);
            setEnfermedadesPersistentes(persis2);
            setEnfermedadesHereditarias(here2);
            setEnfermedadesCita(enfcita);
            setCitas(response.data[6][0]);
            setExamenes(response.data[7]);
            setCargando(false);
            // console.log(fileList);
            // message.success({ content: 'Mostrando cita', key, duration: 3 });
        });
    }

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

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/medico/homepacientes/expedientepaciente/${ced}`}></IonBackButton>
                    </IonButtons>
                    <IonTitle >Cita</IonTitle>
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
                                            <IonRadioGroup  value={listaDiscapacidades.length>0?true:false}>
                                                    <IonItem lines = "none">
                                                        <IonLabel>Discapacidad</IonLabel>
                                                        <IonItem lines = "none">
                                                            Si<IonRadio disabled = {true} style={{ marginRight: 3, marginLeft:3 }} value={true}/>
                                                            No<IonRadio disabled = {true} style={{ marginRight: 3, marginLeft:3 }} value={false}/>
                                                        </IonItem>
                                                    </IonItem>
                                            </IonRadioGroup>
                                        </IonCol>
                                    </IonRow>

                                    {
                                        listaDiscapacidades.length>0?<>
                                            <IonItem lines = "none">
                                                {/* <IonLabel>Toppings</IonLabel> */}
                                                <IonSelect  style={{ marginRight: 70, marginLeft:70 }}  placeholder="Seleccione las discapacidades" value={listaDiscapacidades} multiple={true} >
                                                    {
                                                        discapacidades.map ( (item:any) => (
                                                            <IonSelectOption key = {item.id_discapacidad} value = {item.nombre+ ',' + item.id_discapacidad}>{item.nombre}</IonSelectOption>                                                
                                                        ))
                                                    }
                                                </IonSelect>
                                            </IonItem>
                                            {/* {
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
                                            </IonRow> */}
                                        </>:null
                                    }
                                    <IonRow>
                                        <IonCol>            
                                            <IonRadioGroup value={alergias.length>0?true:false} >
                                                    <IonItem lines = "none">
                                                        <IonLabel>Alergia</IonLabel>
                                                        <IonItem lines = "none">
                                                            Si<IonRadio disabled = {true} style={{ marginRight: 3, marginLeft:3 }} value={true}/>
                                                            No<IonRadio disabled = {true} style={{ marginRight: 3, marginLeft:3 }} value={false}/>
                                                        </IonItem>
                                                    </IonItem>
                                            </IonRadioGroup>
                                        </IonCol>
                                    </IonRow>
                                    
                                    {   
                                        alergias.length>0?<>
                                            <IonItem>
                                                {/* <IonLabel>Toppings</IonLabel> */}
                                                <IonSelect style={{ marginRight: 90, marginLeft:90 }} placeholder="Seleccione las alergias" value={alergias} multiple={true} cancelText="Cancelar" okText="Aceptar">
                                                    {
                                                        medicamentos.map ( (item:any) => (
                                                            <IonSelectOption key = {item.id_medicamento} value = {item.nombre+ ',' + item.id_medicamento}>{item.nombre}</IonSelectOption>                                                
                                                        ))
                                                    }
                                                </IonSelect>
                                            </IonItem>
                                            {/* {
                                                alergiasAgregadas.map( item => (
                                                            <IonItem key = {item.key}>
                                                                <IonInput placeholder = "Ingrese alergia" name = {"alergi.alergia"+(item.key)} className = "ion-margin-top" required disabled = {false} onIonChange = {(e:any) => onChangeAlergias(e)} type="text"></IonInput>
                                                                <IonIcon className = "btn_eye_icon" icon = {removeCircleOutline} color = "primary" onClick = {() => remove_alergia(item.key)}></IonIcon>
                                                            </IonItem>              
                                                ))
                                            } 
                                            <IonRow>
                                                <IonCol>
                                                    <IonButton onClick = {() => add_alergia_manualmente()} color = "medium" fill="outline" expand="full">Añadir manualmente otra alergia</IonButton>
                                                </IonCol>
                                            </IonRow> */}
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
                                                <IonSelect style={{ marginTop:10, marginRight: 22, marginLeft:22 }} className = "ion-text-center" placeholder="Seleccione las enfermedades persistentes" value={enfermedadadesPersistentes} multiple={true} cancelText="Cancelar" okText="Aceptar">
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
                                                <IonSelect style={{marginTop:10, marginRight: 22, marginLeft:22 }} className = "ion-text-center" placeholder="Seleccione las enfermedades hereditarias" value={enfermedadesHereditarias} multiple={true} cancelText="Cancelar" okText="Aceptar">
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
                                                <IonLabel style = {{marginLeft:90, marginRight:90}}>
                                                    Notas antecendentes
                                                </IonLabel>
                                            </IonItemDivider>
                                            <IonItem>
                                                <IonTextarea rows = {2} value = {citas!==undefined?citas.observRec:""} className = "ion-margin-top" required disabled = {true} ></IonTextarea>                            
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>
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

                                {listaSignosVitales.map( (item:any) => 
                                        <IonRow key = {item.key} className="mb-4 ms-4 ps-3 mt-3">
                                            
                                            <IonCol className="">
                                                <span className="mt-2 me-1 ps-5 text-secondary">{ item.key === 'Porcentaje de grasa corporal'? 'Grasa corporal' :
                                                                                            item.key ===  'Tensión arterial'?'T. arterial':
                                                                                            item.key ===  'Frecuencia cardíaca'?'F. cardíaca':
                                                                                            item.key ===  'Frecuencia respiratoria'?'F. respiratoria':
                                                                                            item.key ===  'Saturación de oxígeno'?'S. de oxígeno':
                                                                                            item.key ===  'Masa muscular'?'M. muscular':
                                                                                            item.key}</span>
                                            </IonCol>
                                            <IonCol className="ms-2">
                                                <b>{item.value} {item.unidad}</b>
                                            </IonCol>
                                        </IonRow>
                                                                            
                                    )}
                                    
                                </IonCardContent>
                            </IonCard>

                        </>:null
                }
                {
                    actualPage === 2?
                        <>

                            <IonCard>
                            <IonCardHeader>
                                    <IonCardTitle className = "ion-text-center">
                                        <b>

                                            <IonLabel style = {{marginLeft:95, marginRight:95}}>
                                                <b>Exámenes</b>
                                            </IonLabel>

                                        </b>
                                    </IonCardTitle>
                                    
                                </IonCardHeader>
                                <IonCardContent>
                                    {
                                        examanes.map( (item:any, index:any) => (
                                        <IonRow key = {index}>
                                            <IonCol >
                                                <img
                                                    width={400}
                                                    src={item.url_examen}
                                                    alt = "imagen"
                                                    className = "mt-2"
                                                />
                                            </IonCol>
                                        </IonRow>
                                        )
                                        )
                                    }
                                </IonCardContent>
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
                                                <IonSelect style={{ marginTop:10, marginLeft:38 }} className = "ion-text-center" placeholder="Seleccione las enfermedades" value={enfermedadesCita} multiple={true} cancelText="Cancelar" okText="Aceptar">
                                                    {
                                                        enfermedades.map ( (item:any) => (
                                                            <IonSelectOption key = {item.id_enfermedad} value = {item.nombreLargo + ',' + item.id_enfermedad}>{item.nombreLargo}</IonSelectOption>                                                
                                                        ))
                                                    }
                                                </IonSelect>
                                            </IonItem>
                                            <IonItem>
                                                <IonTextarea rows = {3} value = {diagnostico} className = "ion-margin-top" required disabled = {true} ></IonTextarea>                            
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
                                                    dataSource.map( (item:any) => (
                                                        <IonItem>
                                                            <IonLabel>item.medicamento </IonLabel>
                                                            <IonLabel>item.dosis </IonLabel>
                                                            <IonLabel>item.frecuencia </IonLabel>
                                                            <IonLabel>item.duracion </IonLabel>
                                                        </IonItem>
                                                    ))
                                                }

                                            <IonItem>
                                                <IonTextarea rows = {3} value = {citas!==undefined?citas.instrucciones:""} onIonChange = { (e:any) => setInstrucciones(e.target.value) } className = "ion-margin-top" required disabled = {true} ></IonTextarea>                            
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
                                                <IonTextarea rows = {5} value = {citas!==undefined?citas.planTratam:""} onIonChange = { (e:any) => setTratamiento(e.target.value) } className = "ion-margin-top" required disabled = {true} ></IonTextarea>                            
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
                    <IonButton hidden = {actualPage===3?true:false} onClick = {actualPage ===3? () => terminar_cita() : () => siguiente()} color = "primary" expand="full">{actualPage === 3?'': 'Siguiente'}</IonButton>
                </IonCol>
            </IonRow>
            <IonLoading
                isOpen={cargando}
                message={'Cargando datos. Espere por favor...'}
            />
        </IonPage>
    )
}

export default VisualizarCita
