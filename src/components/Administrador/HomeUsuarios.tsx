import React from 'react';
import {
    IonContent, IonToolbar, IonIcon, IonTitle, IonPage, IonButtons, IonBackButton, IonButton, IonPopover, IonLoading,
    IonRefresher, IonRefresherContent, IonSearchbar, IonList, IonItem, IonLabel, IonDatetime,
    useIonViewWillEnter,
    IonInfiniteScroll, IonInfiniteScrollContent,
    IonAlert
} from '@ionic/react';

import { add } from 'ionicons/icons';
import Respuesta from '../Respuesta';
import AxiosUsers from '../../Services/AxiosUsers';
import ListaUsuarios from './usuariosComponents/ListaUsuarios';

const HomeUsuarios = () => {

    const [usuarios, setUsuarios] = React.useState(new Array<any>());
    const [cargando, setCargando] = React.useState(false);
    const [mostrarScroll, setMostrarScroll] = React.useState(false);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [mostrarConfirmacion, setMostrarConfirmacion] = React.useState(false);
    const [mostrarLoad, setMostrarLoad] = React.useState(false);
    const [alerta, setAlerta] = React.useState(false);
    const [cedula, setCedula] = React.useState("");

    useIonViewWillEnter(() => {
        cargar_usuarios(true, "", false);
    });

    const handler_eliminar = (cedula:any) => {
        setCedula(cedula);
        setMostrarConfirmacion(true);
    }

    const eliminar = () => {
        setMostrarLoad(true);
        AxiosUsers.deshabilitar_usuario({cedula: cedula}).then( res => {
            setMostrarLoad(false);
            setAlerta(true);
            cargar_usuarios(true, "", true);
        });
    }

    const cargar_usuarios = (newLoad:boolean ,cedula: string, mostrar:boolean ) => {
        let pIndex = pageIndex;
        if (newLoad && !mostrar){
            setCargando(true);
            pIndex = 0;
        }else if (newLoad && mostrar){
            pIndex = 0;
        }else{
            pIndex ++;
        }
        AxiosUsers.usuarios({cedula: cedula, page_index: pIndex, page_size: pageSize}).then( resp => {
            let array: Object[] = resp.data.resp;
            if(newLoad && !mostrar){
                setCargando(false);
                setUsuarios(array);
                setMostrarScroll(resp.data.itemSize === array.length);
            }else if(newLoad && mostrar){
                setMostrarScroll(resp.data.itemSize === array.length);
                setUsuarios(array);
            }else{
                let array_total = [...array, ...usuarios]
                setUsuarios([
                    ...usuarios,
                    ...array
                ]);
                setMostrarScroll(resp.data.itemSize === array_total.length);
            }

            setPageIndex(pIndex);

        })
    }

    const loading = (e: any, newPageIndex: number) => {
        cargar_usuarios(newPageIndex === 0, "", false);
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
                <IonTitle>Gestionar usuarios</IonTitle>
                <IonButtons slot="end">
                    <IonButton routerLink="/admin/homeusuarios"><IonIcon icon={add}></IonIcon></IonButton>
                </IonButtons>
            </IonToolbar>

            <IonSearchbar placeholder="Buscar usuario..."
                onIonChange={e => cargar_usuarios(true, e.detail.value!, true)}
                onIonClear={(e:any) => cargar_usuarios(true, "", false)}
            >
            </IonSearchbar>

            <IonContent>
                {
                    usuarios.length === 0? <Respuesta />:null
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
                        usuarios.map( (item:any) => (
                            <ListaUsuarios key = {item.cedula}
                                cedula = {item.cedula}
                                nombre = {item.nombre}
                                apellido = {item.apellido}
                                correo = {item.correo}
                                usuario = {item.usuario}
                                sexo = {item.sexo}
                                fecha_nacimiento = {item.fecha_nacimiento}
                                rol = {item.rol}
                                id_rol = {item.id_rol}
                                estado = {item.estado}
                                handler_eliminar = {() => handler_eliminar(item.cedula)}
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
                    mostrarScroll && usuarios.length!==0?
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
                message={'Deshabilitando usuario. Espere por favor...'}
            />

            <IonAlert
                onDidDismiss = {() => setMostrarConfirmacion(false)}
                isOpen={mostrarConfirmacion}
                header={"Deshabilitar Usuario"}
                message={'¿Está seguro de deshabilitar este usuario?'}
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
export default HomeUsuarios;