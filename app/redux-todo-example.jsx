var redux = require('redux');

console.log('Stareting todo redux example');

var stateDefault = {
    searchText:'',
    showCompleted: false, 
    todos:[]
}

var reducer = (state = stateDefault, action) => {

    switch(action.type){
        case 'CHANGE_SEARCH_TEXT':
        
        return {
            ...state,
            searchText: action.searchText
        }
        default:
            return state;
    }
}

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

var unsubscribe = store.subscribe(() => {
    var state = store.getState();

    document.getElementById('app').innerHTML = state.searchText;
})

console.log('currentState', currentState);

var currentState = store.getState();

store.dispatch({
    type:'CHANGE_SEARCH_TEXT',
    searchText: 'bagels'
})

console.log('searchText should be bagels', store.getState());