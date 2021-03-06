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
    IonBadge
  } from '@ionic/react';
  import React from 'react';
  import './Home.css';
  import './style.css'
  import {
    RouteComponentProps,Redirect
  } from 'react-router';
//   import AxiosRecordatorios from '../services/AxiosRecordatorios';
  import { useState} from 'react';
  import { notifications } from 'ionicons/icons';
  
  //import MenuLateral from '../components/Menu_Lateral';
  
  
  const HomeMedico: React.FC<RouteComponentProps> = (props) => {
    
    const [cantidad, setCantidad] = useState("");
  
    // useIonViewWillEnter(() => {
    //   console.log('ionViewWillEnter event fired');
    // });
  
    // const cantidad_recordatorios = () => {
    //   AxiosRecordatorios.recordatorios_actuales().then(res => {
    //     setCantidad(res.data.length)
    //   }).catch(err => {
    //     if (err.response) {
    //       setCantidad('0')
    //     }
    //   });
    // }
  
   
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
            <IonMenuButton/>
            </IonButtons>
            <IonTitle>Bienvenido</IonTitle>
            {/* <IonButtons slot="end">
    <IonButton shape="round" slot="end" size="large" routerLink="/recordatoriosactualeshome"><IonIcon icon={notifications}></IonIcon><IonBadge color="light">{cantidad}</IonBadge></IonButton>
            </IonButtons> */}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid class="grid">
            <IonRow  class="row">
              <IonCol  size="12">     
                <IonButton color="primary" class="boton" routerLink="/medico/calendario" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "/assets/img/main/img2/calendario.png"} className="responsive" alt="" /><br/><br/><IonLabel>Citas</IonLabel>   
                </div> 
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow  class="row">
              <IonCol  size="12">     
                <IonButton color="primary" class="boton" routerLink="/medico/homepacientes" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "/assets/img/main/img2/paciente.png"} className="responsive" alt="" /><br/><br/><IonLabel>Pacientes</IonLabel>   
                </div> 
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow  class="row">
              <IonCol  size="12">     
                <IonButton color="primary" class="boton" routerLink="/medico/seguimiento" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "/assets/img/main/img2/seguimiento.png"} className="responsive" alt="" /><br/><br/><IonLabel>Seguimientos</IonLabel>   
                </div> 
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  
  export default HomeMedico;
  