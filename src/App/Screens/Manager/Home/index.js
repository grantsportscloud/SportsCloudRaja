import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
} from "react-router-dom";
import "./style.css"
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import UserProfile from "../../../images/user-profile.png"
import BigUserProfile from "../../../images/big-user-profile.png"
import { logoutUser } from "../../../Redux/Actions/auth";
import Invoice from "../../../images/invoice.png"
import Cloudy from "../../../images/cloudy-small.png"
import teamList from "../../../images/team-list.png"
import Calender from "../../../images/calender.png"
import lineBar from "../../../images/line-bar.png"
import saveTravel from "../../../images/save-travel.png"
import bullk from "../../../images/bullk.png"
import piechat from "../../../images/piechat.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"
import { useDispatch } from 'react-redux';
import { Network } from '../../../Services/Api';
import { ToastContainer, toast } from 'react-toastify';


function ManagerHome(props) {
 
  const history = useHistory();
  const dispatch = useDispatch()

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
    listTeam()
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    dispatch(logoutUser(null))
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/")
  };
 
const listTeam = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
      let header = {
          'authToken': user.authtoken
      }
      Network('api/my-team-list?team_manager_id=' + user._id ,'GET', header)
          .then(async (res) => {
            console.log("hello----",res)
              if (res.response_code == 2000) {
                 
              } else if (res.response_code == 4000) {
                  toast.error(res.response_message)
              }
          })
          .catch((error) => {
              console.log("error===>", error)
          });
  }
}


  return (
    <div>

      <div class="dashboard-container">
        <div class="dashboard-main">
          <SideMenuComponents manger= "manger"/>
          <div class="dashboard-main-content">
            <div class="dashboard-head">
              <div class="teams-select">
                <button class="create-new-team">Create New Teams</button>
                <select>
                  <option>My Teams</option>
                  <option>My Teams 2</option>
                  <option>My Teams 3</option>
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
              <div class="login-account"><ul><li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li></ul></div>

            </div>
            <div class="dashboard-top-content">
              <div class="dashboard-top-content-left">
                <div class="dashboard-top-content-left-top">
                  <div class="team-profile">
                    <div class="team-profile-img">
                    <img src={BigUserProfile} alt="" />
                    </div>
                    <div class="team-profile-name">
                      John Doe
                                </div>
                    <div class="update-team-photo">
                      Update Team Photo
                            <input type="file" />
                    </div>
                  </div>

                  <div class="invoice-due">
                    <div class="create-new-team-section">
                      <div class="create-new-team-banner">
                        <img src="images/team-photo.png" alt="" />
                      </div>
                      <div class="create-new-team-text">
                        <h3>Did you know XYZ supports over 100 different sports & activities?</h3>
                        <p>Use XYZ for everything from soccer, football or baseball to scouts,gaming or book clubs. It’s easy to start a new group. Try it today!</p>
                        <button>Create New Team</button>
                      </div>
                    </div>

                  </div>

                </div>
                <div class="dashboard-top-content-left-bottom">
                  <div class="dublin-weather">

                    <h2>Dublin-Weather</h2>


                    <div class="dublin-weather-bottom">
                      <div class="dublin-weather-bottom-boxes">
                        <h3>Today</h3>
                        <img src={Cloudy} alt="" />

                        <div class="active-degree">
                          <span>53˚F</span>
                          <p>64˚/50˚</p>
                        </div>
                      </div>
                      <div class="dublin-weather-bottom-boxes">
                        <h3>Sat</h3>
                        <img src={Cloudy} alt="" />
                        <h6>66˚ <span>48˚</span></h6>
                      </div>
                      <div class="dublin-weather-bottom-boxes">
                        <h3>Sun</h3>
                        <img src={Cloudy} alt="" />
                        <h6>66˚ <span>48˚</span></h6>
                      </div>
                      <div class="dublin-weather-bottom-boxes">
                        <h3>Mon</h3>
                        <img src={Cloudy} alt="" />
                        <h6>66˚ <span>48˚</span></h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dashboard-top-content-right">
                <div class="team-list-head">
                  <h2>Team</h2>
                  <a href="#">View All</a>
                </div>
                <div class="team-list-section">
                  <div class="team-list-box">
                    <div class="team-list-box-img">
                    <img src={teamList} alt="" />
                    </div>
                    <div class="team-list-box-text">
                      <h4>Chicago Bulls</h4>
                      <h5>Tab D’souza  <span>Administrative</span></h5>
                      <a href="#">Team Roster</a>
                    </div>
                  </div>
                  <div class="team-list-box">
                    <div class="team-list-box-img">
                    <img src={teamList} alt="" />
                    </div>
                    <div class="team-list-box-text">
                      <h4>Boston Nets</h4>
                      <h5>Tab D’souza  <span>Manager</span></h5>
                      <a href="#">Team Roster</a>
                    </div>
                  </div>
                  <div class="team-list-box">
                    <div class="team-list-box-img">
                    <img src={teamList} alt="" />
                    </div>
                    <div class="team-list-box-text">
                      <h4>Brooklyn Nets</h4>
                      <h5>Tab D’souza  <span>Player</span></h5>
                      <a href="#">Team Roster</a>
                    </div>
                  </div>
                  <div class="team-list-box">
                    <div class="team-list-box-img">
                    <img src={teamList} alt="" />
                    </div>
                    <div class="team-list-box-text">
                      <h4>Golden State Warriors</h4>
                      <h5>Tab D’souza  <span>Administrative</span></h5>
                      <a href="#">Team Roster</a>
                    </div>
                  </div>



                </div>
              </div>
            </div>
            <div class="player-schedule-section">

              <div class="record-standing-box">
                <div class="pie-chat-total-income">
                  <img src={piechat} alt="" />
                </div>

              </div>

              <div class="dashboard-schedule-section">
                <div class="dashboard-schedule-head">
                  <h2>Schedule</h2>
                  <a href="#">View Full Schedule</a>
                </div>
                <div class="dashboard-schedule-main-box">
                  <div class="dashboard-schedule-main-box-option">
                    <label class="options-radio">Game
                        <input type="radio" checked="checked" name="radio" />
                      <span class="checkmark"></span>
                    </label>

                    <label class="options-radio">Event
                          <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="dashboard-schedule-game-event">
                    <div class="dashboard-schedule-game-event-calender">
                      <img src={Calender} alt="" />
                    </div>

                  </div>

                </div>
              </div>

            </div>

            <div class="record-save-section">
              <div class="record-save-box">
                <div class="record-standing-head">
                  Record
                        </div>
                <div class="record-save-box-inner">
                  <div class="record-main-top">
                    <button>Last Game</button>
                    <h4>vs. HuskiesTS Grey</h4>
                    <span>Sat, Mar 14, 10:15 AM</span>

                  </div>
                  <div class="record-line-bar">
                    <img src={lineBar} alt="" />
                  </div>
                  <div class="enter-result">
                    <button class="enter-result-btn">Enter Result</button>
                  </div>
                </div>
              </div>
              <div class="save-travel tb-section">
                <div class="standing-tb-section">
                  <div class="record-standing-head">
                    Standings
                        </div>


                  <div class="record-standing-box-inner">
                    <div class="standing-table">
                      <table>
                        <tr>
                          <th>Team</th>
                          <th>Wins</th>
                          <th>Losses</th>
                          <th>Ties</th>
                        </tr>
                        <tr>
                          <td>Dubcity  Blue</td>
                          <td>8</td>
                          <td>5</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Dubcity  Blue</td>
                          <td>8</td>
                          <td>5</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Dubcity  Blue</td>
                          <td>8</td>
                          <td>5</td>
                          <td>0</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerHome;