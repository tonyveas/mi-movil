import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../Login/Auth';

const PrivateRoutePaciente = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (!Auth.isLogin() ? (<Redirect to='/login' />) : (Auth.isMedico() ? (<Redirect to='/medico' />) : (Auth.isPaciente() ? (<Component {...props} />) : (Auth.isCuidador() ? (<Redirect to='/cuidador' />) : (<Redirect to='/admin' />)))))} />

);
export default PrivateRoutePaciente;

