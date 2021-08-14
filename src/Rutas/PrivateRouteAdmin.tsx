import React, { Component, FunctionComponent } from 'react'
import {match, Route, RouteComponentProps, Redirect} from 'react-router-dom';
import Auth from '../Login/Auth';

// import React, { FunctionComponent } from "react";
// import { RouteComponentProps } from "@reach/router";

// type PropsWithChildren<P> = P & { children?: React.ReactNode };

{/* history, location, match */}

// type Props = { component: FunctionComponent, exact:boolean, path: string } & RouteComponentProps;

// type Props = { component: FunctionComponent, exact:boolean, path: string, history: any, location: any, match: any } & RouteComponentProps;

// type Props = { component: FunctionComponent, exact:boolean, path: string } & RouteComponentProps;

type Props = { component: FunctionComponent, exact:boolean, path: string };

const PrivateRouteAdmin:React.FC <Props>  = ({component:Component, ...rest}) => {
    return (    
            <Route {...rest} render={
                (props:any) => (
                    (!Auth.isLogin() ? (<Redirect to='/login' />) : (Auth.isMedico() ? (<Redirect to='/medico' />) : (Auth.isPaciente() ? (<Redirect to='/paciente' />) : (Auth.isCuidador() ? (<Redirect to='/cuidador' />) : (<Component {...props} />)))))
                )
            }/>
    );
}

export default PrivateRouteAdmin
