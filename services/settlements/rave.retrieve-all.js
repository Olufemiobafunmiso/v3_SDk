const morx = require('morx');
const q = require('q');
const path = require ('path')

const r = require("/Users/olufemiobafunmiso/Desktop/v3 Node/ravepay-nodejs/lib/rave.base.js");
const R = new r("FLWPUBK_TEST-eb01e295426875aa8389fdf79c0a7f98-X", "FLWSECK_TEST-b40afdf1380d88fbcee34b6733427a35-X");


//This allows you fetch a plan

const spec =  morx.spec()  
				// .build('__n', 'required:false, eg:NGN')  
				.end();


function service(_rave){

	const d = q.defer();

	q.fcall( () => {

		const validated = morx.validate( spec, _rave.MORX_DEFAULT);
        const params = validated.params;
        // _rave.params = params
        // console.log(params)
        return params
       

	})
	.then( params  => {
		 
        // params.seckey = _rave.getSecretKey();
		params.method = "GET";
        var uri = `v3/settlements`
        
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





service(R).then((err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(res)
    }
}).catch(err => {
    console.log(err)
})

