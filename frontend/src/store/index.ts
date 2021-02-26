import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

// actions
import * as appActions from "./app/app.actions";
import * as userActions from "./user/user.actions";

// reducers
import { wordReducer } from './word/words.reducer';
import { appReducer } from "./app/app.reducer";
import { userReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
    app: appReducer,
    word: wordReducer,
    user: userReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppStateType, any>));

export { appActions, userActions };

store.dispatch(appActions.fetchLanguages());
store.dispatch(userActions.init());
