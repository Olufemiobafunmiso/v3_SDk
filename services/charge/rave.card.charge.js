const morx = require('morx');
const q = require('q');
const encrypt = require('./encryp')


var spec = morx.spec()
	.build('enckey', 'required:true, eg:611d0eda25a3c931863d92c4')
	.build('card_number', 'required:true,validators:isNumeric, eg:5590131743294314')
	.build('currency', 'required:true, eg:NGN')
	.build('suggested_auth', 'required:false, eg:VBVSECURECODE')
	.build('country', 'required:false, eg:NG')
	.build('subaccounts', 'required:false')
	.build('type', 'required:true, eg:card')
	.build('cvv', 'required:false, eg:544')
	.build('amount', 'required:true, eg:10')
	.build('phone_number', 'required:false, eg:08030930236')
	.build('billingzip', 'required:false, eg:10105')
	.build('expiry_year', 'required:false, eg:20')
	.build('expiry_month', 'required:false, eg:02')
	.build('email', 'required:true, eg:debowalefaulkner@gmail.com')
	.build('fullname', 'required:false, eg:lawal')
	.build('card_number', 'required:true, eg:5399670123490229')
	.build('client_ip', 'required:false, eg:127.0.0.1')
	.build('authorization', 'required:false')
	.build('preauthorize', 'required:false')
	.build('mode', 'required:false')
	.build('tx_ref', 'required:true, eg:FLW_y-443342')
	.build('redirect_url', 'required:false')
	.build('meta', 'required:false')
	.build('device_fingerprint', 'required:false')
	.end();

function service(data, _rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return (params);

		})
		.then(params => {




			if (params.include_integrity_hash) {

				delete params.include_integrity_hash;
				// console.log("params!!!", params);
				var integrity_hash = _rave.getIntegrityHash(params, _rave.getPublicKey(), _rave.getSecretKey());
				params.QUERY_STRING_DATA = JSON.parse(JSON.stringify(params));
				params.QUERY_STRING_DATA.integrity_hash = integrity_hash;
				// console.log(params);
			}

			params.str = JSON.stringify(params)

			// console.log(params.str);
			var encrypted = encrypt(params.enckey, params.str);
			var payload = {};
			payload.public_key = _rave.getPublicKey();
			payload.client = encrypted;
			// payload.alg = '3DES-24';
			// payload=JSON.stringify(payload)
			// console.log(payload);
			return _rave.request('v3/charges', payload)
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