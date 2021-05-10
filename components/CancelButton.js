import React from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/generaldialog.css';

const CancelButton = ({onClick,id}) => <button onClick={onClick} className="btn btn-danger circleButtons" 
    id={id} type="button"><i className="fa fa-times btnIcon"></i></button>;

CancelButton.propTypes = {
    onClick : PropTypes.func.isRequired,
    id : PropTypes.string
};

CancelButton.defaultProps = {
    id : 'canelBtn'
}

export default CancelButton;