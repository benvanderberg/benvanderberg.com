---
title: "Detect Untagged PDFs for Accessibility with Microsoft Power Automate"
description: "PDF documents come in a lot of different shapes and sizes. Unfortunately, many PDF libraries do not optimize PDF documents for accessibility, which helps people"
pubDate: 2021-01-01
heroImage: /blog/detect-untagged-pdfs-for-accessibility-with-microsoft-power-automate/01.png
canonicalUrl: "https://medium.com/adobetech/detect-untagged-pdfs-for-accessibility-with-microsoft-power-automate-85acb970345c"
---

## Use metadata in PDF documents to automate document workflows.


PDF documents come in a lot of different shapes and sizes. Unfortunately, many PDF libraries do not optimize PDF documents for accessibility, which helps people with disabilities use screen readers to reliably read PDF content. Untagged PDFs do not meet many of the legal standards of accessibility, and PDF tagging is often overlooked when documents are published.

Adobe PDF Services can be used to identify PDF documents that are not tagged. Using the Adobe PDF Services connector in Microsoft Power Automate allows you to get metadata about your PDF documents that can help flag documents and determine what processing you need to complete on the PDF.

Here are some of the data elements that are provided that can be used to help inform the logic in your workflow:

For this scenario, there are a few items we can use to help identify whether a document has characteristics that show that it is optimized for screen readers:

- is_tagged: Determines whether the document contains tags in the context for screenreaders.
- pdfua_compliance_level: Whether the document declares itself as PDF/UA compliant (PDF/UA is the open standard for accessible PDF documents).

Important disclaimer: This metadata will tell you if the document has a tag tree embedded and whether the PDF identifies itself as PDF/UA compliant, but that doesn’t determine the quality tags in the document. This should not be the only step for your organization to check and remediate documents, but it can be a helpful indicator of documents that are missing key elements.

## Scenario

In this scenario, we are creating a flow that when a PDF is dropped in a folder, it will use Adobe PDF Services to get the PDF properties to check whether the document is tagged or not or a PDF/UA document. If not, it will change the metadata in SharePoint to flag that document.

## Setup SharePoint

In SharePoint, we have a Document Library that has a column called “Status,” which contains the choice of “PDF/UA,” “Not Tagged,” or “Approved.”

For this demo, we will use a column in the Document Library to update if the document is accessible or not.

![For this demo, we will use a column in the Document Library to update if the document is accessible or not.](/blog/detect-untagged-pdfs-for-accessibility-with-microsoft-power-automate/02.png)

## Pre-requisites

- Adobe PDF Services key, which you can get a free trial here
- Microsoft Power Automate with access to Premium connectors
- Microsoft SharePoint*

*You do not strictly need to use Microsoft SharePoint as Microsoft Power Automate also has connectors for BOX, Dropbox, OneDrive, and a variety of other connectors.

## Building Your Flow

![](/blog/detect-untagged-pdfs-for-accessibility-with-microsoft-power-automate/03.png)

This flow scenario uses two connectors: SharePoint and Adobe PDF Services. Here is the breakdown of each of the steps:

### When a file is created in a folder (SharePoint)

This is the trigger of the flow which will start when a file is dropped in the specified folder. In this case, we have a folder called “Accessible Docs” in the SharePoint site.

### Get file content (SharePoint)

This action gets the file content of the PDF stored in SharePoint. This will be used in a future step to pass to Adobe PDF Services. In the File Identifier field, you can set it to x-ms-file-id from variable from the trigger.

### Get file metadata using path (SharePoint)

In this action, we are getting the metadata about the document in SharePoint, including columns and information about the document. Your file path is the x-ms-file-path-encoded variable.

### Get PDF Properties (Adobe PDF Services)

This action will allow you to get information about your PDF, like the information shown earlier in this article. If this is your first time using Adobe PDF Services, you can get a free trial here to create your key. For the inputs:

- Input File Name: It can be whatever name you want it to be as long as it ends with PDF.
- Input File Content: Set this to be the File content from the Get file content step.
- Get Properties Page Level: This gets information like whether there are images, whether it is scanned, etc., for each page. We do not need this information for this scenario, but it is helpful to check out.

![](/blog/detect-untagged-pdfs-for-accessibility-with-microsoft-power-automate/04.png)

### Condition: If PDF Tagged

In the next step, we want to have a condition to determine whether the PDF is tagged or not. If it is, then we want to change the status in SharePoint to “Tagged.” If yes, then we will check if the document is a PDF/UA document and if it is set as PDF/UA status. If not either, then Untagged. This can then be used to report which ones absolutely need to be reviewed.

## Get Ben Vanderberg’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

In this condition, we want to use the Dynamic content panel to set the condition to PDF Tagged is equal to true.

![](/blog/detect-untagged-pdfs-for-accessibility-with-microsoft-power-automate/05.png)

When you create the condition, it creates a path for “Yes” and “No.”

### If Yes: If PDF Tagged

![](/blog/detect-untagged-pdfs-for-accessibility-with-microsoft-power-automate/06.png)

Under If Yes, we want to check to see if the PDF identifies itself as PDF/UA-1 compliant. If yes, then we want to change the Status to PDF/UA. If not, then we want to set it to Tagged.

### Update file properties

Under both, If yes and If no, we want to add an Update file properties action. Both of them will have the same Site Address and Library Name as in previous SharePoint actions in the flow.

For the Id, set both of them to the ItemId variable from the Get file properties action in the previous steps.

Under the If yes path, set the Status Value to PDF/UA. Under the If no path, set Status Value to Tagged.

### If No: If PDF Tagged

If the PDF is not tagged, then we want to add an Update file properties action to change the Status value in SharePoint to Not Tagged.

![](/blog/detect-untagged-pdfs-for-accessibility-with-microsoft-power-automate/07.png)

### Test your flow

Now that you have that setup, you can save your flow and test. When using SharePoint, where your trigger is dropping into a folder, it is recommended that you click the Test > Manually button in Power Automate as it triggers SharePoint to check more often. Otherwise, those updates are not as instant.

![](/blog/detect-untagged-pdfs-for-accessibility-with-microsoft-power-automate/08.png)

You can test your flow by dropping your files into the specified SharePoint folder. If successful, you should be able to see the status change based on whether your document is tagged or not.

### How to manually check in Adobe Acrobat DC

If you want to check this information manually in your PDF documents, you can do that by opening your document in Adobe Acrobat DC:

To check whether the document identifies as conforming to the PDF/UA-1 standard, click on the Standards button in the sidebar:

![](/blog/detect-untagged-pdfs-for-accessibility-with-microsoft-power-automate/09.png)

If you want to check whether the document is tagged or not, there are two ways. The first way is to look at your File Properties by going to File > Properties and selecting the Description tab.

![Document Properties menu allows you to see information about the document.](/blog/detect-untagged-pdfs-for-accessibility-with-microsoft-power-automate/10.png)

The second way is to see is using your the Tag sidebar, where you can see if there is a Tag tree in the document.

The tag sidebar allows you to see the tag structure in the PDF document.

![Tag sidebar allows you to see the tag structure in the PDF document.](/blog/detect-untagged-pdfs-for-accessibility-with-microsoft-power-automate/11.png)

## Final thoughts

Adobe PDF Services provides a great way to be able to get information about your PDFs to help inform how you want to automate those PDFs. Being able to detect what documents are tagged can help identify which ones need to get remediated, which can be done with Adobe Acrobat DC.

To get started using Adobe PDF Services, try the service and get started using it within Microsoft Power Automate.
