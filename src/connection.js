import axios from 'axios';
const url = 'http://localhost:4000';
const CreateConnection= async(values)=>{
    const { method= "get", data={}, headers= {"Content-Type": "application/json"}, nextUrl = '' } = values;
    try{
        const result = await axios({method ,headers, url : `${url}/${nextUrl}`, data})
        return result.data
    }catch(error){
        console.log("Error from server");
        return {error : "Their is some error from server"}
    }
}

export default CreateConnection;