import { IonAlert, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import React from 'react'
//import '../../../src/components/style.css';
import '../components/style.css';
import AxiosUsers from '../Services/AxiosUsers';
import Auth from './Auth';

const Login = (props:any) => {

    const [usuario, setUsuario] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [Vaciousuario, setVacioUsuario] = React.useState(true);
    const [Vaciopass, setVacioPass] = React.useState(true);
    const [cargando, setCargando] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [mensaje, setMensaje] = React.useState("");

    useIonViewWillEnter(() => {
        console.log('ionViewWillEnter event fired');
        console.log("Mi: ",Auth.getDataUser());
        console.log("Mi: ",Auth.isAdmin());
        console.log("isLogin: ",Auth.isLogin());
        console.log("Mi:  ",localStorage.getItem('userdata'))
        // localStorage.setItem('userdata',JSON.stringify({
        //     "username": 0,
        //     "cedula": "0812345671",
        //     "nombre": "Luis",
        //     "apellido": "Fuentes",
        //     "rol": "Medico",
        //     "estado": "A"
        // }));
    });

    

    const iniciar_sesion = () => {
        setVacioUsuario(true);
        setVacioPass(true);
        if (!usuario.trim()){
            setVacioUsuario(false);
        }
        if (!pass.trim()){
            setVacioPass(false);
            return;
        }
        login();
    }

    const login = () => {
        setCargando(true);
        AxiosUsers.login({"username":usuario, "password":pass}).then(res => {
            Auth.login(res.data);
            console.log("Login: ", res.data);
            console.log("D: ",Auth.getDataUser());
            setCargando(false);
            // setTimeout(() => {
            //     message.success({ content: 'Sesion Iniciada con Exito', key, duration: 3 });
            // }, 1000);
            props.history.push("/");
        }).catch(error => {
            setCargando(false);
            console.log(error, error.response, 'error login')
            if (error.response) {
                if (error.response.status === 400) {
                    setError(true);
                    setMensaje('Las credenciales ingresadas son incorrectas...');
                }
                else if (error.response.status === 500) {

                    setError(true);
                    setMensaje('Ocurrió un error al procesar los datos, inténtelo más tarde');
                }
                else if (error.response.status === 401) {

                    setError(true);
                    setMensaje('El usuario ingresado está inactivo y no puede acceder al sistema.');
                

                }else{

                    setError(true);
                    setMensaje('Ocurrió un error al procesar su solicitud, inténtelo más tarde');

                }
            } else {
                setError(true)
                setMensaje('Ocurrió un error al procesar su solicitud, inténtelo más tarde');
                // message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
            }
        });

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color = "primary">
                    <IonTitle>Iniciar sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid>
                    {/* <br/><br/><br/><br/><br/><br/><br/> */}
                    <div className="">
                        <IonRow class="ion-align-items-center">
                            <IonCol size="8" offset = "2">
                                <IonImg src="./assets/img/logo/espol6.png" alt="logo"></IonImg>
                            </IonCol>
                        </IonRow>

                        <IonRow class="ion-text-center">
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Usuario <IonText color="danger"></IonText></IonLabel>
                                    <IonInput required type="text" value = {usuario} onIonChange={(e) => setUsuario(e.detail.value!)} ></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        <IonRow class="ion-text-center">
                            <IonCol>
                                <IonText hidden={Vaciousuario} color="danger">Ingresar usuario</IonText>
                            </IonCol>
                        </IonRow>

                        <IonRow class="ion-text-center">
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Contraseña <IonText color="danger"></IonText></IonLabel>
                                    <IonInput required type="password" value = {pass} onIonChange={(e) => setPass(e.detail.value!)} ></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        <IonRow class="ion-text-center">
                            <IonCol>
                                <IonText hidden={Vaciopass} color="danger">Ingresar contraseña</IonText>
                            </IonCol>
                        </IonRow>
                        <br />

                        <IonRow class="ion-text-center">
                            <IonCol>
                                <IonButton onClick = {() => iniciar_sesion()} expand="block" color="primary" class="ion-no-margin">Iniciar Sesión</IonButton>
                            </IonCol>
                        </IonRow>
                        <br />
                    </div>

                </IonGrid>

                <IonLoading
                    isOpen={cargando}
                    message={'Verificando datos...'}
                />

                <IonAlert
                    isOpen={error}
                    subHeader={'Error:'}
                    message={mensaje}
                    buttons={[          
                    {
                        text: 'Ok',
                        handler: () => {
                        console.log('Aceptar');
                        setError(false);
                        }
                    },
                    ]}
                />

            </IonContent>
        </IonPage>
    )
}

export default Login
