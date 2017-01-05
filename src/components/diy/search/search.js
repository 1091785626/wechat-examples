/**
 * 不使用redux
 */
const searchConfig = {
	$searchInfo:null,
	$searchConfirm(event){
		const value = event.detail.value;
		this.$searchInfo = value;
		this.coverSearchSubmit(value);
	},
	$searchInput(event){
		this.$searchInfo = event.detail.value;
	},
	$searchHandleSubmit(){
		this.coverSearchSubmit(this.$searchInfo);
	},
	/**
	 * 可以被覆盖
	 */
	coverSearchSubmit(value){
		const url = '/pages/list/list?keyword='+this.$searchInfo;
		this.actions.route(url);
	}
};
export default searchConfig;