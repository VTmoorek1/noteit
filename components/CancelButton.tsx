import React from 'react';
import {Props} from '../interfaces/buttoninterface';
import '../stylesheets/generaldialog.css';

const CancelButton = ({onClick,id = 'cancelBtn'} : Props): JSX.Element => <button onClick={onClick} className="btn btn-danger circleButtons" 
    id={id} type="button"><i className="fa fa-times btnIcon"></i></button>;


export default CancelButton;