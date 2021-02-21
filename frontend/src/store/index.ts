import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';

// reducers
import { wordReducer } from './word/words.reducer';

const rootReducer = combineReducers({
    word: wordReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer, applyMiddleware(thunk));
