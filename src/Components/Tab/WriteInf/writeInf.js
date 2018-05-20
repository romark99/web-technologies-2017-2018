import React, { Component } from 'react';

class WriteInf extends Component {
    render() {
        let inf = this.props.inf;
        return (
            <div>
                <textarea>{inf}</textarea>
            </div>
        );
    }
}

export default WriteInf;