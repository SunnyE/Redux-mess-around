var redux = require('redux');

console.log('Starting redux example');

var startingState = {
    name: "Annonymous"
}

var reducer = (state = startingState, action) => {
    // state = state || {name: 'Annonymous'};
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state, 
                name: action.name
            };
        default:
            return state; 
    }
    
};

var store = redux.createStore(reducer); 

// subscribe to changes in the store
store.subscribe(() => {
    var state = store.getState();

    console.log('name is ', state.name);
})

//this gets our object
var currentState = store.getState();
console.log('currentState', currentState);


store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Ethan'
});

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'RObert Cranberry souce nuggets'
});