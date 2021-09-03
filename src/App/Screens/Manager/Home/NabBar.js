import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import TeamList from "../../../images/team-list.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import { propTypes } from 'react-bootstrap/esm/Image';

const NavBarSide = (props) => {
    const history = useHistory();
    const [listValue, setList] = useState(false)
    return (
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"><h1 style={{ color: "white", fontSize: "35px" }}>{props.name}</h1> </a>

            </li>
            <li class="nav-item" >

                <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab"  style={{color:listValue == true ?"red": "white"}}
                onClick={() => {
                    
                   setList(true)
                  
               }}>Account Setting     </a>
                <ul style={{ display: listValue == true ? "block" : "none", listStyle: "none", color:"white" }}>
                    <li class="nav-item"  style={{color:listValue == true ?"red": "white"}} onClick={()=>{
                        history.push("/MyAccount")
                    }}>Profile </li>
                    <li class="nav-item" onClick={()=>{
                        history.push("/Household")
                    }}>HouseHold</li>
                    <li class="nav-item"  onClick={()=>{
                        history.push("/Preference")
                    }}>Preferance</li>
                    <li class="nav-item" onClick={()=>{
                        history.push("/LoginAccount")
                    }}>Login</li>
                </ul>
            </li>
            <li class="nav-item" >
                <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Manage My Team</a>
            </li>
            <li class="nav-item" >
                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab" style={{color:listValue.alert == true ?"red": "white"}}>Team Billing Plans</a>
                <ul style={{ display: listValue.alert == true ? "block" : "none", listStyle: "none",color:"white"   }}>
                    <li  style={{color:listValue.alert == true ?"red": "white"}}>New Alert</li>
                    <li >Inbox</li>
                    <li >Sent</li>
                </ul>
            </li>

            <li class="nav-item" class="nav-item"  >
                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab"  style={{color:listValue.post == true ?"red": "white"}}>Clib & League Plans</a>
                <ul style={{ display: listValue.post == true ? "block" : "none", listStyle: "none",color:"white" }}>

                    <li  style={{color:listValue.post == true ?"red": "white"}}>New Post</li>
                </ul>
            </li>


        </ul>
    )
}

export default NavBarSide;