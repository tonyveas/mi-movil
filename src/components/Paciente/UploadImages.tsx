import React from 'react';
import {
    IonContent, IonToolbar, IonIcon, IonTitle, IonPage, IonButtons, IonBackButton, IonButton, IonPopover, IonLoading,
    IonRefresher, IonRefresherContent, IonSearchbar, IonList, IonItem, IonLabel, IonDatetime,
    useIonViewWillEnter,
    IonInfiniteScroll, IonInfiniteScrollContent,
    IonAlert,
    IonModal,
    IonInput,
    IonSelect,
    IonSelectOption
} from '@ionic/react';

import { add, arrowBackOutline, close, key } from 'ionicons/icons';
import Respuesta from '../Respuesta';
import AxiosUsers from '../../Services/AxiosUsers';
import AxiosPersonas from '../../Services/AxiosPersonas';
import Auth from '../../Login/Auth';
import Cuidadores from './Cuidadores';

const UploadImages = (props:any) => {

    const [cuidadores, setCuidadores] = React.useState(new Array<any>());
    const [cargando, setCargando] = React.useState(false);
    const [mostrarScroll, setMostrarScroll] = React.useState(false);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [mostrarConfirmacion, setMostrarConfirmacion] = React.useState(false);
    const [mostrarLoad, setMostrarLoad] = React.useState(false);
    const [mostrarLoad2, setMostrarLoad2] = React.useState(false);

    const [alerta, setAlerta] = React.useState(false);
    const [cedula, setCedula] = React.useState("");
    const [mostrarModal,setMostrarModal] = React.useState(false);
    const [nuevoCuidador, setNuevoCuidador] = React.useState("");
    const [listaCuidadores, setListaCuidadores] = React.useState(new Array<any>());
    const [agregar, setAgregar] = React.useState(false);
    const [exito, setExito] = React.useState(false);

    useIonViewWillEnter(() => {
        cargar_cuidadores(true, "", false);
        lista_cuidadores();
    });

    const handler_eliminar = (cedula:any) => {
        setCedula(cedula);
        setMostrarConfirmacion(true);
    }

    const eliminar = () => {
        setMostrarLoad2(true);
        AxiosPersonas.deletePacienteAsociadoCuidador({paciente: Auth.getDataUser().cedula, cuidador: cedula}).then( res => {
            setMostrarLoad2(false);
            //setMostrarModal(false);
            setAlerta(true);
            cargar_cuidadores(true, "", true);
        });
    }

    const asociar_cuidador = () => {
        //setMostrarLoad(true);
        AxiosPersonas.savePacienteAsociadoCuidador({paciente: Auth.getDataUser().cedula, cuidador: nuevoCuidador}).then( res => {
            cargar_cuidadores(true, "", false);
            //setMostrarLoad(false);
            setMostrarModal(false);
            setExito(true);
        });
    }

    const lista_cuidadores = () => {
        AxiosPersonas.cuidadores_asociar().then( res => {
            console.log("RES: ",res);
            setListaCuidadores(res.data);
        });
    }

    const cargar_cuidadores = (newLoad:boolean ,cedula: string, mostrar:boolean ) => {
        let pIndex = pageIndex;
        if (newLoad && !mostrar){
            setCargando(true);
            pIndex = 0;
        }else if (newLoad && mostrar){
            pIndex = 0;
        }else{
            pIndex ++;
        }
        AxiosPersonas.cuidadores_paciente({cedula_paciente: Auth.getDataUser().cedula, cedula_cuidador: cedula, page_index: pIndex, page_size: pageSize}).then( resp => {
            let array: Object[] = resp.data.resp;
            if(newLoad && !mostrar){
                setCargando(false);
                setCuidadores(array);
                setMostrarScroll(resp.data.itemSize === array.length);
            }else if(newLoad && mostrar){
                setMostrarScroll(resp.data.itemSize === array.length);
                setCuidadores(array);
            }else{
                let array_total = [...array, ...cuidadores]
                setCuidadores([
                    ...cuidadores,
                    ...array
                ]);
                setMostrarScroll(resp.data.itemSize === array_total.length);
            }

            setPageIndex(pIndex);

        })
    }

    const loading = (e: any, newPageIndex: number) => {
        cargar_cuidadores(newPageIndex === 0, "", false);
        setTimeout(() => {
            if (newPageIndex === 0){
                e.detail.complete();
                setMostrarScroll(false);
            }else {
                e.target.complete();
            }
        }, 1000);
    }

    return (
        <IonPage>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    {/* <IonBackButton defaultHref="/medico"></IonBackButton> */}
                    {/* <IonButton onClick = {() => props.history.push('/admin')}>
                        <IonIcon slot="icon-only" icon={arrowBackOutline} />
                    </IonButton> */}
                    <IonButton routerLink="/paciente">
                        <IonIcon slot="icon-only" icon={arrowBackOutline} />
                    </IonButton>
                </IonButtons>
                <IonTitle>Gestionar cuidadores</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick = {() => setMostrarModal(true)}><IonIcon icon={add}></IonIcon></IonButton>
                </IonButtons>
            </IonToolbar>

            <IonSearchbar placeholder="Buscar cuidador..."
                onIonChange={e => cargar_cuidadores(true, e.detail.value!, true)}
                onIonClear={(e:any) => cargar_cuidadores(true, "", false)}
            >
            </IonSearchbar>

            <input type="file"/>

            <IonContent>
            </IonContent>

        </IonPage>
    );
}
export default UploadImages;