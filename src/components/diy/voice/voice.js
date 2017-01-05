/**
 * 不使用redux
 */

const voiceConfig = {
	$voiceCtx:null,
	$voiceHandleClick(event){
		this.$voiceCtx&&this.$voiceCtx.pause();
		const voice = event.currentTarget.id;
		this.$voiceCtx = wx.createAudioContext(voice);
		this.$voiceCtx.play();
	}
};
export default voiceConfig;