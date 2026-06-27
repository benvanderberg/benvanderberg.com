---
title: "Creating Microsoft PowerApps with Adobe Sign"
description: "If you have been paying attention to what Microsoft has been doing with their Power platform in recent years, it is quite impressive. Microsoft PowerApps is a s"
pubDate: 2019-06-21
heroImage: /blog/creating-microsoft-powerapps-with-adobe-sign/01.png
canonicalUrl: "https://medium.com/adobetech/creating-microsoft-powerapps-with-adobe-sign-3fbed7e5707d"
---


If you have been paying attention to what Microsoft has been doing with their Power platform in recent years, it is quite impressive. Microsoft PowerApps is a set of tools to allow you to easily create low-code apps within a web browser that allow you to use them on web and mobile. These apps also connect with all of the connectors inside of Microsoft Flow.

So often I see the main reason users haven’t adopted electronic document workflows is because it adds a hassle to their process. If an employee has three or four apps they have to use just to get their job done, adding another is just unacceptable, so they will go with what they know… paper. If only there was a way to connect those different systems while also being able to create solutions to make it paperless.

This is where Microsoft PowerApps and integration with Adobe Sign can enable really easy ways to empower workers on tablets, phones, etc. to create easy interactive forms, capture signatures, and connect with all of your different systems of record.

To help you with this, here is a guide of some of the easy ways to connect your PowerApps to Adobe Sign. For this guide, we will be focusing on using Adobe Sign with a Canvas app. This guide assumes already basic knowledge of creating a new PowerApp, but there are some good guides for that here.

## What you need

- Microsoft PowerApps Canvas app
- Adobe Sign

## Connecting to Adobe Sign

![](/blog/creating-microsoft-powerapps-with-adobe-sign/02.png)

First, we need to make sure we can connect our app to Adobe Sign. To do this, we need to add a new connector:

1. In the Ribbon, go to View > Data Sources.
2. Click on + Add data source.
3. Click on New connection.
4. In the list of connections, select Adobe Sign.
5. Click Create.
6. Log into Adobe Sign using your credentials to connect to Adobe Sign. If you do not have one, you can create a trial here (sign up for Enterprise).

## Viewing agreements

### Get agreements

Now you have a connection to Adobe Sign, let’s see how we can connect to Adobe Sign to get a list of Agreements.

1. Create a new Gallery using Insert > Gallery from Ribbon. For this example, we are going to use a Vertical Gallery.
2. Select the new Gallery. Rename it AgreementList.
3. In the Properties panel, go to Advanced section.
4. In the Items field, enter:

You will now see that the gallery has been populated with a bunch of records.

We can set the fields for each row reference the data pulled from Adobe Sign. In this example, let’s set a field to the name of the agreement.

1. Select a field in the row, such as the title field.
2. In the Properties panel, go to Advanced section.
3. In the Text field, enter:

It should end up looking something like this:

![](/blog/creating-microsoft-powerapps-with-adobe-sign/03.png)

Here are some of the other fields available:

- name stringName of the agreement
- status stringStatus of the agreement
- agreementId stringUnique agreement ID for the agreement
- displayDate date The display date for the agreement
- latestVersionId stringA version ID which uniquely identifies the current version of the agreement
- displayUserSetInfos array of DisplayUserSetInfoThe most relevant current user set for the agreement. It is typically the next signer if the agreement is from the current user, or the sender if received from another user

You can see a full list of the documentation here:https://docs.microsoft.com/en-us/connectors/adobesign/

### Viewing agreements

If you want to see a PDF preview of an Adobe Sign agreement from within PowerApps, you can use the PDF viewer. In the example, we are going to leverage the AgreementsList gallery in the previous section and use the selected item to view the agreement.

1. Insert a PDF Viewer from Insert > Controls > PDF Viewer from the Ribbon.
2. Select the new PDF Viewer control.
3. Rename the control to AgreementViewer.
4. In the Properties panel, switch to Advanced.
5. In the Document field, enter the following:

Just to understand the call we are making, we are calling Adobe Sign API and requesting the combined PDF. To pass the Agreement ID it needs, we pull it from the selected item in the AgreementList gallery.

![](/blog/creating-microsoft-powerapps-with-adobe-sign/04.png)

## Sending agreements

Now that we know how to view agreements, let’s get an idea of how we can send an agreement using Adobe Sign from within PowerApps. In order to do this, let’s create a new Screen.

For this next part, we are going to walk through how we can create a Send Screen.

### Prepare your screen

To start, add a text field and label for RecipientName, RecipientEmail, and AgreementName. Rename the fields to these names.

You should get something like this:

![](/blog/creating-microsoft-powerapps-with-adobe-sign/05.png)

### Send agreements using PowerApps and Flow

In order to send an agreement from PowerApps, you are going to want to create a Microsoft Flow. While you can technically send one directly calling the CreateAgreement actions from the Adobe Sign connector, however using Flow gives you more flexibility to set conditions, add lookups to other systems, and is a more intuitive UI instead of writing code.

There are a number of ways you can send a document for signature:

- Using a URL to a document
- Using a Library template in Adobe Sign
- Uploading a document from a storage location like SharePoint, BOX, etc. and then sending for signature.

In this example, we are going to send an agreement using a document from a library.

1. Go to Actions > Flows in the Ribbon.
2. Click on Create a new flow.
3. Rename the Flow to SendForSignature (or anything you like).
4. Click New step.
5. Search for Adobe Sign.
6. Select in the Actions list Create an agreement from a library template and send for signature.
7. Rename the action to SendAgreement.
8. Click into the Agreement Name field.
9. In the Dynamic Content panel, select Ask in PowerApps.
10. In Document Library Template field, select your desired Library Template. If you haven’t uploaded one, you learn how to here.
11. In the Recipient Email field, in the Dynamics Content panel, click Show more and select Ask in PowerApps.

You can also set a number of other settings by clicking on Show Advanced Options.

## Get Ben Vanderberg’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

Finally, it is a good idea to return the agreement ID back to PowerApps so you can use it for reference with other calls.

1. Click New step.
2. Search for PowerApps.
3. Select PowerApps.
4. Select Respond to PowerApps.
5. Click Add an output.
6. Click Text.
7. Set the title to AgreementID.
8. In the value, select Agreement ID in the Dynamic Content panel.
9. Click Save.

Your workflow should now look something like this.

![](/blog/creating-microsoft-powerapps-with-adobe-sign/06.png)

Finally, we are going to configure our button to send an agreement.

1. Select your SendForSignature button.
2. Back in PowerApps, go to Action > Flows in the Ribbon.
3. Select your SendForSignature flow.
4. In the OnSelect property, set it to the following:

What this is doing is calling the Flow and passing the parameters, which are the value in the AgreementName and Email fields, that were specified in the Flow. The agreement ID is returned from the Flow, which we are storing in the AgreementID variable.

You should now be able to preview your PowerApp, enter your agreement name and email, and click your button to send it for signature. You can test it by checking the email you specify in Recipient Email field to see if you received an email.

## Getting signing URL

In some scenarios, you may want to actually create an app which allows you to host a signature. Some scenarios might be areas such as signing release forms, model releases, hiring forms, etc.

Adobe Sign for Microsoft Flow connector and PowerApps does not expose the Get Signing URL API. To do this with your app, we are going to have to make a custom HTTP request.

### CAUTION AND DISCLAIMER

Some background and little bit of word of caution: Electronic signatures don’t typically work the same way as your conventional wet signatures. To uniquely identify each signer, Adobe Sign uses an email address for the recipient. When you use the signing URL, you are circumventing the first level of identity verification that is built into Adobe Sign, which is to verify that a person receives an email address. However, the audit report will show that this signature was hosted by which user you set to get the signing URL.

One other thing that you can choose to consider is to utilize one of Adobe Sign’s identity verification methods such as password, phone authentication, Social ID (LinkedIn, etc), Government ID, or other types.

### Configuring Microsoft Flow

For this, we are going to extend upon the Microsoft Flow that we created in our previous steps.

1. Open your SendForSignature Flow.
2. At the top of your Flow after the trigger, add an Initialize variable step. Rename it integrationKey and set the following settings:- Name of Step: integrationKey- Name: integrationKey- Type: String- Value: Create an integration key here. Like this (including Bearer):Bearer abcdefg1234
3. Add another Initialize variable step with the following settings:- Name of Step: statusCode- Name: statusCode- Type: Integer- Value: 404
4. Add another Initialize variable step with the following settings:- Name of Step: signingURL- Name: signingURL- Type: String- Value:
5. Add a new step after SendAgreement which is a Do Until step.
6. Set the Do Until step to be the variable statusCode is not equal to 404.
7. Inside of the Do Until step, add an HTTP action with the following settings:Name of Step: Get Signing URLMethod: GETURI: https://secure.na1.echosign.com/api/rest/v6/agreements/{agreementID}/signingUrlsHeaders: Authorization: Bearer {integrationKey} In the call settings above, replace {agreementID} with the Agreement ID value that comes from the SendAgreement step. Put your integration key in the value that you set in your previous variable called integrationKey.
8. Now, create a Set Variable action after the HTTP request with the following settings:Name: errorCodeValue: Status code from HTTP request.
9. In your Respond to PowerApps step, add a new Output with the type Text.
10. Name the field SigningURL.
11. Click into the value field.
12. In the Dynamic Content panel, switch to Expression and set the following expression:

What this will do is it gets the Signing URL from the HTTP request for the first signer.

Your Flow should now look like this:

![](/blog/creating-microsoft-powerapps-with-adobe-sign/07.png)

### Update PowerApps run request

Now, as the final step, you need to update in PowerApps.

1. Select your Send for Signature button.
2. In the OnSelect property, change it to:

This is setting a variable called AgreementID to be set based on the result of the Flow.

If you want to set it to send the signer to the signing URL, you can set the button to the following:

## Storing signed documents after signature

If you want to store your signed documents in SharePoint or another connector, look no further than the Adobe Sign connectors for Microsoft Flow. Here are some of the common templates.

Based on templates, you can actually add to your Flow the trigger and connector to make it look something like this:

![](/blog/creating-microsoft-powerapps-with-adobe-sign/08.png)

## Summary

Microsoft PowerApps and Adobe Sign are a powerful combination to enable you to create real productivity apps for your teams without having to depend on expensive development. Once you get started, the possibilities are endless to how you can make daily tasks much faster!

## Resources

- Adobe Sign trial
- Getting Started with Microsoft PowerApps
- Create an Integration Key
- Adobe Sign Connector for Microsoft Flow
