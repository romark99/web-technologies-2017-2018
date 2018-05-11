import React, {Component} from 'react';
import './info.css';
import PicText from "../PicText/picText";
import {func} from "../../Request/fetch";

class Info extends Component {
    render() {
        let name = "romark99";
        let userJSON = func(name);
        return (
            <div id="main"><img id="picture" src="https://avatars1.githubusercontent.com/u/810438?s=460&v=4"/>
                <div>
                    <div>
                        <h1 id="name">
                            Dan Abramov
                        </h1>
                        <h3 id="p1">
                            gaearon
                        </h3>
                    </div>
                    <div><p id="bio">Working on @reactjs. Co-author of Redux and Create React App. Building tools for
                        humans.</p>
                    </div>
                    <hr/>
                    <ul className="list">
                        <PicText icon="users" text="@facebook"/>
                        <PicText icon="map-marker-alt" text="London, UK"/>
                        <PicText icon="envelope" link="http://twitter.com/dan_abramov"/>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Info;