import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginComponents from "../Screens/Auth/Login"
import SignUpComponents from "../Screens/Auth/Signup"
import ForgetComponents from "../Screens/Auth/ForgetPassword"
import ResetComponents from "../Screens/Auth/Resetpassword"
import VerifyOtpComponents from "../Screens/Auth/VerifyOtp"
// palyer 
import HomeScreen from './../Screens/Players/Home';
import TeamRoster from "../Screens/Players/TeamRoster"
import PlayerSchedule from "../Screens/Players/TeamSchedule"
import PlayerTeamShop from "../Screens/Players/PlayerTeamShop"
import Preferance from "../Screens/Players/Preferance"
import PlayerAssignments from "../Screens/Players/PlayerAssignments"
import PlayerPayment from "../Screens/Players/Payment"
import PlayerMedia from "../Screens/Players/PlayerMedia"
import LiabilityWaiver from "../Screens/Players/liabilityWaiver"
import TeamAvailability from '../Screens/Players/TeamAvailability/TeamAvailability';
import Scorekeeper from '../Screens/Players/ScoreKeeper/ScoreKeeper';
import AddShopData from '../Screens/Players/PlayerTeamShop/AddShopData';

// Team manger
import ManagerHome from './../Screens/Manager/Home';
import TeamSchdule from "./../Screens/Manager/TeamSchedule"
import ManagerRoster from '../Screens/Manager/Roster';
import NewEvent from '../Screens/Manager/TeamSchedule/newEvent'
import AddPlayer from '../Screens/Manager/Roster/AddPlayer'
import CreateTeam from '../Screens/Manager/Roster/CreateTeam'
import ManagerTeamAvailability from '../Screens/Manager/ManagerTeamAvailability/ManagerTeamAvailability'
import TeamMassage from '../Screens/Manager/TeamMassage/teamMassage';
import Inbox from '../Screens/Manager/TeamMassage/inbox';
import Sent from '../Screens/Manager/TeamMassage/sent';
import Alert from '../Screens/Manager/TeamMassage/NewAlert';
import AlertInbox from '../Screens/Manager/TeamMassage/AlertInbox';
import AlertSent from '../Screens/Manager/TeamMassage/AlertSent';
import Post from '../Screens/Manager/TeamMassage/Post';
import NewPost from '../Screens/Manager/TeamMassage/NewPost';
import TeamMedia from '../Screens/Manager/TeamMedia/TeamMedia';
import TeamPayment from '../Screens/Manager/TeamPayment/TeamPayment';
import TeamLiabilityWaiver from '../Screens/Manager/TeamLiabilityWaiver/LiabilityWaiver';
import ManagerTeamShop from '../Screens/Manager/ManagerTeamShop/ManagerShop';
import TeamAssignments from '../Screens/Manager/TeamAssignment/TeamAssignment';

import NotFound from "./../../Error"

export const currentURL = '/projects/suvendu/robins/sportscloud';

//  basename={currentURL}

function RouterScreen() {


    const userdata = useSelector((state) => state.userdata);
    console.log("i am selector",  userdata);
    const [userMe, setUser] = useState(null);
    const [userType, setUserType] = useState("")



    useEffect(() => {
        let user = userdata && userdata._id ? true : false
        setUser(user);
        const userLocal = JSON.parse(localStorage.getItem('user'));
        let userTy = userLocal && userLocal.user_type == 'player' ? true : false
        setUserType(userTy)
        let userD = userLocal && userLocal._id ? true : false
        setUser(userD);
    }, [userdata]);



    return (

        <Router basename={currentURL}>
            {/* <div> */}
            <Switch >
                {
                    userMe ?
                        <>
                            {
                                userType ?

                                    <>
                                        <Route path='/' component={HomeScreen} exact />
                                        <Route path='/teamroster' component={TeamRoster} />
                                        <Route path='/playerschdule' component={PlayerSchedule} />
                                        <Route path='/teamshop' component={PlayerTeamShop} />
                                        <Route path='/preferance' component={Preferance} />
                                        <Route path='/playerassignments' component={PlayerAssignments} />
                                        <Route path='/payment' component={PlayerPayment} />
                                        <Route path='/playermedia' component={PlayerMedia} />
                                        <Route path='/liabilitywaiver' component={LiabilityWaiver} />
                                        <Route path='/TeamAvailability' component={TeamAvailability} />
                                        <Route path='/Scorekeeper' component={Scorekeeper} />
                                        <Route path='/AddShopData' component={AddShopData} />
                                        
                                    </>
                                    :
                                    <>
                                        <Route path='/' component={ManagerHome} exact />
                                        <Route path='/ManagerRoster' component={ManagerRoster} />
                                        <Route path='/Teamschdule' component={TeamSchdule} />
                                        <Route path='/ManagerTeamShop' component={ManagerTeamShop} />
                                        <Route path='/preferance' component={Preferance} />
                                        <Route path='/TeamAssignments' component={TeamAssignments} />
                                        <Route path='/NewEvent' component={NewEvent} />
                                        <Route path='/AddPlayer' component={AddPlayer} />
                                        <Route path='/CreateTeam' component={CreateTeam} />
                                        <Route path='/ManagerTeamAvailability' component={ManagerTeamAvailability} />
                                        <Route path='/Scorekeeper' component={Scorekeeper} />
                                        <Route path='/TeamMassage' component={TeamMassage} />
                                        <Route path='/Inbox' component={Inbox} />
                                        <Route path='/Sent' component={Sent} />
                                        <Route path='/Alert' component={Alert} />
                                        <Route path='/AlertInbox' component={AlertInbox} />
                                        <Route path='/AlertSent' component={AlertSent} />
                                        <Route path='/Post' component={Post} />
                                        <Route path='/NewPost' component={NewPost} />
                                        <Route path='/TeamMedia' component={TeamMedia} />
                                        <Route path='/TeamPayment' component={TeamPayment} />
                                        <Route path='/TeamLiabilityWaiver' component={TeamLiabilityWaiver} />
                                    </>

                            }

                        </>


                        :

                        <>
                            <Route path='/' component={LoginComponents} exact />
                            <Route path='/signup' component={SignUpComponents} />
                            <Route path='/forgetpassword' component={ForgetComponents} />
                            <Route path='/resetpassword' component={ResetComponents} />
                            <Route path='/verifyotp' component={VerifyOtpComponents} />
                            {/* <Route  component={NotFound} /> */}

                        </>

                }

            </Switch >

            {/* </div> */}
        </Router>
    );
}

export default RouterScreen;
