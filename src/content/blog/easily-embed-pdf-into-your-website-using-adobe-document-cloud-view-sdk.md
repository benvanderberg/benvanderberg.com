---
title: "Easily Embed PDFs into Your Website Using PDF Embed API"
description: "It is amazing just how much information we have today stored in PDF format. According to the PDF association, approximately 2.5 trillion PDFs are created every "
pubDate: 2020-02-19
heroImage: /blog/easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk/01.png
canonicalUrl: "https://medium.com/adobetech/easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk-3a40094f27b6"
---


It is amazing just how much information we have today stored in PDF format. According to the PDF association, approximately 2.5 trillion PDFs are created every year, making up 6 percent of the web. However, as a web developer, PDFs on a website can present a variety of challenge:

- Viewing experiences vary greatly across different users and devices because they depend on a PDF viewer. Whether it is embedded in web browsers or free online libraries, some viewers are better than others. Adobe Acrobat Reader is generally the universal standard for viewing PDFs properly.
- It becomes difficult for me to be able to incorporate PDFs into the rest of my website. Most often PDFs would prompt users to download PDFs on their devices.
- Converting PDFs to HTML is difficult and unreliable. If I want to present content inside a webpage that is in PDF format, often I might flatten to PDF to make it easier to embed.
- I have no visibility into how my visitor is viewing those PDFs. This means I have no idea if someone is reading certain pages, how long they spend on those pages, etc.

Fortunately, Adobe has released Adobe PDF Embed API (PDF Embed), an easy way for you to incorporate a PDF directly into your website with just an easy snippet of code. It is entirely free to use and renders client-side within your web app. You don’t have to learn a sophisticated PDF library, and it is super easy to do. No data is rendered on Adobe servers. In fact, you can even learn how to play with it here.

## Prerequisites

NOTHING! That’s the greatest thing about this. You don’t need anything other than a webpage to use PDF Embed.

## Using demo Site to try out the PDF Embed API

![PDF Embed Demo site allows you to customize your viewer then generate an embed code.](/blog/easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk/02.png)

The easiest way to get acquainted with the PDF Embed is to actually try it out on the Demo Site. It’s an easy resource to get started because it allows you to:

- See in real-time the different embed modes available for your PDFs.
- Customize which features you want as part of the viewer such as annotation tools, download PDF, Print PDF, page controls, etc.
- Generates code for you to paste right into your website.

## Getting Your Client ID

If you want to try the PDF Embed in your own code, it works without a Client ID when you are using it locally. However, if you want to actually incorporate it into your website, you will need to get Client ID. Get your Client ID here.

![Setting your application domain is important. When the PDF Embed is loaded, it will check to ensure that the Viewer is being loaded from this domain.](/blog/easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk/03.png)

Here are a couple of important tips:

- To create a Client ID, you will need to have an Adobe ID. If you don’t have one, you can sign up here using an email address, Google, Facebook, or Apple ID.
- You need to set your application domain in order for this to work.

Once you create your Client ID, you will want to copy and use that in your code.

![Your Client ID is here within Adobe IO.](/blog/easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk/04.png)

NOTE: While you can edit your configurations in the Adobe.io Console, you will want to go to the link to create your key. If you create your key from within the Adobe.io Console, it won’t give you the option to set your domain.

## Choosing your embed mode

One of the powerful things about the PDF Embed is that you have different embed modes to choose from:

### Full Window

![Full Window viewing mode allows you to create a PDF viewing experience similar to Adobe Acrobat Reader in your website.](/blog/easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk/05.png)

Full Window allows you to take a viewing experience similar to Adobe Acrobat Reader on your computer and embed it into your website. I find this ideal when viewing long-form documents, or if I want to have a familiar PDF viewing experience in my UI.

### Sized Container

![Sized Container is a great option for when you want to embed content like slides into your website.](/blog/easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk/06.png)

Sized containers are great for content such as PowerPoint presentations that were converted to PDF, or a series of instructions. I find this less ideal of an experience if you are incorporating long-form PDFs.

### In-Line

![In-Line mode allows you to embed a PDF inline within your webpage.](/blog/easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk/07.png)

In-Line view can help designers embed their designs into a web page without having to rebuild it or flatten it into an image. In-Line view takes your PDF and renders it inline as HTML. I like this embed mode for when you want to display content like infographics that you designed in Illustrator, InDesign, etc. and exported to PDF, but want it to still be searchable and have hyperlinks without having to worry of re-designing for web.

### Lightbox

![Lightbox allows you to present PDFs on your webpage easily as a lightbox over your webpage.](/blog/easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk/08.png)

The Lightbox opens the PDF Viewer on top of the web page to provide a more focused view. This mode is ideal when you have links to PDF files throughout your web site but want to control the viewing experience, collect analytics, and trigger events based on how your audience is interacting with the PDF files you’ve posted.

## Generating your code

When you’re using Demo Site and you click on Generate code, it will look something like this:

To get started, you will want to replace the following items:

- Replace <YOUR_CLIENT_ID> with the Client ID that you generated.
- Replace the url parameter with the URL of your PDF you want to view.NOTE: Because PDF Embed renders client-side in browser, it will honor any Cross-Domain restrictions set, so you may need to ensure your headers allow cross-domain linking.
- Change fileName to the name of your document. This will appear in the viewer.

Once you do that, you’ll be able to embed your PDF into your website. It’s that easy!

## Examples that use PDF Embed API today

There are a number of applications that already use PDF Embed API today:

## PDF Viewer Component

### The Core Component PDF Viewer component allows for the inclusion of a PDF document on a page. The Core Component PDF…

experienceleague.adobe.com

## Adobe Acrobat for Microsoft 365

### Do more with PDF - it's Acrobat built right into popular Microsoft enterprise apps.

appsource.microsoft.com

## Adobe Acrobat - PDF and e-signature tools - Google Workspace Marketplace

### Adobe Acrobat - PDF and e-signature tools Get the world's best PDF and e-signature tools embedded inside Google Drive…

gsuite.google.com

## Pair with Adobe PDF Services

![](/blog/easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk/09.png)

When you put PDFs on your website with PDF Embed API, you also want to create or optimize your PDFs as well. Adobe PDF Services allows you to:

- Create PDFs dynamically based on HTML or generate documents using data and Word templates.
- Optimize PDFs using compression or linearize to make them render faster on your website.
- OCR PDFs so that scanned documents are searchable and have selectable text.
- Combine PDFs together into one viewer using Combine PDF.
- Protect PDFs to prevent them from being viewed or edited even if they are downloaded.
- Convert Word, Excel or PowerPoint documents in PDF to easily view on the website.

## Conclusion

PDF Embed really allows for a lot of flexibility to leverage PDFs with you websites. There is a lot more you can do with it from Analytics, Event Listeners, and more which you can learn more about in this documentation.

## We want to hear from you

Once you have a look at the PDF Embed, we’d love to hear your thoughts! Get involved in the Adobe Document Cloud Forum to give your feedback, or reply to this article!

## Related articles

## What’s New in Adobe Document Services: Document Generation API

### See some the latest updates from March 2021 release to get personalized data-driven documents with Adobe Document…

medium.com

## PDFs in AEM: Embed PDFs into your pages with PDF Viewer

### Learn more about how we can use PDF Viewer to embed viewing experiences into our webpages.

medium.com

## PDF Analytics: Get Insights on Embedded PDFs on Your Website

### Understand how you can use Adobe Analytics and Adobe DC View SDK to understand how users are viewing and interacting…

medium.com

## Add PDF Documents and Forms into Your Webpages Using Adobe Document Cloud

### When your business depends on person-to-person interactions, you need easy ways to leverage those in entirely remote…

medium.com

UPDATE (07/07/2020): Updated to add new Lightbox embed mode and added new header image.

## Get Ben Vanderberg’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

UPDATE (07/31/2020): Updated to reflect new branding.

UPDATE (06/15/2021): Updated based on new branding.
