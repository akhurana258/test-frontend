import React, {useEffect,useState} from 'react';
import connectionAxios from "../connection";
import ViewData from "./ViewData";

 const UserListing = (props) => {
    const [userListing, setuserListing] = useState([]);
    const [viewData, setviewData] = useState(false);
    const [value, setvalue] = useState({});
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
    const getListing = async()=>{
        try{
            const result = await connectionAxios({nextUrl: 'user/list'});
            setuserListing(result);
        }
        catch(error){
            console.log("error", error)
        }
    }
    const updateList = async( item)=>{
        props.handleDisplay(item)
    }
    const deleteList = async(index,item)=>{
        try{
            const deleteUserListing = JSON.parse(JSON.stringify(userListing))
            await connectionAxios({nextUrl: 'user/deleteUser', method: "delete", headers , data : {email: item.email} });
            deleteUserListing.splice(index,1);
            setuserListing(deleteUserListing)
        }
        catch(error){
            console.log("error", error)
        }
    }
    const viewList=(item , bValue= true)=>{
        setviewData(bValue);
        setvalue(item)
    }
    useEffect(()=>{
        getListing()
    },[props.display])
    return (
        <>
            <table>
                <th>S.NO.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Numbers</th>
                <tbody>
                    {userListing.map((item,index)=> <tr key={item._id}>
                        <td>{index+1}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone_number}</td>
                        <td><button onClick={()=> viewList( item)} >View</button></td>
                        <td><button onClick={()=> updateList( item)} >Edit</button></td>
                        <td><button onClick={()=> deleteList(index, item)}>Delete</button></td>
                    </tr>)}
                </tbody>
            </table>
            {viewData && <ViewData item={value} viewList={viewList} />}
            </>
    )
}
export default UserListing;