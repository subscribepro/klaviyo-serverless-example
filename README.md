# Klaviyo Serverless Example

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/subscribepro/klaviyo-serverless-example)

## Overview

Below is a basic example to show how Klaviyo can be used with Subscribe Pro.

For this example, we will be setting up a Klaviyo Flow using Subscribe Pro's `customer.subscribed` and `subscription.created` webhook endpoints.

## Instructions

1. First, log in to Klaviyo and nagivate to ***Account > Settings > API Keys***. Copy the Public API Key and save it for an upcoming step.

    ![Klaviyo Example Step 1a](/images/klaviyo-example-docs-1.png)

    ![Klaviyo Example Step 1b](/images/klaviyo-example-docs-2.png)

2. Log in to the [Subscribe Pro Merchant App](https://platform.subscribepro.com/login) and navigate to ***System > Webhook Endpoints***. Click **New**.

    ![Klaviyo Example Step 2](/images/klaviyo-example-docs-3.png)

3. On the New Endpoint page, enter any example URL in the "Endpoint URL" field (e.g. https://www.example.com/) since we will be updating this field later. Uncheck the box "Subscribe To All Event Types" and uncheck all boxes underneath, leaving only the `customer.subscribed` and `subscription.created` events selected.

4. Copy the contents of the "Shared Secret" field and save it for an upcoming step. Save the new webhook endpoint.

    ![Klaviyo Example Step 3 & 4](/images/klaviyo-example-docs-4.png)

5. Click the **Deploy to Netlify** button at the top of this page.

6. Click **Connect to Github**, then log in using your github credentials and click **Authorize Netlify**.

    ![Klaviyo Example Step 6](/images/klaviyo-example-docs-5.png)

7. A clone of this repo will be created in your Github account. First, give it a name and enter the Klaviyo Public API Key and the Subscribe Pro Webhook Shared Secret from steps 3 and 4.

    ![Klaviyo Example Step 7](/images/klaviyo-example-docs-6.png)

8. Click **Save & Deploy**.

9. Once the site is finished deploying in Netlify, click **Site Settings** and **Change site name**.

    ![Klaviyo Example Step 9](/images/klaviyo-example-docs-7.png)

10. Once you've given the site a name, go to ***Functions > klaviyo***. Copy the Endpoint URL and save it for the next step.

    ![Klaviyo Example Step 10a](/images/klaviyo-example-docs-8.png)

    ![Klaviyo Example Step 10b](/images/klaviyo-example-docs-9.png)

11. In the Subscribe Pro Merchant App, go back to ***System > Webhook Endpoints***. Click the Edit button on the endpoint that you created in step 3 and paste in the Endpoint URL. Click Save.

    ![Klaviyo Example Step 11](/images/klaviyo-example-docs-10.png)

12. Under the Edit button, click the **Enable** button. Then click **Test Connection -  Ping Endpoint**. In Netlify, you should see some new activity in **Functions > klaviyo**.

    ![Klaviyo Example Step 12a](/images/klaviyo-example-docs-11.png)

    ![Klaviyo Example Step 12b](/images/klaviyo-example-docs-12.png)

13. To test that everything is configured properly, go to the site that is connected to the Subscribe Pro environment used in the above steps. Create a new test customer and sign up for a subscription.

14. In Klaviyo, click on **Profiles**. We should see a new customer profile that was created. This customer profile will also now contain the Subscribe Pro customer ID.

    ![Klaviyo Example Step 14](/images/klaviyo-example-docs-13.png)

15. Clicking on the new customer profile should show the two events that were triggered: Customer Subscribed and Subscription Created. Clicking **Details** underneath the Subscription Created event will show all of the data that sent from Subscribe Pro's webhook.

    ![Klaviyo Example Step 15](/images/klaviyo-example-docs-14.png)

16. This data can now be used in Klaviyo's Flows. For example, go to **Flows** and click **Create Flow**. Click "Create From Scratch" and give it a name (e.g. Subscription Created).

    ![Klaviyo Example Step 16](/images/klaviyo-example-docs-15.png)

17. For the Trigger, select Metric and choose the new Subscription Created event. Click Done when finished.

    ![Klaviyo Example Step 17](/images/klaviyo-example-docs-16.png)

18. Drag an Email into the flow underneath the Trigger and configure the contents of this email however you'd like. In our example, we'll select a Klaviyo template and add in the customer's name, email address, and the product SKU that they subscribed to. (See [Klaviyo's docs](https://help.klaviyo.com/hc/en-us/articles/115002779071-About-Using-Event-Variables-to-Personalize-Flows#emails5) for more information about event variables.)

    ![Klaviyo Example Step 18](/images/klaviyo-example-docs-17.png)

    ![Klaviyo Example Step 18b](/images/klaviyo-example-docs-17b.png)

19. After creating the email template, we can use the Preview feature using our sample customer to ensure we've used the right variable names and test the appearance of the email.

    ![Klaviyo Example Step 18c](/images/klaviyo-example-docs-17c.png)

20. We can then click "Manage Flow" and click "Back-Populate Flow Recipients" to send our new Subscription Created email to the sample customer we created.

    ![Klaviyo Example Step 19](/images/klaviyo-example-docs-19.png)

21. Finally, we see that our email has sent and includes the information we pulled from the Subscribe Pro webhook.

    ![Klaviyo Example Step 20](/images/klaviyo-example-docs-18.png)
