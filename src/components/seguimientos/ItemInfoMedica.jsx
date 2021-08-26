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

export default class ItemSeguimiento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sig: {},
            open: false,
        }

    }

    getRoute(posFix = "") {
        if (Auth.isMedico()) return "/medico" + posFix;
        if (Auth.isPaciente()) return "/paciente" + posFix;
        return "/cuidador" + posFix;
    }


    render() {
        const props = this.props.signo;
        const id_seguimiento = this.props.id_seguimiento;
        const medico = this.props.medico;
        const paciente = this.props.paciente;
        return (
            <div>
                <IonItem key={props.id_info_medica} className="ion-activatable">


                    <IonLabel onClick={() => this.setState({ open: true })}>
                        <IonRippleEffect></IonRippleEffect>
                        <h2><b>{props.key}</b></h2>
                        <h3>Valor: {props.value}</h3>
                        <p>Unidad: {props.unidad}</p>
                    </IonLabel>
                    <IonAvatar slot="start">
                        <img color="" src="./assets/img/icons/medicinas/medicina.png" alt="usuariol" />
                    </IonAvatar>
                    <IonButton size="default" fill="clear" routerLink={this.getRoute("/seguimiento/infomedica/edit/") + props.id_info_medica + "/" + id_seguimiento}><IonIcon slot="end" color="medium" icon={create}></IonIcon></IonButton>
                    <IonButton size="default" fill="clear" onClick={() => this.props.handler_eliminar(props)}><IonIcon slot="end" color="medium" icon={trash}></IonIcon></IonButton>
                </IonItem>

                <IonModal
                    isOpen={this.state.open}
                    onDidDismiss={() => this.setState({ open: false })}
                >
                    <IonToolbar color="primary">
                        <IonTitle>Detalle del Signo Vital</IonTitle>
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
                                <IonLabel>Signo Vital</IonLabel>
                                <IonNote slot="end">{props.key}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Valor</IonLabel>
                                <IonNote slot="end">{props.value}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Unidad</IonLabel>
                                <IonNote slot="end">{props.unidad}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>descripción</IonLabel>
                                <IonNote slot="end">{props.descrip}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Fecha Registro</IonLabel>
                                <IonNote slot="end">{props.created_at}</IonNote>
                            </IonItem>
                        </IonList>
                    </IonContent>
                </IonModal>
            </div>
        );
    }
}