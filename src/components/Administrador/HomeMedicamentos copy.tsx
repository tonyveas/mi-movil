import React from 'react';
import {
    IonContent, IonToolbar, IonIcon, IonTitle, IonPage, IonButtons, IonBackButton, IonButton, IonPopover, IonLoading,
    IonRefresher, IonRefresherContent, IonSearchbar, IonList, IonItem, IonLabel, IonDatetime,
    useIonViewDidEnter,
    useIonViewDidLeave,
    useIonViewWillEnter,
    useIonViewWillLeave,
    IonInfiniteScroll, IonInfiniteScrollContent,
    IonRippleEffect,
    IonAvatar,
    IonNote,
    IonModal,
} from '@ionic/react';

import { add, options, trash, create,close,language, paperPlane, key, barcode, list, reader } from 'ionicons/icons';
import { RefresherEventDetail } from '@ionic/core';
import { Redirect } from 'react-router';
import AxiosMedicamentos from '../../Services/AxiosMedicamentos';

const HomeMedicamentos: React.FC = () => {

    const [medicamentos, setMedicamentos] = React.useState([]);
    const [detalleVentana, setDetalleVentana] = React.useState(false);

    useIonViewWillEnter(async () => {
        mostrar_medicamentos();
        // cargar_ips();
        // cargar_ips_prueba();
        // await fetchData();
        // console.log(ips);
    });

    useIonViewDidEnter(async () => {
        console.log('useIonViewDidEnter event fired');
    });

    useIonViewWillLeave(async () => {
        console.log('ionViewWillLeave event fired');
    });

    useIonViewDidLeave(async () => {
        console.log('useIonViewDidLeave event fired');
    });

    const mostrar_medicamentos = () => {
        AxiosMedicamentos.mostrar_medicamentos().then( res => {
            console.log("res: ",res.data);
            setMedicamentos(res.data);
        })
    }

    async function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    }

    // if (localStorage.userdata === undefined){
    //     return (<Redirect to="/iniciarsesion" />)
    // }

    return (
        <IonPage>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home"></IonBackButton>
                </IonButtons>
                <IonTitle>Inventario de Ips</IonTitle>
                <IonButtons slot="end">
                    <IonButton routerLink="/formularioip"><IonIcon icon={add}></IonIcon></IonButton>
                    <IonButton><IonIcon icon={options}></IonIcon></IonButton>
                </IonButtons>
            </IonToolbar>

            <IonSearchbar placeholder="Buscar dirección IP..."
                // onIonChange={(e: any) => { onChange(e) }}
                // onIonClear={(e: any) => { onClear(e) }}
            >
            </IonSearchbar>

            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent
                        refreshingSpinner="bubbles"
                    />
                </IonRefresher>
                <IonList>
                    {
                        medicamentos.map( (item:any) => (
                            <IonItem key = {item.id_medicamento} onClick={() => setDetalleVentana(true)} className = "ion-activatable">
                                <IonLabel>
                                    <IonRippleEffect></IonRippleEffect>
                                    <h2><b>{item.codigo}</b></h2>
                                    <h3>Nombre: {item.nombre}</h3>
                                    <p>Descripción: {item.descrip}</p>
                                </IonLabel>
                                <IonAvatar slot="start">
                                    <img src="./assets/img/icons/medicinas/medicina.png"  alt="medicina" />
                                </IonAvatar> 
                                <IonButton size="default" fill="clear" routerLink={"/formimpresora/edit/"} color="secondary" ><IonIcon color="medium" icon={create}></IonIcon></IonButton>
                                <IonButton size="default" color="primary" fill="clear" ><IonIcon color="medium" icon={trash}></IonIcon></IonButton>                                
                                <IonModal
                                    isOpen={detalleVentana}
                                    onDidDismiss={() => setDetalleVentana(false)}>
                                    <IonToolbar color="primary">
                                    <IonTitle>Detalle Medicamento</IonTitle>
                                        <IonButtons slot="end">
                                        <IonButton onClick={() => setDetalleVentana(false)}><IonIcon icon={close}></IonIcon></IonButton>
                                        </IonButtons>
                                    </IonToolbar>
                                    <IonContent>
                                        <IonList lines = "none">
                                            <IonItem>
                                                {/* <IonAvatar style={{ marginLeft: 150 }}>  */}
                                                    <img style={{ marginLeft: 150, marginTop: 20 }} src="./assets/img/icons/medicinas/medicina.png"  alt="medicina" />
                                                {/* </IonAvatar> */}
                                            </IonItem>
                                            <IonItem>
                                                <IonIcon slot="start" icon={key}></IonIcon>
                                                <IonLabel>Id</IonLabel>
                                                <IonNote slot="end">{item.id_medicamento}</IonNote>
                                            </IonItem>
                                            <IonItem>
                                                <IonIcon slot="start" icon={barcode}></IonIcon>
                                                <IonLabel>Código</IonLabel>
                                                <IonNote slot="end">{item.codigo}</IonNote>
                                            </IonItem>
                                            <IonItem>
                                                <IonIcon slot="start" icon={list}></IonIcon>
                                                <IonLabel>Nombre</IonLabel>
                                                <IonNote slot="end">{item.nombre}</IonNote>
                                            </IonItem>
                                        </IonList>
                                    </IonContent>
                                </IonModal>
                            </IonItem>
                        ))
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
}
export default HomeMedicamentos;