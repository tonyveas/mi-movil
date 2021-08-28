import { IonPage, IonToolbar, IonButtons, IonDatetime, IonSelectOption, IonSelect, IonBackButton, IonTitle, IonContent, IonRow, IonGrid, IonCol, IonItem, IonLabel, IonList, IonInput, IonText, IonTextarea, IonButton, IonRouterLink, IonAlert, IonLoading, useIonViewWillLeave, useIonViewWillEnter, IonIcon } from '@ionic/react'
import React from 'react'
import { arrowBackOutline, trash, add } from 'ionicons/icons';
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

    saveExamen() {
        if (this.state.fileList.length < 1) {
            this.setState({ alertaFile: true });
            return;
        }
        const formData = new FormData();
        const values = this.state.examen;
        formData.append("tipo_examen", values.tipo_examen);
        formData.append("comentarios", values.comentarios);
        formData.append("diagnostico", values.diagnostico);
        formData.append("seguimiento", this.state.seguimiento);
        formData.append("medico", this.state.medico);
        formData.append("paciente", this.state.paciente);

        for (let img of this.state.fileList) {
            formData.append("images[]", img);
        }

        this.setState({ loadingSave: true });
        AxiosExamenes.saveExamen(formData).then(resp => {
            console.log(resp);
            this.setState({ loadingSave: false, alerta: true });
        }).catch(error => {
            console.log(error);
            this.setState({ loadingSave: false });
        });
    }

    editExamen() {

        const formData = new FormData();
        const values = this.state.examen;
        formData.append("tipo_examen", values.tipo_examen);
        formData.append("comentarios", values.comentarios);
        formData.append("diagnostico", values.diagnostico);
        formData.append("id_examen", this.props.match.params.id);

        for (let img of this.state.fileList) {
            formData.append("images[]", img);
        }

        this.setState({ loadingSave: true });
        AxiosExamenes.editExamen(formData).then(resp => {
            console.log(resp);
            this.setState({ loadingSave: false, alerta: true });
        }).catch(error => {
            console.log(error);
            this.setState({ loadingSave: false });
        });

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

    renderFileList() {
        let names = []
        for (let img of this.state.fileList) {
            names.push(img.name);
        }
        return names.map(name => (<p style={{ margin: "2px", paddingLeft: "2px" }} key={name}>{name}</p>));
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
                    <form onSubmit={(e) => { e.preventDefault(); this.setState({ confirmSave: true }); }}>
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
                                            <IonLabel position="stacked">Comentarios<IonText color="danger">*</IonText></IonLabel>
                                            <IonTextarea rows={2} className="ion-margin-top" name="comentarios" disabled={false} value={this.state.examen.comentarios} onIonChange={e => this.handleChange(e)} ></IonTextarea>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="stacked">Archivos (Imágenes)<IonText color="danger">*</IonText></IonLabel>
                                            <br />
                                            <div style={{ display: "flex", }}>
                                                {
                                                    this.state.examen.url_examen && this.state.editMode ?
                                                        this.state.examen.url_examen.split(",").map((img) => (
                                                            <div style={{ textAlign: "center", margin: "10px" }}>
                                                                <img style={{ width: "120px", height: "60px" }} src={img} alt="examen" />
                                                            </div>
                                                        )) : null
                                                }
                                            </div>
                                            <IonButton style={{ margin: "30px", paddingLeft: "14%" }} onClick={(e) => { document.getElementById("selectImage").click() }}>
                                                <IonIcon slot="icon-only" icon={add} /> Agregar Archivo
                                            </IonButton>
                                            <input style={{ display: "none" }} id="selectImage" multiple="multiple" onChange={(e) => { this.setState({ fileList: e.target.files }) }} name="file" type="file" ></input>
                                            {this.renderFileList()}
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
                                        this.editExamen()
                                    } else {
                                        this.saveExamen();
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

                    <IonAlert
                        isOpen={this.state.alertaFile}
                        onDidDismiss={() => this.setState({ alertaFile: false })}
                        header={"Archivos"}
                        message={"Debe ingresar una imagen valida"}
                        buttons={[
                            {
                                text: 'Aceptar',
                                handler: () => {
                                    this.setState({ alertaFile: false });
                                }
                            }
                        ]}
                    />
                </IonContent>

            </IonPage>
        );
    }

}