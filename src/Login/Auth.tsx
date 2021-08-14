
const Auth = {
    login(data:any) {
        localStorage.setItem('userdata', JSON.stringify(data))
    },
    logout() {
        localStorage.removeItem('userdata');
    },
    isLogin() {
        // console.log(localStorage.getItem('userdata'),'hhh')
        return localStorage.getItem('userdata');
    },
    getDataUser() {
        let data = localStorage.getItem('userdata');
        if (data!==null){
            return JSON.parse(data);
        }else{
            return {};
        }
    },
    isMedico() {
        let data = localStorage.getItem('userdata');
        if (data!==null){
            let json_user = JSON.parse(data);
            return json_user.rol.toLowerCase().indexOf('medico') !== -1;    
        }else{
            return {};
        }
    },
    isPaciente() {
        let data = localStorage.getItem('userdata');
        if (data!==null){
            let json_user = JSON.parse(data);
            return json_user.rol.toLowerCase().indexOf('paciente') !== -1;    
        }else{
            return {};
        }
    },
    isCuidador() {
        let data = localStorage.getItem('userdata');
        if (data!==null){
            let json_user = JSON.parse(data);
            return json_user.rol.toLowerCase().indexOf('cuidador') !== -1;    
        }else{
            return {};
        }
    },
    isAdmin() {
        let data = localStorage.getItem('userdata');
        if (data!==null){
            let json_user = JSON.parse(data);
            return json_user.rol.toLowerCase().indexOf('admin') !== -1;    
        }else{
            return {};
        }
    }
};
export default Auth;