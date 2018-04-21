import React, { Component } from 'react'
import { Button, Menu, Icon, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Header extends Component {

    constructor (props) {
        super(props)

        this.state = {
            pageName: 'Samordna Søk'
        }
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu inverted stackable>
                <Container>
                    <Menu.Item as={Link} to='/' active={true} color='green'>
                        <Icon disabled name='search' /> {this.props.pageName}
                    </Menu.Item>
                    {/*<Menu.Item
                        name='features'
                        active={activeItem === 'features'}
                        onClick={this.handleItemClick}
                        >
                        <a href="/stuff">Stuff</a>
                    </Menu.Item>
                    <Menu.Item
                        name='features'
                        active={activeItem === 'features'}
                        onClick={this.handleItemClick}
                        >
                        Info
                    </Menu.Item>

                    <Menu.Item
                        name='testimonials'
                        active={activeItem === 'testimonials'}
                        onClick={this.handleItemClick}
                        >
                        Other
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='sign-in'
                            active={activeItem === 'sign-in'}
                            onClick={this.handleItemClick}
                            >
                            <Button primary color='green'>
                                Sign in
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>*/}
                </Container>
            </Menu>
        )
    }
}

