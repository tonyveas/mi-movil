import React from 'react';
import {
    IonContent, IonToolbar, IonIcon, IonTitle, IonButtons, IonButton,
    IonList, IonItem, IonLabel,
    IonRippleEffect,
    IonAvatar,
    IonNote,
    IonModal
} from '@ionic/react';

import { trash, create,close, key, barcode, list, reader } from 'ionicons/icons';
import moment from 'moment';
//import 'moment/locale/es';

const ListaRecordatoriosCuidador  = (props:any) => {

    const [detalleVentana, setDetalleVentana] = React.useState(false);    

    return (
        <div>
            <IonItem key = {props.id_rol} className = "ion-activatable">
                <IonLabel onClick={() => setDetalleVentana(true)}>
                    <IonRippleEffect></IonRippleEffect>
                    <h2><b>Paciente: {props.nombre} {props.apellido}</b></h2>
                    <h3>Hora atención: {moment(props.start).format('LT')}</h3>
                    <p>Cédula: {props.cedula}</p>
                </IonLabel>
                <IonAvatar slot="start">
                    <img src="./assets/img/icons/notificaciones/notificacion.png"  alt="notificacion" />
                </IonAvatar> 
                {/* <IonButton size="default" fill="clear" routerLink={`/admin/edit/roles/${props.id_rol}`}><IonIcon slot="end" color="medium" icon={create}></IonIcon></IonButton>
                <IonButton size="default" fill="clear" onClick = { () => props.handler_eliminar() }><IonIcon slot="end" color="medium" icon={trash}></IonIcon></IonButton> */}
            </IonItem>

            <IonModal
                isOpen={detalleVentana}
                onDidDismiss={() => setDetalleVentana(false)}>
                <IonToolbar color="primary">
                    <IonTitle>Detalle notificación</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setDetalleVentana(false)}><IonIcon icon={close}></IonIcon></IonButton>
                    </IonButtons>
                </IonToolbar>
                
                <IonContent>
                    <IonList lines = "none">
                        <IonItem>
                            <img style={{ marginLeft: 150, marginTop: 25, marginBottom: 25 }} src="./assets/img/icons/notificaciones/notificacion.png"  alt="rol" />
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Nombre paciente</IonLabel>
                            <IonNote slot="end">{props.nombre_paciente}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Apellido paciente</IonLabel>
                            <IonNote slot="end">{props.apellido_paciente}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Cédula paciente</IonLabel>
                            <IonNote slot="end">{props.cedula_paciente}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Nombre médico</IonLabel>
                            <IonNote slot="end">{props.nombre_medico}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Apellido médico</IonLabel>
                            <IonNote slot="end">{props.apellido_medico}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Cédula médico</IonLabel>
                            <IonNote slot="end">{props.cedula_medico}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Especialidad</IonLabel>
                            <IonNote slot="end">{props.especialidad}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Inicio</IonLabel>
                            <IonNote slot="end">{moment(props.start).format('LT')}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Fin</IonLabel>
                            <IonNote slot="end">{moment(props.end).format('LT')}</IonNote>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonModal>
        </div>
    );
}
export default ListaRecordatoriosCuidador;