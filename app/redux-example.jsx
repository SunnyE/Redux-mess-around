var redux = require('redux');
var axios = require('axios');

console.log('Starting redux example');

var startingState = {
    name: "Annonymous",
    hobbies: [],
    movies: []
}

// var oldReducer = (state = startingState, action) => {
//     // state = state || {name: 'Annonymous'};
//     switch (action.type) {
//         case 'CHANGE_NAME':
//             return {
//                 ...state, 
//                 name: action.name
//             };
//         case 'ADD_HOBBY':
//             return {
//                 ...state,
//                 hobbies: [
//                     ...state.hobbies,
//                     {
//                         id: nextHobbyId++,
//                         hobby: action.hobby
//                     }
//                 ]
//             };
//         case 'REMOVE_HOBBY': 
//             return {
//                 ...state,
//                 hobbies: state.hobbies.filter((hobby) => {
//                     return hobby.id !== action.id
//                 })
//             }
//         case 'ADD_MOVIE':
//             return {
//                 ...state,
//                 movies:[
//                     ...state.movies,
//                     {
//                         id: nextMovieId++,
//                         title: action.title,
//                         genre: action.genre
//                     }
//                 ]
//             }
//         case 'REMOVE_MOVIE':
//             return {
//                 ...state,
//                 movies: state.movies.filter((movie) => {
//                     return movie.id !== action.id
//                 })
//             }
//         default:
//             return state; 
//     }
    
// };

// name reducer and action generator. 

//-------------------------------------------
var nameReducer = (state = 'Annonymous', action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return action.name
        default: 
            return state; 
    }
};

var changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
    }

};

// hobby reducer and action generator
//-------------------------------------------

var nextHobbyId = 1; 
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
var addHobby = (hobby) => {
    return{
        type: 'ADD_HOBBY',
        hobby
    };
};

var removeHobby = (id) => {
    return {
        type: 'REMOVE_HOBBY',
        id
    };
};

// movie reducer and action generator
//-------------------------------------------
var nextMovieId = 1;
var movieReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MOVIE':
            return [
                ...state,
                    {
                        id: nextMovieId++,
                        title: action.title,
                        genre: action.genre
                    }
            ]
        case 'REMOVE_MOVIE':
            return state.movies.filter((movie) =>  movie.id !== action.id);
        default: 
            return state; 
    };
};

var addMovie = (title, genre) => {
    return { 
        type: 'ADD_MOVIE',
        title,
        genre
    };
};

var removeMovie = (id) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    }
}

// Map reducer and action generators 

var mapReducer = (state ={isFetching = false, url: undefined}, action) => {
    switch (action.type) {
        case 'START_LOCATION_FETCH':
            return {
                isFetching:true,
                url: undefined
            };
        case 'COMPLETE_LOCATION_FETCH':
            return {
                isFetching:false,
                url: action.url
            };
        default: 
            return state;
    }   

};

var startLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    }
};

var completeLocationFetch = (url) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    };
};

var fetchLocation = () => {
    store.dispatch(startLocationFetch());
    
    axios.get('http://ipinfo.io').then(function (res) {
        var loc = res.data.loc;
        var baseUrl = 'http://maps.google.com?q='

        store.dispatch(completeLocationFetch(baseUrl + loc));
        });
};

var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer,
    map: mapReducer
})

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)); 

// subscribe to changes in the store
var unsubscribe = store.subscribe(() => {
    var state = store.getState();

    console.log('name is ', state.name);
    if(state.map.isFetching) {
        document.getElementById('app').innerHTML = 'Loading...';
    } else if (state.map.url) {
        document.getElementById('app').innerHTML = '<a href="'+ state.map.url + '" target="_blank"> View Your Location </a>'
    }
});

// unsubscribe();

//this gets our object
var currentState = store.getState();
console.log('currentState', currentState);


store.dispatch(changeName('Ethan'));


store.dispatch(addMovie('Blazing Saddles','Comedy'));


store.dispatch(addMovie('Beerfest','Comedy'));



store.dispatch(addHobby('running'));

store.dispatch(addHobby('walking'));

store.dispatch(removeHobby(2));

store.dispatch(changeName('Robert Cranberry souce nuggets'));

store.dispach(removeMovie(1));