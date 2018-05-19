import React, {Component} from 'react';
import './Components/Icon/icon.js';
import './App.css';
import Info from "./Components/Info/info"
import Tabs from "./Components/Tabs/tabs";
import {func} from "./Request/fetch";

class App extends Component {
    render() {
        return (
            <main>
                <div className="divTop">
                    <h2>Enter user name:</h2>
                    <div className="divRequest">
                        <input type="text" id="nickname"/>
                        <button onClick={()=>{
                            func(document.getElementById("nickname").value);
                        }}>Отправить</button>
                    </div>
                </div>
                <div className="divBottom">
                    <Info/>
                </div>
                <div className="gridTabs">
                    <div className="tab">
                        <Tabs/>
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
