var morx = require('morx');
var q = require('q');


var spec = morx.spec()
	.build('country', 'required:true, eg:NG')
	.end();

function service(data, _rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
			var params = validated.params;
			return params


		})
		.then(params => {

			params.method = "GET";
			var uri = `v3/banks/${params.country}`

			return _rave.request(uri, params)

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