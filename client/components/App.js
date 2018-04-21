import React, { Component } from 'react'
import { Container, Divider } from 'semantic-ui-react' 

import Header from './Header'
import Footer from './Footer'
import Router from './Router'

const style = {
	content: {
		flex: '1'
	},
	site: {
		display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
    }
}

export default class App extends Component {

    constructor (props) {
        super(props)

        this.state = {
            thing: undefined
        }
    }

    render() {
        return (
            <div id='main' style={style.site}>
                <div style={style.content}>
                    <Header pageName='Samordna Søk'/>
                    <Container>
                        <Router />
                    </Container>
                    <Divider hidden />
                </div>
                <Footer />
            </div>
        )
    }
}
