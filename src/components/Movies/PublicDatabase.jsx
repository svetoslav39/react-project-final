import React, { Component } from 'react'
import remote from '../../api/requsetHandler'
import PublicMovie from './PublicMovie';

export default class PublicDatabaseMovies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
    }

   async componentDidMount() {
       await remote.getAllPublicMovies().then(res => {
            this.setState({ movies: res })
        })
    }

    render() {
        return (
            <section className='listMovies'>
                <h1>Database</h1>
                <div>
                    {this.state.movies.map(movie => {
                        return <PublicMovie key={movie._id} props={movie} />
                        
                    })}
                </div>
            </section>
        )
    }
}