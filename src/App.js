import React, {Component, Fragment} from 'react';
import './Components/icon.js';
import './App.css';
import Info from "./Components/info"

class App extends Component {
    render() {
        return (
            <main>
                <div className="divTop">
                    <h2>Enter user name:</h2>
                    <div className="divRequest">
                        <input type="text" id="nickname"/>
                        <input id="btnSubmit" type="submit" value="Отправить"/>
                    </div>
                </div>
                <div className="divBottom">
                    <Info/>
                </div>
            </main>
        );
    }
}

export default App;
