import React, {Component} from 'react';
import './Components/Icon/icon.js';
import './App.css';
import Info from "./Components/Info/info"
import Tabs from "./Components/Tabs/tabs";
import {func} from "./Request/fetch";
import {getStateFromStore} from "./index";
import ShowInf from "./Components/Tab/ShowInf/showInf";
import WriteInf from "./Components/Tab/WriteInf/writeInf";

class App extends Component {
    render() {
        let state = getStateFromStore();
        let user = state.fetch.user;
        let btn = state.whatButton.shown;
        function getElement(mode) {
            if (mode==='READ') {
                return <ShowInf inf={state.whatButton[btn].inf}/>;
            }
            else if (mode==='WRITE'){
                return <WriteInf inf={state.whatButton[btn].inf}/>;
            }
            else
                return (null);
        }
        let elem = getElement(!(state.whatButton[btn])?'':state.whatButton[btn].mode);
        return (
            <main>
                <div className="divTop">
                    <h2>Введите имя пользователя:</h2>
                    <div className="divRequest">
                        <input type="text" id="nickname"/>
                        <button className="usualButtons" onClick={()=>{
                            func(document.getElementById("nickname").value);
                        }}>Отправить</button>
                    </div>
                </div>
                <div className="divBottom">
                    <Info user={user}/>
                </div>
                <div className="gridTabs">
                    <div className="tab">
                        <Tabs/>
                    </div>
                    <div>
                        {elem}
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
