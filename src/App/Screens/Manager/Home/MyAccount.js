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
import UserProfile from "../../../images/user-profile.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import NavBarSide from './NabBar';
import DatePicker from "react-datepicker";
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";

const MyAccount = () => {
    const history = useHistory();
    const [listValue, setList] = useState({
        email: false,
        alert: false,
        post: false
    })
    const [startDate, setStartDate] = useState(new Date());
    const dispatch = useDispatch()

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [schedule, setSchedule] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")

    const [valueDropDown, setValueDropDown] = useState("")
    const [eventType, setEventType] = useState()



    useEffect(() => {
        // let user = userdata && userdata._id ? true : false;
        // //console.log("userMe===>", user);
        dropdownMenu();
        // setUser(user);
        // //console.log("USerData", userdata);
        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);

        // teamSchedule();

    }, []);

    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
    };






    const dropdownMenu = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            //console.log('user',user)

            Network('api/my-team-list?team_manager_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("dropdown----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setDropdown(res.response_data);

                    teamSchedule(res.response_data[0]._id);





                })
        }

    }
    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        teamSchedule(event.target.value);
    }





    const teamSchedule = (id) => {
        console.log("id", id)
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {

                'authToken': user.authtoken

            }

            let url = ""
            if (id != undefined) {

                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10'
            }
            else {
                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + teamDropdown + '&page=1&limit=10'
            }
            //console.log('user',user)
            Network('api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10', 'GET', header)
                .then(async (res) => {
                    console.log("schedule----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    //console.log("doc data----->",res.response_data.docs)
                    setSchedule(res.response_data.docs)


                })
        }
    }
    const flagList = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            //console.log('user',user)

            Network('api/all-flag-list', 'GET', header)
                .then(async (res) => {
                    console.log("flagList----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }



                })
        }
    }


    const deleteScheduleData = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("id-------------->", id)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "_id": id
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/delete-assignment', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("delete assignment data", res)
                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
                teamSchedule()



            })

    }
    return (
        <div class="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />
            <div class="dashboard-main-content">
                <div class="dashboard-head">
                    <div class="teams-select">
                        <button class="create-new-team" onClick={() => history.push("./CreateTeam")}>Create New Teams</button>

                        <select onChange={change} value={teamDropdown == "" ? dropdown[0]?._id : teamDropdown} >
                            {dropdown.map((dropdown) => {
                                return (
                                    <option value={dropdown._id}>{dropdown.team_name}</option>
                                )
                            })}
                        </select>
                        <select>
                            <option>Account</option>
                            <option>Account 2</option>
                            <option>Account 3</option>
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
                <div class="prefarance-page">
                    <div class="page-header">
                        <h2 class="page-title">My Account</h2>

                    </div>


                    <div class="prefarance-box" style={{ overflow: "auto" }} >
                        <NavBarSide />
                        <div class="team-payment team-assesment">




                            <div class="prefarance-form playerinfo-form">

                                <div class="row" style={{ padding: "20px" }}>
                                    <div class="col-md-8">
                                        <div class="prefarance-form-list">
                                            <img src={UserProfile} alt="" style={{ height: "83px", width: "111px" }} />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="prefarance-form-list">
                                            <div className="EditPhoto">Edit Photo</div>

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label> First Name</label>
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
                                            <label>Birthday</label>
                                            <div class="input-select" >
                                                <DatePicker selected={startDate} show="false" onChange={(date) => setStartDate(date)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label>Gender</label>
                                            <select class="input-select">
                                                <option>Select</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>

                                        </div>
                                    </div>


                                    <div class="col-md-12">
                                        <div class="prefarance-form-list">

                                            <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                            <span style={{ color: "white", textDecoration: "underline" }}>Hide Age</span>

                                        </div>
                                    </div>
                                </div>
                                <div class="row" style={{

                                    marginTop: "15px",
                                    paddingBottom: "16px",
                                    padding: "20px"
                                }}>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label>Email</label>
                                            <input type="text" class="input-select" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row" style={{

                                    marginTop: "15px",
                                    paddingBottom: "16px",
                                    padding: "20px"
                                }}>

                                    <div class="col-md-2">
                                        <div class="prefarance-form-list">
                                            <label>Phone </label>
                                            <input type="text" class="input-select" placeholder="Home" />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="prefarance-form-list">
                                            <label>Phone </label>
                                            <input type="text" class="input-select" />
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="prefarance-form-list">
                                            <label>Phone Two </label>
                                            <select class="input-select">
                                                <option>Phone1</option>
                                                <option>Phone2</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="prefarance-form-list">
                                            <label>Phone </label>
                                            <input type="text" class="input-select" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                            <span style={{ color: "white", textDecoration: "underline" }}>Private</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                            <span style={{ color: "white", textDecoration: "underline" }}>Private</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row" style={{

                                    marginTop: "15px",
                                    paddingBottom: "16px",
                                    padding: "20px"
                                }}>





                                    <div class="col-md-12">
                                        <div class="prefarance-form-list">
                                            <label>Address1 Line</label>
                                            <input type="text" class="input-select" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="prefarance-form-list">
                                            <label>Address2 Line</label>
                                            <input type="text" class="input-select" />
                                        </div>
                                    </div>




                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label>City</label>
                                            <input type="text" class="input-select" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label >State</label>
                                            <select class="input-select">
                                                <option>Select</option>
                                                <option>State1</option>
                                                <option>State2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label>Zip Code</label>
                                            <input type="text" class="input-select" />

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label>Country</label>
                                            <select class="input-select">
                                                <option>Select</option>
                                                <option>Country1</option>
                                                <option>Country2</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                            <span style={{ color: "white", textDecoration: "underline" }}>Private</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row" style={{ padding: "20px" }}>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <button class="add-links">CANCEL</button>
                                            <button class="add-links" style={{ backgroundColor: "#181717", marginLeft: "5px" }} >SAVE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div>

        </div >

    )
}

export default MyAccount;