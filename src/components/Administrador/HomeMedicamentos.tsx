import React from 'react';
import {
    IonContent, IonToolbar, IonIcon, IonTitle, IonPage, IonButtons, IonBackButton, IonButton, IonPopover, IonLoading,
    IonRefresher, IonRefresherContent, IonSearchbar, IonList, IonItem, IonLabel, IonDatetime,
    useIonViewWillEnter,
    IonInfiniteScroll, IonInfiniteScrollContent,
    IonAlert
} from '@ionic/react';

import { add, arrowBackOutline } from 'ionicons/icons';
import AxiosMedicamentos from '../../Services/AxiosMedicamentos';
import ListaMedicamentos from './medicamentosComponents/ListaMedicamentos';
import Respuesta from '../../components/Respuesta';

const HomeMedicamentos = (props:any) => {

    const [medicamentos, setMedicamentos] = React.useState(new Array<any>());
    const [cargando, setCargando] = React.useState(false);
    const [mostrarScroll, setMostrarScroll] = React.useState(false);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [mostrarConfirmacion, setMostrarConfirmacion] = React.useState(false);
    const [mostrarLoad, setMostrarLoad] = React.useState(false);
    const [alerta, setAlerta] = React.useState(false);
    const [id, setId] = React.useState("");

    useIonViewWillEnter(() => {
        cargar_medicamentos(true, "", false);
    });

    const handler_eliminar = (id:any) => {
        setId(id);
        setMostrarConfirmacion(true);
    }

    const eliminar = () => {
        setMostrarLoad(true);
        AxiosMedicamentos.eliminar_medicamento(id).then( res => {
            setMostrarLoad(false);
            setAlerta(true);
            cargar_medicamentos(true, "", true);
        });
    }

    const cargar_medicamentos = (newLoad:boolean ,nombre: string, mostrar:boolean ) => {
        let pIndex = pageIndex;
        if (newLoad && !mostrar){
            setCargando(true);
            pIndex = 0;
        }else if (newLoad && mostrar){
            pIndex = 0;
        }else{
            pIndex ++;
        }
        AxiosMedicamentos.medicamentos({nombre: nombre, page_index: pIndex, page_size: pageSize}).then( resp => {
            let array: Object[] = resp.data.resp;
            if(newLoad && !mostrar){
                setCargando(false);
                setMedicamentos(array);
                setMostrarScroll(resp.data.itemSize === array.length);
            }else if(newLoad && mostrar){
                setMostrarScroll(resp.data.itemSize === array.length);
                setMedicamentos(array);
            }else{
                let array_total = [...array, ...medicamentos]
                setMedicamentos([
                    ...medicamentos,
                    ...array
                ]);
                setMostrarScroll(resp.data.itemSize === array_total.length);
            }

            setPageIndex(pIndex);

        })
    }

    const loading = (e: any, newPageIndex: number) => {
        cargar_medicamentos(newPageIndex === 0, "", false);
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
                <IonTitle>Gestionar medicamentos</IonTitle>
                <IonButtons slot="end">
                    <IonButton routerLink="/admin/formulariomedicamentos"><IonIcon icon={add}></IonIcon></IonButton>
                </IonButtons>
            </IonToolbar>

            <IonSearchbar placeholder="Buscar medicamento..."
                onIonChange={e => cargar_medicamentos(true, e.detail.value!, true)}
                onIonClear={(e:any) => cargar_medicamentos(true, "", false)}
            >
            </IonSearchbar>

            <IonContent>
                {
                    medicamentos.length === 0? <Respuesta />:null
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
                        medicamentos.map( (item:any) => (
                            <ListaMedicamentos key = {item.id_medicamento}
                                id_medicamento = {item.id_medicamento}
                                codigo = {item.codigo}
                                nombre = {item.nombre}
                                descrip = {item.descrip}
                                handler_eliminar = {() => handler_eliminar(item.id_medicamento)}
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
                    mostrarScroll && medicamentos.length!==0?
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
                message={'Eliminando medicamento. Espere por favor...'}
            />

            <IonAlert
                onDidDismiss = {() => setMostrarConfirmacion(false)}
                isOpen={mostrarConfirmacion}
                header={"Eliminar Medicamento"}
                message={'¿Está seguro de eliminar este medicamento?'}
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
export default HomeMedicamentos;