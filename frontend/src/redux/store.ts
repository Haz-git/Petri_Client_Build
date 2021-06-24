import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import authReducer from './authReducer/authReducer';
import chatReducer from './chatMessaging/chatReducer';
import taskReducer from './userTaskLog/userTaskLogReducer';
import newsReducer from './sciNews/sciNewsReducer';
import bionotesReducer from './userBioNote/bionoteReducer';
import calendarReducer from './userCalendar/calendarReducer';
import lacZReducer from './userLacZ/LacZReducer';
import userReducer from './userSettings/UserSettingReducer';
import { reducer as formReducer } from 'redux-form';
import reduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
//Get localstorage on window browser--session storage also availiable:
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    //key = point of storage inside reducer--start storing at root.
    //Only auth and userSettings are whitelisted. userSettings will be referenced and used in the main dashboard, while auth is used for initial login.
    key: 'root',
    storage,
    whitelist: ['auth', 'userSettings'],
};

//Creating Enhancers:

const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//RootReducer:
const appReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    chat: chatReducer,
    task: taskReducer,
    news: newsReducer,
    bionotes: bionotesReducer,
    calendarEvents: calendarReducer,
    laczAssayProtocols: lacZReducer,
    userSettings: userReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'USER_LOGOUT') {
        storage.removeItem('persist:root');

        state = undefined;
    }

    return appReducer(state, action);
};

//Persisting formReducer:
const persistRootReducer = persistReducer(persistConfig, rootReducer);

//Creating store with reducers and redux extension
const store = createStore(
    persistRootReducer,
    composeEnhancers(applyMiddleware(reduxThunk))
);

//Persisted Version of store:
const persistor = persistStore(store);

export { store, persistor };
