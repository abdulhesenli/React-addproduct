import React,{createContext,useState,useEffect }from "react";
import { useNavigate } from "react-router-dom";

import { ComingRealDb } from "../store";

export const AuthContext =createContext();

const AuthContextProvider =({children})=>{

    const Navigate=useNavigate()

    const[user,setUser]=useState('');
    const[isLogin, setIsLogin]=useState(false);

    const [ComingProduct, setComingProduct]=useState([])

    useEffect( ()=>{
        let  token=localStorage.getItem('token')

        if(token){
            setUser(token)
            setIsLogin(true);
            
        }else{
            Navigate('/register')
         
        }
      
        
    },[user])

    let ProData= async ( )=>{
        let ProductComing = await ComingRealDb();
        let data= ProductComing.data
        for(let  key in data ){
            setComingProduct([...ComingProduct, data[key]])
        }
        // console.log(ProductComing);
    }

    useEffect( ()=>{

       ProData()

    },[])

    const Login=(data)=>{
        setUser(data.idToken);
        setIsLogin(true);
        localStorage.setItem('token' ,data.idToken)
        localStorage.setItem('localId', data.localId);
        Navigate('/')

    }

    const Logout=()=>{

        setIsLogin(false);
        localStorage.removeItem('token')
        Navigate('/login')

    }

    const values ={
        user, 
        isLogin,
        Login,
        ComingProduct,
        Logout
    }


    
    return(
        <div>
            <AuthContext.Provider value={values}>
            {children}

            </AuthContext.Provider>

        </div>
    )
}

export default AuthContextProvider;