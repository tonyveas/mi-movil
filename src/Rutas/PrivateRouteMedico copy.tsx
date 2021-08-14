import React, { Component, FunctionComponent } from 'react'
import {match, Route, RouteComponentProps, Redirect} from 'react-router-dom';
import Auth from '../Login/Auth';

type Props = { component: FunctionComponent, exact:boolean, path: string };

const PrivateRouteMedico:React.FC <Props>  = ({component:Component, ...rest}) => {
    return (    
            <Route {...rest} render={
                (props:any) => (
                    (!Auth.isLogin() ? (<Redirect to='/login' />) : (Auth.isMedico() ? (<Component {...props} />) : (Auth.isPaciente() ? (<Redirect to='/paciente' />) : (Auth.isCuidador() ? (<Redirect to='/cuidador' />) : (<Redirect to='/admin' />)))))
                )
            }/>
    );
}

export default PrivateRouteMedico
