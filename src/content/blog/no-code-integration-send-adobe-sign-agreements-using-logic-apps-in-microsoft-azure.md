---
title: "No Code Integration: Send Adobe Acrobat Sign Agreements Using Logic Apps in Microsoft Azure"
description: "When creating applications, it is not uncommon to have a process that explicitly requires a signature, a form, or an approval process on a set of documents. Oft"
pubDate: 2019-02-19
heroImage: /blog/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure/01.png
canonicalUrl: "https://medium.com/adobetech/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure-a4b864c5b8c"
---


When creating applications, it is not uncommon to have a process that explicitly requires a signature, a form, or an approval process on a set of documents. Often, these end up causing users to download a PDF, print the document, etc. With the dawn of e-signature and form technologies like Adobe Acrobat Sign, we can easily turn this into a 100% digital process.

Adobe Acrobat Sign can be integrated into your Azure functions using Logic Apps, making it really easy for you to add functionality without burning additional development hours. Let’s walk through the simple process to do this.

## Prerequisites

- Microsoft Azure portal
- Adobe Acrobat Sign subscription (You can get a developer account here.)

## What is Logic Apps?

Logic Apps is part of Microsoft Azure and allow developers to design workflows that articulate intent via a trigger and series of steps. It is an easy GUI interface within the Microsoft Azure portal and has more than 250 out-of-the-box connectors including Adobe Acrobat Sign, Adobe Creative Cloud, Slack, and others. You can easily hook into Logic Apps, and then it takes care of communicating with Adobe Acrobat Sign without needing to learn the Adobe Acrobat Sign APIs .

If you’re familiar with Microsoft Power Automate, Microsoft Power Automate is built on top of Logic Apps and you will feel right at home. Logic Apps is more geared towards developers creating easy no-code connectors, while Microsoft Power Automate is geared towards IT and end-users.

## Creating a Logic App

![](/blog/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure/02.png)

1. Log in to Microsoft Azure portal.
2. Click on Create a resource.
3. Search for “Logic App (Consumption)” and select it.
4. Click Create.
5. Set your parameters for your Logic App:

- Name SendAgreement
- Subscription Free Trial
- Resource Group Ex. AdobeSign
- Location Ex. Central US
- Log Analytics Ex. Off

Once you are ready, click Review + create.

Now that your resource has been created, you will receive a notification in the top right corner of your screen. Click on Go to resource.

In the next sections, I will walk-through some examples of how you can do common calls to Adobe Acrobat Sign, assuming that you can start a new Logic App using the instructions above.

## Configuring your Logic App

### Send Adobe Acrobat Sign agreement

![Creating a Logic App is very similar to creating a flow in Microsoft Power Automate.](/blog/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure/03.png)

Now that you have created your Logic App, the Logic App Designer is now asking you if you want to use a template (see screenshot above). While you can choose any of the triggers you desire, in this example we will use an HTTP request.

To send a document for signature, you need to either use an Adobe Acrobat Sign library template, or you need to upload a document as a transient document first before sending an agreement. In this example, we will upload a document.

We are going to use an example Offer Letter PDF file. In Microsoft Power Automate, you will need to add the following steps to upload a transient document:

- Get file content using path (OneDrive)In this example we are using OneDrive, but you can use a variety of other connectors such as BOX, Dropbox, SharePoint, etc.
- Upload a document and get a document ID (Adobe Acrobat Sign)Uploads a document as a transient document and returns a document ID for reference.
- Create an agreement from an uploaded document (Adobe Acrobat Sign)Sends an agreement for signature

![](/blog/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure/04.png)

Set up trigger

1. Click on When an HTTP request is received in the list of common triggers.
2. Click on Use sample payload to generate schema.
3. We are going to create a basic schema that can be posted to this HTTP request to pass information. Paste the following into the block:{ "Agreement Name":"", "Email":"", "File Path:"", "File Name":"", "Employee First Name":"", "Employee Last Name":"", "Employee Full Name":"", "Manager Full Name":"", "Manager Email":"", "Salary":"", "Start Date":"" }
4. Click Done. This will convert your JSON into a schema for the HTTP request to understand.

Setting the method is simply for demonstration purposes. It would make more sense for you to configure a POST request, which you can learn more about here.

## Get Ben Vanderberg’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

Get file content using path

![](/blog/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure/05.png)

Before we set up this step, we are going to use a Word document to upload into OneDrive that looks like this:

![](/blog/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure/06.png)

What you will notice is that there are Adobe Acrobat Sign Text Tags in the document. The reason for this is we are going to use the Adobe Acrobat Sign connector in Logic Apps to merge information into the document. Here is a list of each of the text tags used. To learn more about Adobe Acrobat Sign Text Tags, see here.

- {{!EmployeeFirstName}}
- {{!Title}}
- {{!Salary}}
- {{!StartDate}}
- {{Sig1_es_:signer1:signature}}
- {{Sig2_es_:signer2:signature}}

1. Click on New step.
2. Search for “Get file content using path.”
3. Under File Path, use the Dynamic Content panel to add File Path variable into the field. This will allow you to pass the variable from the HTTP request into the connector.
4. Set Infer Content Type to Yes.

Upload a document and get a document ID

![](/blog/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure/07.png)

1. Click on New step.
2. In File Name, use the Dynamic Content panel to set the field to the File Name variable from the HTTP request.
3. In File Content, use the Dynamic Content panel to add File content variable from OneDrive connector into this field.NOTE: If you are using a different source, such as SharePoint, or OneDrive, you might set your filename to include the file extension to ensure the Adobe Acrobat Sign service recognizes your file type.

Upload a document and get a document ID

![](/blog/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure/08.png)

1. Click on New step.
2. Set Agreement Name using the Dynamics Content panel to input the File Name variable from the HTTP request.
3. Set your Document ID using the Dynamic Content panel and select Document ID from the list.
4. Set Recipient Email using the Dynamic Content panel to the Manager Email variable.
5. In Message, set the message that will display in the notification emails.
6. Click on Add new parameter.
7. Select the following items using checkboxes. These fields will get added to your step. Below the items that look like this should be variables you set using the Dynamic Content panel. You will want to set them with the following settings:

- Recipient Email (2): Employee Email
- Recipient Signing Order (2): 2
- Recipient Role (2): Signer
- Form Field Name (1): EmployeeFirstName
- Form Field Value (1): Employee First Name
- Form Field Name (2): ManagerFullName
- Form Field Value (2): Manager Full Name
- Form Field Name (3): Salary
- Form Field Value (3): Salary
- Form Field Name (4): Start Date
- Form Field Value (4) StartDate

You should end up with something like this:

![](/blog/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure/09.png)

If you want to add some more parameters, such as additional signers, fields to merge into the the documents, etc., you can add additional parameters below.

Click on Save to finally save your Logic App.

![](/blog/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure/10.png)

## Testing your Logic App

Since this flow is triggered using an HTTP request, we can easily test this using Postman.

![](/blog/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure/11.png)

1. In the Logic App Designer, click on a When HTTP request is received step.
2. Click on the Copy button next to the generated URL.
3. Open Postman.
4. Do an HTTP Request to:

- Method: POST
- URL: URL provided by Logic App
- Body (Sample):{ “Agreement Name”:”Offer Letter”, “Employee First Name”:”John”, “Employee Last Name”:”Echostone”, “Employee Email”:”/**First Email Address*/”, “Manager Full Name”:”/**Manager Name*/”, “Manager Email”:”/**Second Email Address*/”, “Salary”:”/**First Email Address*/", “Start Date”:”5/1/2019", “File Path”:”/Document.docx”}

### Final thoughts

Logic Apps are an extremely powerful, easy way to create connections between your different cloud apps (including Adobe Acrobat Sign) and your apps in Azure. Consider also looking at some of the ways you can also use the Adobe Creative Cloud connector in Logic Apps to automate things within your creative teams!

### Resources

- Logic Apps
- Logic Apps Documentation
- Connecting with Azure Functions
- Adobe Acrobat Sign Logic Apps connector
- Adobe Creative Cloud Logic Apps connector
