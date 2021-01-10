import React, { useContext, createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
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
            })
        })
        .catch(function(err) {
            alert(err.message);
          }); 
        }, [])
    return (
        <div>
            <h1>Welcome to the Youth Dashboard</h1>
            <h1>You have signed in as Youth</h1>
            <h1>Verified and Matched</h1>
        
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/411sV6Mle4L._SY300_.jpg" />
                    <Card.Body>
                    <Card.Title>{firstName} {lastName}</Card.Title>
                        <Card.Text>
                            {bio}
                        </Card.Text>
                    </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Age: {age}</ListGroupItem>
                            <ListGroupItem>Gender: {gender}</ListGroupItem>
                            <ListGroupItem>Vestibulum at eros</ListGroupItem>
                        </ListGroup>
                    <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>       
        
        </div>
    );
    }


//Unmatched and Unverified
function YouthPage_unverified() {
    return (
        <div>
            <h1>Welcome to the Youth Dashboard</h1>
            <p>Please Wait For Confirmation</p>
            <h1>Unverified and Unmatched</h1>
        </div>
    );
}

//Verified but unmatched
//GET /api/users/invites/id
//GET requst returns users that picked them
//Post Request by clicking button - should redirect to post partnership page?
function YouthPage_unmatched() {
    return (
        <div>
            <h1>Welcome to the Youth Dashboard</h1>
            <p>Please Wait For Confirmation</p>
            <h1>You are Unmatched</h1>
        </div>
    );
}

//Full access and matched with partner
function ElderPage() {
    return (
        <div>
            <h1>Welcome to the Elder Dashboard</h1>
            <h1>You have signed in as Elder</h1>
            <h1>Verified and Matched</h1>
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

//List of potential matches
function ElderPage_unmatched() {
 
    
    return (
        <div>
            <h1>Welcome to the Elder Dashboard</h1>
            <h1>You have signed in as Elder</h1>
            <h1>You are Unmatched</h1>
        </div>
    );
}