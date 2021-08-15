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
    IonAlert
} from '@ionic/react';

import { add, arrowBackOutline } from 'ionicons/icons';

import Respuesta from '../Respuesta';

import AxiosDiscapacidades from '../../Services/AxiosDiscapacidades';
import ListaDiscapacidades from './discapacidadesComponents/ListaDiscapacidades';

const HomeDiscapacidades = (props:any) => {

    const [discapacidades, setDiscapacidades] = React.useState(new Array<any>());
    const [cargando, setCargando] = React.useState(false);
    const [mostrarScroll, setMostrarScroll] = React.useState(false);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [mostrarConfirmacion, setMostrarConfirmacion] = React.useState(false);
    const [mostrarLoad, setMostrarLoad] = React.useState(false);
    const [alerta, setAlerta] = React.useState(false);
    const [id, setId] = React.useState("");

    useIonViewWillEnter(() => {
        cargar_discapacidades(true, "", false);
    });

    const handler_eliminar = (id:any) => {
        setId(id);
        setMostrarConfirmacion(true);
    }

    const eliminar = () => {
        setMostrarLoad(true);
        AxiosDiscapacidades.eliminar_discapacidad(id).then( res => {
            setMostrarLoad(false);
            setAlerta(true);
            cargar_discapacidades(true, "", true);
        });
    }

    const cargar_discapacidades = (newLoad:boolean ,nombre: string, mostrar:boolean ) => {
        let pIndex = pageIndex;
        if (newLoad && !mostrar){
            setCargando(true);
            pIndex = 0;
        }else if (newLoad && mostrar){
            pIndex = 0;
        }else{
            pIndex ++;
        }
        AxiosDiscapacidades.discapacidades({nombre: nombre, page_index: pIndex, page_size: pageSize}).then( resp => {
            let array: Object[] = resp.data.resp;
            if(newLoad && !mostrar){
                setCargando(false);
                setDiscapacidades(array);
                setMostrarScroll(resp.data.itemSize === array.length);
            }else if(newLoad && mostrar){
                setMostrarScroll(resp.data.itemSize === array.length);
                setDiscapacidades(array);
            }else{
                let array_total = [...array, ...discapacidades]
                setDiscapacidades([
                    ...discapacidades,
                    ...array
                ]);
                setMostrarScroll(resp.data.itemSize === array_total.length);
            }

            setPageIndex(pIndex);
            console.log("cargar_discapacidades: ",resp);
            console.log("Arr: ", array);
        })
    }

    const loading = (e: any, newPageIndex: number) => {
        cargar_discapacidades(newPageIndex === 0, "", false);
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
                    {/* <IonBackButton defaultHref="/admin"></IonBackButton> */}
                    {/* <IonButton onClick = {() => props.history.push('/admin')}>
                        <IonIcon slot="icon-only" icon={arrowBackOutline} />
                    </IonButton> */}
                    <IonButton routerLink="/admin">
                        <IonIcon slot="icon-only" icon={arrowBackOutline} />
                    </IonButton>
                </IonButtons>
                <IonTitle>Gestionar discapacidades</IonTitle>
                <IonButtons slot="end">
                    <IonButton routerLink="/admin/formulariodiscapacidades"><IonIcon icon={add}></IonIcon></IonButton>
                </IonButtons>
            </IonToolbar>

            <IonSearchbar placeholder="Buscar discapacidad..."
                onIonChange={e => cargar_discapacidades(true, e.detail.value!, true)}
                onIonClear={(e:any) => cargar_discapacidades(true, "", false)}
            >
            </IonSearchbar>

            <IonContent>
                {
                    discapacidades.length === 0? <Respuesta />:null
                }
                <IonRefresher slot="fixed" onIonRefresh={ (e:any) => loading(e,0) }>
                    <IonRefresherContent
                    pullingIcon="arrow-dropdown"
                    pullingText="Pull to refresh"
                    refreshingSpinner="circles"
                    refreshingText="Actualizando...">
                    </IonRefresherContent>
                </IonRefresher>

                <IonList>
                    {
                        discapacidades.map( (item:any) => (
                            <ListaDiscapacidades key = {item.id_discapacidad}
                                id_discapacidad = {item.id_discapacidad}
                                codigo = {item.codigo}
                                nombre = {item.nombre}
                                descrip = {item.descrip}
                                handler_eliminar = {() => handler_eliminar(item.id_discapacidad)}
                            />
                        ))
                    }
                </IonList>
                <IonInfiniteScroll disabled={mostrarScroll} threshold="100px"
                    onIonInfinite={(e: any) => loading(e, pageIndex + 1)}
                    ref={React.createRef<HTMLIonInfiniteScrollElement>()}>
                    <IonInfiniteScrollContent
                    loadingSpinner="bubbles"
                        loadingText="Cargando más registros">
                    </IonInfiniteScrollContent>
                </IonInfiniteScroll>
                {
                    mostrarScroll && discapacidades.length!==0?
                        <div className="ion-margin">
                            <IonItem lines="none">
                                <br />
                                <IonLabel color="medium" class="ion-text-center">No hay más registros que mostrar</IonLabel>
                                <br />
                            </IonItem>
                        </div>:null
                }
            </IonContent>
            <IonLoading
                isOpen={cargando}
                message={'Cargando datos. Espere por favor...'}
            />
                
            <IonLoading
                isOpen={mostrarLoad}
                message={'Eliminando discapacidad. Espere por favor...'}
            />

            <IonAlert
                onDidDismiss = {() => setMostrarConfirmacion(false)}
                isOpen={mostrarConfirmacion}
                header={"Eliminar Discapacidad"}
                message={'¿Está seguro de eliminar esta discapacidad?'}
                buttons={[
                    {
                        text: 'No',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            setMostrarConfirmacion(false);
                        }
                    },
                    {
                        text: 'Si',
                        handler: () => {
                            eliminar();
                        }
                    }
                ]}
            />

            <IonAlert
                isOpen={alerta}
                onDidDismiss={() => setAlerta(false) }
                header={"Registro eliminado satisfactoriamente"}
                buttons={['Aceptar']}
            />

        </IonPage>
    );
}
export default HomeDiscapacidades;