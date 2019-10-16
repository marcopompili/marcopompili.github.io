---
layout: post
title: Installing Node.js packages on Arch Linux
author: Marco Pompili
date: '2016-06-04 19:16:00 +0200'
categories: linux Arch nodejs npm
---

I use Arch as my daily driver, for me it's the near to perfection Linux distribution. Arch Linux it's not for beginners, it's not intended to, it requires a more mature approach but it gives the user lots of independence and freedom for customization, and last but not least the community is pretty active. <!--more-->

I do some packaging on [AUR](https://aur.archlinux.org/), it's my way to give something back to the community. You can check [my packages](https://aur.archlinux.org/packages/?SeB=m&K=marcs) maybe you can find something useful.

Some of my packages are for Node.js and in my opinion all applications that require a system-wide installation should have a distribution package.

# TL;DR

So which is the best way to install a system wide Node.js package on Arch Linux ?

*The "package" is the word* ([cit.](https://www.youtube.com/watch?v=7OXVPgu6urw)), a good habit is to make a package.

And the fastest way to do so is using an automated software, the structure of a npm package is quite simple so a software can do the work for you.

[npm2arch](https://www.npmjs.com/package/npm2arch) allows you to make a package by using a one-liner command on the shell, and I must admit that who came up with this program should deserve a beer and a medal (and another beer), so at least give a star to [the npm2arch repository](https://github.com/Filirom1/npm2arch) on GitHub.

## Installation

Assuming you have [yaourt](https://aur.archlinux.org/packages/yaourt/) (or pacaur) already installed, if not you should do so, yaourt is a very useful tool to deal with packages from AUR.

To install npm2arch, just go with the usual:

`yaourt -S npm2arch`

### Usage

For the full documentation you should check the [npm page for npm2arch](https://www.npmjs.com/package/npm2arch).

If you want a quick way to create to install a Node.js package, this is the command:

`npm2archinstall npm-package-name`

The package is built and at the end of the process and pacman will install the freshly built package.

### For the community

Even better is to become a packager, in case you don't find the package on AUR, why not to put a new package to help out the community ? Remember to always follow the [submitting guidelines](https://wiki.archlinux.org/index.php/Arch_User_Repository#Submitting_packages).

I have a script to clone/create a package from AUR, called it *aur-clone.sh*, and here is what it does:

```bash
#!/bin/bash

git clone ssh://aur@aur4.archlinux.org/$1.git
```

If a package doesn't exist, it will crate an empty Git repository on the local folder. This script needs to have an SSH key pair configured for AUR, [check the AUR wiki page](https://wiki.archlinux.org/index.php/Arch_User_Repository#Submitting_packages).

Then let npm2arch do the work, launch this command inside the newly created git folder:

`npm2PKGBUILD npm-package-name > PKGBUILD`

There you go, you got a pre-made PKGBUILD file with all the necessary source code. Some other steps are needed to submit a good package, if you don't know them check my article of how to create an Arch Linux package.

Make a .SRCINFO file with the command:

`mksrcinfo`

Add a .gitignore file removing the package and the src/ and pkg/ folders from source control:

```text
src/
pkg/
*.tar.xz
```

When you are happy with your work push it to the AUR repository:

`git push origin master`

Now you have your package in the AUR repository, congratulations.
