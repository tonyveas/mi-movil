import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonPopover, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime,
    IonIcon, IonLoading, IonRefresher, IonRefresherContent, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, withIonLifeCycle, IonBackButton, 
  } from '@ionic/react';
  import React, { useState } from 'react';
  import { options, add, arrowBack } from 'ionicons/icons';
  import Respuesta from '../../components/Respuesta';
  // import { Redirect } from 'react-router';
  // import { ImagePicker, ImagePickerOptions  } from '@ionic-native/image-picker/ngx';
  
  // declare const window: ImagePicker;
  
  
  class Imagenes extends React.Component<any, any> {
  
    
    constructor(props:any) {
      super(props);
      // super(imagePicker);
      this.state = {
        // image: ImagePicker
      }
    }
  
    // getPictures = () =>  {
    //     let options  = {  
    //         quality: 100,  
    //         width: 600,  
    //         height: 600,              
    //         outputType: 1,
    //         maximumImagesCount: 8
    //       }; 
    //       this.state.imagePicker.getPictures(options).then((results:any) => {
    //         for (var i = 0; i < results.length; i++) {
    //             console.log('Image URI: ' + results[i]);
    //         }
    //       }, (err:any) => { console.log(err) });        
    // }    

    render() {
  
  
      return (
        <IonPage>
            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/homeusuarios"></IonBackButton>
                </IonButtons>
                <IonTitle >  Images </IonTitle>
            </IonToolbar>
            <IonContent>

                {/* <IonButton onClick = {() => this.getPictures()}>UP</IonButton>           */}

            </IonContent>
        </IonPage>
      );
    }
  }
  
  export default  withIonLifeCycle(Imagenes);