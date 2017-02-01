var redux = require('redux');
var {nameReducer, hobbiesReducer, moviesReducer, mapReducer} = require('./../reducers/index')

export var configure = () => {
    var reducer = redux.combineReducers({
        name: nameReducer,
        hobbies: hobbiesReducer,
        movies: moviesReducer,
        map: mapReducer
    })

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)); 

    return store; 
}