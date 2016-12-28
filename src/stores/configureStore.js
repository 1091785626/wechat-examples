import { createStore,compose,applyMiddleware } from '../libs/redux';
import rootReducer from '../reducers/rootReducer';
import thunk from '../libs/redux-thunk';

let finalCreateStore = compose(
		applyMiddleware(thunk)
	)(createStore);

export default function configureStore(initialState) {
	const store = finalCreateStore(rootReducer, initialState);
	return store;
}
