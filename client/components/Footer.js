
import React, { Component } from 'react'
import { Button, Menu, Icon, Container, Grid, Segment, Divider } from 'semantic-ui-react'

export default class Header extends Component {

    constructor (props) {
        super(props)

        this.state = {
            pageName: 'Hub'
        }
    }

    render() {
    const { activeItem } = this.state

    return (
        <Segment basic inverted>
            <Container>
                <Grid columns={3} relaxed>
                    <Grid.Column>
                        <Segment basic inverted>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment basic inverted>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment basic inverted>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>
        </Segment>
    )
  }
}
