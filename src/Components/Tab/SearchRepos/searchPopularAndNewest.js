import React, {Component} from 'react';
import '../../../App.css';
import './searchRepos.css';

class SearchPopularAndNewest extends Component {
    render() {
        return (
            <div className='searchReposTable'>
                <ul>
                    {this.props.list.slice(0,10)
                        .map(elem=>{ return {
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

export default SearchPopularAndNewest;
