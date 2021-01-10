import React from "react";
import {Jumbotron, Row, Col, Image, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  return (
    <div>
                <Jumbotron>
                    <h1>ElderAid</h1>
                    <p> A social platform for our youth to help the most vulenarable populations during the COVID pandemic.</p>
                <Link to="/login">
                    <Button bsStyle = "primary" id = "centerWrapper">Join as an Elder or Youth</Button>
                </Link>
                </Jumbotron>
                <Row className="show-grid text-center">
                    <Col xs={12} sm = {4} className = "sections">
                        <Image src = "https://i.pinimg.com/474x/94/a9/41/94a941c850700ab51822a925c4e3b292.jpg" id="pic1"/>
                        <h3>COVID-19</h3>
                        <p id = "margins1">During this ongoing COVID19 pandemic, it is apparent that the most vulnerable  
                        groups are seniors and people who are immuno-compromised. These people are not able to complete simple 
                        daily tasks, due to the fear of contracting the virus. Examples of these tasks include grocery shopping,
                        walking the dog, or participating in recreational acitivties in public.</p>
                    </Col>
                    <Col xs={12} sm = {4} className = "sections">
                        <Image src = "https://thumbs.dreamstime.com/b/continuous-line-drawing-happy-jumping-group-youth-131806645.jpg" id="pic2"/>
                        <h3>Youth and Adults</h3>
                        <p id = "margins2">The types of people who are less vulnerable to the virus and have a lower likelihood of experiencing
                        fatal symptoms include youth and adults. If these people take the proper precautions, they would be able to safely complete
                        the tasks that would be dangerous for seniors and immuno-compromised people.</p>
                    </Col>
                    <Col xs={12} sm = {4} className = "sections">
                        <Image src = "https://i.pinimg.com/originals/d6/4f/68/d64f682d261ec942b346dbf4223129ec.png" id="pic3"/>
                        <h3>Our Mission</h3>
                        <p id=  "margins3">Our website provides a way for elders to partner with one youth or adult who would like to volunteer 
                        and help the most vulnerable people during these desperate times. We provide a very simple, intuitive user interface so that
                        elders can navigate it with ease and get a partner within a few clicks. Volunteers would have to go through an application
                        process and provide COVID-19 testing documents before being paired with an elder.</p>
                    </Col>
                </Row>
            </div>
  );
}

export default Home;