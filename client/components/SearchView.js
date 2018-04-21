import React, { Component } from 'react'
import { Input, Segment, Button, Icon, Divider, Grid, Select, Dimmer, Loader, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import queryString from 'query-string'

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

export default class SearchView extends Component {

    constructor (props) {
        super(props)

        console.log('[SearchView](constructor) Props: ' + JSON.stringify(props))

        const o = 0
        const t = 0
        if (props.query.o === 0 || props.query.o === 1) {
            const o = props.query.o
        }
        if (props.query.t === 0 || props.query.t === 1) {
            const t = props.query.t
        }

        this.state = {
            year: props.query.y || '2017',
            loading: true,
            filter: props.query.q || '',
            list: [],
            original_list: [],
            order: orders[o] || orders[0],
            valueType: types[t] || types[0],
            page: props.query.p || 1,
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

    componentWillMount () {
        console.log('[SearchView](componentWillMount)')
        this.apiSearch()
    }

    componentWillReceiveProps () {
        console.log('[SearchView](componentWillReceiveProps)')
        this.apiSearch()
    }

    formChange (e, { value }) {
        //console.log('[SearchView](formChange) Filter: ' + value)
        this.setState({
            filter: value
        })
    }

    toggleOrder () {
        console.log('[SearchView](toggleOrder) List Reverse')
        orders.reverse()
        this.setState({
            order: orders[0],
            list: this.state.original_list.slice().reverse().slice()
        })
    }

    filterList () {
        const { original_list, filter } = this.state
        console.log('[SearchView](filterList) Filter list, filter: ' + filter)
        if (filter.length) {
            this.setState({
                list: original_list.filter((item) => item.name.toLowerCase().indexOf(filter) > -1)
            })
        } else {
            console.log('[SearchView](filterList) No filter applied, returning to normal')
            this.setState({
                list: original_list
            })
        }
    }

    apiSearch () {
        const { filter, year } = this.state

        if (filter != '') {
            const query = '/api/' + year + '/search/' + filter 
            console.log('[SearchView](apiSearch) Getting: ' + query)
            axios
                .get(query)
                .then((res) => {
                    console.log('[SearchView](apiSearch) Got from year: ' + year + ', with length: ' + res.data.length)
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
            console.log('[SearchView](apiSearch) No filter, returning to original state')
            this.setState({
                page: 1
            }, () => {
                this.getYear()
            })
        }
    }

    getYear () {
        const { year, valueType, order, page } = this.state
        const query = '/api/' + year + '/' + valueType + '/' + order + '/' + page
        console.log('[SearchView](getYear) Getting: ' + query)
        axios
            .get(query)
            .then((res) => {
                console.log('[SearchView](getYear) Got from year: ' + year + ', with length: ' + res.data.length)
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
        const { page, year, valueType, order } = this.state


        this.setState({
            page: page + 1
        }, () => {
            const query = '/api/' + year + '/' + valueType + '/' + order + '/' + page
            console.log('[SearchView](loadMore) Getting: ' + query)
            axios
                .get(query)
                .then((res) => {
                    console.log('[SearchView](loadMore) Got from year: ' + year + ', with length: ' + res.data.length)
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

    setYear (event, { value }) {
        console.log('[SearchView](setYear) Year: ' + value)
        this.setState({
            year: value,
            page: 1
        })
    }

    firstToggle (e, {value}) {
        if (this.state.valueType == types[1]) {
            console.log('[SearchView](firstToggle) toggle first_time')
            this.toggleOrder()
        } else {
            console.log('[SearchView](firstToggle) set first_time')
            this.setState({
                valueType: types[1]
            }, () => {
                this.getYear()
            })
        }
    }

    ordinaryToggle (e, {value}) {
        if (this.state.valueType == types[0]) {
            console.log('[SearchView](ordinaryToggle) toggle ordinary')
            this.toggleOrder()
        } else {
            console.log('[SearchView](ordinaryToggle) set ordinary')
            this.setState({
                valueType: types[0]
            }, () => {
                this.getYear()
            })
        }
    }

    render() {
        const { filter, year, list, loading, loadable } = this.state
        const query = '/search/' + filter
        const searchString = '/search?' + queryString.stringify({
            q: filter,
            y: year,
            o: 0,
            t: 0
        })

        return (
            <div>
                <Input placeholder='Søk på studienavn...' onChange={this.formChange} size='large' fluid action value={filter}>
                    <input />
                    <Select compact options={YEARS} defaultValue={year} onChange={this.setYear} />
                    <Button as={Link} to={searchString} floated='right' size='large' color='green'>
                        <Icon name='search' />
                    </Button>
                </Input>
                <Divider hidden />
                <Grid verticalAlign='middle'>
                    <TableHeadLarge firstToggle={this.firstToggle} ordinaryToggle={this.ordinaryToggle}/>
                    <TableHeadSmall firstToggle={this.firstToggle} ordinaryToggle={this.ordinaryToggle}/>
                    <TableHeadSmall2 firstToggle={this.firstToggle} ordinaryToggle={this.ordinaryToggle}/>
                </Grid>
                { list ? 
                    list.map((program) => { return <ProgramWrapper key={program.code + program.year} program={program} />}) : undefined
                }
                { !list.length || loading ? <Loader active/> : undefined }
                { loadable ?
                    <Container textAlign='center'>
                        <Divider hidden />
                        <Button onClick={this.loadMore} size='large' color='green'>Load More</Button>
                    </Container> : undefined
                }
            </div>
        )
    }
}
