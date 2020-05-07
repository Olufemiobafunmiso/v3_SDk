const morx = require('morx');
const q = require('q');
const axios = require('axios');


const spec =  morx.spec()
                .build('account_bank', 'required:true, eg:044')
                .build('public_key', 'required:true, eg:FLWPUBK-6c4e3dcb21282d44f907c9xxxxxxxxxx-X')
				.build('account_number', 'required:true,validators:isNumeric, eg:06900021')
                .end();
                

function service(data, _rave){

	var d = q.defer();
	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;
        // _rave.params = params
		return  (params);

    })
    .then(params => {
    // params.pubkey = _rave.getPublicKey();  
    // console.log(`This is params ${params}`)
        return _rave.request('v3/accounts/resolve', params)
        
	})
	.then( resp => {

		d.resolve(resp.body);

	})
	.catch( err => {

		d.reject(err);

	});

	return d.promise;

}
service.morxspc = spec;
module.exports = service;


