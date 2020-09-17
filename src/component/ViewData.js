import React from 'react'

export default function ViewData(props) {
    const {item} = props;
    const urlPath = `http://localhost:4000/${item.profile_image}`
    return (
        <div className="popModal">
           {item.profile_image ? <img src = {`${urlPath}`}  style ={{marginRight: 40}} /> : null}
            <h2 style={{top: 10, right: 20, position:"absolute"}} onClick={()=>{props.viewList({},false)}}  >X</h2>
            <table>
                <tbody>

                {['first_name','last_name', 'email','phone_number'].map(item_key=> 
                    <tr key ={item.key}>
                        <td>{item_key.replace('_', ' ').toUpperCase()}</td>
                        <td>{item[`${item_key}`]}</td>
                    </tr>
                )}
                </tbody>
            </table>
                </div>
    )
}
