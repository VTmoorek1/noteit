import React, { Component } from 'react';
import '../stylesheets/generaldialog.css';
import OkButton from './OkButton';
import CancelButton from './CancelButton';

interface Props {
    message: string,
    okAction?: (name: string) => any,
    cancelAction?: () => void,
    textBox?: boolean
}

interface State {
    title: string
}

/**
 * General use dialog. Can set message and ok and cancel action events
 * from parent
 */
export default class GeneralDialog extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            title: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ title: e.target.value });
    }

    static isValidEmail = (email: string): (RegExpMatchArray | null) => {
        return email.match(/[A-Za-z0-9]+@{1}[A-Za-z]+\.{1}[A-Za-z]{3}/g);
    }

    static isValidPassword = (password: string): boolean => {
        return password.length > 6;
    }

    static validationListener = () => {
        window.addEventListener('load', () => {

            let forms = document.getElementsByClassName('needs-validation');

            for (const form of forms) {
                const hForm = form as HTMLFormElement;
                hForm.addEventListener('submit', (event) => {
                    if (hForm.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    hForm.classList.add('was-validated');
                });
            }
        });
    }

    render() {

        const { message, textBox = false, okAction, cancelAction } = this.props;

        return <div className="dialog">
            <div id="gdForm">
                <h4>{message}</h4>
                {textBox && <input name="title" onChange={this.handleChange}
                    value={this.state.title} type="text" className="form-control" id="gdTextBox" />}
                <div id="gdBtnDiv">
                    {okAction && <OkButton onClick={() => okAction(this.state.title)} />}
                    {cancelAction && <CancelButton onClick={cancelAction} />}
                </div>
            </div>
        </div>;
    }
}


