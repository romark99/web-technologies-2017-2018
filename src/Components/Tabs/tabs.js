import React, {Component, Fragment} from 'react';
import store from '../../index'
import {getStateFromStore} from "../../index";
import './tabs.css';

class Tabs extends Component {
    render() {
        let state=getStateFromStore();
        console.log(state);
        return (
            <Fragment>
                <button className={'tabButs '+(state.whatButton.shown==='MAIN'?'gray':'inherit')} onClick={()=>store.dispatch({type: 'MAIN'})}>Основное</button>
                <button className={'tabButs '+(state.whatButton.shown==='EDUCATION'?'gray':'inherit')} onClick={()=>store.dispatch({type: 'EDUCATION'})}>Образование</button>
                <button className={'tabButs '+(state.whatButton.shown==='CONTACTS'?'gray':'inherit')} onClick={()=>store.dispatch({type: 'CONTACTS'})}>Контакты</button>
                <button className={'tabButs '+(state.whatButton.shown==='ADDITIONALLY'?'gray':'inherit')} onClick={()=>store.dispatch({type: 'ADDITIONALLY'})}>Дополнительно</button>
                <button className={'tabButs '+(state.whatButton.shown==='FOLLOWERS'?'gray':'inherit')} onClick={()=>store.dispatch({type: 'FOLLOWERS'})}>Последователи</button>
                <button className={'tabButs '+(state.whatButton.shown==='REPOS'?'gray':'inherit')} onClick={()=>store.dispatch({type: 'REPOS'})}>Репозитории</button>
                <button className={'tabButs inherit'+((state.whatButton.shown==='MAIN'||state.whatButton.shown==='EDUCATION'||state.whatButton.shown==='CONTACTS')?'':' hidden')} id="editButton">Редактировать</button>
            </Fragment>
        );
    }
}

export default Tabs;