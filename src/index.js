import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './App.css';
import Portfolio from './components/stockportfolio.js'
//File includes code for displaying stock-included portfolios on page and modifying them
class App extends React.Component {
    constructor() {
        super();
        let portfolio = localStorage.getItem('portfolio')
        if(portfolio !== null){
            portfolio = JSON.parse(portfolio)
        } else {
            portfolio = []
        }
        this.state = {
            portfolio: portfolio,
        }
        this.addPortfolio = this.addPortfolio.bind(this);
        this.closePortfolio = this.closePortfolio.bind(this)
        this.updatePortfolio = this.updatePortfolio.bind(this)
    }

    //Set result to state and localStorage
    onSetResult = (result, key) => {
        localStorage.setItem(key, JSON.stringify(result));
        this.setState({ portfolio: result });
    }
    //Update portfolio when stocks are updated
    updatePortfolio(portfolioId, stocks, name){
        let portfolioCopy =  Object.assign([],  this.state.portfolio);
        for(var i = 0; i<portfolioCopy.length; i++){
            if(portfolioCopy[i].id === portfolioId){
                portfolioCopy[i].name = name
                portfolioCopy[i].stocks = stocks
            }
        }
        this.setState({portfolio: portfolioCopy})
        this.onSetResult(portfolioCopy, 'portfolio')
    }
    //Set id to portfolio and count max id to control the total amount of portfolios
    setId(){
        let portfolioCopy = [...this.state.portfolio]
        let list =[];
        list = list.concat(0)
        let idList = portfolioCopy.map(p => p.id)
        idList.map(id => list = list.concat(id))
        let max = (Math.max(...list)) + 1
        return max
    }
    //Adds new empty portfolio
    addPortfolio (e) {
        e.stopPropagation();
        let len = this.state.portfolio.length +1
        let id = this.setId()
        if(len<=6){
            let newPortfolio = { name: 'Portfolio ' + len, id: id, stocks: []}
            this.setState({
                portfolio: this.state.portfolio.concat([newPortfolio])
            });
            this.onSetResult(this.state.portfolio.concat([newPortfolio]), 'portfolio')
        } else {
            alert('Too many portfolios. Max amount of portfolios is 6.')
        }
    }
    //Closes and deletes portfolio
    closePortfolio(e, id){
        e.stopPropagation();
        let portfolios = [...this.state.portfolio]
        let selected = portfolios.filter(portfolio => portfolio.id !==  id)
        this.setState({portfolio: selected});
        this.onSetResult(selected, 'portfolio')
    }

    render(){
        //Adds portfolios from state to the page
        const renObjData = this.state.portfolio.map( (data,index) =>
            <Portfolio name={data.name} total={data.totalValue} updatePortfolio={this.updatePortfolio} stocks={data.stocks} closePortfolio={this.closePortfolio} key = {data.id} id={data.id} />
        );
        return (
            <div className="App">
                <header >

                </header>
                <body>
                <div className="addPortfolio"> <button onClick={this.addPortfolio}>Add new portfolio</button></div>
                <div className="row">
                    {renObjData}

                </div>
                </body>

            </div>

        )
    }
}



ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
