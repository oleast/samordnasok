
import React, { Component } from 'react'
import { Divider, Button, Icon, Grid, Header, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class ProgramSmall extends Component {

    constructor (props) {
        super(props)

        this.state = {
            thing: undefined
        }
    }

    render() {
        const { program } = this.props
        const programLink = '/program?c=' + program.code

        return (
            <Grid.Row columns={1} verticalAlign='middle' only='mobile tablet'>
                <Grid.Column width={3}>
                    <Header as='h3'>
                        { program.institution }
                    </Header>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Header as='h3'>
                        <Link to={programLink}>{ program.code }</Link>
                    </Header>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Header as='h3'>
                        { program.name }
                    </Header>
                </Grid.Column>
            </Grid.Row>
        )
    }
}