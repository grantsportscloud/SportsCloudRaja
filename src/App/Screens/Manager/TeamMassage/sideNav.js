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

const SideNav = (props) => {
    const history = useHistory();
    const [listValue, setList] = useState({
        email: false,
        alert: false,
        post: false
    })
    return (
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"><h1 style={{ color: "white", fontSize: "35px" }}>{props.name}</h1> </a>

            </li>
            <li class="nav-item" >

                <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab" onClick={() => {
                 history.push("/TeamMassage")
                setList({ email: true })
               
            }} style={{color:listValue.email == true ?"red": "white"}}>Email     </a>
                <ul style={{ display: listValue.email == true ? "block" : "none", listStyle: "none", color:"white" }}>
                    <li class="nav-item" onClick={() => {
                        history.push("/TeamMassage")
                        setList({ email: true })
                    }} style={{color:listValue.email == true ?"red": "white"}}>Compose Mail</li>
                    <li class="nav-item" onClick={() => {
                        history.push("/Inbox")
                        setList({ email: true })
                    }}>Inbox</li>
                    <li class="nav-item" onClick={() => {
                        history.push("/Sent")
                        setList({ email: true })
                    }}>Sent</li>
                </ul>
            </li>
            <li class="nav-item" >
                <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Chat</a>
            </li>
            <li class="nav-item" >
                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab" onClick={() => {
                setList({ alert: true })
                history.push("/Alert")
            }} style={{color:listValue.alert == true ?"red": "white"}}>Alart</a>
                <ul style={{ display: listValue.alert == true ? "block" : "none", listStyle: "none",color:"white"   }}>
                    <li onClick={() => {

                        history.push("/Alert")
                        setList({ alert: true })
                    }} style={{color:listValue.alert == true ?"red": "white"}}>New Alert</li>
                    <li onClick={() => {
                        history.push("/AlertInbox")
                        setList({ alert: true })
                    }}>Inbox</li>
                    <li onClick={() => {
                        history.push("/AlertSent")
                        setList({ alert: true })
                    }}>Sent</li>
                </ul>
            </li>

            <li class="nav-item" class="nav-item"  >
                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab" onClick={() => {
                    history.push("/Post")
                    setList({ post: true })
                }} style={{color:listValue.post == true ?"red": "white"}}>Posts</a>
                <ul style={{ display: listValue.post == true ? "block" : "none", listStyle: "none",color:"white" }}>

                    <li onClick={() => {
                        history.push("/NewPost")
                        setList({ post: true })
                    }} style={{color:listValue.post == true ?"red": "white"}}>New Post</li>
                </ul>
            </li>


        </ul>
    )
}

export default SideNav;