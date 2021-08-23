import React from 'react';
import {
    IonContent, IonToolbar, IonIcon, IonTitle, IonPage, IonButtons, IonBackButton, IonButton, IonPopover, IonLoading,
    IonRefresher, IonRefresherContent, IonSearchbar, IonList, IonItem, IonLabel, IonDatetime,
    useIonViewWillEnter,
    IonInfiniteScroll, IonInfiniteScrollContent,
    IonAlert,
    IonModal,
    IonInput,
    IonSelect,
    IonSelectOption
} from '@ionic/react';
import Auth from '../../Login/Auth';
import { add, arrowBackOutline, close, key } from 'ionicons/icons';
import Respuesta from '../Respuesta';
import ItemSeguimiento from './ItemSeguimiento';
import AxiosSeguimientos from './../../Services/AxiosSeguimientos';

export default class HomeSeguimientos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            loadingCancel: false,
            userData: {},
            mostrarConfirmacion: false,
            seguimientos: []
        }

    }

    getRoute(posFix = "") {
        if (Auth.isMedico()) return "/medico" + posFix;
        if (Auth.isPaciente()) return "/paciente" + posFix;
        return "/cuidador" + posFix;
    }

    componentDidMount() {

        this.getSeguimientos(this.getPersona());
    }

    getPersona() {
        if (Auth.isMedico()) {
            return { medico: Auth.getDataUser().cedula };
        }
        if (Auth.isPaciente()) {
            return { paciente: Auth.getDataUser().cedula };
        }

        return { cuidador: Auth.getDataUser().cedula };
    }

    getSeguimientos(filtro = {}, e = null) {
        AxiosSeguimientos.getSeguimientos(filtro).then(resp => {
            console.log(resp);
            const segs = resp.data.map(seg => {
                return {
                    ...seg,
                    paciente: seg.nombrePaciente && seg.apellidoPaciente ? seg.nombrePaciente + " " + seg.apellidoPaciente : "N/A",
                    medico: seg.nombreMedico && seg.apellidoMedico ? seg.nombreMedico + " " + seg.apellidoMedico : "N/A",
                }

            });
            if (e) e.detail.complete();
            this.setState({ seguimientos: segs, isLoading: false });

        }).catch(error => {
            console.log(error);
            if (e) e.detail.complete();
            this.setState({ isLoading: false });
        });
    }

    updateSeguimiento(data) {
        this.setState({ loadingFinalizar: true });
        AxiosSeguimientos.finalizarSeguimiento(data).then(resp => {
            console.log(resp);
            this.setState({ loadingFinalizar: false });
            this.getSeguimientos(this.getPersona());
        }).catch(error => {
            console.log(error);
            this.setState({ loadingFinalizar: false });
        });
    }

    handlerCancel = (seg) => { this.setState({ mostrarConfirmacion: true, seg }) }


    render() {
        return (
            <IonPage>
                <IonToolbar color="primary">
                    <IonButtons slot="start">

                        <IonButton routerLink={this.getRoute()}>
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Seguimientos de Pacientes</IonTitle>
                </IonToolbar>

                <IonContent>
                    {
                        this.state.seguimientos.length === 0 ? <Respuesta /> : null
                    }
                    <IonRefresher slot="fixed" onIonRefresh={(e) => this.getSeguimientos(this.getPersona(), e)}>
                        <IonRefresherContent
                            pullingIcon="arrow-dropdown"
                            pullingText="Pull to refresh"
                            refreshingSpinner="circles"
                            refreshingText="Actualizando...">
                        </IonRefresherContent>
                    </IonRefresher>

                    <IonList>
                        {
                            this.state.seguimientos.map((item) => (
                                <ItemSeguimiento
                                    seguimiento={item}
                                    handler_eliminar={this.handlerCancel.bind(this)}
                                />
                            ))
                        }
                    </IonList>

                    {
                        this.state.seguimientos.length !== 0 ?
                            <div className="ion-margin">
                                <IonItem lines="none">
                                    <br />
                                    <IonLabel color="medium" class="ion-text-center">No hay más registros que mostrar</IonLabel>
                                    <br />
                                </IonItem>
                            </div> : null
                    }
                </IonContent>
                <IonLoading
                    isOpen={this.state.isLoading}
                    message={'Cargando datos. Espere por favor...'}
                />

                <IonLoading
                    isOpen={this.state.loadingFinalizar}
                    message={'Finalizando Seguimiento. Espere por favor...'}
                />

                <IonAlert
                    onDidDismiss={() => this.setState({ mostrarConfirmacion: false })}
                    isOpen={this.state.mostrarConfirmacion}
                    header={"Finalizar Seguimiento"}
                    message={'¿Está seguro de finalizar este seguimiento?'}
                    buttons={[
                        {
                            text: 'No',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => {
                                this.setState({ mostrarConfirmacion: false })
                            }
                        },
                        {
                            text: 'Si',
                            handler: () => {
                                this.setState({ seg: { ...this.state.seg, estado: "F" } }, () => { this.updateSeguimiento(this.state.seg)})
                            }
                        }
                    ]}
                />

                <IonAlert
                    isOpen={this.state.alerta}
                    onDidDismiss={() => this.setState({ alert: false })}
                    header={"Registro cancelado satisfactoriamente"}
                    buttons={['Aceptar']}
                />

            </IonPage>

        );
    }


}