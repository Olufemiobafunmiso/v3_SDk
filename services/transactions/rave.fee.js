var morx = require('morx');
var q = require('q');



var spec =  morx.spec()
				.build('currency', 'required:false, eg:NGN')
				.build('amount', 'required:true, eg:1000') 
				.build('p_type', 'required:false') 
				.build('card_6', 'required:false') 
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
		params.method = "GET";
        var uri =`/v3/transactions/fee?amount=${params.amount}&currency=${params.currency}`
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

