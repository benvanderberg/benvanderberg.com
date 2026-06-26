---
title: "Epic live streams with live cartoons using Adobe Character Animator with OBS"
description: "Learn how to add live animated cartoon characters to your OBS livestream using Adobe Character Animator and NDI Tools."
pubDate: 2021-12-21
heroImage: "/images/blog/image-4-1536x1078.png"
---

![Adobe Character Animator in OBS](/images/blog/image-4-1536x1078.png)

Ever since Adobe Character Animator came out a few years ago, it has consistently blown my mind. I have watched really cool things like the animated [Donald Trump on Stephen Colbert's show](https://www.youtube.com/watch?v=PD9-zrGxrs4). At Adobe MAX in 2016, I got to see [Nancy Cartwright perform Bart Simpson live](https://www.youtube.com/watch?v=nWYBnj1p9wQ) in front of an audience. The idea of animation being something that you could do live just is mind-boggling.

Fast forward several years, I am playing more with tools like OBS. I have started to look into how easy it would be to incorporate a live animation along with other things that I am doing using OBS so I set out to discover just how much effort it would take to incorporate Adobe Character Animator with OBS. This allows me to add live characters on a live stream.

It turns out it is way easier than I even expected. So in this blog, we are going to walk through how you can easily create a character and build it into your scene in OBS. This solution works for both Mac and Windows.


## Install the right software

There are a few things you are going to need to get this to work:

### OBS

[OBS](https://obsproject.com/), or Open Broadcasting Software, allows you to mix Character Animator and other media together.

OBS, or Open Broadcasting Software, is a tool that allows you to live-stream to many different tools like Facebook, Twitch, and many others. It also becomes very handy for live presentations on [Zoom](https://zoom.us/), [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software), and other apps because it allows you to transition between different things, screens very easily.

![Open Broadcaster Software | OBS](/images/blog/OBSDemoApp2610.png)

### Adobe Character Animator

[Adobe Character Animator](https://www.adobe.com/products/character-animator.html) allows you to create characters to animate live. It also includes the ability to use a webcam to track your motion.

You need to install Adobe Character Animator, which is included as part of the [Adobe Creative Cloud](https://www.adobe.com/creativecloud.html) subscription. If you don't have that but you want to play, you can sign up for a trial at adobe.com. You are also going to want to make sure you have this installed before you install the other items.

![Adobe Character Animator screenshot.](/images/blog/image-2-1536x1024.png)

### NDI Tools

[NDI Tools](https://www.ndi.tv/tools/) is a free set of tools that enables NDI video protocol over Ethernet. NDI has become popular with broadcasters to stream video over a network. It becomes really useful for high-end IP-based cameras as well as for streaming from one computer to another. NDI Tools includes plugins for Adobe Creative Cloud apps like Adobe Character Animator, Adobe Premiere Pro, and Adobe After Effects; this enables you to output playback directly to OBS, which becomes really handy.

![NDI Tools screenshot.](/images/blog/image-3-1536x844.png)

### NDI-OBS Plugin

In order to capture NDI feeds easily into your scene, you need to install the [NDI-OBS plugin](https://github.com/Palakis/obs-ndi/releases). It's really simple. Just install it, but make sure you restart OBS after you install it if you have it open.

## Setup your feed from Character Animator

The first thing to do is make sure NDI Tools plugins are installed in Character Animator.

1. Open Adobe Character Animator on your computer.
1. Go to Preferences (Edit > Preferences on Windows or Character Animator > Preferences on Mac).
1. Go to the Live Output section.
1. Ensure that Enable Mercury Transmit is enabled.
1. Enable the video device NDI output.

![Adobe Character Animator preferences showing how to set Live Output to include an NDI output.](/images/blog/image.png)

## Setup OBS

In OBS, you will need to create a new NDI source to take in the input from Character Animator.

1. In the Sources panel, click on the + symbol.
1. Select NDI Source.
1. Set the name of your source.
1. Click on OK.
1. In the Source name, set it to the NDI source coming from Adobe Character Animator.

![Properties for an NDI Source in OBS.](/images/blog/image-6-1536x1188.png)

![OBS showing an NDI source that includes a Character Animator character.](/images/blog/image-7-1536x1078.png)

You should now see the live output coming from Character Animator in your Canvas.

The great thing is that it also outputs the alpha channel, so this can be great for simulating a live interaction with a cartoon character by having a video input from your webcam and an NDI input from your computer.

## Using multiple computers

Adobe Character Animator and OBS can both be resource-intensive, especially if you are also doing encoding for a live stream. This also tends to be more resource-intensive when you are running on a Mac vs. Windows. To resolve this, you can run Adobe Character Animator and OBS on separate computers. NDI is a protocol for streaming video on a network, such as over Ethernet. So as long as your computers are on the same network and you have NDI Tools installed, you should be able to pick up that feed on another computer. However, I recommend that you have a 1Gbps wired ethernet connection to eliminate any lag.

## Final thoughts

If you ever watched movies like Mary Poppins and wished "I wish I could create a video where I get to talk to a cartoon character", then this is a great way to make that not only a reality but something you can live stream on YouTube, LinkedIn or even your video conferencing meetings.
