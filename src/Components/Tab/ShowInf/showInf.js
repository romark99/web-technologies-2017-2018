import React, { Component } from 'react';

class ShowInf extends Component {
    render() {
        let inf = this.props.inf;
        return (
            <div>
                <span>{inf}</span>
            </div>
        );
    }
}

export default ShowInf;