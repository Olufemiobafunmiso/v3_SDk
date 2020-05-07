var morx = require('morx');
var q = require('q');
const path = require ('path')

var r = require("/Users/olufemiobafunmiso/Desktop/v3 Node/ravepay-nodejs/lib/rave.base.js");
var R = new r("FLWPUBK_TEST-eb01e295426875aa8389fdf79c0a7f98-X", "FLWSECK_TEST-b40afdf1380d88fbcee34b6733427a35-X");




var spec =  morx.spec()
				.build('currency', 'required:true, eg:NGN')
				.end();

function service(data, _rave){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
        var params = validated.params;
        return params
       

	})
	.then( params  => {
		 
        // params.seckey = _rave.getSecretKey();
		params.method = "GET";
        var uri = `/v3/balances/${params.currency}`
        
        return _rave.request(uri,params)
        
	})
	.then( response => {

		// console.log(response.body);
		d.resolve(response);

	})
	.catch( err => {

		d.reject(err);

	})

	return d.promise;

}
service.morxspc = spec;
module.exports = service;




payload = {
    "currency":"NGN"
}


service(payload, R).then((err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(res)
    }
}).catch(err => {
    console.log(err)
})

