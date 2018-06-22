import React, { Component } from 'react';
import './icon.css';

class Icon extends Component {
    render() {
        let name = this.props.icon;
        let className = "icon fa fa-"+name;
        return (
            <i className={className}></i>
        );
    }
}

export default Icon;