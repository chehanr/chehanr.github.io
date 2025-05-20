---
title: "NAS Project"
description: "A short write-up of my budget-conscious NAS project, built for expandability and home storage needs like Plex, Immich, and Nextcloud, using a Fractal Design Node 304, Proxmox, and OpenMediaVault running on an old Dell Optiplex" 
pubDate: "May 20 2025"
heroImage: "/posts/nas-project/home-server.jpeg"
heroImageAlt: "Home server"
isUnlisted: false
---

This is a quick a write-up of my budget-conscious NAS project, made to be an easily expandable system for storage needs - Plex, Immich, Nextcloud, etc. Here's a brief overview of the setup:

![Node 304 inside](/posts/nas-project/node-304-inside.jpeg "Node 304 inside")

I selected the Fractal Design Node 304 case for its ample internal space and modularity, which makes it well-suited for housing multiple drives and accommodating future expansions. For connectivity, I used an LSI SAS9200-8e card, connected with an SFF-8088 to SFF-8088 cable, an SFF-8088 to SFF-8087 PCI bracket, and an SFF-8087 to SATA cable. The system is powered by a Silverstone ET550 PSU, which I turned on using a paper clip to jump-start it.

Here's the back of the case, you'll notice the SFF-8088 PCI bracket/ breakout:

![Back of the Node 304](/posts/nas-project/node-304-back.jpeg "Back of the Node 304")

The software runs on an OMV VM hosted on Proxmox. I'm using MergerFS for drive pooling and SnapRAID for parity. Proxmox is hosted on a second-hand Dell Optiplex 7050. Here's me adding a parity drive that was long overdue, a refurbished 16TB WD Ultrastar:

![Node 304 drive cage](/posts/nas-project/node-304-drive-cage.jpeg "Node 304 drive cage")

And here's me connecting the "JBOD" back to the Optiplex using a mini SAS cable:

![Node 304 drive cage](/posts/nas-project/sff-cable-connected.jpeg "Node 304 drive cage")

This setup has been running ~smoothly. The combination of the Node 304's design and the software stack ensures I can easily add more drives as my storage demands increase.
