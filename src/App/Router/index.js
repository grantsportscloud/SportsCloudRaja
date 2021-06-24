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
// Team manger
import ManagerHome from './../Screens/Manager/Home';
import TeamSchdule from "./../Screens/Manager/TeamSchedule"
import MangerRoster from "../Screens/Players/TeamRoster"
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
                                        <Route path='/playerschdule' component={TeamSchdule} />
                                        <Route path='/teamshop' component={PlayerTeamShop} />
                                        <Route path='/preferance' component={Preferance} />
                                        <Route path='/playerassignments' component={PlayerAssignments} />
                                        <Route path='/payment' component={PlayerPayment} />
                                        <Route path='/playermedia' component={PlayerMedia} />
                                        <Route path='/liabilitywaiver' component={LiabilityWaiver} />
                                    </>
                                    :
                                    <>
                                        <Route path='/' component={ManagerHome} exact />
                                        <Route path='/teamroster' component={MangerRoster} />
                                        <Route path='/playerschdule' component={TeamSchdule} />
                                        <Route path='/teamshop' component={PlayerTeamShop} />
                                        <Route path='/preferance' component={Preferance} />
                                        <Route path='/playerassignments' component={PlayerAssignments} />
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
