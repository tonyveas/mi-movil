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

const HomeCuidadoresPaciente = (props:any) => {

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

    // const mostrar_pacientes = () => {
    //     AxiosUsers.mostrar_pacientes().then( response => {
    //       console.log("pacientes: ",response.data);
    //       let lista = response.data.map( elemento => ({
    //         cedula: elemento.cedula,
    //         nombres: elemento.nombre +' '+elemento.apellido,
    //         edad: (moment(moment(elemento.fecha_nacimiento).format('YYYY-MM-DD'),'YYYYMMDD').fromNow()).substring(4,12) ,
    //         sexo: elemento.sexo === 'M'? 'Masculino': elemento.sexo === 'F'? 'Femenino': 'Prefiero no decirlo' ,
    //         correo: elemento.correo,
    //         accion: elemento.cedula
    //       }));
    //       setDataSource(lista);
    //       setLoading(false)
    //     });
    // }

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

            <IonContent>
                {
                    
                    cuidadores.length === 0? <Respuesta />:null
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
                        cuidadores.map( (item:any) => (
                            <Cuidadores key = {item.cedula}
                                cedula = {item.cedula}
                                nombre = {item.nombre}
                                apellido = {item.apellido}
                                correo = {item.correo}
                                usuario = {item.usuario}
                                sexo = {item.sexo}
                                fecha_nacimiento = {item.fecha_nacimiento}
                                
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
                    mostrarScroll && cuidadores.length!==0?
                        <div className="ion-margin">
                            <IonItem lines="none">
                                <br />
                                <IonLabel color="medium" class="ion-text-center">No hay más registros que mostrar</IonLabel>
                                <br />
                            </IonItem>
                        </div>:null
                }
            

            
            <IonPopover
                isOpen={mostrarModal}
                onDidDismiss={() => setMostrarModal(false)}
            >
                <IonTitle className="ion-margin-top ion-text-center">Asociar cuidador</IonTitle>
                <br/>
                <IonList>
                    <IonItem key ="cuidadores">
                        <IonLabel position="stacked"> Seleccione cuidador</IonLabel>
                        <IonSelect placeholder="Seleccione cuidador" value={nuevoCuidador} name="estado" onIonChange={(e) => setNuevoCuidador(e.detail.value)} className="ion-margin-top" okText="Ok" cancelText="Cancelar">
                            {
                                listaCuidadores.map( item => (
                                    <IonSelectOption key = {item.cedula} value={item.cedula}>{item.nombre} {item.apellido}</IonSelectOption>

                                ))
                            }
                            {/* <IonSelectOption value="F">Mujer</IonSelectOption>
                            <IonSelectOption value="P">Prefiero no decirlo</IonSelectOption> */}
                        </IonSelect>
                    </IonItem>
                </IonList>
                <div className="ion-text-center ion-margin">
                    <IonButton expand="block" size="small" type="submit" onClick={() => setAgregar(true)} color="success">Asociar</IonButton>
                    <IonButton expand="block" size="small" onClick={() => setMostrarModal(false)}>Cancelar</IonButton>
                </div >
            </IonPopover>


            </IonContent>
            <IonLoading
                isOpen={cargando}
                message={'Cargando datos. Espere por favor...'}
            />
                
            <IonLoading
                isOpen={mostrarLoad}
                message={'Asociando cuidador. Espere por favor...'}
            />

            <IonLoading
                isOpen={mostrarLoad2}
                message={'Quitando cuidador. Espere por favor...'}
            />

            <IonAlert
                isOpen={agregar}
                onDidDismiss={() => setAgregar(false)}
                header={"Asociar"}
                message={'¿Quiere asociar este cuidador?'}
                buttons={[
                
                    {
                        text: 'No',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            setAgregar(false);
                        }
                    },
                    {
                        text: 'Si',
                        handler: () => {
                            asociar_cuidador();
                        }
                    }
                ]}

            />

            <IonAlert
                onDidDismiss = {() => setMostrarConfirmacion(false)}
                isOpen={mostrarConfirmacion}
                header={"Quitar Cuidador"}
                message={'¿Está seguro de quitar a este cuidador de su lista?'}
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
                    isOpen={exito}
                    onDidDismiss={() => setExito(false) }
                    header={"Cuidador asociado correctamente"}
                    buttons={[   
                        {
                          text: 'Aceptar',
                          handler: () => {
                            setExito(false);
                          }
                        }
                    ]}
                />

            <IonAlert
                isOpen={alerta}
                onDidDismiss={() => setAlerta(false) }
                header={"Cuidador quitado satisfactoriamente"}
                buttons={['Aceptar']}
            />

        </IonPage>
    );
}
export default HomeCuidadoresPaciente;