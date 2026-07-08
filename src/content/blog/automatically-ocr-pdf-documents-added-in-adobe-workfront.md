---
title: "Automatically OCR PDF Documents Added in Adobe Workfront"
description: "Set up a Workfront Fusion scenario in just a few minutes to automatically OCR scanned PDF documents added to your Adobe Workfront projects, making them searchable and accessible."
pubDate: 2022-03-16
heroImage: /blog/automatically-ocr-pdf-documents-added-in-adobe-workfront/01.png
canonicalUrl: "https://medium.com/adobetech/automatically-ocr-pdf-documents-added-in-adobe-workfront-42bb5df210a2"
---

Ben Vanderberg highlighted

## Create a Scenario in Workfront Fusion in just a couple of minutes to automatically OCR your scanned PDFs in your Workfront projects.


When working on a client project, many documents collect over time. It might be the invoices and receipts for different parts of the projects. It might even be the receipts for the swag for that latest conference or when you take clients out to dinner. There can be a lot of documents associated with a project.

While many documents might be ideally digital, many of them, like receipts or documents that get signed by hand, are scanned, are often are not searchable. Instead of selecting text in those scans to copy for your reports, you have to type instead by hand, which can be prone to human error.

Fortunately, Workfront has a convenient tool with Workfront Fusion to solve this automatically whenever you upload files to your project. With the new Adobe PDF Services and Acrobat Sign connections, you can use optical character recognition so that any of your scanned PDF documents are searchable and selectable.

In this article, we’ll explore how you can create easy Scenarios (Workfront terminology for an automated workflow) in just a couple of minutes to automate everyday document actions with Workfront Fusion using Adobe PDF Services connector. We’ll see how to automatically OCR PDF documents added to Workfront projects.

## What you will need

Adobe Workfront Fusion is available as a module with Adobe Workfront. Adobe PDF Services is available to get started using for free. For higher volumes, Adobe PDF Services can be purchased as part of an enterprise agreement.

## Create a new scenario

You will first need to create a new Scenario.

![](/blog/automatically-ocr-pdf-documents-added-in-adobe-workfront/02.png)

You will first need to create a new Scenario.

1. Log in to Workfront Fusion.`
2. Click on + Create a new scenario.

## Create trigger

![](/blog/automatically-ocr-pdf-documents-added-in-adobe-workfront/03.gif)

Next, when prompted to choose a trigger action, we’ll set the action for when a new document gets added to a project.

1. Select Adobe Workfront.
2. Under trigger, select Watch Record.
3. When prompted to configure the trigger, set your connection. If you don’t have a connection already created, click Add to connect to your Workfront environment.
4. Under Filter, select New and Updated Records.
5. Under Record Type, set it to Document.
6. For Outputs, select ID and Project ID.
7. Click OK.
8. When prompted to Choose where to start, select from now on and click OK.

![](/blog/automatically-ocr-pdf-documents-added-in-adobe-workfront/04.png)

## Download document

![](/blog/automatically-ocr-pdf-documents-added-in-adobe-workfront/05.gif)

Now that we have the trigger setup, we next want to download that document to pass it to PDF Services.

1. Click on the + symbol to add a new action.
2. Click Adobe Workfront.
3. Select Download Document.
4. In the Document ID field, set it to ID variable.
5. Click OK.

![](/blog/automatically-ocr-pdf-documents-added-in-adobe-workfront/06.png)

## OCR document with Adobe PDF Services

![](/blog/automatically-ocr-pdf-documents-added-in-adobe-workfront/07.gif)

Now that we have the document downloaded, we need to pass it to Adobe PDF Services. Fortunately, Adobe PDF Services is included as part of Workfront Fusion to allow you to add the step easily.

1. Click + symbol to add a new action.
2. Click + Add another module.
3. Select Adobe PDF Services.
4. Select OCR for a PDF File.
5. Click OK.

## Upload document

![](/blog/automatically-ocr-pdf-documents-added-in-adobe-workfront/08.gif)

When the PDF is processed, we need to upload the file back into Workfront.

1. Click + symbol to add a new action.
2. Select Adobe Workfront.
3. Select Upload Document.
4. In the Related Record ID field, set it to the projectId variable from the Watch Record action.
5. In the Related Record Type field, select project.

## Test your scenario

![](/blog/automatically-ocr-pdf-documents-added-in-adobe-workfront/09.gif)

To test your scenario, upload a document to your Workfront project. Within Workfront Fusion, you can click Run Once to test the scenario. When you look in Workfront, you will see a new copy of the file saved within your documents. When you open the file, you then see that you can select the text in the PDF.

## Get Ben Vanderberg’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

If you don’t want duplicate files, you can create an extra action to delete the original file.

## Final thoughts

Workfront Fusion is a great way to create quick and easy workflows. In just a couple of minutes, you can start automating many document actions. You can also use Workfront Fusion to connect to over 70 connectors such as Adobe Acrobat Sign, Creative Cloud, Salesforce, Microsoft Dynamics, Google Workplace, databases, and many other connectors.

To learn more about some of the tools available through the Adobe PDF Services connector in Workfront Fusion, such as Document Generation, PDF Extract, and many others, see Adobe Document Services.

If you also want to learn more, please join us at our session at Adobe Summit where we are showcasing using Workfront Fusion, Adobe Document Services, and Acrobat Sign together:

UPDATE (08/24/2023): Updated the article to reflect that Adobe PDF Services is available to start using with Workfront Fusion for free, but higher volumes may require enterprise licensing.

## Automating Document Workflows for Digital Transformation

### Attend this session to learn how to automate document workflows with Workfront Fusion using data from Adobe Workfront…

business.adobe.com
