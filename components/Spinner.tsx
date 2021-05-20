import React, { Component } from 'react';
import styled from 'styled-components';
import DialogOutline from './DialogOutline';

const SpinnerStyle = styled.div`
    
    border: 16px solid rgba(0,0,0,0);
    border-top: 16px solid lightseagreen;
    left: 50%;
    top: 40%;
    position: absolute;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {transform : translate(-50%,-50%) rotate(0deg) ;}
        100% {transform :  translate(-50%,-50%) rotate(360deg);}
    }
`;

export default () =>
(
    <DialogOutline>
        <SpinnerStyle />
    </DialogOutline>
);


