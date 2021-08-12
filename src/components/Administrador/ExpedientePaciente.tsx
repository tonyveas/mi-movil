import { IonPage, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonRow, IonGrid, IonCol, IonItem, IonLabel, IonList, IonInput, IonText, IonTextarea, IonButton, IonRouterLink, IonAlert, IonLoading, useIonViewWillLeave, useIonViewWillEnter, IonIcon, IonDatetime, IonSelect, IonSelectOption, IonItemDivider, IonChip, IonBadge, IonRippleEffect, IonAvatar} from '@ionic/react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {create, eye, eyeOff, trash} from 'ionicons/icons';
import AxiosUsers from '../../Services/AxiosUsers';
import AxiosRoles from '../../Services/AxiosRoles';
import '../../../src/components/style.css';
import moment from 'moment';
import 'moment/locale/es';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThermometerQuarter,faWeight, faRulerVertical, faMale, 
        faLungs, faHeartbeat, faFileMedicalAlt, faDiagnoses, 
        faPercent, faHandHoldingHeart, faFileMedical} from '@fortawesome/free-solid-svg-icons';
import Respuesta from '../Respuesta';

const ExpedientePaciente = (props:any) => {

    const [editionMode, setEditionMode] = React.useState(useParams<{ced:string}>().ced !== undefined);
    const [mostrarLoad, setMostrarLoad] = React.useState(false);
    const [listaRoles, setListaRoles] = React.useState([]);
    const [passwordMode, setPasswordMode] = React.useState(true);
    const [passwordModeConfirm, setPasswordModeConfirm] = React.useState(true);
    const [cedula, setCedula] = React.useState("");
    const [nombre, setNombre] = React.useState("");
    const [correo, setCorreo] = React.useState("");
    const [apellido, setApellido] = React.useState("");
    const [fechaNacimiento, setFechaNacimiento] = React.useState("");
    const [sexo, setSexo] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const [estado, setEstado] = React.useState("");
    const [idRol, setidRol] = React.useState("");
    const [usuario, setUsuario] = React.useState({});
    const [mensaje, setMensaje] = React.useState("");
    const [mostrarConfirmacion, setMostrarConfirmacion] = React.useState(false);
    const [mostrarConfirmacionEliminar, setMostrarConfirmacionEliminar] = React.useState(false);
    const [cargando, setCargando] = React.useState(false);
    const [camposIncompletos, setCamposIncompletos] = React.useState(false);
    const [incompletos, setIncompletos] = React.useState(false);
    const [alerta, setAlerta] = React.useState(false);
    const [alertaEliminar, setAlertaEliminar] = React.useState(false);


    const [paciente, setPaciente] = React.useState({
                                                    "nombre": "",
                                                    "apellido": "",
                                                    "cedula": "",
                                                    "correo": "",
                                                    "fecha_nacimiento": "",
                                                    "sexo": ""
                                                  });
    const [infoExpediente, setInfoExpediente] = React.useState([]);
    const [signosVitales, setSignosVitales] = React.useState([]);
    const [alergias, setAlergias] = React.useState([]);
    const [discapacidades, setDiscapacidades] = React.useState([]);
    const [enfermedadadesPersistentes, setEnfermedadesPersistentes] = React.useState([]);
    const [enfermedadesHereditarias, setEnfermedadesHereditarias] = React.useState([]);
    const [citas, setCitas] = React.useState([]);
    const [descripcion, setDiscripcion] = React.useState("");
    const [observaciones, setObservaciones] = React.useState([]);

    const [loading, setLoading] = React.useState(true);
    const [noData, setNoData] = React.useState(false);


    const {ced} = useParams<{ced:string}>();

    const mostrar_informacion_expediente = () => {
        console.log("Ced: ", {cedula: ced});
        setCargando(true);
        //message.loading({ content: 'Cargando expediente...', key, duration: 50});

        AxiosUsers.mostrar_informacion_expediente({cedula: ced}).then ( response => {
            console.log("mostrar_informacion_expediente: ",response.data[7]);
            let info_paciente = response.data[0][0];
            let alergias = response.data[1];
            let discapacidades = response.data[2];
            let enfermedades_persistentes = response.data[3];
            let enfermedades_hereditarias = response.data[4];
            let signos_vitales = response.data[5];
            let citas = response.data[6];
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
            setInfoExpediente(response.data);
            setPaciente(response.data[0][0]);
            setSignosVitales(response.data[5]);
            setAlergias(response.data[1]);
            setDiscapacidades(response.data[2]);
            setEnfermedadesPersistentes(response.data[3]);
            setEnfermedadesHereditarias(response.data[4]);
            setCitas(response.data[6]);
            setObservaciones(response.data[7]);
            setCargando(false);

            //message.success({ content: 'Mostrando expediente', key, duration: 3 });

        }).catch ( err =>{
            setNoData(true)
            //message.success({ content: 'No existe expediente', key, duration: 3 });
            console.log("err: ", err);
        });
    }

    useIonViewWillEnter(() => {
        console.log('ionViewWillEnter event fired');
        mostrar_informacion_expediente();
        obtener_usuario_por_cedula();
    });

    const obtener_usuario_por_cedula = () => {
        let data = {"ced": ced}
        AxiosUsers.obtener_usuario_por_cedula(data).then( response => {
            setUsuario(response.data);
            setUsername(response.data.usuario);
            setCedula(response.data.cedula);
            setNombre(response.data.nombre);
            setApellido(response.data.apellido);
            setidRol(response.data.id_rol);
            setEstado(response.data.estado);
            setFechaNacimiento(response.data.fecha_nacimiento);
            setCorreo(response.data.correo);
            setSexo(response.data.sexo);
            setEstado(response.data.estado);
            setCargando(false);
        });  
      }

    const mostrar_roles = () => {
        AxiosRoles.mostrar_roles().then((res)=>{
          console.log(res.data);
          setListaRoles(res.data);
        })
    }

    const actualizar_usuario_administrador = () => {

        let u = {
            cedula: ced,
            nombre: nombre,
            apellido: apellido,
            fecha_nacimiento: fechaNacimiento,
            sexo: sexo,
            id_rol: idRol,
            estado: estado
        }

        AxiosUsers.actualizar_usuario_administrador(u).then ( response => {
            setCargando(false);
            setMensaje("Registro actualizado satisfactoriamente")
            setAlerta(true);
        });
    }

    const validar = (e:any) => {
        e.preventDefault();
        if (password !== passwordConfirm){
            setCamposIncompletos(true);
            return;
        }else if (fechaNacimiento==="" || idRol === ""){
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
        setidRol("");
        setEstado("");
        setFechaNacimiento("");
        setCorreo("");
        setSexo("");
        setEstado("");
    });

    const almacenar_usuario = () => {
        
        // setFechaNacimiento(values['date-picker'].format('YYYY-MM-DD'))
        let u = {
            cedula: cedula,
            nombre: nombre,
            correo: correo,
            apellido: apellido,
            // fecha_nacimiento: values['date-picker'].format('YYYY-MM-DD'),
            fecha_nacimiento: fechaNacimiento,
            sexo: sexo,
            username: username,
            password: password,
            id_rol: idRol,
        }
        console.log("USUARIO: ", u);
        AxiosRoles.almacenar_usuario(u).then((res)=>{
            console.log(res.data);
            setCargando(false);
            setMensaje("Registro almacenado satisfactoriamente")
            setAlerta(true);
        })
        // console.log("values['date-picker'].format('YYYY-MM-DD'): ", values['date-picker'].format('YYYY-MM-DD'));
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

    return (
        <IonPage>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/medico/homepacientes"></IonBackButton>
                </IonButtons>
                <IonTitle >  Expediente paciente </IonTitle>
                <IonButtons slot="end">
                    {/* <IonButton hidden = {!editionMode?true:false} onClick = {() => setMostrarConfirmacionEliminar(true)} ><IonIcon icon={trash}></IonIcon></IonButton> */}
                </IonButtons>
            </IonToolbar>
            <IonContent fullscreen>
                <form onSubmit = {(e) => validar(e)}>
                    <IonList>
                        <IonGrid>
                            <IonRow class="ion-text-center">
                                <IonCol>
                                    <img style={{marginTop: 20, marginBottom:20 }} src="./assets/img/icons/usuarios/usuario.png"  alt="usuario" />
                                </IonCol>
                                <IonCol>            
                                    <IonItem className ="ion-text-center" lines="none">
                                        <IonLabel>{paciente.nombre} {paciente.apellido}<IonText color="danger"></IonText></IonLabel>
                                    </IonItem>
                                    {/* <IonItem className ="" lines="none">
                                        <IonLabel>{paciente.fecha_nacimiento}<IonText color="danger"></IonText></IonLabel>
                                    </IonItem> */}
                                    <IonItem className ="ion-text-center" lines="none">
                                        <IonLabel>{(moment(moment(paciente.fecha_nacimiento).format('YYYY-MM-DD'),'YYYYMMDD').fromNow()).substring(4,12)}<IonText color="danger"></IonText></IonLabel>
                                    </IonItem>
                                    {/* <IonItem className ="" lines="none">
                                        <IonLabel>{sexo === 'M'? 'Masculino': sexo === 'F'? 'Femenino': 'Prefiero no decirlo' }</IonLabel>
                                    </IonItem>               */}
                                    <IonItem className ="ion-text-center" lines="none">
                                        <IonLabel>{correo}</IonLabel>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            {/* <IonRow>
                                <IonCol>            
                                    <IonItem>
                                        <IonLabel position="stacked">Nombre<IonText color="danger">*</IonText></IonLabel>
                                        <IonInput className = "ion-margin-top" required disabled = {false} type="text" value = {nombre} onIonChange={ (e:any) => setNombre(e.target.value)} ></IonInput>
                                    </IonItem>              
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>            
                                    <IonItem>
                                        <IonLabel position="stacked">Apellido<IonText color="danger">*</IonText></IonLabel>
                                        <IonInput className = "ion-margin-top" required disabled = {false} type="text" value = {apellido} onIonChange={ (e:any) => setApellido(e.target.value)} ></IonInput>
                                    </IonItem>              
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>            
                                    <IonItem>
                                        <IonLabel position="stacked">Correo<IonText color="danger">*</IonText></IonLabel>
                                        <IonInput className = "ion-margin-top" required disabled = {false} type="text" value = {correo} onIonChange={ (e:any) => setCorreo(e.target.value)} ></IonInput>
                                    </IonItem>              
                                </IonCol>
                            </IonRow> */}
                            <IonRow>
                                <IonCol>            
                                    <IonItem lines="none">
                                        <IonLabel position="stacked">Cédula</IonLabel>
                                        <IonInput value = {cedula}  minlength = {10} type = "text" className = "ion-margin-top" required disabled = {false} onIonChange={ (e:any) => setCedula(e.target.value)} ></IonInput>
                                    </IonItem>              
                                </IonCol>
                            </IonRow>
                            {/* <IonRow>
                                <IonCol>            
                                    <IonItem>
                                        <IonLabel position="stacked">Usuario<IonText color="danger">*</IonText></IonLabel>
                                        <IonInput className = "ion-margin-top" required disabled = {false} value = {username} onIonChange={ (e:any) => setUsername(e.target.value)} ></IonInput>
                                    </IonItem>              
                                </IonCol>
                            </IonRow> */}
                            <IonRow>
                                <IonCol>            
                                    <IonItem lines="none">
                                        <IonLabel position="stacked">Fecha de nacimiento</IonLabel>
                                        <IonDatetime
                                            // monthValues='6,7,8'
                                            // yearValues='2014,2015'
                                            // dayValues="01,02,03,04,05,06,08,09,10, 11, 12, 13, 14"
                                            min="1920-01-01" max={moment(new Date()).format('YYYY-MM-DD')}                                            
                                            // moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
                                            displayFormat="YYYY-MM-DD"
                                            
                                            value={fechaNacimiento} onIonChange={e => setFechaNacimiento(moment(e.detail.value!).format('YYYY-MM-DD'))}
                                            ></IonDatetime>
                                    </IonItem>  
                                                
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>            
                                    <IonItem lines="none">
                                        <IonLabel position="stacked">Género</IonLabel>
                                        <IonSelect className="ion-margin-top" value={sexo} name="estado" onIonChange={(e) => setSexo(e.detail.value)} okText="Ok" cancelText="Cancelar">
                                            <IonSelectOption value="M">Hombre</IonSelectOption>
                                            <IonSelectOption value="F">Mujer</IonSelectOption>
                                            <IonSelectOption value="P">Prefiero no decirlo</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>                   
                                </IonCol>
                            </IonRow>
                            <IonItemDivider>
                                <IonLabel style = {{marginLeft:110}}>
                                    últimos signos vitales
                                </IonLabel>
                            </IonItemDivider>

                            
                            {signosVitales.map( (item:any) => 
                                        <IonRow key = {item.key} className="mb-4 ms-4 ps-3 mt-3">
                                            
                                            <IonCol className="">
                                                <span className="mt-2 me-1 ps-5 text-secondary">{ item.key === 'Porcentaje de grasa corporal'? 'Grasa corporal' :
                                                                                            item.key ===  'Tensión arterial'?'T. arterial':
                                                                                            item.key ===  'Frecuencia cardíaca'?'F. cardíaca':
                                                                                            item.key ===  'Frecuencia respiratoria'?'F. respiratoria':
                                                                                            item.key ===  'Saturación de oxígeno'?'S. de oxígeno':
                                                                                            item.key}</span>
                                            </IonCol>
                                            <IonCol className="ms-2">
                                                <b>{item.value} {item.unidad}</b>
                                            </IonCol>
                                        </IonRow>
                                                                            
                                    )}

                            <IonItemDivider>
                                <IonLabel style = {{marginLeft:135}}>
                                    Discapacidades
                                </IonLabel>
                            </IonItemDivider>

                            {
                                discapacidades.length !== 0? <>
                                    {/* <Respuesta /> */}
                                    <p className="text-center lead mt-2">Sin datos para mostrar</p>
                                </>:
                                <>
                                    {
                                        discapacidades.map ( (item:any, index:any) =>
                                            <IonChip key = {index} color="medium">
                                              <IonLabel color="dark">{item.nombre_discapacidad}</IonLabel>
                                            </IonChip>
                                            // <Tag className = "mt-1">{item.nombre_discapacidad}</Tag>                                                        
                                        )
                                    }

                                </>
                            }

                            <IonItemDivider>
                                <IonLabel style = {{marginLeft:150}}>
                                    Alergias
                                </IonLabel>
                            </IonItemDivider>

                            {
                                descripcion === ""?<IonBadge style= {{marginLeft:110}} className = "mt-2 ion-text-center" color= "success">No se registran alergias</IonBadge>:
                                <IonBadge color="warning" className = "mt-2">El paciente tiene las siguientes alergias a estos medicamentos:{descripcion}</IonBadge>
                            }

                            <IonItemDivider>
                                <IonLabel style = {{marginLeft:90}}>
                                    Enfermedades persistentes
                                </IonLabel>
                            </IonItemDivider>

                            {
                                enfermedadadesPersistentes.length === 0? <>
                                    <Respuesta />
                                </>:
                                <>
                                    {
                                        enfermedadadesPersistentes.map ( (item:any, index:any) =>
                                            <IonChip key = {index} color="medium">
                                              <IonLabel color="dark">{item.nombre_enfermedad}</IonLabel>
                                            </IonChip>
                                            // <Tag className = "mt-1">{item.nombre_discapacidad}</Tag>                                                        
                                        )
                                    }

                                </>
                            }

                            <IonItemDivider>
                                <IonLabel style = {{marginLeft:90}}>
                                    Enfermedades hereditarias
                                </IonLabel>
                            </IonItemDivider>

                            {
                                enfermedadesHereditarias.length === 0? <>
                                    <Respuesta />
                                </>:
                                <>
                                    {
                                        enfermedadesHereditarias.map ( (item:any, index:any) =>
                                            <IonChip key = {index} color="medium">
                                              <IonLabel color="dark">{item.nombre_enfermedad}</IonLabel>
                                            </IonChip>
                                            // <Tag className = "mt-1">{item.nombre_discapacidad}</Tag>                                                        
                                        )
                                    }

                                </>
                            }

                            <IonItemDivider>
                                <IonLabel style = {{marginLeft:120}}>
                                    Citas anteriores
                                </IonLabel>
                            </IonItemDivider>

                            {

                                citas.map ( (item:any, index:any) =>(
                                    
                                    <Link key = {index} to = {`/medico/citaanterior/paciente/${item.id_cita}/${ced}`} className = "me-4">
                                    <IonItem lines="none" key = {index} className = "ion-activatable">
                                        {/* <IonLabel className="ion-text-center"> */}
                                        <IonLabel className="">
                                            <IonRippleEffect></IonRippleEffect>
                                            {/* ((moment(item.fecha_atencion).format('YYYY-MM-DD')+'').split('-')[2]) */}
                                            <h2><b>{((moment(item.fecha_atencion).format('YYYY-MM-DD')+'').split('-')[2])}</b></h2>
                                            <h2><b>{((moment(item.fecha_atencion).format('YYYY-MM-DD')+'').split('-')[1])}</b></h2>
                                            <h2><b>{((moment(item.fecha_atencion).format('YYYY-MM-DD')+'').split('-')[0])}</b></h2>
                                            <h2><b>{props.codigo}</b></h2>
                                        </IonLabel>
                                       <IonLabel className="me-5 pe-2">
                                           Dr. {item.nombre} {item.apellido}
                                       </IonLabel>
                                        <IonButton size="default" fill="clear" routerLink={`/edit/discapacidades/${props.id_discapacidad}`}><IonIcon slot="end" color="medium" icon={eye}></IonIcon></IonButton>
                                    </IonItem>
                                    </Link>
                                ))

                            }

                            <IonItemDivider>
                                <IonLabel style = {{marginLeft:130}}>
                                    Historico citas
                                </IonLabel>
                            </IonItemDivider>

                            {
                                observaciones.map( (item:any, index:any) => (
                                    <IonItem lines="none" key={index}>
                                        <IonLabel>
                                            {item.observRec}
                                        </IonLabel>
                                    </IonItem>
                                ))
                            }

                            {/* {
                                editionMode?
                                <IonItem>
                                    <IonLabel position="stacked">Estado<IonText color="danger">*</IonText></IonLabel>
                                    <IonSelect className="ion-margin-top" value={estado} name="estado" onIonChange={(e) => setEstado(e.detail.value)} okText="Ok" cancelText="Cancelar">
                                        <IonSelectOption value="A">Activo</IonSelectOption>
                                        <IonSelectOption value="I">Inactivo</IonSelectOption>
                                    </IonSelect>
                                </IonItem> : null
                            }
                            <IonRow>
                                <IonCol>            
                                    <IonItem>
                                        <IonLabel position="stacked">Rol<IonText color="danger">*</IonText></IonLabel>
                                        <IonSelect className="ion-margin-top" value={idRol} name="estado" onIonChange={(e) => setidRol(e.detail.value)} okText="Ok" cancelText="Cancelar">
                                            {
                                                listaRoles.map( (item:any) => (
                                                    <IonSelectOption key = {item.nombre} value={item.id_rol}>{item.nombre}</IonSelectOption>
                                                ))
                                            }
                                        </IonSelect>
                                    </IonItem>              
                                </IonCol>
                            </IonRow>
 */}
                            {/* <IonRow style={{marginTop: 20 }} className = "ion-text-center">
                                <IonCol>
                                    <IonButton color="primary" type="submit" class="ion-no-margin">{editionMode?'Guardar cambios':'Guardar'}</IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton color="danger" class="ion-no-margin">
                                        <IonRouterLink color = "light" href = "/homeusuarios">
                                            Cancelar
                                        </IonRouterLink>
                                    </IonButton>          
                                </IonCol>
                            </IonRow> */}

                        </IonGrid>
                    </IonList>
                </form>

                <IonAlert
                    isOpen={mostrarConfirmacion}
                    onDidDismiss={() => setMostrarConfirmacion(false)}
                    header={'Confirmación'}
                    message={editionMode?'¿Desea guardar los nuevos cambios?':'¿Está seguro de agregar este nuevo usuario?'}
                    buttons={[         
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'danger',
                        handler: (blah:any) => {
                        setMostrarConfirmacion(false);
                        }
                    },
                    {
                        cssClass: 'success',
                        text: 'Aceptar',
                        handler: () => {
                            if(editionMode){
                                actualizar_usuario_administrador();
                            }else{
                                almacenar_usuario();              
                            }
                        setCargando(true);
                        }
                    }        
                    ]}
                />

                <IonAlert
                    isOpen={camposIncompletos}
                    subHeader={'Contraseñas:'}
                    message={"La confirmción de la contraseña no coincide, revíselos por favor"}
                    buttons={[          
                    {
                        text: 'Ok',
                        handler: () => {
                        console.log('Aceptar');
                        setCamposIncompletos(false);
                        }
                    },
                    ]}
                />

                <IonAlert
                    isOpen={incompletos}
                    subHeader={'Incompleto:'}
                    message={"Faltan datos por completar, revíselos por favor"}
                    buttons={[          
                    {
                        text: 'Ok',
                        handler: () => {
                        console.log('Aceptar');
                        setIncompletos(false);
                        }
                    },
                    ]}
                />

                <IonLoading
                    isOpen={cargando}
                    message={editionMode?'Cargando datos. Espere por favor...':'Registrando Información. Espere por favor...'}
                />

                <IonAlert
                    isOpen={alerta}
                    onDidDismiss={() => setAlerta(false) }
                    header={mensaje}
                    buttons={[   
                        {
                          text: 'Aceptar',
                          handler: () => {
                            props.history.push('/homeusuarios');
                          }
                        }
                    ]}
                />

                <IonLoading
                    isOpen={mostrarLoad}
                    message={'Deshabilitando usuario. Espere por favor...'}
                />

                <IonAlert
                    onDidDismiss = {() => setMostrarConfirmacionEliminar(false)}
                    isOpen={mostrarConfirmacionEliminar}
                    header={"Deshabilitar usuario"}
                    message={'¿Está seguro de deshabilitar este usuario?'}
                    buttons={[
                        {
                            text: 'No',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => {
                                setMostrarConfirmacionEliminar(false);
                            }
                        },
                        {
                            text: 'Si',
                            handler: () => {
                                eliminar();
                            }
                        }
                    ]}
                />

                <IonAlert
                    isOpen={alertaEliminar}
                    onDidDismiss={() => setAlertaEliminar(false) }
                    header={"Registro eliminado satisfactoriamente"}
                    buttons={[   
                        {
                          text: 'Aceptar',
                          handler: () => {
                            props.history.push('/homeusuarios');
                          }
                        }
                    ]}
                />

            </IonContent>
        </IonPage>
    )
}

export default ExpedientePaciente
