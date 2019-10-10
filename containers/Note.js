import React, { Component } from 'react';

import Media from './Media';

export default class Note extends Component {

    constructor(props) {
        super(props);

        //this.state = { showDialog: false };

        // this.addClick = this.addClick.bind(this);
    }

    render() {

        return <div className="note bg-dark">
            <div id="topDiv">
                <img src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/13000724/Belgian-Malinois-On-White-01.jpg" id="userImg" />
                <div id="titleDiv">
                    <h3 id="title">{this.props.title}</h3>
                </div>
            </div>
            <div id="midDiv">
                <Media file={this.props.file} mediaID={this.props.mID} />
            </div>
            <div id="bottomDiv">
                <h6>{this.props.desc}</h6>
            </div>
        </div>;

    }

} 