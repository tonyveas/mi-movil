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

export default class ItemExamen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            examen: {},
            open: false,
        }

    }

    getRoute(posFix = "") {
        if (Auth.isMedico()) return "/medico" + posFix;
        if (Auth.isPaciente()) return "/paciente" + posFix;
        return "/cuidador" + posFix;
    }

    render() {
        const props = this.props.examen;
        const id_seguimiento = this.props.id_seguimiento;
        const medico = this.props.medico;
        const paciente = this.props.paciente;
        return (
            <div>
                <IonItem key={props.id_info_medica} className="ion-activatable">


                    <IonLabel onClick={() => this.setState({ open: true })}>
                        <IonRippleEffect></IonRippleEffect>
                        <h2>Tipo: <b>{props.tipo_examen}</b></h2>
                        <h3>Diagnostico: {props.diagnostico}</h3>
                    </IonLabel>
                    <IonAvatar slot="start">
                        <img color="" src="./assets/img/icons/medicinas/medicina.png" alt="usuariol" />
                    </IonAvatar>
                    <IonButton size="default" fill="clear" routerLink={this.getRoute("/seguimiento/examenes/edit/") + props.id_examen + "/" + id_seguimiento}><IonIcon slot="end" color="medium" icon={create}></IonIcon></IonButton>
                    <IonButton size="default" fill="clear" onClick={() => this.props.handler_eliminar(props)}><IonIcon slot="end" color="medium" icon={trash}></IonIcon></IonButton>
                </IonItem>

                <IonModal
                    isOpen={this.state.open}
                    onDidDismiss={() => this.setState({ open: false })}
                >
                    <IonToolbar color="primary">
                        <IonTitle>Detalle del Examen</IonTitle>
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
                                <IonLabel>Tipo de Examen</IonLabel>
                                <IonNote slot="end">{props.tipo_examen}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Diagnostico</IonLabel>
                                <IonNote slot="end">{props.diagnostico}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonIcon slot="start" icon={reader}></IonIcon>
                                <IonLabel>Comentarios</IonLabel>
                                <IonNote slot="end">{props.comentarios}</IonNote>
                            </IonItem>
                            {props.url_examen ?
                                <div>
                                    <IonItem>
                                        <IonIcon slot="start" icon={reader}></IonIcon>
                                        <IonLabel>Archivos (Imágenes)</IonLabel>

                                    </IonItem>
                                    {
                                        props.url_examen.split(",").map((img) => (
                                            <div style={{textAlign: "center", margin: "20px"}}>
                                                <img style={{ width: "240px", height: "120px" }} src={img} alt="examen" />
                                            </div>
                                        ))
                                    }
                                </div> : null}
                        </IonList>
                    </IonContent>
                </IonModal>
            </div>
        );
    }
}