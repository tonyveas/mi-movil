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
  
  
  const Home: React.FC<RouteComponentProps> = (props) => {
    
    const [cantidad, setCantidad] = useState("");
  
    useIonViewWillEnter(() => {
      console.log('ionViewWillEnter event fired');
    //   cantidad_recordatorios();
    });
  
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
                <IonButton color="primary" class="boton" routerLink="/homeusuarios" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "/assets/img/main/img2/usuarios.png"} className="responsive" alt="" /><br/><br/><IonLabel>Usuarios</IonLabel>   
                </div> 
                </IonButton>
              </IonCol>
              {/* <IonCol size="6">
                <IonButton class="boton" routerLink="/tabs" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "/assets/img/asignacion.png"} className="responsive"  alt="" /><br/><br/><IonLabel>Asignación</IonLabel>   
                </div>
                </IonButton>
              </IonCol> */}
            </IonRow>
            <IonRow class="row">
              <IonCol size="12">
                <IonButton color="primary" routerLink="/homediscapacidades" class="boton" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "/assets/img/main/img2/discapacidades.png"} className="responsive" alt="" /><br/><br/><IonLabel>Discapacidades</IonLabel>   
                </div>
                </IonButton>
              </IonCol>
              </IonRow>
              <IonRow class="row">
              <IonCol size="12">
                <IonButton color="primary" routerLink="/homeenfermedades" class="boton" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "/assets/img/main/img2/enfermedades.png"} className="responsive" alt="" /><br/><br/><IonLabel>Enfermedades</IonLabel>   
                </div>
                </IonButton>
              </IonCol>
              </IonRow>
              <IonRow class="row">
              <IonCol size="12">
                <IonButton color="primary" routerLink="/homemedicamentos" class="boton" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "/assets/img/main/img2/medicinas.png"} className="responsive" alt="" /><br/><br/><IonLabel>Medicinas</IonLabel>   
                </div>
                </IonButton>
              </IonCol>
              </IonRow>
              <IonRow class="row">
              <IonCol size="12">
                <IonButton color="primary" routerLink="/homeroles" class="boton" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "/assets/img/main/img2/roles.png"} className="responsive" alt="" /><br/><br/><IonLabel>Roles</IonLabel>   
                </div>
                </IonButton>
              </IonCol>
              </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Home;
  