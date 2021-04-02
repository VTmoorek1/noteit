import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/user.css';


export default class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            icon: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/13000724/Belgian-Malinois-On-White-01.jpg"
        }

    }

    render() {

        let main = <div id="userDiv">
            <img src={this.state.icon} className="userImg" id="userIcon" />
            {this.props.name && <p id="userName">{this.props.name}</p>}
        </div>;

        return main;
    }
}

User.propTypes = {
    name : PropTypes.string.isRequired
};