{/* <form>
  <script src="https://checkout.flutterwave.com/v3.js"></script>
  <button type="button" onClick="makePayment()">Pay Now</button>
</form>

<script>
  function makePayment() {
    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
      tx_ref: "hooli-tx-1920bbtyt",
      amount: 54600,
      currency: "NGN",
      country: "NG",
      payment_options: "card, mobilemoneyghana, ussd",
      redirect_url: // specified redirect URL
        "https://callbacks.piedpiper.com/flutterwave.aspx?ismobile=34",
      meta: {
        consumer_id: 23,
        consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email: "user@gmail.com",
        phone_number: "08102909304",
        name: "yemi desola",
      },
      callback: function (data) {
        console.log(data);
      },
      onclose: function() {
        // close modal
      },
      customizations: {
        title: "My store",
        description: "Payment for items in cart",
        logo: "https://assets.piedpiper.com/logo.png",
      },
    });
  }
</script>

// 2

<form>
  <script src="https://checkout.flutterwave.com/v3.js"></script>
  <button type="button" onClick="makePayment()">Pay Now</button>
</form>

<script>
  function makePayment() {
    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-31d61a13026483fc38f15f0e90232374-X",
      tx_ref: "hooli-tx-1920bbtyt",
      amount: 54600,
      currency: "NGN",
      country: "NG",
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: "user@gmail.com",
        phone_number: "08102909304",
        name: "yemi desola",
      },
      callback: function (data) { // specified callback function
        console.log(data);
      },
      customizations: {
        title: "My store",
        description: "Payment for items in cart",
        logo: "https://assets.piedpiper.com/logo.png",
      },
    });
  }
</script>

callback response in data

{
    amount: 54600
    currency: "NGN" 
    customer: {
         name: "Yemi Desola", 
         email: "user@gmail.com", 
         phone_number: "08102909304"
     }
    flw_ref: "FLW-MOCK-597ae423f1470309edcb5879e3774bfa"
    status: "successful",
    tx_ref: "hooli-tx-1920bbtyt",
    transaction_id: 495000
 }

payment data
Here are all the possible values for payment options available on Flutterwave:
0: "account"
1: "card"
2: "banktransfer"
3: "mpesa"
4: "mobilemoneyrwanda"
5: "mobilemoneyzambia"
6: "qr"
7: "mobilemoneyuganda"
8: "ussd"
9: "credit"
10: "barter"
11: "mobilemoneyghana"
12: "payattitude"
13: "mobilemoneyfranco"
14: "paga"
15: "1voucher"
16: "mobilemoneytanzania"

web hook res
{
    "id": 1245295,
    "txRef": "hooli-tx-1920bbtyt",
    "flwRef": "FLW-MOCK-c293538cdcd65ec79744f241246ee2df",
    "orderRef": "URF_1587826781271_4887235",
    "paymentPlan": null,
    "paymentPage": 40,
    "createdAt": "2020-04-25T14:59:41.000Z",
    "amount": 54600,
    "charged_amount": 54600,
    "status": "successful",
    "IP": "102.89.2.173",
    "currency": "NGN",
    "appfee": 2764.4,
    "merchantfee": 0,
    "merchantbearsfee": 1,
    "customer": {
      "id": 367450,
      "phone": "08102909304",
      "fullName": "Yemi Desola",
      "customertoken": null,
      "email": "user@gmail.com",
      "createdAt": "2020-04-25T13:51:38.000Z",
      "updatedAt": "2020-04-25T13:51:38.000Z",
      "deletedAt": null,
      "AccountId": 27468
    },
    "payment_entity": "1555852ca0687e2e4b6e5d8dccbbb869",
    "entity": {
      "card6": "553188",
      "card_last4": "2950"
    },
    "event.type": "CARD_TRANSACTION"
  }

   */}