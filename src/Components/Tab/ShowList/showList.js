import React, { Component } from 'react';

class ShowList extends Component {
    render() {
        return (
            <ul>
                {this.props.list.map(elem=>elem.login).map(login=>{
                    return <li>{login}</li>
                })}
            </ul>
        );
    }
}

export default ShowList;