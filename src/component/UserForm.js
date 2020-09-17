import React, {useState, useEffect} from 'react';
import connectionAxois from "../connection";

export default function (props) {
  const headers= {
      "Content-type": "multipart/form-data"
  }
    const {display ='block'} =props;
    const [first_name, setfirst_name] = useState('' );
    const [last_name, setlast_name] = useState(  '') ;
    const [email, setemail] = useState( '' );
    const [phone_number, setphone_number] = useState(0 );
    const [errPH, seterrPH] = useState("")
    const [errEmail, seterrEmail] = useState("")
    const [profile_image, setprofile_image]= useState(null);
    
useEffect(()=>{
    setfirst_name(props.first_name);
    setlast_name(props.last_name);
    setemail(props.email);
    setphone_number(props.phone_number);
},[props])
const handleFile=(event)=> {
    console.log("file",event.target.files[0])
setprofile_image(event.target.files[0])
}
    const onSubmit= async ()=>{
        let nextUrl = 'user/insertUser';
        const phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
        if(email.trim().length === 0){
            return seterrEmail("Please enter the email")
        }
        if(!phoneRe.test(phone_number)){
          return  seterrPH("Please Enter the valid Phone Number");
        }else{
            seterrPH("");
        }

        if(props.first_name){
            nextUrl = 'user/updateUser'
        }
        try {
            // const data ={
            //     first_name: first_name,
            //     last_name: last_name,
            //     email: email,
            //     phone_number: phone_number,
            //     profile_image:profile_image
            // }
const formData = new FormData();
formData.append('first_name', first_name);
formData.append('last_name', last_name)
formData.append('email',email);
formData.append('phone_number',phone_number)
formData.append('profile_image',profile_image);
            const result = await connectionAxois({ headers,method: 'post', data:formData,nextUrl});
            if(result === 'Email exists'){
              return  seterrEmail("Please enter the another emails");
            }else{
            props.handleDisplay()
            return result;}
        } catch (error) {
            console.log("error in the List", error)
        }
    }

const handleChange  = (event)=>{
    switch(event.target.name){
        case 'first_name': 
                        setfirst_name(event.target.value); 
                        break;
        case 'last_name': 
                        setlast_name(event.target.value); 
                        break;
        case 'email': 
                        setemail(event.target.value); 
                        seterrEmail("")
                        break;
        case 'phone_number': 
                        setphone_number(event.target.value); 
                        break;
        default : return;
    }
}
    return (
        <div style ={{display, flexDirection: "column", width: 300 , height: 400}} >
            <input type = "text" name= "first_name" onChange={handleChange} value = {first_name} placeholder= {"Enter the First Name"}  required/>
            <input type = "text" name= "last_name" onChange={handleChange} value = {last_name} placeholder= {"Enter the last Name"} required/>
            <input type = "email" name= "email" onChange={handleChange} value = {email} placeholder= {"Enter the email"}  required/>
            <div style={{color: "red"}}>{errEmail}</div>
            <input type = "number" name= "phone_number" onChange={handleChange} value = {phone_number} placeholder= {"Enter the phone number"} required/>
            <div style={{color: "red"}}>{errPH}</div>
            <input type = "file" name="profie_image"  onChange={handleFile} placeholder={"Choose the Profile Image"}  />

            <button onClick={()=>{onSubmit()}} > Submit </button>
        </div>
    )
}
