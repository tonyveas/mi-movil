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

export default class ItemCitas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cita: {},
            open: false,
        }

    }

    getRoute(posFix = "") {
        if (Auth.isMedico()) return "/medico" + posFix;
        if (Auth.isPaciente()) return "/paciente" + posFix;
        return "/cuidador" + posFix;
    }


    render() {
        const props = this.props.cita;
        const id_seguimiento = this.props.id_seguimiento;

        return (
            <div>
                <IonItem key={props.cedula} className="ion-activatable">
                    <IonLabel onClick={() => this.setState({ open: true })}>
                        <IonRippleEffect></IonRippleEffect>
                        <h2><b>Estado: {props.estado === "P" ? "Pendiente" : props.estado === "C" ? "Cancelada" : "Atendida"}</b></h2>
                        <h3>Inicio: {props.inicio_cita}</h3>
                        <p>Fin: {props.fin_cita}</p>
                    </IonLabel>
                    <IonAvatar slot="start">
                        <img src="./assets/img/icons/usuarios/usuario.png" alt="usuariol" />
                    </IonAvatar>
                    {props.estado === "P" ? <IonButton size="default" fill="clear" onClick={() => this.props.handler_eliminar(props)}><IonIcon slot="end" color="medium" icon={trash}></IonIcon></IonButton> : null}
                </IonItem>

                <IonModal
                    isOpen={this.state.open}
                    onDidDismiss={() => this.setState({ open: false })}
                >
                    <IonToolbar color="primary">
                        <IonTitle>Detalle de la Cita</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => this.setState({ open: false })}><IonIcon icon={close}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>

                    <IonContent>
                        <IonList lines="none">
                            <IonItem>
                                <img style={{ marginLeft: 150, marginTop: 25, marginBottom: 25 }} src="./assets/img/icons/usuarios/usuario.png" alt="usuario" />
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Cedula Médico</IonLabel>
                                <IonNote slot="end">{props.medico}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Cedula Paciente</IonLabel>
                                <IonNote slot="end">{props.paciente}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Inicio de la Cita</IonLabel>
                                <IonNote slot="end">{props.inicio_cita}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Fin de la Cita</IonLabel>
                                <IonNote slot="end">{props.fin_cita}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Estado</IonLabel>
                                <IonNote slot="end">{props.estado === "P" ? "Pendiente" : props.estado === "C" ? "Cancelada" : "Atendida"}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Comentario</IonLabel>
                                <IonNote slot="end">{props.init_comment}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Observaciones y Recomentaciones</IonLabel>
                                <IonNote slot="end">{props.observRec}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Plan de Tratamiento</IonLabel>
                                <IonNote slot="end">{props.planTratam}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Sintomas</IonLabel>
                                <IonNote slot="end">{props.sintomas}</IonNote>
                            </IonItem>
                        </IonList>
                    </IonContent>
                </IonModal>
            </div>
        );
    }

}