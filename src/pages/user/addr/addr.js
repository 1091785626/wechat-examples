import {connect} from '../../../libs/wechat-redux.js';
import {bindActionCreators} from '../../../libs/redux.js';
import * as userAddrActions from '../../../actions/user';
import * as types from '../../../constants/actions/user';
import toastConfig from '../../../components/toast/toast';
import addrConfig from '../../../components/addr/addr';
function mapStateToData(state) {
	return state.userAddr;
}

function mapDispatchToActions(dispatch) {
	return {
		actions:bindActionCreators(userAddrActions, dispatch)
	};
}
const pageConfig = {
	onShow(){
		if (this.data.isFetching === 0) {
			let url = types.USER_ADDR_GET;
			let param = {};
			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: (res) => {
				},
				onError: (res) => {
					this.$toastInfo(res.msg);
				}
			};
			this.actions.request(url, params, {});
		}
	},
	handleEdit(event){
		const id = event.currentTarget.id;
		const {itemArr,itemObj} = this.data;
		this.$addrPopup({
			id,
			data:itemObj[id],
			type:"edit"
		}).then((res)=>{
			let url = types.USER_ADDR_EDIT_POST;
			let param = Object.assign({},{id},res);
			let params = {
				param: param,
				ajaxType: 'POST',
				onSuccess: (res)=> {
					console.log('传回完整的单条数据');
				},
				onError: (res)=> {
					this.$toastInfo(res.msg);
				}
			};
			this.actions.request(url, params, {});
		}).catch((res)=>{
		});
	},
	handleCreate(event){
		this.$addrPopup({
			id:null,
			data:{},
			type:"create"
		}).then((res)=>{
			let url = types.USER_ADDR_CREATE_POST;
			let param = Object.assign({},res);
			let params = {
				param: param,
				ajaxType: 'POST',
				onSuccess: (res)=> {
					console.log('传回完整的单条数据');
				},
				onError: (res)=> {
					this.$toastInfo(res.msg);
				}
			};
			this.actions.request(url, params, {});
		}).catch((res)=>{
		});
	},
	handleSelect(event){
		let info = event.currentTarget.id.split('_');
		let index = info[0];
		let id = info[1];
		if(index==0) return;
		let url = types.USER_ADDR_SELECT_POST;
		let param = {
			id
		};
		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res)=> {
			},
			onError: (res)=> {
				this.$toastInfo(res.msg);
			}
		};
		this.actions.request(url, params, {});
	},
	handleDelete(event){
		let id = event.currentTarget.id;
		let url = types.USER_ADDR_DELETE_POST;
		let param = {
			id
		};
		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res)=> {
			},
			onError: (res)=> {
				this.$toastInfo(res.msg);
			}
		};
		wx.showModal({
			title: '删除',
			content: '确定删除么?',
			success: (res)=> {
				res.confirm&&this.actions.request(url, params);
			}
		});
	}
};
const combineConfig = Object.assign({},toastConfig,addrConfig,pageConfig);
const resultConfig = connect(mapStateToData, mapDispatchToActions)(combineConfig);
Page(resultConfig);