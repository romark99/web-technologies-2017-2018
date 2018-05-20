import React, {Component} from 'react';
import './Components/Icon/icon.js';
import './AppError.css';
import ReactDOM from "react-dom";
import {getRender} from './index'

class AppError extends Component {
    render() {
        let error = this.props.error;
        return (
            <main>
                <div>
                    <h1>{error.toString()}</h1>
                    <button className='usualButtons' onClick={()=>getRender()()}>Go Back</button>
                </div>
            </main>
        );
    }
}

export function makeErrorPage(e) {
    ReactDOM.render(<AppError error={e}/>, document.getElementById('root'));
}