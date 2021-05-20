import React, { Component } from 'react';
import '../stylesheets/user.css';

interface Props {
    name : string
}

interface State {
    icon : string,
}

export default class User extends Component<Props,State> {

    state : State = {
        icon: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/13000724/Belgian-Malinois-On-White-01.jpg"
    }
    
    constructor(props : Props)
    {
        super(props);
    }

    render() {

        let main = <div id="userDiv">
            <img src={this.state.icon} className="userImg" id="userIcon" />
            {this.props.name && <p id="userName">{this.props.name}</p>}
        </div>;

        return main;
    } 
}
