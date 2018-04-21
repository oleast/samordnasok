
import React, { Component } from 'react'
import { Divider, Button, Icon, Grid, Header, Loader } from 'semantic-ui-react'

export default class TableHeadLarge extends Component {

    constructor (props) {
        super(props)

        this.state = {
            thing: undefined
        }
    }

    render() {
        return (
            <Grid.Row verticalAlign='middle' only='computer'>
                <Grid.Column width={2}>
                    <Header as='h3'>
                        Institusjon
                    </Header>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Header as='h3'>
                        Studiekode
                    </Header>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Header as='h3'>
                        Studienavn
                    </Header>
                </Grid.Column>
                <Grid.Column width={1} floated='right' onClick={this.props.ordinaryToggle}>
                     <Header as='h3'>
                        Ordinær
                    </Header>
                </Grid.Column>
                <Grid.Column width={2} floated='right'>
                     <Header as='h3'>
                        Venteliste
                    </Header>
                </Grid.Column>
                <Grid.Column width={1} floated='left' onClick={this.props.firstToggle}>
                     <Header as='h3'>
                        Første
                    </Header>
                </Grid.Column>
                <Grid.Column width={2}>
                     <Header as='h3'>
                        Venteliste
                    </Header>
                </Grid.Column>
                <Grid.Column width={1} floated='left'>
                     <Header as='h3'>
                        Historie
                    </Header>
                </Grid.Column>
            </Grid.Row>
        )
    }
}