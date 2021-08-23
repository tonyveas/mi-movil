import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonLabel,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    useIonViewWillEnter,
    IonIcon,
    IonBadge,
    IonToast,
    IonLoading
} from '@ionic/react';
import React from 'react';
import '../Home.css';
import '../style.css'
import { useParams } from 'react-router-dom'
import {
    RouteComponentProps, Redirect
} from 'react-router';
//   import AxiosRecordatorios from '../services/AxiosRecordatorios';
import { useState } from 'react';
import { arrowBackOutline } from 'ionicons/icons';
import AxiosCitas from '../../Services/AxiosCitas';
import Auth from '../../Login/Auth';

//import MenuLateral from '../components/Menu_Lateral';


const HomePaciente = (props) => {

    const { id } = useParams();

    useIonViewWillEnter(() => {
        console.log('ionViewWillEnter event fired');
    });

    const getRoute = (posFix = "") => {
        if (Auth.isMedico()) return "/medico" + posFix;
        if (Auth.isPaciente()) return "/paciente" + posFix;
        return "/cuidador" + posFix;
    }

    // useIonViewWillEnter(() => {
    //   console.log('ionViewWillEnter event fired');
    // });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonButton routerLink={getRoute("/seguimientos")}>
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>

                    <IonTitle>Seguimiento</IonTitle>

                    {/* <IonButtons slot="end">
    <IonButton shape="round" slot="end" size="large" routerLink="/recordatoriosactualeshome"><IonIcon icon={notifications}></IonIcon><IonBadge color="light">{cantidad}</IonBadge></IonButton>
            </IonButtons> */}
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid class="grid">
                    {/* <IonRow  class="row">
              <IonCol  size="12">     
                <IonButton color="primary" class="boton" routerLink="/cuidador/calendario" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "/assets/img/main/img2/calendario.png"} className="responsive" alt="" /><br/><br/><IonLabel>Citas</IonLabel>   
                </div> 
                </IonButton>
              </IonCol>
            </IonRow> */}
                    <IonRow class="row">
                        <IonCol size="12">
                            <IonButton color="primary" class="boton" routerLink={getRoute("/seguimiento/infomedica/") + id} expand="block" size="large">
                                <div className="margen">
                                    <img src={process.env.PUBLIC_URL + "/assets/img/main/img2/seguimiento.png"} className="responsive" alt="" /><br /><br /><IonLabel>Información Médica</IonLabel>
                                </div>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow class="row">
                        <IonCol size="12">
                            <IonButton color="primary" class="boton" routerLink={getRoute("/seguimiento/citasasociadas/") + id} expand="block" size="large">
                                <div className="margen">
                                    <img src={process.env.PUBLIC_URL + "/assets/img/main/inventory.png"} className="responsive" alt="" /><br /><br /><IonLabel>Citas Asociadas</IonLabel>
                                </div>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    {/* <IonRow class="row">
                        <IonCol size="12">
                            <IonButton color="primary" class="boton" routerLink={getRoute("/seguimiento/examenes/") + id} expand="block" size="large">
                                <div className="margen">
                                    <img src={process.env.PUBLIC_URL + "./assets/img/main/solicitud.png"} className="responsive" alt="" /><br /><br /><IonLabel>Examenes Asociados</IonLabel>
                                </div>
                            </IonButton>
                        </IonCol>
                    </IonRow> */}
                    {/* <IonRow  class="row">
              <IonCol  size="12">     
                <IonButton color="primary" class="boton" routerLink="/cuidador/seguimiento" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "/assets/img/main/img2/seguimiento.png"} className="responsive" alt="" /><br/><br/><IonLabel>Seguimientos</IonLabel>   
                </div> 
                </IonButton>
              </IonCol>
            </IonRow> */}
                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default HomePaciente;