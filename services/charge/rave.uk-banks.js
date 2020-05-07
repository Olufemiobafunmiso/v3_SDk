const morx = require('morx');
const q = require('q');
const encrypt = require('./encryp')


var spec = morx.spec()
    .build('account_bank', 'required:true, eg:00000')
    .build('account_number', 'required:true, eg:0000000000')
	.build('currency', 'required:true, eg:GBP')
    .build('type', 'required:true, eg:card')
	.build('amount', 'required:true, eg:10')
	.build('phone_number', 'required:false, eg:08030930236')
	.build('email', 'required:true, eg:debowalefaulkner@gmail.com')
	.build('fullname', 'required:false, eg:lawal garba')
	.build('client_ip', 'required:false, eg:127.0.0.1')
    .build('tx_ref', 'required:false, eg:FLW_y-443342')
    .build('subaccounts', 'required:false')
    .build('meta', 'required:false')
    .build('device_fingerprint', 'required:false')
    .build('type', 'required:true eg:ussd')
	.end();

function service(data, _rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return (params);

		})
		.then(params => {
          
            params.public_key = _rave.getPublicKey(); 
			return _rave.request('v3/charges?type=debit_uk_account',params)
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
