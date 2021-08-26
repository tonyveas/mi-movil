import { IonPage, IonToolbar, IonButtons, IonDatetime, IonSelectOption, IonSelect, IonBackButton, IonTitle, IonContent, IonRow, IonGrid, IonCol, IonItem, IonLabel, IonList, IonInput, IonText, IonTextarea, IonButton, IonRouterLink, IonAlert, IonLoading, useIonViewWillLeave, useIonViewWillEnter, IonIcon } from '@ionic/react'
import React from 'react'
import { arrowBackOutline, trash } from 'ionicons/icons';
import Auth from '../../Login/Auth';
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";
import AxiosSignosVitales from '../../Services/AxiosSignosVitales';

export default class FormInfoMedica extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            signo: {},
            editMode: null,
            items: ["Estatura", "Peso", "Masa Coporal", "Porcentaje de grasa corporal", "Masa muscular", "Tensión arterial", "Frecuencia cardíaca", "Frecuencia respiratoria", "Saturación de oxígeno", "Temperatura"],

        }

    }

    getRoute(posFix = "") {
        if (Auth.isMedico()) return "/medico" + posFix;
        if (Auth.isPaciente()) return "/paciente" + posFix;
        return "/cuidador" + posFix;
    }

    // selectFile(){
    //     FileChooser.open().then(fileuri=>{
    //         FilePath.resolveNativePath(fileuri).then(nativepath => {

    //         })
    //     })
    // }

    componentDidMount() {
        this.setState({ editMode: this.props.match.params.id, ...this.props.match.params }, () => {
            if (this.state.editMode) {
                this.getInfoMedicaByID();
            }
        })
    }

    saveSignoVital() {
        this.setState({ loadingSave: true });
        AxiosSignosVitales.saveSignosVitales({ ...this.state.signo, seguimiento: this.state.seguimiento, paciente: this.state.paciente, medico: this.state.medico, isPaciente: Auth.isPaciente() }).then(resp => {
            console.log(resp);
            this.setState({ loadingSave: false, alerta: true });
        }).catch(error => {
            console.log(error);
            this.setState({ loadingSave: false });
        });
    }

    editSignoVital() {
        this.setState({ loadingSave: true });
        AxiosSignosVitales.editSignosVitales({ ...this.state.signo, id_info_medica: this.props.match.params.id }).then(resp => {
            console.log(resp);
            this.setState({ loadingSave: false, alerta: true });
        }).catch(error => {
            console.log(error);
            this.setState({ loadingSave: false });
        });
    }

    handleChange(e) {
        this.setState({
            signo: {
                ...this.state.signo,
                [e.target.name]: e.target.value
            }
        });
    }


    getInfoMedicaByID() {
        this.setState({ isLoadingGet: true });
        AxiosSignosVitales.getInfoMedicaByID({ id: this.props.match.params.id }).then(resp => {
            console.log(resp);
            this.setState({ signo: resp.data, isLoadingGet: false });
        }).catch(err => {
            console.log(err);
            this.setState({ isLoadingGet: false });
        });
    }


    render() {
        return (
            <IonPage>
                <IonToolbar color="primary">
                    <IonButtons slot="start">

                        <IonButton routerLink={this.getRoute("/seguimiento/infomedica/") + this.props.match.params.seguimiento}>
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle >  {this.state.editMode ? 'Editar Signo Vital' : 'Registrar Signo Vital'} </IonTitle>
                </IonToolbar>

                <IonContent fullscreen>
                    <form onSubmit={(e) => { e.preventDefault(); this.setState({ confirmSave: true }) }}>
                        <IonList>
                            <IonGrid>
                                <IonRow class="ion-text-center">
                                    <IonCol>
                                        <img style={{ marginTop: 20, marginBottom: 20 }} src="./assets/img/icons/usuarios/usuario.png" alt="usuario" />
                                    </IonCol>
                                </IonRow>

                                <IonRow >
                                    <IonCol>
                                        <IonItem>
                                            <IonSelect disabled={this.state.editMode} name="key" placeholder="Seleccione el Signo Vital" value={this.state.signo.key} cancelText="Cancelar" okText="Aceptar" onIonChange={e => this.handleChange(e)}>
                                                {
                                                    this.state.items.map((item) => (
                                                        <IonSelectOption key={item} value={item}>{item}</IonSelectOption>
                                                    ))
                                                }
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>


                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="stacked">Valor del Signo Vital<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput onIonChange={e => this.handleChange(e)} name="value" type="number" value={this.state.signo.value ? this.state.signo.value : ""} placeholder="Ingrese el valor del Signo Vital"></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                {/* <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="stacked">filel<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput onIonChange={e => this.handleChange(e)} name="file" type="file" value={this.state.signo.file ? this.state.signo.file : ""} placeholder="Ingrese el valor del Signo Vital"></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow> */}
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="stacked">Unidad del signo vital<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput onIonChange={e => this.handleChange(e)} name="unidad" value={this.state.signo.unidad ? this.state.signo.unidad : ""} placeholder="Ingrese la unidad del signo vital"></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="stacked">Descripción<IonText color="danger">*</IonText></IonLabel>
                                            <IonTextarea rows={2} className="ion-margin-top" name="descrip" disabled={false} value={this.state.signo.descrip} onIonChange={e => this.handleChange(e)} ></IonTextarea>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow style={{ marginTop: 20 }} className="ion-text-center">
                                    <IonCol>
                                        <IonButton color="primary" type="submit" class="ion-no-margin">{!this.state.editMode ? 'Registrar Signo Vital' : 'Guaradar cambios'}</IonButton>
                                    </IonCol>
                                    {/* <IonCol>
                                        <IonButton onClick={} color="danger" class="ion-no-margin">
                                            Cancelar
                                        </IonButton>
                                    </IonCol> */}
                                    <IonCol>
                                        <IonButton routerLink={this.getRoute("/seguimiento/infomedica/") + this.props.match.params.seguimiento} color="danger" class="ion-no-margin">
                                            Cancelar
                                        </IonButton>
                                    </IonCol>
                                </IonRow>

                            </IonGrid>
                        </IonList>
                    </form>

                    <IonAlert
                        isOpen={this.state.confirmSave}
                        onDidDismiss={() => this.setState({ confirmSave: false })}
                        header={'Confirmación'}
                        message={this.state.editMode ? '¿Desea guardar los nuevos cambios?' : '¿Está seguro registrar este signo vital?'}
                        buttons={[
                            {
                                text: 'Cancel',
                                role: 'cancel',
                                cssClass: 'danger',
                                handler: (e) => {
                                    this.setState({ confirmSave: false })
                                }
                            },
                            {
                                cssClass: 'success',
                                text: 'Aceptar',
                                handler: () => {
                                    if (this.state.editMode) {
                                        this.editSignoVital()
                                    } else {
                                        this.saveSignoVital();
                                    }

                                }
                            }
                        ]}
                    />

                    <IonLoading
                        isOpen={this.state.loadingSave}
                        message={this.state.editMode ? 'Guardando datos. Espere por favor...' : 'Registrando Información. Espere por favor...'}
                    />

                    <IonLoading
                        isOpen={this.state.isLoadingGet}
                        message={'Cargando datos. Espere por favor...'}
                    />

                    <IonAlert
                        isOpen={this.state.alerta}
                        onDidDismiss={() => this.setState({ alerta: false })}
                        header={"Signo Vital Guardado"}
                        buttons={[
                            {
                                text: 'Aceptar',
                                handler: () => {
                                    this.props.history.push(this.getRoute("/seguimiento/infomedica/") + this.props.match.params.seguimiento);
                                }
                            }
                        ]}
                    />
                </IonContent>

            </IonPage>
        );
    }

}