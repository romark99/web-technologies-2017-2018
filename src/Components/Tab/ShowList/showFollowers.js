import React, { Component } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

class ShowFollowers extends Component {
    render() {
        return (
            <Router>
                <ul>
                    {this.props.list.map(elem=>{return {login: elem.login, id: elem.id}}).map(elem=>{
                        return (
                            <li key={elem.id}>
                                <Link to={`/followers/${elem.id}`}>
                                    {elem.login}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </Router>
        );
    }
}

export default ShowFollowers;