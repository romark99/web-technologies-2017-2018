import React, { Component } from 'react';
import Icon from '../Icon/icon.js'
import './picText.css';

class PicText extends Component {
    render() {
        let icon = this.props.icon;
        let text = this.props.text;
        let ref = this.props.link;
        text = text?text:ref;
        let comp = ref?<a href={ref}>{text}</a>:text;
        return (
            <li>
                <Icon icon={icon}/>
                <span className="text">{comp}</span>
            </li>
        );
    }
}

export default PicText;