import React, { Component } from 'react';

class WriteInf extends Component {
    render() {
        let inf = this.props.inf;
        return (
            <div>
                <textarea defaultValue={inf} id='textArea'/>
            </div>
        );
    }
}

export default WriteInf;