const morx = require('morx');
const q = require('q');
const encrypt = require('./encryp')



var spec = morx.spec()
	.build('type', 'required:true, eg:card')
    .build('otp', 'required:true, eg:12345')
    .build('flw_ref', 'required:true, eg:RVFC6477605CE934')
	.end();

function service(data, _rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return (params);

		})
		.then(params => {
          
            // params.public_key = _rave.getPublicKey(); 
          
            var uri = `v3/charges/${params.flw_ref}/validate`
          
			return _rave.request(uri,params)
		})
		.then(response => {

			//console.log(response);

			

			
			d.resolve(response.body);

		})
		.catch(err => {

			d.reject(err);

		})

	return d.promise;



}
service.morxspc = spec;
module.exports = service;
