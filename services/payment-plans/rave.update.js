const morx = require('morx');
const q = require('q');


const spec =  morx.spec()
                .build('id', 'required:true, eg:a1b7864f-c56d-4453-bf55-a08db4acb5fe')
                .build('name', 'required:true, eg:Olufemi postman update')
                .build('status', 'required:true, eg:active')
				.end();

function service(data, _rave){

	const d = q.defer();

	q.fcall( () => {

		const validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
        const params = validated.params;
    
        return params
       

	})
	.then( params  => {
		 
    
		params.method = "PUT";
        var uri = `v3/payment-plans/${params.id}`
        
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


