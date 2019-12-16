import React from 'react'
import Chart from "react-google-charts";
import Modal from 'react-responsive-modal'; //nice external package for creating modal windows to react apps
import styles from '../graph-style.css';
//File includes code for creating a stock performance graph as a modal window
export default class Graph extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            stocks: this.props.stocks,
            chartData: [],
            stockData: [],
            open: this.props.open,
        };
        this.drawStockValueChart = this.drawStockValueChart.bind(this)
        this.drawStockValueChart()
    }

    //Function for closing modal window
    closeModal = () => {
        this.setState({ open: false });
        this.props.onCloseModal()
    };
    //Function for fetching stock data from alphavantage, documentation can be found in alphavantage.io/documentation
    async getStockData(name){
        return await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + name + '&apikey=XDNRE3YNSC6MJXBQ')
            .then(response => response.json())
            .then(data => {
                if(Object.keys(data)[0] === 'Note' || Object.keys(data)[0] === 'Error Message'){
                    alert('Only 5 requests are allowed in one minute (by API)')
                }else {
                    let dataL = data['Time Series (Daily)']
                    let days = Object.keys(dataL).reverse()
                    let values = []
                    values = days.map(day => values.concat(dataL[day])[0])
                    return [values, days]
                }
            })
    } // Create a list from stocks wanted to be in the graph
    addToList(list, selectIdList) {
        for(var j = 0; j<selectIdList.length; j++){
            let select = document.getElementById(selectIdList[j])
            for(var i = 0; i<list.length; i++){
                var option = document.createElement("option")
                option.text = list[i]
                select.add(option)
            }
        }
    }
    //Draw a line chart from given stock values and times, time for x-axis, value for y-axis
    drawGraph(startDate, endDate){
        let sD = Object.assign([], this.state.stockData)
        let index1 = sD[0][1].indexOf(startDate)
        let index2 = sD[0][1].indexOf(endDate)
        if(!(index1 <= index2)){
            alert('Time invalid')
        } else {
            let stocks = [...this.state.stocks]
            let list = ['Time']
            let namelist = stocks.map(l => l.name)
            list =list.concat(namelist)
            let isUndefined = false
            let realList = []
            realList.push(list)
            try{
                for(var i = index1; i<index2+1; i++){
                    let dataPoints = []
                    dataPoints = [sD[0][1][i]]
                    for(var j = 0; j<sD.length; j++){
                        dataPoints = dataPoints.concat(parseFloat(Object.values(sD[j][0][i])[0]))
                    }
                    if(!Array.isArray(dataPoints)){
                        isUndefined = true
                        break;
                    }
                    realList.push(dataPoints)
                }
            }catch{
            }
            if(isUndefined === false){
                this.setState({
                    chartData: realList,
                });
            } else {
                alert('Only 5 request are allowed in one minute (by API)')
            }
        }
    }

    //Combination of above functions for creating the graph
    async drawStockValueChart() {
        let stocks = this.state.stocks
        let nameList = stocks.map(l => l.name)
        let stockData = []
        await Promise.all(nameList.map(async (name) =>
            this.getStockData(name))).then(result => {
            stockData = [...result];
            this.setState({stockData: Object.assign([], result)});
        })
        if(stockData.length !== 0){ //Default x-axis length is 3 weeks (15 days since stock market is closed during weekends)
            let startDate = stockData[0][1][stockData[0][1].length-16]
            let endDate = stockData[0][1][stockData[0][1].length-1]
            this.addToList(stockData[0][1], ['startDate', 'endDate'])
            this.drawGraph(startDate, endDate)
        }
    }

    render() {
        const options = {
            title: "Stock value",
            curveType: "function",
            legend: { position: "bottom" }
        };
        return(
            <Modal
                open={this.state.open}
                onClose={this.closeModal}
                center
                classNames={{
                    overlay: styles.customOverlay,
                    modal: styles.customModal,
                }}
            >

                <div>
                    <h2>Graph</h2>
                    Select by date
                    <select id='startDate'><option>Select starting date</option></select>
                    <select id='endDate'><option>Select ending date</option></select>
                    <button onClick={(e) => {this.drawGraph(document.getElementById('startDate').value, document.getElementById('endDate').value)}}>Search</button>
                    <Chart
                        chartType="LineChart"
                        width="800px"
                        height="550px"
                        loader={<div>Loading chart...</div>}
                        data={this.state.chartData}
                        options={options}
                    />
                </div>

            </Modal>
        )
    }
}