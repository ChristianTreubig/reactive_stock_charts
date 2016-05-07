var StockSymbol = React.createClass({displayName: 'StockSymbol',
  handleChange: function() {
    this.props.onUserInput(this.refs.stockSymbolInput.value);
  },

  render: function() {
    return (
      <form className="StockSymbol">
        <input 
          type="text" 
          placeholder="Enter a stock symbol..." 
          value={this.props.stockSymbol}
          ref="stockSymbolInput"
          onChange={this.handleChange}
        />
      </form>
    );
  }
});

var StockChart = React.createClass({displayName: 'StockChart',
  render: function() {
    // Zip the price and time arrays: http://stackoverflow.com/a/22015771
    return (
      <div className="StockChart">
        This is the stock chart component.
        <h2>{this.props.stockSymbol}</h2>
        <div>{this.props.stockPrice}</div>
        <div>{this.props.stockQuoteTime}</div>
        <div>{this.props.stockPriceArray}</div>
        <div>{this.props.stockQuoteTimeArray}</div>
      </div>
    );
  }
});

var ContainerMain = React.createClass({displayName: 'ContainerMain',
  getInitialState: function() {
    return {
      stockSymbol: "",
      stockPrice: "",
      stockQuoteTime: "",
      stockPriceArray: [],
      stockQuoteTimeArray: []
    };
  },
  
  handleUserInput: function(stockSymbol) {
    this.setState({
      stockSymbol: stockSymbol
    });
    
    this.getStockData(stockSymbol);
  },
  
  getStockData: function(stockSymbol) {
    var apiUrl = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=" + stockSymbol;

    $.ajax({
      url: apiUrl,
      dataType: "jsonp", // needs to be jsonp to avoid cross-origin error
      jsonp: "jsoncallback",
      success: function( data ) {
        if (data.Status == "SUCCESS") {
          this.setState({
            stockPrice: data.LastPrice,
            stockQuoteTime: data.Timestamp,
            stockPriceArray: this.state.stockPriceArray.concat([data.LastPrice]),
            stockQuoteTimeArray: this.state.stockQuoteTimeArray.concat([data.Timestamp]),
          });
        }
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="ContainerMain">
        This is the main container.
        <StockSymbol 
          stockSymbol={this.state.stockSymbol}
          onUserInput={this.handleUserInput}
        />
        <StockChart 
          stockSymbol={this.state.stockSymbol}
          stockPrice={this.state.stockPrice}
          stockQuoteTime={this.state.stockQuoteTime}
          stockPriceArray={this.state.stockPriceArray}
          stockQuoteTimeArray={this.state.stockQuoteTimeArray}
        />
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(ContainerMain, null),
  document.getElementById('content')
);