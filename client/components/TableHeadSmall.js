
import React, { Component } from 'react'
import { Divider, Button, Icon, Grid, Header, Loader } from 'semantic-ui-react'

export default class TableHeadSmall extends Component {

    constructor (props) {
        super(props)

        this.state = {
            thing: undefined
        }
    }

    render() {
        return (
            <Grid.Row columns={1} verticalAlign='middle' only='mobile tablet'>
                <Grid.Column width={5}>
                    <Header as='h3'>
                        Institusjon
                    </Header>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Header as='h3'>
                        Studiekode
                    </Header>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Header as='h3'>
                        Studienavn
                    </Header>
                </Grid.Column>
            </Grid.Row>
        )
    }
}