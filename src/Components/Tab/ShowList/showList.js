import React, { Component } from 'react';

class ShowList extends Component {
    render() {
        return (
            <ul>
                {this.props.list.map(elem=>{ return {login: elem.login, id: elem.id}}).map(elem=>{
                    return <li key={elem.id}>{elem.login}</li>
                })}
            </ul>
        );
    }
}

export default ShowList;