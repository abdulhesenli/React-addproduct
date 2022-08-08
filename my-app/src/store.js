import axios from "axios";

// qeydiyyat
export const Signup = async (NewUser) =>{
  
    let {data}= await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrOp2BU2HGv_zHM1SEGFMMBDFo9SV4iKU' ,
    
    
        {email:NewUser.email, password:NewUser.password, returnSecureToken:true} );

    return data;
};

// qeydiyyat\


// login 
export const LoginUser =async(NewUser)=>{
    let {data} =await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrOp2BU2HGv_zHM1SEGFMMBDFo9SV4iKU',
    {email:NewUser.email, password:NewUser.password, returnSecureToken:true} )
    
    return data;

}

// login


// random img addproduct
export const RandomImage = async()=>{
    let data = await axios.get('https://source.unsplash.com/random/900×700/?coat');
    return data.request.responseURL;
}
// random img addproduct


// Addproduct Realtime Database

export const AddRealDb = async(NewData)=>{
   let data =await axios.post( 'https://reactproject2-f3a27-default-rtdb.firebaseio.com/Newproduct.json',
   NewData)
   

   return data;
   
}

export const ComingRealDb = async()=>{
    let {data} =await axios.get( 'https://reactproject2-f3a27-default-rtdb.firebaseio.com/Newproduct.json')

    let getData = [];
    for(let key in data){
        data[key].id = key;
        getData.push(data[key]);
    }

    const UserDataList = getData.filter((item) => {

        return item.userid == localStorage.getItem('localId')
    })
    

    return UserDataList;
    
 }
 
 // Addproduct Realtime Database


//  editDATA GETIR
export const eData = async(id)=>{
    let {data} =await axios.get( `https://reactproject2-f3a27-default-rtdb.firebaseio.com/Newproduct/${id}.json`)
    data.id=id 
    return data;
    
 }

// update data editlist
 export const UpdateData = async(editdata)=>{
    let {data} =await axios.put( `https://reactproject2-f3a27-default-rtdb.firebaseio.com/Newproduct/${editdata.id}.json`, editdata.values )
    
 
    return data;
    
 };

//  Producut Delete
export const DeleteProduct = async(id)=>{
    let {data} =await axios.delete( `https://reactproject2-f3a27-default-rtdb.firebaseio.com/Newproduct/${id}.json`)
    data.id=id 
    return data;
    
 }


 export const GetCategory = async () => {
    const { data } = await axios.get('https://reactproject2-f3a27-default-rtdb.firebaseio.com/Category.json');
    const categoryList = []
    for (let key in data) {
        data[key].id = key
        categoryList.push(data[key])
    }
    return categoryList;
}