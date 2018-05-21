import React, { Component } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

class ShowRepos extends Component {
    render() {
        return (
            <Router>
                <ul>
                    {this.props.list.map(elem=>{return {name: elem.name, id: elem.id}}).map(elem=>{
                        return (
                            <li key={elem.id}>
                                <Link to={`/repos/${elem.id}`}>
                                    {elem.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </Router>
        );
    }
}

export default ShowRepos;