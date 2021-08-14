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

        

const AtenderCita = (props:any) => {

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


    const [estatura, setEstatura] = React.useState(0);
    const [peso, setPeso] = React.useState(0);
    const [masaCorporal, setMasaCorporal] = React.useState(0);
    const [porcentaje, setPorcentaje] = React.useState(0);
    const [masaMuscular, setMasaMuscular] = React.useState(0);
    const [tensionArterial, setTensionArterial] = React.useState(0);
    const [frecuenciaCardiaca, setFrecuenciaCardiaca] = React.useState(0);
    const [frecuenciaRespiratoria, setFrecuenciaRespiratoria] = React.useState(0);
    const [saturacion, setSaturacion] = React.useState(0);
    const [temperatura, setTemperatura] = React.useState(0);

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
    const [discapacidades, setDiscapacidades] = React.useState([]);
    const [medicamentos, setMedicamentos] = React.useState([]);
    const [enfermedades, setEnfermedades] = React.useState([]);
    const [observaciones, setObservaciones] = React.useState(""); 

    const {ced} = useParams<{ced:string}>();

    useIonViewWillEnter(() => {
        //console.log('ionViewWillEnter event fired');
        mostrar_roles();
        obtener_perfil_por_cedula();
        mostrar_discapacidades();
        mostrar_medicamentos();
        mostrar_enfermedades();

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
                                                                {/* <IonLabel position="stacked">Nombre<IonText color="danger">*</IonText></IonLabel> */}
                                                                {/* <IonInput className = "ion-margin-top" required disabled = {false} type="text" value = {nombre} onIonChange={ (e:any) => setNombre(e.target.value)} ></IonInput> */}
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
                                        <IonInput value = {estatura} onIonChange={ (e:any) => setEstatura(e.target.value)} type="number" className="ps-5 ms-5" placeholder="valor"></IonInput>
                                        <IonLabel> cm</IonLabel>
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="me-4">
                                            <b>Peso</b>
                                        </IonLabel>
                                        <IonInput value = {peso} onIonChange={ (e:any) => setPeso(e.target.value)} type="number" className="ps-5 ms-5" placeholder="valor"></IonInput>
                                        <IonLabel >
                                            kg
                                        </IonLabel>
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="">
                                            <b>M. corporal</b>
                                        </IonLabel>
                                        <IonInput value = {masaCorporal} onIonChange={ (e:any) => setMasaCorporal(e.target.value)} type="number" className="ps-5 ms-4" placeholder="valor"></IonInput>
                                        <IonLabel >
                                            Kg/m2
                                        </IonLabel>
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="me-1">
                                            <b>Grasa corporal</b>
                                        </IonLabel>
                                        <IonInput value = {porcentaje} onIonChange={ (e:any) => setPorcentaje(e.target.value)} type="number" className="ms-4 ps-3" placeholder="valor"></IonInput>
                                        <IonLabel>
                                            %
                                        </IonLabel>
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="me-1">
                                            <b>Masa muscular</b>
                                        </IonLabel>
                                        <IonInput value = {masaMuscular} onIonChange={ (e:any) => setMasaMuscular(e.target.value)} type="number" className="ps-4 ms-3" placeholder="valor"></IonInput>
                                        <IonLabel>
                                            %
                                        </IonLabel>
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="me-1">
                                            <b>Tensión arterial</b>
                                        </IonLabel>
                                        <IonInput value = {tensionArterial} onIonChange={ (e:any) => setTensionArterial(e.target.value)} type="number" className="ps-4 ms-3" placeholder="valor"></IonInput>
                                        <IonLabel>
                                            mmHg
                                        </IonLabel>
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="me-2">
                                            <b>F. cardíaca</b>
                                        </IonLabel>
                                        <IonInput value = {frecuenciaCardiaca} onIonChange={ (e:any) => setFrecuenciaCardiaca(e.target.value)} type="number" className="ps-4 ms-5" placeholder="valor"></IonInput>
                                        <IonLabel>
                                            bmp
                                        </IonLabel>
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="">
                                            <b>F. respiratoria</b>
                                        </IonLabel>
                                        <IonInput value = {frecuenciaRespiratoria} onIonChange={ (e:any) => setFrecuenciaRespiratoria(e.target.value)} type="number" className="ps-2 ms-5" placeholder="valor"></IonInput>
                                        <IonLabel>
                                            r/m
                                        </IonLabel>
                                    </IonItem>

                                    <IonItem lines="none">
                                        <IonLabel className="">
                                            <b>S. de oxígeno</b>
                                        </IonLabel>
                                        <IonInput value = {saturacion} onIonChange={ (e:any) => setSaturacion(e.target.value)} type="number" className="ps-2 ms-5" placeholder="valor"></IonInput>
                                        <IonLabel>                                            
                                        </IonLabel>
                                    </IonItem>
                                    
                                    <IonItem lines="none">
                                        <IonLabel className="">
                                            <b>Temperatura</b>
                                        </IonLabel>
                                        <IonInput value = {temperatura} onIonChange={ (e:any) => setTemperatura(e.target.value)} type="number" className="ps-3 ms-5" placeholder="valor"></IonInput>
                                        <IonLabel>
                                            °C
                                        </IonLabel>
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



                                </IonCardContent>
                            </IonCard>

                        </>:null
                }
                {
                    actualPage === 2?
                        <>
                            {/* <IonButton onClick = {() => getPictures()}>UP</IonButton> */}



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
