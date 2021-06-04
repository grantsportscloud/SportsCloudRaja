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
import PlayerTeamShop from "../Screens/Players/PlayerTeamShop"
import Preferance from "../Screens/Players/Preferance"
import PlayerAssignments from "../Screens/Players/PlayerAssignments"

// Team manger
import ManagerHome from './../Screens/Manager/Home';
import NotFound from "./../../Error"

export const currentURL = '/projects/suvendu/robins/sportscloud';

//  basename={currentURL}

function RouterScreen() {


    const userdata = useSelector((state) => state.userdata);
    const [userMe, setUser] = useState(null);
    const [userType, setUserType] = useState(null)



    useEffect(() => {
        let user = userdata && userdata._id ? true : false
        setUser(user);
        const userLocal = JSON.parse(localStorage.getItem('user'));
        let userD = userLocal && userLocal._id ? true : false
        console.log("i am routew", userLocal);
        setUser(userD);
    }, [userdata]);



    return (

        <Router basename={currentURL}>
            {/* <div> */}
                <Switch >
                    {
                        userMe ?
                            <>
                                <Route path='/' component={ManagerHome} exact/>
                                <Route path='/teamroster' component={TeamRoster} />
                                <Route path= '/teamshop' component={PlayerTeamShop}/>
                                <Route path= '/preferance' component={Preferance}/>
                                <Route path= '/playerassignments' component={PlayerAssignments}/>
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
