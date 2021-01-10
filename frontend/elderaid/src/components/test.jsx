import React, { useContext, createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';


function Dashboard() {
    //Fetch
    const user_id = localStorage.getItem("userID");
    var Url="http://ec2-18-217-84-140.us-east-2.compute.amazonaws.com:3000/api/user/id/${user_id}"
    axios.get(Url)
    .then(response => {
        console.log(response)
    })
    return(
        <p>Hello</p>
    );

} 

export default Dashboard;



function PublicPage() {
    return(
        <div>
            <h1>Welcome to the Public Access Page</h1>
            <h1>You have NOT signed in!</h1>
        </div>
    );
}

function YouthPage() {
    return(
        <div>
            <h1>Welcome to the Youth Dashboard</h1>
            <h1>You have signed in as Youth</h1>
        </div>
    );
}

function ElderPage() {
    return(
        <div>
            <h1>Welcome to the Elder Dashboard</h1>
            <h1>You have signed in as Elder</h1>
        </div>
    );
}