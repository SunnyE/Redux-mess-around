var redux = require('redux');

console.log('Starting redux example');

var startingState = {
    name: "Annonymous",
    hobbies: [],
    movies: []
}
var nextHobbyId = 1; 
var nextMovieId = 1;
var reducer = (state = startingState, action) => {
    // state = state || {name: 'Annonymous'};
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state, 
                name: action.name
            };
        case 'ADD_HOBBY':
            return {
                ...state,
                hobbies: [
                    ...state.hobbies,
                    {
                        id: nextHobbyId++,
                        hobby: action.hobby
                    }
                ]
            };
        case 'ADD_MOVIE':
            return {
                ...state,
                movies:[
                    ...state.movies,
                    {
                        id: nextMovieId++,
                        title: action.title,
                        genre: action.genre
                    }
                ]
            }
        default:
            return state; 
    }
    
};

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)); 

// subscribe to changes in the store
var unsubscribe = store.subscribe(() => {
    var state = store.getState();

    console.log('name is ', state.name);
    document.getElementById('app').innerHTML = state.name;
});

// unsubscribe();

//this gets our object
var currentState = store.getState();
console.log('currentState', currentState);


store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Ethan'
});

store.dispatch({
    type: "ADD_MOVIE",
    title: 'Blazing Saddles',
    genre: 'Comedy'
});

store.dispatch({
    type: "ADD_MOVIE",
    title: 'Beerfest',
    genre: 'Comedy'
})


store.dispatch({
    type: 'ADD_HOBBY',
    hobby: 'running'
});

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'RObert Cranberry souce nuggets'
});