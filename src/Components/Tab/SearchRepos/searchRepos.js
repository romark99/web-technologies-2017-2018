import React, { Component } from 'react';
import store from "../../../index";

class SearchRepos extends Component {
    render() {
        //Action creator
        const fetchSearchRepos = () => {
            return { type: 'FETCHED_SEARCH_REPOS' }
        };

        return (
            <div>
                <div>
                    <input type="text" id="repo"/>
                    <button className="usualButtons" onClick={()=>store.dispatch(fetchSearchRepos())}>Отправить</button>
                </div>
                <ul>
                {this.props.list.map(elem=>{ return {
                    full_name: elem.full_name,
                    url: elem.html_url,
                    description: elem.description,
                    id: elem.id }})
                    .map(elem=>{
                    return (
                        <li key={elem.id}>
                            <a href={elem.url}>
                                {elem.full_name}
                            </a>
                            <p>
                                {elem.description}
                            </p>
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }
}

export default SearchRepos;