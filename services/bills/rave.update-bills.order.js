const morx = require('morx');
const q = require('q');


const spec = morx.spec()
	.build('amount', 'required:true, eg:3000.50')
	.build('order_ref', 'required:true, eg:BPUSSD1588268275502326')
	.build('reference', 'required:true, eg:FLWTTOT1024e200000029')
	.end();



function service(data, _rave) {

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;

			return (params);

		})
		.then(params => {


			params.method = "POST"
			return _rave.request(`v3/product-orders/${params.order_ref}`, params)
		})
		.then(resp => {

			d.resolve(resp.body);

		})
		.catch(err => {

			d.reject(err);

		});

	return d.promise;

}
service.morxspc = spec;
module.exports = service;