const morx = require('morx');
const q = require('q');



const spec = morx.spec()
	.build('code', 'required:true, eg:BIL099')
	.build('item_code', 'required:true, eg:AT099')
	.build('customer', 'required:true, eg:08038291822')
	.end();



function service(data, _rave) {

	var d = q.defer();
	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT, {throw_error:true});
			var params = validated.params;

			return (params);

		})
		.then(params => {


			params.method = "GET"
			return _rave.request(`v3/bill-items/${params.item_code}/validate?code=${params.code}&customer=${params.customer}`, params)
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