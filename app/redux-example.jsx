var redux = require('redux');

console.log('Starting redux example');

var startingState = {
    name: "Annonymous",
    hobbies: [],
    movies: []
}
var nextHobbyId = 1; 
var nextMovieId = 1;
var oldReducer = (state = startingState, action) => {
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
        case 'REMOVE_HOBBY': 
            return {
                ...state,
                hobbies: state.hobbies.filter((hobby) => {
                    return hobby.id !== action.id
                })
            }
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
        case 'REMOVE_MOVIE':
            return {
                ...state,
                movies: state.movies.filter((movie) => {
                    return movie.id !== action.id
                });
            }
        default:
            return state; 
    }
    
};

var nameReducer = (state = 'Annonymous', action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return action.name
        default: 
            return state; 
    }
};

var hobbiesReducer = (state = [], action) => {
    switch (action.type) { 
        case 'ADD_HOBBY':
            return {
                ...state,
                hobbies: [
                    ...state,
                    {
                        id: nextHobbyId++,
                        hobby: action.hobby
                    }
                ]
            };
        case 'REMOVE_HOBBY': 
            return state.hobbies.filter((hobby) => {hobby.id !== action.id})
        default: 
            return state;
    }
}

var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer
})

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
    type: 'ADD_HOBBY',
    hobby: 'walking'
});

store.dispatch({
    type: 'REMOVE_HOBBY',
    id: 2
});

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'RObert Cranberry souce nuggets'
});

store.dispach({
    type: 'REMOVE_MOVIE',
    id: 1
});