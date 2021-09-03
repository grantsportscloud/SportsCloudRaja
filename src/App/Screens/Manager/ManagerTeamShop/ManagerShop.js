import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
} from "react-router-dom";
import { Network } from '../../../Services/Api';
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import UserProfile from "../../../images/user-profile.png"
import listImage from "../../../images/list-pro1.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import Modal from "react-bootstrap/Modal";


function ManagerTeamShop(props) {
  const history = useHistory()
  const dispatch = useDispatch()

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [dropdown, setDropdown] = useState([])
  const [shopData, setShopData] = useState([])
  const [modalValue, setModalValue] = useState(false)
  const [image, Profile] = useState("")
  const[name,setName]=useState("")
  const [color,setColor]=useState("")
  const[jursey,setJursey]=useState("")
  const[size,setSize]=useState("")
  const[desciption,setDescription]=useState("")
  const[price,setPrice]=useState("")
  const [brand,setBrand]=useState("")
  const [material,setMaterial]=useState("")
  const [teamId,setTeamID]=useState("")

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
    dropdownMenu()
    teamShopData()
    addShopData()
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    // dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/")
  };
  const pic = 'https://nodeserver.mydevfactory.com:1447/'

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

          teamShopData(res.response_data[0]._id);





        })
    }

  }


  const teamShopData = (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      let header = {
        'authToken': user.authtoken

      }
      console.log('user', user)


      console.log("id----------->", id)


      Network('api/team-store-product-list?manager_id=' + user._id + '&team_id=' + id, 'GET', header)
        .then(async (res) => {
          console.log("teamShopData----", res)

          if (res.response_code == 4000) {
            dispatch(logoutUser(null))
            localStorage.removeItem("user");
            history.push("/")
            toast.error(res.response_message)
          }
          setShopData(res.response_data.docs)



        })
    }
  }


  const change = (event) => {
    console.log("event", event.target.value)
    teamShopData(event.target.value)
    setTeamID(event.target.value)

  }
  const addShopData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {

      const formData = new FormData();
      formData.append('manager_id ', user._id);
      formData.append('team_id', teamId);
      formData.append('name ', name);
      formData.append('jersey_number', jursey);
      formData.append('description ', desciption);
      formData.append('price', price);
      formData.append('brand ', brand);
      formData.append('color', color);
      formData.append('material ', material);
      formData.append('size', size);
      formData.append('image', image);


      // const url = 'https://nodeserver.mydevfactory.com:1447/api/update-player-profile-image'


      fetch("https://nodeserver.mydevfactory.com:1447/api/add-store-image", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'x-access-token': user.authtoken,
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      }).then(function (response) {
        console.log("shopDataPost===>", response);
        return response.json();
      })



     


    }
  }

  const handleChange = event => {
    console.log("URL.createObjectURL(event.target.files[0])---->", URL.createObjectURL(event.target.files[0]));
    Profile(event.target.files[0])
    // addShopData(event.target.files[0])

  };
  const save=()=>{
    addShopData()
    setModalValue(false)
  }


  console.log("dta--->", shopData)
  return (
    <div>
      <div class="dashboard-container">
        <div class="dashboard-main">
          <SideMenuComponents />
          <div class="dashboard-main-content">
            <div class="dashboard-head">
              <div class="teams-select">
                {/* <select>
                  <option>My Teams</option>
                  <option>My Teams 2</option>
                  <option>My Teams 3</option>
                </select> */}
                <select onChange={change} >

                  <option>Select A Team</option>
                  {dropdown.map((dropdown) => {
                    return (
                      <option value={dropdown._id}>{dropdown.team_name}</option>
                    )
                  })}
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
                    <div class="my-order-section" onClick={() => setModalValue(true)}>
                      <a href="#">Add Product</a>
                    </div>
                  </div>
                </div>


                <div class="team-shop-list-main">
                  <Modal show={modalValue} >

                    <Modal.Body>
                      <div class="prefarance-form playerinfo-form">
                        <h1 style={{color:"red",fontWeight:"bolder"}}> ADD PRODUCT</h1>
                        <div class="row">

                        <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Team</h2>
                              
                              <select onChange={change}  class="input-select">
                                        <option>Select A Team</option>
                                        {dropdown.map((dropdown) => {
                                            return (
                                                <option value={dropdown._id}>{dropdown.team_name}</option>
                                            )
                                        })}
                                    </select>

                            </div>
                          </div>

                          <div class="col-md-6">
                            <div class="prefarance-form-list">
                              <h2>Name</h2>
                              <input type="text" class="input-select" onChange={(e)=>setName(e.target.value)}/>

                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="prefarance-form-list">
                              <h2>Jursey Number</h2>
                              <input type="text" class="input-select" onChange={(e)=>setJursey(e.target.value)} />

                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="prefarance-form-list">
                              <h2>Description</h2>
                              <input type="text" class="input-select" onChange={(e)=>setDescription(e.target.value)}/>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="prefarance-form-list">
                              <h2>Price</h2>
                              <input type="text" class="input-select" onChange={(e)=>setPrice(e.target.value)}/>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="prefarance-form-list">
                              <h2>Brand</h2>
                              <input type="text" class="input-select" onChange={(e)=>setBrand(e.target.value)}/>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="prefarance-form-list">
                              <h2>Color</h2>
                              <select class="input-select"  onChange={(e)=>setColor(e.target.value)}>
                                <option>Select Color</option>
                                <option>RED</option>
                                <option>BLUE</option>
                                <option>WHITE</option>
                                <option>BLACK</option>
                                <option>YELLOW</option>

                              </select>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="prefarance-form-list">
                              <h2>Material</h2>
                              <input type="text" class="input-select" onChange={(e)=>setMaterial(e.target.value)}/>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="prefarance-form-list">
                              <h2>Size</h2>

                              <select class="input-select" onChange={(e)=>setSize(e.target.value)}>
                                <option>Select Size</option>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                                <option>2XL</option>
                                <option>3XL</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="update-team-photo" style={{ width: "100%"}}>
                              Choose Image
                              <input type="file" name='img' onChange={(event) => handleChange(event)}/>

                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list" >
                              <button class="add-links" onClick={() => setModalValue(false)}>CANCEL</button>
                              <button class="add-links" style={{ backgroundColor: "#181717", marginLeft: "5px" }} onClick={save} >SAVE</button>
                            </div>
                          </div>



                        </div>
                      </div>

                    </Modal.Body>

                  </Modal>
                  {shopData.length == 0 ?
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



                    :
                    shopData.map((data) => {
                      return (
                        <div class="team-shop-product-box">
                          <div class="team-shop-product-img">
                            {data.image == null ? <img src={listImage} alt="" /> :
                              <img src={`${pic}${data.image}`} alt="" />}

                          </div>
                          <div class="team-shop-product-text">
                            <h2 class="product-title">{data.brand}</h2>
                            <p class="product-description">{data.description}</p>
                            <div class="product-price">
                              ${data.price}
                            </div>
                            <div class="product-size">{data.size}</div>
                          </div>
                        </div>

                      )
                    })



                  }





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

export default ManagerTeamShop;
