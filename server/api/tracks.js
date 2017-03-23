const router = require('express').Router();
const pRequest = require('request-promise');

router.get('/audio-features', (req, res, next) => {
	//TODO: Change authorization token from a temporary one to permanent
	pRequest({
		url: 'https://api.spotify.com/v1/audio-features?ids=' + req.query.ids,
		method: 'GET',
		headers: {
      	'Accept': 'application/json',
      	'Authorization': 'Bearer BQAC0BTFk83QExSfNNHjkGCa81R5bZ9v1IMUmHopd216mN74sVl5ULbmxS9855QHXIT7m9xY9pV01uGDL3ZG_z5KYNOFsvYAn3IYhDCFdFdKujwdNSLevij5o01xoMjPO4Kgphzv7n9x3A'
    	}
	})
	.then(foundAudioFeatures => {
		if(!foundAudioFeatures) {
			const err = new Error('no found tracks');
			err.status = 404;
			next(err);
		} else {
		res.send(foundAudioFeatures.audio_features)
	}
	})
	.catch(next);
})

module.exports = router;
