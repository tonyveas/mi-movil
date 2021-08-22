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
import AxiosCitas from '../../Services/AxiosCitas';
import AxiosPersonas from '../../Services/AxiosPersonas';
import ItemCita from './itemCita';

export default class AgendaCitas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            citas: [],
            loading: true,
            loadingCancel: false,
            userData: {},
            mostrarConfirmacion: false,
        }

    }



    componentDidMount() {
        this.setState({ userData: Auth.getDataUser() }, () => { this.preLoadCitas(); });
    }

    preLoadCitas(e = null) {
        const filter = {
            cedula: this.state.userData.cedula,
        }
        if (Auth.isMedico()) {
            this.getCitasMedico(filter, e);
        } else if (Auth.isPaciente()) {
            this.getCitasPaciente(filter, e);
        } else {
            this.getCitasCuidador(filter, e);
        }
    }

    getCitasMedico(filter, e = null) {
        AxiosCitas.getCitasMedico(filter).then(resp => {
            console.log(resp);
            if (e) e.detail.complete();
            this.setState({ citas: resp.data, loading: false });

        }).catch(err => {
            if (e) e.detail.complete();
            console.log(err);
            this.setState({ loading: false });

        });
    }

    getCitasPaciente(filter, e = null) {
        AxiosCitas.getCitasPaciente(filter).then(resp => {
            console.log(resp);
            if (e) e.detail.complete();
            this.setState({ citas: resp.data, loading: false });
        }).catch(err => {
            console.log(err);
            if (e) e.detail.complete();
            this.setState({ loading: false });
        });
    }

    getCitasCuidador(filter, e = null) {
        AxiosCitas.getCitasCuidador(filter).then((resp) => {
            console.log(resp);
            if (e) e.detail.complete();
            this.setState({ citas: resp.data, loading: false });

        }).catch((err) => {
            console.log(err);
            if (e) e.detail.complete();
            this.setState({ loading: false });
        });
    }

    reangedarCancelarCita(cita) {
        this.setState({ loadingCancel: true })
        AxiosCitas.reangedarCancelarCita(cita).then(resp => {
            console.log(resp);
            this.setState({ loadingCancel: false, alert: false })
            this.preLoadCitas();
        }).catch(err => {
            console.log(err);
            this.setState({ loadingCancel: false })
        });
    }

    handlerCancel = (cita) => { this.setState({ mostrarConfirmacion: true, cita }) }
    getRoute(posFix = "") {
        if (Auth.isMedico()) return "/medico" + posFix;
        if (Auth.isPaciente()) return "/paciente" + posFix;
        return "/cuidador" + posFix;
    }
    render() {
        return (
            <IonPage>
                <IonToolbar color="primary">
                    <IonButtons slot="start">

                        <IonButton routerLink={this.getRoute()}>
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Agendado de Citas</IonTitle>
                    <IonButtons slot="end">
                        <IonButton routerLink={this.getRoute("/formAgendaCitas")}><IonIcon icon={add}></IonIcon></IonButton>
                    </IonButtons>
                </IonToolbar>

                <IonContent>
                    {
                        this.state.citas.length === 0 ? <Respuesta /> : null
                    }
                    <IonRefresher slot="fixed" onIonRefresh={(e) => this.preLoadCitas(e)}>
                        <IonRefresherContent
                            pullingIcon="arrow-dropdown"
                            pullingText="Pull to refresh"
                            refreshingSpinner="circles"
                            refreshingText="Actualizando...">
                        </IonRefresherContent>
                    </IonRefresher>

                    <IonList>
                        {
                            this.state.citas.map((item) => (
                                <ItemCita
                                    cita={item}
                                    handler_eliminar={this.handlerCancel.bind(this)}
                                />
                            ))
                        }
                    </IonList>

                    {
                        this.state.citas.length !== 0 ?
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
                    isOpen={this.state.loading}
                    message={'Cargando datos. Espere por favor...'}
                />

                <IonLoading
                    isOpen={this.state.loadingCancel}
                    message={'Cancelando Cita. Espere por favor...'}
                />

                <IonAlert
                    onDidDismiss={() => this.setState({ mostrarConfirmacion: false })}
                    isOpen={this.state.mostrarConfirmacion}
                    header={"Cancelar Cita"}
                    message={'¿Está seguro de cancelar cita?'}
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
                                this.setState({ cita: { ...this.state.cita, estado: "C", inicio_cita: new Date(this.state.cita.start), fin_cita: new Date(this.state.cita.end) } }, () => { this.reangedarCancelarCita(this.state.cita)})
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