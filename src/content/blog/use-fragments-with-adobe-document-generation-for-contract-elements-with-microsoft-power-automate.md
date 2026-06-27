---
title: "Use Fragments with Adobe Document Generation for Contract Elements with Microsoft Power Automate"
description: "Whether you are creating contracts, offer letters, whitepapers, or other things, one of the common challenges is that elements get reused across different docum"
pubDate: 2021-01-01
heroImage: /blog/use-fragments-with-adobe-document-generation-for-contract-elements-with-microsoft-power-automate/01.jpeg
canonicalUrl: "https://medium.com/adobetech/use-fragments-with-adobe-document-generation-for-contract-elements-with-microsoft-power-automate-64a1f1119fad"
---


Whether you are creating contracts, offer letters, whitepapers, or other things, one of the common challenges is that elements get reused across different documents, such as contract clauses, specific formattings like addresses, social security format, tags, or blurbs.

Adobe Document Generation API already provides the ability to create fragments. These allow you to take data that you pass to Adobe Document Generation API and have pre-made content fragments that you use across documents that can insert the data you pass into the document. With the Adobe PDF Services connector for Microsoft Power Automate, you can now use this feature with SharePoint, Power Apps, and other tools.

## What’s the difference between Fragments and Merge Data?

Both Fragments and Merge Data will pass content into your document. However, each has a purpose which makes more sense when you are using a system like a CRM or a database. Within a CRM, you likely have a record like an account record which includes information like the name of your customer, address, account status, etc. Usually, this information is personalization information which is what you would pass into a document.

Fragments is geared towards content that you want to pass into the document rather than just data elements. This allows you to separate your content fragments from your merge data. Your Fragments may be less updated than the Merge Data and could be used with all documents that are generated from a system.

For example, maybe you want to place an address like this in your contract or letter:

The data that is getting passed to your document from a CRM:

Without using fragments, for every single template that you create you would have to insert tags like this to get the proper format:

![When you don’t use Fragments, you can place text tags into a document to insert values into a document.](/blog/use-fragments-with-adobe-document-generation-for-contract-elements-with-microsoft-power-automate/02.png)

The issue is that it creates room for human error. You wouldn’t want to have to make sure you paste that correctly every single time. Fortunately, fragments can make that easy. In your Fragments data which you may pass to different templates, it would look like this:

In your document, you would simply just need to insert {{USStreet}} and it will take the values from your Merge Data and merge them in the Fragment:

![Fragments allow you to simplify your tags in your templates.](/blog/use-fragments-with-adobe-document-generation-for-contract-elements-with-microsoft-power-automate/03.png)

That’s a simple example, but there are a lot of repeatable content elements that are much easier to have shorthand when creating templates and allow you to centrally manage the content in apps like SharePoint, Power Apps, Dynamics, or databases rather than having to inject it into Merge Data.

Some other ways Fragments can be used in multiple different scenarios with the data above:

- FullName: Concatenate the first name and last name when it doesn’t in the data.
- LastFirstName: Create different formatting variations from data, such as changing to a last name / first name format.
- PhoneNo: Take a number and use Fragments to format that number so you don’t have to remember how to write that in a template every time.
- SignerPhone: Use Fragments to create easy tags for long Acrobat Sign text tags, like including a field for a signer to write their phone number.
- Sig1: Create a shorthand tag for including a signature tag in a document.
- ConsultingServicesBlurb, TechnicalServicesBlurb, ExecutiveServicesBlurb: Fragments of a blurb about services that could be included in multiple different document templates.

## How can I use fragments with Microsoft Power Automate and Microsoft 365 apps?

![](/blog/use-fragments-with-adobe-document-generation-for-contract-elements-with-microsoft-power-automate/04.png)

Within the Adobe PDF Services connector in Microsoft Power Automate, Fragments is now available for you to utilize to pass Content Fragments to your documents in the Generate document from Word template action.

![The Fragments field in the Generate Document from Word template action allows you to pass Fragments to Document Generation API.](/blog/use-fragments-with-adobe-document-generation-for-contract-elements-with-microsoft-power-automate/05.png)

In the image below, we can see that the values for each of the fragments are in a JSON object with the key and value set for each of the fragments. You can learn more about the structure of Fragments here.

### Converting Microsoft Lists to Fragments

In this example, each of the fragments is stored in a SharePoint list / Microsoft List so that they can easily be managed and maintained. The list is simple: one column for the Title, the second column for the content of the Fragment.

If you are using a SharePoint list / Microsoft Lists to manage your Fragments, then you need to turn your list of items into an object in Microsoft Power Automate.

## Get Ben Vanderberg’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

First, you will need to create a variable:

1. Create a new step and search for Initialize variable.
2. Set your Name to fragments.
3. Set your Type to Object.
4. Set your Value to {}.

![](/blog/use-fragments-with-adobe-document-generation-for-contract-elements-with-microsoft-power-automate/06.png)

Next, you will want to get all of the items in your SharePoint List:

![](/blog/use-fragments-with-adobe-document-generation-for-contract-elements-with-microsoft-power-automate/07.png)

1. In your flow in Microsoft Power Automate, use the Get Items action for SharePoint to get the list of items in your list.
2. Set the Site Address and List Name to the appropriate list in SharePoint.

Next, you will need to then iterate through each of the items in the list to turn them into an object rather than an array.

1. Add a new step.
2. Search for Apply to each.
3. In Select an output from previous steps, use the Dynamic content panel to insert value variable into the field.

![](/blog/use-fragments-with-adobe-document-generation-for-contract-elements-with-microsoft-power-automate/08.png)

Inside of the Apply to each loop, we want to add a property to our fragments variable.

1. Add a new step inside of the Apply to each loop.
2. Search for Compose and select.
3. Click your cursor in the Inputs field.
4. In the Dynamic content panel, click on the Expression tab.
5. In the function, we need to use the addProperty() function to add a property.

Here is a sample:

In the code above:

- variables('fragments') means it will add the property to the fragments object variable we created before.
- items('Apply_to_each')?['Title'] means that it will set the property name to the Title field in my SharePoint list.
- items('Apply_to_each')?['Value_x002d_NoRichText']) means that it will set the value of the property to the Value NoRichText field in SharePoint.

Once you have that set with your field names, then click Update to insert it into your Compose action.

Then, you will need to update the variable.

1. In the Apply to each action, add a new step.
2. Search for Set variable and select.
3. In the Name field, set it to fragments.
4. In the Value field, use the Dynamic content panel to insert the Outputs variable from Compose.

This should now create an object with the key-value pairs of the fragments.

### Creating your Document Generation action

1. In Power Automate, click to add a new step.
2. Search for Adobe PDF Services and select.
3. Select Generate document from Word template.
4. In the Template File Name, set it to whatever you desire as long as it ends with .docx.
5. In the Merge Data, pass the data that you want to insert into the document.
6. In Template File Content, pass the File Content of your Word template. You can use the Get File Content action for OneDrive, SharePoint, or any of the other file connectors to get that data.
7. Click Show Advanced Options.
8. In the Fragments field, insert your cursor into the field.
9. Using the Dynamic content panel, click on Expressions.
10. For this scenario, we can type string(variables('fragments')) . This will convert the JSON object variable into a string.

Once you are done, you can then save the document to SharePoint or a different file repository.

One final step before passing the Fragments to the Generate document from Word template action is you need to convert the JSON object into a string.

![Adobe Document Generation API allows you to dynamically push data into documents and use content fragments.](/blog/use-fragments-with-adobe-document-generation-for-contract-elements-with-microsoft-power-automate/09.png)

A full view of the sample flow is here:

![Final flow in Microsoft Power Automate.](/blog/use-fragments-with-adobe-document-generation-for-contract-elements-with-microsoft-power-automate/10.png)

## Final thoughts

Fragments provides a great way to manage content within your contracts, agreements, letters, or any other documents you generate with Adobe Document Generation API. Using the Adobe PDF Services connector in Microsoft Power Automate, it gives you the ability to use Fragments with any of the 600+ connectors in Microsoft Power Automate. You can get started and try today for free.
