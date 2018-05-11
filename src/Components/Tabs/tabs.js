import React, {Component, Fragment} from 'react';
import './tabs.css';

class Tabs extends Component {
    render() {
        return (
            <Fragment>
                <button>Основное</button>
                <button>Образование</button>
                <button>Контакты</button>
                <button id="editButton">Edit</button>
            </Fragment>
        );
    }
}

export default Tabs;