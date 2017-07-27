
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
                <Grid columns={1} relaxed textAlign='center'>
                    <Grid.Column>
                        <Segment basic inverted>
                            <p>
                                Denne siden ble utviklet i hovedsak for å gjøre det enklere å søke opp og sammenligne karakterstatistikk.
                                Siden er i kontinuerlig utvikling av Ole Anders Stokker, og koden er tilgjengelig helt åpent på <Icon name='github'><a href='https://github.com/oleast'> Github</a></Icon>
                            </p>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>
        </Segment>
    )
  }
}
