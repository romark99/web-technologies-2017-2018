import React, {Component} from 'react';
import './Components/Icon/icon.js';
import './AppError.css';
import ReactDOM from "react-dom";
import {getRender} from './index'

class AppError extends Component {
    render() {
        let error = this.props.error;
        console.log("RENDER:\n");
        console.log(getRender());
        return (
            <main>
                <div>
                    <h1>{error.toString()}</h1>
                    <button onClick={()=>getRender()()}>Go Back</button>
                </div>
            </main>
        );
    }
}

export default AppError;
export function makeErrorPage(e) {
    ReactDOM.render(<AppError error={e}/>, document.getElementById('root'));
}