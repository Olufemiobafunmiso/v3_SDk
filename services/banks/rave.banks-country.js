var morx = require('morx');
var q = require('q');


var spec =  morx.spec()
				.build('country', 'required:true, eg:NG')
				.end();

function service(data, _rave){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
        var params = validated.params;
        return params
       

	})
	.then( params  => {
		 
        // params.seckey = _rave.getSecretKey();
		params.method = "GET";
        var uri = `v3/banks/${params.country}?public_key=${_rave.getPublicKey()}`
        
        return _rave.request(uri,params)
        
	})
	.then( response => {

		// console.log(response.body);
		d.resolve(response.body);

	})
	.catch( err => {

		d.reject(err);

	})

	return d.promise;

}
service.morxspc = spec;
module.exports = service;

