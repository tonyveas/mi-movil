import React from 'react'
import { IonLabel } from '@ionic/react'

const Respuesta = () => {
    return (
        <IonLabel>
            <p className = "ion-text-center">
                <img src = "./assets/img/icons/medicinas/no_results.png" alt= "sin datos"/>
            </p>
            <p className = "ion-text-center ion-margin">
                Sin datos para mostrar
            </p>
        </IonLabel>
    );
}

export default Respuesta