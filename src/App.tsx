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
import Login from '../src/Login/Login';
import PrivateRoute from './Rutas/PrivateRoute';
import PublicRoute from './Rutas/PublicRoute';
import PrivateRouteAdmin from './Rutas/PrivateRouteAdmin';
import HomeRoute from './Rutas/HomeRoute';
import PrivateRouteMedico from './Rutas/PrivateRouteMedico';
import PrivateRouteMedicoCC from './Rutas/PrivateRouteMedicoCC';
import PrivateRoutePaciente from './Rutas/PrivateRoutePaciente';
import PrivateRoutePacienteCC from './Rutas/PrivateRoutePacienteCC';
import PrivateRouteCuidador from './Rutas/PrivateRouteCuidador';
import PrivateRouteCuidadorCC from './Rutas/PrivateRouteCuidadorCC';
import HomeCuidador from './components/Cuidador/HomeCuidador';
import HomePacientesCuidador from './components/Cuidador/HomePacientesCuidador';
import HomePaciente from './components/Paciente/HomePaciente';
import HomeCuidadoresPaciente from './components/Paciente/HomeCuidadoresPaciente';
import AgendaCitas from './components/Cita/agendadoCita';
import FormAgendaCitas from './components/Cita/formAgendadoCita';
import FormAgendaCitasPaciente from './components/Cita/formAgendadoCitaPaciente';
import FormAgendaCitasCuidador from './components/Cita/formAgendadoCitaCuidador';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">

            {/* Públicas */}
            <HomeRoute exact path="/" />
            <PublicRoute exact path='/login' component={Login}/>

            {/* Admin */}
            <PrivateRouteAdmin exact path='/admin' component={Home}/>
            <PrivateRouteAdmin exact path='/admin/formulariodiscapacidades' component={FormularioDiscapacidades}/>
            <PrivateRouteAdmin exact path='/admin/formulariousuarios' component={FormularioUsuarios}/>
            <PrivateRouteAdmin exact path='/admin/formularioroles' component={FormularioRoles}/>
            <PrivateRouteAdmin exact path='/admin/formulariomedicamentos' component={FormularioMedicamentos}/>
            <PrivateRouteAdmin exact path='/admin/formularioenfermedades' component={FormularioEnfermedades}/>
            <PrivateRouteAdmin exact path='/admin/homeenfermedades' component={HomeEnfermedades}/>
            <PrivateRouteAdmin exact path='/admin/homemedicamentos' component={HomeMedicamentos}/>
            <PrivateRouteAdmin exact path='/admin/homediscapacidades' component={HomeDiscapacidades}/>
            <PrivateRouteAdmin exact path='/admin/homeusuarios' component={HomeUsuarios}/>
            <PrivateRouteAdmin exact path='/admin/homeroles' component={HomeRoles}/>
            <PrivateRouteAdmin exact path='/admin/edit/enfermedades/:id' component={FormularioEnfermedades}/>
            <PrivateRouteAdmin exact path='/admin/edit/medicamentos/:id' component={FormularioMedicamentos}/>
            <PrivateRouteAdmin exact path='/admin/edit/discapacidades/:id' component={FormularioDiscapacidades}/>
            <PrivateRouteAdmin exact path='/admin/edit/usuarios/:ced' component={FormularioUsuarios}/>
            <PrivateRouteAdmin exact path='/admin/edit/roles/:id' component={FormularioRoles}/>
            <PrivateRouteAdmin exact path='/admin/perfil/:ced' component={FormularioPerfiles}/>

            {/* Médico */}
            <PrivateRouteMedico exact path='/medico' component={HomeMedico}/>
            <PrivateRouteMedicoCC exact path='/medico/AgendaCitas' component={AgendaCitas}/>
            <PrivateRouteMedicoCC exact path='/medico/formAgendaCitas' component={FormAgendaCitas}/>
            <PrivateRouteMedicoCC exact path='/medico/formAgendaCitas/edit/:id' component={FormAgendaCitas}/>
            {/* <PrivateRouteMedico exact path='/medico/atenderCita' component={AtenderCita}/>
            <PrivateRouteMedico exact path='/medico/atenderCita/:id' component={AtenderCita}/> */}
            <PrivateRouteMedico exact path='/medico/homepacientes' component={HomePacientes}/>
            <PrivateRouteMedico exact path='/medico/homepacientes/expedientepaciente/:ced' component={ExpedientePaciente}/>
            <PrivateRouteMedico exact path='/medico/citaanterior/paciente/:id/:ced' component={VisualizarCita}/>
            <PrivateRouteMedico exact path='/medico/perfil/:ced' component={FormularioPerfiles}/>

            {/* Paciente */}
            {/* <PrivateRouteCuidador exact path='/paciente/homecuidadores' component={HomePacientesCuidador}/> */}
            <PrivateRoutePaciente exact path='/paciente/perfil/:ced' component={FormularioPerfiles} />
            <PrivateRoutePaciente exact path='/paciente' component={HomePaciente} />
            <PrivateRoutePacienteCC exact path='/paciente/AgendaCitas' component={AgendaCitas}/>
            <PrivateRoutePacienteCC exact path='/paciente/formAgendaCitas' component={FormAgendaCitasPaciente}/>
            <PrivateRoutePacienteCC exact path='/paciente/formAgendaCitas/edit/:id' component={FormAgendaCitasPaciente}/>
            {/* <PrivateRoutePacienteCC exact path='/paciente/formAgendaCitas/:id' component={FormAgendaCitas}/> */}
            <PrivateRoutePaciente exact path='/paciente/homecuidadores' component={HomeCuidadoresPaciente} />

            {/* <PrivateRouteCuidador exact path='/paciente' component={HomePaciente}/> */}


            {/* Cuidador */}
            <PrivateRouteCuidador exact path='/cuidador' component={HomeCuidador}/>
            <PrivateRouteCuidadorCC exact path='/cuidador/AgendaCitas' component={AgendaCitas}/>
            <PrivateRouteCuidadorCC exact path='/cuidador/formAgendaCitas' component={FormAgendaCitasCuidador}/>
            <PrivateRouteCuidadorCC exact path='/cuidador/formAgendaCitas/edit/:id' component={FormAgendaCitasCuidador}/>
            <PrivateRouteCuidador exact path='/cuidador/perfil/:ced' component={FormularioPerfiles}/>
            <PrivateRouteCuidador exact path='/cuidador/homepacientes' component={HomePacientesCuidador}/>

          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>

    </IonApp>
  );
};

export default App;
