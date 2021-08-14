import React, { Component, FunctionComponent } from 'react'
import {match, Route, RouteComponentProps, Redirect} from 'react-router-dom';
import Auth from '../Login/Auth';

// import React, { FunctionComponent } from "react";
// import { RouteComponentProps } from "@reach/router";

// type PropsWithChildren<P> = P & { children?: React.ReactNode };

type Props = { component: FunctionComponent } & RouteComponentProps;

const PrivateRoutePaciente:React.FC <Props>  = ({component:Component, ...rest}) => {
    return (    
            <Route {...rest} render={
                (props:any) => (
                    (!Auth.isLogin() ? (<Redirect to='/login' />) : (Auth.isMedico() ? (<Redirect to='/medico' />) : (Auth.isPaciente() ? (<Component {...props} />) : (Auth.isCuidador() ? (<Redirect to='/cuidador' />) : (<Redirect to='/admin' />)))))
                )
            }/>
    );
}

export default PrivateRoutePaciente
