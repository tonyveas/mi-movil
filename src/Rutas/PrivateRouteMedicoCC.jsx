import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './../Login/Auth';

const PrivateRouteMedico = ({ component: Component,  ...rest }) => (
    <Route {...rest} render={props => (!Auth.isLogin() ? (<Redirect to='/login' />) : (Auth.isMedico() ? (<Component {...props} />) : (Auth.isPaciente() ? (<Redirect to='/paciente' />) : (Auth.isCuidador() ? (<Redirect to='/cuidador' />) : (<Redirect to='/admin' />)))))} />

);
export default PrivateRouteMedico;
