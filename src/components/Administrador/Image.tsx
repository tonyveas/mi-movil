import React, {useState} from 'react';
import {
    IonContent, IonToolbar, IonIcon, IonTitle, IonPage, IonButtons, IonBackButton, IonButton, IonPopover, IonLoading,
    IonRefresher, IonRefresherContent, IonSearchbar, IonList, IonItem, IonLabel, IonDatetime,
    useIonViewWillEnter,
    IonInfiniteScroll, IonInfiniteScrollContent,
    IonAlert,
    IonFabButton,
    useIonPicker,
    IonHeader
} from '@ionic/react';

//import { BarcodeScanner } from "@ionic-native/barcode-scanner";

//import { Plugins, CameraResultType } from '@capacitor/core';

// import { Camera } from '@capacitor/camera';

//import { AnyPlugin } from 'any-plugin';

// import { Plugins, CameraResultType } from '@capacitor/core';

//import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { add } from 'ionicons/icons';

//const { Camera } = Plugins;


const Image: React.FC = () => {

    const [photo, setPhoto] = React.useState();

    const [present] = useIonPicker();
    const [value, setValue] = useState('');

    useIonViewWillEnter(() => {

    });

    // const openScanner = async () => {
    //     const data = await BarcodeScanner.scan();
    //     console.log(`Barcode data: ${data.text}`);
    // };

    const  takePicture = async() => {
    //     const image = await Camera.getPhoto({
    //     quality: 90,
    //     allowEditing: false,
    //     resultType: CameraResultType.Uri
    //     });

    //     var imageUrl = image.webPath;
        // Can be set to the src of an image now
//        setPhoto(imageUrl);
 
   }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Tab 1</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {/* <IonButton onClick={openScanner}>Scan barcode</IonButton> */}
            </IonContent>
        </IonPage>
    );
}
export default Image;