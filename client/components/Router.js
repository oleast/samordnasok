
// Import external
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import queryString from 'query-string'
import { Header, Container, Divider } from 'semantic-ui-react'

// Import internal
import SearchView from './SearchView'
import ProgramChart from './ProgramChart'

export default class Main extends Component {

    constructor(props) {
        super(props)
    }

    render () {
        const { admin, accentColor } = this.props
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/search' render={SearchViewWrapper}/>
                    <Route path='/program' render={ProgramChartWrapper}/>
                </Switch>
            </main>
        )
    }
}

const Home = (props) => (
    <div id='home'>
        <Divider hidden />
        <Container text>
            <Header as='h2'>Velkommen til Samordna Søk! </Header>
            <p>
                Samordna Søk er en nettside som lar deg søke gjennom karakterstatistikk for alle studieretningene som har opptak gjennom Samorda Opptak.
                Her kan du søke opp på navnet på studieretninger, og se historie for både ordinærkvote og førstegangskvote.
            </p>
        </Container>
        <Divider hidden />
        <SearchView key='home' query={{}} />
    </div>
)

const SearchViewWrapper = ({ match, location, history }) => (
    <SearchView key={match.params.q} query={queryString.parse(location.search)} />
)

const ProgramChartWrapper = ({ match, location, history }) => (
    <ProgramChart key={match.params.c} code={queryString.parse(location.search).c} />
)
