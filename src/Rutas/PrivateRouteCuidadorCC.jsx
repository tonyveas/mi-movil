import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../Login/Auth';

const PrivateRouteCuidador = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (!Auth.isLogin() ? (<Redirect to='/login' />) : (Auth.isMedico() ? (<Redirect to='/medico' />) : (Auth.isPaciente() ? (<Redirect to='/paciente' />) : (Auth.isCuidador() ? (<Component {...props} />) : (<Redirect to='/admin' />)))))} />

);
export default PrivateRouteCuidador;