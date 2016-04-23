var StockSymbol = React.createClass({displayName: 'StockSymbol',
  handleChange: function() {
    this.props.onUserInput(
      this.refs.stockSymbolInput.value
    );
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
        <StockChart />
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(ContainerMain, null),
  document.getElementById('content')
);