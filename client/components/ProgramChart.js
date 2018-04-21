
import React, { Component } from 'react'
import { Header, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import queryString from 'query-string'
import { Line } from 'react-chartjs-2'

export default class ProgramChart extends Component {

    constructor (props) {
        super(props)
        //console.log('[ProgramChart](constructor) Props: ' + JSON.stringify(props))
        this.state = {
            loading: true,
            code: props.code || '',
            programList: [],
            loadable: true
        }

        this.getProgram =  this.getProgram.bind(this)
    }

    componentWillMount () {
        console.log('[ProgramChart](componentWillMount)')
        this.getProgram()
    }

    componentWillReceiveProps () {
        console.log('[ProgramChart](componentWillReceiveProps)')
        this.getProgram()
    }

    getProgram () {
        const { code } = this.state
        const query = '/api/code/' + code
        console.log('[ProgramChart](getProgram) Getting: ' + query)
        axios.get(query).then((res) => {
            console.log('[ProgramChart](getProgram) Got all code: ' + code + ', with length: ' + res.data.length)
            this.setState({
                programList: res.data
            })
        }).catch((err) => {
            console.error(err)
        })
    }

    render() {
        const { code, programList } = this.state

        if (programList.length) {
            const searchString = '/program?' + queryString.stringify({ c: code })
            const sortedData = programList.sort((p1, p2) => p1.year - p2.year)
            const yearsData = sortedData.map((p) => p.year)
            const ordinaryData = sortedData.map((p) => p.ordinary_sortable).map((p) => p || null)
            const firstData = sortedData.map((p) => p.first_time_sortable).map((p) => p || null)
            const latest = sortedData[sortedData.length-1]
            const data = {
                labels: yearsData,
                datasets: [
                    { 
                        data: ordinaryData,
                        label: "Ordinærkvote",
                        borderColor: "green",
                        fill: false
                    }, { 
                        data: firstData,
                        label: "Førstegangskvote",
                        borderColor: "blue",
                        fill: false
                    }
                ]
            }
            return (
                <div id={'chart' + code}>
                    <Divider hidden />
                    <Header>{ code + ' | ' + latest.institution + ' | ' + latest.name }</Header>
                    <Line data={data} options={{ spanGaps: true }} width={600} height={250} />
                </div>
            )
        } else {
            return (<div id={'chart-' + code}></div>)
        }
    }
}
