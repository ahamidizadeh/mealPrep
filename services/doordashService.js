import { token } from "./authService.js";
import axios from "axios";

export async function fetchOrderDetails(orderId) {
  const body = JSON.stringify({
    external_delivery_id: "D-1763",
    pickup_external_business_id: "a0720d55-7cbe-41ce-8185-58285b7985cd",
    pickup_external_store_id: "ed178ef3-b486-4ce8-8baa-5bc9f0f3fa4a",
    pickup_address: "901 Market Street 6th Floor San Francisco, CA 94103",
    pickup_business_name: "Wells Fargo SF Downtown",
    pickup_phone_number: "+16505555555",
    pickup_instructions: "Enter gate code 1234 on the callbox.",
    dropoff_address: "901 Market Street 6th Floor San Francisco, CA 94103",
    dropoff_business_name: "Wells Fargo SF Downtown",
    dropoff_phone_number: "+16505555555",
    dropoff_instructions: "Enter gate code 1234 on the callbox.",
    order_value: 1999,
    contactless_dropoff: false,
    action_if_undeliverable: "return_to_pickup",
    items: [
      {
        // required
        name: "Chicken Burrito",
        quantity: 2,
        // optional
        description:
          "A tasty oversized burrito with chicken, rice, beans, and cheese.",
        // optional for regular deliveries, required for Dasher Shop & Stage and Dasher Shop & Deliver
        external_id: "418575",
      },
    ],
  });
  //   const body = JSON.stringify({
  //     external_store_id: "ed178ef3-b486-4ce8-8baa-5bc9f0f3fa4a",
  //     name: "Neighborhood Deli #10",
  //     phone_number: "+12065551212",
  //     address: "901 Market Street, 6th Floor, San Francisco, CA, 94103",
  //   });
  const external_business_id = "a0720d55-7cbe-41ce-8185-58285b7985cd";
  axios
    .post(`https://openapi.doordash.com/drive/v2/deliveries`, body, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
fetchOrderDetails();
