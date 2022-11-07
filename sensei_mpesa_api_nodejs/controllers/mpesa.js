const axios = require("axios").default;
require("dotenv").config();

class MpesaController {
  async getOAuthToken(req, res, next) {
    let consumer_key = process.env.consumer_key;
    let consumer_secret = process.env.consumer_secret;

    let url = process.env.oauth_token_url;

    //form a buffer of the consumer key and secret
    let buffer = new Buffer.from(consumer_key + ":" + consumer_secret);

    let auth = `Basic ${buffer.toString("base64")}`;

    try {
      let { data } = await axios.get(url, {
        headers: {
          Authorization: auth,
        },
      });

      req.token = data["access_token"];

      return next();
    } catch (err) {
      return res.send({
        success: false,
        // message: err["response"]["statusText"],
        message: err,
      });
    }
  }

  async lipaNaMpesaOnline(req, res) {
    // get phone number
    // const telNumber = req.body.phoneNumber
    // console.log(telNumber);

    let token = req.token;
    let auth = `Bearer ${token}`;

    //getting the timestamp
    let timestamp = require("../middleware/timestamp").timestamp;

    let url = process.env.lipa_na_mpesa_url;
    let bs_short_code = process.env.lipa_na_mpesa_shortcode;
    let passkey = process.env.lipa_na_mpesa_passkey;

    let password = new Buffer.from(
      `${bs_short_code}${passkey}${timestamp}`
    ).toString("base64");
    let transcation_type = "CustomerPayBillOnline";
    let amount = "1"; //you can enter any amount
    let partyA = req.body.phoneNumber; //should follow the format:2547xxxxxxxx
    let partyB = process.env.lipa_na_mpesa_shortcode;
    let phoneNumber = req.body.phoneNumber; //should follow the format:2547xxxxxxxx
    let callBackUrl = "https://9337-41-60-234-129.in.ngrok.io/mpesa/lipa-na-mpesa-callback"   //= "your-ngrok-url/mpesa/lipa-na-mpesa-callback";
    // let callBackUrl = "https://mydomain.com/path";
    let accountReference = "NC-LTD";
    let transaction_desc = "Payment of Ricky";

    try {
      let { data } = await axios
        .post(
          url,
          {
            BusinessShortCode: bs_short_code,
            Password: password,
            Timestamp: timestamp,
            TransactionType: transcation_type,
            Amount: amount,
            PartyA: partyA,
            PartyB: partyB,
            PhoneNumber: phoneNumber,
            CallBackURL: callBackUrl,
            AccountReference: accountReference,
            TransactionDesc: transaction_desc,
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .catch(console.log);

      return res.send({
        success: true,
        message: data,
      });
    } catch (err) {
      return res.send({
        success: false,
        // message: err["response"]["statusText"],
        message: err,
      });
    }
  }

  lipaNaMpesaOnlineCallback(req, res) {
    //Get the transaction description
    // let message = req.body.Body.stkCallback["ResultDesc"];
    try {
      let message = req.body;
      console.log('message: '+message);
      // console.log(res);
    } catch (err) {
      console.error(err);
      return res.send({
      success: true,
      message:err,
    });
    }
  }
}

module.exports = new MpesaController();
