import React from 'react'
import '../App.css'
import PopUp from './popup.js'
import Graph from './graph.js'


//class for stock including name, unit value, quantity, total value of stocks and checkbox for selecting
class Stock extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <tr>
                <td><p>{this.props.stock.name}</p></td>
                <td><p>{this.props.stock.unitValue}{this.props.currencySymbol}</p></td>
                <td><p>{this.props.stock.quantity}</p></td>
                <td><p>{this.props.stock.totalValue}{this.props.currencySymbol}</p></td>
                <td><input onChange={(e) => {this.props.setChecked(e, this.props.stock.id)}} id ={'check-' +this.props.stock.id} defaultChecked = {this.props.stock.checked} type="checkbox" ></input></td>
            </tr>
        )
    }
}
//class for stock portfolio
export default class Portfolio extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            stocks: this.props.stocks,
            totalValuOfStocks:this.props.total,
            currency: 'EUR',
            newName: '',
            name: this.props.name,
            id: this.props.id,
            isOpen: false,
            open:false,
            newStock: {name : '', unitValue : 0, quantity : 0, totalValue:0},
            chartData: [],
            stockData: [],
            currencySymbol: '€',
        };
        this.changePortfolioName =this.changePortfolioName.bind(this)
        this.savePortfolioName =this.savePortfolioName.bind(this)
        this.cancelPortfolioNameChange =this.cancelPortfolioNameChange.bind(this)
        this.saveStock = this.saveStock.bind(this)
        this.newStock = this.newStock.bind(this)
        this.removeSelectedStock = this.removeSelectedStock.bind(this)
        this.setChecked = this.setChecked.bind(this)
        this.onOpenModal = this.onOpenModal.bind(this)

    }

//Component mounting updates total value of certain stock
    componentDidMount() {
        let copyStocks = [...this.props.stocks]
        let newTotalValue = 0
        for(var i = 0; i<copyStocks.length; i++){
            let total = copyStocks[i].unitValue*copyStocks[i].quantity
            copyStocks[i].totalValue = total.toFixed(2)
            copyStocks[i].checked = false
            newTotalValue = total + newTotalValue
        }
        newTotalValue = newTotalValue.toFixed(2)
        this.setState({
            stocks: copyStocks,
            totalValuOfStocks: newTotalValue
        }, () => {
            this.props.updatePortfolio(this.state.id, this.state.stocks, this.state.name)
        });
    }

    //Toggles input and text
    hideTextShowInput(e){
        e.stopPropagation();
        let el = e.target
        let input = el.parentElement.firstChild
        if(el.hasAttribute("hidden")){
            el.removeAttribute("hidden")
        }else{
            el.setAttribute("hidden", true)}
        input.removeAttribute("hidden")
    }
    //Store new portfolio name during writing
    changePortfolioName(e){
        e.stopPropagation();
        this.setState({
            newName:e.target.value,
        })
    }
    //Save modified portfolio name
    savePortfolioName(e){
        e.stopPropagation();
        if(this.state.newName.trim().length>0){
            this.setState({
                name: this.state.newName.trim()
            }, () => {
                this.props.updatePortfolio(this.state.id, this.state.stocks, this.state.name)
            });
        } else {
            alert('Insert proper name')
        }
        let div = e.target.parentElement
        let text = div.nextSibling
        div.setAttribute("hidden", true)
        text.removeAttribute("hidden")
    }

    //Cancels name change
    cancelPortfolioNameChange(e){
        let div = e.target.parentElement
        let text = div.nextSibling
        div.setAttribute("hidden", true)
        text.removeAttribute("hidden")
    }

    //Toggles popup for inserting new stocks
    popUpModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    //Restores new stock to state on change
    newStock(e) {
        e.stopPropagation();
        const n = e.target.id.split('-')[0]
        let copy = {...this.state.newStock}
        copy[n] = e.target.value
        this.setState({
            newStock: copy,
        }, () => {
            this.props.updatePortfolio(this.state.id, this.state.stocks, this.state.name)
        });
    }
    //Count total value of stocks in portfolio
    countTotal=()=>{
        let stocks = [...this.state.stocks]
        let total = 0
        for(var i = 0; i<stocks.length; i++){
            total = parseFloat(stocks[i].totalValue) + total
        }
        total = total.toFixed(2)
        this.setState({
            totalValuOfStocks: total
        })
    }
    //Saves and adds stocks when 'save' is clicked
    saveStock = () => {
        if(this.state.newStock.name.length>0 && this.state.newStock.quantity > 0){
            let newstock =  {...this.state.newStock}
            let name = newstock.name.toUpperCase().trim()
            if(name.trim().length<1){
                alert('Insert proper name')
            } else if(newstock.quantity % 1 !== 0){
                alert("Quantity has to be a whole number")
            } else {
                fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+name+'&apikey=XDNRE3YNSC6MJXBQ')
                    .then(response => response.json())
                    .then(data => {
                        if(Object.keys(data)[0] === 'Note' || Object.keys(data)[0] === 'Error Message'){
                            alert(Object.values(data)[0])
                        }else {
                            let dataL = data['Time Series (Daily)']
                            let day = Object.keys(dataL)[0]
                            let value = parseFloat(Object.values(dataL[day])[0])
                            newstock.name = name
                            newstock.unitValue = value.toFixed(2)
                            let totalv = newstock.unitValue*newstock.quantity
                            newstock.totalValue = totalv.toFixed(2)
                            newstock.checked = false
                            let len = this.state.stocks.length + 1
                            newstock.id = 'stock' + this.state.id + len
                            var newStocksList = this.state.stocks.concat(newstock)
                            this.setState({
                                stocks: newStocksList,
                                isOpen: !this.state.isOpen,
                            }, () => {
                                this.props.updatePortfolio(this.state.id, this.state.stocks, this.state.name);
                                this.countTotal()
                                });
                            }
                        })
                }
            }
         else {
            alert('Invalid input')
        }
    }
    //Removes selected stocks
    removeSelectedStock (e) {
        let stocksCopy = [...this.state.stocks]
        let selected = stocksCopy.filter(stock => stock.checked === false)

        this.setState({
            stocks: selected}, () => {
            this.props.updatePortfolio(this.state.id, this.state.stocks, this.state.name)
            this.countTotal()
            var clist = document.getElementsByTagName("input");
            for (var i = 0; i < clist.length; ++i) { clist[i].checked = false; }

        });
    }
    //Sets checked tickbox to true in stock when clicking the checkbox
    setChecked (e, id) {
        e.stopPropagation()
        let stocksCpy = Object.assign([], this.state.stocks);
        let stock = stocksCpy.filter(s=> s.id === id)[0]
        stock.checked ? stock.checked = false : stock.checked = true
        this.setState({
            stocks: stocksCpy,
        }, () => {
            this.props.updatePortfolio(this.state.id, this.state.stocks, this.state.name);
        });

    }

    //Opens modal and draws graph
    onOpenModal = (e) => {
        e.stopPropagation();
        this.setState({ open: true });
    };
    //Closes modal
    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const renObjData = this.state.stocks.map((data, index) =>
            <Stock stock ={data} key={index} setChecked={this.setChecked} currencySymbol={this.state.currencySymbol}/>
        );
        const openModal = (this.state.open === true) ?
            <Graph stocks={this.state.stocks} onCloseModal={this.onCloseModal} open={this.state.open}></Graph> : ''


        return (
            <div className="card">
                <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
                <button onClick={(e) => {this.props.closePortfolio(e, this.state.id)}} className = 'close' ></button>
                <div><div hidden><input onChange={this.changePortfolioName} id={this.props.name}></input><button onClick={this.savePortfolioName}>Save</button><button onClick={this.cancelPortfolioNameChange}>Cancel</button></div><p onClick={this.hideTextShowInput}>{this.state.name}</p></div>

                <div className="datasheet-wrapper">
                    <table className="dataSheet">
                        <tbody>
                        <tr><th>Name</th><th>Unit value</th><th>Quantity</th><th>Total value</th><th>Select</th></tr>
                        {renObjData}
                        </tbody>

                    </table>
                </div>
                <div className="button-group">

                    <button onClick={this.popUpModal} className="button" id="desktop" >
                        Add stock
                    </button>

                    <button onClick={this.onOpenModal} className="button" id="desktop" >
                        Show performance graph
                    </button>
                    <button onClick={this.removeSelectedStock} className="button" id="desktop" >
                        Remove selected
                    </button>
                </div>
                <div>Total stock value of {this.state.name}: {this.state.totalValuOfStocks}{this.state.currencySymbol}</div>
                <PopUp show={this.state.isOpen}
                       onClose={this.popUpModal}>
                    <form onChange={this.newStock}>
                        Name: <input id={'name-'+this.state.id} type="text"></input>
                        Quantity:<input id={'quantity-'+this.state.id} type="number"></input>
                        <button onClick={this.saveStock}type="button">Save</button>
                    </form>
                </PopUp>
                {openModal}
            </div>


        )
    }
}