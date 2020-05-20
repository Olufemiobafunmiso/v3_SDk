# Ravepay Nodejs Library v1.0.0

## Ravepay Services exposed by the library

**1**.  **CHARGE**

  * Card
  * Nigerian bank accounts
  * UK bank accounts
  * ACH payment
  * Bank transfer
  * Ussd
  * Validate a charge

**2**. **MOBILE MONEY**

 * Mpesa
 * Uganda
 * Ghana
 * Zambia
 * Francophone Africa
 * Rwanda

**3**. **TOKENIZED CHARGES**

  * Charge with token
  * Update token details
  * Create bulk tokenized charge
  * Get a bulk tokenized charge status
  * Get bulk tokenized charge transactions

  
**4**.  **TRANSACTIONS**

  * Get all transactions
  * Get transaction fee
  * Resend transaction webhook
  * Transaction refund
  * Verify transaction
  * View transaction timeline

5. **TRANSFERS**
  * Create a transfer
  * Create bulk transfer
  * Get transfer fee
  * Get all transfers

**6**. **BANKS** 

*   Get all banks
*   Get bank branches

For more information on the services listed above, visit the [Ravepay website](https://developer.flutterwave.com/v3.0/docs)

## How to use

`npm install flutterwave_node_3`


 You can get your PUBLICK_KEY and SECRET_KEY from the Rave dashboard. 

 Go [here](https://rave.flutterwave.com/dashboard/settings/apis) to get your API Keys. 
 
 Turn on Sandbox to get TEST API KEYS and Turn off Sandbox to get LIVE API KEYS



## Charge
 

### ```card charge```

This describes how to charge cards on rave.

**NB: `enckey` is the encryption key on the dashboard**

```javascript
const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const payload = {
    "card_number": "4556052704172643",
    "cvv": "899",
    "expiry_month": "01",
    "expiry_year": "21",
    "currency": "NGN",
    "amount": "1000",
    "fullname": "Ekene Eze",
    "email": "ekene@flw.com",
    "phone_number": "0902620185",
    "enckey": "611d0eda25a3c931863d92c4",
    "tx_ref": "MC-3243e", // should be unique for every transaction
    "authorization": {
        "mode": "avs_noauth",
        "pin": "3310",
        "zipcode": "07205",
        "city": "Hillside",
        "address": "470 Mundet PI",
        "state": "NJ",
        "country": "US"

    }

}


rave.Charge.card(payload)
    .then((call_charge) => {
        if (call_charge.data.status === 'pending') {
            const validate = rave.Charge.validate({
                "otp": "12345",
                "type": "card",
                "flw_ref": call_charge.data.flw_ref
            })
            return validate
                .then((res) => {
                    console.log(res)
                })
        }

        console.log(call_charge)

    }).catch(err => {
        console.log(err);

    })

```



### ```Charge Nigerian bank accounts```
This describes how to charge Nigerian bank accounts using Flutterwave

```javascript

const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const charge_ng_acct = async () => {
    
    try {

        const payload = {
            "tx_ref": "MC-1585dshdhdsdv5050e8",
            "amount": "100",
            "account_bank": "044",
            "account_number": "0690000037",
            "currency": "NGN",
            "email": "ekene@flw.com",
            "phone_number": "0902620185",
            "fullname": "Ekene Eze"
        }

        const response = await rave.Charge.ng(payload, rave)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


charge_ng_acct();



```


### ```Charge UK bank accounts```

This describes how to charge UK bank accounts using Flutterwave

```javascript

const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);



const charge_uk_acct = async () => {

    try {

        const payload = {
            "tx_ref": "MC-1585230ew9v5050e8",
            "amount": "100",
            "account_bank": "00000",
            "account_number": "0000000000",
            "currency": "GBP",
            "email": "ekene@flw.com",
            "phone_number": "0902620185",
            "fullname": "Ekene Eze"
        }

        const response = await rave.Charge.uk(payload, rave)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


charge_uk_acct();

```


#### ``` ACH Payement```
This shows you how to accept South African ACH charges from your customers

```javascript
const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);

const ach_payment = async () => {

    try {

        const payload = {
        "tx_ref": "MC-1585230ew9v5050e8",
        "amount": "100",
        "type": "ach_payment",
        "currency": "ZAR",
        "country": "SA",
        "email": "ekene@flw.com",
        "phone_number": "0902620185",
        "fullname": "Ekene Eze",
        "client_ip": "154.123.220.1",
        "redirect_url": "http://ekeneeze.com/u/payment-completed",
        "device_fingerprint": "62wd23423rq324323qew1",
        "meta": {
            "flightID": "123949494DC"
        }
}

        const response = await rave.Charge.ach(payload, rave)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


ach_payment();

```


#### ``` Bank Transfer```
This describes to allow your customer to pay via a NIP (NIBBS Instant Payment) transfer.

```javascript
const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const  bank_trf = async () => {

    try {

        const payload = {
            "tx_ref": "MC-1585230950508",
            "amount": "1500",
            "email": "johnmadakin@gmail.com",
            "phone_number": "054709929220",
            "currency": "NGN",
            "client_ip": "154.123.220.1",
            "device_fingerprint": "62wd23423rq324323qew1",
            "subaccounts": [
                {
                    "id": "RS_D87A9EE339AE28BFA2AE86041C6DE70E"
                }
            ],
            "duration": 2,
            "frequency": 5,
            "narration": "All star college salary for May",
            "is_permanent": 1,
        }

        const response = await rave.Charge.bank_transfer(payload, rave)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


bank_trf();

```

#### ``` USSD```
This describes how to collect payments via ussd

```javascript
const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);



const ussd = async () => {


        try {

                const payload = {
                        "tx_ref": "MC-15852309v5050e8",
                        "order_id": "USS_URG_8939829232323",
                        "account_bank": "058",
                        "amount": "1500",
                        "type": "qr",
                        "currency": "NGN",
                        "email": "ekene@flw.com",
                        "phone_number": "054709929220",
                        "fullname": "Ekene Eze"
                }
                const response = await rave.Charge.ussd(payload, rave)
                console.log(response);
        } catch (error) {
                console.log(error)
        }

}


ussd();

```

#### ``` Charge via Voucher payment```
This describes how to collect ZAR payments offline using Vouchers

```javascript
const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);

const charg_voucher = async () => {


        try {

                const payload = {
                    "tx_ref": "MC-15852309v5050e8",
                    "amount": "100",
                    "type": "voucher_payment",
                    "currency": "ZAR",
                    "pin": "19203804939000",
                    "email": "ekene@flw.com",
                    "phone_number": "0902620185",
                    "fullname": "Ekene Eze"
                }
                const response = await rave.Charge.voucher(payload, rave)
                console.log(response);
        } catch (error) {
                console.log(error)
        }

}


charg_voucher();


```





## MOBILE MONEY


###```Mpesa```
This describes how to collect payments via Mpesa.


```javascript
const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const mpesa =  async () =>{
 
    try {

        const payload = {
            "tx_ref": "MC-15852113s09v5050e8",
            "amount": "1500",
            "currency": "KES",
            "email": "ekene@flw.com",
            "phone_number": "054709929220",
            "fullname": "Ekene Eze"
    }

       const response =  await rave.MobileMoney.mpesa(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
mpesa();
```



###```Ghana mobile money```

This describes how to collect payments via Ghana mobile money.

```javascript
const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const Gh_mobilemoney =  async () =>{
 
    try {

        const payload = {
            "tx_ref": "MC-158523s09v5050e8",
            "order_id": "USS_URG_893982923s2323",
            "amount": "1500",
            "currency": "GHS",
            "network":"MTN",
            "email": "ekene@flw.com",
            "phone_number": "054709929220",
            "fullname": "John Madakin"
        }

       const response =  await rave.MobileMoney.ghana(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
Gh_mobilemoney();
```
###```Rwanda mobile money```
This describes how to collect payments via Rwanda mobile money.


```javascript
const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);



const rw_mobile_money =  async ()=>{
 
    try {

        const payload = {
            "tx_ref": "MC-158523s09v5050e8",
            "order_id": "USS_URG_893982923s2323",
            "amount": "1500",
            "currency": "RWF",
            "email": "ekene@flw.com",
            "phone_number": "054709929220",
            "fullname": "John Madakin"
        }

       const response =  await rave.MobileMoney.rwanda(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
rw_mobile_money();
```
###```Uganda mobile money```
This describes how to collect payments via Uganda mobile money.


```javascript
const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);

const ug_mobile_money =  async () =>{
 
    try {

        const payload = {
            "tx_ref": "MC-1585230950508",
            "amount": "1500",
            "email": "ekene@flw.com",
            "phone_number": "054709929220",
            "currency": "UGX",
            "fullname": "Ekene Eze",
            "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
            "voucher": "128373",
            "network": "MTN"
        }

       const response =  await rave.MobileMoney.uganda(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
ug_mobile_money();
```
###```Francophone mobile money```
This describes how to collect payments via mobile money for Franc.

```javascript
const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);

const franc_mobile_money =  async () =>{
 
    try {

        const payload = {
            "tx_ref": "MC-158523s09v5050e8",
            "amount": "1500",
            "currency": "XAF",
            "email": "ekene@flw.com",
            "phone_number": "054709929220",
            "fullname": "Ekene Eze"
        }
       const response =  await rave.MobileMoney.franco_phone(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
franc_mobile_money();
```
###```Zambia mobile money```
This describes how to collect payments via  Zambia  mobile money.

```javascript
const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const zambia_mobile_money =  async () =>{
 
    try {

        const payload = {
            "tx_ref": "MC-15852113s09v5050e8",
            "amount": "1500",
            "currency": "ZMW",
            "email": "ekene@flw.com",
            "phone_number": "054709929220",
            "fullname": "Ekene Eze",
            "order_id": "URF_MMGH_1585323540079_5981535"
        }
       const response =  await rave.MobileMoney.zambia(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
zambia_mobile_money();
```


## TOKENIZED CHARGES

###```Charge with token```
This describes how to create a tokenized charge

```javascript
const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const charge_with_token =  async()=>{
 
    try {

        const payload = {
            "token": "flw-t1nf-cff007a7699efee339c9271b9be4f3d7-m03k",
            "currency": "NGN",
            "country": "NG",
            "amount": 200,
            "email": "user@gmail.com",
            "first_name": "temi",
            "last_name": "desola",
            "ip": "pstmn",
            "narration": "Sample tokenized charge",
            "tx_ref": "MC-1589482483218"
        }
       const response =  await rave.Tokenized.charge(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
charge_with_token();
```



###```Update token details```
This describes how to update details tied to a card token

```javascript

const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);

const update_token = async () => {

    try {

        const payload = {
            "token": "flw-t1nf-cff007a7699efee339c9271b9be4f3d7-m03k",
            "email": "user@example.com",
            "first_name": "Kendrick",
            "last_name": "Graham",
            "phone_number": "09090909990"
        }
        const response = await rave.Tokenized.update_token(payload, rave)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


update_token();

```


###```Create bulk tokenized charge```

This describes how to charge multiple payment tokens at once

```javascript

const charge_bulk = async () => {

    try {

        const payload = {
            "title": "Staff salary for June",
            "retry_strategy": {
                "retry_interval": 120,
                "retry_amount_variable": 60,
                "retry_attempt_variable": 2
            },
            "bulk_data": [
                {
                    "currency": "NGN",
                    "token": "flw-t1nf-6de8b97a7e1abb221decad7887afa45a-m03k",
                    "country": "NG",
                    "amount": 3500,
                    "email": "user@example.com",
                    "first_name": "Ekene",
                    "last_name": "Eze",
                    "ip": "pstmn",
                    "tx_ref": "akhlm-pstmn-blkchrg-xx6"
                },
                {
                    "currency": "NGN",
                    "token": "flw-t1nf-f9b3bf384cd30d6fca42b6df9d27bd2f-m03k",
                    "country": "NG",
                    "amount": 3000,
                    "email": "user@example.com",
                    "first_name": "Temi",
                    "last_name": "Adesina",
                    "ip": "pstmn",
                    "tx_ref": "akhlm-pstmn-blkchrge-xx7"
                }
            ]
        }
        const response = await rave.Tokenized.bulk(payload, rave)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


charge_bulk();

```


###```Get a bulk tokenized charge status```
This describes how to get the status of a bulk tokenized charge

```javascript

const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const fetchBulk = async () => {

    try {

        const payload = {"bulk_id":"174"}
        const response = await rave.Tokenized.fetch_bulk(payload, rave)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchBulk();
```


###```Get bulk tokenized charge transactions```
This describes how to get specific bulk tokenized charge transactions

```javascript

const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const fetch_charge_transactions = async () => {

    try {

        const payload = {"bulk_id":"174"}
        const response = await rave.Tokenized.fetch_charge_transactions(payload, rave)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetch_charge_transactions();
```


## TRANSACTIONS

###```Get all transactions```
This describes how to fetch all transactions on your account

```javascript

const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const fetch_transactions = async () => {

    try {


        const payload = {
            "from": "2020-01-01",
            "to": "2020-05-05"
        }
        const response = await rave.Transaction.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetch_transactions();
```

###```Get transaction fee```
This describes how Get transaction fees

```javascript

const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const get_fee = async () => {

    try {


        const payload = {
            "amount": "1000",
            "currency": "NGN"
        }
        const response = await rave.Transaction.fee(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


get_fee();
```


###```Resend transaction webhook```

This describes how resend a failed transaction webhook to your server

```javascript

const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const resendHooks = async () => {

    try {


        const payload = {
            "tx_ref": "rave-123wsvgfwefcwsfc456"
        }
        const response = await rave.Transaction.resend_hooks(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


resendHooks();

```



###```Transaction refund```

This describes how to initiate a transaction refund

```javascript

const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const refund = async () => {

    try {


        const payload = {
            "flw_ref": "FLW-MOCK-09756b204cb2388cb982aaad3930d874",
            "amount":"10"
        }
        const response = await rave.Transaction.refund(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


refund();

```

###```Verify transaction```

This describes how Verify transactions using the transaction reference tx_ref

```javascript

const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const verify = async () => {

    try {
        const payload = {"tx_ref": "rave-123wsvgfwefcwsfc456"}
        const response = await rave.Transaction.verify(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


verify();

```

###```View transaction timeline```

This describes how view Transaction Timeline

```javascript

const Ravepay = require('flutterwave_node_3');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY);


const View_Transaction_Timeline = async () => {

    try {
        const payload = {
            "id": "1296063"}
        const response = await rave.Transaction.event(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


View_Transaction_Timeline();

```

## TRANSACTIONS