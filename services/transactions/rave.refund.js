var morx = require('morx');
var q = require('q');



var spec =  morx.spec()
				.build('flw_ref', 'required:true, eg:URF_1577867664541_3572735')
				.build('amount', 'required:true, eg:1000') 
				.end();

function service(data, _rave){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
        var params = validated.params;
        // _rave.params = params
        // console.log(params)
        return params
       

	})
	.then( params  => {
		 
        // params.seckey = _rave.getSecretKey();
		params.method = "POST";
        const uri =`v3/transactions/${params.flw_ref}/refund`
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


