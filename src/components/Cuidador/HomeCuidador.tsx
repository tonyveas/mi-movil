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
  import {
    RouteComponentProps,Redirect
  } from 'react-router';
//   import AxiosRecordatorios from '../services/AxiosRecordatorios';
  import { useState} from 'react';
  import { notifications } from 'ionicons/icons';
import AxiosCitas from '../../Services/AxiosCitas';
import Auth from '../../Login/Auth';
  
  //import MenuLateral from '../components/Menu_Lateral';
  
  
  const HomeCuidador: React.FC = (props) => {
    
    const [cantidad, setCantidad] = useState(0);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [cargando, setCargando] = React.useState(false);
    
    useIonViewWillEnter(() => {
      console.log('ionViewWillEnter event fired');
      cargar_recordatorios();
    });

    const cargar_recordatorios = () => {
      setCargando(true);
      AxiosCitas.citas_recordatorios_cuidador({"cedula": Auth.getDataUser().cedula}).then( res => {
        console.log("citas_recordatorios_cuidador: ",(res.data).length);
        setCantidad((res.data).length);
        setCargando(false);
        setMostrarAlerta(true);
      });
    }
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
            <IonMenuButton/>
            </IonButtons>
            <IonTitle>Bienvenido</IonTitle>
            <IonButtons slot="end">
              <IonButton shape="round" slot="end" size="large" routerLink="/cuidador/recordatorios"><IonIcon icon={notifications}></IonIcon><IonBadge color="light">{cantidad}</IonBadge></IonButton>
            </IonButtons>
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
            <IonRow  class="row">
              <IonCol  size="12">     
                <IonButton color="primary" class="boton" routerLink="/cuidador/homepacientes" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "/assets/img/main/img2/paciente.png"} className="responsive" alt="" /><br/><br/><IonLabel>Pacientes</IonLabel>   
                </div>  
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow  class="row">
              <IonCol  size="12">     
                <IonButton color="primary" class="boton" routerLink="/cuidador/agendaCitas" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "/assets/img/main/inventory.png"} className="responsive" alt="" /><br/><br/><IonLabel>Agendado de Citas</IonLabel>   
                </div>  
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow  class="row">
              <IonCol  size="12">     
                <IonButton color="primary" class="boton" routerLink="/cuidador/seguimientos" expand="block" size="large">
                <div className="margen">
                  <img src={process.env.PUBLIC_URL + "./assets/img/main/img2/seguimiento.png"} className="responsive" alt="" /><br/><br/><IonLabel>Seguimiento de Pacientes</IonLabel>   
                </div>  
                </IonButton>
              </IonCol>
            </IonRow>
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
          <IonToast
            isOpen={mostrarAlerta}
            onDidDismiss={() => setMostrarAlerta(false)}
            message={cantidad>1?"Tiene citas pendientes, revisar por favor":"Tiene una cita pendiente, revisar por favor"}
            //duration={800}
            buttons={[
              {
                text: 'Ok',
                handler: () => {
                  setMostrarAlerta(false);
                }
              }
            ]}
            position="top"
            color="success"
          />
          <IonLoading
            isOpen={cargando}
            message={'Cargando datos. Espere por favor...'}
          />
        </IonContent>
      </IonPage>
    );
  };
  
  export default HomeCuidador;
  