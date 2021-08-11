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
import ListaMedicamentos from './medicamentosComponents/ListaMedicamentos';

const HomeMedicamentos = () => {

    const [medicamentos, setMedicamentos] = React.useState([]);
    const [cargando, setCargando] = React.useState(true);
    const [searchText, setSearchText] = React.useState("");

    useIonViewWillEnter(async () => {
        mostrar_medicamentos();
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
        // setCargando(true);
        AxiosMedicamentos.mostrar_medicamentos().then( res => {
            console.log("res: ",res.data);
            setMedicamentos(res.data);
            setCargando(false);
        })
    }

    const buscar_medicamentos = (nombre:any) => {
        console.log("Entraaaaaaaaa2: ", nombre);
        if (nombre === ""){
            mostrar_medicamentos();
        }else{
            // setCargando(true);
            AxiosMedicamentos.buscar_medicamentos(nombre).then ( res => {
                console.log(res);
                setMedicamentos(res.data);
                // setCargando(false);
            }).catch( err => {
                // setCargando(false);
            })
        }
    }

    

    const  doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    
        setTimeout(() => {
            mostrar_medicamentos();
            event.detail.complete();
          }, 1000);
    
    }

    const onClear = () => {
        console.log("Entraaaaa1")
        mostrar_medicamentos();
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

            {/* <IonSearchbar onIonChange={e => buscar_medicamentos(e.detail.value!)}></IonSearchbar> */}


            <IonSearchbar placeholder="Buscar medicamento..."
                onIonChange={e => buscar_medicamentos(e.detail.value!)}
                onIonClear={() =>  onClear() }
            >
            </IonSearchbar>

            <IonContent>

                <IonRefresher slot="fixed" onIonRefresh={ (e:any) => doRefresh(e) }>
                    <IonRefresherContent
                    pullingIcon="arrow-dropdown"
                    pullingText="Pull to refresh"
                    refreshingSpinner="circles"
                    refreshingText="Actualizando...">
                    </IonRefresherContent>
                </IonRefresher>

                {/* <IonRefresher slot="fixed" onIonRefresh={ (e:any) => doRefresh(e) }>
                    <IonRefresherContent
                        refreshingSpinner="bubbles"
                    />
                </IonRefresher> */}
                {
                    medicamentos.map( (item:any) => (
                        <ListaMedicamentos key = {item.id_medicamento}
                            id_medicamento = {item.id_medicamento}
                            codigo = {item.codigo}
                            nombre = {item.nombre}
                            descrip = {item.descrip}
                        />
                    ))
                }
            </IonContent>
            <IonLoading
                isOpen={cargando}
                message={'Cargando datos. Espere por favor...'}
            />
        </IonPage>
    );
}
export default HomeMedicamentos;