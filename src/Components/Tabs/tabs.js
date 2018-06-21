import React, {Component, Fragment} from 'react';
import store from '../../index'
import {getStateFromStore} from "../../index";
import './tabs.css';

class Tabs extends Component {
    render() {
        let state=getStateFromStore();
        let btn = state.whatButton.shown;

        //Action creator
        const fetchAddit = () => {
            return { type: 'FETCHED_ADDIT' }
        };

        const fetchFollowers = () => {
            return { type: 'FETCHED_FOLLOWERS' }
        };

        const fetchRepos = () => {
            return { type: 'FETCHED_REPOS' }
        };

        console.log(state);
        function editOrSave(mode) {
            if (mode==='READ') {
                store.dispatch({type: 'WRITING'});
            }
            else if (mode==='WRITE') {
                store.dispatch({type: 'SAVING', text: document.getElementById('textArea').value});
            }
        }
        return (
            <Fragment>
                <button className={'tabButs '+(state.whatButton.shown==='MAIN'?'gray':'inherit')} onClick={()=>store.dispatch({type: 'MAIN'})}>Основное</button>
                <button className={'tabButs '+(state.whatButton.shown==='EDUCATION'?'gray':'inherit')} onClick={()=>store.dispatch({type: 'EDUCATION'})}>Образование</button>
                <button className={'tabButs '+(state.whatButton.shown==='CONTACTS'?'gray':'inherit')} onClick={()=>store.dispatch({type: 'CONTACTS'})}>Контакты</button>
                <button className={'tabButs '+(state.whatButton.shown==='ADDITIONALLY'?'gray':'inherit')} onClick={()=>store.dispatch(fetchAddit())}>Дополнительно</button>
                <button className={'tabButs '+(state.whatButton.shown==='FOLLOWERS'?'gray':'inherit')} onClick={()=>store.dispatch(fetchFollowers())}>Последователи</button>
                <button className={'tabButs '+(state.whatButton.shown==='REPOS'?'gray':'inherit')} onClick={()=>store.dispatch(fetchRepos())}>Репозитории</button>
                <button className={'tabButs inherit'+((state.whatButton.shown==='MAIN'||state.whatButton.shown==='EDUCATION'||state.whatButton.shown==='CONTACTS')?'':' hidden')}
                        id="editButton"
                        onClick={()=>editOrSave(state.whatButton[btn].mode)}>{!(state.whatButton[btn])||state.whatButton[btn].mode==='READ'?'Редактировать':'Сохранить'}</button>
            </Fragment>
        );
    }
}

export default Tabs;