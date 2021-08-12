import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Home from './components/Home';
import FormularioMedicamentos from './components/Administrador/FormularioMedicamentos';
import HomeMedicamentos from './components/Administrador/HomeMedicamentos';
import HomeEnfermedades from './components/Administrador/HomeEnfermedades';
import FormularioEnfermedades from './components/Administrador/FormularioEnfermedades';
import HomeDiscapacidades from './components/Administrador/HomeDiscapacidades';
import FormularioDiscapacidades from './components/Administrador/FormularioDiscapaciades';
import HomeUsuarios from './components/Administrador/HomeUsuarios';
import FormularioUsuarios from './components/Administrador/FormularioUsuarios';
import HomeRoles from './components/Administrador/HomeRoles';
import FormularioRoles from './components/Administrador/FormularioRoles';
import FormularioPerfiles from './components/Perfil/FormularioPerfiles';
import AtenderCita from './components/Cita/AtenderCita';
import HomeMedico from './components/HomeMedico';
import Imagenes from './components/Administrador/Imagenes';
import HomePacientes from './components/Administrador/HomePacientes';
import ExpedientePaciente from './components/Administrador/ExpedientePaciente';
import Image from './components/Administrador/Image';
import VisualizarCita from './components/Cita/VisualizarCita';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/Home" component = {Home} exact = {true} />
            {/* <Route path="/page/:name" exact={true}>
              <Page />
            </Route> */}
            <Route path="/" component = {Home} exact={true} />

            <Route path="/homemedicamentos" component = {HomeMedicamentos} exact={true} />
            <Route path="/formulariomedicamentos" component = {FormularioMedicamentos} exact={true} />
            <Route path="/edit/medicamentos/:id" component = {FormularioMedicamentos} exact={true} />

            <Route path="/homeenfermedades" component = {HomeEnfermedades} exact={true} />
            <Route path="/formularioenfermedades" component = {FormularioEnfermedades} exact={true} />
            <Route path="/edit/enfermedades/:id" component = {FormularioEnfermedades} exact={true} />

            <Route path="/homediscapacidades" component = {HomeDiscapacidades} exact={true} />
            <Route path="/formulariodiscapacidades" component = {FormularioDiscapacidades} exact={true} />
            <Route path="/edit/discapacidades/:id" component = {FormularioDiscapacidades} exact={true} />

            <Route path="/homeusuarios" component = {HomeUsuarios} exact={true} />
            <Route path="/formulariousuarios" component = {FormularioUsuarios} exact={true} />
            <Route path="/edit/usuarios/:ced" component = {FormularioUsuarios} exact={true} />

            <Route path="/homeroles" component = {HomeRoles} exact={true} />
            <Route path="/formularioroles" component = {FormularioRoles} exact={true} />
            <Route path="/edit/roles/:id" component = {FormularioRoles} exact={true} />

            <Route path="/perfil/:ced" component = {FormularioPerfiles} exact={true} />
            <Route path="/medico/atendercita" component = {AtenderCita} exact={true} />
            <Route path="/medico" component = {HomeMedico} exact={true} />
            <Route path="/medico/citaanterior/paciente/:id/:ced" component = {VisualizarCita} exact={true} />
            <Route path="/imagenes" component = {Imagenes} exact={true} />
            <Route path="/images" component = {Image} exact={true} />
            <Route path="/medico/homepacientes" component = {HomePacientes} exact={true} />
            <Route path="/medico/homepacientes/expedientepaciente/:ced" component = {ExpedientePaciente} exact={true} />


          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>

    </IonApp>
  );
};

export default App;
