import { IonPage, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonRow, IonGrid, IonCol, IonItem, IonLabel, IonList, IonInput, IonText, IonTextarea, IonButton, IonRouterLink, IonAlert, IonLoading, useIonViewWillLeave, useIonViewWillEnter, IonIcon, IonDatetime, IonSelect, IonSelectOption} from '@ionic/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import {eye, eyeOff, trash} from 'ionicons/icons';
import AxiosUsers from '../../Services/AxiosUsers';
import AxiosRoles from '../../Services/AxiosRoles';
import '../../../src/components/style.css';
import moment from 'moment';

const FormularioUsuarios = (props:any) => {

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

    const {ced} = useParams<{ced:string}>();

    useIonViewWillEnter(() => {
        //console.log('ionViewWillEnter event fired');
        mostrar_roles();
        if (editionMode){
            setCargando(true);
            obtener_usuario_por_cedula();
        }
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
                    <IonBackButton defaultHref="/admin/homeusuarios"></IonBackButton>
                </IonButtons>
                <IonTitle >  {editionMode?'Editar Usuario':'Registrar usuario'} </IonTitle>
                <IonButtons slot="end">
                    <IonButton hidden = {!editionMode?true:false} onClick = {() => setMostrarConfirmacionEliminar(true)} ><IonIcon icon={trash}></IonIcon></IonButton>
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
                            </IonRow>
                            <IonRow>
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
                            </IonRow>
                            {
                                !editionMode?<>
                                    <IonRow>
                                        <IonCol>            
                                            <IonItem>
                                                <IonLabel position="stacked">Contraseña<IonText color="danger">*</IonText></IonLabel>
                                                <IonInput value = {password}  minlength = {5} type = {passwordMode ? "password" : "text"} className = "ion-margin-top" required disabled = {false} onIonChange={ (e:any) => setPassword(e.target.value)} ></IonInput>
                                                <IonIcon className = "btn_eye_icon" icon = {passwordMode? eye:eyeOff} color = "danger" onClick = {() => cambiar_tipo()}></IonIcon>
                                            </IonItem>              
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol>            
                                            <IonItem>
                                                <IonLabel position="stacked">Confirmar contraseña<IonText color="danger">*</IonText></IonLabel>
                                                <IonInput value = {passwordConfirm}  minlength = {5} type = {passwordModeConfirm ? "password" : "text"} className = "ion-margin-top" required disabled = {false} onIonChange={ (e:any) => setPasswordConfirm(e.target.value)} ></IonInput>
                                                <IonIcon className = "btn_eye_icon" icon = {passwordModeConfirm? eye:eyeOff} color = "danger" onClick = {() => cambiar_tipo_confirm()}></IonIcon>
                                            </IonItem>              
                                        </IonCol>
                                    </IonRow>
                                </>:null
                            }
                            <IonRow>
                                <IonCol>            
                                    <IonItem>
                                        <IonLabel position="stacked">Cédula<IonText color="danger">*</IonText></IonLabel>
                                        <IonInput value = {cedula}  minlength = {10} type = "text" className = "ion-margin-top" required disabled = {false} onIonChange={ (e:any) => setCedula(e.target.value)} ></IonInput>
                                    </IonItem>              
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>            
                                    <IonItem>
                                        <IonLabel position="stacked">Usuario<IonText color="danger">*</IonText></IonLabel>
                                        <IonInput className = "ion-margin-top" required disabled = {false} value = {username} onIonChange={ (e:any) => setUsername(e.target.value)} ></IonInput>
                                    </IonItem>              
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>            
                                    <IonItem>
                                        <IonLabel position="stacked">Fecha de nacimiento<IonText color="danger">*</IonText></IonLabel>
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
                                    <IonItem>
                                        <IonLabel position="stacked">Género<IonText color="danger">*</IonText></IonLabel>
                                        <IonSelect className="ion-margin-top" value={sexo} name="estado" onIonChange={(e) => setSexo(e.detail.value)} okText="Ok" cancelText="Cancelar">
                                            <IonSelectOption value="M">Hombre</IonSelectOption>
                                            <IonSelectOption value="F">Mujer</IonSelectOption>
                                            <IonSelectOption value="P">Prefiero no decirlo</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>                   
                                </IonCol>
                            </IonRow>
                            {
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

                            <IonRow style={{marginTop: 20 }} className = "ion-text-center">
                                <IonCol>
                                    <IonButton color="primary" type="submit" class="ion-no-margin">{editionMode?'Guardar cambios':'Guardar'}</IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton color="danger" class="ion-no-margin">
                                        <IonRouterLink color = "light" href = "/admin/homeusuarios">
                                            Cancelar
                                        </IonRouterLink>
                                    </IonButton>          
                                </IonCol>
                            </IonRow>

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

export default FormularioUsuarios
