import axios from "axios";

//const API_URL = "http://localhost:8080/api/auth/";
//const API_URL = "http://192.168.1.12:8080/api/auth/";
const API_URL = "https://keeptaskserver.herokuapp.com/api/auth";

class AuthService{
    login(email, password){
        return axios.post(API_URL + "signin", {
            email,
            password
        }).then(response=>{
            if(response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    //logout user
    logout(){
        localStorage.removeItem("user");
    }
    //get current user
    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();