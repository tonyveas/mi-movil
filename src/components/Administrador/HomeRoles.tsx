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

import { add } from 'ionicons/icons';

import Respuesta from '../Respuesta';
import AxiosRoles from '../../Services/AxiosRoles';
import ListaRoles from './rolesComponents/ListaRoles';

const HomeRoles = () => {

    const [roles, setRoles] = React.useState(new Array<any>());
    const [cargando, setCargando] = React.useState(false);
    const [mostrarScroll, setMostrarScroll] = React.useState(false);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [mostrarConfirmacion, setMostrarConfirmacion] = React.useState(false);
    const [mostrarLoad, setMostrarLoad] = React.useState(false);
    const [alerta, setAlerta] = React.useState(false);
    const [id, setId] = React.useState("");

    useIonViewWillEnter(() => {
        cargar_roles(true, "", false);
    });

    const handler_eliminar = (id:any) => {
        setId(id);
        setMostrarConfirmacion(true);
    }

    const eliminar = () => {
        setMostrarLoad(true);
        AxiosRoles.eliminar_rol(id).then( res => {
            setMostrarLoad(false);
            setAlerta(true);
            cargar_roles(true, "", true);
        });
    }

    const cargar_roles = (newLoad:boolean ,nombre: string, mostrar:boolean ) => {
        let pIndex = pageIndex;
        if (newLoad && !mostrar){
            setCargando(true);
            pIndex = 0;
        }else if (newLoad && mostrar){
            pIndex = 0;
        }else{
            pIndex ++;
        }
        AxiosRoles.roles({nombre: nombre, page_index: pIndex, page_size: pageSize}).then( resp => {
            let array: Object[] = resp.data.resp;
            if(newLoad && !mostrar){
                setCargando(false);
                setRoles(array);
                setMostrarScroll(resp.data.itemSize === array.length);
            }else if(newLoad && mostrar){
                setMostrarScroll(resp.data.itemSize === array.length);
                setRoles(array);
            }else{
                let array_total = [...array, ...roles]
                setRoles([
                    ...roles,
                    ...array
                ]);
                setMostrarScroll(resp.data.itemSize === array_total.length);
            }

            setPageIndex(pIndex);
            console.log("cargar_roles: ",resp);
            console.log("Arr: ", array);
        })
    }

    const loading = (e: any, newPageIndex: number) => {
        cargar_roles(newPageIndex === 0, "", false);
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
                    <IonBackButton defaultHref="/admin"></IonBackButton>
                </IonButtons>
                <IonTitle>Gestionar roles</IonTitle>
                <IonButtons slot="end">
                    <IonButton routerLink="/admin/homeroles"><IonIcon icon={add}></IonIcon></IonButton>
                </IonButtons>
            </IonToolbar>

            <IonSearchbar placeholder="Buscar rol..."
                onIonChange={e => cargar_roles(true, e.detail.value!, true)}
                onIonClear={(e:any) => cargar_roles(true, "", false)}
            >
            </IonSearchbar>

            <IonContent>
                {
                    roles.length === 0? <Respuesta />:null
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
                        roles.map( (item:any) => (
                            <ListaRoles key = {item.id_rol}
                                id_rol = {item.id_rol}
                                nombre = {item.nombre}
                                descrip = {item.descrip}
                                handler_eliminar = {() => handler_eliminar(item.id_rol)}
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
                    mostrarScroll && roles.length!==0?
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
                message={'Eliminando rol. Espere por favor...'}
            />

            <IonAlert
                onDidDismiss = {() => setMostrarConfirmacion(false)}
                isOpen={mostrarConfirmacion}
                header={"Eliminar rol"}
                message={'¿Está seguro de eliminar este rol?'}
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
export default HomeRoles;