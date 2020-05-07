const morx = require('morx');
const q = require('q');
const path = require ('path')



var spec =  morx.spec()  
				// .build('__n', 'required:false, eg:NGN')  
				.end();


function service(_rave){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate( spec, _rave.MORX_DEFAULT);
        var params = validated.params;
        
        return params
       

	})
	.then( params  => {
		 
		params.method = "GET";
        var uri = `/v3/subaccounts?`
        
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


