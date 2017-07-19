import React, { Component } from 'react'
import { Container, Divider } from 'semantic-ui-react' 

import Header from './Header'
import Footer from './Footer'
import Body from './Body'

export default class App extends Component {

    constructor (props) {
        super(props)

        this.state = {
            thing: undefined
        }
    }

    render() {
        return (
            <div>
                <Header pageName='Samordna Søk'/>
                <Container>
                    <Body />
                </Container>
                {/*<Footer />*/}
                <Divider hidden />
            </div>
        )
    }
}