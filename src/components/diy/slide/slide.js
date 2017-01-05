
/**
 * 不使用redux
 */

const slideConfig = {
	$slideInfo:null,
	$slideLoad(event){
		if(this.$slideInfo) return;
		this.$slideInfo = 1;
		let height = event.detail.height;
		let width = event.detail.width;
		const app = getApp();
		app.getSystemInfo((res)=>{
			const windowWidth = res.windowWidth;
			const pixelRatio = res.pixelRatio;
			const nowHeight = height/(width/(windowWidth));
			this.setData({
				$slideHeight:nowHeight
			});
		});
	}
};
export default slideConfig;