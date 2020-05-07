const morx = require('morx');
const q = require('q');

const spec = morx.spec()
    
    .build('email', 'required:true, eg:ade_temi@icloud.com')
    .build('is_permanent', 'required:false, eg:true')
    .build('frequency', 'required:true, eg:4')
    .build('duration', 'required:true, eg:4')
    .build('narration', 'required:false, eg:New card created')
    .build('tx_ref', 'required:true, eg:jhn-mdkn-10192029920')
    .build('amount', 'required:true, eg:5000')
    .end();

function service(data, _rave) {


    const d = q.defer();

    q.fcall(() => {

            const validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
            const params = validated.params;


            return params;


        })
        .then(params => {
            
            params.method = "POST";
            return _rave.request('v3/virtual-account-numbers', params)
        })
        .then(response => {

            // console.log(response);
            d.resolve(response.body);

        })
        .catch(err => {

            d.reject(err);

        })

    return d.promise;



}
service.morxspc = spec;
module.exports = service;
