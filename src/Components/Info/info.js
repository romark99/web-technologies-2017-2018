import React, {Component} from 'react';
import './info.css';
import PicText from "../PicText/picText";

class Info extends Component {
    render() {
        let user = this.props.user;
        return (
            <div id="main"><img id="picture" alt="" src={user.avatar_url}/>
                <div>
                    <div>
                        <h1 id="name">
                            {user.name}
                        </h1>
                        <h3 id="p1">
                            {user.login}
                        </h3>
                    </div>
                    <div><p id="bio">{user.bio}</p>
                    </div>
                    <hr/>
                    <ul className="list">
                        <PicText icon="users" text={user.company}/>
                        <PicText icon="map-marker-alt" text={user.location}/>
                        <PicText icon="envelope" link={user.blog}/>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Info;