# Listo
Project for the Human-Computer Interaction (HCI) lecture in Autumns Semester 2016 @ University of Zurich

## Frameworks

This project is built with Facebook's React to render the View and with Google's Firebase as a Database. The react stuff is in the file index.jsx, which is written in JSX and ES2015. All this is compiled with Babel to normal Javascript and bundled with Webpack to a single JS file.

## How to use this project

1. Clone Repo
2. ```cd``` to folder
3. run ```npm install``` in folder
4. run ```npm run dev``` for development mode or ```npm run build``` to compile a compressed file

## Setting up Vagrant

**On your Main Machine edit your /etc/hosts and add the following entry**
192.168.13.37 listo.dev

###Vagrant stuff
*Comes with: node, webpack, bower, gulp, vim, git, nvm*

Mac users:
```bash
$ brew cask install virtualbox
$ brew cask install vagrant
```
Marcello:
1) Install Virtualbox
2) Install Vagrant: https://www.vagrantup.com/downloads.html

**Afterwards for everyone, in the folder with the VagrantFile**
```bash
vagrant up
vagrant ssh
cd /vagrant
npm install
npm run dev
```

**You can now access listo.dev:3000**
