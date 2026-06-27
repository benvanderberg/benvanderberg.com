---
title: "Adobe PDF Tools API: Unpacking the October Release"
description: "Over the course of this year, we have been rapidly adding new features of Adobe Document Services. We had some great announcements in March that brought some of"
pubDate: 2021-01-01
heroImage: /blog/unpacking-october-release-adobe-document-services/01.png
canonicalUrl: "https://medium.com/adobetech/unpacking-october-release-adobe-document-services-e9d0919c1b7b"
---


Over the course of this year, we have been rapidly adding new features of Adobe Document Services. We had some great announcements in March that brought some of the release of our new actions to PDF Tools API like Create PDF, OCR, and Export. In July, we followed up that release with a lot of new features with new Lightbox mode in PDF Embed API, Annotations API, XMP metadata API, Compress, Linearize, Protect, Replace, and many more.

In October, we are keeping our momentum and releasing some new updates for you to get the most out of Adobe Document Services. Here are some of the highlights and a deep dive into what they bring for you. All of these are available in NodeJS, Java, and .NET.

## Split PDF

In our previous release, we added the ability for you to combine documents into a single PDF. But what if you want to split a PDF into a number of separate PDF documents?

Join Medium for free to get updates from this writer.

Remember me for faster sign in

In this release, we now added a Split PDF in PDF Tools API so that you can do just that. You can split the document based on:

- Page rangesSpecify which ranges of pages should be split into different documents. For example, if there are three sections, then I can specify the page ranges of each sections to split.
- Number of pagesSpecify the total number of pages per PDF. If I have a 100 page PDF that want to split into smaller files, I can specify that each smaller document will be 10 pages in length.
- Number of documentsSpecify how many documents to split the file into. For example, if I split a 100 page PDF into 4, then each document will be 25 pages.

## Protect PDF

In our last release, we added the ability to add passwords on PDFs. We have improved Protect PDF with the capability to add more granular controls on the protection, including:

- PrintingPrevent someone from printing a document when they have it open. This is ideal for documents with sensitive information.
- EditingPrevent someone from being able to edit the PDF using tools like Adobe Acrobat DC.
- CopyingPrevent someone from copying content from the PDF. For example, if you have sensitive PII information like social security numbers you don’t want someone copying out of the PDF.

## Remove Password

Do you ever have a PDF document that is password protected but now you don’t need the password protection anymore? Remove Password allows you to take your PDF and remove PDF protection. You need the PDF to the document, but it can output a copy of the document without the protection.

## Adobe PDF Extract API

![Extract API (Private Beta) allows you to understand the structure of PDFs to export them into databases or into websites.](/blog/unpacking-october-release-adobe-document-services/02.png)

We released a new private beta of our Adobe PDF Extract API. PDF Extract API is a service that allows you to leverage Adobe Sensei to understand the content structure of PDFs so that you can easily extract information from PDFs in JSON format. While we offer an OCR service as part of PDF Tools API, PDF Extract API goes one step further. It understands the content of the PDF intelligently so that you can extract what elements are headers, paragraphs, lists, and more.

For more information, see the article Priya posted talking about it in more detail and feel free to request access on Adobe IO.

## Summary

We are very excited to be offering more ways you can automate document actions within your organization. With these new updates to PDF Tools API, this will allow you to automate many of the actions that are manual automatically with APIs.

Have a use-case where you want to automate PDFs within your app? Go give it try right now! Learn more about Adobe PDF Tools API as well as how you can incorporate PDFs into your websites using PDF Embed API. We’d love to hear from you! Come join the forum, download our SDKs to try them out.
