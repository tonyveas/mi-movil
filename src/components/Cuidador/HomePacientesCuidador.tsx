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
import Pacientes from './Pacientes';

const HomePacientesCuidador = (props:any) => {

    const [pacientes, setPacientes] = React.useState(new Array<any>());
    const [cargando, setCargando] = React.useState(false);
    const [mostrarScroll, setMostrarScroll] = React.useState(false);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [mostrarConfirmacion, setMostrarConfirmacion] = React.useState(false);
    const [mostrarLoad, setMostrarLoad] = React.useState(false);
    const [alerta, setAlerta] = React.useState(false);
    const [cedula, setCedula] = React.useState("");
    const [mostrarModal,setMostrarModal] = React.useState(false);
    const [nuevoPaciente, setNuevoPaciente] = React.useState("");
    const [listaPacientes, setListaPacientes] = React.useState(new Array<any>());
    const [agregar, setAgregar] = React.useState(false);
    const [exito, setExito] = React.useState(false);

    useIonViewWillEnter(() => {
        cargar_pacientes(true, "", false);
        lista_pacientes();
    });

    const handler_eliminar = (cedula:any) => {
        setCedula(cedula);
        setMostrarConfirmacion(true);
    }

    const eliminar = () => {
        setMostrarLoad(true);
        AxiosPersonas.deletePacienteAsociadoCuidador({paciente: cedula, cuidador: Auth.getDataUser().cedula}).then( res => {
            setMostrarLoad(false);
            //setMostrarModal(false);
            setAlerta(true);
            cargar_pacientes(true, "", true);
        });
    }

    const asociar_paciente = () => {
        //setMostrarLoad(true);
        AxiosPersonas.savePacienteAsociadoCuidador({paciente: nuevoPaciente, cuidador: Auth.getDataUser().cedula}).then( res => {
            cargar_pacientes(true, "", false);
            //setMostrarLoad(false);
            setMostrarModal(false);
            setExito(true);
        });
    }

    const lista_pacientes = () => {
        AxiosPersonas.pacientes_asociar().then( res => {
            console.log("RES: ",res);
            setListaPacientes(res.data);
        });
    }

    const cargar_pacientes = (newLoad:boolean ,cedula: string, mostrar:boolean ) => {
        let pIndex = pageIndex;
        if (newLoad && !mostrar){
            setCargando(true);
            pIndex = 0;
        }else if (newLoad && mostrar){
            pIndex = 0;
        }else{
            pIndex ++;
        }
        AxiosPersonas.pacientes_cuidador({cedula_paciente: cedula, cedula_cuidador: Auth.getDataUser().cedula, page_index: pIndex, page_size: pageSize}).then( resp => {
            let array: Object[] = resp.data.resp;
            if(newLoad && !mostrar){
                setCargando(false);
                setPacientes(array);
                setMostrarScroll(resp.data.itemSize === array.length);
            }else if(newLoad && mostrar){
                setMostrarScroll(resp.data.itemSize === array.length);
                setPacientes(array);
            }else{
                let array_total = [...array, ...pacientes]
                setPacientes([
                    ...pacientes,
                    ...array
                ]);
                setMostrarScroll(resp.data.itemSize === array_total.length);
            }

            setPageIndex(pIndex);

        })
    }

    const loading = (e: any, newPageIndex: number) => {
        cargar_pacientes(newPageIndex === 0, "", false);
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
                    <IonButton routerLink="/medico">
                        <IonIcon slot="icon-only" icon={arrowBackOutline} />
                    </IonButton>
                </IonButtons>
                <IonTitle>Gestionar pacientes</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick = {() => setMostrarModal(true)}><IonIcon icon={add}></IonIcon></IonButton>
                </IonButtons>
            </IonToolbar>

            <IonSearchbar placeholder="Buscar paciente..."
                onIonChange={e => cargar_pacientes(true, e.detail.value!, true)}
                onIonClear={(e:any) => cargar_pacientes(true, "", false)}
            >
            </IonSearchbar>

            <IonContent>
                {
                    pacientes.length === 0? <Respuesta />:null
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
                        pacientes.map( (item:any) => (
                            <Pacientes key = {item.cedula}
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
                    mostrarScroll && pacientes.length!==0?
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
                <IonTitle className="ion-margin-top ion-text-center">Asociar paciente</IonTitle>
                <br/>
                <IonList>
                    <IonItem key ="pacientes">
                        <IonLabel position="stacked"> Seleccione paciente</IonLabel>
                        <IonSelect placeholder="Seleccione paciente" value={nuevoPaciente} name="estado" onIonChange={(e) => setNuevoPaciente(e.detail.value)} className="ion-margin-top" okText="Ok" cancelText="Cancelar">
                            {
                                listaPacientes.map( item => (
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
                message={'Asociando paciente. Espere por favor...'}
            />

            <IonAlert
                isOpen={agregar}
                onDidDismiss={() => setAgregar(false)}
                header={"Asociar"}
                message={'¿Quiere asociar este paciente?'}
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
                            asociar_paciente();
                        }
                    }
                ]}

            />

            <IonAlert
                onDidDismiss = {() => setMostrarConfirmacion(false)}
                isOpen={mostrarConfirmacion}
                header={"Quitar Paciente"}
                message={'¿Está seguro de quitar a este paciente de su lista?'}
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
                    header={"Paciente asociado correctamente"}
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
                header={"Paciente quitado satisfactoriamente"}
                buttons={['Aceptar']}
            />

        </IonPage>
    );
}
export default HomePacientesCuidador;