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
    return (
      <div className="StockChart">
        This is the stock chart component.
        <h2>{this.props.stockSymbol}</h2>
        <div>{this.props.stockPrice}</div>
        <div>{this.props.stockQuoteTime}</div>
      </div>
    );
  }
});

var ContainerMain = React.createClass({displayName: 'ContainerMain',
  getInitialState: function() {
    return {
      stockSymbol: "",
      stockPrice: "",
      stockQuoteTime: ""
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
            stockQuoteTime: data.Timestamp
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
        />
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(ContainerMain, null),
  document.getElementById('content')
);