import React, {Component} from 'react';
import './Components/Icon/icon.js';
import './App.css';
import Info from "./Components/Info/info"
import Tabs from "./Components/Tabs/tabs";
import {func} from "./Request/fetchUser";
import {getStateFromStore} from "./index";
import ShowInf from "./Components/Tab/ShowInf/showInf";
import WriteInf from "./Components/Tab/WriteInf/writeInf";
import ShowList from "./Components/Tab/ShowList/showList";
import store from "./index";

class App extends Component {
    render() {
        const asyncFetchUser = () => {
            return dispatch => {
                setTimeout(()=> {
                    func(document.getElementById("nickname").value, dispatch);
                }, 2000)
            }
        };
        let foo = ()=>store.dispatch(asyncFetchUser());

        let state = getStateFromStore();
        let user = state.fetch.user;
        let btn = state.whatButton.shown;
        function getElement() {
            if (btn) {
                if (state.whatButton[btn].mode==='READ') {
                    return <ShowInf inf={state.whatButton[btn].inf}/>;
                }
                else if (state.whatButton[btn].mode==='WRITE'){
                    return <WriteInf inf={state.whatButton[btn].inf}/>;
                }
                else if (state.whatButton[btn].list) {
                    return <ShowList list={state.whatButton[btn].list}/>
                }
                else
                    return (null);
            }
            else
                return (null);
        }
        // !(state.whatButton[btn])?'':state.whatButton[btn].mode
        let elem = getElement();
        return (
            <main>
                <div className="divTop">
                    <h2>Введите имя пользователя:</h2>
                    <div className="divRequest">
                        <input type="text" id="nickname"/>
                        <button className="usualButtons" onClick={()=>foo()}>Отправить</button>
                    </div>
                </div>
                <div className="divBottom">
                    <Info user={user}/>
                </div>
                <div className="gridTabs">
                    <div className="tab">
                        <Tabs/>
                    </div>
                    <div className="mainPart">
                        {elem}
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
