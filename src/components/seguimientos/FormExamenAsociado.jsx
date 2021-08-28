import { IonPage, IonToolbar, IonButtons, IonDatetime, IonSelectOption, IonSelect, IonBackButton, IonTitle, IonContent, IonRow, IonGrid, IonCol, IonItem, IonLabel, IonList, IonInput, IonText, IonTextarea, IonButton, IonRouterLink, IonAlert, IonLoading, useIonViewWillLeave, useIonViewWillEnter, IonIcon } from '@ionic/react'
import React from 'react'
import { arrowBackOutline, trash } from 'ionicons/icons';
import Auth from '../../Login/Auth';
import AxiosPersonas from '../../Services/AxiosPersonas';
import AxiosCitas from '../../Services/AxiosCitas';
import AxiosExamenes from '../../Services/AxiosExamenes';

export default class FormExamenesAsociados extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            examen: {},
            editMode: null,
            fileList: [],
            countFiles: 1,
        }

    }

    getRoute(posFix = "") {
        if (Auth.isMedico()) return "/medico" + posFix;
        if (Auth.isPaciente()) return "/paciente" + posFix;
        return "/cuidador" + posFix;
    }

    componentDidMount() {
        this.setState({ editMode: this.props.match.params.id, ...this.props.match.params }, () => {
            if (this.state.editMode) {
                this.getExamenByID();
            }
        })
    }

    getExamenByID() {
        this.setState({ isLoadingGet: true });
        AxiosExamenes.getExamenByID({ id_examen: this.props.match.params.id }).then(resp => {
            console.log(resp);
            this.setState({ examen: resp.data, isLoadingGet: false });
        }).catch(err => {
            console.log(err);
            this.setState({ isLoadingGet: false });
        });
    }

    handleChange(e) {
        this.setState({
            examen: {
                ...this.state.examen,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        return (
            <IonPage>
                <IonToolbar color="primary">
                    <IonButtons slot="start">

                        <IonButton routerLink={this.getRoute("/seguimiento/examenes/") + this.props.match.params.seguimiento}>
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle >  {this.state.editMode ? 'Editar Examen Asociado' : 'Registrar Examen Asociado'} </IonTitle>
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
                                            <IonLabel position="stacked">Tipo de examen<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput onIonChange={e => this.handleChange(e)} name="tipo_examen" type="text" value={this.state.examen.tipo_examen ? this.state.examen.tipo_examen : ""} placeholder="Ingrese el tipo de examen"></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>


                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="stacked">Diagnostico<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput onIonChange={e => this.handleChange(e)} name="diagnostico" type="text" value={this.state.examen.diagnostico ? this.state.examen.diagnostico : ""} placeholder="Ingrese el diagnostico"></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>


                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="stacked">Comentario<IonText color="danger">*</IonText></IonLabel>
                                            <IonTextarea rows={2} className="ion-margin-top" name="comentario" disabled={false} value={this.state.examen.comentario} onIonChange={e => this.handleChange(e)} ></IonTextarea>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="stacked">filel<IonText color="danger">*</IonText></IonLabel>
                                            <IonInput onIonChange={(e) => {this.setState({ fileList: e.target.value }, () => { console.log(this.state.fileList) })}} name="file"  type="file" value={this.state.fileList ? this.state.fileList : []} placeholder="Ingrese el valor del Signo Vital"></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow style={{ marginTop: 20 }} className="ion-text-center">
                                    <IonCol>
                                        <IonButton color="primary" type="submit" class="ion-no-margin">{!this.state.editMode ? 'Registrar Examen' : 'Guaradar cambios'}</IonButton>
                                    </IonCol>
                                    {/* <IonCol>
                                        <IonButton onClick={} color="danger" class="ion-no-margin">
                                            Cancelar
                                        </IonButton>
                                    </IonCol> */}
                                    <IonCol>
                                        <IonButton routerLink={this.getRoute("/seguimiento/examenes/") + this.props.match.params.seguimiento} color="danger" class="ion-no-margin">
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
                        message={this.state.editMode ? '¿Desea guardar los nuevos cambios?' : '¿Está seguro registrar este examen?'}
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
                        header={"Examen Guardado"}
                        buttons={[
                            {
                                text: 'Aceptar',
                                handler: () => {
                                    this.props.history.push(this.getRoute("/seguimiento/examenes/") + this.props.match.params.seguimiento);
                                }
                            }
                        ]}
                    />
                </IonContent>

            </IonPage>
        );
    }

}