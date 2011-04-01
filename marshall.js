var marshall = function() {
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
  
  function Matcher(query, callback) {
     this.query = query;
     this.callback = callback;
  }

  var test_media = function(query) {
    var mql = matchMedia(query);
    return mql.matches;
  };

  this.createMatcher = function(query, callback) {
    return new Matcher(query, callback);
  };

  this.test = function(query, callback) {
    callback = callback || function() { return false; };
    if(typeof(query) === "function" && query() == true) return callback();
    if(test_media(query)) return callback();
    return callback();
  };

  var partialTest = function(query) {
    return function() { return test_media(query); };
  };

  var tests = {
    hasTouch: function() { return (!!window.createTouchEvent); }
  }

  var features = { 
    "tv": [
      partialTest("tv"),
      partialTest(function(){ return false; })
    ],
    "tablet": [
    ],
    "smartphone" : [

    ],
    "desktop": [
      partialTest("screen")       
    ]
  };

  var executeTests = function(device) {
    var feats = features[device];
    var matched = false;
    for(var f in feats) {
      matched = feats[f]();
      if(matched) break;
    }

    return matched;
  };

  var executeResult = function(opt) {
    var css, js;
    var callback = opt.callback || function() {};

    for(var css_idx = 0; css = opt.css[css_idx]; css_idx++ ) {
      var css_element = document.createElement("link");
      css_element.rel = "stylesheet";
      css_element.href = css;
      document.head.append(css_element);
    }
    
    for(var js_idx = 0; js = opt.js[js_idx]; js_idx++ ) {
      var js_element = document.createElement("script");
      js_element.src = js;
      document.head.append(js_element);
    }

    return callback();
  };

  this.detect = function(opts, default_opts) {
    default_opts = { "css": [], "opts": [], "callback": function() {} };
    for(var device in opts) {
      if(executeTests(device)) {
        return executeResult(opts[device]);
      }
    };

    return executeResult(default_opts);
  };

  this.firstOf = function(query) {
    if(!(query instanceof [])) throw "error";

    for(var m = 0; m < query.length; m++) {
      if(test_media(query[m].query)) query[m].callback(); 
      return;
    } 
  };

  this.anyOf = function(query) {
    if(!(query instanceof [])) throw "error";

    for(var m = 0; m < query.length; m++) {
      if(test_media(query[m].query)) query[m].callback(); 
    } 
  };

  this.watch = function(query, callback) {
    var mql = matchMedia(query);
    if(mql.matches) {
      mql.addListener(callback);
    }
  };
};
