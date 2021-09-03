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
import ViewCalender from '../Screens/Players/TeamSchedule/ViewCalender'

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
import MyAccount from '../Screens/Manager/Home/MyAccount';
import NavBarSide from '../Screens/Manager/Home/NabBar';
import Household from '../Screens/Manager/Home/Household';
import Preference from '../Screens/Manager/Home/Preference';
import LoginAccount from '../Screens/Manager/Home/loginAccount';
import ImportPlayer from '../Screens/Manager/Roster/ImportPlayer';
import PlayerInfo from '../Screens/Manager/Roster/PlayerInfo';
import EditLocation from '../Screens/Manager/TeamSchedule/EditLocation';
import NewLocation from '../Screens/Manager/TeamSchedule/NewLocation';
import EditOponent from '../Screens/Manager/TeamSchedule/EditOponent';
import NewOponent from '../Screens/Manager/TeamSchedule/NewOponent';
import Subscribe from '../Screens/Manager/TeamSchedule/Subscribe';

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
                                        <Route path='/ViewCalender' component={ViewCalender} />
                                        
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
                                        <Route path='/MyAccount' component={MyAccount} />
                                        <Route path='/NavBarSide' component={NavBarSide} />
                                        <Route path='/Household' component={Household} />
                                        <Route path='/Preference' component={Preference} />
                                        <Route path='/LoginAccount' component={LoginAccount} />
                                        <Route path='/ImportPlayer' component={ImportPlayer} />
                                        <Route path='/PlayerInfo' component={PlayerInfo} />
                                        <Route path='/EditLocation' component={EditLocation} />
                                        <Route path='/NewLocation' component={NewLocation} />
                                        <Route path='/EditOponent' component={EditOponent} />
                                        <Route path='/NewOponent' component={NewOponent} />
                                        <Route path='/Subscribe' component={Subscribe} />
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
