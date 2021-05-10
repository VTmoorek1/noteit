import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/generaldialog.css';

const OkButton = ({onClick,id}) => <button onClick={onClick} className="btn btn-success circleButtons" 
    id={id} type="button"><i className="fa fa-check btnIcon"></i></button>;

OkButton.defaultProps = {
    id : 'okBtn'
}

OkButton.propTypes = {
    onClick : PropTypes.func.isRequired,
    id : PropTypes.string
};

export default OkButton;