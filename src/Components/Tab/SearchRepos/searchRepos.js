import React, {Component} from 'react';
import store from '../../../index';
import '../../../App.css';
import './searchRepos.css';

class SearchRepos extends Component {
    render() {
        //Action creator
        const fetchSearchRepos = () => {
            return { type: 'FETCHED_SEARCH_REPOS' };
        };

        return (
            <div className="searchReposTable">
                <div className="searchReposDivRequest" id="reposRequest">
                    <h3>Введите репозиторий:</h3>
                    <div>
                        <input type="text" id="repo"/>
                        <button className="usualButtons"
                                onClick={
                                    ()=>store.dispatch(fetchSearchRepos())
                                }>Отправить</button>
                    </div>
                </div>
                <div className="searchReposDivRequest" id="reposFilter">
                    <div>
                        <input type="checkbox" id="filterJavaScript"/>
                        <label htmlFor="filterJavaScript">
                            Найти репозитории на JavaScript
                        </label>
                    </div>
                    <div>
                        <input type="checkbox" id="filterWithoutStars"/>
                        <label htmlFor="filterWithoutStars">
                            Найти репозитории без звезд
                        </label>
                    </div>
                </div>
                <ul>
                {this.props.list.map(elem=>{ return {
                    full_name: elem.full_name,
                    url: elem.html_url,
                    description: elem.description,
                    id: elem.id }; })
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
