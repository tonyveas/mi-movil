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
import AxiosCitas from '../../Services/AxiosCitas';
import ListaRecordatoriosPaciente from '../Administrador/recordatoriosPacienteComponents/ListaRecordatoriosPaciente';

const RecordatoriosPacientes = (props:any) => {

    const [recordatorios, setRecordatorios] = React.useState(new Array<any>());
    const [cargando, setCargando] = React.useState(false);

    useIonViewWillEnter(() => {
        cargar_recordatorios();
    });

    const cargar_recordatorios = () => {
        console.log("Ingresa")
        setCargando(true)
        AxiosCitas.citas_recordatorios_paciente({"cedula": Auth.getDataUser().cedula}).then( res => {
          console.log("citas_recordatorios_paciente: ",(res.data).length);
          setRecordatorios(res.data);
            setCargando(false)
        });
    }

    return (
        <IonPage>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    {/* <IonBackButton defaultHref="/medico"></IonBackButton> */}
                    {/* <IonButton onClick = {() => props.history.push('/admin')}>
                        <IonIcon slot="icon-only" icon={arrowBackOutline} />
                    </IonButton> */}
                    <IonButton routerLink="/cuidador">
                        <IonIcon slot="icon-only" icon={arrowBackOutline} />
                    </IonButton>
                </IonButtons>
                <IonTitle>Recordatorios de sus citas de hoy</IonTitle>
                
            </IonToolbar>

            
            <IonContent>
                {
                    recordatorios.length === 0? <Respuesta />:null
                }
                {/* <IonRefresher slot="fixed" onIonRefresh={ () => cargar_recordatorios() }>
                    <IonRefresherContent
                    pullingIcon="arrow-dropdown"
                    pullingText="Pull to refresh"
                    refreshingSpinner="circles"
                    refreshingText="Actualizando...">
                    </IonRefresherContent>
                </IonRefresher> */}

                <IonList>
                    {
                        recordatorios.map( (item:any) => (
                            <ListaRecordatoriosPaciente key = {item.id}
                                estado = {item.estado}
                                start = {item.start}
                                end = {item.end}
                                nombre = {item.nombre}
                                apellido = {item.apellido}
                                cedula = {item.cedula}
                                especialidad = {item.especialidad}
                                // fecha_nacimiento = {item.fecha_nacimiento}                                
                                // handler_eliminar = {() => handler_eliminar(item.cedula)}
                            />
                        ))
                    }
                </IonList>
            </IonContent>

            <IonLoading
                isOpen={cargando}
                message={'Cargando datos. Espere por favor...'}
            />

        </IonPage>
    );
}
export default RecordatoriosPacientes;