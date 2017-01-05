/**
 * 不使用redux
 */

const telConfig = {
	$telHandleClick(event){
		const tel = event.currentTarget.id;
		wx.makePhoneCall({phoneNumber: tel});
	}
};
export default telConfig;