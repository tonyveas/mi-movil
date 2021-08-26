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
import ItemInfoMedica from './ItemInfoMedica';
import AxiosSeguimientos from './../../Services/AxiosSeguimientos';
import AxiosSignosVitales from './../../Services/AxiosSignosVitales'

export default class InfoMedica extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            seguimientoData: {},
            infoMedica: []
        }

    }

    getRoute(posFix = "") {
        if (Auth.isMedico()) return "/medico" + posFix;
        if (Auth.isPaciente()) return "/paciente" + posFix;
        return "/cuidador" + posFix;
    }

    componentDidMount() {
        this.getSeguimientoId();
    }

    getSeguimientoId(e = null) {
        AxiosSeguimientos.getSeguimiento(this.props.match.params.id).then(resp => {
            console.log(resp);
            this.setState({ seguimientoData: resp.data, isLoading: false }, () => {
                const seg = this.state.seguimientoData["seguimiento"];
                const paciente = seg["cedulaPaciente"];
                const id_seguimiento = seg["id_seguimiento"];
                const medico = seg["cedulaMedico"];
                const inf = this.state.seguimientoData["infoMedica"] ? this.state.seguimientoData["infoMedica"] : [];
                this.setState({ infoMedica: inf, paciente, medico, id_seguimiento })
            });
            if (e) e.detail.complete();
        }).catch(err => {
            console.log(err);
            if (e) e.detail.complete();
            this.setState({ isLoading: false });
        });
    }

    deleteSignoVital(signo) {
        this.setState({loadingFinalizar: true})
        AxiosSignosVitales.deleteSignoVital(signo).then(resp => {
            console.log(resp);
            this.setState({loadingFinalizar: false})
            this.getSeguimientoId();
        }).catch(error => {
            this.setState({loadingFinalizar: false})
            console.log(error);
        });
    }

    handlerCancel = (sig) => { this.setState({ mostrarConfirmacion: true, sig }) }

    render() {
        return (
            <IonPage>
                <IonToolbar color="primary">
                    <IonButtons slot="start">

                        <IonButton routerLink={this.getRoute("/seguimiento/") + this.props.match.params.id}>
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Información Medica del Pacientes</IonTitle>
                    <IonButtons slot="end">
                        <IonButton routerLink={this.getRoute("/seguimiento/infomedica/create/") + this.state.id_seguimiento + "/" + this.state.medico + "/" + this.state.paciente}><IonIcon icon={add}></IonIcon></IonButton>
                    </IonButtons>
                </IonToolbar>

                <IonContent>
                    {
                        this.state.infoMedica.length === 0 ? <Respuesta /> : null
                    }
                    <IonRefresher slot="fixed" onIonRefresh={(e) => this.getSeguimientoId(e)}>
                        <IonRefresherContent
                            pullingIcon="arrow-dropdown"
                            pullingText="Pull to refresh"
                            refreshingSpinner="circles"
                            refreshingText="Actualizando...">
                        </IonRefresherContent>
                    </IonRefresher>

                    <IonList>
                        {
                            this.state.infoMedica.map((item) => (
                                <ItemInfoMedica
                                    signo={item}
                                    paciente={this.state.paciente}
                                    medico={this.state.medico}
                                    id_seguimiento={this.state.id_seguimiento}
                                    handler_eliminar={this.handlerCancel.bind(this)}
                                />
                            ))
                        }
                    </IonList>

                    {
                        this.state.infoMedica.length !== 0 ?
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
                    message={'Eliminando Signo Vital. Espere por favor...'}
                />

                <IonAlert
                    onDidDismiss={() => this.setState({ mostrarConfirmacion: false })}
                    isOpen={this.state.mostrarConfirmacion}
                    header={"Eliminzar Signo"}
                    message={'¿Está seguro de eliminar el registro?'}
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
                                this.deleteSignoVital(this.state.sig)
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