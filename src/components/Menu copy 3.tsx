import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAvatar,
  IonButton,
  IonCard,
  useIonViewWillEnter
} from '@ionic/react';

import React from 'react';

import { RouteComponentProps, withRouter, Redirect, useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp, home, desktop, logOut, list, pricetag, person } from 'ionicons/icons';
import './Menu.css';
import Auth from '../Login/Auth';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Inbox',
    url: '/page/Inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Outbox',
    url: '/page/Outbox',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Favorites',
    url: '/page/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Archived',
    url: '/page/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Trash',
    url: '/page/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
  {
    title: 'Spam',
    url: '/page/Spam',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {

  const [cedula, setCedula] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [route, setRoute] = React.useState("");
  const [routePrincipal, setRoutePrincipal] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [ocultar, setOcultar] = React.useState(false);

  const getDataUser = () => {
    let data = Auth.getDataUser();
    console.log(Auth.getDataUser().cedula)
    setCedula(data.cedula);
    if (data) {
        setNombre(data.nombre);
        setApellido(data.apellido);
        setUsername(data.username);
        return data.nombre + " " + data.apellido
    }
    return '';
  }

  const getRoutePerfil = () => {
      if (Auth.isMedico()) {
          return '/medico';
      }
      if (Auth.isPaciente()) {
          return '/paciente';
      }
      if (Auth.isCuidador()) {
          return '/cuidador';
      }
      return '/admin'
  }

  React.useEffect(()=> {
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ0000000");
    getDataUser();
    //setNombreUsuario(getDataUser());
    setRoute(getRoutePerfil() + `/perfil/${Auth.getDataUser().cedula}`);
    setRoutePrincipal(getRoutePerfil());
  })

  /*
  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter event fired');
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ0000000");
    getDataUser();
    //setNombreUsuario(getDataUser());
    setRoute(getRoutePerfil() + `/perfil/${Auth.getDataUser().cedula}`);
  });
  */

  const location = useLocation();
  //const ced = "0954003067";

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        {/* <IonCard> */}
          <IonItem lines = "none">
            <IonAvatar slot="start">
              <img src="./assets/img/avatar.svg" alt="" />
            </IonAvatar>
            <IonLabel>
              <h3>Nombre: {nombre}</h3>
              <h3>Apellido: {apellido}</h3>
              {/* <p>Usuario: tonyvr996</p> */}
              <p>Cédula: {cedula}</p>
            </IonLabel>
            {/* <IonLabel  color = "primary"><b>Ver perfil</b></IonLabel> */}
          </IonItem>
          <IonItem className = "ion-text-center">
            <IonButton routerLink={route} style={{ marginLeft: 80, marginRight:80 }}>Ver perfil</IonButton>
          </IonItem>
        {/* </IonCard> */}
        <IonList>
          {/* <IonListHeader>
            <IonLabel>Trending</IonLabel>
          </IonListHeader> */}
          
          <IonMenuToggle autoHide={false}>
            {/* <IonItem lines = "none" style={{ marginTop: 60, marginLeft: 3 }} routerLink='/home' routerDirection="none"> */}
            <IonItem lines = "none" style={{ marginTop: 10, marginLeft: 3 }} routerLink={routePrincipal} routerDirection="none">
              <IonIcon slot="start" icon={home} />
              <IonLabel>Menú principal</IonLabel>
            </IonItem>
          </IonMenuToggle>
          {/* <IonMenuToggle autoHide={false}>
            <IonItem lines = "none" routerLink='/tiposequiposinventario' routerDirection="none">
              <IonIcon slot="start" icon={desktop} />
              <IonLabel>Registro de equipos</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem lines = "none" routerLink='/homemarcas' routerDirection="none">
              <IonIcon slot="start" icon={pricetag} />
              <IonLabel>Registro de Marcas</IonLabel>
            </IonItem>
          </IonMenuToggle> */}
          <IonMenuToggle autoHide={false}>
            <IonItem onClick={() => {Auth.logout()}} lines = "none" routerLink='/login' routerDirection="none">
              <IonIcon slot="start" icon={logOut} />
              <IonLabel >Cerrar sesión</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>

        {/* <IonHeader>
            <IonTitle>Menu</IonTitle>
        </IonHeader> */}

        {/* <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
