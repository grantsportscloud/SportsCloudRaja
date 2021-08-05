import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import UserProfile from "../../../images/user-profile.png"
import flag from "../../../images/flag.png"
import add from "../../../images/add.png"
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";


const TeamAvailability = () => {

    const history = useHistory();
    const dispatch = useDispatch()
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});



    useEffect(() => {
        setUser(user);
        const userLocal = JSON.parse(localStorage.getItem("user"));
        console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);

        
    }, []);
    const handleLogout = () => {
        
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
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
                                <div class="profile-head-name">{user ? user.fname : null}</div>
                                <div class="profile-head-img">
                                    {
                                        user ?
                                            <img src={user.profile_image} alt="" /> :
                                            <img src={UserProfile} alt="" />
                                    }

                                </div>
                            </div>
                            <div class="login-account">
                                <ul>
                                    <li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li>
                                    {/* <li><a href="#" data-toggle="modal" data-target="#myModalregister" onClick={handleLogout}>Logout</a></li> */}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h1 style={{color:"white",fontSize:"30px",fontWeight:"bold"}}>Availability for</h1>
                        </div>
                        <div class="manager-player-section">
                        <div class="teams-select1" >
                         <select>
                             <option>My Availability</option>
                             <option> Team Availability</option>
                         </select>
                         </div>
                                </div>

                        <div class="prefarance-box">
                            <div class="team-payment team-assesment">
                               
                                <table>
                                    <tr>
                                        <th>Game/ Event</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Location</th>
                                        <th>Attendence</th>
                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="flag-prac">
                                                <img src={flag} alt="" />
                                                <button class="practice">Practice</button>
                                            </div>
                                            <div class="game-name">
                                                Dubcity Basketball
                                                Practice</div>
                                        </td>
                                        <td><span>Oct 16, 2021</span></td>
                                        <td>
                                            <span>TBD</span>
                                        </td>
                                        <td>
                                            <span>Eleanor Murray

                                                Fallon Middle Schoo</span>
                                        </td>
                                        <td>
                                            <input type="checkbox" name="checked"  style={{ height:"20px",width:"20px",marginLeft:"30px"}}/>
                                        </td>
                                        
                                    </tr>

                                    <tr>
                                        <td>
                                            <div class="flag-prac">
                                                <img src={flag} alt="" />
                                                <button class="practice">Practice</button>
                                            </div>
                                            <div class="game-name">
                                                Dubcity Basketball
                                                Practice</div>
                                        </td>
                                        <td><span>Oct 16, 2021</span></td>
                                        <td>
                                            <span>TBD</span>
                                        </td>
                                        <td>
                                            <span>Eleanor Murray

                                                Fallon Middle Schoo</span>
                                        </td>
                                        <td>
                                            <input type="checkbox" name="checked"  style={{ height:"20px",width:"20px",marginLeft:"30px"}}/>
                                        </td>
                                        
                                    </tr>

                                    <tr>
                                        <td>
                                            <div class="flag-prac">
                                                <img src={flag} alt="" />
                                                <button class="practice">Practice</button>
                                            </div>
                                            <div class="game-name">
                                                Dubcity Basketball
                                                Practice</div>
                                        </td>
                                        <td><span>Oct 16, 2021</span></td>
                                        <td>
                                            <span>TBD</span>
                                        </td>
                                        <td>
                                            <span>Eleanor Murray

                                                Fallon Middle Schoo</span>
                                        </td>
                                        <td>
                                            <input type="checkbox" name="checked"  style={{ height:"20px",width:"20px",marginLeft:"30px"}}/>
                                        </td>
                                        
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TeamAvailability;