# Flutterwave Nodejs Library v1.0.0


### How to use

`npm install flutterwave_node_3`


 You can get your PUBLICK_KEY and SECRET_KEY from the Rave dashboard. 

 Go [here](https://rave.flutterwave.com/dashboard/settings/apis) to get your API Keys. 
 
 Turn on Sandbox to get TEST API KEYS and Turn off Sandbox to get LIVE API KEYS

## Flutterwave Services exposed by the library

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

**4**.  **TRANSFERS**

  * Create a transfer
  * Create bulk transfer
  * Get transfer fee
  * Get all transfers

**6**. **VIRTUAL CARDS** 

*   Create virtual card
*   Get all virtual cards
*   Get a virtual card
*   Fund a virtual card
*   Terminate a virtual card
*   Get virtual card transactions
*   Withdraw from a virtual card
*   Block virtual cards
*   Unblock virtual cards

**7**. **VIRTUAL ACCOUNT NUMBERS** 

*   Create a virtual account number
*  Create bulk virtual account numbers
*   Resolve account details
*   Resolve bvn details

**8**. **MISC** 

*   Get all wallet balances
*  Get balances per currency
*   Fetch a beneficiary
*   Get a virtual account number

**9**. **BENEFICIARIES** 

*   Create a beneficiary
*  List all beneficiaries
*   Get bulk virtual account details
*   Delete a beneficiary

**10**. **BANKS** 

*   Get all banks
*  Get bank branches

**11**. **SETTLEMENTS** 

*   Get all settlements
*  Get a settlement

**12**. **SUBSCRIPTIONS** 

*   Get all subscriptions
*   Cancel a subscription
*   Activate a subscription


For more information on the services listed above, visit the [Flutterwave website](https://developer.flutterwave.com/v3.0/docs)




## Charge
 

### ```card charge```

This describes how to charge cards on flw.



**NB: `enckey` is the encryption key on the dashboard**

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



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


flw.Charge.card(payload)
    .then((call_charge) => {
        if (call_charge.data.status === 'pending') {
            const validate = flw.Charge.validate({
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

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



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

        const response = await flw.Charge.ng(payload, rave)
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

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);




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

        const response = await flw.Charge.uk(payload, rave)
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
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


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

        const response = await flw.Charge.ach(payload, rave)
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
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



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

        const response = await flw.Charge.bank_transfer(payload, rave)
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
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);




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
                const response = await flw.Charge.ussd(payload, rave)
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
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


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
                const response = await flw.Charge.voucher(payload, rave)
                console.log(response);
        } catch (error) {
                console.log(error)
        }

}


charg_voucher();


```





## MOBILE MONEY


### ```Mpesa```
This describes how to collect payments via Mpesa.


```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



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

       const response =  await flw.MobileMoney.mpesa(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
mpesa();
```



### ```Ghana mobile money```


This describes how to collect payments via Ghana mobile money.

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



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

       const response =  await flw.MobileMoney.ghana(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
Gh_mobilemoney();


```

###  ```Rwanda mobile money```


This describes how to collect payments via Rwanda mobile money.


```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);




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

       const response =  await flw.MobileMoney.rwanda(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
rw_mobile_money();
```


### ```Uganda mobile money```


This describes how to collect payments via Uganda mobile money.


```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


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

       const response =  await flw.MobileMoney.uganda(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
ug_mobile_money();
```


### ```Francophone mobile money```


This describes how to collect payments via mobile money for Franc.

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


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
       const response =  await flw.MobileMoney.franco_phone(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
franc_mobile_money();
```


### ```Zambia mobile money```


This describes how to collect payments via  Zambia  mobile money.

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



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
       const response =  await flw.MobileMoney.zambia(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
zambia_mobile_money();
```


## TOKENIZED CHARGES

### ```Charge with token```

This describes how to create a tokenized charge

```javascript

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



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
       const response =  await flw.Tokenized.charge(payload, rave)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
charge_with_token();
```



### ```Update token details```

This describes how to update details tied to a card token

```javascript

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const update_token = async () => {

    try {

        const payload = {
            "token": "flw-t1nf-cff007a7699efee339c9271b9be4f3d7-m03k",
            "email": "user@example.com",
            "first_name": "Kendrick",
            "last_name": "Graham",
            "phone_number": "09090909990"
        }
        const response = await flw.Tokenized.update_token(payload, rave)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


update_token();

```


### ```Create bulk tokenized charge```


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
        const response = await flw.Tokenized.bulk(payload, rave)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


charge_bulk();

```


### ```Get a bulk tokenized charge status```


This describes how to get the status of a bulk tokenized charge

```javascript

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const fetchBulk = async () => {

    try {

        const payload = {"bulk_id":"174"}
        const response = await flw.Tokenized.fetch_bulk(payload, rave)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchBulk();
```


### ```Get bulk tokenized charge transactions```


This describes how to get specific bulk tokenized charge transactions

```javascript

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const fetch_charge_transactions = async () => {

    try {

        const payload = {"bulk_id":"174"}
        const response = await flw.Tokenized.fetch_charge_transactions(payload, rave)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetch_charge_transactions();
```


## TRANSACTIONS

### ```Get all transactions```


This describes how to fetch all transactions on your account

```javascript

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const fetch_transactions = async () => {

    try {


        const payload = {
            "from": "2020-01-01",
            "to": "2020-05-05"
        }
        const response = await flw.Transaction.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetch_transactions();
```


### ```Get transaction fee```


This describes how Get transaction fees

```javascript

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const get_fee = async () => {

    try {


        const payload = {
            "amount": "1000",
            "currency": "NGN"
        }
        const response = await flw.Transaction.fee(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


get_fee();
```


### ```Resend transaction webhook```


This describes how resend a failed transaction webhook to your server

```javascript

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const resendHooks = async () => {

    try {


        const payload = {
            "tx_ref": "rave-123wsvgfwefcwsfc456"
        }
        const response = await flw.Transaction.resend_hooks(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


resendHooks();

```



### ```Transaction refund```



This describes how to initiate a transaction refund

```javascript

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const refund = async () => {

    try {


        const payload = {
            "flw_ref": "FLW-MOCK-09756b204cb2388cb982aaad3930d874",
            "amount":"10"
        }
        const response = await flw.Transaction.refund(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


refund();

```

### ```Verify transaction```



This describes how Verify transactions using the transaction reference tx_ref

```javascript

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const verify = async () => {

    try {
        const payload = {"tx_ref": "rave-123wsvgfwefcwsfc456"}
        const response = await flw.Transaction.verify(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


verify();

```

### ```View transaction timeline```


This describes how view Transaction Timeline

```javascript

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const View_Transaction_Timeline = async () => {

    try {
        const payload = {
            "id": "1296063"}
        const response = await flw.Transaction.event(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


View_Transaction_Timeline();

```

## TRANSFERS


### ```Create a transfer```


This describes how to initiate a transfer

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);




const initTrans = async () => {

    try {
        const payload = {
            "account_bank": "044",
            "account_number": "0690000040",
            "amount": 200,
            "narration": "ionnodo",
            "currency": "NGN",
            "reference": "ionnodoc",
            "callback_url": "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
            "debit_currency": "NGN"
        }

        const response = await flw.

Transfer.initiate(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


initTrans();

```

### ```Create bulk transfer```


This describes how to initiate a bulk transfer

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const initBulk = async () => {

    try {
        const payload = {
            "title": "Staff salary",
            "bulk_data": [
                {
                    "bank_code": "044",
                    "account_numberr": "0690000032",
                    "amount": 45000,
                    "currency": "NGN",
                    "narration": "akhlm blktrnsfr",
                    "reference": "fhsfhsds"
                },
                {
                    "bank_code": "044",
                    "account_number": "0690000034",
                    "amount": 5000,
                    "currency": "NGN",
                    "narration": "akhlm blktrnsfr",
                    "reference": "akhlmfhsfhsds"
                }
            ]
        }

        const response = await flw.

Transfer.bulk(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


initBulk();

```


### ```Get transfer fee```


This describes how to get applicable transfer fee

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const getFee = async () => {

    try {
        const payload = {
            "amount":"5000",
            "currency":"NGN"
        }

        const response = await flw.

Transfer.fee(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getFee();

```


### ```Get all transfers```


This describes how to fetch all transfers on your account

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const getAllTrans = async () => {

    try {
        const payload = {
            "status":"failed"
        }

        const response = await flw.

Transfer.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getAllTrans();

```


## VIRTUAL CARDS

### ```Create virtual card```


This describes how to create a new virtual card

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);




const createVcard = async () => {

    try {
        const payload = {
            "currency": "NGN",
            "amount": 200,
            "billing_name": "Jermaine Graham",
            "billing_address": "2014 Forest Hills Drive",
            "billing_city": "Node",
            "billing_state": "Javascript",
            "billing_postal_code": "000009",
            "billing_country": "NG",
            "callback_url": "https://your-callback-url.com/"
        }
        const response = await flw.

VirtualCard.create(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createVcard();
```

### ```Get all virtual cards```


This describes how to Get all virtual cards

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const fetchAllVcards = async () => {

    try {
        const response = await flw.

VirtualCard.fetch_all()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchAllVcards();
```

###  ```Get a virtual card```

This describes how to fetch a virtual card

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);




const fetchVCard = async () => {

    try {
        const payload = {
            "id":"c6d7f40b-f772-47b7-8136-81256d2f87a2"
        }
        const response = await flw.

VirtualCard.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchVCard();
```

### ```Fund a virtual card```

This describes how to fund an existing virtual card

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const fundCard = async () => {

    try {
        const payload = {
            "id":"c6d7f40b-f772-47b7-8136-81256d2f87a2",
            "amount":500,
            "debit_currency":"NGN"
        }
        const response = await flw.

VirtualCard.fund(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fundCard();

```

### ```Terminate a virtual card```

This describes how to terminate a virtual card

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const terminateCard = async () => {

    try {
        const payload = {
            "id":"c6d7f40b-f772-47b7-8136-81256d2f87a2"
        }
        const response = await flw.

VirtualCard.terminate(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


terminateCard();

```

### ```Get virtual card transactions```

This describes how to fetch transactions by date range on a single card

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const getTransactions = async () => {

    try {
        const payload = {
            "id":"92b5d258-e85f-4ca6-835d-e0c6fa20d958",
            "from":"2019-01-01",
            "to":"2020-05-24",
            "index":"0", //Pass "0" if you want to start from the beginning
            "size":"5"  //Specify how many transactions you want to retrieve in a single call
        }
        const response = await flw.

VirtualCard.transactions(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getTransactions();

```

### ```Withdraw from a virtual card```

This describes how to withdraw existing funds from a virtual card

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const withdrawal = async () => {

    try {
        const payload = {
            "id":"92b5d258-e85f-4ca6-835d-e0c6fa20d958",
            "amount":10
        }
        const response = await flw.

VirtualCard.withdraw_funds(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


withdrawal();

```


### ```Block Virtual Cards```

This describes how to block a virtual card

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const blockCard = async () => {

    try {
        const payload = {
            "id":"92b5d258-e85f-4ca6-835d-e0c6fa20d958",
            "status_action":"block"
        }
        const response = await flw.

VirtualCard.block(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


blockCard();
```



### ```Unblock Virtual Cards```

This describes how to unblock a virtual card

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const unblockCard = async () => {

    try {
        const payload = {
            "id":"92b5d258-e85f-4ca6-835d-e0c6fa20d958",
            "status_action":"unblock"
        }
        const response = await flw.

VirtualCard.block(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


unblockCard();
```

## VIRTUAL ACCOUNT NUMBERS

### ```Create a virtual account number```

This describes how to create a virtual account number

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);

const createAcct = async () => {

    try {
        const payload = {
            "email": "johnmadakin@allstar.com",
            "is_permanent": true,
            "tx_ref": "jhn-mdkn-101923123463"
        }
        const response = await flw.
VirtualAcct.create(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createAcct();
```

### ```Create bulk virtual account numbers```

This describes how to create bulk virtual account numbers

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const createBulkAcct = async () => {

    try {
        const payload = {
            "accounts": 3, //This is the number of virtual account numbers you want to generate
            "email": "sam@son.com",
            "is_permanent": true,
            "tx_ref": "jhn-mndkn-012439283422"
        }
        const response = await flw.VirtualAcct.create_bulk(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createBulkAcct();

```


### ```Get bulk virtual account details```

This describes how to fetch bulk virtual account numbers using batch id

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const fetchBulk = async () => {

    try {
        const payload = {
            "batch_id": "-RND_1311590351499953", // This is the batch ID returned in the bulk virtual account numbers creation
        }
        const response = await flw.VirtualAcct.fetch_bulk(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchBulk();
```

###  ```Get a virtual account number```

This describes how to fetch a virtual account number using order reference

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const fetch = async () => {

    try {
        const payload = {
            "order_ref": "URF_1590350605901_4406935", // This is the order reference returned in the virtual account number creation
        }
        const response = await flw.VirtualAcct.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetch();
```

## MISC

### ```Get all wallet balances```

This describes how to get all wallet balances

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const fetchBal = async () => {

    try {
        
        const response = await flw.Misc.bal()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchBal();

```

### ```Get balances per currency```

This describes how to get balances for specific currencies

```javascript

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const fetchBal = async () => {

    try {
        const payload = {
            "currency": "NGN",
        }
        const response = await flw.Misc.bal_currency(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchBal();
```

### ```Resolve account details```

This describes how to resolve a bank account to get the account holder's details

```javascript

const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const resolveAcct = async () => {

    try {
        const payload = {
            "account_number": "0690000032",
            "account_bank": "044"
        }
        const response = await flw.Misc.verify_Account(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


resolveAcct();

```

### ```Resolve bvn details```

This describes how to fetch bvn information

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const resolveBvn = async () => {

    try {
        const payload = {
            "bvn": "123456789010"
        }
        const response = await flw.Misc.bvn(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


resolveBvn();

```


## BENEFICIARIES

### ```Create a beneficiary```

This describes how to create a transfer beneficiary

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);

const createBeneficiary = async () => {

    try {
        const payload = {
            "account_number": "0690000034",
            "account_bank":"044" // This is the beneficiary’s bank code, you can use the List of Banks to retrieve a bank code.
            
        }
        const response = await flw.Beneficiary.create(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


createBeneficiary();

```

### ```List all beneficiaries```

This describes how to get all beneficiaries

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const fetchAllBeneficiary = async () => {

    try {
       
        const response = await flw.Beneficiary.fetch_all()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchAllBeneficiary();
```

### ```Fetch a beneficiary```

This describes how to get a single transfer beneficiary details

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);



const fetchBeneficiary = async () => {

    try {
        const payload = {
            
            "id":"4150" //This is the unique identifier for the beneficiary you intend to fetch. It is returned in the call to create a beneficiary as data.id
            
        }
        const response = await flw.Beneficiary.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchBeneficiary();

```

### ```Delete a beneficiary```

This describes how to delete a transfer beneficiary


```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const delBeneficiary = async () => {

    try {
        const payload = {
            
            "id":"4150" //This is the unique identifier for the beneficiary you intend to fetch. It is returned in the call to create a beneficiary as data.id
            
        }
        const response = await flw.Beneficiary.delete(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


delBeneficiary();

```


## BANKS

### ```Get all banks```

This describes how to get list of banks you can transfer to

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);

const getBanks = async () => {

    try {
        const payload = {
            
            "country":"NG" //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively
            
        }
        const response = await flw.Bank.country(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getBanks();

```

### ```Get bank branches```

This describes how to get a list of bank branches

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const getBranches = async () => {

    try {
        const payload = {
            
            "id":280 //Unique bank ID, it is returned in the call to fetch banks GET /banks/:country
            
        }
        const response = await flw.Bank.branches(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


getBranches();

```

## SETTLEMENTS

### ```Get all settlements```

This describes how to fetch all settlements

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const fetchSettlements = async () => {

    try {
       
        const response = await flw.Settlement.fetch_all()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchSettlements();

```


### ```Get a settlement```

This describes how to fetch and search all your settlements

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const fetchSettlement = async () => {

    try {
        const payload = {
            
            "id":"2911" ,//This is a unique identifier for the particular settlement you want to fetch.
            "from":"2019-01-01",
            "to":"2020-05-22"
        }
        const response = await flw.Settlement.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchSettlement();

```

## SUBSCRIPTIONS

### ```Get all subscriptions```

This describes how to get all subscriptions

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const fetchSubscription = async () => {

    try {
        
        const response = await flw.Subscription.fetch_all()
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchSubscription();


```


### ```Cancel a subscription```

This describes how to cancel a subscription

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const cancelSubscription = async () => {

    try {
        const payload={
            "id":"3477" //This is the unique id of the subscription you want to cancel. It is returned in the Get a subscription call as data.id
        }
        
        const response = await flw.Subscription.cancel(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


cancelSubscription();

```


### ```Cancel a subscription```

This describes how to activate a subscription

```javascript
const Flutterwave = require('flutterwave_node_3');

const flw = new Flutterwave(PUBLICK_KEY, SECRET_KEY);


const activateSubscription = async () => {

    try {
        const payload={
            "id":"3477" //This is the unique id of the subscription you want to cancel. It is returned in the Get a subscription call as data.id
        }
        
        const response = await flw.Subscription.activate(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


activateSubscription();

```
