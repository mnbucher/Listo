# Listo
Project for the Human-Computer Interaction (HCI) lecture in Autumns Semester 2016 @ University of Zurich


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