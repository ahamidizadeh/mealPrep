import { fetchOrderDetails } from "../services/doordashService.js";

export async function getOrderDetails(req, res) {
  const { orderId } = req.params;
  try {
    const details = await fetchOrderDetails.fetchOrderDetails(orderId);
    res.json(details);
  } catch (error) {
    // Handle errors, such as sending a 500 status code
    res.status(500).send(error.message);
  }
}
