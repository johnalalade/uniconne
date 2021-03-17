import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Logo from '../Images/oau-uniconne.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FlutterwaveHook(prop) {
  const config = {
    public_key: process.env.REACT_APP_FLWPUBK || 'FLWPUBK_TEST-e4559d7f4504921e2c5623c67d86a2ff-X',
    tx_ref: prop.id + Date.now(),
    amount: prop.amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: prop.email,
      phonenumber: prop.phone,
      name: prop.username,
    },
    customizations: {
      title: 'Pay For Ads',
      description: 'Payment for Advertisment',
      logo: Logo,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <button className="btn btn-warning form-control"
        onClick={() => {
            if (prop.img4 === null && prop.adwords === "") {
                toast.error("Please add a post (image/video or posts)")
            }
            else if(prop.username === ""){
                toast.error("Please add a bussiness name or your username")
            }
            else if(prop.url && prop.url.indexOf('https://') == -1 || prop.url.indexOf('https://') > 1){toast.warning("Please add a valid url starting with 'https://")}
            else{
          handleFlutterPayment({
            callback: (response) => {
                prop.submit(response)
               console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }
        }}
      >
        Post Ad
      </button>
      <ToastContainer/>
    </div>
  );
}