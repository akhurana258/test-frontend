import React ,{useState} from 'react';
import './App.css';
import UserListing from "./component/UserListing";
import FormData from "./component/UserForm";

function App() {
  const [display, setDisplay] = useState('none');
  const [updateItem, setUpdateItem] = useState({})
  const handleDisplay =(item = {})=>{
    if(item.email){
      setUpdateItem(item);
      setDisplay('flex');
    }else {
      setUpdateItem({email: "",phone_number: 0, first_name: "",last_name: ""});
      if(display === 'none'){
        setDisplay('flex');
      }else{
        setDisplay("none")
      }
    }
  }
  return (
    <div className="App">
      <UserListing handleDisplay={handleDisplay} display={display} />
      <div style= {{display: "flex", justifyContent: "center" , flexDirection: "column", alignItems:"center"}} >
        <h1 onClick={handleDisplay} > +</h1>
        <FormData display={display} handleDisplay={handleDisplay} {...updateItem} />
      </div>
    </div>
  );
}

export default App;
