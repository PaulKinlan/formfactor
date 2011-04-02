FormFactor
==========

FormFactor helps you customize your web app for different form factors, e.g.
when you make "the mobile version", "the TV version", etc.

About Form Factor Detection
===========================

The "write once, run many" aspect of HTML5 means developers are building HTML5
apps for desktop, tablets, mobiles, TV, and so on. We don't advocate a separate
web app for every device ever, but we do think it's sometimes nice to make a
distinct interfaces for each major form factor. You keep your core app - most
of the logic, markup, and styling - and you augment it with  an "awesome layer"
to target each form factor.

You've heard of Browser Detection and Feature Detection. Form Factor Detection
is a third way, providing an avenue to manage conceptually distinct user
interfaces. It doesn't eliminate the need for the first two approaches, but you
use them in the context of a particular form factor's interface.

About FormFactor.js
===================

This library is a bit of infrastructure to help you manage a multi-form-factor
project. We're sorry to infom you this library alone won't automatically make a
spiffy mobile version of your desktop app. It's really just piping, the
spiffiness is up to you.

* FormFactor allows you to register a number of "Form Factors".
* Each Form Factor is an id and a list of "indications" that the 
  form factor is in use.
* If any indication is true, the form factor is deemed to be in use.

* FormFactor allows you to register a number of "User Interfaces" (UIs).
* Each "UI" is associated with any number of "Form Factors", "Resources",
  and "Callbacks". The "Resources" can be stylesheets or scripts.
* When FormFactor.js deems a given form factor is in use, and there is a
  UI for that form factor, it does the following:
  * Attach the form factor's id to the document's root ("html") tag.
  * Dynamically loads and executes all resources.
  * Calls all callbacks, passing in the Form Factor id.

Usage
=====

THIS IS VERY UNDER CONSTRUCTION

        <script src="formfactor.js"></script>
        <script src="/formfactors/tv.js"></script>
        <script>
          (function() {
            /* contents of tv.js */
            formfactor.register({tv: [ 
              "tv",
              function() { return navigtor.indexOf("Samsung") > 0; },
              (navigtor.indexOf("Samsung") > 0)
            ]
          })();
        </script>
        <script>
          var formfactor = formfactor.detect([
            {
              formfactor : "tv",
              resources: ["/style/tv.css", "/style/fullscreen.less",
                            "/script/ambientsounds.js", "/script/fx.coffee" ],
              callbacks: function() { alert("Look mum, I am on TV!"); }
            },
            {
              formfactor: "tablet",
                ...
            }
          },
          // default callback when nothing matches. 
          {
            "resources": ["/style/plain.css", "script/plain.js"],
            "callbacks": function() { alert("In plain mode.");}
          }
        );
       
        </script>
        <script>
           if(formfactor.is("tv")) {
             alert("Look ma, Im on tv!");
           }

           if(formfactor.isnt("tv")) {
             alert("The revolution will not be televised");
           }
        </script>

FAQ
===

*  Does this replace Media Queries?
   > No, this is a proof-of-concept framework designed to complement all
     the existing technologies on the web and help you target specific classes
     of devices with stylesheets.

*  Does this replace Feature Detection?
  > No, we like feature detection too much! In the context of any given
    UI, you should still be using feature detection for features which
    may or may not be present.

*  Can I still practice responsive web design?
   > Heck Yes!  You can still use all the current techniques to style your app or site based
     on capabilities such as min-device-width etc.

*  Can this detect every device class?
   > Not a chance yet. We need your help to expand this project to help with device detection.

*  Can I define definitions for my own device classes - perhaps I don't care for TV.
   > Yes. In fact, the core framework is agnostic about form factors and their indications.
     We do include a handful of basic indicators for the main devices, but we hope the
     community will help refine them over time.
