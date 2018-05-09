import React, { Component } from 'react';

class Icon extends Component {
    render() {
        let name = this.props.icon;
        let className = "fas fa-"+name;
        return (
            <i className={className}></i>
        );
    }
}

export default Icon;