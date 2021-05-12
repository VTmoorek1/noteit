import PropTypes from 'prop-types';
import '../stylesheets/generaldialog.css';
declare const OkButton: {
    ({ onClick, id }: {
        onClick: any;
        id: any;
    }): any;
    defaultProps: {
        id: string;
    };
    propTypes: {
        onClick: PropTypes.Validator<(...args: any[]) => any>;
        id: PropTypes.Requireable<string>;
    };
};
export default OkButton;
