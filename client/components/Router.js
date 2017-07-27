
// Import external
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import queryString from 'query-string'

// Import internal
import Body from './Body'

export default class Main extends Component {

    constructor(props) {
        super(props)
    }

    render () {
        const { admin, accentColor } = this.props
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Body}/>
                    <Route path='/search' render={SearchWrapper}/>
                </Switch>
            </main>
        )
    }
}

const SearchWrapper = ({ match, location, history }) => (
    <Body key={match.params.q} location={queryString.parse(location.search)} />
)
