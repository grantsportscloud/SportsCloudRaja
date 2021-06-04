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
import UserProfile from "../../../images/user-profile.png"
import listImage from "../../../images/list-pro1.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"


function PlayerTeamShop(props) {
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
           
              <div class="team-shop-page">
                <div class="my-order-section">
                  <a href="#">My Orders</a>
                </div>
                <div class="team-shop-list-box">
                  <div class="sort-by-section">
                    <div class="sort-by-section-main">
                      <label>Sort By</label>
                      <select>
                        <option>Popularity</option>
                        <option>Popularity 2</option>
                        <option>Popularity 3</option>
                      </select>
                    </div>
                  </div>

                  <div class="team-shop-list-main">
                    <div class="team-shop-product-box">
                      <div class="team-shop-product-img">
                        <img src={listImage} alt="" />
                      </div>
                      <div class="team-shop-product-text">
                        <h2 class="product-title">Nike Edition</h2>
                        <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
Red Swingman Team Jersey</p>
                        <div class="product-price">
                          $82.49
                               </div>
                        <div class="product-size">Size : S, M, L, XL, XXL</div>
                      </div>
                    </div>

                    <div class="team-shop-product-box">
                      <div class="team-shop-product-img">
                        <img src={listImage} alt="" />
                      </div>
                      <div class="team-shop-product-text">
                        <h2 class="product-title">Nike Edition</h2>
                        <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
Red Swingman Team Jersey</p>
                        <div class="product-price">
                          $82.49
                               </div>
                        <div class="product-size">Size : S, M, L, XL, XXL</div>
                      </div>
                    </div>

                    <div class="team-shop-product-box">
                      <div class="team-shop-product-img">
                        <img src={listImage} alt="" />
                      </div>
                      <div class="team-shop-product-text">
                        <h2 class="product-title">Nike Edition</h2>
                        <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
Red Swingman Team Jersey</p>
                        <div class="product-price">
                          $82.49
                               </div>
                        <div class="product-size">Size : S, M, L, XL, XXL</div>
                      </div>
                    </div>
                    <div class="team-shop-product-box">
                      <div class="team-shop-product-img">
                        <img src={listImage} alt="" />
                      </div>
                      <div class="team-shop-product-text">
                        <h2 class="product-title">Nike Edition</h2>
                        <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
Red Swingman Team Jersey</p>
                        <div class="product-price">
                          $82.49
                               </div>
                        <div class="product-size">Size : S, M, L, XL, XXL</div>
                      </div>
                    </div>
                    <div class="team-shop-product-box">
                      <div class="team-shop-product-img">
                        <img src={listImage} alt="" />
                      </div>
                      <div class="team-shop-product-text">
                        <h2 class="product-title">Nike Edition</h2>
                        <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
Red Swingman Team Jersey</p>
                        <div class="product-price">
                          $82.49
                               </div>
                        <div class="product-size">Size : S, M, L, XL, XXL</div>
                      </div>
                    </div>
                    <div class="team-shop-product-box">
                      <div class="team-shop-product-img">
                        <img src={listImage} alt="" />
                      </div>
                      <div class="team-shop-product-text">
                        <h2 class="product-title">Nike Edition</h2>
                        <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
Red Swingman Team Jersey</p>
                        <div class="product-price">
                          $82.49
                               </div>
                        <div class="product-size">Size : S, M, L, XL, XXL</div>
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

export default PlayerTeamShop;
