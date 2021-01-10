import React, { useContext, createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';



function Dashboard() {

    //Sudo testing conditions
    const sudo_role = "YOUTH"
    //Will always set youth as false, must rewrite
    //const sudo_isVerified = (sudo_role == "ELDER") ? true: false
    const sudo_isVerified = true
    const sudo_match = true

    const user_id = localStorage.getItem("userID")
    var Url="http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/user/id/${user_id}"
    axios.get(Url)
    .then(response => {
        console.log("Response: ${response}")
    })

    if(sudo_role == "YOUTH"){
        if(sudo_isVerified == true && sudo_match == false) {
            return(<div><YouthPage_unmatched /></div>);             
        }
        else if(sudo_isVerified == true && sudo_match == true) {
            return(<div><YouthPage /></div>);                  
        }
        else{
            return(<div><YouthPage_unverified /></div>);                  
        }
    } else if (sudo_role == "ELDER") {
        if(sudo_match == true){
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
function PublicPage() {
    return(
        <div>
            <h1>Welcome to the Public Access Page</h1>
            <h1>You have NOT signed in!</h1>
        </div>
    );
}

//Matched and Verified
function YouthPage() {
    return(
        <div>
            <h1>Welcome to the Youth Dashboard</h1>
            <h1>You have signed in as Youth</h1>
            <h1>Verified and Matched</h1>
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
    return(
        <div>
            <h1>Welcome to the Elder Dashboard</h1>
            <h1>You have signed in as Elder</h1>
            <h1>Verified and Matched</h1>
        </div>
    );
}

//List of potential matches
function ElderPage_unmatched()  {
    return(
        <div>
            <h1>Welcome to the Elder Dashboard</h1>
            <h1>You have signed in as Elder</h1>
            <h1>You are Unmatched</h1>
        </div>
    );
}