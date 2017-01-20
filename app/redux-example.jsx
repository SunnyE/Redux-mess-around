var redux = require('redux');

console.log('Starting redux example');

var reducer = (state = {name: 'Annonymous'}, action) => {
    // state = state || {name: 'Annonymous'};

    return state;
};

var store = redux.createStore(reducer); 

//this gets our object
var currentState = store.getState();

console.log('currentState', currentState);