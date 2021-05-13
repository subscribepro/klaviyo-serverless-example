const fetch = require("node-fetch");
const crypto = require("crypto");

const HANDLED_TYPES = ["customer.subscribed", "subscription.created"];

const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY;
const SP_SHARED_SECRET = process.env.SP_SHARED_SECRET;
const klaviyoBase = "https://a.klaviyo.com/api";

const klaviyoTrack = async (payload) => {
  try {
    await fetch(
      `${klaviyoBase}/track?data=${Buffer.from(
        JSON.stringify({ ...payload, token: KLAVIYO_API_KEY })
      ).toString("base64")}`
    );
  } catch (error) {
    console.warn(
      `Unable to trigger ${payload.event} for ${payload.customer_properties["$email"]}`
    );
  }
};

exports.handler = async (event, context) => {
  // Netlify event headers are all lowercase
  const spHmac = event.headers["sp-hmac"];
  const eventHmac = crypto
    .createHmac("sha256", SP_SHARED_SECRET)
    .update(event.body)
    .digest("hex");

  if (spHmac !== eventHmac) {
    return {
      statusCode: 403,
      body: `Authorization failed`,
    };
  }
  let webhook;
  try {
    // Netlify body is JSON string and webhook_event is also a JSON string
    webhook = JSON.parse(JSON.parse(event.body).webhook_event);
  } catch (error) {
    return {
      statusCode: 400,
      body: `Bad request`,
    };
  }
  if (!HANDLED_TYPES.includes(webhook.type)) {
    console.log("Dropping event ", webhook.type);
    return {
      statusCode: 200,
      body: `Webhook of type ${webhook.type} is not handled!`,
    };
  }

  // SP data is also a JSON string
  const webhookData = JSON.parse(webhook.data);

  let payload;
  if (webhook.type === "customer.subscribed") {
    console.log("Processing customer ", webhookData.customer_id);
    payload = {
      event: "Customer Subscribed",
      customer_properties: {
        $email: webhookData.customer.email,
        $first_name: webhookData.customer.first_name,
        $last_name: webhookData.customer.last_name,
        customer_id: webhookData.customer_id,
      },
    };
  }

  if (webhook.type === "subscription.created") {
    console.log("Processing subscription ", webhookData.subscription.id);
    payload = {
      event: "Subscription Created",
      customer_properties: {
        $email: webhookData.customer.email,
      },
      properties: {
        ...webhookData.subscription,
      },
    };
  }

  await klaviyoTrack(payload);

  return {
    statusCode: 200,
    body: `Success`,
  };
};
