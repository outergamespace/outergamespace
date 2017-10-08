# Deployment
This article outlines the details about deploying to OuterGameSpace to a hosting service.

Currently, OuterGameSpace is deploying on [DigitalOcean](https://www.digitalocean.com/). [Heroku](http://www.heroku.com) also is an option, but is facing issues of dropped connections at the moment.

*Please contact the OuterGameSpace team for user credentials.*

## DigitalOcean vs Heroku
It is important to understand the differences between deploying to DigitalOcean vs Heroku, which are briefly outlined here.

DigitalOcean is a full Ubuntu-based Linux server that can be configured where everything is contained in the same space(just like the environment on your own local system).

Heroku is a containerized server solution where each component(e.g. App, Database, external port communication and routing) is separated and connected through a container interface.

Since Heroku is using containers, there's magic that happens on the Heroku platform that allow these pieces to work together even though they may be separated from each other. If you're using Heroku, this is the reason behind the "Add-ons", which are in essence, containers.

## DigitalOcean Deployment
This section outlines basic steps on how to deploy to [DigitalOcean](https://www.digitalocean.com/).

DigitalOcean is more like a traditional Linux server, so steps are very similar to how a local setup would be.

### Setup
1. Create an account on DigitalOcean.
1. Create an SSH key and add it to the droplet configuration
1. Create a droplet (needs to be at least 1GB ram to successfully install packages)
1. Login to your droplet via SSH

More droplet creation details here:
https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet

### Environment Configuration
As mentioned before, DigitalOcean is a full Ubuntu-based Linux server. So, the steps required to get this working is just to configure a Linux environment.

Some things that need to be done are:
- Update apt-get
`apt-get update`
- [Install MySQL](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-14-04)
- Install node.js 6.x
`curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`
`apt-get install nodejs`

## Deploying to DigitalOcean
After everything is setup you can now get the server running with your code by doing the following on the droplet:
- Pull down the source code
`git clone https://github.com/outergamespace/outergamespace.git`
- Transpile the code *Note: this is temporary until this step is added into the scripts*
`npm run react-dev`
- run the server
`npm start`

Your code should now be visible at the public IP address of the DigitalOcean droplet.

For example:
http://<MY_DROPLET_IPADDRESS>:<MY_WEBPAPP_PORT>


## Heroku Deployment

*Note: Heroku deployment is currently not working properly as socket connections are disconnecting.*

### Install Heroku Locally
Most of the work with Heroku will be done on your locally machine, so we will install the CLI.
From the command-line: `brew install heroku`

### Logging into Heroku
After installation is complete, login to Heroku using `heroku login`. You should now be ready and configured to start pushing code to Heroku.

### Deploying to Heroku
With Heroku, deployments work well with git as Heroku will act as an additional remote. All code is expected to be deployed to `heroku:master`.

To deploy your code, you would do the following: `git push heroku <YOUR_BRANCH_NAME>:master`

After the compilation and compression steps, your code should now be deployed.

To launch the webpage, run: `heroku open`
