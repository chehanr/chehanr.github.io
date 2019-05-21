---
---

"use strict";

var isTouch = ("ontouchstart" in window) || (navigator.msMaxTouchPoints > 0);
var profileLinksElmt = document.getElementById("profile-links-list");
var profileLinksElmtCount = profileLinksElmt.childElementCount;
var profileLinks = [
    ["Mail", "mailto:{{ site.email }}", "_top"],
    ["Twitter", "https://twitter.com/{{ site.twitter }}", "_blank"],
    ["Instagram", "https://instagram.com/{{ site.instagram }}", "_blank"],
    ["Spotify", "https://open.spotify.com/user/{{ site.spotify }}", "_blank"],
    ["Last.fm", "https://last.fm/user/{{ site.lastfm }}", "_blank"],
]

function addProfileLinks() {
    profileLinks.forEach(element => {
        let text = element[0];
        let url = element[1];
        let target = element[2];

        let newLiElmt = document.createElement("li");
        let newAncElmt = document.createElement("a");

        newAncElmt.href = url;
        newAncElmt.target = target;
        newAncElmt.innerText = text;
        newAncElmt.rel = "noreferrer";

        newLiElmt.appendChild(newAncElmt);
        profileLinksElmt.appendChild(newLiElmt);
    });
}

function removeProfileLinks() {
    for (let i = 0; i < profileLinks.length; i++) {
        profileLinksElmt.lastChild.remove();
    }
}

if (isTouch) {
    let moreLiElmt = document.createElement("li");
    let moreAncElmt = document.createElement("a");

    moreAncElmt.innerText = "More";

    moreLiElmt.appendChild(moreAncElmt);
    profileLinksElmt.appendChild(moreLiElmt);

    moreAncElmt.addEventListener("click", function () {
        addProfileLinks();
        moreLiElmt.remove();
    })
} else {
    profileLinksElmt.onmouseenter = function () {
        if (profileLinksElmt.childElementCount < profileLinks.length + profileLinksElmtCount) {
            addProfileLinks();
        }
    };

    profileLinksElmt.onmouseleave = function () {
        removeProfileLinks();
    };
}