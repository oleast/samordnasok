import React, { Component } from 'react'
import { Divider, Button, Icon, Grid, Header, Loader } from 'semantic-ui-react'

export default class TableHeadSmall2 extends Component {

    constructor (props) {
        super(props)

        this.state = {
            thing: undefined
        }
    }

    render() {
        return (
            <Grid.Row columns={5} verticalAlign='middle' only='mobile tablet'>
                <Grid.Column width={3}>
                    <Header as='h3'>
                        Ordinær
                    </Header>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Header as='h3'>
                        Venteliste
                    </Header>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Header as='h3'>
                        Førstegang
                    </Header>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Header as='h3'>
                        Venteliste
                    </Header>
                </Grid.Column>
            </Grid.Row>
        )
    }
}