// ==UserScript==
// @name         TikTok No App Required
// @namespace    https://github.com/jamesdrudolph/userscripts/
// @version      0.1
// @description  Prevents modal app download popup.
// @author       James Rudolph
// @match        *://*.tiktok.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ==== Userscript functions ====
    function getBodyElement() {
        const bodyElementColl = document.getElementsByTagName("body");
        if (bodyElementColl && bodyElementColl.length > 0) {
            return bodyElementColl[0]; //assume we only have 1 body element
        }

        console.log("couldn't find the body element!");
        return undefined;
    }

    function createObserver(target, callback) {
        const observerOptions = {
            childList: true
        }

        const observer = new MutationObserver(callback);

        if (target) {
            observer.observe(target, observerOptions);
        }
    }

    function observerCallback(mutationRecords, observer) {
        for (const mutation of mutationRecords) {
            const addedNodes = mutation.addedNodes;

            for (let i = 0; i < addedNodes.length; i++) {
                const node = addedNodes[i];

                if (node && node.className) {
                    const nodeClassName = node.className;

                    //just hardcode the elements i don't want for now...
                    if (nodeClassName.startsWith("backdrop-") || nodeClassName.startsWith("tiktok-dialog")) {
                        node.remove();
                    }
                }
            }
        }
    }

    // ==== Call script entry point ====
    createObserver(getBodyElement(), observerCallback);
})();
