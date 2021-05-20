import React from 'react';
import '../stylesheets/generaldialog.css';
import {Props} from '../interfaces/buttoninterface';

const OkButton= ({onClick,id = 'okBtn'} : Props) : JSX.Element => <button onClick={onClick} 
    className="btn btn-success circleButtons" id={id} type="button"><i className="fa fa-check btnIcon"></i></button>;

export default OkButton;