---
layout: post
title: Oculus Rift direct mode on Linux
author: Marco Pompili
date: '2015-06-02 19:16:00 +0200'
categories: linux xorg oculus
repo: oculus-rift-direct-mode
---

After trying to get the best configuration on Linux for the Rift DK2, I came up with some results using a specific X.Org configuration, and a bunch of bash scripts, so now I'm able to emulate the Direct Mode behavior supported by the Windows driver. <!--more-->

The process is quite simple, I've configured X.Org so I could obtain two `Screens`:
 1. one for conventional monitors
 2. another one for the Oculus Rift.
 
 If you are confused by the terminology, for `Screen` I mean an X.Org `Screen Section`, so just to avoid confusion, check my [X.Org and the Oculus Rift](/linux/xorg/oculus/2015/05/20/xorg-and-the-oculus-rift.html) article and also check [Proper Oculus Rift DK2 setup on GNU/Linux](https://codelab.wordpress.com/2015/04/02/proper-oculus-rift-dk2-setup-on-gnulinux/) by John Tsiombikas.

The process of emulating Direct Mode on Linux consists of using a specific X.Org configuration and two bash scripts, the process is rough, but works fine to use it as a development tool.

In my old article I posted my old monolithic X.Org configuration file, most of the configuration was using default values so I decided to swap to a modular configuration which is much more convenient also for publishing, check my GitHub repository:
[oculus-rift-direct-mode](https://github.com/marcopompili/oculus-rift-direct-mode)

In the repository you find two bash scripts, one called `rift_run` and another called `rift_switch`:

-   `rift_run` is a wrapper script: the executable of a Rift application should be passed as an argument.

-   `rift_switch` is an utility script: uses **xrandr** for switching the state of the Rift’s Screen.

~~The two scripts should be placed in the same folder or in the /usr/local/bin folder (in this case replace ./rift_switch.sh with rift_switch.sh in source of the rift_run.sh script).~~

The scripts should be placed in the `/usr/local/bin` folder or in another location mapped on your `$PATH` environment variable.

If X.Org is configured correctly you can launch an application on the Rift like this:

```console
rift_run <application-executable>
```

If you turn on the rift before logging in you can put this command in the Session section of GNOME (or MATE, etc).

```console
rift_switch off
```

This will switch off the Rift and avoid burning the screen, the Rift LED should become orange, like if you turn it on in Direct Mode on Windows.

I'll possibly rewrite some scripts to make them more versatile, but for now I'm happy with it, if you want to contribute feel free to fork my repository on GitHub.

Notes:

-   My GitHub repository: [oculus-rift-direct-mode](https://github.com/marcopompili/oculus-rift-direct-mode)

X.Org configuration:

-   [Proper Oculus Rift DK2 setup on GNU/Linux](https://codelab.wordpress.com/2015/04/02/proper-oculus-rift-dk2-setup-on-gnulinux/)
