import React, { Component } from "react";
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

class UserCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
            <Card boarder="warnin" className="mt-3" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.props.imageUrl} />
                    <Card.Body>
                    <Card.Title>{this.props.firstName} {this.props.lastName}</Card.Title>
                        <Card.Text>
                            {this.props.bio}
                        </Card.Text>
                    </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Age: {this.props.age}</ListGroupItem>
                            <ListGroupItem> Gender: {this.props.gender}</ListGroupItem>
                            <ListGroupItem>Distance: {Math.round(this.props.distance) + " km away"}</ListGroupItem>
                        </ListGroup>
                    <Card.Body>
                    <Card.Link href="#">Send Partnership Invite</Card.Link>
                </Card.Body>
            </Card>
            </div>
        
        );}
    }

export default UserCard;