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
  getStockData: function(stockSymbol) {
    var apiUrl = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + this.props.stockSymbol;
    
    // This doesn't work because the Markit API isn't actually returning JSONP (it's returning normal JSON)
    // may need to use another API
    $.ajax({
      url: apiUrl,
      dataType: "jsonp", // needs to be jsonp to avoid cross-origin error
      jsonp: "jsoncallback",
      success: function( response ) {
        // Process the JSON
      }
    });
  },

  render: function() {
    this.getStockData();
    
    return (
      <div className="StockChart">
        This is the stock chart component.
        <h2>{this.props.stockSymbol}</h2>
      </div>
    );
  }
});

var ContainerMain = React.createClass({displayName: 'ContainerMain',
  getInitialState: function() {
    return {
      stockSymbol: ''
    };
  },
  
  handleUserInput: function(stockSymbol) {
    this.setState({
      stockSymbol: stockSymbol
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
        />
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(ContainerMain, null),
  document.getElementById('content')
);