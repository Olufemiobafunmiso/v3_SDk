const morx = require('morx');

const q = require('q');


const spec = morx.spec()

    .build('tx_ref', 'required:true, eg:akhlm-pstmn-blkchrge-xx6')
    .end();

function service(data, _rave) {
  

    var d = q.defer();

    q.fcall(() => {
            // console.log("hellooo", data);

            var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
            // console.log(validated)
            var params = {}
            var params = validated.params;

            return params;


        })
        .then(params => {



            // params.seckey = _rave.getSecretKey();
            params.method = "GET"
            return _rave.request(`v3/transactions/${params.tx_ref}/verify`, params)
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


