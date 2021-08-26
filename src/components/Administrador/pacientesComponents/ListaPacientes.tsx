import React from 'react';
import {
    IonContent, IonToolbar, IonIcon, IonTitle, IonButtons, IonButton,
    IonList, IonItem, IonLabel,
    IonRippleEffect,
    IonAvatar,
    IonNote,
    IonModal
} from '@ionic/react';

import { trash, create,close, key, barcode, list, reader, eye } from 'ionicons/icons';

const ListaPacientes  = (props:any) => {

    const [detalleVentana, setDetalleVentana] = React.useState(false);    

    return (
        <div>
            <IonItem key = {props.cedula} className = "ion-activatable">
                <IonLabel onClick={() => setDetalleVentana(true)}>
                    <IonRippleEffect></IonRippleEffect>
                    <h2><b>{props.cedula}</b></h2>
                    <h3>{props.nombre} {props.apellido}</h3>
                    <p>{props.correo}</p>
                </IonLabel>
                <IonAvatar slot="start">
                    <img src="./assets/img/icons/usuarios/usuario.png"  alt="usuariol" />
                </IonAvatar> 
                <IonButton size="default" fill="clear" routerLink={`/medico/homepacientes/expedientepaciente/${props.cedula}`}><IonIcon slot="end" color="medium" icon={eye}></IonIcon></IonButton>
                {/* <IonButton disabled = {props.estado==="I"?true:false} size="default" fill="clear" onClick = { () => props.handler_eliminar() }><IonIcon slot="end" color="medium" icon={trash}></IonIcon></IonButton> */}
            </IonItem>

            <IonModal
                isOpen={detalleVentana}
                onDidDismiss={() => setDetalleVentana(false)}
            >
                <IonToolbar color="primary">
                    <IonTitle>Detalle Usuario</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setDetalleVentana(false)}><IonIcon icon={close}></IonIcon></IonButton>
                    </IonButtons>
                </IonToolbar>

                <IonContent>
                    <IonList lines = "none">
                        <IonItem>
                            <img style={{ marginLeft: 150, marginTop: 25, marginBottom: 25 }} src="./assets/img/icons/usuarios/usuario.png"  alt="usuario" />
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Nombre</IonLabel>
                            <IonNote slot="end">{props.nombre}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Apellido</IonLabel>
                            <IonNote slot="end">{props.apellido}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Cedula</IonLabel>
                            <IonNote slot="end">{props.cedula}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Correo</IonLabel>
                            <IonNote slot="end">{props.correo}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Sexo</IonLabel>
                            <IonNote slot="end">{props.sexo === "M"? "Masculino": props.sexo === "F"? "Femenino":"Prefiero no decirlo"}</IonNote>
                        </IonItem>
                        
                        
                    </IonList>
                </IonContent>
            </IonModal>
        </div>
    );
}
export default ListaPacientes;