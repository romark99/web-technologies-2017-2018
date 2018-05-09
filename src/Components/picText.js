import React, { Component } from 'react';
import Icon from './icon.js'

class PicText extends Component {
    render() {
        let icon = this.props.icon;
        let text = this.props.text;
        let ref = this.props.link;
        let comp = ref?<a href={ref}>{text}</a>:text;
        return (
            <div>
                <span><Icon icon={icon}/>{comp}</span>
            </div>
        );
    }
}

export default PicText;