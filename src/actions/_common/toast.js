import * as types from '../../constants/actions/toast';
export function toastSelect(id) {
	return { 
		type: types.TOAST_SELECT, 
		id
	};
}