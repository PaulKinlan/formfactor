MarshallJS
==========

We already have feature detection frameworks and browser detection libraries,
 but not a vast range of form-factor detection libraries.

MarshallJS is a simple library for perorming actions based on media queries and basic functions and device profiles.

Usage
-----
        <script src="formfactor.js"></script>
        <script src="/formfactors/tv.js"></script>
        <script>
                     
          (function() {
            /* contents of tv.js */
            formfactor.register(tv: [ 
              "tv",
              function() { return navigtor.indexOf("Samsung") > 0; },
              (navigtor.indexOf("Samsung") > 0)
            ]);
          })();
        </script>
        <script>
          var type = formfactor.detect([
            {
              "formfactor" : "tv",
              "css": ["/css/tv.css", "/css/fullscreen.css"],
              "js": "/js/remote_control.js",
              "callback": function() { alert("Look mum, I am on TV!"); }
            },
            {
              "formfactor": "tablet",
                ...
            }
          },
          // default callback when nothing matches. 
          {
            "css": "/css/plain.css",
            "js": "/js/normal.js",
            "callback": function() { alert("In plain mode.");}
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
---

*  Does this replace Media Queries?
   > No, this is designed to complement all the existing technologies on the web, but also help 
     you target specific classes of devices with stylesheets

*  Can our design still be responsive?
   > Heck Yes!  You can still use all the current techniques to style your app or site based
     on capabilities such as min-device-width etc

*  Can this detect every device class?
   > Not a chance yet. We need your help to expand this project to help with device detection.

*  Can I define tests for my own device classes - perhaps I don't care for TV.
   > Very soon.
