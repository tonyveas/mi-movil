import React from 'react';
import {
    IonContent, IonToolbar, IonIcon, IonTitle, IonButtons, IonButton,
    IonList, IonItem, IonLabel,
    IonRippleEffect,
    IonAvatar,
    IonNote,
    IonModal
} from '@ionic/react';

import { trash, create, close, key, barcode, list, reader, eye } from 'ionicons/icons';
import Auth from '../../Login/Auth';


export default class ItemSeguimiento extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            seguimiento: {},
            open: false,
        }

    }

    getRoute(posFix = "") {
        if (Auth.isMedico()) return "/medico" + posFix;
        if (Auth.isPaciente()) return "/paciente" + posFix;
        return "/cuidador" + posFix;
    }

    render() {
        const props = this.props.seguimiento;
        return (
            <div>
                <IonItem key={props.id_seguimiento} className="ion-activatable">
                   
                    
                    <IonLabel onClick={() => this.setState({ open: true })}>
                        <IonRippleEffect></IonRippleEffect>
                        <h2><b>Estado: {props.estadoSeguimiento === "P" ? "En Proceso" : "Finalizado"}</b></h2>
                        <h3>Paciente: {props.paciente}</h3>
                        <p>Medico: {props.medico}</p>
                    </IonLabel> 
                    <IonAvatar slot="start">
                        <img color="" src="./assets/img/icons/medicinas/medicina.png" alt="usuariol" />
                    </IonAvatar>
                    <IonButton size="default" fill="clear" routerLink={this.getRoute("/seguimiento/") + `${props.id_seguimiento}`}><IonIcon slot="end" color="medium" icon={create}></IonIcon></IonButton>
                    {props.estadoSeguimiento === "P" ? <IonButton  size="default" fill="clear" onClick={() => this.props.handler_eliminar(props)}><IonIcon slot="end" color="medium" icon={trash}></IonIcon></IonButton> : null}
                </IonItem>

                <IonModal
                    isOpen={this.state.open}
                    onDidDismiss={() => this.setState({ open: false })}
                >
                    <IonToolbar color="primary">
                        <IonTitle>Detalle del Seguimiento</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => this.setState({ open: false })}><IonIcon icon={close}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>

                    <IonContent>
                        <IonList lines="none">
                            <IonItem>
                                <img style={{ marginLeft: 150, marginTop: 25, marginBottom: 25 }} src="./assets/img/icons/medicinas/medicina.png" alt="usuario" />
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Paciente</IonLabel>
                                <IonNote slot="end">{props.paciente}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Medico a Cargo</IonLabel>
                                <IonNote slot="end">{props.medico}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Iniciado en</IonLabel>
                                <IonNote slot="end">{props.fecha_inicio}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Finalizado en</IonLabel>
                                <IonNote slot="end">{props.fecha_fin ? props.fecha_fin : "N/A"}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Estado</IonLabel>
                                <IonNote slot="end">{props.estadoSeguimiento === "P" ? "En Proceso" : "Finalizado"}</IonNote>
                            </IonItem>
                        </IonList>
                    </IonContent>
                </IonModal>
            </div>
        );
    }
}