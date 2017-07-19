
import React, { Component } from 'react'
import { Divider, Button, Icon, Grid, Header, Loader } from 'semantic-ui-react'

export default class ProgramHistorySmall extends Component {

    constructor (props) {
        super(props)

        this.state = {
            thing: undefined
        }
    }

    render() {
        return (
            <Grid.Row verticalAlign='middle' only='mobile tablet'>
                <Grid.Column width={2}>
                    <Header as='h4'>
                        { this.props.program.year }
                    </Header>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Button floated='left' circular size='medium' color='green'>{ this.props.program.ordinary }</Button>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Button floated='left' disabled circular size='medium'>{ this.props.program.ordinary_wait }</Button>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Button floated='left' circular size='medium' color='green'>{ this.props.program.first_time }</Button>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Button floated='left' disabled circular size='medium'>{ this.props.program.first_time_wait } </Button>
                </Grid.Column>
                <Grid.Column width={1}>
                </Grid.Column>
            </Grid.Row>
        )
    }
}