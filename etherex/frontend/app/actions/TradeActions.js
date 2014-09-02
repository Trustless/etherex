var constants = require("../js/constants");
var utils = require("../js/utils");

var TradeActions = function(client) {

    this.loadTrades = function() {
        this.dispatch(constants.trade.LOAD_TRADES);
        var markets = this.flux.store("MarketStore").getState().markets;
        _client.loadTrades(markets, function(trades) {
            this.dispatch(constants.trade.LOAD_TRADES_SUCCESS, trades);
        }.bind(this), function(error) {
            console.log(error);
            this.dispatch(constants.trade.LOAD_TRADES_FAIL, {error: error});
        }.bind(this));
    };

    this.addTrade = function(trade) {
        var id = utils.randomId();
        trade.id = id;
        _client.addTrade(trade, function() {
            this.dispatch(constants.trade.ADD_TRADE, trade);
        }.bind(this), function(error) {
            console.log(error);
        }.bind(this));
    };

    this.fillTrade = function(trade) {
        _client.fillTrade(trade, function() {
            this.dispatch(constants.trade.FILL_TRADE, trade);
        }.bind(this), function(error) {
            console.log(error);
        }.bind(this));
    };

    this.cancelTrade = function(trade) {
        _client.cancelTrade(trade, function() {
            this.dispatch(constants.trade.CANCEL_TRADE, trade);
        }.bind(this), function(error) {
            console.log(error);
        }.bind(this));
    };

    var _client = client;
};

module.exports = TradeActions;
