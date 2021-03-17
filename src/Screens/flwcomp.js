import React from 'react';
import { useFlutterwave, FlutterWaveButton } from 'react-flutterwave';
import Logo from '../Images/oau-uniconne.jpg'

 
export default function App(prop) {
  const config = {
    public_key: 'FLWPUBK_TEST-820f2c03c668714a10264efb6ec8ef60-X',
    tx_ref: prop.id + Date.now(),
    amount: prop.amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: prop.email,
      phone_number: prop.phone,
      name: prop.username,
    },
    customizations: {
      title: 'Pay For Ads',
      description: 'Payment for Advertisment',
      logo: Logo,
    },
  };
 
  const handleFlutterPayment = useFlutterwave(config);
 
  const fwConfig = {
    ...config,
    text: 'Post Ad',
    callback: (response) => {
        prop.submit(response)
      console.log(response);
    },
    onClose: () => {},
  };
 
  return (
    <div className="App">
      {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
  */}
      {/* <button className="btn btn-warning form-control"
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
                prop.submit(response)
              console.log(response);
            },
            onClose: () => {},
          });
        }}
      >
        
      </button> */}
 
      <FlutterWaveButton className="btn btn-warning form-control" {...fwConfig} />
    </div>
  );
}