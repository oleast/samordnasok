
import React, { Component } from 'react'
import { Divider, Button, Icon, Grid, Header, Loader } from 'semantic-ui-react'

export default class ProgramSmall extends Component {

    constructor (props) {
        super(props)

        this.state = {
            thing: undefined
        }
    }

    render() {
        return (
            <Grid.Row columns={1} verticalAlign='middle' only='mobile tablet'>
                <Grid.Column width={3}>
                    <Header as='h3'>
                        { this.props.program.institution }
                    </Header>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Header as='h3'>
                        { this.props.program.code }
                    </Header>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Header as='h3'>
                        { this.props.program.name }
                    </Header>
                </Grid.Column>
            </Grid.Row>
        )
    }
}