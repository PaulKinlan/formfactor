(function() {
  // Some Paul Irish magic
  if (!window.matchMedia){
    window.matchMedia = (function(doc, undefined){
      var bool,
          docElem = doc.documentElement,
          fakeBody = doc.createElement('body'),
          testDiv = doc.createElement('div');
                                       
       testDiv.setAttribute('id','ejs-qtest');
       fakeBody.appendChild(testDiv);
                                              
       return function(q){
         var styleBlock = doc.createElement('style'),
             cssrule = '@media '+q+' { #ejs-qtest { position: absolute; } }';
                                                                           
         styleBlock.type = "text/css"; //must set type for IE! 
         if (styleBlock.styleSheet){ 
           styleBlock.styleSheet.cssText = cssrule;
         } 
         else {
           styleBlock.appendChild(doc.createTextNode(cssrule));
         } 
         docElem.insertBefore(fakeBody, docElem.firstChild);
         docElem.insertBefore(styleBlock, docElem.firstChild);
         bool = ((window.getComputedStyle ? window.getComputedStyle(testDiv,null) : testDiv.currentStyle)['position'] == 'absolute');
         docElem.removeChild(fakeBody);
         docElem.removeChild(styleBlock);
                                                                                               
         return { matches: bool, media: q };
       };
    })(document);
  }

  var linkDefaults = {
    excss: {
      rel: "stylesheet",
      type: "text/excss"
    },
    less: {
      rel: "stylesheet/less",
      type: "text/css"
    },
    css: {
      rel: "stylesheet",
      type: "text/css"
    }
  }

  var testMedia = function(query) {
    var mql = matchMedia(query);
    return mql.matches;
  };

  var indicates = function(indicator) {
    return (typeof(indicator) == "function" && indicator()) 
        || (typeof(indicator) == "boolean" && indicator)
        || (typeof(indicator) == "string" && testMedia(indicator))
  };

  // A collection of the formfactors and tests.
  var formfactorIndicators = {};

  var isFormfactor = function(formfactor) {
    var indicators = formfactorIndicators[formfactor];
    var indicator;
    for(var i = 0; indicator = indicators[i]; i++) {
      if (indicates(indicator)) return true;
    }

    return false;
  };

  var createLinkElement = function(href) {
    var link = document.createElement("link");

    // detect the file type.
    var extension = href.substring(href.lastIndexOf(".") + 1); 
    if(!!linkDefaults[extension] == false) extension = "css";
    var linkType = linkDefaults[extension];
    link.rel = linkType.rel;
    link.type = linkType.type;
    link.href = href;
    return link;
  };

  var createScriptElement = function(src) {
    var script = document.createElement("script");
    script.src = src;

    return script;
  };

  var initializeFormfactor = function(action) {
    var css, js;
    var callback = action.callback || function() {};
    action.links = action.links || [];
    action.js = action.js || [];

    if(typeof(action.links) === "string") {
      document.head.appendChild(createLinkElement(action.links)); 
    }
    else if(action.link instanceof Array) {
      for(var link_idx = 0; link = action.links[link_idx]; link_idx++ ) {
        document.head.appendChild(createLinkElement(link)); 
      }
    }

    if(typeof(action.js) === "string") {
      document.head.appendChild(createScriptElement(action.js));
    }
    else if (action.js instanceof Array) {
      for(var js_idx = 0; js = action.js[js_idx]; js_idx++ ) {
        document.head.appendChild(createScriptElement(js));
      }
    }

    return callback();
  };

  var is = function(type) {
    var opts = {};
    opts[type]={};
    return detect(opts);
  };

  var isnt = function(type) {
    return !(is(type));
  };

  var detect = function(formfactorActions, defaultFormfactorAction) {
    defaultFormfactorAction = defaultFormfactorAction || { "css": [], "opts": [], "callback": function() {} };
    
    var formfactorAction;
    for(var i = 0; formfactorAction = formfactorActions[i]; i++) {
      if(isFormfactor(formfactorAction.formfactor)) {
        return initializeFormfactor(formfactorAction);
      }
    };

    return initializeFormfactor(defaultFormfactorAction);
  };

  var register = function(formfactor) {
    for(var form in formfactor) {
      formfactorIndicators[form] = formfactor[form]; 
    }
  };
  
  window.formfactor = {
    "register": register,
    "detect": detect,
    "is": is,
    "isnt": isnt
  };
})();
