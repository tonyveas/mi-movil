import { IonPage, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonRow, IonGrid, IonCol, IonItem, IonLabel, IonList, IonInput, IonText, IonTextarea, IonButton, IonRouterLink, IonAlert, IonLoading, useIonViewWillLeave, useIonViewWillEnter, IonIcon} from '@ionic/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import AxiosMedicamentos from '../../Services/AxiosMedicamentos';
import {arrowBackOutline, trash} from 'ionicons/icons';

const FormularioMedicamentos = (props:any) => {

    const [editionMode, setEditionMode] = React.useState(useParams<{id:string}>().id !== undefined);
    const [mostrarLoad, setMostrarLoad] = React.useState(false);
    const [nombre, setNombre] = React.useState("");
    const [codigo, setCodigo] = React.useState("");
    const [descrip, setDescrip] = React.useState("");
    const [mensaje, setMensaje] = React.useState("");
    const [mostrarConfirmacion, setMostrarConfirmacion] = React.useState(false);
    const [mostrarConfirmacionEliminar, setMostrarConfirmacionEliminar] = React.useState(false);
    const [cargando, setCargando] = React.useState(false);
    const [camposIncompletos, setCamposIncompletos] = React.useState(false);
    const [alerta, setAlerta] = React.useState(false);
    const [alertaEliminar, setAlertaEliminar] = React.useState(false);

    const {id} = useParams<{id:string}>();

    useIonViewWillEnter(() => {
        //console.log('ionViewWillEnter event fired');
        if (editionMode){
            setCargando(true);
            obtener_medicamento_por_id();
        }
    });

    const obtener_medicamento_por_id = () => {
        AxiosMedicamentos.obtener_medicamento_por_id(id).then( response => {
          setNombre((response.data[0]).nombre);
          setCodigo((response.data[0]).codigo);
          setDescrip((response.data[0]).descrip);
          setCargando(false);
        });  
      }

    const actualizar_medicamento = () => {
    AxiosMedicamentos.actualizar_medicamento({"id_medicamento":id, "nombre": nombre, "codigo": codigo, "descrip": descrip}).then ( response => {
        setCargando(false);
        setMensaje("Registro actualizado satisfactoriamente")
        setAlerta(true);
    });
    }

    const validar = (e:any) => {
        e.preventDefault();
        if (!nombre.trim() || !codigo.trim() || !descrip.trim()){
            setCamposIncompletos(true);
            return;
        }else{
            setMostrarConfirmacion(true)
        }
    }

    useIonViewWillLeave(() => {
        console.log('ionViewWillLeave event fired');
        setNombre("");
        setCodigo("");
        setDescrip("");
    });

    const almacenar_medicamento = () => {
        AxiosMedicamentos.almacenar_medicamento({nombre: nombre, codigo: codigo, descrip: descrip}).then((res:any)=>{
            console.log(res.data);
            setCargando(false);
            setMensaje("Registro almacenado satisfactoriamente")
            setAlerta(true);
        });
    }

    const eliminar = () => {
        setMostrarConfirmacionEliminar(false);
        setMostrarLoad(true);
        AxiosMedicamentos.eliminar_medicamento(id).then( res => {
            setMostrarLoad(false);
            setAlertaEliminar(true);
        });
    }

    return (
        <IonPage>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    {/* <IonBackButton defaultHref="/admin/homemedicamentos"></IonBackButton> */}
                    {/* <IonButton onClick = {() => props.history.push('/admin/homemedicamentos')}>
                        <IonIcon slot="icon-only" icon={arrowBackOutline} />
                    </IonButton> */}
                    <IonButton routerLink="/admin/homemedicamentos">
                        <IonIcon slot="icon-only" icon={arrowBackOutline} />
                    </IonButton>
                </IonButtons>
                <IonTitle >  {editionMode?'Editar Medicamento':'Registrar medicamento'} </IonTitle>
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
                                    <img style={{marginTop: 20, marginBottom:20 }} src="./assets/img/icons/medicinas/medicina.png"  alt="medicina" />
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
                                        <IonLabel position="stacked">Código<IonText color="danger">*</IonText></IonLabel>
                                        <IonInput className = "ion-margin-top" required disabled = {false} type="text" value = {codigo} onIonChange={ (e:any) => setCodigo(e.target.value)} ></IonInput>
                                    </IonItem>              
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>            
                                    <IonItem>
                                        <IonLabel position="stacked">Descripción<IonText color="danger">*</IonText></IonLabel>
                                        <IonTextarea rows = {5} className = "ion-margin-top" required disabled = {false} value = {descrip} onIonChange={ (e:any) => setDescrip(e.target.value)} ></IonTextarea>
                                    </IonItem>              
                                </IonCol>
                            </IonRow>

                            <IonRow style={{marginTop: 20 }} className = "ion-text-center">
                                <IonCol>
                                    <IonButton color="primary" type="submit" class="ion-no-margin">{editionMode?'Guardar cambios':'Guardar'}</IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton routerLink="/admin/homemedicamentos" color="danger" class="ion-no-margin">
                                            Cancelar
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
                    message={editionMode?'¿Desea guardar los nuevos cambios?':'¿Está seguro de agregar este nuevo medicamento?'}
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
                                actualizar_medicamento();
                            }else{
                                almacenar_medicamento();              
                            }
                        setCargando(true);
                        }
                    }        
                    ]}
                />

                <IonAlert
                    isOpen={camposIncompletos}
                    subHeader={'Datos faltantes:'}
                    message={"Faltan de ingresar datos, vuelva a intentar"}
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
                            props.history.push('/admin/homemedicamentos');
                          }
                        }
                    ]}
                />

                <IonLoading
                    isOpen={mostrarLoad}
                    message={'Eliminando medicamento. Espere por favor...'}
                />

                <IonAlert
                    onDidDismiss = {() => setMostrarConfirmacionEliminar(false)}
                    isOpen={mostrarConfirmacionEliminar}
                    header={"Eliminar Medicamento"}
                    message={'¿Está seguro de eliminar este medicamento?'}
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
                            props.history.push('/admin/homemedicamentos');
                          }
                        }
                    ]}
                />

            </IonContent>
        </IonPage>
    )
}

export default FormularioMedicamentos
