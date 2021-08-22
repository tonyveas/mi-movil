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
        return (
            <div>
                <IonItem key={props.cedula} className="ion-activatable">
                    {Auth.isMedico() ? <IonLabel onClick={() => this.setState({ open: true })}>
                        <IonRippleEffect></IonRippleEffect>
                        <h2><b>{props.cedula}</b></h2>
                        <h3>{props.nombre} {props.apellido}</h3>
                        <p>{props.correo}</p>
                    </IonLabel> : null}
                    {Auth.isPaciente() ? <IonLabel onClick={() => this.setState({ open: true })}>
                        <IonRippleEffect></IonRippleEffect>
                        <h2><b>{props.especialidad}</b></h2>
                        <h3>{props.nombre} {props.apellido}</h3>
                        <p>{props.cedula}</p>
                    </IonLabel> : null}
                    {Auth.isCuidador() ? <IonLabel onClick={() => this.setState({ open: true })}>
                        <IonRippleEffect></IonRippleEffect>
                        <h2><b>{props.especialidad}</b></h2>
                        <h3>{props.nombrePaciente} {props.apellidoPaciente}</h3>
                        <p>{props.cedulaPaciente}</p>
                    </IonLabel> : null}
                    <IonAvatar slot="start">
                        <img src="./assets/img/icons/usuarios/usuario.png" alt="usuariol" />
                    </IonAvatar>
                    <IonButton size="default" fill="clear" routerLink={this.getRoute("/formAgendaCitas/edit/") + `${props.id}`}><IonIcon slot="end" color="medium" icon={create}></IonIcon></IonButton>
                    {props.estado === "P" ? <IonButton  size="default" fill="clear" onClick={() => this.props.handler_eliminar(props)}><IonIcon slot="end" color="medium" icon={trash}></IonIcon></IonButton> : null}
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
                            {Auth.isMedico() ? <IonItem>
                                <IonIcon slot="start" icon={key}></IonIcon>
                                <IonLabel>Paciente</IonLabel>
                                <IonNote slot="end">{props.nombre} {props.apellido}</IonNote>
                            </IonItem> : null}
                            {Auth.isPaciente() ? <div>
                                <IonItem>
                                    <IonIcon slot="start" icon={key}></IonIcon>
                                    <IonLabel>Médico</IonLabel>
                                    <IonNote slot="end">{props.nombre} {props.apellido}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={key}></IonIcon>
                                    <IonLabel>Especialidad</IonLabel>
                                    <IonNote slot="end">{props.especialidad}</IonNote>
                                </IonItem>
                            </div> : null}
                            {Auth.isCuidador() ? <div>
                                <IonItem>
                                    <IonIcon slot="start" icon={key}></IonIcon>
                                    <IonLabel>Médico</IonLabel>
                                    <IonNote slot="end">{props.nombreMedico} {props.apellidoMedico}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={key}></IonIcon>
                                    <IonLabel>Cedula Médico</IonLabel>
                                    <IonNote slot="end">{props.cedulaMedico}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={key}></IonIcon>
                                    <IonLabel>Paciente</IonLabel>
                                    <IonNote slot="end">{props.nombrePaciente} {props.apellidoPaciente}</IonNote>
                                </IonItem>
                                <IonItem>
                                    <IonIcon slot="start" icon={key}></IonIcon>
                                    <IonLabel>Cedula Paciente</IonLabel>
                                    <IonNote slot="end">{props.cedulaMedico}</IonNote>
                                </IonItem>
                            </div> : null}
                            {Auth.isPaciente() || Auth.isMedico() ? <IonItem>
                                <IonIcon slot="start" icon={key}></IonIcon>
                                <IonLabel>Cedula</IonLabel>
                                <IonNote slot="end">{props.cedula}</IonNote>
                            </IonItem> : null}
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Inicio de la Cita</IonLabel>
                                <IonNote slot="end">{props.start}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Fin de la Cita</IonLabel>
                                <IonNote slot="end">{props.end}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={key}></IonIcon>
                                <IonLabel>Estado</IonLabel>
                                <IonNote slot="end">{props.estado === "P" ? "Pendiente" : props.estado === "C" ? "Cancelada" : "Atendida"}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Comentario</IonLabel>
                                <IonNote slot="end">{props.desc}</IonNote>
                            </IonItem>


                        </IonList>
                    </IonContent>
                </IonModal>
            </div>
        );
    }

}