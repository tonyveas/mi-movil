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

const ListaDiscapacidades  = (props:any) => {

    const [detalleVentana, setDetalleVentana] = React.useState(false);    

    return (
        <div>
            <IonItem key = {props.id_discapacidad} className = "ion-activatable">
                <IonLabel onClick={() => setDetalleVentana(true)}>
                    <IonRippleEffect></IonRippleEffect>
                    <h2><b>{props.codigo}</b></h2>
                    <h3>Nombre: {props.nombre}</h3>
                    <p>Descripción: {props.descrip}</p>
                </IonLabel>
                <IonAvatar slot="start">
                    <img src="./assets/img/icons/discapacidades/discapacidad.png"  alt="discapacidad" />
                </IonAvatar> 
                <IonButton size="default" fill="clear" routerLink={`/admin/edit/discapacidades/${props.id_discapacidad}`}><IonIcon slot="end" color="medium" icon={create}></IonIcon></IonButton>
                <IonButton size="default" fill="clear" onClick = { () => props.handler_eliminar() }><IonIcon slot="end" color="medium" icon={trash}></IonIcon></IonButton>
            </IonItem>

            <IonModal
                isOpen={detalleVentana}
                onDidDismiss={() => setDetalleVentana(false)}>
                <IonToolbar color="primary">
                    <IonTitle>Detalle Discapacidad</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setDetalleVentana(false)}><IonIcon icon={close}></IonIcon></IonButton>
                    </IonButtons>
                </IonToolbar>
                
                <IonContent>
                    <IonList lines = "none">
                        <IonItem>
                            <img style={{ marginLeft: 150, marginTop: 25, marginBottom: 25 }} src="./assets/img/icons/discapacidades/discapacidad.png"  alt="discapacidad" />
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={key}></IonIcon>
                            <IonLabel>Id</IonLabel>
                            <IonNote slot="end">{props.id_discapacidad}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={barcode}></IonIcon>
                            <IonLabel>Código</IonLabel>
                            <IonNote slot="end">{props.codigo}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={list}></IonIcon>
                            <IonLabel>Nombre</IonLabel>
                            <IonNote slot="end">{props.nombre}</IonNote>
                        </IonItem>
                        <IonItem>
                            <IonIcon slot="start" icon={reader}></IonIcon>
                            <IonLabel>Descripción</IonLabel>
                            <IonNote slot="end">{props.descrip}</IonNote>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonModal>
        </div>
    );
}
export default ListaDiscapacidades;