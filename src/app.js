//app.js
import configureStore from './stores/configureStore';
import { initialState } from './stores/stores';
const store = configureStore(initialState);
App({
	onLaunch: () => {
		console.log("onLaunch");
	},
	store
});
