---
title: "Merging Data with Documents Using Adobe Document Generation API"
description: "When you think of Adobe, you might think of Adobe Acrobat on your computer for creating PDFs. However, Adobe has a lot of developer-friendly cloud-based APIs to"
pubDate: 2021-05-06
heroImage: /blog/adobe-document-generation-api/01.png
canonicalUrl: "https://medium.com/adobetech/adobe-document-generation-api-69176a506ff5"
---

When you think of Adobe, you might think of Adobe Acrobat on your computer for creating PDFs. However, Adobe has a lot of developer-friendly cloud-based APIs to allow you to do many of the actions you would do in Adobe Acrobat. For example, Adobe PDF Tools API allows you to create PDFs, export them into different formats, extract pages, etc. These are extremely useful for quick tools to incorporate in your app. It’s easy to get started with a pay-as-you-go subscription on AWS that include a free two-week evaluation to try out all the APIs. After your evaluation period, you only pay for what you use.

Adobe Document Generation API allows you to take your JSON data and easily merge it to create PDF or Word documents.

There are also a lot of documents that need data merged into them. For example, if your app is creating contracts, invoices, statements of work, or proposals, you not only need to create a PDF, but you want to format and merge data into the document. These may be from data sources like an ERP, CRM (SalesForce, Microsoft Dynamics, etc.), or a database.

## The Challenges

There are a couple of ways that this is often done in an app. You might have a Word document that you create on your computer then upload it and may even take that document and send it with tools like Adobe Sign. You might have a library that you use to create that, but the design may all be done in code and the result is a few challenges:

- Template creation is done by a developer, whether through code or custom and complex tools. This means any changes require a development cycle.
- Many tools have limitations on how you can build templates, and whether images and other types of content can be easily inserted into documents automatically.
- These tools may output low fidelity design or use bad PDF libraries that don’t create indexable PDFs.
- Many services are on-premise or dependent on expensive subscriptions as part of a CRM product.
- Not all PDFs outputted from these systems create good, indexable PDFs. Even then, sometimes they still need to be edited or negotiated, like contracts.

Fortunately, Adobe Document Generation API, which is part of Adobe PDF Tools, can help address this problem.

## What is Document Generation API?

![](/blog/adobe-document-generation-api/02.png)

Adobe Document Generation API is a cloud-based service that allows you to design and create document templates in Microsoft Word and dynamically generate documents that output as PDF or Microsoft Word (DOCX) format.

When a document is sent to be generated, JSON data and the template are passed to Adobe Document Generation API and it returns a PDF or DOCX file. Templates are easily created using Microsoft Word documents and there is an easy tagging tool so that your designers of the document templates don’t need to know how to write code. Simple and easy. If you are integrating this onto your website, you can even display the generated document using Adobe PDF Embed API or even protect your documents using Adobe PDF Tools API.

Here is a quick video on how the Adobe Document Generation Tagger works:

## Key Features

Simple and easy template creation

![](/blog/adobe-document-generation-api/03.png)

Adobe Document Generation Tagger is an add-in for Microsoft Word that allows you to easily tag your documents. You can import your JSON sample data and select where you want tags to be placed. You don’t need to be a developer to be a template designer — it’s easy to configure yourself. While you don’t have to use the add-in to tag your documents, it is very to use as a non-developer.

If you are looking for more advanced tags, Adobe Document Generation tags are based on JSONata, so that you can add complex logic and conditions in your templates. There are some great articles that help you learn more of how to get the most of your templates, and a great tutorial to get started.

Supports complex datasets

Unlike other document generation tools where your data is dependent on how the tool accepts data, Adobe Document Generation API uses the philosophy of “Bring Your Own Data Model”. It accepts your JSON data and structure, so you don’t have to spend time refactoring your data to fit a template, rather you can fit your template to the data. This means your data’s text, arrays, nested objects, repeating values, etc. are supported and can be mapped into templates.

Text tags

Text can be merged into documents wherever a tag is placed.

### Image tags

![](/blog/adobe-document-generation-api/04.gif)

Any image in your document can dynamically change based on your data. Images can be passed as Base64 and replace other images in your template, so you can create personalized images in documents easily. It means you have a lot of flexibility to pass images, and here is an article helping provide tips using Image tags.

### Conditional text

![](/blog/adobe-document-generation-api/05.gif)

Define parts of your document to only show when a certain value is true. For example, if you have a clause that should only show if a customer’s address is set to the state of California. For a more advanced deep dive on conditions, there is an article here.

### Numerical calculations

![](/blog/adobe-document-generation-api/06.gif)

Calculate the sum, average, etc. of a set of values inline when the document is generated. For example, if you wanted to calculate the total cost of a list of items in a table, you can do that via an easy calculation.

### Tables and Lists

![](/blog/adobe-document-generation-api/07.gif)

Output a variable number of table rows based on data. For example, if you have a list of products, convert them into a table in the document.

### Adobe Sign tags

![](/blog/adobe-document-generation-api/08.gif)

In Adobe Document Generation Tagger, you can also use the tagger to place Adobe Sign text tags into your document, so that your document is ready to be passed to Adobe Sign for e-signature.

## Easy for developers to use

Adobe Document Generation API is so simple to use, and you don’t need to write a lot of code. In fact, there are SDKs and sample code available to help you get started for many languages including:

## Get Ben Vanderberg’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

· REST APIs

· Node

· Java

· .NET

· Postman collections

It’s very easy to incorporate Adobe Document Generation API into functions like an Azure or AWS Lambda functions. Adobe PDF Tools is free to get started and available as a subscription on AWS Marketplace to easily get setup within your app.

## Additional PDF actions

One common scenario is that you may not only just need to generate a document, you may also want to assemble from a number of other documents. For example, you may want to combine with supporting PDF or other documents into one PDF. Because Adobe Document Generation API is part of Adobe PDF Tools, you can utilize it with the other actions available such as:

- Combine with other PDF documents such as appendices.

- OCR supporting scanned documents

- Protect your PDF from viewing, editing, printing, etc.

- Export into different formats using Export PDF.

Documents generated can also get sent for signature using Adobe Sign. There are a number of different turn-key integrations for Adobe Sign, but you can also leverage via API. You can get a free developer account for Adobe Sign here and there is a good guide for getting started, as well as an article of best practices with Adobe Sign API.

If you want to render your generated PDF on a website, have a look at Adobe PDF Embed API, which is a free client-side library for your website to embed PDFs inline in your webpage and get analytics. There is a great online interactive demo to play around with, and you there was a recent session at Adobe Summit (it’s free signup) which walks through getting started with PDF Embed API.

## Use-cases

Imagine how often someone in your organization manually inputs information from a system into another project. It happens a lot, doesn’t it? What if you could make that easier? Adobe Document Generation API is great for:

- Contracts and sales proposals

- NDA creation

- Employee offer letters

- And many more…

## How to get started

Go to AWS Marketplace to subscribe for the free two-week evaluation that includes 500 document transactions to get started. During the subscription process you’ll receive your API credentials and download the SDKs. After your free evaluation, you’ll only pay for the transactions you use.

Other helpful resources:

- Go to the developer resources page for tutorials

- Review some of the use-cases you can use this with

- Review the documentation, where you can watch the tutorial videos

- Go to the forums for help

Adobe Document Generation API is really a powerful tool to make it easy to generate documents. Its extremely easy to get started with and is appealing to both developers and non-developers who need to create document templates.

## Suggested articles

## Hands On with Adobe Document Generation API

### Adobe is proud to announce the availability of the Document Generation API as part of Adobe Document Services. Learn…

medium.com

## If This Then That: Conditional Logic and Document Generation

### A deep look at conditional logic in Document Generation.

medium.com

## 8 Tips for Using Images with Adobe Document Generation API

### Learn quick tips on how to best use images for dynamically generating documents using Adobe Document Generation API.

medium.com
