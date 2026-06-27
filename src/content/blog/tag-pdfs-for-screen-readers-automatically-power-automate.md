---
title: "Tag PDFs for Screen Readers Automatically in Microsoft Power Automate"
description: "How to build a no-code Power Automate flow that uses Adobe PDF Accessibility Auto-Tag API to automatically tag PDFs for screen readers at scale."
pubDate: 2023-05-17
canonicalUrl: "https://medium.com/adobetech/tag-pdfs-for-screen-readers-automatically-in-microsoft-power-automate-18be09eb8b5f"
heroImage: /blog/tag-pdfs-screen-readers/01-hero.png
---

In this article, we will walk through how you can utilize Adobe PDF Services connector in Microsoft Power Automate to automatically tag PDF documents for screen readers. We will see how in just a few steps you can create a streamlined workflow in Microsoft 365 to get PDFs optimized quickly.

## Why is tagging in PDF documents important?

Accessibility is a challenge around the world. According to Information Technology & Innovation Foundation, 42% of reviewed Federal websites failed to meet accessibility tests for users with disabilities. PDFs can also present a challenge to organizations as PDFs can come in a variety of formats such as scanned, digital-native PDFs, as well as from different apps that don't create optimized PDF documents.

Adobe Acrobat is one of the primary tools that organizations have used for optimizing PDF documents. Autotag Document and Accessibility Checker tools in Acrobat help ensure that PDF documents have proper accessibility tags. Accessibility tags allow screen readers to understand the appropriate structure and reading order in a document to help screeners navigate and describe components of the document.

While the amount of content grows larger and larger, there is a large skill gap to meet the needs of remediating all this content. According to Partnership on Employment & Accessible Technology (PEAT), an organization focused on fostering collaborations that build inclusive workplaces for people with disabilities, 50% of organizations said it was difficult for their organization to find candidates with accessibility experience. This means that the appropriate talent to do this work has limited resources. They need solutions to help address the ever-growing amount of content, while at the same time working with limited resources.

## The Solution

Adobe Acrobat Services offers a PDF Accessibility Auto-Tag API. This service uses Adobe Sensei AI to analyze your document, its structure, and creates automatic tags in the document. A screen reader can then read these tags. It works with both PDF documents that are digital-native (like ones converted from Word) as well as scanned PDF documents.

This API is remarkably accurate. Some statistics have shown that it can increase productivity of accessibility teams by 40%. However, it is important to note that this does not declare that your PDF documents are instantly compliant with Section 508 or PDF/UA. Tagging can often require interpretation that computers are not able to decipher. To meet those compliance requirements, you may still need to review your PDF documents in Acrobat. However, this can raise the minimum bar significantly from the many PDFs that are posted on websites that do not even contain tags for screen readers.

## Scenario

What we will describe below is how you can create a solution with Power Automate where PDF documents uploaded to a specific folder in SharePoint will get automatically tagged using Adobe PDF Accessibility Auto-Tag API and then placed into a processed folder. This is ideal as it would allow you to start remediating documents in bulk directly inside of Microsoft 365.

While we are using a OneDrive folder in this example, this will similarly work with SharePoint, BOX, Dropbox, and other services available within Microsoft Power Automate.

## What you will need

- Adobe Acrobat Services
- Microsoft Power Automate (with premium connector access)
- Microsoft OneDrive
- Adobe Acrobat Reader or Acrobat Pro (optional for post-processing review)

## Get your credentials

![Adobe PDF Services connector credentials setup in Microsoft Power Automate](/blog/tag-pdfs-screen-readers/02-credentials.png)

To get credentials for Adobe PDF Services connector in Microsoft Power Automate, follow the steps that are documented here to create trial credentials and add them to your Microsoft Power Automate environment.

Once you complete these steps, you can add any of the PDF Services connector actions to your flow.

## Prepare your OneDrive folders

![Input and Output folders in OneDrive for the auto-tagging workflow](/blog/tag-pdfs-screen-readers/03-onedrive-folders.png)

For this simple example, we have created two folders in OneDrive. The first folder is "Input", which will be our drop folder for the PDF documents we want to have auto-tagged. The second is the "Output" folder where we want the tagged PDF documents to go after they have been processed.

## Create a new flow

Let's walk through how to create a new flow. We will need it to:

1. Trigger when files are added to the folder
2. Send the PDF to Adobe PDF Services for tagging
3. Save output to the Output folder

To create your new flow:

1. Go to Power Automate
2. Click **Create** in the sidebar
3. Select **Automated cloud flow**

![Creating a new automated cloud flow in Microsoft Power Automate](/blog/tag-pdfs-screen-readers/04-create-flow.png)

4. For your flow name, set it to your desired name. Ex. "Accessibility Demo."
5. Under **Choose your flow's trigger**, select **When a file is created (OneDrive for Business)**.

## Setup trigger

Next you will want to set up your trigger to get files from the Input folder.

1. Click the **Folder** icon in the Folder field

![OneDrive trigger folder configuration in Power Automate](/blog/tag-pdfs-screen-readers/05-trigger.png)

2. Navigate to your Input folder in OneDrive.

## Add Create tagged PDF action

1. Click on **+ New Step**
2. Search for "Adobe PDF Services"
3. Click on **Adobe PDF Services**
4. In the actions list, select **Create tagged PDF**
5. If at this point you are getting asked to enter your credentials, please follow the steps in the Get your credentials section above before continuing.

![Create tagged PDF action selected in the Adobe PDF Services connector](/blog/tag-pdfs-screen-readers/06-tagged-pdf-action.png)

6. Put your cursor into the **Filename** field and use the Dynamic content panel to enter the **Filename** variable into that field.

![Adding dynamic file content variable to the Create tagged PDF action](/blog/tag-pdfs-screen-readers/07-file-content.png)

7. Put your cursor into the **File content** field and use the Dynamic content panel to add the **File content** variable into that field.
8. Under **Generate Report in XLS Format**, set it to **No**. If you set this to Yes, it will return a ZIP file. If you set it to No, it returns just the PDF document.

## Save file into OneDrive

In the next step we want to save the file into OneDrive in the Output folder.

1. Click on **+ New step**
2. Search for "OneDrive for Business"
3. Select **OneDrive for Business**
4. In the list of actions, choose **Create file**
5. Click on the folder icon in the **Folder Path** field and navigate to your Output folder
6. Put your cursor in the **File Name** field and use the Dynamic content panel to add the **File Name** field from the Create tagged PDF action.

![Saving the tagged PDF to the Output folder in OneDrive](/blog/tag-pdfs-screen-readers/08-save-to-onedrive.png)

## Try new flow

Unlike some other triggers in Power Automate, OneDrive triggers are not instantaneous — they check for new files every 60 seconds. You can force this to be more instantaneous by putting your flow into Test mode.

1. While you are editing your flow, click on **Test** in the top-right corner
2. Select **Manually**

![Test mode options in Microsoft Power Automate](/blog/tag-pdfs-screen-readers/09-test-flow.png)

3. Click on **Test**

## Drop files in Input folder

To test this flow, you will want to use a PDF document that does not have tags. You can check by opening your PDF document in Adobe Acrobat Reader.

1. Open your document in Acrobat Reader on your computer
2. In the left sidebar, click on the **Tags** icon

![Checking for tags in the left sidebar of Adobe Acrobat Reader](/blog/tag-pdfs-screen-readers/10-check-tags.png)

3. If you see "No Tags available", this is a good test document.

Now you can test by adding new files to your Input folder in OneDrive. In Microsoft Power Automate you will be able to see when the action starts.

If it successfully runs, you will see checkmarks next to each action.

![Successful flow run showing checkmarks next to each action in Power Automate](/blog/tag-pdfs-screen-readers/11-flow-success.png)

## Checkout files in Acrobat to view tags

In Adobe Acrobat, you can open documents directly from OneDrive, SharePoint, and other repositories.

1. Open **Adobe Acrobat**
2. Click on **Home**
3. In the left sidebar, click on **Add file storage**

![Add file storage option in Adobe Acrobat to connect OneDrive](/blog/tag-pdfs-screen-readers/12-acrobat-storage.png)

4. Click on **Add** under OneDrive
5. Enter your email address associated with your OneDrive account and click **OK**
6. Login to your Microsoft 365 account
7. When prompted to give permission, **Accept** permissions for Adobe Acrobat
8. You can then navigate OneDrive directly in Acrobat

When you open your PDF document, you will then see that the tags have now been added. You can then review and update them in Adobe Acrobat Pro.

![Tagged PDF document open in Adobe Acrobat with the tags panel visible](/blog/tag-pdfs-screen-readers/13-tags-added.png)

## Final thoughts

With the large volume of content that needs to be optimized for accessibility, having tools to help accelerate this process at scale is key. By using PDF Accessibility Auto-Tag in Microsoft Power Automate, you can help accelerate the process of ensuring that PDFs are accessible for everyone. To learn more and get started, get a free trial of Adobe Acrobat Services, and try for yourself in Microsoft Power Automate.
