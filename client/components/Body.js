import React, { Component } from 'react'
import { Input, Segment, Button, Icon, Divider, Grid, Select, Dimmer, Loader, Container } from 'semantic-ui-react'
import axios from 'axios'

import ProgramWrapper from './ProgramWrapper'
import TableHeadLarge from './TableHeadLarge'
import TableHeadSmall from './TableHeadSmall'
import TableHeadSmall2 from './TableHeadSmall2'

const YEARS = [
    { key: '2011', text: '2011', value: '2011' },
    { key: '2012', text: '2012', value: '2012' },
    { key: '2013', text: '2013', value: '2013' },
    { key: '2014', text: '2014', value: '2014' },
    { key: '2015', text: '2015', value: '2015' },
    { key: '2016', text: '2016', value: '2016' },
    { key: '2017', text: '2017', value: '2017' }
]

let orders = ['desc', 'asc']
let types = ['ordinary', 'first_time']

export default class Body extends Component {

    constructor (props) {
        super(props)

        this.state = {
            year: '2017',
            loading: true,
            filter: '',
            list: [],
            original_list: [],
            order: orders[0],
            valueType: types[0],
            page: 1,
            loadable: true,
        }

        this.getYear =  this.getYear.bind(this)
        this.formChange = this.formChange.bind(this)
        this.setYear = this.setYear.bind(this)
        this.filterList = this.filterList.bind(this)
        this.toggleOrder = this.toggleOrder.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.apiSearch = this.apiSearch.bind(this)
        this.firstToggle = this.firstToggle.bind(this)
        this.ordinaryToggle = this.ordinaryToggle.bind(this)
    }

    formChange (e, {value}) {
        //console.log(value)
        this.setState({
            filter: value
        })
    }

    toggleOrder () {
        orders.reverse()
        this.setState({
            order: orders[0],
            list: this.state.original_list.slice().reverse().slice()
        })
    }

    filterList () {
        if (this.state.filter.length) {
            this.setState({
                list: this.state.original_list.filter((item) => item.name.toLowerCase().indexOf(this.state.filter) > -1)
            })
        } else {
            this.setState({
                list: this.state.original_list
            })
        }
    }

    apiSearch () {
        if (this.state.filter != '') {
            const query = '/api/' + this.state.year + '/search/' + this.state.filter 
            console.log(query)
            axios
                .get(query)
                .then((res) => {
                    console.log('Got ' + this.state.year + ', length: ' + res.data.length)
                    this.setState({
                        list: res.data,
                        original_list: res.data,
                        loading: false,
                        page: 1,
                        loadable: false
                    })
                })
                .catch((err) => {
                    console.error(err)
                })
        } else {
            this.setState({
                page: 1
            }, () => {
                this.getYear()
            })
        }
    }

    componentWillMount () {
        this.getYear()
    }

    getYear () {
        const query = '/api/' + this.state.year + '/' + this.state.valueType + '/' + this.state.order + '/' + this.state.page
        console.log(query)
        axios
            .get(query)
            .then((res) => {
                console.log('Got ' + this.state.year + ', length: ' + res.data.length)
                this.setState({
                    list: res.data,
                    original_list: res.data,
                    loading: false,
                    loadable: true
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }
    
    loadMore () {
        this.setState({
            page: this.state.page + 1
        }, () => {
            const query = '/api/' + this.state.year + '/' + this.state.valueType + '/' + this.state.order + '/' + this.state.page
            console.log(query)
            axios
                .get(query)
                .then((res) => {
                    console.log('Got ' + this.state.year + ', length: ' + res.data.length)
                    this.setState({
                        list: this.state.list.concat(res.data),
                        original_list: this.state.original_list.concat(res.data)
                    })
                })
                .catch((err) => {
                    console.error(err)
                })
        })
    }

    setYear (event, selected) {
        console.log(selected)
        this.setState({
            year: selected.value,
            loading: true,
            page: 1
        }, () => {
            this.getYear()
        })
    }

    firstToggle (e, {value}) {
        if (this.state.valueType == types[1]) {
            console.log('toggle first_time')
            this.toggleOrder()
        } else {
            console.log('set first_time')
            this.setState({
                valueType: types[1]
            }, () => {
                this.getYear()
            })
        }
    }

    ordinaryToggle (e, {value}) {
        if (this.state.valueType == types[0]) {
            console.log('toggle ordinary')
            this.toggleOrder()
        } else {
            console.log('set ordinary')
            this.setState({
                valueType: types[0]
            }, () => {
                this.getYear()
            })
        }
    }

    render() {
        return (
            <div>
                <Input
                    placeholder='Søk på studienavn...'
                    onChange={this.formChange}
                    size='large'
                    fluid
                    action
                >
                    <input />
                    <Select compact options={YEARS} defaultValue={this.state.year} onChange={this.setYear} />
                    <Button floated='right' onClick={this.apiSearch} size='large' color='green'>
                        <Icon name='search' />
                    </Button>
                </Input>
                <Divider hidden />
                <Grid verticalAlign='middle'>
                    <TableHeadLarge firstToggle={this.firstToggle} ordinaryToggle={this.ordinaryToggle}/>
                    <TableHeadSmall firstToggle={this.firstToggle} ordinaryToggle={this.ordinaryToggle}/>
                    <TableHeadSmall2 firstToggle={this.firstToggle} ordinaryToggle={this.ordinaryToggle}/>
                </Grid>
                { this.state.list ? 
                    this.state.list.map((program) => { return <ProgramWrapper key={program.code + program.year} program={program} />}) : undefined
                }
                { this.state.loading ?
                    <Loader active/> : undefined
                }
                { this.state.loadable ?
                    <Container textAlign='center'>
                        <Divider hidden />
                        <Button onClick={this.loadMore} size='large' color='green'>Load More</Button>
                    </Container> : undefined
                }
            </div>
        )
    }
}