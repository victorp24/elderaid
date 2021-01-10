import React, { useContext, createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { Button, Card, ListGroup, ListGroupItem, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import qs from 'qs';

function Dashboard() {
    const [role, setRole] = useState("")
    const [isVerified, setVerified] = useState("")
    const [match, setMatch] = useState("")

    useEffect(() => {
        const user_id = localStorage.getItem("userId")
        var Url = "http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/users/id/" + user_id;
        axios.get(Url)
        .then(response => {
            setRole(response.data.role);
            setVerified(response.data.isVerified);
            setMatch(response.data.partnerId);
        }).catch(function(err) {
            alert(err.message);
          }); 
    }, [])
    if(role == "YOUTH"){
        if(isVerified == true && match == null) {
            return(<div><YouthPage_unmatched /></div>);             
        }
        else if(isVerified == true && match != null) {
            return(<div><YouthPage /></div>);                  
        }
        else{
            return(<div><YouthPage_unverified /></div>);                  
        }
    } else if (role == "ELDER") {
        if(match != null){
            return(<div><ElderPage /></div>);             
        } else{
            return(<div><ElderPage_unmatched /></div>);                   
        }
    } else {
        return(<div><PublicPage /></div>);        
    }
    return (<div><YouthPage_unmatched /></div>)
}
export default Dashboard;

//Not Signed in Page
//add buttons to redirect users to signup or login page
function PublicPage() {
    const history = useHistory();
    const routeChangeToLogin = () => {
        let path = "./login";
        history.push(path);
    }
    const routeChangeToSignup = () => {
        let path = "./signup";
        history.push(path);
    }
    return (
        <div>
            <h1>Welcome to the Public Access Page</h1>
            <h1>You have NOT signed in!</h1>
            <Button onClick={routeChangeToLogin}>Go To Login Page</Button> <br /> <br />
            <Button onClick={routeChangeToSignup}>Go To Signup Page</Button>
        </div>
    );
}

// const [role, setRole] = useState("")
//     const [isVerified, setVerified] = useState("")
//     const [match, setMatch] = useState("")

//     const user_id = localStorage.getItem("userId")
//     var Url = "http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/users/id/" + user_id;
//     axios.get(Url)
//     .then(response => {
//         setRole(response.data.role);
//         setVerified(response.data.isVerified);
//         setMatch(response.data.partnerId);
//     })

//Matched and Verified
function YouthPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    const [bio, setBio] = useState("");
    const [gender, setGender] = useState("")
    const [partnerId, setPartnerId] = useState("");   
    const [contactNumber, setContactNumber] = useState(""); 
    const [email, setEmail] = useState("");
    
    useEffect(() => {
        const user_id = localStorage.getItem("userId")
        var Url = "http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/users/id/" + user_id;
        axios.get(Url)
        .then(response => {
            setPartnerId(response.data.partnerId)
        }).then(() => {
            var Url = "http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/users/id/" + partnerId;
            axios.get(Url)
            .then(response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setAge(response.data.age);
                setBio(response.data.bio);
                setGender(response.data.gender);
                setContactNumber(response.data.contactNumber)
                setEmail(response.data.email)
            })
        })
        .catch(function(err) {
            alert(err.message);
          }); 
        }, [])
    return (
        <Container>
            <Row>
                <Col>
                    <div id="partner_card">

                
                        <Card boarder="warnin" className="mt-3" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/411sV6Mle4L._SY300_.jpg" />
                                <Card.Body>
                                <Card.Title>{firstName} - {lastName}</Card.Title>
                                    <Card.Text>
                                        {bio}
                                    </Card.Text>
                                </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Age: {age} Gender: {gender}</ListGroupItem>
                                        <ListGroupItem>Phone Number: {contactNumber} </ListGroupItem>
                                        <ListGroupItem>Email: {email} </ListGroupItem>
                                    </ListGroup>
                                <Card.Body>
                                <Card.Link href="#">Call</Card.Link>
                                <Card.Link href="#">Message</Card.Link>
                            </Card.Body>
                        </Card>       
                    </div>
                </Col>
                <Col>
                    <div id="text1">
                        <h1>Welcome to the Dashboard</h1>
                        <h2>You have signed in as Youth Member</h2>
                        <h4>Status: Verified and Matched</h4>
                    </div>               
                </Col>
            </Row>
        </Container>        
    );
    }


//Unmatched and Unverified
function YouthPage_unverified() {
    return (
        <div id="yunverified">
            <h1>Welcome to the Youth Dashboard</h1>
            <p>Please Wait For Confirmation</p>
            <h1>Status: Unverified and Unmatched</h1>
        </div>
    );
}

//Verified but unmatched
//GET /api/users/invites/id
//GET requst returns users that picked them
//Post Request by clicking button - should redirect to post partnership page?
function YouthPage_unmatched() {
    // const [invitedUsers, setInvitedUsers] = useState([])
    // const options ={
    //     method: "GET",
    //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //     data: qs.stringify({id: user_id}),
    //     url: "http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/users/invites/" + user_id
    // }
    // const user_id = localStorage.getItem("userId")
    // var Url = "http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/users/invites/" + user_id
    // axios(options)
    // .then(response => {
    //     for (let i = 0; i < response.length; i++) {
    //         setInvitedUsers(response.data.firstName[i])
    //     };
    //     console.log(invitedUsers)
    // })
    return (

        <div>
            <h1>Welcome to the Youth Dashboard</h1>
            <p>Please Wait For Confirmation</p>
            <h1>You are Unmatched</h1>
            {/* <p>{invitedUsers}</p> */}
        </div>
    );
}

//Full access and matched with partner
function ElderPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    const [bio, setBio] = useState("");
    const [gender, setGender] = useState("")
    const [partnerId, setPartnerId] = useState("");   
    const [contactNumber, setContactNumber] = useState(""); 
    const [email, setEmail] = useState("");
    
    useEffect(() => {
        const user_id = localStorage.getItem("userId")
        var Url = "http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/users/id/" + user_id;
        axios.get(Url)
        .then(response => {
            setPartnerId(response.data.partnerId)
        }).then(() => {
            var Url = "http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/users/id/" + partnerId;
            axios.get(Url)
            .then(response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setAge(response.data.age);
                setBio(response.data.bio);
                setGender(response.data.gender);
                setContactNumber(response.data.contactNumber)
                setEmail(response.data.email)
            })
        })
        .catch(function(err) {
            alert(err.message);
          }); 
        }, [])
    return (
        <Container>
            <Row>
                <Col>
                    <div>

                
                        <Card boarder="warnin" className="mt-3" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/411sV6Mle4L._SY300_.jpg" />
                                <Card.Body>
                                <Card.Title>{firstName} - {lastName}</Card.Title>
                                    <Card.Text>
                                        {bio}
                                    </Card.Text>
                                </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Age: {age} Gender: {gender}</ListGroupItem>
                                        <ListGroupItem>Phone Number: {contactNumber} </ListGroupItem>
                                        <ListGroupItem>Email: {email} </ListGroupItem>
                                    </ListGroup>
                                <Card.Body>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>       
                    </div>
                </Col>
                <Col>
                    <div>
                        <h1>Welcome to the Elder Dashboard</h1>
                        <h1>You have signed in as Elder</h1>
                        <h4>Status: Verified and Matched</h4>
                    </div>
                </Col>
            </Row>
        </Container>        
    );
}

// const [role, setRole] = useState("")
//     const [isVerified, setVerified] = useState("")
//     const [match, setMatch] = useState("")

//     const user_id = localStorage.getItem("userId")
//     var Url = "http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/users/id/" + user_id;
//     axios.get(Url)
//     .then(response => {
//         setRole(response.data.role);
//         setVerified(response.data.isVerified);
//         setMatch(response.data.partnerId);
//     })





//List of potential matches
function ElderPage_unmatched() {
    //Fetch list of users sorted by distance

    //for loop to (9 max) and display them in a 3x3 grid. 
    
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    const [bio, setBio] = useState("");
    const [gender, setGender] = useState("")
    const [partnerId, setPartnerId] = useState("");   
    const [contactNumber, setContactNumber] = useState(""); 
    const [email, setEmail] = useState("");
    
    useEffect(() => {
        
        function createCard(firstName, lastName, bio, age, gender, phone, email) {
            return(
                <div>
                <Card boarder="warnin" className="mt-3" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/411sV6Mle4L._SY300_.jpg" />
                        <Card.Body>
                        <Card.Title>{firstName} {lastName}</Card.Title>
                            <Card.Text>
                                {bio}
                            </Card.Text>
                        </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Age: {age} Gender: {gender}</ListGroupItem>
                                <ListGroupItem>Phone Number: {phone} </ListGroupItem>
                                <ListGroupItem>Email: {email} </ListGroupItem>
                            </ListGroup>
                        <Card.Body>
                        {/*<Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>*/}
                    </Card.Body>
                </Card>
                </div>
            );}
        
        const user_id = localStorage.getItem("userId")
        var Url = "http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/users/id/" + user_id;
        axios.get(Url)
        .then(response => {
            setLat(response.data.location[0]);
            setLong(response.data.location[1]);
            console.log(response)
            console.log(response.data.location[0])
            console.log(response.data.location[1])
            console.log(typeof lat);

        }).then(() => {
            console.log("http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/usersbyproximity?lat=" + lat + "&long=" + long)
            var Url = "http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/usersbyproximity";
            const options = {
                method: "POST",
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                params: {lat: lat, long: long},
                data: qs.stringify({id: user_id}),
                url: "http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/usersbyproximity"
            };
            axios(options)
            .then(response => {
                console.log(response)
                console.log("hello")
                setFirstName(response.data.firstName);
                console.log(firstName) //undefined
                setLastName(response.data.lastName);
                setAge(response.data.age);
                setBio(response.data.bio);
                setGender(response.data.gender);
                setContactNumber(response.data.contactNumber)
                setEmail(response.data.email)
            })
            .catch(error => console.log(error.response.data))
        })
        .catch(function(err) {
            alert(err.message);
          }); 
        }, [lat, long])
   
        return (
        <div>
        <Container>
            <Row>
                <Col>
                    <div>
                        <createCard firstName={firstName} lastName={lastName} bio={bio} age={age} gender={gender} phone={contactNumber} email={email}/>
                    </div>
                </Col>
                <Col>
                    <div>
                        <h1>Welcome to the Elder Dashboard</h1>
                        <h1>You have signed in as Elder</h1>
                        <h1>You are Unmatched</h1>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>        
    );

}
