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
import Logo from "../../../images/logo.png"
import UserProfile from "../../../images/user-profile.png"
import TeamList from "../../../images/team-list.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from '../../../Components/Footer';




function TeamRoster(props) {
    const history = useHistory();

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});

    useEffect(() => {
        // let user = userdata && userdata._id ? true : false;
        // console.log("userMe===>", user);
        setUser(user);
        // console.log("USerData", userdata);
        const userLocal = JSON.parse(localStorage.getItem("user"));
        console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
    }, []);

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };


    return (
        <div>
            <div class="dashboard-container">
                <div class="dashboard-main">
                     <SideMenuComponents />
                    <div class="dashboard-main-content">
                        <div class="dashboard-head">
                            <div class="teams-select">
                                <select>
                                    <option>My Teams</option>
                                    <option>My Teams 2</option>
                                    <option>My Teams 3</option>
                                </select>
                            </div>

                            <div class="profile-head">
                                <div class="profile-head-name">John Doe</div>
                                <div class="profile-head-img">
                                    <img src={UserProfile} alt="" />
                                </div>
                            </div>

                        </div>

                        <div class="prefarance-page">
                            <div class="player-info-head">
                                <h2 class="page-title">Player</h2>
                                <div class="player-info-head-right">
                                    <button class="edit-btn">Edit</button>
                                    <button class="add-new-family">+ Add New Family Member</button>
                                </div>
                            </div>
                            <div class="prefarance-box player-info">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Lisa Menon</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Contact information</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Optional Player Details</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Player Links & Files</a>
                                    </li>

                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                        <div class="prefarance-tab-content">

                                            <div class="prefarance-form playerinfo-form">
                                                <div class="player-profile-img">
                                                    <img src={TeamList} alt="" />
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>First Name</label>
                                                            <input type="text" class="input-select" />
                                                        </div>
                                                    </div>


                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Last Name</label>
                                                            <input type="text" class="input-select" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Email</label>
                                                            <input type="text" class="input-select" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Who is this?</label>
                                                            <input type="text" class="input-select" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Phone Number</label>
                                                            <input type="text" class="input-select" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Label</label>
                                                            <input type="text" class="input-select" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Links</label>
                                                            <button class="add-links">Add Links</button>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Files</label>
                                                            <button class="add-links">Add Files</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                       <Footer/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamRoster;