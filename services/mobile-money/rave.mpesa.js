const morx = require('morx');
const q = require('q');
const encrypt = require('../charge/encryp')



var spec = morx.spec()
    .build('currency', 'required:true, eg:GHS')
    .build('order_id', 'required:USS_URG_893982923s2323')
    .build('type', 'required:true, eg:mobile_money_ghana')
	.build('amount', 'required:true, eg:10')
	.build('phone_number', 'required:false, eg:08030930236')
	.build('email', 'required:true, eg:debowalefaulkner@gmail.com')
	.build('fullname', 'required:false, eg:lawal')
	.build('client_ip', 'required:false, eg:127.0.0.1')
	.build('tx_ref', 'required:true, eg:FLW_y-443342')
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


			params.public_key = _rave.getPublicKey();
		
			return _rave.request('v3/charges?type=mpesa',params)
		})
		.then(response => {

		

			
			d.resolve(response.body);

		})
		.catch(err => {

			d.reject(err);

		})

	return d.promise;



}
service.morxspc = spec;
module.exports = service;

req={
    "tx_ref": "MC-15852113s09v5050e8",
    "amount": "1500",
    "type": "mpesa",
    "currency": "KES",
    "email": "ekene@flw.com",
    "phone_number": "054709929220",
    "fullname": "Ekene Eze",
    "client_ip": "154.123.220.1",
    "device_fingerprint": "62wd23423rq324323qew1",
    "meta": {
        "flightID": "213213AS"
    }
}

