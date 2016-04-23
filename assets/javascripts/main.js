var StockSymbol = React.createClass({displayName: 'StockSymbol',
  render: function() {
    return (
      <div className="StockSymbol">
        This is the stock symbol component.
      </div>
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
  render: function() {
    return (
      <div className="ContainerMain">
        This is the main container.
        <StockSymbol />
        <StockChart />
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(ContainerMain, null),
  document.getElementById('content')
);