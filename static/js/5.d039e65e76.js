(self["rspackChunkdocs"] = self["rspackChunkdocs"] || []).push([[5], {
"Sv"(module, __unused_rspack_exports, __webpack_require__) {
"use strict";


var deselectCurrent = __webpack_require__("fS");

var clipboardToIE11Formatting = {
  "text/plain": "Text",
  "text/html": "Url",
  "default": "Text"
}

var defaultMessage = "Copy to clipboard: #{key}, Enter";

function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function copy(text, options) {
  var debug,
    message,
    reselectPrevious,
    range,
    selection,
    mark,
    success = false;
  if (!options) {
    options = {};
  }
  debug = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement("span");
    mark.textContent = text;
    // avoid screen readers from reading out loud the text
    mark.ariaHidden = "true"
    // reset user styles for span element
    mark.style.all = "unset";
    // prevents scrolling to the end of the page
    mark.style.position = "fixed";
    mark.style.top = 0;
    mark.style.clip = "rect(0, 0, 0, 0)";
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = "pre";
    // do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = "text";
    mark.style.MozUserSelect = "text";
    mark.style.msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function(e) {
      e.stopPropagation();
      if (options.format) {
        e.preventDefault();
        if (typeof e.clipboardData === "undefined") { // IE 11
          debug && console.warn("unable to use e.clipboardData");
          debug && console.warn("trying IE specific stuff");
          window.clipboardData.clearData();
          var format = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"]
          window.clipboardData.setData(format, text);
        } else { // all other browsers
          e.clipboardData.clearData();
          e.clipboardData.setData(options.format, text);
        }
      }
      if (options.onCopy) {
        e.preventDefault();
        options.onCopy(e.clipboardData);
      }
    });

    document.body.appendChild(mark);

    range.selectNodeContents(mark);
    selection.addRange(range);

    var successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
    success = true;
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
    debug && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(options.format || "text", text);
      options.onCopy && options.onCopy(window.clipboardData);
      success = true;
    } catch (err) {
      debug && console.error("unable to copy using clipboardData: ", err);
      debug && console.error("falling back to prompt");
      message = format("message" in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }

  return success;
}

module.exports = copy;


},
"Xx"(module) {
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (true) {
    module.exports = factory();
  } else {}

})(this, function() {
  var NProgress = {};

  NProgress.version = '0.2.0';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var progress = NProgress.render(!started),
        bar      = progress.querySelector(Settings.barSelector),
        speed    = Settings.speed,
        ease     = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, { 
          transition: 'none', 
          opacity: 1 
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function() {
          css(progress, { 
            transition: 'all ' + speed + 'ms linear', 
            opacity: 0 
          });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  (function() {
    var initial = 0, current = 0;

    NProgress.promise = function($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }

      if (current === 0) {
        NProgress.start();
      }

      initial++;
      current++;

      $promise.always(function() {
        current--;
        if (current === 0) {
            initial = 0;
            NProgress.done();
        } else {
            NProgress.set((initial - current) / initial);
        }
      });

      return this;
    };

  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');

    addClass(document.documentElement, 'nprogress-busy');
    
    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;

    var bar      = progress.querySelector(Settings.barSelector),
        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
        parent   = document.querySelector(Settings.parent),
        spinner;
    
    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                       ('MozTransform' in bodyStyle) ? 'Moz' :
                       ('msTransform' in bodyStyle) ? 'ms' :
                       ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = (function() {
    var pending = [];
    
    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function(fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  })();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery 
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it 
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = (function() {
    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
        cssProps    = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
          capName = name.charAt(0).toUpperCase() + name.slice(1),
          vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function(element, properties) {
      var args = arguments,
          prop, 
          value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    }
  })();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;

    if (hasClass(oldList, name)) return; 

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
        newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element. 
   * The list is wrapped with a single space on each end to facilitate finding 
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});



},
"G"(__unused_rspack_module, exports, __webpack_require__) {
"use strict";
var __rspack_unused_export;

__rspack_unused_export = ({ value: true });
exports.YZ = void 0;
var react_1 = __webpack_require__("U");
function lazyWithPreload(factory) {
    var ReactLazyComponent = (0, react_1.lazy)(factory);
    var PreloadedComponent;
    var factoryPromise;
    var Component = (0, react_1.forwardRef)(function LazyWithPreload(props, ref) {
        // Once one of these is chosen, we must ensure that it continues to be
        // used for all subsequent renders, otherwise it can cause the
        // underlying component to be unmounted and remounted.
        var ComponentToRender = (0, react_1.useRef)(PreloadedComponent !== null && PreloadedComponent !== void 0 ? PreloadedComponent : ReactLazyComponent);
        return (0, react_1.createElement)(ComponentToRender.current, Object.assign(ref ? { ref: ref } : {}, props));
    });
    var LazyWithPreload = Component;
    LazyWithPreload.preload = function () {
        if (!factoryPromise) {
            factoryPromise = factory().then(function (module) {
                PreloadedComponent = module.default;
                return PreloadedComponent;
            });
        }
        return factoryPromise;
    };
    return LazyWithPreload;
}
exports.YZ = lazyWithPreload;
__rspack_unused_export = lazyWithPreload;


},
"fS"(module) {

module.exports = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;

  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' &&
    selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }

    active &&
    active.focus();
  };
};


},
"p"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  O: () => (/* binding */ NoSSR)
});

// UNUSED EXPORTS: LegacyNoSSR

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("A8");
// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.3.1/node_modules/react/index.js
var react = __webpack_require__("U");
var react_namespaceObject = /*#__PURE__*/__webpack_require__.t(react, 2);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/index.js
var react_dom = __webpack_require__("ao");
var react_dom_namespaceObject = /*#__PURE__*/__webpack_require__.t(react_dom, 2);
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/reactDom.js

const reactDOM = react_dom_namespaceObject;
const safeBrowserOnly = reactDOM.browser ?? reactDOM.default?.browser;
const safePreconnect = reactDOM.preconnect ?? reactDOM.default?.preconnect;
const safePreload = reactDOM.preload ?? reactDOM.default?.preload;


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/react.js

const react_react = react_namespaceObject;
const safeUse = react_react.use ?? react_react.default?.use;


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/NoSSR.js




function ModernNoSSR(param) {
    let { children } = param;
    safeUse(safeBrowserOnly('This content is only rendered in the browser.'));
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: children
    });
}
const emptySubscribe = ()=>()=>{};
const getSnapshot = ()=>true;
const getServerSnapshot = ()=>false;
function LegacyNoSSR(param) {
    let { children, fallback = null } = param;
    const isMounted = (0,react.useSyncExternalStore)(emptySubscribe, getSnapshot, getServerSnapshot);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: isMounted ? children : fallback
    });
}
function NoSSR(props) {
    const { fallback = null } = props;
    if (false) {}
    if ('function' == typeof safeBrowserOnly) return /*#__PURE__*/ (0,jsx_runtime.jsx)(react.Suspense, {
        fallback: fallback,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ModernNoSSR, {
            ...props
        })
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(LegacyNoSSR, {
        ...props
    });
}



},
"v"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
/* import */ var react__rspack_import_0 = __webpack_require__("U");

function createExternalStore(initialValue) {
    let value = initialValue;
    const listeners = new Set();
    const getSnapshot = ()=>value;
    const subscribe = (listener)=>{
        listeners.add(listener);
        return ()=>listeners.delete(listener);
    };
    return {
        update (nextValue) {
            value = nextValue;
            for (const listener of listeners)listener();
        },
        useValue () {
            return (0,react__rspack_import_0.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
        }
    };
}


__webpack_require__.d(__webpack_exports__, {
}, {
  f: createExternalStore
});


},
"WU"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
/* import */ var react__rspack_import_0 = __webpack_require__("U");

const ThemeContext = /*#__PURE__*/ (0,react__rspack_import_0.createContext)({});
function useDark() {
    const ctx = useContext(ThemeContext);
    return 'dark' === ctx.theme;
}


__webpack_require__.d(__webpack_exports__, {
}, {
  D: ThemeContext
});


},
"e"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
/* import */ var react__rspack_import_0 = __webpack_require__("U");

const PageContext = /*#__PURE__*/ (0,react__rspack_import_0.createContext)({});
function usePage() {
    const ctx = (0,react__rspack_import_0.useContext)(PageContext);
    return {
        page: ctx.data
    };
}


__webpack_require__.d(__webpack_exports__, {
}, {
  N: PageContext,
  e: usePage
});


},
"d"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
/* import */ var virtual_page_data__rspack_import_0 = __webpack_require__("g8");
/* import */ var _createExternalStore_js__rspack_import_1 = __webpack_require__("v");


let usePages_pageData = virtual_page_data__rspack_import_0/* .pageData */.Y;
let usePages_searchIndexHash = virtual_page_data__rspack_import_0/* .searchIndexHash */.z;
const store = (0,_createExternalStore_js__rspack_import_1/* .createExternalStore */.f)(usePages_pageData);
function usePages() {
    return {
        pages: store.useValue().pages
    };
}
if (false) {}


__webpack_require__.d(__webpack_exports__, {
}, {
  Qd: usePages,
  Y: usePages_pageData,
  zE: usePages_searchIndexHash
});


},
"Z"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
/* import */ var virtual_site_data__rspack_import_0 = __webpack_require__("H");
/* import */ var _createExternalStore_js__rspack_import_1 = __webpack_require__("v");


let siteData = virtual_site_data__rspack_import_0/* ["default"] */.A;
const store = (0,_createExternalStore_js__rspack_import_1/* .createExternalStore */.f)(siteData);
function useSite() {
    return {
        site: store.useValue()
    };
}
if (false) {}


__webpack_require__.d(__webpack_exports__, {
}, {
  U: siteData,
  Z: useSite
});


},
"u4"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
/* import */ var _rspress_shared__rspack_import_1 = __webpack_require__("n");
/* import */ var virtual_routes__rspack_import_0 = __webpack_require__("V");
/* import */ var _hooks_useSite_js__rspack_import_2 = __webpack_require__("Z");
/* import */ var _utils_js__rspack_import_3 = __webpack_require__("i");




function normalizeRoutePath(routePath) {
    return (0,_rspress_shared__rspack_import_1/* .cleanUrl */.TG)(decodeURIComponent(routePath)).replace(/\.html$/, '').replace(/\/index$/, '/').toLowerCase();
}
function matchPath(pattern, pathname) {
    const normalizedPattern = normalizeRoutePath(pattern);
    const normalizedPathname = normalizeRoutePath(pathname);
    const normalizedPatternWithSlash = normalizedPattern.endsWith('/') ? normalizedPattern : `${normalizedPattern}/`;
    const normalizedPathnameWithSlash = normalizedPathname.endsWith('/') ? normalizedPathname : `${normalizedPathname}/`;
    if (normalizedPatternWithSlash === normalizedPathnameWithSlash) return {
        path: pattern
    };
    return null;
}
const sortedRoutes = [
    ...virtual_routes__rspack_import_0/* .routes */.J
].sort((a, b)=>{
    const pathA = a.path || '';
    const pathB = b.path || '';
    return pathB.length - pathA.length;
});
function matchRoutes(_routes, pathname) {
    for (const route of sortedRoutes){
        const routePath = route.path || '';
        const match = matchPath(routePath, pathname);
        if (match) return [
            {
                route
            }
        ];
    }
    return null;
}
const cache = new Map();
function pathnameToRouteService(pathname) {
    const normalizedPathname = normalizeRoutePath(pathname);
    const cacheItem = cache.get(normalizedPathname);
    if (cacheItem) return cacheItem;
    const matched = matchRoutes(virtual_routes__rspack_import_0/* .routes */.J, normalizedPathname);
    const route = matched?.[0]?.route;
    if (route) cache.set(normalizedPathname, route);
    return route;
}
function redirectToCleanUrl(location, history) {
    if (_hooks_useSite_js__rspack_import_2/* .siteData.route */.U.route?.cleanUrlsRedirect === false) return false;
    const matchedRoute = pathnameToRouteService((0,_utils_js__rspack_import_3/* .removeBase */.EJ)(location.pathname));
    if (!matchedRoute) return false;
    const canonicalRoutePath = (0,_rspress_shared__rspack_import_1/* .normalizeHref */.Tj)(matchedRoute.path, Boolean(_hooks_useSite_js__rspack_import_2/* .siteData.route */.U.route?.cleanUrls));
    const canonicalPathname = `${(0,_rspress_shared__rspack_import_1/* .removeTrailingSlash */.UC)(_hooks_useSite_js__rspack_import_2/* .siteData.base */.U.base)}${canonicalRoutePath}`;
    if (location.pathname === canonicalPathname) return false;
    history.replaceState(history.state, '', `${canonicalPathname}${location.search}${location.hash}`);
    return true;
}
function isActive(itemLink, currentPathname) {
    const linkMatched = matchPath(itemLink, currentPathname);
    return null !== linkMatched;
}
const preloadLink = (link)=>{
    if (_hooks_useSite_js__rspack_import_2/* .siteData */.U?.route?.prefetchLink === false) return;
    const route = pathnameToRouteService(link);
    if (route) route.preload();
};


__webpack_require__.d(__webpack_exports__, {
}, {
  $m: isActive,
  G$: preloadLink,
  IA: redirectToCleanUrl,
  c5: pathnameToRouteService
});


},
"Y"(__unused_rspack_module, __unused_rspack___webpack_exports__, __webpack_require__) {
"use strict";

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("A8");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/utils.js
var utils = __webpack_require__("i");
// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.3.1/node_modules/react/index.js
var react = __webpack_require__("U");
// EXTERNAL MODULE: ./node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/client.js
var client = __webpack_require__("rC");
// EXTERNAL MODULE: ./node_modules/.pnpm/react-router@7.18.5_react-dom@19.3.1_react@19.3.1__react@19.3.1/node_modules/react-router/dist/development/chunk-6KYCQHYJ.mjs
var chunk_6KYCQHYJ = __webpack_require__("q");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+shared@2.1.3/node_modules/@rspress/shared/dist/index.js
var dist = __webpack_require__("n");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useSite.js
var useSite = __webpack_require__("Z");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useDark.js
var useDark = __webpack_require__("WU");
// EXTERNAL MODULE: ./node_modules/.pnpm/react-router@7.18.5_react-dom@19.3.1_react@19.3.1__react@19.3.1/node_modules/react-router/dist/development/dom-export.mjs
var dom_export = __webpack_require__("Ga");
// EXTERNAL MODULE: ./theme/index.tsx + 2 modules
var theme_0 = __webpack_require__("L");
;// CONCATENATED MODULE: ./node_modules/.pnpm/hookable@6.1.2/node_modules/hookable/dist/index.mjs
function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
function mergeHooks(...hooks) {
	const finalHooks = {};
	for (const hook of hooks) {
		const flatenHook = flatHooks(hook);
		for (const key in flatenHook) if (finalHooks[key]) finalHooks[key].push(flatenHook[key]);
		else finalHooks[key] = [flatenHook[key]];
	}
	for (const key in finalHooks) if (finalHooks[key].length > 1) {
		const array = finalHooks[key];
		finalHooks[key] = (...arguments_) => serial(array, (function_) => function_(...arguments_));
	} else finalHooks[key] = finalHooks[key][0];
	return finalHooks;
}
function serial(tasks, function_) {
	return tasks.reduce((promise, task) => promise.then(() => function_(task)), Promise.resolve());
}
const createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function serialCaller(hooks, arguments_) {
	return hooks.reduce((promise, hookFunction) => promise.then(() => hookFunction(...arguments_ || [])), Promise.resolve());
}
function parallelCaller(hooks, args) {
	return Promise.all(hooks.map((hook) => hook(...args || [])));
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}
var HookableCore = class {
	_hooks;
	constructor() {
		this._hooks = {};
	}
	hook(name, fn) {
		if (!name || typeof fn !== "function") return () => {};
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(fn);
		return () => {
			if (fn) {
				this.removeHook(name, fn);
				fn = void 0;
			}
		};
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	callHook(name, ...args) {
		const hooks = this._hooks[name];
		if (!hooks || hooks.length === 0) return;
		return callHooks(hooks.slice(), args, 0);
	}
};
const isBrowser = (/* unused pure expression or super */ null && (typeof window !== "undefined"));
function createDebugger(hooks, _options = {}) {
	const options = {
		inspect: isBrowser,
		group: isBrowser,
		filter: () => true,
		..._options
	};
	const _filter = options.filter;
	const filter = typeof _filter === "string" ? (name) => name.startsWith(_filter) : _filter;
	const _tag = options.tag ? `[${options.tag}] ` : "";
	const logPrefix = (event) => _tag + event.name + "".padEnd(event._id, "\0");
	const _idCtr = {};
	const unsubscribeBefore = hooks.beforeEach((event) => {
		if (filter !== void 0 && !filter(event.name)) return;
		_idCtr[event.name] = _idCtr[event.name] || 0;
		event._id = _idCtr[event.name]++;
		console.time(logPrefix(event));
	});
	const unsubscribeAfter = hooks.afterEach((event) => {
		if (filter !== void 0 && !filter(event.name)) return;
		if (options.group) console.groupCollapsed(event.name);
		if (options.inspect) console.timeLog(logPrefix(event), event.args);
		else console.timeEnd(logPrefix(event));
		if (options.group) console.groupEnd();
		_idCtr[event.name]--;
	});
	return { close: () => {
		unsubscribeBefore();
		unsubscribeAfter();
	} };
}


// EXTERNAL MODULE: ./node_modules/.pnpm/unhead@2.1.17/node_modules/unhead/dist/shared/unhead.AvDFlk_u.mjs
var unhead_AvDFlk_u = __webpack_require__("F");
;// CONCATENATED MODULE: ./node_modules/.pnpm/unhead@2.1.17/node_modules/unhead/dist/shared/unhead.ChXiQvI8.mjs
// @__NO_SIDE_EFFECTS__
function isUnsafeKey(key) {
  return key === "__proto__" || key === "constructor" || key === "prototype";
}

const sortTags = (a, b) => a._w === b._w ? a._p - b._p : a._w - b._w;
const TAG_WEIGHTS = {
  base: -10,
  title: 10
};
const TAG_ALIASES = {
  critical: -8,
  high: -1,
  low: 2
};
const WEIGHT_MAP = {
  meta: {
    "content-security-policy": -30,
    "charset": -20,
    "viewport": -15
  },
  link: {
    "preconnect": 20,
    "stylesheet": 60,
    "preload": 70,
    "modulepreload": 70,
    "prefetch": 90,
    "dns-prefetch": 90,
    "prerender": 90
  },
  script: {
    async: 30,
    defer: 80,
    sync: 50
  },
  style: {
    imported: 40,
    sync: 60
  }
};
const ImportStyleRe = /@import/;
const isTruthy = (val) => val === "" || val === true;
function tagWeight(head, tag) {
  if (typeof tag.tagPriority === "number")
    return tag.tagPriority;
  let weight = 100;
  const offset = TAG_ALIASES[tag.tagPriority] || 0;
  const weightMap = head.resolvedOptions.disableCapoSorting ? {
    link: {},
    script: {},
    style: {}
  } : WEIGHT_MAP;
  if (tag.tag in TAG_WEIGHTS) {
    weight = TAG_WEIGHTS[tag.tag];
  } else if (tag.tag === "meta") {
    const metaType = tag.props["http-equiv"] === "content-security-policy" ? "content-security-policy" : tag.props.charset ? "charset" : tag.props.name === "viewport" ? "viewport" : null;
    if (metaType)
      weight = WEIGHT_MAP.meta[metaType];
  } else if (tag.tag === "link" && tag.props.rel) {
    weight = weightMap.link[tag.props.rel];
  } else if (tag.tag === "script") {
    const type = String(tag.props.type);
    if (isTruthy(tag.props.async)) {
      weight = weightMap.script.async;
    } else if (tag.props.src && !isTruthy(tag.props.defer) && !isTruthy(tag.props.async) && type !== "module" && !type.endsWith("json") || tag.innerHTML && !type.endsWith("json")) {
      weight = weightMap.script.sync;
    } else if (isTruthy(tag.props.defer) && tag.props.src && !isTruthy(tag.props.async) || type === "module") {
      weight = weightMap.script.defer;
    }
  } else if (tag.tag === "style") {
    weight = tag.innerHTML && ImportStyleRe.test(tag.innerHTML) ? weightMap.style.imported : weightMap.style.sync;
  }
  return (weight || 100) + offset;
}



;// CONCATENATED MODULE: ./node_modules/.pnpm/unhead@2.1.17/node_modules/unhead/dist/shared/unhead.J7R8psSN.mjs



const allowedMetaProperties = ["name", "property", "http-equiv"];
const StandardSingleMetaTags = /* @__PURE__ */ new Set([
  "viewport",
  "description",
  "keywords",
  "robots"
]);
function isMetaArrayDupeKey(v) {
  const i = v.indexOf(":");
  if (i === -1)
    return false;
  const j = v.indexOf(":", i + 1);
  const namespace = v.slice(i + 1, j === -1 ? v.length : j);
  if (namespace === "twitter")
    return v === "meta:twitter:image" || v.startsWith("meta:twitter:image:");
  return unhead_AvDFlk_u.M.has(namespace);
}
function dedupeKey(tag) {
  const { props, tag: name } = tag;
  if (unhead_AvDFlk_u.U.has(name))
    return name;
  if (name === "link" && props.rel === "canonical")
    return "canonical";
  if (name === "link" && props.rel === "alternate") {
    if (props.hreflang)
      return `alternate:${props.hreflang}`;
    if (props.type)
      return `alternate:${props.type}:${props.href || ""}`;
  }
  if (props.charset)
    return "charset";
  if (tag.tag === "meta") {
    for (const n of allowedMetaProperties) {
      if (props[n] !== void 0) {
        const propValue = props[n];
        const isStructured = propValue && typeof propValue === "string" && propValue.includes(":");
        const isStandardSingle = propValue && StandardSingleMetaTags.has(propValue);
        const shouldAlwaysDedupe = isStructured || isStandardSingle;
        const keyPart = !shouldAlwaysDedupe && tag.key ? `:key:${tag.key}` : "";
        return `${name}:${propValue}${keyPart}`;
      }
    }
  }
  if (tag.key) {
    return `${name}:key:${tag.key}`;
  }
  if (props.id) {
    return `${name}:id:${props.id}`;
  }
  if (name === "link" && props.rel === "alternate") {
    return `alternate:${props.href || ""}`;
  }
  if (unhead_AvDFlk_u.b.has(name)) {
    const v = tag.textContent || tag.innerHTML;
    if (v) {
      return `${name}:content:${v}`;
    }
  }
}
function hashTag(tag) {
  const dedupe = tag._h || tag._d;
  if (dedupe)
    return dedupe;
  const inner = tag.textContent || tag.innerHTML;
  if (inner)
    return inner;
  const keys = Object.keys(tag.props).sort();
  return `${tag.tag}:${keys.map((k) => `${k}:${String(tag.props[k])}`).join(",")}`;
}

function walkResolver(val, resolve, key) {
  const type = typeof val;
  if (type === "function") {
    if (!key || key !== "titleTemplate" && !(key[0] === "o" && key[1] === "n")) {
      val = val();
    }
  }
  const v = resolve ? resolve(key, val) : val;
  if (Array.isArray(v)) {
    let out;
    for (let i = 0; i < v.length; i++) {
      const resolved = walkResolver(v[i], resolve);
      if (out) {
        out[i] = resolved;
      } else if (resolved !== v[i]) {
        out = v.slice(0, i);
        out[i] = resolved;
      }
    }
    return out || v;
  }
  if (v?.constructor === Object) {
    let next;
    for (const k in v) {
      const unsafe = isUnsafeKey(k);
      const resolved = unsafe ? void 0 : walkResolver(v[k], resolve, k);
      const requiresCopy = k === "_resolver";
      if (!next && (unsafe || requiresCopy || resolved !== v[k])) {
        next = {};
        for (const previousKey in v) {
          if (previousKey === k) {
            break;
          }
          next[previousKey] = v[previousKey];
        }
      }
      if (next && !unsafe) {
        next[k] = resolved;
      }
    }
    return next || v;
  }
  return v;
}

const INVALID_ATTR_NAME_RE = /[\s"'<>/=\x00-\x1F\x7F]/;

function normalizeStyleClassProps(key, value) {
  const store = key === "style" ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Set();
  function processValue(rawValue) {
    if (rawValue == null || rawValue === void 0)
      return;
    const value2 = String(rawValue).trim();
    if (!value2)
      return;
    if (key === "style") {
      const [k, ...v] = value2.split(":").map((s) => s ? s.trim() : "");
      if (k && v.length)
        store.set(k, v.join(":"));
    } else {
      value2.split(" ").filter(Boolean).forEach((c) => store.add(c));
    }
  }
  if (typeof value === "string") {
    key === "style" ? value.split(";").forEach(processValue) : processValue(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => processValue(item));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([k, v]) => {
      if (v && v !== "false") {
        key === "style" ? store.set(String(k).trim(), String(v)) : processValue(k);
      }
    });
  }
  return store;
}
function normalizeProps(tag, input) {
  tag.props = tag.props || {};
  if (!input) {
    return tag;
  }
  if (tag.tag === "templateParams") {
    tag.props = input;
    return tag;
  }
  const isHtmlTag = unhead_AvDFlk_u.H.has(tag.tag) || tag.tag === "htmlAttrs" || tag.tag === "bodyAttrs";
  for (const prop of Object.keys(input)) {
    if (isUnsafeKey(prop))
      continue;
    const isDataKey = prop.startsWith("data-");
    const isHtmlAttr = isHtmlTag && !unhead_AvDFlk_u.T.has(prop);
    const key = isHtmlAttr && !isDataKey ? prop.toLowerCase() : prop;
    if (isHtmlAttr && (!key || INVALID_ATTR_NAME_RE.test(key)))
      continue;
    const value = input[prop];
    if (value === null) {
      tag.props[key] = null;
      continue;
    }
    if (prop === "class" || prop === "style") {
      tag.props[prop] = normalizeStyleClassProps(prop, value);
      continue;
    }
    if (unhead_AvDFlk_u.T.has(prop)) {
      if ((prop === "textContent" || prop === "innerHTML") && typeof value === "object") {
        let type = input.type;
        if (!input.type) {
          type = "application/json";
        }
        if (!type?.endsWith("json") && type !== "speculationrules") {
          continue;
        }
        input.type = type;
        tag.props.type = type;
        tag[prop] = JSON.stringify(value);
      } else {
        tag[prop] = value;
      }
      continue;
    }
    const strValue = String(value);
    const isMetaContentKey = tag.tag === "meta" && key === "content";
    if (strValue === "true" || strValue === "") {
      tag.props[key] = isDataKey || isMetaContentKey ? strValue : true;
    } else if (!value && isDataKey && strValue === "false") {
      tag.props[key] = "false";
    } else if (value !== void 0) {
      tag.props[key] = value;
    }
  }
  return tag;
}
function normalizeTag(tagName, _input) {
  const input = typeof _input === "object" && typeof _input !== "function" ? _input : { [tagName === "script" || tagName === "noscript" || tagName === "style" ? "innerHTML" : "textContent"]: _input };
  const tag = normalizeProps({ tag: tagName, props: {} }, input);
  if (tag.key && unhead_AvDFlk_u.D.has(tag.tag)) {
    tag.props["data-hid"] = tag._h = tag.key;
  }
  if (tag.tag === "script" && typeof tag.innerHTML === "object") {
    tag.innerHTML = JSON.stringify(tag.innerHTML);
    tag.props.type = tag.props.type || "application/json";
  }
  return Array.isArray(tag.props.content) ? tag.props.content.map((v) => ({ ...tag, props: { ...tag.props, content: v } })) : tag;
}
function normalizeEntryToTags(input, propResolvers) {
  if (!input) {
    return [];
  }
  if (typeof input === "function") {
    input = input();
  }
  const resolvers = (key, val) => {
    for (let i = 0; i < propResolvers.length; i++) {
      val = propResolvers[i](key, val);
    }
    return val;
  };
  input = resolvers(void 0, input);
  const tags = [];
  input = walkResolver(input, resolvers);
  Object.entries(input || {}).forEach(([key, value]) => {
    if (value === void 0)
      return;
    for (const v of Array.isArray(value) ? value : [value])
      tags.push(normalizeTag(key, v));
  });
  return tags.flat();
}



;// CONCATENATED MODULE: ./node_modules/.pnpm/unhead@2.1.17/node_modules/unhead/dist/shared/unhead.BrXkGDAU.mjs





function registerPlugin(head, p) {
  const plugin = typeof p === "function" ? p(head) : p;
  const key = plugin.key || String(head.plugins.size + 1);
  const exists = head.plugins.get(key);
  if (!exists) {
    head.plugins.set(key, plugin);
    head.hooks.addHooks(plugin.hooks || {});
  }
}
// @__NO_SIDE_EFFECTS__
function createHeadCore(resolvedOptions = {}) {
  return /* @__PURE__ */ createUnhead(resolvedOptions);
}
// @__NO_SIDE_EFFECTS__
function createUnhead(resolvedOptions = {}) {
  const hooks = createHooks();
  hooks.addHooks(resolvedOptions.hooks || {});
  const ssr = !resolvedOptions.document;
  const entries = /* @__PURE__ */ new Map();
  const plugins = /* @__PURE__ */ new Map();
  const normalizeQueue = /* @__PURE__ */ new Set();
  const head = {
    _entryCount: 1,
    // 0 is reserved for internal use
    plugins,
    dirty: false,
    resolvedOptions,
    hooks,
    ssr,
    entries,
    headEntries() {
      return [...entries.values()];
    },
    use: (p) => registerPlugin(head, p),
    push(input, _options) {
      const options = { ..._options || {} };
      delete options.head;
      const _i = options._index ?? head._entryCount++;
      const inst = { _i, input, options };
      const _ = {
        _poll(rm = false) {
          head.dirty = true;
          !rm && normalizeQueue.add(_i);
          hooks.callHook("entries:updated", head);
        },
        dispose() {
          if (entries.delete(_i)) {
            head.invalidate();
          }
        },
        // a patch is the same as creating a new entry, just a nice DX
        patch(input2) {
          if (!options.mode || options.mode === "server" && ssr || options.mode === "client" && !ssr) {
            inst.input = input2;
            entries.set(_i, inst);
            _._poll();
          }
        }
      };
      _.patch(input);
      return _;
    },
    async resolveTags() {
      const ctx = {
        tagMap: /* @__PURE__ */ new Map(),
        tags: [],
        entries: [...head.entries.values()]
      };
      await hooks.callHook("entries:resolve", ctx);
      while (normalizeQueue.size) {
        const i = normalizeQueue.values().next().value;
        normalizeQueue.delete(i);
        const e = entries.get(i);
        if (e) {
          const normalizeCtx = {
            tags: normalizeEntryToTags(e.input, resolvedOptions.propResolvers || []).map((t) => Object.assign(t, e.options)),
            entry: e
          };
          await hooks.callHook("entries:normalize", normalizeCtx);
          e._tags = normalizeCtx.tags.map((t, i2) => {
            t._w = tagWeight(head, t);
            t._p = (e._i << 10) + i2;
            t._d = dedupeKey(t);
            if (!t._d)
              t._h = hashTag(t);
            return t;
          });
        }
      }
      let hasFlatMeta = false;
      ctx.entries.flatMap((e) => (e._tags || []).map((t) => ({ ...t, props: { ...t.props } }))).sort(sortTags).reduce((acc, next) => {
        const k = next._d || next._h;
        if (!acc.has(k))
          return acc.set(k, next);
        const prev = acc.get(k);
        const strategy = next?.tagDuplicateStrategy || (unhead_AvDFlk_u.c.has(next.tag) ? "merge" : null) || (next.key && next.key === prev.key ? "merge" : null);
        if (strategy === "merge") {
          const newProps = { ...prev.props };
          Object.entries(next.props).forEach(([p, v]) => (
            // @ts-expect-error untyped
            newProps[p] = p === "style" ? new Map([...prev.props.style || /* @__PURE__ */ new Map(), ...v]) : p === "class" ? /* @__PURE__ */ new Set([...prev.props.class || /* @__PURE__ */ new Set(), ...v]) : v
          ));
          acc.set(k, { ...next, props: newProps });
        } else if (next._p >> 10 === prev._p >> 10 && next.tag === "meta" && isMetaArrayDupeKey(k)) {
          acc.set(k, Object.assign([...Array.isArray(prev) ? prev : [prev], next], next));
          hasFlatMeta = true;
        } else if (next._w === prev._w ? next._p > prev._p : next?._w < prev?._w) {
          acc.set(k, next);
        }
        return acc;
      }, ctx.tagMap);
      const title = ctx.tagMap.get("title");
      const titleTemplate = ctx.tagMap.get("titleTemplate");
      head._title = title?.textContent;
      if (titleTemplate) {
        const titleTemplateFn = titleTemplate?.textContent;
        head._titleTemplate = titleTemplateFn;
        if (titleTemplateFn) {
          let newTitle = typeof titleTemplateFn === "function" ? titleTemplateFn(title?.textContent) : titleTemplateFn;
          if (typeof newTitle === "string" && !head.plugins.has("template-params")) {
            newTitle = newTitle.replace("%s", title?.textContent || "");
          }
          if (title) {
            newTitle === null ? ctx.tagMap.delete("title") : ctx.tagMap.set("title", { ...title, textContent: newTitle });
          } else {
            titleTemplate.tag = "title";
            titleTemplate.textContent = newTitle;
          }
        }
      }
      ctx.tags = Array.from(ctx.tagMap.values());
      if (hasFlatMeta) {
        ctx.tags = ctx.tags.flat().sort(sortTags);
      }
      await hooks.callHook("tags:beforeResolve", ctx);
      await hooks.callHook("tags:resolve", ctx);
      await hooks.callHook("tags:afterResolve", ctx);
      const finalTags = [];
      for (const t of ctx.tags) {
        const { innerHTML, tag, props } = t;
        if (!unhead_AvDFlk_u.V.has(tag)) {
          continue;
        }
        if (Object.keys(props).length === 0 && !(0,unhead_AvDFlk_u.h)(t.innerHTML) && !(0,unhead_AvDFlk_u.h)(t.textContent)) {
          continue;
        }
        if (tag === "meta") {
          if (!(0,unhead_AvDFlk_u.h)(props.content) && !props["http-equiv"] && !props.charset) {
            continue;
          }
        }
        if (tag === "script" && innerHTML) {
          if (String(props.type).endsWith("json")) {
            const v = typeof innerHTML === "string" ? innerHTML : JSON.stringify(innerHTML);
            t.innerHTML = v.replace(/</g, "\\u003C");
          } else if (typeof innerHTML === "string") {
            t.innerHTML = innerHTML.replace(new RegExp(`</${tag}`, "g"), `<\\/${tag}`);
          }
          t._d = dedupeKey(t);
        }
        finalTags.push(t);
      }
      return finalTags;
    },
    invalidate() {
      for (const entry of entries.values()) {
        normalizeQueue.add(entry._i);
      }
      head.dirty = true;
      hooks.callHook("entries:updated", head);
    }
  };
  (resolvedOptions?.plugins || []).forEach((p) => registerPlugin(head, p));
  head.hooks.callHook("init", head);
  resolvedOptions.init?.forEach((e) => e && head.push(e));
  return head;
}



;// CONCATENATED MODULE: ./node_modules/.pnpm/unhead@2.1.17/node_modules/unhead/dist/client.mjs






async function renderDOMHead(head, options = {}) {
  const dom = options.document || head.resolvedOptions.document;
  if (!dom || !head.dirty)
    return;
  const beforeRenderCtx = { shouldRender: true, tags: [] };
  await head.hooks.callHook("dom:beforeRender", beforeRenderCtx);
  if (!beforeRenderCtx.shouldRender)
    return;
  if (head._domUpdatePromise) {
    return head._domUpdatePromise;
  }
  head._domUpdatePromise = new Promise(async (resolve) => {
    const dupeKeyCounter = /* @__PURE__ */ new Map();
    const resolveTagPromise = new Promise((resolve2) => {
      head.resolveTags().then((tags2) => {
        resolve2(
          tags2.map((tag) => {
            const count = dupeKeyCounter.get(tag._d) || 0;
            const res = {
              tag,
              id: (count ? `${tag._d}:${count}` : tag._d) || tag._h,
              shouldRender: true
            };
            if (tag._d && isMetaArrayDupeKey(tag._d)) {
              dupeKeyCounter.set(tag._d, count + 1);
            }
            return res;
          })
        );
      });
    });
    let state = head._dom;
    if (!state) {
      state = {
        title: dom.title,
        elMap: (/* @__PURE__ */ new Map()).set("htmlAttrs", dom.documentElement).set("bodyAttrs", dom.body)
      };
      for (const key of ["body", "head"]) {
        const children = dom[key]?.children;
        for (const c of children) {
          const tag = c.tagName.toLowerCase();
          if (!unhead_AvDFlk_u.H.has(tag)) {
            continue;
          }
          const next = normalizeProps({ tag, props: {} }, {
            innerHTML: c.innerHTML,
            ...c.getAttributeNames().reduce((props, name) => {
              props[name] = c.getAttribute(name);
              return props;
            }, {}) || {}
          });
          next.key = c.getAttribute("data-hid") || void 0;
          next._d = dedupeKey(next) || hashTag(next);
          if (state.elMap.has(next._d)) {
            let count = 1;
            let k = next._d;
            while (state.elMap.has(k)) {
              k = `${next._d}:${count++}`;
            }
            state.elMap.set(k, c);
          } else {
            state.elMap.set(next._d, c);
          }
        }
      }
    }
    state.pendingSideEffects = { ...state.sideEffects };
    state.sideEffects = {};
    function track(id, scope, fn) {
      const k = `${id}:${scope}`;
      state.sideEffects[k] = fn;
      delete state.pendingSideEffects[k];
    }
    function trackCtx({ id, $el, tag }) {
      const isAttrTag = tag.tag.endsWith("Attrs");
      state.elMap.set(id, $el);
      if (!isAttrTag) {
        if (tag.textContent && tag.textContent !== $el.textContent) {
          $el.textContent = tag.textContent;
        }
        if (tag.innerHTML && tag.innerHTML !== $el.innerHTML) {
          $el.innerHTML = tag.innerHTML;
        }
        track(id, "el", () => {
          $el?.remove();
          state.elMap.delete(id);
        });
      }
      for (const k in tag.props) {
        if (!Object.prototype.hasOwnProperty.call(tag.props, k))
          continue;
        const value = tag.props[k];
        if (k.startsWith("on") && typeof value === "function") {
          const dataset = $el?.dataset;
          if (dataset && dataset[`${k}fired`]) {
            const ek = k.slice(0, -5);
            value.call($el, new Event(ek.substring(2)));
          }
          if ($el.getAttribute(`data-${k}`) !== "") {
            (tag.tag === "bodyAttrs" ? dom.defaultView : $el).addEventListener(
              // onload -> load
              k.substring(2),
              value.bind($el)
            );
            $el.setAttribute(`data-${k}`, "");
          }
          continue;
        }
        const ck = `attr:${k}`;
        if (k === "class") {
          if (!value) {
            continue;
          }
          for (const c of value) {
            isAttrTag && track(id, `${ck}:${c}`, () => $el.classList.remove(c));
            !$el.classList.contains(c) && $el.classList.add(c);
          }
        } else if (k === "style") {
          if (!value) {
            continue;
          }
          for (const [k2, v] of value) {
            track(id, `${ck}:${k2}`, () => {
              $el.style.removeProperty(k2);
            });
            $el.style.setProperty(k2, v);
          }
        } else if (value !== false && value !== null) {
          $el.getAttribute(k) !== value && $el.setAttribute(k, value === true ? "" : String(value));
          isAttrTag && track(id, ck, () => $el.removeAttribute(k));
        }
      }
    }
    const pending = [];
    const frag = {
      bodyClose: void 0,
      bodyOpen: void 0,
      head: void 0
    };
    const tags = await resolveTagPromise;
    for (const ctx of tags) {
      const { tag, shouldRender, id } = ctx;
      if (!shouldRender)
        continue;
      if (tag.tag === "title") {
        dom.title = tag.textContent;
        track("title", "", () => dom.title = state.title);
        continue;
      }
      ctx.$el = ctx.$el || state.elMap.get(id);
      if (ctx.$el) {
        trackCtx(ctx);
      } else if (unhead_AvDFlk_u.H.has(tag.tag)) {
        pending.push(ctx);
      }
    }
    for (const ctx of pending) {
      const pos = ctx.tag.tagPosition || "head";
      ctx.$el = dom.createElement(ctx.tag.tag);
      trackCtx(ctx);
      frag[pos] = frag[pos] || dom.createDocumentFragment();
      frag[pos].appendChild(ctx.$el);
    }
    for (const ctx of tags)
      await head.hooks.callHook("dom:renderTag", ctx, dom, track);
    frag.head && dom.head.appendChild(frag.head);
    frag.bodyOpen && dom.body.insertBefore(frag.bodyOpen, dom.body.firstChild);
    frag.bodyClose && dom.body.appendChild(frag.bodyClose);
    for (const k in state.pendingSideEffects) {
      state.pendingSideEffects[k]();
    }
    head._dom = state;
    await head.hooks.callHook("dom:rendered", { renders: tags });
    resolve();
  }).finally(() => {
    head._domUpdatePromise = void 0;
    head.dirty = false;
  });
  return head._domUpdatePromise;
}

function createHead(options = {}) {
  const render = options.domOptions?.render || renderDOMHead;
  options.document = options.document || (typeof window !== "undefined" ? document : void 0);
  const initialPayload = options.document?.head.querySelector('script[id="unhead:payload"]')?.innerHTML || false;
  const head = createUnhead({
    ...options,
    plugins: [
      ...options.plugins || [],
      {
        key: "client",
        hooks: {
          "entries:updated": render
        }
      }
    ],
    init: [
      initialPayload ? JSON.parse(initialPayload) : false,
      ...options.init || []
    ]
  });
  head.ssr = false;
  return head;
}

function createDebouncedFn(callee, delayer) {
  let ctxId = 0;
  return () => {
    const delayFnCtxId = ++ctxId;
    delayer(() => {
      if (ctxId === delayFnCtxId) {
        callee();
      }
    });
  };
}



// EXTERNAL MODULE: ./node_modules/.pnpm/@unhead+react@2.1.17_react@19.3.1/node_modules/@unhead/react/dist/shared/react.DF9T1fqs.mjs
var react_DF9T1fqs = __webpack_require__("b");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@unhead+react@2.1.17_react@19.3.1/node_modules/@unhead/react/dist/client.mjs





function client_createHead(options = {}) {
  const head = createHead({
    domOptions: {
      render: createDebouncedFn(() => renderDOMHead(head), (fn) => setTimeout(fn, 0))
    },
    ...options
  });
  return head;
}
function UnheadProvider({ children, value, head }) {
  const headRef = (0,react.useRef)(null);
  if (value !== void 0 && head !== void 0)
    throw new TypeError("UnheadProvider received both value and head props");
  const suppliedHead = value ?? head;
  if (suppliedHead === void 0 && headRef.current === null)
    headRef.current = client_createHead();
  return (0,react.createElement)(react_DF9T1fqs.U.Provider, { value: suppliedHead ?? headRef.current }, children);
}



// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/usePages.js
var usePages = __webpack_require__("d");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/route.js
var route = __webpack_require__("u4");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/initPageData.js





async function initPageData(routePath) {
    const matchedRoute = (0,route/* .pathnameToRouteService */.c5)(routePath);
    if (matchedRoute) {
        const mod = await matchedRoute.preload();
        const pagePath = (0,dist/* .cleanUrl */.TG)(matchedRoute.filePath);
        const normalize = (p)=>p.replace(/\/$/, '').toLowerCase();
        const extractPageInfo = usePages/* .pageData.pages.find */.Y.pages.find((page)=>(0,utils/* .isEqualPath */.Oy)(normalize(page.routePath), normalize(matchedRoute.path)));
        const encodedPagePath = encodeURIComponent(pagePath);
        const meta = mod.default.__RSPRESS_PAGE_META?.[encodedPagePath] || {};
        const { toc = [], title = '', frontmatter = {}, ...rest } = dist/* .MDX_OR_MD_REGEXP.test */.gT.test(matchedRoute.filePath) ? meta : mod;
        return {
            ...rest,
            pagePath,
            ...extractPageInfo,
            pageType: frontmatter?.pageType || 'doc',
            title,
            frontmatter,
            toc
        };
    }
    let lang = useSite/* .siteData.lang */.U.lang || '';
    let version = useSite/* .siteData.multiVersion */.U.multiVersion?.default || '';
    const path = routePath.replace(/^\//, '').split('/').slice(0, 2);
    if (useSite/* .siteData.locales.length */.U.locales.length) {
        const result = useSite/* .siteData.locales.find */.U.locales.find((param)=>{
            let { lang } = param;
            return path.includes(lang);
        });
        if (result) lang = result.lang;
    }
    if (useSite/* .siteData.multiVersion.versions */.U.multiVersion.versions) {
        const result = useSite/* .siteData.multiVersion.versions.find */.U.multiVersion.versions.find((version)=>path.includes(version));
        if (result) version = result;
    }
    return {
        pagePath: '',
        pageType: '404',
        routePath: '/404',
        lang,
        frontmatter: {},
        title: '404',
        toc: [],
        version,
        _filepath: '',
        _relativePath: ''
    };
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/pageDataLoader.js


const PAGE_ROUTE_ID = 'rspress-page';
function pageDataLoader(param) {
    let { request } = param;
    return initPageData((0,utils/* .removeBase */.EJ)(new URL(request.url).pathname));
}


// EXTERNAL MODULE: ./node_modules/.pnpm/nprogress@0.2.0/node_modules/nprogress/nprogress.js
var nprogress = __webpack_require__("Xx");
var nprogress_default = /*#__PURE__*/__webpack_require__.n(nprogress);
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/usePage.js
var usePage = __webpack_require__("e");
// EXTERNAL MODULE: ./.rspress/runtime/virtual-global-components.js
var virtual_global_components = __webpack_require__("yX");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/createExternalStore.js
var createExternalStore = __webpack_require__("v");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useGlobalComponents.js


const useGlobalComponents_store = (0,createExternalStore/* .createExternalStore */.f)(virtual_global_components/* ["default"] */.A);
function useGlobalComponents() {
    return useGlobalComponents_store.useValue();
}
if (false) {}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/App.js





const GLOBAL_COMPONENTS_KEY = 'globalUIComponents';
const WebMcpPageReading =  true ? ()=>{
    (0,theme_0/* .useWebMcpPageReading */.dL)();
    return null;
} : 0;
const WebMCP =  true ? ()=>{
    (0,theme_0/* .useWebMcpSiteInfo */.fJ)();
    (0,theme_0/* .useWebMcpPageList */.nX)();
    (0,theme_0/* .useWebMcpNavigation */.UD)();
    return WebMcpPageReading ? /*#__PURE__*/ (0,jsx_runtime.jsx)(WebMcpPageReading, {}) : null;
} : 0;
function App() {
    const globalComponents = useGlobalComponents();
    const { data } = (0,react.useContext)(usePage/* .PageContext */.N);
    const location = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const { search } = location;
    const hideGlobalUIComponents = data?.frontmatter?.[GLOBAL_COMPONENTS_KEY] === false || Boolean(search) && "0" === new URLSearchParams(search).get(GLOBAL_COMPONENTS_KEY);
    if (false) {}
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(theme_0/* .Root */.bL, {
        children: [
            WebMCP && /*#__PURE__*/ (0,jsx_runtime.jsx)(WebMCP, {}),
             true && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .LlmsHint */._K, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Layout */.PE, {}),
            !hideGlobalUIComponents && globalComponents.map((componentInfo, index)=>{
                if (Array.isArray(componentInfo)) {
                    const [component, props] = componentInfo;
                    return /*#__PURE__*/ react.createElement(component, {
                        key: index,
                        ...props
                    });
                }
                return /*#__PURE__*/ react.createElement(componentInfo, {
                    key: index
                });
            })
        ]
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/ErrorRoute.js






function ErrorRoute() {
    const error = (0,chunk_6KYCQHYJ/* .useRouteError */.r5)();
    const { pathname } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const { site } = (0,useSite/* .useSite */.Z)();
    const segments = pathname.split('/').filter(Boolean);
    const version = site.multiVersion.versions.find((v)=>v === segments[0]);
    const lang = site.locales.find((locale)=>locale.lang === segments[version ? 1 : 0])?.lang || site.lang;
    const prefix = [
        version !== site.multiVersion.default ? version : void 0,
        lang !== site.lang ? lang : void 0
    ].filter(Boolean);
    const homeHref = (0,utils/* .withBase */.cV)(prefix.length ? `/${prefix.join('/')}/` : '/');
    (0,react.useEffect)(()=>{
        console.error('[rspress] Failed to render page:', error);
    }, [
        error
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .ErrorLayout */.x$, {
        error: error,
        lang: lang,
        homeHref: homeHref
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/PageRoute.js








nprogress_default().configure({
    showSpinner: false
});
function PageRoute() {
    const page = (0,chunk_6KYCQHYJ/* .useLoaderData */.LG)();
    const { state } = (0,chunk_6KYCQHYJ/* .useNavigation */.cq)();
    const [override, setOverride] = (0,react.useState)();
    const data = override?.source === page ? override.data : page;
    const setData = (0,react.useCallback)((data)=>{
        setOverride({
            source: page,
            data
        });
    }, [
        page
    ]);
    (0,react.useEffect)(()=>{
        if ('idle' === state) return;
        const timer = setTimeout(()=>nprogress_default().start(), 200);
        return ()=>{
            clearTimeout(timer);
            nprogress_default().done();
        };
    }, [
        state
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(usePage/* .PageContext.Provider */.N.Provider, {
        value: (0,react.useMemo)(()=>({
                data,
                setData
            }), [
            data,
            setData
        ]),
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(App, {})
    });
}
function createPageRoutes() {
    return [
        {
            hydrateFallbackElement: /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {}),
            element: /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_6KYCQHYJ/* .Outlet */.sv, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_6KYCQHYJ/* .ScrollRestoration */.OA, {
                        storageKey: "rspress-scroll-positions"
                    })
                ]
            }),
            children: [
                {
                    id: PAGE_ROUTE_ID,
                    path: '*',
                    loader: pageDataLoader,
                    element: /*#__PURE__*/ (0,jsx_runtime.jsx)(PageRoute, {}),
                    errorElement: /*#__PURE__*/ (0,jsx_runtime.jsx)(ErrorRoute, {})
                }
            ]
        }
    ];
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/ClientApp.js







const ClientApp_head = client_createHead();
function createClientRouter(initialPageData) {
    if (!window.history.state?.key) window.history.replaceState({
        ...window.history.state,
        key: Math.random().toString(36).slice(2, 10)
    }, '');
    return (0,chunk_6KYCQHYJ/* .createBrowserRouter */.Ys)(createPageRoutes(), {
        basename: (0,dist/* .removeTrailingSlash */.UC)((0,utils/* .withBase */.cV)('/')),
        hydrationData: initialPageData ? {
            loaderData: {
                [PAGE_ROUTE_ID]: initialPageData
            }
        } : void 0
    });
}
function ClientApp(param) {
    let { router } = param;
    const [theme, setTheme] = (0,theme_0/* .useThemeState */.G5)();
    const { site } = (0,useSite/* .useSite */.Z)();
    const transitionOptions = {
        useTransitions: site.route.useTransitions,
        future: {
            v7_startTransition: site.route.useTransitions
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(useDark/* .ThemeContext.Provider */.D.Provider, {
        value: (0,react.useMemo)(()=>({
                theme,
                setTheme
            }), [
            theme,
            setTheme
        ]),
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(UnheadProvider, {
            head: ClientApp_head,
            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(dom_export/* .RouterProvider */.pg, {
                router: router,
                ...transitionOptions
            })
        })
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/ssrClientEntry.js







async function renderInBrowser() {
    (0,route/* .redirectToCleanUrl */.IA)(window.location, window.history);
    const container = document.getElementById('__rspress_root');
    const pathname = (0,utils/* .removeBase */.EJ)(window.location.pathname);
    let initialPageData;
    try {
        initialPageData = await initPageData(pathname);
    } catch  {
        (0,client.createRoot)(container).render(/*#__PURE__*/ (0,jsx_runtime.jsx)(ClientApp, {
            router: createClientRouter()
        }));
        return;
    }
    const router = createClientRouter(initialPageData);
    (0,react.startTransition)(()=>{
        (0,client.hydrateRoot)(container, /*#__PURE__*/ (0,jsx_runtime.jsx)(ClientApp, {
            router: router
        }), {
            onRecoverableError (error, errorInfo) {
                if (error instanceof Error) console.warn('hydrateRoot recoverable error:', error, errorInfo);
            }
        });
    });
}
renderInBrowser();


},
"i"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
/* import */ var _rspress_shared__rspack_import_0 = __webpack_require__("n");
/* import */ var _hooks_useSite_js__rspack_import_1 = __webpack_require__("Z");


function utils_withBase() {
    let url = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '/';
    return (0,_rspress_shared__rspack_import_0/* .withBase */.cV)(url, _hooks_useSite_js__rspack_import_1/* .siteData.base */.U.base);
}
function utils_withSiteOrigin(url) {
    return (0,_rspress_shared__rspack_import_0/* .withSiteOrigin */.OM)(url, _hooks_useSite_js__rspack_import_1/* .siteData.siteOrigin */.U.siteOrigin);
}
function utils_removeBase(url) {
    return (0,_rspress_shared__rspack_import_0/* .removeBase */.EJ)(url, _hooks_useSite_js__rspack_import_1/* .siteData.base */.U.base);
}
function isEqualPath(a, b) {
    return utils_removeBase((0,_rspress_shared__rspack_import_0/* .normalizeHref */.Tj)((0,_rspress_shared__rspack_import_0/* .removeHash */.fr)(a), true)) === utils_removeBase((0,_rspress_shared__rspack_import_0/* .normalizeHref */.Tj)((0,_rspress_shared__rspack_import_0/* .removeHash */.fr)(b), true));
}
function normalizeHrefInRuntime(link) {
    const cleanUrls = Boolean(_hooks_useSite_js__rspack_import_1/* .siteData */.U?.route?.cleanUrls);
    return (0,_rspress_shared__rspack_import_0/* .normalizeHref */.Tj)(link, cleanUrls);
}
function cleanUrlByConfig(link) {
    if (_hooks_useSite_js__rspack_import_1/* .siteData */.U?.route?.cleanUrls) return (0,_rspress_shared__rspack_import_0/* .normalizeHref */.Tj)(link, true);
    return link;
}
function normalizeImagePath(imagePath) {
    if (isAbsoluteUrl(imagePath)) return imagePath;
    if (!imagePath.startsWith('/')) return imagePath;
    return utils_withBase(imagePath);
}
function routePathToMdPath(routePath) {
    let url = routePath;
    url = (0,_rspress_shared__rspack_import_0/* .normalizeHref */.Tj)(url, false);
    url = url.replace(/\.html(?=#|\?|$)/, '.md');
    return utils_withBase(url);
}
function isAbsoluteUrl(path) {
    return (0,_rspress_shared__rspack_import_0/* .isExternalUrl */.My)(path) || (0,_rspress_shared__rspack_import_0/* .isDataUrl */.ax)(path) || path.startsWith('//');
}


__webpack_require__.d(__webpack_exports__, {
}, {
  As: normalizeImagePath,
  EJ: utils_removeBase,
  Gk: cleanUrlByConfig,
  OM: utils_withSiteOrigin,
  Oy: isEqualPath,
  cV: utils_withBase,
  cc: normalizeHrefInRuntime,
  qp: routePathToMdPath
});


},
"BO"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  k: () => (PackageManagerTabs)
});
/* import */ var react_jsx_runtime__rspack_import_0 = __webpack_require__("A8");
/* import */ var _rspress_core_theme__rspack_import_1 = __webpack_require__("L");
/* import */ var react__rspack_import_2 = __webpack_require__("U");



const transformDenoPositional = (cmd)=>{
    const parts = cmd.split(' ');
    const subcommand = parts[1];
    const isRun = 'run' === subcommand;
    let transformedFirst = false;
    const transformed = parts.map((tok, idx)=>{
        if (idx >= 2 && !tok.startsWith('-') && !tok.includes(':') && !/^https?:/.test(tok)) {
            if (isRun && transformedFirst) return tok;
            transformedFirst = true;
            return `npm:${tok}`;
        }
        return tok;
    });
    return transformed.join(' ');
};
function normalizeCommand(command) {
    if (command.startsWith('yarn create')) return command.replace(/(yarn create [^\s]+)@latest/, '$1');
    if (command.startsWith('deno ')) {
        const transformedCmd = command.replace(/deno create\s+([^\s]+)/, 'deno init --npm $1');
        if (!transformedCmd.includes('install')) {
            if (transformedCmd.includes('--npm') || transformedCmd.includes('--jsr')) return transformedCmd;
            return transformDenoPositional(transformedCmd);
        }
    }
    if (!command?.includes('install')) return command;
    const pureCommand = command.split(' ').filter((item)=>!item.startsWith('-') && !item.startsWith('--')).join(' ');
    if ('yarn install' === pureCommand || 'pnpm install' === pureCommand || 'bun install' === pureCommand || 'deno install' === pureCommand) return command;
    const replaced = command.replace(/\binstall\b/, 'add');
    if (replaced.startsWith('deno ')) {
        if (replaced.includes('--npm') || replaced.includes('--jsr')) return replaced;
        return transformDenoPositional(replaced);
    }
    return replaced;
}
function splitTo2Parts(command) {
    const parts = command.split(' ');
    const firstPart = parts[0];
    const secondPart = command.slice(firstPart.length);
    return [
        firstPart,
        secondPart
    ];
}
function PackageManagerTabs(param) {
    let { command, exec, dlx, additionalTabs = [] } = param;
    let commandInfo;
    const packageMangerToIcon = {
        npm: /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)(_rspress_core_theme__rspack_import_1/* .SvgWrapper */.Ge, {
            icon: _rspress_core_theme__rspack_import_1/* .IconNpm */.$P
        }),
        yarn: /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)(_rspress_core_theme__rspack_import_1/* .SvgWrapper */.Ge, {
            icon: _rspress_core_theme__rspack_import_1/* .IconYarn */.a$
        }),
        pnpm: /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)(_rspress_core_theme__rspack_import_1/* .SvgWrapper */.Ge, {
            icon: _rspress_core_theme__rspack_import_1/* .IconPnpm */.HF
        }),
        bun: /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)(_rspress_core_theme__rspack_import_1/* .SvgWrapper */.Ge, {
            icon: _rspress_core_theme__rspack_import_1/* .IconBun */.d6
        }),
        deno: /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)(_rspress_core_theme__rspack_import_1/* .SvgWrapper */.Ge, {
            icon: _rspress_core_theme__rspack_import_1/* .IconDeno */.sn
        })
    };
    additionalTabs.forEach((tab)=>{
        packageMangerToIcon[tab.tool] = tab.icon;
    });
    const Pre = (0,react__rspack_import_2.useMemo)(()=>(0,_rspress_core_theme__rspack_import_1/* .getCustomMDXComponent */.GD)().pre, [
        _rspress_core_theme__rspack_import_1/* .getCustomMDXComponent */.GD
    ]);
    if ('string' == typeof command) {
        const getPrefix = (packageManager)=>{
            if (dlx) switch(packageManager){
                case 'npm':
                    return 'npx';
                case 'yarn':
                    return 'yarn dlx';
                case 'pnpm':
                    return 'pnpm dlx';
                case 'bun':
                    return 'bunx';
                case 'deno':
                    return 'deno run -A';
                default:
                    return packageManager;
            }
            else if (!exec) return packageManager;
            else switch(packageManager){
                case 'npm':
                    return 'npx';
                case 'yarn':
                    return 'yarn';
                case 'pnpm':
                    return 'pnpm';
                case 'bun':
                    return 'bun';
                case 'deno':
                    return 'deno run -A';
                default:
                    return packageManager;
            }
        };
        commandInfo = {
            npm: `${getPrefix('npm')} ${command}`,
            yarn: `${getPrefix('yarn')} ${command}`,
            pnpm: `${getPrefix('pnpm')} ${command}`,
            bun: `${getPrefix('bun')} ${command}`,
            deno: `${getPrefix('deno')} ${command}`
        };
        additionalTabs.forEach((tab)=>{
            commandInfo[tab.tool] = `${tab.tool} ${command}`;
        });
        commandInfo.yarn = normalizeCommand(commandInfo.yarn);
        commandInfo.pnpm = normalizeCommand(commandInfo.pnpm);
        commandInfo.bun = normalizeCommand(commandInfo.bun);
        commandInfo.deno = normalizeCommand(commandInfo.deno);
    } else commandInfo = {
        ...command
    };
    additionalTabs.forEach((tab)=>{
        if (void 0 !== tab.command) commandInfo[tab.tool] = tab.command;
    });
    if (false) {}
    return /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)(_rspress_core_theme__rspack_import_1/* .Tabs */.tU, {
        groupId: "package.manager",
        children: Object.entries(commandInfo).map((param)=>{
            let [key, value] = param;
            const [packageManager, command] = splitTo2Parts(value);
            return /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)(_rspress_core_theme__rspack_import_1/* .Tab */.oz, {
                label: /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsxs)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 15
                    },
                    children: [
                        packageMangerToIcon[key],
                        /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)("span", {
                            style: {
                                marginLeft: 6,
                                marginBottom: 2
                            },
                            children: key
                        })
                    ]
                }),
                children: /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)(Pre, {
                    lang: "bash",
                    className: "shiki css-variables",
                    style: {
                        backgroundColor: 'var(--shiki-background)',
                        color: 'var(--shiki-foreground)'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)("code", {
                        style: {
                            whiteSpace: 'pre'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsxs)("span", {
                            className: "line",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)("span", {
                                    style: {
                                        color: 'var(--shiki-token-function)'
                                    },
                                    children: packageManager
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)("span", {
                                    style: {
                                        color: 'var(--shiki-token-string)'
                                    },
                                    children: command
                                })
                            ]
                        })
                    })
                })
            }, key);
        })
    });
}



},
"BT"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  G: () => (SvgWrapper)
});
/* import */ var react_jsx_runtime__rspack_import_0 = __webpack_require__("A8");
/* import */ var _rspress_core_runtime__rspack_import_2 = __webpack_require__("i");
/* import */ var _rspress_core_theme__rspack_import_1 = __webpack_require__("L");



function isUrlOrPath(str) {
    return str.startsWith('/') || str.startsWith('./') || str.startsWith('../') || str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:');
}
function SvgWrapper(param) {
    let { icon: Icon, ...rest } = param;
    if (!Icon) return null;
    if ('string' == typeof Icon) {
        const { className } = rest;
        if (Icon.trim().startsWith('<svg')) return /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)("span", {
            className: className,
            dangerouslySetInnerHTML: {
                __html: Icon
            }
        });
        if (isUrlOrPath(Icon)) return /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)("img", {
            className: className,
            src: (0,_rspress_core_runtime__rspack_import_2/* .normalizeImagePath */.As)(Icon),
            alt: ""
        });
        return /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)("span", {
            className: className,
            ...(0,_rspress_core_theme__rspack_import_1/* .renderHtmlOrText */.i7)(Icon)
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)(Icon, {
        ...rest
    });
}



},
"gC"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Ex: () => (/* reexport */ Badge_Badge),
  $n: () => (/* reexport */ Button_Button),
  Pq: () => (/* reexport */ Callout_Callout),
  NG: () => (/* reexport */ CodeBlock_CodeBlock),
  zq: () => (/* reexport */ CodeButtonGroup_CodeButtonGroup),
  As: () => (/* reexport */ DocContent),
  co: () => (/* reexport */ DocFooter_DocFooter),
  fS: () => (/* reexport */ DocLayout_DocLayout),
  Lp: () => (/* reexport */ EditLink_EditLink),
  x$: () => (/* reexport */ ErrorLayout_ErrorLayout),
  x5: () => (/* reexport */ FallbackHeading),
  Eg: () => (/* reexport */ HomeBackground_HomeBackground),
  K6: () => (/* reexport */ HomeFeature_HomeFeature),
  hM: () => (/* reexport */ HomeFooter_HomeFooter),
  UQ: () => (/* reexport */ HomeHero_HomeHero),
  Cq: () => (/* reexport */ IconAnthropic),
  RG: () => (/* reexport */ IconArrowDown),
  hI: () => (/* reexport */ IconArrowRight),
  d6: () => (/* reexport */ IconBun),
  gz: () => (/* reexport */ IconClose),
  bz: () => (/* reexport */ IconCopy),
  sn: () => (/* reexport */ IconDeno),
  nD: () => (/* reexport */ IconDeprecated),
  Y7: () => (/* reexport */ IconDown),
  GI: () => (/* reexport */ IconEdit),
  Fw: () => (/* reexport */ IconEmpty),
  kC: () => (/* reexport */ IconExperimental),
  HW: () => (/* reexport */ IconExternalLink),
  g6: () => (/* reexport */ IconFile),
  D7: () => (/* reexport */ IconHeader),
  uO: () => (/* reexport */ IconJump),
  AX: () => (/* reexport */ IconLink),
  j3: () => (/* reexport */ IconMarkdown),
  dd: () => (/* reexport */ IconMenu),
  l0: () => (/* reexport */ IconMoon),
  $P: () => (/* reexport */ IconNpm),
  I4: () => (/* reexport */ IconOpenAI),
  VY: () => (/* reexport */ IconOpenInChat),
  HF: () => (/* reexport */ IconPnpm),
  HO: () => (/* reexport */ IconScrollToTop),
  C0: () => (/* reexport */ IconSearch),
  kv: () => (/* reexport */ IconSmallMenu),
  lv: () => (/* reexport */ IconSuccess),
  mT: () => (/* reexport */ IconSun),
  Mk: () => (/* reexport */ IconTitle),
  QB: () => (/* reexport */ IconWrap),
  hG: () => (/* reexport */ IconWrapped),
  a$: () => (/* reexport */ IconYarn),
  KS: () => (/* reexport */ LastUpdated_LastUpdated),
  PE: () => (/* reexport */ Layout),
  N_: () => (/* reexport */ Link_Link),
  QZ: () => (/* reexport */ LlmsContainer_LlmsContainer),
  mS: () => (/* reexport */ LlmsCopyButton_LlmsCopyButton),
  KG: () => (/* reexport */ LlmsCopyRow),
  _K: () => (/* reexport */ LlmsHint),
  vw: () => (/* reexport */ LlmsOpenRow_LlmsOpenRow),
  YU: () => (/* reexport */ LlmsViewOptions_LlmsViewOptions),
  so: () => (/* reexport */ Nav_Nav),
  fx: () => (/* reexport */ NavHamburger_NavHamburger),
  ue: () => (/* reexport */ NavTitle_NavTitle),
  Ab: () => (/* reexport */ NotFountLayout_NotFoundLayout),
  Rc: () => (/* reexport */ Outline_Outline),
  Aw: () => (/* reexport */ Overview_Overview),
  v7: () => (/* reexport */ OverviewGroup_OverviewGroup),
  ky: () => (/* reexport */ PackageManagerTabs/* .PackageManagerTabs */.k),
  UC: () => (/* reexport */ PrevNextPage_PrevNextPage),
  a9: () => (/* reexport */ ReadPercent_ReadPercent),
  bL: () => (/* reexport */ Root),
  vj: () => (/* reexport */ Search),
  vd: () => (/* reexport */ SearchButton_SearchButton),
  Pl: () => (/* reexport */ SearchPanel_SearchPanel),
  Bx: () => (/* reexport */ Sidebar),
  RP: () => (/* reexport */ SocialLinks_SocialLinks),
  gj: () => (/* reexport */ Steps_Steps),
  bS: () => (/* reexport */ SwitchAppearance_SwitchAppearance),
  oz: () => (/* reexport */ Tab),
  tU: () => (/* reexport */ Tabs_Tabs),
  OT: () => (/* reexport */ Tag_Tag),
  vN: () => (/* reexport */ Toc),
  lW: () => (/* reexport */ copyToClipboard),
  El: () => (/* reexport */ getCopyableText),
  GD: () => (/* reexport */ getCustomMDXComponent),
  zE: () => (/* reexport */ parseInlineMarkdownText),
  i7: () => (/* reexport */ renderHtmlOrText),
  nl: () => (/* reexport */ renderInlineMarkdown),
  R3: () => (/* reexport */ useActiveAnchor),
  i6: () => (/* reexport */ useCodeButtonGroup),
  J6: () => (/* reexport */ useDynamicToc),
  _2: () => (/* reexport */ useHoverGroup),
  X6: () => (/* reexport */ useLinkNavigate),
  ZZ: () => (/* reexport */ usePrevNextPage),
  dS: () => (/* reexport */ useReadPercent),
  zV: () => (/* reexport */ useSetup),
  yL: () => (/* reexport */ useStorageValue),
  G5: () => (/* reexport */ useThemeState),
  n6: () => (/* reexport */ useWatchToc),
  UD: () => (/* reexport */ useWebMcpNavigation),
  nX: () => (/* reexport */ useWebMcpPageList),
  dL: () => (/* reexport */ useWebMcpPageReading),
  fJ: () => (/* reexport */ useWebMcpSiteInfo)
});

// UNUSED EXPORTS: Banner, CdnTabs, CodeBlockRuntime, HomeLayout, HoverGroup, IconGithub, IconGitlab, IconJsdelivr, IconLoading, IconUnpkg, NavList, PageTab, PageTabs, Prompt, RenderType, SidebarList, SourceCode, SvgWrapper, mergeRefs, useEditLink, useFullTextSearch, useMdUrl

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("A8");
// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.3.1/node_modules/react/index.js
var react = __webpack_require__("U");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/arrow-down.js


const SvgArrowDown = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        width: "1em",
        height: "1em",
        viewBox: "0 0 32 32",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "M16 22 6 12l1.4-1.4 8.6 8.6 8.6-8.6L26 12z"
        })
    });
var arrow_down = SvgArrowDown;
/* export default */ var assets_arrow_down = (arrow_down);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/arrow-right.js


const SvgArrowRight = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        width: "1em",
        height: "1em",
        viewBox: "0 0 32 32",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "M22 16 12 26l-1.4-1.4 8.6-8.6-8.6-8.6L12 6z"
        })
    });
var arrow_right = SvgArrowRight;
/* export default */ var assets_arrow_right = (arrow_right);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/anthropic.js


const SvgAnthropic = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 16,
        height: 16,
        fill: "currentColor",
        viewBox: "0 0 24 24",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            d: "M17.304 3.541h-3.672l6.696 16.918H24Zm-10.608 0L0 20.459h3.744l1.37-3.553h7.005l1.369 3.553h3.744L10.536 3.541Zm-.371 10.223L8.616 7.82l2.291 5.945Z"
        })
    });
var anthropic = SvgAnthropic;
/* export default */ var assets_anthropic = (anthropic);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/bun.js


const SvgBun = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1.2em",
        height: "1.2em",
        viewBox: "0 0 80 70",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M71.09 20.74c-.16-.17-.33-.34-.5-.5s-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5A26.46 26.46 0 0 1 75.5 35.7c0 16.57-16.82 30.05-37.5 30.05-11.58 0-21.94-4.23-28.83-10.86l.5.5.5.5.5.5.5.5.5.5.5.5.5.5C19.55 65.3 30.14 69.75 42 69.75c20.68 0 37.5-13.48 37.5-30 0-7.06-3.04-13.75-8.41-19.01"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M73 35.7c0 15.21-15.67 27.54-35 27.54S3 50.91 3 35.7C3 26.27 9 17.94 18.22 13S33.18 3 38 3s8.94 4.13 19.78 10C67 17.94 73 26.27 73 35.7",
                style: {
                    fill: "#fbf0df"
                }
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M73 35.7a21.7 21.7 0 0 0-.8-5.78c-2.73 33.3-43.35 34.9-59.32 24.94A40 40 0 0 0 38 63.24c19.3 0 35-12.35 35-27.54",
                "data-name": "Bottom Shadow",
                style: {
                    fill: "#f6dece"
                }
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M24.53 11.17C29 8.49 34.94 3.46 40.78 3.45A9.3 9.3 0 0 0 38 3c-2.42 0-5 1.25-8.25 3.13-1.13.66-2.3 1.39-3.54 2.15-2.33 1.44-5 3.07-8 4.7C8.69 18.13 3 26.62 3 35.7v1.19c6.06-21.41 17.07-23.04 21.53-25.72",
                "data-name": "Light Shine",
                style: {
                    fill: "#fffefc"
                }
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M35.12 5.53A16.41 16.41 0 0 1 29.49 18c-.28.25-.06.73.3.59 3.37-1.31 7.92-5.23 6-13.14-.08-.45-.67-.33-.67.08m2.27 0A16.24 16.24 0 0 1 39 19c-.12.35.31.65.55.36 2.19-2.8 4.1-8.36-1.62-14.36-.29-.26-.74.14-.54.49Zm2.76-.17A16.42 16.42 0 0 1 47 17.12a.33.33 0 0 0 .65.11c.92-3.49.4-9.44-7.17-12.53-.4-.16-.66.38-.33.62Zm-18.46 10.4a16.94 16.94 0 0 0 10.47-9c.18-.36.75-.22.66.18-1.73 8-7.52 9.67-11.12 9.45-.38.01-.37-.52-.01-.63",
                style: {
                    fill: "#ccbea7",
                    fillRule: "evenodd"
                }
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M38 65.75C17.32 65.75.5 52.27.5 35.7c0-10 6.18-19.33 16.53-24.92 3-1.6 5.57-3.21 7.86-4.62 1.26-.78 2.45-1.51 3.6-2.19C32 1.89 35 .5 38 .5s5.62 1.2 8.9 3.14c1 .57 2 1.19 3.07 1.87 2.49 1.54 5.3 3.28 9 5.27C69.32 16.37 75.5 25.69 75.5 35.7c0 16.57-16.82 30.05-37.5 30.05M38 3c-2.42 0-5 1.25-8.25 3.13-1.13.66-2.3 1.39-3.54 2.15-2.33 1.44-5 3.07-8 4.7C8.69 18.13 3 26.62 3 35.7c0 15.19 15.7 27.55 35 27.55S73 50.89 73 35.7c0-9.08-5.69-17.57-15.22-22.7-3.78-2-6.73-3.88-9.12-5.36-1.09-.67-2.09-1.29-3-1.84C42.63 4 40.42 3 38 3"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M45.05 43a8.93 8.93 0 0 1-2.92 4.71 6.8 6.8 0 0 1-4 1.88A6.84 6.84 0 0 1 34 47.71 8.93 8.93 0 0 1 31.12 43a.72.72 0 0 1 .8-.81h12.34a.72.72 0 0 1 .79.81",
                "data-name": "Background",
                style: {
                    fill: "#b71422"
                }
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M34 47.79a6.9 6.9 0 0 0 4.12 1.9 6.9 6.9 0 0 0 4.11-1.9 11 11 0 0 0 1-1.07 6.83 6.83 0 0 0-4.9-2.31 6.15 6.15 0 0 0-5 2.78c.23.21.43.41.67.6",
                "data-name": "Background",
                style: {
                    fill: "#ff6164"
                }
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M34.16 47a5.36 5.36 0 0 1 4.19-2.08 6 6 0 0 1 4 1.69c.23-.25.45-.51.66-.77a7 7 0 0 0-4.71-1.93 6.36 6.36 0 0 0-4.89 2.36 10 10 0 0 0 .75.73",
                "data-name": "Outline"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M38.09 50.19a7.42 7.42 0 0 1-4.45-2 9.52 9.52 0 0 1-3.11-5.05 1.2 1.2 0 0 1 .26-1 1.41 1.41 0 0 1 1.13-.51h12.34a1.44 1.44 0 0 1 1.13.51 1.19 1.19 0 0 1 .25 1 9.52 9.52 0 0 1-3.11 5.05 7.42 7.42 0 0 1-4.44 2m-6.17-7.4c-.16 0-.2.07-.21.09a8.3 8.3 0 0 0 2.73 4.37A6.23 6.23 0 0 0 38.09 49a6.28 6.28 0 0 0 3.65-1.73 8.3 8.3 0 0 0 2.72-4.37.21.21 0 0 0-.2-.09Z",
                "data-name": "Outline"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("ellipse", {
                cx: 53.22,
                cy: 40.18,
                "data-name": "Right Blush",
                rx: 5.85,
                ry: 3.44,
                style: {
                    fill: "#febbd0"
                }
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("ellipse", {
                cx: 22.95,
                cy: 40.18,
                "data-name": "Left Bluch",
                rx: 5.85,
                ry: 3.44,
                style: {
                    fill: "#febbd0"
                }
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M25.7 38.8a5.51 5.51 0 1 0-5.5-5.51 5.51 5.51 0 0 0 5.5 5.51m24.77 0A5.51 5.51 0 1 0 45 33.29a5.5 5.5 0 0 0 5.47 5.51",
                style: {
                    fillRule: "evenodd"
                }
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M24 33.64a2.07 2.07 0 1 0-2.06-2.07A2.07 2.07 0 0 0 24 33.64m24.77 0a2.07 2.07 0 1 0-2.06-2.07 2.07 2.07 0 0 0 2.04 2.07Z",
                style: {
                    fill: "#fff",
                    fillRule: "evenodd"
                }
            })
        ]
    });
var bun = SvgBun;
/* export default */ var assets_bun = (bun);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/close.js


const SvgClose = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 32 32",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "M24 9.4 22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6z"
        })
    });
var assets_close = SvgClose;
/* export default */ var theme_assets_close = (assets_close);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/copy.js


const SvgCopy = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 32,
        height: 32,
        viewBox: "0 0 24 24",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                fill: "currentColor",
                d: "M20 8v12H8V8zm0-2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                fill: "currentColor",
                d: "M4 16H2V4a2 2 0 0 1 2-2h12v2H4Z"
            })
        ]
    });
var copy = SvgCopy;
/* export default */ var assets_copy = (copy);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/deprecated.js


const SvgDeprecated = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        width: "1em",
        height: "1em",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        viewBox: "0 0 16 16",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M6.75 2.75a1.25 1.25 0 1 1 2.5 0V3h-2.5zM5.25 3v-.25a2.75 2.75 0 0 1 5.5 0V3H15v1.5h-1.115l-.707 9.192A2.5 2.5 0 0 1 10.685 16h-5.37a2.5 2.5 0 0 1-2.493-2.308L2.115 4.5H1V3h4.25m-.932 10.577L3.62 4.5h8.76l-.698 9.077a1 1 0 0 1-.997.923h-5.37a1 1 0 0 1-.997-.923",
            clipRule: "evenodd"
        })
    });
var deprecated = SvgDeprecated;
/* export default */ var assets_deprecated = (deprecated);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/deno.js


const SvgDeno = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 24 24",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "M1.105 18.02A11.9 11.9 0 0 1 0 12.985q0-.698.078-1.376a12 12 0 0 1 .231-1.34A12 12 0 0 1 4.025 4.02a12 12 0 0 1 5.46-2.771 12 12 0 0 1 3.428-.23c1.452.112 2.825.477 4.077 1.05a12 12 0 0 1 2.78 1.774 12.02 12.02 0 0 1 4.053 7.078A12 12 0 0 1 24 12.985q0 .454-.036.914a12 12 0 0 1-.728 3.305 12 12 0 0 1-2.38 3.875c-1.33 1.357-3.02 1.962-4.43 1.936a4.4 4.4 0 0 1-2.724-1.024c-.99-.853-1.391-1.83-1.53-2.919a5 5 0 0 1 .128-1.518c.105-.38.37-1.116.76-1.437-.455-.197-1.04-.624-1.226-.829-.045-.05-.04-.13 0-.183a.155.155 0 0 1 .177-.053c.392.134.869.267 1.372.35.66.111 1.484.25 2.317.292 2.03.1 4.153-.813 4.812-2.627s.403-3.609-1.96-4.685-3.454-2.356-5.363-3.128c-1.247-.505-2.636-.205-4.06.582-3.838 2.121-7.277 8.822-5.69 15.032a.191.191 0 0 1-.315.19 12 12 0 0 1-1.25-1.634 12 12 0 0 1-.769-1.404M11.57 6.087c.649-.051 1.214.501 1.31 1.236.13.979-.228 1.99-1.41 2.013-1.01.02-1.315-.997-1.248-1.614.066-.616.574-1.575 1.35-1.635"
        })
    });
var deno = SvgDeno;
/* export default */ var assets_deno = (deno);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/down.js


const SvgDown = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        width: "1em",
        height: "1em",
        viewBox: "0 0 32 32",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "M16 22 6 12l1.4-1.4 8.6 8.6 8.6-8.6L26 12z"
        })
    });
var down = SvgDown;
/* export default */ var assets_down = (down);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/edit.js


const SvgEdit = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        width: "1em",
        height: "1em",
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        viewBox: "0 0 24 24",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"
        })
    });
var edit = SvgEdit;
/* export default */ var assets_edit = (edit);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/empty.js


const SvgEmpty = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 48,
        height: 48,
        fill: "none",
        viewBox: "0 0 48 48",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                stroke: "currentColor",
                strokeWidth: 4,
                d: "M24 5v6m7 1 4-4m-18 4-4-4m27 33H8a2 2 0 0 1-2-2v-8.46a2 2 0 0 1 .272-1.007l6.15-10.54A2 2 0 0 1 14.148 18H33.85a2 2 0 0 1 1.728.992l6.149 10.541A2 2 0 0 1 42 30.541V39a2 2 0 0 1-2 2Z"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                stroke: "currentColor",
                strokeWidth: 4,
                d: "M41.5 30H28s-1 3-4 3-4-3-4-3H6.5"
            })
        ]
    });
var empty = SvgEmpty;
/* export default */ var assets_empty = (empty);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/experimental.js


const SvgExperimental = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        width: "1em",
        height: "1em",
        strokeLinejoin: "round",
        "data-testid": "geist-icon",
        style: {
            color: "currentcolor"
        },
        viewBox: "0 0 16 16",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M9 7.674V2.5H7v5.174l-.503.447L4.383 10h7.234L9.503 8.121zM5.5 2.5H4V1h8v1.5h-1.5V7l3.573 3.177A2.76 2.76 0 0 1 12.24 15H3.76a2.76 2.76 0 0 1-1.834-4.823L5.5 7zm-3 9.74c0-.268.085-.527.24-.74h10.52a1.26 1.26 0 0 1-1.02 2H3.76a1.26 1.26 0 0 1-1.26-1.26",
            clipRule: "evenodd"
        })
    });
var experimental = SvgExperimental;
/* export default */ var assets_experimental = (experimental);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/external-link.js


const SvgExternalLink = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 16,
        height: 16,
        fill: "none",
        viewBox: "0 0 16 16",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            stroke: "currentColor",
            d: "M9.333 2H14v4.667M14 9.825V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3M8.6 7.4l5.1-5.1"
        })
    });
var external_link = SvgExternalLink;
/* export default */ var assets_external_link = (external_link);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/open-in-chat.js


const SvgOpenInChat = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 16,
        height: 16,
        fill: "none",
        viewBox: "0 0 24 24",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
        })
    });
var open_in_chat = SvgOpenInChat;
/* export default */ var assets_open_in_chat = (open_in_chat);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/file.js


const SvgFile = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 32 32",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("circle", {
                cx: 22,
                cy: 24,
                r: 2,
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                fill: "none",
                d: "M22 28a4 4 0 1 1 4-4 4.004 4.004 0 0 1-4 4m0-6a2 2 0 1 0 2 2 2.003 2.003 0 0 0-2-2"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                fill: "currentColor",
                d: "M29.777 23.479A8.64 8.64 0 0 0 22 18a8.64 8.64 0 0 0-7.777 5.479L14 24l.223.521A8.64 8.64 0 0 0 22 30a8.64 8.64 0 0 0 7.777-5.479L30 24ZM22 28a4 4 0 1 1 4-4 4.005 4.005 0 0 1-4 4"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                fill: "currentColor",
                d: "M12 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6v4h2v-6a.91.91 0 0 0-.3-.7l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h4Zm6-23.6 5.6 5.6H18Z"
            })
        ]
    });
var file = SvgFile;
/* export default */ var assets_file = (file);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/header.js


const SvgHeader = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 32 32",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "M28 12v-2h-6V4h-2v6h-8V4h-2v6H4v2h6v8H4v2h6v6h2v-6h8v6h2v-6h6v-2h-6v-8Zm-8 8h-8v-8h8Z"
        })
    });
var header_header = SvgHeader;
/* export default */ var assets_header = (header_header);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/jump.js


const SvgJump = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 32 32",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "M13.414 17.586 18 22.172V8H8V6h10a2 2 0 0 1 2 2v14.172l4.586-4.586L26 19l-7 7-7-7Z"
        })
    });
var jump = SvgJump;
/* export default */ var assets_jump = (jump);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/link.js


const SvgLink = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("g", {
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                    d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                    d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                })
            ]
        })
    });
var assets_link = SvgLink;
/* export default */ var theme_assets_link = (assets_link);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/markdown.js


const SvgMarkdown = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        fill: "currentColor",
        viewBox: "0 0 208 128",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                fillRule: "evenodd",
                d: "M15 10a5 5 0 0 0-5 5v98a5 5 0 0 0 5 5h178a5 5 0 0 0 5-5V15a5 5 0 0 0-5-5zM0 15C0 6.716 6.716 0 15 0h178c8.284 0 15 6.716 15 15v98c0 8.284-6.716 15-15 15H15c-8.284 0-15-6.716-15-15z",
                clipRule: "evenodd"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                d: "M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0-30-33h20V30h20v35h20z"
            })
        ]
    });
var markdown_markdown = SvgMarkdown;
/* export default */ var assets_markdown = (markdown_markdown);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/menu.js


const SvgMenu = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        width: "1em",
        height: "1em",
        viewBox: "0 0 32 32",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "M4 6h24v2H4zm0 18h24v2H4zm0-12h24v2H4zm0 6h24v2H4z"
        })
    });
var menu = SvgMenu;
/* export default */ var assets_menu = (menu);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/moon.js


const SvgMoon = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 19,
        height: 19,
        fill: "none",
        viewBox: "0 0 19 19",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "M9.166 0a9.2 9.2 0 0 1 1.857.188.834.834 0 0 1 .042 1.623 4.47 4.47 0 1 0 5.457 5.457l.048-.135a.834.834 0 0 1 1.575.177q.186.902.188 1.856A9.168 9.168 0 1 1 9.166 0"
        })
    });
var moon = SvgMoon;
/* export default */ var assets_moon = (moon);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/npm.js


const SvgNpm = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 256 256",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                fill: "#C12127",
                d: "M0 256V0h256v256z"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                fill: "#FFF",
                d: "M48 48h160v160h-32V80h-48v128H48z"
            })
        ]
    });
var npm = SvgNpm;
/* export default */ var assets_npm = (npm);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/openai.js


const SvgOpenai = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 16,
        height: 16,
        fill: "currentColor",
        viewBox: "0 0 24 24",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            d: "M22.282 9.821a5.99 5.99 0 0 0-.516-4.91 6.05 6.05 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.99 5.99 0 0 0-3.998 2.9 6.05 6.05 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.05 6.05 0 0 0 6.515 2.9A5.99 5.99 0 0 0 13.26 24a6.06 6.06 0 0 0 5.772-4.206 6 6 0 0 0 3.997-2.9 6.06 6.06 0 0 0-.747-7.073zM13.26 22.43a4.48 4.48 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.8.8 0 0 0 .392-.681v-6.737l2.02 1.168a.07.07 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494M3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646M2.34 7.896a4.5 4.5 0 0 1 2.366-1.973V11.6a.77.77 0 0 0 .388.677l5.815 3.354-2.02 1.168a.08.08 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.08.08 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.78.78 0 0 0-.785 0L9.409 9.23V6.897a.07.07 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.8.8 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z"
        })
    });
var openai = SvgOpenai;
/* export default */ var assets_openai = (openai);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/pnpm.js


const SvgPnpm = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 128 128",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                fill: "#f8ab00",
                d: "M0 .004V40h39.996V.004Zm43.996 0V40h40V.004Zm44.008 0V40H128V.004Zm0 43.996v39.996H128V44Z"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                fill: "#4c4c4c",
                d: "M43.996 44v39.996h40V44ZM0 87.996v40h39.996v-40Zm43.996 0v40h40v-40Zm44.008 0v40H128v-40Z"
            })
        ]
    });
var pnpm = SvgPnpm;
/* export default */ var assets_pnpm = (pnpm);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/scroll-to-top.js


const SvgScrollToTop = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        fill: "none",
        viewBox: "0 0 16 16",
        ...props,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                stroke: "currentColor",
                strokeOpacity: 0.8,
                strokeWidth: 1.333,
                d: "M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334Z",
                clipRule: "evenodd"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                stroke: "currentColor",
                strokeLinejoin: "round",
                strokeOpacity: 0.8,
                strokeWidth: 1.333,
                d: "M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334Z"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeOpacity: 0.8,
                strokeWidth: 1.333,
                d: "M11 9 8 6 5 9"
            })
        ]
    });
var scroll_to_top = SvgScrollToTop;
/* export default */ var assets_scroll_to_top = (scroll_to_top);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/search.js


const SvgSearch = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        fill: "none",
        viewBox: "0 0 20 21",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "M8.333 1.913A6.667 6.667 0 0 1 15 8.58c0 1.54-.525 2.957-1.402 4.085l4.49 4.492a.834.834 0 0 1-1.177 1.178l-4.491-4.49a6.64 6.64 0 0 1-4.087 1.402 6.667 6.667 0 0 1 0-13.334m0 1.667a5 5 0 1 0 0 10 5 5 0 0 0 0-10"
        })
    });
var search_search = SvgSearch;
/* export default */ var assets_search = (search_search);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/small-menu.js


const SvgSmallMenu = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 21,
        height: 21,
        fill: "none",
        viewBox: "0 0 21 21",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 1.667,
            d: "M3.645 5.225h13.333M3.645 10.225h13.333M3.645 15.225h13.333"
        })
    });
var small_menu = SvgSmallMenu;
/* export default */ var assets_small_menu = (small_menu);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/success.js


const SvgSuccess = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 32,
        height: 32,
        viewBox: "0 0 24 24",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
        })
    });
var success = SvgSuccess;
/* export default */ var assets_success = (success);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/sun.js


const SvgSun = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        fill: "none",
        viewBox: "0 0 24 24",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "m7.001 15.848-1.226 1.226a.58.58 0 0 0 0 .818.58.58 0 0 0 .818 0l1.226-1.226a.58.58 0 0 0 0-.818.58.58 0 0 0-.818 0m-.352-8.735a.584.584 0 0 0 .825-.825L6.237 5.051a.584.584 0 0 0-.825.825zM5.011 11.07h-1.75a.584.584 0 0 0 0 1.167h1.75c.324 0 .584-.26.584-.583a.585.585 0 0 0-.584-.584m7.003-5.835c.324 0 .584-.26.584-.584V2.9a.58.58 0 0 0-.584-.584.58.58 0 0 0-.583.583V4.65c0 .323.262.584.583.584m5.616 1.621 1.226-1.225a.58.58 0 0 0 0-.818.58.58 0 0 0-.818 0l-1.226 1.225a.58.58 0 0 0 0 .818.576.576 0 0 0 .818 0m3.138 4.214h-1.75a.58.58 0 0 0-.584.584c0 .324.26.584.583.584h1.751a.584.584 0 1 0 0-1.167m-3.389 5.124a.584.584 0 0 0-.825.825l1.238 1.238a.584.584 0 0 0 .825-.826zm-5.365-9.795a5.256 5.256 0 0 0-5.257 5.258 5.256 5.256 0 0 0 5.257 5.257 5.256 5.256 0 0 0 5.257-5.257 5.256 5.256 0 0 0-5.257-5.258m0 11.675a.58.58 0 0 0-.583.583v1.751a.582.582 0 1 0 1.167 0v-1.75a.584.584 0 0 0-.584-.584"
        })
    });
var sun = SvgSun;
/* export default */ var assets_sun = (sun);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/title.js


const SvgTitle = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "M4 4a2 2 0 0 1 2-2h8a1 1 0 0 1 .707.293l5 5A1 1 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm13.586 4L14 4.414V8zM12 4H6v16h12V10h-5a1 1 0 0 1-1-1z"
        })
    });
var title_title = SvgTitle;
/* export default */ var assets_title = (title_title);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/wrap.js


const SvgWrap = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 32,
        height: 32,
        viewBox: "0 0 24 24",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "M16 7H3V5h13zM3 19h13v-2H3zm19-7-4-3v2H3v2h15v2z"
        })
    });
var wrap = SvgWrap;
/* export default */ var assets_wrap = (wrap);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/wrapped.js


const SvgWrapped = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 32,
        height: 32,
        viewBox: "0 0 24 24",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            d: "M21 5H3v2h18zM3 19h7v-2H3zm0-6h15c1 0 2 .43 2 2s-1 2-2 2h-2v-2l-4 3 4 3v-2h2c2.95 0 4-1.27 4-4 0-2.72-1-4-4-4H3z"
        })
    });
var wrapped = SvgWrapped;
/* export default */ var assets_wrapped = (wrapped);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/assets/yarn.js


const SvgYarn = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 128 128",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("g", {
            fill: "#2c8ebb",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                    d: "M99.24 80.71C94.9 80.76 91.1 83 87.89 85c-6 3.71-9 3.47-9 3.47l-.1-.17c-.41-.67 1.92-6.68-.69-13.84-2.82-7.83-7.3-9.72-6.94-10.32 1.53-2.59 5.36-6.7 6.89-14.36.91-4.64.67-12.28-1.39-16.28-.38-.74-3.78 1.24-3.78 1.24s-3.18-7.09-4.07-7.66c-2.87-1.84-6 7.61-6 7.61a14 14 0 0 0-11.71 4.5 9.64 9.64 0 0 1-3.85 2.27c-.41.14-.91.12-2.15 3.47-1.9 5.07 3.24 10.81 3.24 10.81s-6.13 4.33-8.4 9.72a24.8 24.8 0 0 0-1.75 11.68s-4.36 3.78-4.64 7.68a12.87 12.87 0 0 0 1.77 7.83 1.94 1.94 0 0 0 2.63.91s-2.9 3.38-.19 4.81c2.47 1.29 6.63 2 8.83-.19 1.6-1.6 1.92-5.17 2.51-6.63.14-.34.62.57 1.08 1a10 10 0 0 0 1.36 1s-3.9 1.68-2.3 5.51c.53 1.27 2.42 2.08 5.51 2.06 1.15 0 13.76-.72 17.12-1.53a4.33 4.33 0 0 0 2.61-1.46 63 63 0 0 0 15.49-7c4.74-3.09 6.68-3.93 10.51-4.84 3.16-.75 2.95-5.65-1.24-5.58"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                    d: "M64 2a62 62 0 1 0 62 62A62 62 0 0 0 64 2m37.3 87.83c-3.35.81-4.91 1.44-9.41 4.36a67 67 0 0 1-15.56 7.18 8.7 8.7 0 0 1-3.64 1.77c-3.81.93-16.88 1.63-17.91 1.63h-.24c-4 0-6.27-1.24-7.49-2.54-3.4 1.7-7.8 1-11-.69a5.55 5.55 0 0 1-3-3.9 6 6 0 0 1 0-2.06 6.7 6.7 0 0 1-.79-1A16.38 16.38 0 0 1 30 84.52c.29-3.73 2.87-7.06 4.55-8.83A28.6 28.6 0 0 1 36.61 64a26.8 26.8 0 0 1 6.82-9c-1.65-2.78-3.33-7.06-1.7-11.42 1.17-3.11 2.13-4.84 4.24-5.58a6.8 6.8 0 0 0 2.51-1.34A17.65 17.65 0 0 1 60.34 31c.19-.48.41-1 .65-1.46 1.6-3.4 3.3-5.31 5.29-6a4.88 4.88 0 0 1 4.4.5c.65.43 1.48 1 3.9 6a4.7 4.7 0 0 1 2.85-.1 3.8 3.8 0 0 1 2.39 1.94c2.47 4.74 2.8 13.19 1.72 18.62a33.8 33.8 0 0 1-5.84 13.31 25.7 25.7 0 0 1 5.77 9.43 25.4 25.4 0 0 1 1.41 10.41A29 29 0 0 0 86 81.91c3.06-1.89 7.68-4.74 13.19-4.81a6.62 6.62 0 0 1 7 5.7 6.35 6.35 0 0 1-4.89 7.03"
                })
            ]
        })
    });
var yarn = SvgYarn;
/* export default */ var assets_yarn = (yarn);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/icons.js






































const IconDeprecated = assets_deprecated;
const IconExperimental = assets_experimental;
const IconExternalLink = assets_external_link;
const IconOpenInChat = assets_open_in_chat;
const IconArrowDown = assets_arrow_down;
const IconArrowRight = assets_arrow_right;
const IconAnthropic = assets_anthropic;
const IconBun = assets_bun;
const IconClose = theme_assets_close;
const IconCopy = assets_copy;
const IconDeno = assets_deno;
const IconDown = assets_down;
const IconEdit = assets_edit;
const IconEmpty = assets_empty;
const IconFile = assets_file;
const IconGithub = (/* unused pure expression or super */ null && (github));
const IconGitlab = (/* unused pure expression or super */ null && (gitlab));
const IconHeader = assets_header;
const IconJsdelivr = (/* unused pure expression or super */ null && (jsdelivr));
const IconJump = assets_jump;
const IconLoading = (/* unused pure expression or super */ null && (loading));
const IconMarkdown = assets_markdown;
const IconMenu = assets_menu;
const IconMoon = assets_moon;
const IconNpm = assets_npm;
const IconOpenAI = assets_openai;
const IconPnpm = assets_pnpm;
const IconScrollToTop = assets_scroll_to_top;
const IconSearch = assets_search;
const IconSmallMenu = assets_small_menu;
const IconSuccess = assets_success;
const IconSun = assets_sun;
const IconTitle = assets_title;
const IconUnpkg = (/* unused pure expression or super */ null && (unpkg));
const IconWrap = assets_wrap;
const IconWrapped = assets_wrapped;
const IconYarn = assets_yarn;
const IconLink = theme_assets_link;


;// CONCATENATED MODULE: ./node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function clsx_r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=clsx_r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=clsx_r(e))&&(n&&(n+=" "),n+=t);return n}/* export default */ var dist_clsx = (clsx);
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Badge/index.css
var Badge = __webpack_require__("QA");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Badge/index.js



function Badge_Badge(param) {
    let { children, type = 'tip', text, outline = false } = param;
    const content = children || text;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
        className: dist_clsx('rp-badge', `rp-badge--${type}`, outline && 'rp-badge--outline'),
        children: content
    });
}


// EXTERNAL MODULE: ./theme/index.tsx + 2 modules
var theme_0 = __webpack_require__("L");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Button/index.css
var Button = __webpack_require__("r");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Button/index.js




function Button_Button(props) {
    const { theme = 'brand', size = 'big', href = '/', className = '', children, dangerouslySetInnerHTML } = props;
    let type = null;
    if ('button' === props.type) type = 'button';
    else if ('a' === props.type) type = theme_0/* .Link */.N_;
    return /*#__PURE__*/ react.createElement(type ?? 'a', {
        className: dist_clsx('rp-button', `rp-button--${theme}`, `rp-button--${size}`, className),
        href,
        ...dangerouslySetInnerHTML
    }, children);
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Callout/index.css
var Callout = __webpack_require__("rx");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Callout/index.js


function capitalize(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}
function Callout_Callout(param) {
    let { type, title, children } = param;
    const isDetails = 'details' === type;
    if (isDetails) return /*#__PURE__*/ (0,jsx_runtime.jsxs)("details", {
        className: `rp-callout rp-callout--${type}`,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("summary", {
                className: "rp-callout__title",
                children: title ?? capitalize(type)
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-callout__content",
                children: children
            })
        ]
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: `rp-callout rp-callout--${type}`,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-callout__title",
                children: title ?? capitalize(type)
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-callout__content",
                children: children
            })
        ]
    });
}
var components_Callout = (/* unused pure expression or super */ null && (Callout_Callout));
/* export default */ var theme_components_Callout = ((/* unused pure expression or super */ null && (components_Callout)));


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/CodeBlock/index.css
var CodeBlock = __webpack_require__("H3");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/CodeBlock/index.js





const DEFAULT_FOLD_HEIGHT = 300;
function CodeBlock_CodeBlock(param) {
    let { containerElementClassName, title, lang = 'txt', wrapCode: wrapCodeProp = false, lineNumbers: lineNumbersProp = false, fold = false, height, codeButtonGroupProps, children } = param;
    if (false) {}
    const { wrapCode: wrapCodeState, toggleWrapCode, copyElementRef } = (0,theme_0/* .useCodeButtonGroup */.i6)(wrapCodeProp);
    const [expanded, setExpanded] = (0,react.useState)(false);
    const [needFold, setNeedFold] = (0,react.useState)(false);
    const hasScroll = !fold && void 0 !== height;
    const codeBlockRef = (0,react.useRef)(null);
    const contentRef = (0,react.useRef)(null);
    (0,react.useEffect)(()=>{
        if (!fold || !contentRef.current) return void setNeedFold(false);
        const foldHeight = height ?? DEFAULT_FOLD_HEIGHT;
        const realHeight = contentRef.current.scrollHeight;
        setNeedFold(realHeight > foldHeight);
    }, [
        fold,
        height
    ]);
    const handleFoldToggle = (0,react.useCallback)(()=>{
        if (expanded) {
            setExpanded(false);
            requestAnimationFrame(()=>{
                if (codeBlockRef.current) {
                    const rect = codeBlockRef.current.getBoundingClientRect();
                    if (rect.top < 0) window.scrollBy({
                        top: rect.top - 16,
                        behavior: 'smooth'
                    });
                }
            });
        } else setExpanded(true);
    }, [
        expanded
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: dist_clsx('rp-codeblock', `language-${lang}`, containerElementClassName),
        ref: codeBlockRef,
        children: [
            title && /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-codeblock__title",
                children: title
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: dist_clsx('rp-codeblock__content', wrapCodeState && 'rp-codeblock__content--wrap-code', lineNumbersProp && 'rp-codeblock__content--line-numbers', needFold && !expanded && 'rp-codeblock__content--fold', hasScroll && 'rp-codeblock__content--scroll'),
                style: needFold && !expanded ? {
                    maxHeight: `${height ?? DEFAULT_FOLD_HEIGHT}px`
                } : hasScroll ? {
                    maxHeight: `${height}px`
                } : void 0,
                ref: contentRef,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "rp-codeblock__content__scroll-container rp-scrollbar rp-scrollbar--always",
                        ref: copyElementRef,
                        children: children
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .CodeButtonGroup */.zq, {
                        ...codeButtonGroupProps,
                        copyElementRef: copyElementRef,
                        wrapCode: wrapCodeState,
                        toggleWrapCode: toggleWrapCode
                    })
                ]
            }),
            needFold && /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                type: "button",
                className: dist_clsx('rp-codeblock__fold-btn', expanded && 'rp-codeblock__fold-btn--expanded'),
                onClick: handleFoldToggle,
                "aria-label": expanded ? 'Collapse code' : 'Expand code',
                "aria-expanded": expanded,
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: theme_0/* .IconArrowDown */.RG,
                    className: "rp-codeblock__fold-btn__icon"
                })
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useSite.js
var useSite = __webpack_require__("Z");
// EXTERNAL MODULE: ./.rspress/runtime/virtual-i18n-text.js
var virtual_i18n_text = __webpack_require__("k");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/createExternalStore.js
var createExternalStore = __webpack_require__("v");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useI18nText.js


const store = (0,createExternalStore/* .createExternalStore */.f)(virtual_i18n_text/* ["default"] */.A);
function useI18nText() {
    return store.useValue();
}
if (false) {}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/usePage.js
var usePage = __webpack_require__("e");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useLang.js

function useLang() {
    const { page } = (0,usePage/* .usePage */.e)();
    return page.lang || '';
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useI18n.js



function useI18n() {
    const lang = useLang();
    const i18nTextData = useI18nText();
    return (0,react.useCallback)((key, params)=>{
        const text = i18nTextData[key]?.[lang];
        if ('string' != typeof text) throw new Error(`i18n key "${key}" not found for language "${lang}"`);
        return text.replace(/\{\{(\w+)\}\}/g, (_, p1)=>params?.[p1] ?? `${p1}`);
    }, [
        lang,
        i18nTextData
    ]);
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/CodeButtonGroup/index.css
var CodeButtonGroup = __webpack_require__("w");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/CodeButtonGroup/CopyCodeButton.css
var CopyCodeButton = __webpack_require__("B");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/CodeButtonGroup/CopyCodeButton.js





const timeoutIdMap = new Map();
const COPIED_CLASS = 'rp-code-copy-button--copied';
async function copyCode(codeBlockElement, copyButtonElement) {
    if (!codeBlockElement) return;
    const text = (0,theme_0/* .getCopyableText */.El)(codeBlockElement, {
        ignoreClasses: [
            'linenumber'
        ],
        ignoreSelectors: [
            '.rp-copy-ignore'
        ]
    });
    const isCopied = await (0,theme_0/* .copyToClipboard */.lW)(text);
    if (isCopied && copyButtonElement) {
        copyButtonElement.classList.add(COPIED_CLASS);
        clearTimeout(timeoutIdMap.get(copyButtonElement));
        const timeoutId = setTimeout(()=>{
            copyButtonElement.classList.remove(COPIED_CLASS);
            copyButtonElement.blur();
            timeoutIdMap.delete(copyButtonElement);
        }, 2000);
        timeoutIdMap.set(copyButtonElement, timeoutId);
    }
}
function CopyCodeButton_CopyCodeButton(param) {
    let { codeBlockRef } = param;
    const copyButtonRef = (0,react.useRef)(null);
    const t = useI18n();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
        className: "rp-code-button-group__button rp-code-copy-button",
        onClick: ()=>{
            copyCode(codeBlockRef.current, copyButtonRef.current);
        },
        ref: copyButtonRef,
        title: t('codeButtonGroupCopyButtonText'),
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                icon: theme_0/* .IconCopy */.bz,
                className: "rp-code-button-group__icon rp-code-copy-button__icon rp-code-copy-button__icon--copy"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                icon: theme_0/* .IconSuccess */.lv,
                className: "rp-code-button-group__icon rp-code-copy-button__icon rp-code-copy-button__icon--success"
            })
        ]
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/CodeButtonGroup/index.js







const useCodeButtonGroup = (initialWrapCode)=>{
    const { site } = (0,useSite/* .useSite */.Z)();
    const { defaultWrapCode } = site.markdown;
    const [wrapCode, setWrapCode] = (0,react.useState)(initialWrapCode ?? defaultWrapCode);
    const copyElementRef = (0,react.useRef)(null);
    const toggleWrapCode = ()=>{
        setWrapCode(!wrapCode);
    };
    return {
        copyElementRef,
        wrapCode,
        toggleWrapCode
    };
};
function CodeButtonGroup_CodeButtonGroup(param) {
    let { wrapCode, toggleWrapCode, copyElementRef, showWrapCodeButton = true, showCopyButton = true } = param;
    const t = useI18n();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "rp-code-button-group",
            children: [
                showWrapCodeButton && /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
                    className: dist_clsx('rp-code-button-group__button', 'rp-code-wrap-button', wrapCode && 'rp-code-wrap-button--wrapped'),
                    onClick: ()=>toggleWrapCode(),
                    title: t('codeButtonGroupWrapButtonText'),
                    "aria-label": t('codeButtonGroupWrapButtonText'),
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                            icon: theme_0/* .IconWrapped */.hG,
                            className: "rp-code-button-group__icon rp-code-button-group__icon--wrapped"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                            icon: theme_0/* .IconWrap */.QB,
                            className: "rp-code-button-group__icon rp-code-button-group__icon--wrap"
                        })
                    ]
                }),
                showCopyButton && /*#__PURE__*/ (0,jsx_runtime.jsx)(CopyCodeButton_CopyCodeButton, {
                    codeBlockRef: copyElementRef
                })
            ]
        })
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocContent/docComponents/a.js


const a_A = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Link */.N_, {
        ...props
    });


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocContent/docComponents/code.js

function Code(props) {
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("code", {
        ...props
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocContent/docComponents/hr.js

const Hr = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("hr", {
        ...props
    });


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/utils.js
var utils = __webpack_require__("i");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocContent/docComponents/img.js


const Img = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
        ...props,
        src: (0,utils/* .normalizeImagePath */.As)(props.src || '')
    });


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocContent/docComponents/list.js

const Ol = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("ol", {
        ...props
    });
const Ul = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("ul", {
        ...props
    });
const Li = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
        ...props
    });


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocContent/docComponents/paragraph.js

const paragraph_P = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
        ...props
    });
const Blockquote = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("blockquote", {
        ...props
    });
const Strong = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("strong", {
        ...props
    });


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocContent/docComponents/pre.js


function ShikiPre(param) {
    let { title, lang, wrapCode, lineNumbers, fold, height, containerElementClassName, codeButtonGroupProps, ...otherProps } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .CodeBlock */.NG, {
        title: title,
        lang: lang,
        wrapCode: wrapCode,
        lineNumbers: lineNumbers,
        fold: fold,
        height: height,
        containerElementClassName: containerElementClassName,
        codeButtonGroupProps: codeButtonGroupProps,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("pre", {
            ...otherProps,
            "data-lang": lang,
            "data-title": title
        })
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocContent/docComponents/table.js


const Table = /*#__PURE__*/ (0,react.forwardRef)((props, ref)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "rp-table-scroll-container rp-scrollbar",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("table", {
            ref: ref,
            ...props
        })
    }));
const Tr = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("tr", {
        ...props
    });
const Td = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("td", {
        ...props
    });
const Th = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("th", {
        ...props
    });


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useFrontmatter.js

const useFrontmatter = ()=>{
    const { page } = (0,usePage/* .usePage */.e)();
    const { frontmatter = {} } = page;
    return {
        frontmatter
    };
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocContent/docComponents/title.js




const H1 = (props)=>{
    const { className, children, ...rest } = props;
    const { frontmatter: { tag } } = useFrontmatter();
    const { site } = (0,useSite/* .useSite */.Z)();
    const llmsUI = site?.themeConfig?.llmsUI;
    const placement = 'object' == typeof llmsUI ? llmsUI?.placement ?? 'title' : 'title';
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("h1", {
                className: dist_clsx('rp-toc-include', className),
                ...rest,
                children: [
                    children,
                    " ",
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Tag */.OT, {
                        tag: tag
                    })
                ]
            }),
             true && 'title' === placement && /*#__PURE__*/ (0,jsx_runtime.jsxs)(theme_0/* .LlmsContainer */.QZ, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .LlmsCopyButton */.mS, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .LlmsViewOptions */.YU, {})
                ]
            })
        ]
    });
};
const H2 = (props)=>{
    const { className, ...rest } = props;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
        className: dist_clsx('rp-toc-include', className),
        ...rest
    });
};
const H3 = (props)=>{
    const { className, ...rest } = props;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
        className: dist_clsx('rp-toc-include', className),
        ...rest
    });
};
const H4 = (props)=>{
    const { className, ...rest } = props;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("h4", {
        className: dist_clsx('rp-toc-include', className),
        ...rest
    });
};
const H5 = (props)=>{
    const { className, ...rest } = props;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("h5", {
        className: dist_clsx('rp-toc-include', className),
        ...rest
    });
};
const H6 = (props)=>{
    const { className, ...rest } = props;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("h6", {
        className: dist_clsx('rp-toc-include', className),
        ...rest
    });
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocContent/docComponents/index.js









function getCustomMDXComponent() {
    return {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        ul: Ul,
        ol: Ol,
        li: Li,
        table: Table,
        td: Td,
        th: Th,
        tr: Tr,
        hr: Hr,
        p: paragraph_P,
        blockquote: Blockquote,
        strong: Strong,
        a: a_A,
        code: Code,
        img: Img,
        pre: ShikiPre
    };
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@mdx-js+react@3.1.1_@types+react@19.3.0_react@19.3.1/node_modules/@mdx-js/react/lib/index.js
var lib = __webpack_require__("f");
// EXTERNAL MODULE: ./node_modules/.pnpm/react-router@7.18.5_react-dom@19.3.1_react@19.3.1__react@19.3.1/node_modules/react-router/dist/development/chunk-6KYCQHYJ.mjs
var chunk_6KYCQHYJ = __webpack_require__("q");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/route.js
var runtime_route = __webpack_require__("u4");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/Content.js




const Content = (param)=>{
    let { fallback = /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {}) } = param;
    const { pathname } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const matchedElement = (0,react.useMemo)(()=>{
        const route = (0,runtime_route/* .pathnameToRouteService */.c5)(pathname);
        return route?.element;
    }, [
        pathname
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(react.Suspense, {
        fallback: fallback,
        children: matchedElement
    });
};


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocContent/doc.css
var doc = __webpack_require__("Al");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocContent/index.js





function FallbackTitle() {
    const { site } = (0,useSite/* .useSite */.Z)();
    const { page } = (0,usePage/* .usePage */.e)();
    const { headingTitle, title } = page;
    return false !== site.themeConfig.fallbackHeadingTitle && !headingTitle && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .FallbackHeading */.x5, {
        level: 1,
        title: title
    });
}
function DocContent(param) {
    let { components, isOverviewPage = false, afterDocContent, beforeDocContent } = param;
    const mdxComponents = {
        ...(0,theme_0/* .getCustomMDXComponent */.GD)(),
        ...components,
        $$$callout$$$: theme_0/* .Callout */.Pq
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(lib/* .MDXProvider */.x, {
        components: mdxComponents,
        children: [
            beforeDocContent,
            !isOverviewPage && /*#__PURE__*/ (0,jsx_runtime.jsx)(FallbackTitle, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(Content, {}),
            afterDocContent
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocFooter/index.css
var DocFooter = __webpack_require__("X");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/DocFooter/index.js



function DocFooter_DocFooter() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("footer", {
        className: "rp-doc-footer",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-doc-footer__edit",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .EditLink */.Lp, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .LastUpdated */.KS, {})
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-doc-footer__divider"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .PrevNextPage */.UC, {})
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/EditLink/index.css
var EditLink = __webpack_require__("t");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/usePages.js
var usePages = __webpack_require__("d");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/usePageData.js



function usePageData() {
    const { page } = (0,usePage/* .usePage */.e)();
    const { pages } = (0,usePages/* .usePages */.Qd)();
    const { site } = (0,useSite/* .useSite */.Z)();
    return {
        page,
        siteData: {
            ...site,
            pages
        }
    };
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/EditLink/useEditLink.js

function useEditLink() {
    const { siteData, page } = usePageData();
    const editLink = siteData.themeConfig?.editLink;
    const t = useI18n();
    const text = t('editLinkText');
    if (!editLink?.docRepoBaseUrl || !text) return null;
    let { docRepoBaseUrl } = editLink;
    if (!docRepoBaseUrl.endsWith('/')) docRepoBaseUrl += '/';
    const relativePagePath = page._relativePath.replace(/\\/g, '/');
    const link = `${docRepoBaseUrl}${relativePagePath}`;
    return {
        text,
        link
    };
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/EditLink/index.js




function EditLink_EditLink(param) {
    let { isOutline } = param;
    const editLinkObj = useEditLink();
    if (!editLinkObj) return null;
    const { text, link } = editLinkObj;
    if (isOutline) return /*#__PURE__*/ (0,jsx_runtime.jsxs)(theme_0/* .Link */.N_, {
        href: link,
        className: "rp-outline__action-row rp-edit-link",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                icon: theme_0/* .IconEdit */.GI,
                width: "16",
                height: "16"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                children: text
            })
        ]
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Link */.N_, {
        href: link,
        className: "rp-edit-link",
        children: text
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+shared@2.1.3/node_modules/@rspress/shared/dist/github-slugger.js
const github_slugger_regex = /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g;
const own = Object.hasOwnProperty;
class BananaSlug {
    constructor(){
        this.occurrences;
        this.reset();
    }
    slug(value, maintainCase) {
        const self = this;
        let result = slug(value, true === maintainCase);
        const originalSlug = result;
        while(own.call(self.occurrences, result)){
            self.occurrences[originalSlug]++;
            result = originalSlug + '-' + self.occurrences[originalSlug];
        }
        self.occurrences[result] = 0;
        return result;
    }
    reset() {
        this.occurrences = Object.create(null);
    }
}
function slug(value, maintainCase) {
    if ('string' != typeof value) return '';
    if (!maintainCase) value = value.toLowerCase();
    return value.replace(github_slugger_regex, '').replace(/ /g, '-');
}
/* export default */ var github_slugger = ((/* unused pure expression or super */ null && (BananaSlug)));


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/FallbackHeading/index.js




const getHeadingMap = ()=>{
    const { h1, h2, h3, h4, h5, h6 } = (0,theme_0/* .getCustomMDXComponent */.GD)();
    return {
        1: h1,
        2: h2,
        3: h3,
        4: h4,
        5: h5,
        6: h6
    };
};
function FallbackHeading(param) {
    let { level, title } = param;
    if (false) {}
    const titleSlug = title && slug(title.trim());
    const Element = (0,react.useMemo)(()=>{
        const headingMap = getHeadingMap();
        return headingMap[level] || headingMap[1];
    }, [
        level
    ]);
    const A = (0,react.useMemo)(()=>(0,theme_0/* .getCustomMDXComponent */.GD)().a, []);
    return titleSlug && /*#__PURE__*/ (0,jsx_runtime.jsxs)(Element, {
        id: titleSlug,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                ...(0,theme_0/* .renderInlineMarkdown */.nl)(title)
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(A, {
                className: "rp-header-anchor",
                href: `#${titleSlug}`,
                "aria-hidden": true,
                tabIndex: -1,
                children: "#"
            })
        ]
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/HomeBackground/useNavTransparent.js


const useTopArrived = ()=>{
    const [scrollY, setScrollY] = (0,react.useState)(0);
    const topArrived = scrollY < 100;
    (0,react.useEffect)(()=>{
        const handleScroll = ()=>{
            setScrollY(window.scrollY);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, {
            capture: false,
            passive: true
        });
        return ()=>{
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return {
        topArrived
    };
};
const useNavTransparent = ()=>{
    const { topArrived } = useTopArrived();
    (0,react.useLayoutEffect)(()=>{
        if (topArrived) document.body.classList.remove('notTopArrived');
        else document.body.classList.add('notTopArrived');
    }, [
        topArrived
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("style", {
        children: "body:not(.notTopArrived) .rp-nav {background: transparent !important; border-bottom: 1px solid transparent !important;}.rp-nav {background: color-mix(in srgb,var(--rp-c-bg) 60%,transparent);backdrop-filter: blur(25px);}"
    });
};


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/HomeBackground/index.css
var HomeBackground = __webpack_require__("ip");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/HomeBackground/index.js




function HomeBackground_HomeBackground(param) {
    let { className, ...otherProps } = param;
    const styleDom = useNavTransparent();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            styleDom,
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: dist_clsx('rp-home-background', className),
                ...otherProps
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/HomeFeature/index.css
var HomeFeature = __webpack_require__("pV");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/HomeFeature/useCardAnimation.js


const useCardAnimation = ()=>{
    const [pageX, setPageX] = (0,react.useState)(null);
    const [pageY, setPageY] = (0,react.useState)(null);
    const [isHovering, setIsHovering] = (0,react.useState)(false);
    const ref = (0,react.useRef)(null);
    const handleMove = (param)=>{
        let { pageX, pageY } = param;
        setPageX(pageX);
        setPageY(pageY);
    };
    const handleTouchMove = (evt)=>{
        evt.preventDefault();
        const { pageX, pageY } = evt.touches[0];
        handleMove({
            pageX,
            pageY
        });
    };
    let shine;
    let shineBg;
    let container;
    let outerContainer;
    const handleEnter = ()=>{
        setIsHovering(true);
    };
    const handleLeave = ()=>{
        setIsHovering(false);
    };
    const ele = ref.current;
    if (pageX && pageY && ele && isHovering) {
        const rootElemWidth = ele.clientWidth || ele.offsetWidth || ele.scrollWidth;
        const rootElemHeight = ele.clientHeight || ele.offsetHeight || ele.scrollHeight;
        const bodyScrollTop = document.body.scrollTop || document.getElementsByTagName('html')[0].scrollTop;
        const bodyScrollLeft = document.body.scrollLeft;
        const offsets = ele.getBoundingClientRect();
        const wMultiple = 320 / rootElemWidth;
        const multiple = 0.05 * wMultiple;
        const offsetX = 0.52 - (pageX - offsets.left - bodyScrollLeft) / rootElemWidth;
        const offsetY = 0.52 - (pageY - offsets.top - bodyScrollTop) / rootElemHeight;
        const dy = pageY - offsets.top - bodyScrollTop - rootElemHeight / 2;
        const dx = pageX - offsets.left - bodyScrollLeft - rootElemWidth / 2;
        const yRotate = (offsetX - dx) * multiple;
        const xRotate = (dy - offsetY) * (Math.min(offsets.width / offsets.height, 1) * multiple);
        const arad = Math.atan2(dy, dx);
        const rawAngle = 180 * arad / Math.PI - 90;
        const angle = rawAngle < 0 ? rawAngle + 360 : rawAngle;
        shine = `translateX(${offsetX - 0.1}px) translateY(${offsetY - 0.1}px)`;
        shineBg = `linear-gradient(${angle}deg, rgba(255, 255, 255, ${(pageY - offsets.top - bodyScrollTop) / rootElemHeight * 0.2}) 0%, rgba(255, 255, 255, 0) 50%)`;
        container = `rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;
        outerContainer = `perspective(${2 * rootElemWidth}px)`;
    } else {
        shine = '';
        shineBg = '';
        container = '';
        outerContainer = '';
    }
    const outerProps = {
        style: {
            transform: outerContainer,
            transformStyle: 'preserve-3d'
        },
        onMouseEnter: handleEnter,
        onMouseLeave: handleLeave,
        onMouseMove: handleMove,
        onTouchMove: handleTouchMove,
        onTouchStart: handleEnter,
        onTouchEnd: handleLeave
    };
    const outerRef = ref;
    const innerProps = {
        style: {
            transform: container
        }
    };
    const shineDom = /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "rp-home-feature__item__shine",
        style: {
            position: 'absolute',
            userSelect: 'none',
            pointerEvents: 'none',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            borderRadius: '20px',
            zIndex: '8',
            ...shine ? {
                transform: shine
            } : {},
            ...shineBg ? {
                background: shineBg
            } : {}
        }
    });
    return {
        outerProps,
        outerRef,
        innerProps,
        shineDom
    };
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/HomeFeature/index.js





const getGridClass = (feature)=>{
    const { span } = feature;
    switch(span){
        case 2:
            return 'rp-home-feature__item--span-2';
        case 3:
            return 'rp-home-feature__item--span-3';
        case 4:
            return 'rp-home-feature__item--span-4';
        case 6:
            return 'rp-home-feature__item--span-6';
        case void 0:
            return 'rp-home-feature__item--span-4';
        default:
            return '';
    }
};
function HomeFeatureItem(param) {
    let { feature } = param;
    const { icon, title, details, link } = feature;
    const { innerProps, outerProps, outerRef, shineDom } = useCardAnimation();
    const navigate = (0,theme_0/* .useLinkNavigate */.X6)();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        ...outerProps,
        className: `rp-home-feature__item ${getGridClass(feature)}`,
        ref: outerRef,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "rp-home-feature__item-wrapper",
            ...innerProps,
            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("article", {
                className: `rp-home-feature__card ${link ? 'rp-home-feature__card--clickable' : ''}`,
                onClick: ()=>{
                    if (link) navigate(link);
                },
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "rp-home-feature__title-wrapper",
                        children: [
                            icon ? /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                className: "rp-home-feature__icon",
                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                                    icon: icon
                                })
                            }) : null,
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                                className: "rp-home-feature__title",
                                children: title
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "rp-home-feature__detail",
                        ...(0,theme_0/* .renderHtmlOrText */.i7)(details)
                    }),
                    shineDom
                ]
            }, title)
        })
    }, title);
}
function HomeFeature_HomeFeature(param) {
    let { features: featuresProp } = param;
    const { frontmatter } = useFrontmatter();
    const features = featuresProp ?? frontmatter?.features;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "rp-home-feature",
        children: features?.map((feature)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(HomeFeatureItem, {
                feature: feature
            }, feature.title))
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/HomeFooter/index.css
var HomeFooter = __webpack_require__("uA");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/HomeFooter/index.js




function HomeFooter_HomeFooter() {
    const { site } = (0,useSite/* .useSite */.Z)();
    const { message } = site.themeConfig.footer || {};
    if (!message) return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("footer", {
        className: "rp-home-footer",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "rp-home-footer__container",
            children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-home-footer__message",
                ...(0,theme_0/* .renderHtmlOrText */.i7)(message)
            })
        })
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/HomeHero/index.css
var HomeHero = __webpack_require__("I");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/HomeHero/index.js





const DEFAULT_HERO = {
    badge: '',
    name: '',
    text: '',
    tagline: '',
    actions: [],
    image: void 0
};
function HomeHero_HomeHero(param) {
    let { beforeHeroActions, afterHeroActions, image } = param;
    const { frontmatter } = useFrontmatter();
    const hero = frontmatter?.hero || DEFAULT_HERO;
    const hasImage = void 0 !== hero.image || void 0 !== image;
    const multiHeroText = hero.text ? hero.text.toString().split(/\n/g).filter((text)=>'' !== text) : [];
    const imageSrc = 'string' == typeof hero.image?.src ? {
        light: hero.image.src,
        dark: hero.image.src
    } : hero.image?.src || {
        light: '',
        dark: ''
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: dist_clsx('rp-home-hero', {
            'rp-home-hero--no-image': !hasImage
        }),
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-home-hero__container",
                children: [
                    hero.badge && ('string' == typeof hero.badge ? /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "rp-home-hero__badge",
                        children: hero.badge
                    }) : hero.badge.link ? /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Link */.N_, {
                        href: hero.badge.link,
                        className: "rp-home-hero__badge",
                        children: hero.badge.text
                    }) : /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "rp-home-hero__badge",
                        children: hero.badge.text
                    })),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "rp-home-hero__content",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                className: "rp-home-hero__title",
                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                    className: "rp-home-hero__title-brand",
                                    ...(0,theme_0/* .renderHtmlOrText */.i7)(hero.name)
                                })
                            }),
                            0 !== multiHeroText.length && multiHeroText.map((heroText)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                    className: "rp-home-hero__subtitle",
                                    ...(0,theme_0/* .renderHtmlOrText */.i7)(heroText)
                                }, heroText))
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "rp-home-hero__tagline",
                        ...(0,theme_0/* .renderHtmlOrText */.i7)(hero.tagline)
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                        children: [
                            beforeHeroActions,
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                className: "rp-home-hero__actions",
                                children: hero.actions?.map((action)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Button */.$n, {
                                        type: "a",
                                        href: action.link,
                                        theme: action.theme,
                                        className: "rp-home-hero__action",
                                        ...(0,theme_0/* .renderHtmlOrText */.i7)(action.text)
                                    }, action.link))
                            }),
                            afterHeroActions
                        ]
                    })
                ]
            }),
            image ? /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-home-hero__image",
                children: image
            }) : hero.image ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-home-hero__image",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
                        src: (0,utils/* .normalizeImagePath */.As)(imageSrc.light),
                        alt: hero.image?.alt,
                        srcSet: normalizeSrcsetAndSizes(hero.image?.srcset),
                        sizes: normalizeSrcsetAndSizes(hero.image?.sizes),
                        width: 375,
                        height: 375,
                        className: "rp-home-hero__image-img rp-home-hero__image-img--light"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
                        src: (0,utils/* .normalizeImagePath */.As)(imageSrc.dark),
                        alt: hero.image?.alt,
                        srcSet: normalizeSrcsetAndSizes(hero.image?.srcset),
                        sizes: normalizeSrcsetAndSizes(hero.image?.sizes),
                        width: 375,
                        height: 375,
                        className: "rp-home-hero__image-img rp-home-hero__image-img--dark"
                    })
                ]
            }) : null
        ]
    });
}
function normalizeSrcsetAndSizes(field) {
    const r = (Array.isArray(field) ? field : [
        field
    ]).filter(Boolean).join(', ');
    return r || void 0;
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+shared@2.1.3/node_modules/@rspress/shared/dist/index.js
var dist = __webpack_require__("n");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/HoverGroup/index.css
var HoverGroup = __webpack_require__("oj");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/HoverGroup/index.js





function HoverGroupItem(param) {
    let { item, activeMatcher, depth = 0 } = param;
    const { pathname } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    if ('items' in item && item.items && item.items.length > 0) {
        const hasLink = 'link' in item && item.link;
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
                hasLink && /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                    className: "rp-hover-group__item",
                    style: {
                        paddingLeft: `${8 + 12 * depth}px`
                    },
                    "data-depth": depth,
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(theme_0/* .Link */.N_, {
                        href: item.link,
                        download: 'download' in item ? item.download : void 0,
                        "aria-label": item.text,
                        className: "rp-hover-group__item__link",
                        lang: item.lang,
                        hrefLang: item.lang,
                        rel: item.rel,
                        children: [
                            item.icon && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                                icon: item.icon,
                                className: "rp-hover-group__item__icon"
                            }),
                            item.text,
                            'tag' in item && item.tag && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Tag */.OT, {
                                tag: item.tag
                            })
                        ]
                    })
                }, item.text),
                item.items.map((subItem)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(HoverGroupItem, {
                        item: subItem,
                        activeMatcher: activeMatcher,
                        depth: depth + 1
                    }, subItem.text))
            ]
        });
    }
    if ('link' in item) {
        const { text, link, lang, rel } = item;
        const download = 'download' in item ? item.download : void 0;
        const isActiveItem = activeMatcher ? activeMatcher(item) : (0,dist/* .matchNavbar */.sP)(item, pathname);
        return /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
            className: dist_clsx('rp-hover-group__item', {
                'rp-hover-group__item--active': isActiveItem
            }),
            style: {
                paddingLeft: `${8 + 12 * depth}px`
            },
            "data-depth": depth,
            children: link ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(theme_0/* .Link */.N_, {
                href: link,
                download: download,
                "aria-label": text,
                className: "rp-hover-group__item__link",
                lang: lang,
                hrefLang: lang,
                rel: rel,
                children: [
                    item.icon && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                        icon: item.icon,
                        className: "rp-hover-group__item__icon"
                    }),
                    text,
                    'tag' in item && item.tag && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Tag */.OT, {
                        tag: item.tag
                    })
                ]
            }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-hover-group__item__link",
                lang: lang,
                children: [
                    item.icon && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                        icon: item.icon,
                        className: "rp-hover-group__item__icon"
                    }),
                    text,
                    'tag' in item && item.tag && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Tag */.OT, {
                        tag: item.tag
                    })
                ]
            })
        }, text + link);
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
        className: "rp-hover-group__item",
        style: {
            paddingLeft: `${8 + 12 * depth}px`
        },
        "data-depth": depth,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "rp-hover-group__item__link",
            children: [
                item.icon && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: item.icon,
                    className: "rp-hover-group__item__icon"
                }),
                item.text,
                'tag' in item && item.tag && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Tag */.OT, {
                    tag: item.tag
                })
            ]
        })
    }, item.text);
}
function HoverGroup_HoverGroup(param) {
    let { items, customChildren, isOpen, position = 'center', activeMatcher } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("ul", {
        className: dist_clsx('rp-hover-group', {
            'rp-hover-group--hidden': !isOpen,
            'rp-hover-group--left': 'left' === position,
            'rp-hover-group--center': 'center' === position,
            'rp-hover-group--right': 'right' === position
        }),
        children: customChildren ?? items?.map((item)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(HoverGroupItem, {
                item: item,
                activeMatcher: activeMatcher
            }, item.text))
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/HoverGroup/useHoverGroup.js



function useHoverGroup(props) {
    const { items, activeMatcher, customChildren, position } = props;
    const closeTimerRef = (0,react.useRef)(null);
    const [isOpen, setIsOpen] = (0,react.useState)(false);
    const clearCloseTimer = (0,react.useCallback)(()=>{
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
    }, []);
    const handleMouseEnter = (0,react.useCallback)(()=>{
        setIsOpen(true);
        clearCloseTimer();
    }, [
        setIsOpen
    ]);
    const handleMouseLeave = (0,react.useCallback)(()=>{
        closeTimerRef.current = window.setTimeout(()=>{
            setIsOpen(false);
        }, 150);
    }, [
        setIsOpen
    ]);
    const hoverGroup = (0,react.useMemo)(()=>/*#__PURE__*/ (0,jsx_runtime.jsx)(HoverGroup_HoverGroup, {
            items: items,
            customChildren: customChildren,
            isOpen: isOpen,
            activeMatcher: activeMatcher,
            position: position
        }), [
        items,
        customChildren,
        isOpen,
        activeMatcher
    ]);
    return {
        hoverGroup,
        handleMouseEnter,
        handleMouseLeave
    };
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/LastUpdated/index.css
var LastUpdated = __webpack_require__("QE");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/LastUpdated/index.js



function LastUpdated_LastUpdated() {
    const { page: { lastUpdatedTime, lastUpdatedAuthor } } = (0,usePage/* .usePage */.e)();
    const { site } = (0,useSite/* .useSite */.Z)();
    const { themeConfig } = site;
    const showLastUpdated = themeConfig.lastUpdated;
    const t = useI18n();
    if (!showLastUpdated || !lastUpdatedTime) return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "rp-last-updated",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
            children: [
                t('lastUpdatedText'),
                ": ",
                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                    children: lastUpdatedTime
                }),
                lastUpdatedAuthor && /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                        ' ',
                        t('lastUpdatedAuthorText'),
                        " ",
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                            children: lastUpdatedAuthor
                        })
                    ]
                })
            ]
        })
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Link/index.css
var Link = __webpack_require__("E");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Link/getHref.js


function isAbsoluteUrl(url) {
    return url.startsWith('/');
}
function getLinkType(href) {
    if ((0,dist/* .isExternalUrl */.My)(href)) return 'external';
    if (href.startsWith('#')) return 'hashOnly';
    if (!isAbsoluteUrl(href)) return 'relative';
    return 'internal';
}
function getHref(href) {
    let currentUrl = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "u" < typeof window ? void 0 : window.location.href;
    let withBaseHref;
    const linkType = getLinkType(href);
    if ('external' === linkType || 'hashOnly' === linkType) return {
        linkType,
        withBaseHref: href,
        removeBaseHref: href,
        routePath: (0,dist/* .cleanUrl */.TG)(href)
    };
    if ('relative' === linkType && currentUrl) {
        const url = new URL(href, currentUrl);
        withBaseHref = `${url.pathname}${url.search}${url.hash}`;
    } else withBaseHref = (0,utils/* .withBase */.cV)((0,utils/* .cleanUrlByConfig */.Gk)(href));
    const removeBaseHref = (0,utils/* .removeBase */.EJ)(withBaseHref);
    return {
        withBaseHref,
        removeBaseHref,
        routePath: (0,dist/* .cleanUrl */.TG)(removeBaseHref),
        linkType
    };
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Link/useLinkNavigate.js



function useLinkNavigate() {
    let { startTransition } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { pathname } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const navigate = (0,chunk_6KYCQHYJ/* .useNavigate */.Zp)();
    const { site } = (0,useSite/* .useSite */.Z)();
    const useTransitions = site?.route?.useTransitions;
    return (0,react.useCallback)(async (href)=>{
        const { linkType, removeBaseHref, routePath, withBaseHref } = getHref(href);
        if ('external' === linkType) return void window.location.assign(href);
        if ('hashOnly' !== linkType && !(0,runtime_route/* .isActive */.$m)(removeBaseHref, pathname) && !(0,runtime_route/* .pathnameToRouteService */.c5)(routePath)) return void window.location.assign(withBaseHref);
        const hashUrl = 'hashOnly' === linkType ? new URL(href, window.location.href) : void 0;
        const to = hashUrl ? {
            search: hashUrl.search,
            hash: hashUrl.hash
        } : removeBaseHref;
        const options = hashUrl ? {
            replace: hashUrl.href === window.location.href
        } : void 0;
        if (useTransitions && startTransition) {
            let navigation;
            startTransition(()=>{
                navigation = navigate(to, options);
                return navigation;
            });
            await navigation;
        } else await navigate(to, options);
    }, [
        useTransitions,
        pathname,
        navigate,
        startTransition
    ]);
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Link/index.js







const Link_Link = /*#__PURE__*/ (0,react.forwardRef)((props, ref)=>{
    const { href = '/', children, className = '', onClick, onMouseEnter, startTransition, ...otherProps } = props;
    const { linkType, removeBaseHref, routePath, withBaseHref } = getHref(href);
    const navigate = useLinkNavigate({
        startTransition
    });
    if ('external' === linkType) return /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
        ref: ref,
        href: href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: dist_clsx(className, 'rp-link'),
        onClick: onClick,
        onMouseEnter: onMouseEnter,
        ...otherProps,
        children: children
    });
    if ('hashOnly' === linkType || 'relative' === linkType) return /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
        ref: ref,
        href: href,
        className: dist_clsx(className, 'rp-link'),
        onMouseEnter: (event)=>{
            onMouseEnter?.(event);
            if ('relative' === linkType) (0,runtime_route/* .preloadLink */.G$)(routePath);
        },
        onTouchStart: ()=>{
            if ('relative' === linkType) (0,runtime_route/* .preloadLink */.G$)(routePath);
        },
        onClick: (e)=>{
            onClick?.(e);
            if (e.defaultPrevented || e.currentTarget.hasAttribute('download') || 0 !== e.button || e.currentTarget.target && '_self' !== e.currentTarget.target || e.metaKey || e.shiftKey || e.altKey || e.ctrlKey) return;
            e.preventDefault();
            navigate(href);
        },
        ...otherProps,
        children: children
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
        ref: ref,
        href: withBaseHref,
        className: dist_clsx(className, 'rp-link'),
        onMouseEnter: (event)=>{
            onMouseEnter?.(event);
            (0,runtime_route/* .preloadLink */.G$)(routePath);
        },
        onTouchStart: ()=>{
            (0,runtime_route/* .preloadLink */.G$)(routePath);
        },
        onClick: (e)=>{
            onClick?.(e);
            if (0 !== e.button || e.currentTarget.target && '_self' !== e.currentTarget.target || e.metaKey || e.shiftKey || e.altKey || e.ctrlKey) return;
            e.preventDefault();
            navigate(removeBaseHref);
        },
        ...otherProps,
        children: children
    });
});
Link_Link.displayName = 'Link';


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Llms/LlmsContainer.css
var LlmsContainer = __webpack_require__("vt");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Llms/LlmsContainer.js


function LlmsContainer_LlmsContainer(props) {
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        ...props,
        className: 'rp-not-doc rp-llms-container'
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Llms/index.css
var Llms = __webpack_require__("hs");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Llms/LlmsCopyButton.css
var LlmsCopyButton = __webpack_require__("rh");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Llms/getLlmsCopyContent.js
const getLlmsCopyContent_cache = new Map();
const DEV_COPY_WARNING = 'Warning: Markdown content is unavailable in development mode; run `rspress build` to use this feature.';
async function getLlmsCopyContent(url) {
    if (false) {}
    const cachedContent = getLlmsCopyContent_cache.get(url);
    if (void 0 !== cachedContent) return cachedContent;
    const content = await fetch(url).then((response)=>response.text());
    getLlmsCopyContent_cache.set(url, content);
    return content;
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Llms/useMdUrl.js


function useMdUrl() {
    const { page } = usePageData();
    const mdPath = (0,react.useMemo)(()=>{
        const pathname = (0,utils/* .routePathToMdPath */.qp)(page.routePath);
        return {
            pathname
        };
    }, [
        page.routePath
    ]);
    return mdPath;
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Llms/LlmsCopyButton.js
/*! LICENSE: LlmsCopyButton.js.LICENSE.txt */ 







/**
 * Inspired from fumadocs docsite
 * @from https://github.com/fuma-nama/fumadocs/blob/5723bbe58ef805a5421a780abf235a10b251be2f/apps/docs/app/docs/%5B...slug%5D/page.client.tsx#L11
 * @license MIT
 */ function LlmsCopyButton_LlmsCopyButton(props) {
    const { onClick, ...otherProps } = props;
    const t = useI18n();
    const { pathname } = useMdUrl();
    const [isLoading, setLoading] = (0,react.useState)(false);
    const [isFinished, setFinished] = (0,react.useState)(false);
    const timer = (0,react.useRef)(null);
    const handleClick = (0,react.useCallback)(async ()=>{
        setLoading(true);
        const url = pathname;
        try {
            const content = await getLlmsCopyContent(url);
            const isCopied = await (0,theme_0/* .copyToClipboard */.lW)(content);
            if (!isCopied) return;
            setFinished(true);
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = null;
            }
            timer.current = window.setTimeout(()=>{
                setFinished(false);
                timer.current = null;
            }, 500);
        } finally{
            setLoading(false);
        }
    }, [
        pathname
    ]);
    if (!pathname) return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {});
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
        ...otherProps,
        disabled: isLoading,
        className: [
            'rp-not-doc',
            'rp-llms-button',
            'rp-llms-copy-button',
            isLoading ? 'rp-llms-copy-button--loading' : '',
            isFinished ? 'rp-llms-copy-button--success' : ''
        ].filter(Boolean).join(' '),
        onClick: onClick ?? handleClick,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-llms-copy-button__icon-wrapper",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                        icon: theme_0/* .IconSuccess */.lv,
                        className: "rp-llms-copy-button__icon-success"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                        icon: theme_0/* .IconCopy */.bz,
                        className: "rp-llms-copy-button__icon-copy"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                children: t('copyMarkdownText')
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/unhead@2.1.17/node_modules/unhead/dist/shared/unhead.AvDFlk_u.mjs
var unhead_AvDFlk_u = __webpack_require__("F");
;// CONCATENATED MODULE: ./node_modules/.pnpm/unhead@2.1.17/node_modules/unhead/dist/shared/unhead.C-69jnXc.mjs


function useHead(unhead, input, options = {}) {
  return unhead.push(input || {}, options);
}
function useHeadSafe(unhead, input = {}, options = {}) {
  unhead.use(SafeInputPlugin);
  return useHead(unhead, input, Object.assign(options, { _safe: true }));
}
function useSeoMeta(unhead, input = {}, options) {
  unhead.use(FlatMetaPlugin);
  function normalize(input2) {
    if (input2._flatMeta) {
      return input2;
    }
    const { title, titleTemplate, ...meta } = input2 || {};
    return {
      title,
      titleTemplate,
      _flatMeta: meta
    };
  }
  const entry = unhead.push(normalize(input), options);
  const corePatch = entry.patch;
  if (!entry.__patched) {
    entry.patch = (input2) => corePatch(normalize(input2));
    entry.__patched = true;
  }
  return entry;
}
function useServerHead(unhead, input = {}, options = {}) {
  options.mode = "server";
  return unhead.push(input, options);
}
function useServerHeadSafe(unhead, input = {}, options = {}) {
  options.mode = "server";
  return useHeadSafe(unhead, input, { ...options, mode: "server" });
}
function useServerSeoMeta(unhead, input = {}, options) {
  options.mode = "server";
  return useSeoMeta(unhead, input, { ...options, mode: "server" });
}



// EXTERNAL MODULE: ./node_modules/.pnpm/@unhead+react@2.1.17_react@19.3.1/node_modules/@unhead/react/dist/shared/react.DF9T1fqs.mjs
var react_DF9T1fqs = __webpack_require__("b");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@unhead+react@2.1.17_react@19.3.1/node_modules/@unhead/react/dist/index.mjs





const hookImports = (/* unused pure expression or super */ null && ({
  "@unhead/react": [
    "useUnhead",
    "useHead",
    "useSeoMeta",
    "useHeadSafe"
  ]
}));

function useUnhead() {
  const instance = (0,react.useContext)(react_DF9T1fqs.U);
  if (!instance) {
    throw new Error("useHead() was called without provide context.");
  }
  return instance;
}
function withSideEffects(input, options, fn) {
  const unhead = options.head || useUnhead();
  const entryRef = (0,react.useRef)(null);
  const inputRef = (0,react.useRef)(input);
  inputRef.current = input;
  if (unhead.ssr && !entryRef.current) {
    entryRef.current = fn(unhead, input, options);
  }
  (0,react.useEffect)(() => {
    const entry = fn(unhead, inputRef.current, options);
    entryRef.current = entry;
    return () => {
      entry.dispose();
      entryRef.current = null;
    };
  }, [unhead]);
  (0,react.useEffect)(() => {
    entryRef.current?.patch(input);
  }, [input]);
  if (unhead.ssr) {
    return entryRef.current;
  }
  const proxyRef = (0,react.useRef)(null);
  if (!proxyRef.current) {
    proxyRef.current = {
      patch: (newInput) => {
        entryRef.current?.patch(newInput);
      },
      dispose: () => {
        entryRef.current?.dispose();
        entryRef.current = null;
      },
      _poll: (rm) => {
        entryRef.current?._poll(rm);
      }
    };
  }
  return proxyRef.current;
}
function dist_useHead(input = {}, options = {}) {
  return withSideEffects(input, options, useHead);
}
function dist_useHeadSafe(input = {}, options = {}) {
  return withSideEffects(input, options, useHeadSafe$1);
}
function dist_useSeoMeta(input = {}, options = {}) {
  return withSideEffects(input, options, useSeoMeta$1);
}
function useScript(_input, _options) {
  const input = typeof _input === "string" ? { src: _input } : _input;
  const options = _options || {};
  const head = options.head || useUnhead();
  const trigger = options.trigger;
  const resolvedOptions = {
    ...options,
    head,
    trigger: head.ssr && trigger === "server" ? "server" : "manual"
  };
  const callbackRecords = useRef([]);
  const isMounted = useRef(false);
  const renderId = useRef(0);
  const committedRenderId = useRef(0);
  const currentRenderId = ++renderId.current;
  const script = useScript$1(head, input, resolvedOptions);
  useEffect(() => {
    isMounted.current = true;
    committedRenderId.current = currentRenderId;
    reconcileScriptCallbacks(currentRenderId);
    callbackRecords.current.forEach(registerScriptCallback);
    return () => {
      isMounted.current = false;
      callbackRecords.current.forEach(unregisterScriptCallback);
    };
  });
  useEffect(() => {
    const existingControllers = new Set(script._triggerAbortControllers);
    script.setupTriggerHandler(trigger);
    const triggerAbortControllers = script._triggerAbortControllers ? [...script._triggerAbortControllers].filter((controller) => !existingControllers.has(controller)) : [];
    return () => triggerAbortControllers.forEach((controller) => controller.abort());
  }, [script, trigger]);
  function reconcileScriptCallbacks(activeRenderId) {
    callbackRecords.current.forEach((record) => {
      if (record.renderScoped && record.renderId !== activeRenderId) {
        record.active = false;
        unregisterScriptCallback(record);
      }
    });
    callbackRecords.current = callbackRecords.current.filter((record) => record.active && (!record.renderScoped || record.renderId === activeRenderId));
  }
  function registerScriptCallback(record) {
    if (!record.active || record.registered)
      return;
    const cbs = record.script._cbs[record.key];
    if (!cbs) {
      record.handler(record.script.instance);
      return;
    }
    cbs.push(record.handler);
    record.registered = true;
  }
  function unregisterScriptCallback(record) {
    if (!record.registered)
      return;
    const idx = record.script._cbs[record.key]?.indexOf(record.handler) ?? -1;
    if (idx !== -1)
      record.script._cbs[record.key]?.splice(idx, 1);
    record.registered = false;
  }
  const _registerCb = (key, cb) => {
    const renderScoped = !(isMounted.current && committedRenderId.current === currentRenderId);
    const record = {
      active: true,
      handler: (...args) => {
        if (!record.active)
          return;
        record.active = false;
        record.registered = false;
        cb(...args);
      },
      key,
      registered: false,
      renderScoped,
      renderId: currentRenderId,
      script
    };
    callbackRecords.current.push(record);
    if (isMounted.current && committedRenderId.current === currentRenderId)
      registerScriptCallback(record);
    return destroy;
    function destroy() {
      if (!record.active)
        return;
      record.active = false;
      unregisterScriptCallback(record);
      const idx = callbackRecords.current.indexOf(record);
      if (idx !== -1)
        callbackRecords.current.splice(idx, 1);
    }
  };
  script.onLoaded = (cb) => _registerCb("loaded", cb);
  script.onError = (cb) => _registerCb("error", cb);
  return script;
}

function flattenHeadElements(children) {
  const elements = [];
  react.Children.forEach(children, (child) => {
    if (!react.isValidElement(child))
      return;
    if (child.type === react.Fragment) {
      elements.push(...flattenHeadElements(child.props.children));
      return;
    }
    elements.push(child);
  });
  return elements;
}
function normalizeReactPropAliases(props) {
  if (!props || typeof props !== "object")
    return {};
  const normalized = {};
  for (const [prop, value] of Object.entries(props)) {
    if (prop === "ref" || prop === "suppressContentEditableWarning" || prop === "suppressHydrationWarning")
      continue;
    const name = prop === "className" ? "class" : prop === "httpEquiv" ? "http-equiv" : prop;
    normalized[name] = value;
  }
  return normalized;
}
function normalizeRawContent(tagName, data) {
  const rawContent = data.dangerouslySetInnerHTML;
  delete data.dangerouslySetInnerHTML;
  if (rawContent == null)
    return;
  if (!unhead_AvDFlk_u.b.has(tagName)) {
    throw new Error(`${tagName} is a self-closing tag and must neither have \`children\` nor use \`dangerouslySetInnerHTML\`.`);
  }
  if (typeof rawContent !== "object" || !("__html" in rawContent)) {
    throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`.");
  }
  if (data.children != null) {
    throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
  }
  const content = rawContent.__html;
  if (content != null)
    data[tagName === "title" ? "textContent" : "innerHTML"] = String(content);
}
const Head = ({ children, titleTemplate }) => {
  const head = useUnhead();
  const processedElements = (0,react.useMemo)(() => flattenHeadElements(children), [children]);
  const getHeadChanges = (0,react.useCallback)(() => {
    const input = {
      titleTemplate
    };
    for (const element of processedElements) {
      const reactElement = element;
      const { type, props } = reactElement;
      const tagName = String(type);
      if (!unhead_AvDFlk_u.V.has(tagName)) {
        continue;
      }
      const data = normalizeReactPropAliases(props);
      normalizeRawContent(tagName, data);
      if (unhead_AvDFlk_u.b.has(tagName) && data.children != null) {
        const contentKey = tagName === "script" ? "innerHTML" : "textContent";
        data[contentKey] = Array.isArray(data.children) ? data.children.map(String).join("") : String(data.children);
      }
      delete data.children;
      if (unhead_AvDFlk_u.H.has(tagName)) {
        const key = tagName;
        if (!Array.isArray(input[key])) {
          input[key] = [];
        }
        input[key].push(data);
      } else {
        input[tagName] = data;
      }
    }
    return input;
  }, [processedElements, titleTemplate]);
  const headRef = (0,react.useRef)(null);
  if (head.ssr && !headRef.current)
    headRef.current = head.push(getHeadChanges());
  (0,react.useEffect)(() => {
    headRef.current = head.push(getHeadChanges());
    return () => {
      headRef.current?.dispose();
      headRef.current = null;
    };
  }, [head]);
  (0,react.useEffect)(() => {
    headRef.current?.patch(getHeadChanges());
  }, [getHeadChanges]);
  return null;
};



;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Llms/LlmsHint.js


const visuallyHiddenStyle = {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    border: 0
};
function createLlmsHintText(param) {
    let { llmsTxtUrl, llmsFullTxtUrl, pageMdUrl } = param;
    const text = `For AI agents: the complete documentation index is available at ${llmsTxtUrl}, the full documentation bundle is available at ${llmsFullTxtUrl}`;
    return pageMdUrl ? `${text}, and this page is available as Markdown at ${pageMdUrl}.` : `${text}.`;
}
function LlmsHint() {
    const { page } = (0,usePage/* .usePage */.e)();
    const { site } = (0,useSite/* .useSite */.Z)();
    if (!page?.routePath) return null;
    const isMultiVersion = site.multiVersion.versions.length > 0;
    const versionPrefix = isMultiVersion && page.version !== site.multiVersion.default ? `${page.version}/` : '';
    const langPrefix = page.lang === site.lang ? '' : `${page.lang}/`;
    const llmsTxtUrl = (0,utils/* .withSiteOrigin */.OM)((0,utils/* .withBase */.cV)(`/${versionPrefix}${langPrefix}llms.txt`));
    const llmsFullTxtUrl = (0,utils/* .withSiteOrigin */.OM)((0,utils/* .withBase */.cV)(`/${versionPrefix}${langPrefix}llms-full.txt`));
    if (false) {}
    const pageMdUrl = (0,utils/* .withSiteOrigin */.OM)((0,utils/* .routePathToMdPath */.qp)(page.routePath));
    const hintText = createLlmsHintText({
        llmsTxtUrl,
        llmsFullTxtUrl,
        pageMdUrl
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)(Head, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("link", {
                        rel: "alternate",
                        type: "text/markdown",
                        href: pageMdUrl
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("link", {
                        rel: "describedby",
                        href: llmsTxtUrl
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-llms-hint",
                style: visuallyHiddenStyle,
                children: hintText
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Llms/LlmsViewOptions.css
var LlmsViewOptions = __webpack_require__("M");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Llms/LlmsViewOptions.js
/*! LICENSE: LlmsViewOptions.js.LICENSE.txt */ 






/**
 * Inspired from fumadocs docsite
 * @from https://github.com/fuma-nama/fumadocs/blob/5723bbe58ef805a5421a780abf235a10b251be2f/apps/docs/app/docs/%5B...slug%5D/page.client.tsx#L11
 * @license MIT
 */ const DEFAULT_OPTIONS = [
    'markdownLink',
    'viewMarkdown',
    'chatgpt',
    'claude'
];
function LlmsViewOptions_LlmsViewOptions(param) {
    let { options: propsOptions } = param;
    const { site } = (0,useSite/* .useSite */.Z)();
    const llmsUI = site?.themeConfig?.llmsUI;
    const configuredOptions = 'object' == typeof llmsUI ? llmsUI?.viewOptions : propsOptions;
    const options = false === configuredOptions ? [] : configuredOptions ?? DEFAULT_OPTIONS;
    const [isOpen, setIsOpen] = (0,react.useState)(false);
    const dropdownRef = (0,react.useRef)(null);
    (0,react.useEffect)(()=>{
        const handleClickOutside = (event)=>{
            if (dropdownRef.current && event.target && !dropdownRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const toggleDropdown = ()=>{
        setIsOpen((prevOpen)=>!prevOpen);
    };
    const { pathname } = useMdUrl();
    const t = useI18n();
    const items = (0,react.useMemo)(()=>{
        const fullMarkdownUrl = "u" > typeof window ? new URL(pathname, window.location.origin).toString() : 'loading';
        const q = `Read ${fullMarkdownUrl}, I want to ask questions about it.`;
        return {
            markdownLink: {
                title: t('copyMarkdownLinkText'),
                icon: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: theme_0/* .IconLink */.AX
                }),
                onClick: ()=>{
                    (0,theme_0/* .copyToClipboard */.lW)(fullMarkdownUrl);
                }
            },
            viewMarkdown: {
                title: t('viewMarkdownText'),
                href: pathname,
                icon: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: theme_0/* .IconMarkdown */.j3
                })
            },
            chatgpt: {
                title: t('openInText', {
                    name: 'ChatGPT'
                }),
                href: `https://chatgpt.com/?${new URLSearchParams({
                    hints: 'search',
                    q
                })}`,
                icon: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: theme_0/* .IconOpenAI */.I4
                })
            },
            claude: {
                title: t('openInText', {
                    name: 'Claude'
                }),
                href: `https://claude.ai/new?${new URLSearchParams({
                    q
                })}`,
                icon: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: theme_0/* .IconAnthropic */.Cq
                })
            }
        };
    }, [
        pathname,
        t
    ]);
    const renderableItems = (0,react.useMemo)(()=>options.map((option)=>{
            if ('markdownLink' === option) return items.markdownLink;
            if ('viewMarkdown' === option) return items.viewMarkdown;
            if ('chatgpt' === option) return items.chatgpt;
            if ('claude' === option) return items.claude;
            if ('object' == typeof option && 'title' in option && 'string' == typeof option.title && ('href' in option || 'onClick' in option)) return option;
            return null;
        }).filter((item)=>null !== item), [
        items,
        options
    ]);
    if (0 === renderableItems.length) return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
            ref: dropdownRef,
            onClick: toggleDropdown,
            "aria-label": "View options",
            "aria-expanded": isOpen,
            "aria-haspopup": "true",
            className: `rp-llms-button rp-llms-view-options__trigger ${isOpen ? 'rp-llms-view-options__trigger--active' : ''}`,
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: theme_0/* .IconDown */.Y7,
                    className: `rp-llms-view-options__arrow ${isOpen ? 'rp-llms-view-options__arrow--rotated' : ''}`
                }),
                isOpen && /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "rp-llms-view-options__menu",
                    children: renderableItems.map((item)=>{
                        if (item.href) return /*#__PURE__*/ (0,jsx_runtime.jsxs)("a", {
                            className: "rp-llms-view-options__menu-item",
                            href: item.href,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                    className: "rp-llms-view-options__item-icon",
                                    children: item.icon
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                    children: item.title
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                    className: "rp-llms-view-options__external-icon",
                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                                        icon: theme_0/* .IconExternalLink */.HW
                                    })
                                })
                            ]
                        }, item.title);
                        return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "rp-llms-view-options__menu-item",
                            onClick: item.onClick,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                    className: "rp-llms-view-options__item-icon",
                                    children: item.icon
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                    children: item.title
                                })
                            ]
                        }, item.title);
                    })
                })
            ]
        })
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Llms/LlmsCopyRow.js






function LlmsCopyRow() {
    const t = useI18n();
    const { pathname } = useMdUrl();
    const [isLoading, setLoading] = (0,react.useState)(false);
    const [isFinished, setFinished] = (0,react.useState)(false);
    const timer = (0,react.useRef)(null);
    const handleClick = (0,react.useCallback)(async ()=>{
        if (!pathname) return;
        setLoading(true);
        try {
            const content = await getLlmsCopyContent(pathname);
            const isCopied = await (0,theme_0/* .copyToClipboard */.lW)(content);
            if (!isCopied) return;
            setFinished(true);
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = null;
            }
            timer.current = window.setTimeout(()=>{
                setFinished(false);
                timer.current = null;
            }, 1500);
        } finally{
            setLoading(false);
        }
    }, [
        pathname
    ]);
    if (!pathname) return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
        className: "rp-outline__action-row",
        onClick: handleClick,
        disabled: isLoading,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                icon: isFinished ? theme_0/* .IconSuccess */.lv : theme_0/* .IconCopy */.bz
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                children: t('copyMarkdownText')
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Llms/LlmsOpenRow.css
var LlmsOpenRow = __webpack_require__("g1");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Llms/LlmsOpenRow.js







const LlmsOpenRow_DEFAULT_OPTIONS = [
    'markdownLink',
    'viewMarkdown',
    'chatgpt',
    'claude'
];
function LlmsOpenRow_LlmsOpenRow() {
    const t = useI18n();
    const { pathname } = useMdUrl();
    const { site } = (0,useSite/* .useSite */.Z)();
    const llmsUI = site?.themeConfig?.llmsUI;
    const [isOpen, setIsOpen] = (0,react.useState)(false);
    const containerRef = (0,react.useRef)(null);
    const options = 'object' == typeof llmsUI ? false === llmsUI.viewOptions ? [] : llmsUI.viewOptions ?? LlmsOpenRow_DEFAULT_OPTIONS : LlmsOpenRow_DEFAULT_OPTIONS;
    (0,react.useEffect)(()=>{
        const handleClickOutside = (event)=>{
            if (containerRef.current && event.target && !containerRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const fullMarkdownUrl = (0,react.useMemo)(()=>"u" > typeof window ? new URL(pathname, window.location.origin).toString() : '', [
        pathname
    ]);
    const q = `Read ${fullMarkdownUrl}, I want to ask questions about it.`;
    const builtinItems = (0,react.useMemo)(()=>({
            markdownLink: {
                title: t('copyMarkdownLinkText'),
                icon: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: theme_0/* .IconLink */.AX
                }),
                onClick: ()=>{
                    (0,theme_0/* .copyToClipboard */.lW)(fullMarkdownUrl);
                }
            },
            viewMarkdown: {
                title: t('viewMarkdownText'),
                href: pathname,
                icon: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: theme_0/* .IconMarkdown */.j3
                })
            },
            chatgpt: {
                title: t('openInText', {
                    name: 'ChatGPT'
                }),
                href: `https://chatgpt.com/?${new URLSearchParams({
                    hints: 'search',
                    q
                })}`,
                icon: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: theme_0/* .IconOpenAI */.I4
                })
            },
            claude: {
                title: t('openInText', {
                    name: 'Claude'
                }),
                href: `https://claude.ai/new?${new URLSearchParams({
                    q
                })}`,
                icon: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: theme_0/* .IconAnthropic */.Cq
                })
            }
        }), [
        fullMarkdownUrl,
        pathname,
        t,
        q
    ]);
    const renderableItems = (0,react.useMemo)(()=>options.map((option)=>builtinItems[option] ?? null).filter((item)=>null !== item), [
        options,
        builtinItems
    ]);
    if (!pathname || 0 === renderableItems.length) return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        ref: containerRef,
        className: "rp-outline__open-in-wrapper",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
                className: "rp-outline__action-row",
                onClick: ()=>setIsOpen((prevOpen)=>!prevOpen),
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                        icon: theme_0/* .IconOpenInChat */.VY
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                        children: t('openInText', {
                            name: 'chat'
                        })
                    })
                ]
            }),
            isOpen && /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-llms-view-options__menu",
                children: renderableItems.map((item)=>{
                    if (item.href) return /*#__PURE__*/ (0,jsx_runtime.jsxs)("a", {
                        className: "rp-llms-view-options__menu-item",
                        href: item.href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        onClick: ()=>setIsOpen(false),
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                className: "rp-llms-view-options__item-icon",
                                children: item.icon
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                children: item.title
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                className: "rp-llms-view-options__external-icon",
                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                                    icon: theme_0/* .IconExternalLink */.HW
                                })
                            })
                        ]
                    }, item.title);
                    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
                        type: "button",
                        className: "rp-llms-view-options__menu-item",
                        onClick: ()=>{
                            item.onClick?.();
                            setIsOpen(false);
                        },
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                className: "rp-llms-view-options__item-icon",
                                children: item.icon
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                children: item.title
                            })
                        ]
                    }, item.title);
                })
            })
        ]
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useLocaleSiteData.js



function useLocaleSiteData() {
    const { site } = (0,useSite/* .useSite */.Z)();
    const lang = useLang();
    const themeConfig = site?.themeConfig ?? {};
    const defaultLang = site.lang ?? '';
    const locales = themeConfig?.locales;
    if (!locales || 0 === locales.length) return {
        nav: themeConfig.nav,
        sidebar: themeConfig.sidebar
    };
    const localeInfo = locales.find((locale)=>locale.lang === lang);
    return {
        ...localeInfo,
        langRoutePrefix: lang === defaultLang ? '/' : (0,dist/* .addTrailingSlash */.hg)(lang)
    };
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useVersion.js

function useVersion() {
    const { page } = (0,usePage/* .usePage */.e)();
    return page.version || '';
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useNav.js


function useNav() {
    const { nav } = useLocaleSiteData();
    const version = useVersion();
    if (Array.isArray(nav)) return nav;
    const navKey = version.length > 0 ? version : 'default';
    return [
        ...nav[navKey]
    ];
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Nav/index.css
var Nav = __webpack_require__("O");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavList/context.js

const NavListContext = /*#__PURE__*/ (0,react.createContext)('bar');


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Nav/hooks.js

function replaceLang(rawUrl, lang, version, cleanUrls, isPageNotFound) {
    let url = (0,utils/* .removeBase */.EJ)(rawUrl);
    if (!url || isPageNotFound) url = '/';
    url = (0,utils/* .normalizeHrefInRuntime */.cc)(url);
    let versionPart = '';
    let langPart = '';
    const parts = url.split('/').filter(Boolean);
    if (version.current && version.current !== version.default) versionPart = parts.shift() || '';
    if (lang.target !== lang.default) {
        langPart = lang.target;
        if (lang.current !== lang.default) parts.shift();
    } else parts.shift();
    let purePathPart = parts.join('/') || '';
    if ((versionPart || langPart) && !purePathPart) purePathPart = cleanUrls ? 'index' : 'index.html';
    return (0,dist/* .addLeadingSlash */.tb)([
        versionPart,
        langPart,
        purePathPart
    ].filter(Boolean).join('/'));
}
function useLangsMenu() {
    const { page } = (0,usePage/* .usePage */.e)();
    const { site } = (0,useSite/* .useSite */.Z)();
    const currentVersion = useVersion();
    const { pathname, search } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const defaultLang = site.lang || '';
    const defaultVersion = site.multiVersion.default || '';
    const localeLanguages = Object.values(site.locales || site.themeConfig.locales || {});
    const cleanUrls = site.route?.cleanUrls || false;
    const hasMultiLanguage = localeLanguages.length > 1;
    const { lang: currentLang, pageType } = page;
    const translationMenuData = hasMultiLanguage ? {
        items: localeLanguages.map((item)=>{
            const isCurrentLang = item.lang === currentLang;
            return {
                text: item?.label,
                link: isCurrentLang ? '' : replaceLang(pathname + search, {
                    current: currentLang,
                    target: item.lang,
                    default: defaultLang
                }, {
                    current: currentVersion,
                    default: defaultVersion
                }, cleanUrls, '404' === pageType),
                lang: item.lang,
                rel: 'alternate'
            };
        }),
        activeValue: localeLanguages.find((item)=>currentLang === item.lang)?.label
    } : {
        items: []
    };
    return translationMenuData;
}
function replaceVersion(rawUrl, version, cleanUrls, isPageNotFound) {
    let url = (0,utils/* .removeBase */.EJ)(rawUrl);
    if (!url || isPageNotFound) url = (0,utils/* .normalizeHrefInRuntime */.cc)('/');
    let versionPart = '';
    const parts = url.split('/').filter(Boolean);
    if (version.target !== version.default) {
        versionPart = version.target;
        if (version.current !== version.default) parts.shift();
    } else parts.shift();
    let restPart = parts.join('/') || '';
    if (versionPart && !restPart) restPart = cleanUrls ? 'index' : 'index.html';
    return (0,dist/* .addLeadingSlash */.tb)([
        versionPart,
        restPart
    ].filter(Boolean).join('/'));
}
function useVersionsMenu() {
    const { page } = (0,usePage/* .usePage */.e)();
    const { site } = (0,useSite/* .useSite */.Z)();
    const currentVersion = useVersion();
    const { pathname } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const cleanUrls = site.route?.cleanUrls || false;
    const defaultVersion = site.multiVersion.default || '';
    const versions = site.multiVersion.versions || [];
    const versionsMenuData = {
        items: versions.map((version)=>({
                text: version,
                link: replaceVersion(pathname, {
                    current: currentVersion,
                    target: version,
                    default: defaultVersion
                }, cleanUrls, '404' === page.pageType)
            })),
        text: currentVersion,
        activeValue: currentVersion
    };
    return versionsMenuData;
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Nav/NavMenu.css
var NavMenu = __webpack_require__("fO");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Nav/NavMenu.js








const NavMenu_SvgDown = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
        icon: theme_0/* .IconArrowDown */.RG,
        ...props
    });
function NavMenuItemInner(param) {
    let { menuItem, children } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: 'link' in menuItem && 'string' == typeof menuItem.link ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(theme_0/* .Link */.N_, {
            href: menuItem.link,
            download: menuItem.download,
            className: "rp-nav-menu__item__container",
            hrefLang: menuItem.lang,
            lang: menuItem.lang,
            rel: menuItem.rel,
            children: [
                menuItem.icon && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: menuItem.icon,
                    className: "rp-nav-menu__item__leading-icon"
                }),
                menuItem.text,
                menuItem.tag && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Tag */.OT, {
                    tag: menuItem.tag
                }),
                children
            ]
        }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "rp-nav-menu__item__container",
            children: [
                menuItem.icon && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: menuItem.icon,
                    className: "rp-nav-menu__item__leading-icon"
                }),
                menuItem.text,
                menuItem.tag && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Tag */.OT, {
                    tag: menuItem.tag
                }),
                children
            ]
        })
    });
}
function NavMenuItemWithChildren(param) {
    let { menuItem, activeMatcher } = param;
    const { handleMouseEnter, handleMouseLeave, hoverGroup } = (0,theme_0/* .useHoverGroup */._2)({
        items: menuItem.items,
        activeMatcher
    });
    const hasItems = menuItem.items.length > 0;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
        className: "rp-nav-menu__item",
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClick: handleMouseEnter,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(NavMenuItemInner, {
                menuItem: menuItem,
                children: hasItems && /*#__PURE__*/ (0,jsx_runtime.jsx)(NavMenu_SvgDown, {
                    className: "rp-nav-menu__item__icon"
                })
            }),
            hoverGroup
        ]
    });
}
function NavMenuItemWithLink(param) {
    let { menuItem } = param;
    const { pathname } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const isActive = (0,react.useMemo)(()=>(0,dist/* .matchNavbar */.sP)(menuItem, pathname), [
        menuItem,
        pathname
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
        className: dist_clsx('rp-nav-menu__item', isActive ? 'rp-nav-menu__item--active' : ''),
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(NavMenuItemInner, {
            menuItem: menuItem
        })
    });
}
function NavMenuItem(param) {
    let { menuItem } = param;
    if ('items' in menuItem && Array.isArray(menuItem.items) && menuItem.items.length > 0) return /*#__PURE__*/ (0,jsx_runtime.jsx)(NavMenuItemWithChildren, {
        menuItem: menuItem
    });
    if ('link' in menuItem && menuItem.link.length > 0) return /*#__PURE__*/ (0,jsx_runtime.jsx)(NavMenuItemWithLink, {
        menuItem: menuItem
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
        className: "rp-nav-menu__item",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(NavMenuItemInner, {
            menuItem: menuItem
        })
    });
}
function NavMenuDivider() {
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "rp-nav-menu__divider"
    });
}
function NavLangs() {
    const { items, activeValue } = useLangsMenu();
    return items.length > 1 ? /*#__PURE__*/ (0,jsx_runtime.jsx)(NavMenuItemWithChildren, {
        menuItem: {
            text: activeValue,
            items
        },
        activeMatcher: (item)=>item.text === activeValue
    }) : null;
}
function NavVersions() {
    const { activeValue, items } = useVersionsMenu();
    return items.length > 1 ? /*#__PURE__*/ (0,jsx_runtime.jsx)(NavMenuItemWithChildren, {
        menuItem: {
            text: activeValue,
            items
        },
        activeMatcher: (item)=>item.text === activeValue
    }) : null;
}
function NavMenu_NavMenu(param) {
    let { menuItems, position, beforeNavItems, afterNavItems } = param;
    const items = (0,react.useMemo)(()=>position ? menuItems.filter((item)=>(item.position ?? 'right') === position) : menuItems, [
        menuItems,
        position
    ]);
    if (!items.length && null == beforeNavItems && null == afterNavItems) return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("ul", {
        className: dist_clsx('rp-nav-menu', position && `rp-nav-menu--${position}`),
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(NavListContext.Provider, {
            value: "items",
            children: [
                beforeNavItems,
                items.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(NavMenuItem, {
                        menuItem: item
                    }, index)),
                afterNavItems
            ]
        })
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Nav/index.js






function Nav_Nav(props) {
    const { beforeNavTitle, afterNavTitle, beforeNavMenu, afterNavMenu, navTitle, beforeLeftNavItems, afterLeftNavItems, beforeRightNavItems, afterRightNavItems } = props;
    const navList = useNav();
    const { site } = (0,useSite/* .useSite */.Z)();
    const hasAppearanceSwitch = (0,dist/* .isDarkModeSwitchEnabled */.Nv)(site.themeConfig.darkMode);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("header", {
        className: "rp-nav",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-nav__left",
                children: [
                    beforeNavTitle,
                    navTitle ?? /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .NavTitle */.ue, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(NavMenu_NavMenu, {
                        menuItems: navList,
                        position: "left",
                        beforeNavItems: beforeLeftNavItems,
                        afterNavItems: afterLeftNavItems
                    }),
                    afterNavTitle
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-nav__right",
                children: [
                    beforeNavMenu,
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Search */.vj, {}),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(NavMenu_NavMenu, {
                        menuItems: navList,
                        position: "right",
                        beforeNavItems: beforeRightNavItems,
                        afterNavItems: afterRightNavItems
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "rp-nav__others",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(NavMenuDivider, {}),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(NavLangs, {}),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(NavVersions, {}),
                            hasAppearanceSwitch && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SwitchAppearance */.bS, {}),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SocialLinks */.RP, {})
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .NavHamburger */.fx, {
                        beforeLeftNavItems: beforeLeftNavItems,
                        afterLeftNavItems: afterLeftNavItems,
                        beforeRightNavItems: beforeRightNavItems,
                        afterRightNavItems: afterRightNavItems
                    }),
                    afterNavMenu
                ]
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/index.js
var react_dom = __webpack_require__("ao");
;// CONCATENATED MODULE: ./node_modules/.pnpm/body-scroll-lock@4.0.0-beta.0/node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Older browsers don't support event options, feature detect it.

// Adopted and modified solution from Bohdan Didukh (2017)
// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

var hasPassiveEvents = false;
if (typeof window !== 'undefined') {
  var passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true;
      return undefined;
    }
  };
  window.addEventListener('testPassive', null, passiveTestOptions);
  window.removeEventListener('testPassive', null, passiveTestOptions);
}

var isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);


var locks = [];
var documentListenerAdded = false;
var initialClientY = -1;
var previousBodyOverflowSetting = void 0;
var previousBodyPosition = void 0;
var previousBodyPaddingRight = void 0;

// returns true if `el` should be allowed to receive touchmove events.
var bodyScrollLock_esm_allowTouchMove = function allowTouchMove(el) {
  return locks.some(function (lock) {
    if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
      return true;
    }

    return false;
  });
};

var bodyScrollLock_esm_preventDefault = function preventDefault(rawEvent) {
  var e = rawEvent || window.event;

  // For the case whereby consumers adds a touchmove event listener to document.
  // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
  // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
  // the touchmove event on document will break.
  if (bodyScrollLock_esm_allowTouchMove(e.target)) {
    return true;
  }

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true;

  if (e.preventDefault) e.preventDefault();

  return false;
};

var bodyScrollLock_esm_setOverflowHidden = function setOverflowHidden(options) {
  // If previousBodyPaddingRight is already set, don't set it again.
  if (previousBodyPaddingRight === undefined) {
    var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
    var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

    if (_reserveScrollBarGap && scrollBarGap > 0) {
      var computedBodyPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'), 10);
      previousBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.paddingRight = computedBodyPaddingRight + scrollBarGap + 'px';
    }
  }

  // If previousBodyOverflowSetting is already set, don't set it again.
  if (previousBodyOverflowSetting === undefined) {
    previousBodyOverflowSetting = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
};

var bodyScrollLock_esm_restoreOverflowSetting = function restoreOverflowSetting() {
  if (previousBodyPaddingRight !== undefined) {
    document.body.style.paddingRight = previousBodyPaddingRight;

    // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
    // can be set again.
    previousBodyPaddingRight = undefined;
  }

  if (previousBodyOverflowSetting !== undefined) {
    document.body.style.overflow = previousBodyOverflowSetting;

    // Restore previousBodyOverflowSetting to undefined
    // so setOverflowHidden knows it can be set again.
    previousBodyOverflowSetting = undefined;
  }
};

var bodyScrollLock_esm_setPositionFixed = function setPositionFixed() {
  return window.requestAnimationFrame(function () {
    // If previousBodyPosition is already set, don't set it again.
    if (previousBodyPosition === undefined) {
      previousBodyPosition = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left
      };

      // Update the dom inside an animation frame 
      var _window = window,
          scrollY = _window.scrollY,
          scrollX = _window.scrollX,
          innerHeight = _window.innerHeight;

      document.body.style.position = 'fixed';
      document.body.style.top = -scrollY;
      document.body.style.left = -scrollX;

      setTimeout(function () {
        return window.requestAnimationFrame(function () {
          // Attempt to check if the bottom bar appeared due to the position change
          var bottomBarHeight = innerHeight - window.innerHeight;
          if (bottomBarHeight && scrollY >= innerHeight) {
            // Move the content further up so that the bottom bar doesn't hide it
            document.body.style.top = -(scrollY + bottomBarHeight);
          }
        });
      }, 300);
    }
  });
};

var bodyScrollLock_esm_restorePositionSetting = function restorePositionSetting() {
  if (previousBodyPosition !== undefined) {
    // Convert the position from "px" to Int
    var y = -parseInt(document.body.style.top, 10);
    var x = -parseInt(document.body.style.left, 10);

    // Restore styles
    document.body.style.position = previousBodyPosition.position;
    document.body.style.top = previousBodyPosition.top;
    document.body.style.left = previousBodyPosition.left;

    // Restore scroll
    window.scrollTo(x, y);

    previousBodyPosition = undefined;
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
var bodyScrollLock_esm_isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
  return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
};

var bodyScrollLock_esm_handleScroll = function handleScroll(event, targetElement) {
  var clientY = event.targetTouches[0].clientY - initialClientY;

  if (bodyScrollLock_esm_allowTouchMove(event.target)) {
    return false;
  }

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll.
    return bodyScrollLock_esm_preventDefault(event);
  }

  if (bodyScrollLock_esm_isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the bottom of its scroll.
    return bodyScrollLock_esm_preventDefault(event);
  }

  event.stopPropagation();
  return true;
};

var bodyScrollLock_esm_disableBodyScroll = function disableBodyScroll(targetElement, options) {
  // targetElement must be provided
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
    return;
  }

  // disableBodyScroll must not have been called on this targetElement before
  if (locks.some(function (lock) {
    return lock.targetElement === targetElement;
  })) {
    return;
  }

  var lock = {
    targetElement: targetElement,
    options: options || {}
  };

  locks = [].concat(_toConsumableArray(locks), [lock]);

  if (isIosDevice) {
    bodyScrollLock_esm_setPositionFixed();
  } else {
    bodyScrollLock_esm_setOverflowHidden(options);
  }

  if (isIosDevice) {
    targetElement.ontouchstart = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        initialClientY = event.targetTouches[0].clientY;
      }
    };
    targetElement.ontouchmove = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        bodyScrollLock_esm_handleScroll(event, targetElement);
      }
    };

    if (!documentListenerAdded) {
      document.addEventListener('touchmove', bodyScrollLock_esm_preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = true;
    }
  }
};

var bodyScrollLock_esm_clearAllBodyScrollLocks = function clearAllBodyScrollLocks() {
  if (isIosDevice) {
    // Clear all locks ontouchstart/ontouchmove handlers, and the references.
    locks.forEach(function (lock) {
      lock.targetElement.ontouchstart = null;
      lock.targetElement.ontouchmove = null;
    });

    if (documentListenerAdded) {
      document.removeEventListener('touchmove', bodyScrollLock_esm_preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }

    // Reset initial clientY.
    initialClientY = -1;
  }

  if (isIosDevice) {
    bodyScrollLock_esm_restorePositionSetting();
  } else {
    bodyScrollLock_esm_restoreOverflowSetting();
  }

  locks = [];
};

var bodyScrollLock_esm_enableBodyScroll = function enableBodyScroll(targetElement) {
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
    return;
  }

  locks = locks.filter(function (lock) {
    return lock.targetElement !== targetElement;
  });

  if (isIosDevice) {
    targetElement.ontouchstart = null;
    targetElement.ontouchmove = null;

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener('touchmove', bodyScrollLock_esm_preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }
  }

  if (isIosDevice) {
    bodyScrollLock_esm_restorePositionSetting();
  } else {
    bodyScrollLock_esm_restoreOverflowSetting();
  }
};


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavScreen/index.css
var NavScreen = __webpack_require__("x");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/NoSSR.js + 2 modules
var NoSSR = __webpack_require__("p");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavScreen/NavScreenAppearance.css
var NavScreenAppearance = __webpack_require__("Ee");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavScreen/NavScreenAppearance.js





function NavScreenAppearance_NavScreenAppearance() {
    const { site } = (0,useSite/* .useSite */.Z)();
    const hasAppearanceSwitch = (0,dist/* .isDarkModeSwitchEnabled */.Nv)(site.themeConfig.darkMode);
    const t = useI18n();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: hasAppearanceSwitch && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "rp-nav-screen-appearance",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "rp-nav-screen-appearance__left",
                    children: t('themeText')
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "rp-nav-screen-appearance__right",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(NoSSR/* .NoSSR */.O, {
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SwitchAppearance */.bS, {})
                    })
                })
            ]
        })
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavScreen/NavScreenLangs.css
var NavScreenLangs = __webpack_require__("C");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavScreen/NavScreenMenuItem.css
var NavScreenMenuItem = __webpack_require__("tY");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavScreen/NavScreenMenuItem.js






const NavScreenMenuItem_SvgDown = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
        icon: theme_0/* .IconArrowDown */.RG,
        ...props
    });
function NavScreenMenuItemContent(param) {
    let { menuItem } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            menuItem.icon && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                icon: menuItem.icon,
                className: "rp-nav-screen-menu-item__icon"
            }),
            menuItem.text,
            menuItem.tag && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Tag */.OT, {
                tag: menuItem.tag
            })
        ]
    });
}
function NavScreenMenuItemRaw(param) {
    let { left, right, isOpen, isActive, onClick, href, download } = param;
    if (href) return /*#__PURE__*/ (0,jsx_runtime.jsxs)(theme_0/* .Link */.N_, {
        href: href,
        className: dist_clsx('rp-nav-screen-menu-item', isOpen && 'rp-nav-screen-menu-item--open', isActive && 'rp-nav-screen-menu-item--active'),
        onClick: onClick,
        download: download,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-nav-screen-menu-item__left",
                children: left
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-nav-screen-menu-item__right",
                children: right
            })
        ]
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: dist_clsx('rp-nav-screen-menu-item', isOpen && 'rp-nav-screen-menu-item--open', isActive && 'rp-nav-screen-menu-item--active'),
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-nav-screen-menu-item__left",
                children: left
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-nav-screen-menu-item__right",
                children: right
            })
        ]
    });
}
function NavScreenMenuItemWithLink(param) {
    let { menuItem } = param;
    const { pathname } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const isActive = (0,react.useMemo)(()=>(0,dist/* .matchNavbar */.sP)(menuItem, pathname), [
        menuItem,
        pathname
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenuItemRaw, {
        left: /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenuItemContent, {
            menuItem: menuItem
        }),
        right: null,
        href: menuItem.link,
        download: menuItem.download,
        isActive: isActive
    });
}
function NavScreenMenuItemWithChildren(param) {
    let { menuItem } = param;
    const [isOpen, setIsOpen] = (0,react.useState)(false);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenuItemRaw, {
                left: /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenuItemContent, {
                    menuItem: menuItem
                }),
                right: /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenuItem_SvgDown, {
                    className: "rp-nav-screen-menu-item__arrow"
                }),
                isOpen: isOpen,
                onClick: ()=>setIsOpen(!isOpen),
                href: 'link' in menuItem ? menuItem.link : void 0
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-nav-screen-menu-item__group",
                style: {
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows .2s ease-out',
                    width: '100%'
                },
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "rp-nav-screen-menu-item__group-inner",
                    children: menuItem.items.map((item)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenuItem_NavScreenMenuItem, {
                            menuItem: item
                        }, item.text))
                })
            })
        ]
    });
}
function NavScreenMenuItem_NavScreenMenuItem(param) {
    let { menuItem } = param;
    if ('items' in menuItem && Array.isArray(menuItem.items) && menuItem.items.length > 0) return /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenuItemWithChildren, {
        menuItem: menuItem
    });
    if ('link' in menuItem && 'string' == typeof menuItem.link) return /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenuItemWithLink, {
        menuItem: menuItem
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenuItemRaw, {
        left: /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenuItemContent, {
            menuItem: menuItem
        }),
        right: null
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavScreen/NavScreenLangs.js








function NavScreenLangs_NavScreenLangs() {
    const { items, activeValue } = useLangsMenu();
    const [isOpen, setIsOpen] = (0,react.useState)(false);
    const t = useI18n();
    return items.length > 1 ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-nav-screen-langs",
                onClick: ()=>setIsOpen(!isOpen),
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "rp-nav-screen-langs__left",
                        children: t('languagesText')
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "rp-nav-screen-langs__right",
                        children: [
                            activeValue,
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenuItem_SvgDown, {
                                className: `rp-nav-screen-langs__icon ${isOpen ? 'rp-nav-screen-langs__icon--open' : ''}`
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-nav-screen-langs-group",
                style: {
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.2s ease-out'
                },
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "rp-nav-screen-langs-group__inner",
                    children: items.map((item)=>{
                        const isActive = item.text === activeValue;
                        const className = dist_clsx('rp-nav-screen-langs-group__item', isActive && 'rp-nav-screen-langs-group__item--active');
                        return isActive ? /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                            className: className,
                            "aria-current": "page",
                            "aria-disabled": true,
                            children: item.text
                        }, item.text) : /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Link */.N_, {
                            href: item.link,
                            className: className,
                            hrefLang: item.lang,
                            lang: item.lang,
                            rel: "alternate",
                            children: item.text
                        }, item.text);
                    })
                })
            })
        ]
    }) : null;
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavScreen/NavScreenMenu.css
var NavScreenMenu = __webpack_require__("ct");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavScreen/NavScreenMenu.js




function NavScreenMenu_NavScreenMenu(param) {
    let { menuItems, beforeLeftNavItems, afterLeftNavItems, beforeRightNavItems, afterRightNavItems } = param;
    let firstLeft = -1;
    let lastLeft = -1;
    let firstRight = -1;
    let lastRight = -1;
    menuItems.forEach((item, index)=>{
        if ('left' === item.position) {
            if (-1 === firstLeft) firstLeft = index;
            lastLeft = index;
        } else {
            if (-1 === firstRight) firstRight = index;
            lastRight = index;
        }
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            -1 === firstLeft ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                children: [
                    beforeLeftNavItems,
                    afterLeftNavItems
                ]
            }) : null,
            menuItems.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(react.Fragment, {
                    children: [
                        index === firstLeft ? beforeLeftNavItems : null,
                        index === firstRight ? beforeRightNavItems : null,
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenuItem_NavScreenMenuItem, {
                            menuItem: item
                        }),
                        index === lastLeft ? afterLeftNavItems : null,
                        index === lastRight ? afterRightNavItems : null
                    ]
                }, index)),
            -1 === firstRight ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                children: [
                    beforeRightNavItems,
                    afterRightNavItems
                ]
            }) : null
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavScreen/NavScreenVersions.css
var NavScreenVersions = __webpack_require__("K");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavScreen/NavScreenVersions.js








function NavScreenVersions_NavScreenVersions() {
    const { items, activeValue } = useVersionsMenu();
    const [isOpen, setIsOpen] = (0,react.useState)(false);
    const t = useI18n();
    return items.length > 1 ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-nav-screen-versions",
                onClick: ()=>setIsOpen(!isOpen),
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "rp-nav-screen-versions__left",
                        children: t('versionsText')
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "rp-nav-screen-versions__right",
                        children: [
                            activeValue,
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenuItem_SvgDown, {
                                className: dist_clsx('rp-nav-screen-versions__icon', {
                                    'rp-nav-screen-versions__icon--open': isOpen
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: dist_clsx('rp-nav-screen-versions-group', isOpen && 'rp-nav-screen-versions-group--open'),
                children: items.map((item)=>{
                    const isActive = item.text === activeValue;
                    const className = dist_clsx('rp-nav-screen-versions-group__item', isActive && 'rp-nav-screen-versions-group__item--active');
                    return isActive ? /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                        className: className,
                        "aria-current": "page",
                        "aria-disabled": true,
                        children: item.text
                    }, item.text) : /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Link */.N_, {
                        href: item.link,
                        className: className,
                        children: item.text
                    }, item.text);
                })
            })
        ]
    }) : null;
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavScreen/index.js












function NavScreenDivider() {
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "rp-nav-screen-divider"
    });
}
function NavScreen_NavScreen(props) {
    const { isScreenOpen, toggleScreen, beforeLeftNavItems, afterLeftNavItems, beforeRightNavItems, afterRightNavItems } = props;
    const screen = (0,react.useRef)(null);
    const menuItems = useNav();
    (0,react.useEffect)(()=>{
        if (screen.current && isScreenOpen) {
            bodyScrollLock_esm_disableBodyScroll(screen.current, {
                reserveScrollBarGap: true
            });
            const style = ":root { --rp-home-background-bg: transparent; }";
            const styleElement = document.createElement('style');
            styleElement.id = 'rp-nav-screen-body-lock-style';
            styleElement.innerHTML = style;
            document.head.appendChild(styleElement);
        }
        return ()=>{
            bodyScrollLock_esm_clearAllBodyScrollLocks();
            const styleElement = document.getElementById('rp-nav-screen-body-lock-style');
            if (styleElement) document.head.removeChild(styleElement);
        };
    }, [
        isScreenOpen
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: dist_clsx('rp-nav-screen', {
            'rp-nav-screen--open': isScreenOpen
        }),
        ref: screen,
        onClick: toggleScreen,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "rp-nav-screen__container",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(NavListContext.Provider, {
                    value: "screen",
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenMenu_NavScreenMenu, {
                        menuItems: menuItems,
                        beforeLeftNavItems: beforeLeftNavItems,
                        afterLeftNavItems: afterLeftNavItems,
                        beforeRightNavItems: beforeRightNavItems,
                        afterRightNavItems: afterRightNavItems
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenDivider, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenAppearance_NavScreenAppearance, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenLangs_NavScreenLangs, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenVersions_NavScreenVersions, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenDivider, {}),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SocialLinks */.RP, {})
            ]
        })
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavHamburger/index.css
var NavHamburger = __webpack_require__("on");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavHamburger/useNavScreen.js


function useNavScreen() {
    const { pathname, hash } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const [isScreenOpen, setIsScreenOpen] = (0,react.useState)(false);
    function openScreen() {
        setIsScreenOpen(true);
        window.addEventListener('resize', closeScreenOnTabletWindow);
    }
    function closeScreen() {
        setIsScreenOpen(false);
        window.removeEventListener('resize', closeScreenOnTabletWindow);
    }
    function toggleScreen() {
        if (isScreenOpen) closeScreen();
        else openScreen();
    }
    (0,react.useEffect)(()=>{
        closeScreen();
    }, [
        pathname,
        hash
    ]);
    function closeScreenOnTabletWindow() {
        window.outerWidth >= 768 && closeScreen();
    }
    return {
        isScreenOpen,
        openScreen,
        closeScreen,
        toggleScreen
    };
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavHamburger/index.js










function NavHamburger_NavHamburger(props) {
    const items = /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "rp-nav-hamburger__md__hover-group",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenAppearance_NavScreenAppearance, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(NavVersions, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenLangs_NavScreenLangs, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreenDivider, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SocialLinks */.RP, {})
        ]
    });
    const { isScreenOpen, toggleScreen } = useNavScreen();
    const { handleMouseEnter, handleMouseLeave, hoverGroup } = (0,theme_0/* .useHoverGroup */._2)({
        position: 'right',
        customChildren: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "rp-nav-menu__others-mobile__container",
            children: items
        })
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            isScreenOpen && /*#__PURE__*/ (0,react_dom.createPortal)(/*#__PURE__*/ (0,jsx_runtime.jsx)(NavScreen_NavScreen, {
                beforeLeftNavItems: props.beforeLeftNavItems,
                afterLeftNavItems: props.afterLeftNavItems,
                beforeRightNavItems: props.beforeRightNavItems,
                afterRightNavItems: props.afterRightNavItems,
                isScreenOpen: isScreenOpen,
                toggleScreen: toggleScreen
            }), document.getElementById('__rspress_modal_container')),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                onClick: toggleScreen,
                "aria-label": "mobile hamburger",
                className: dist_clsx('rp-nav-hamburger', 'rp-nav-hamburger__sm', {
                    'rp-nav-hamburger--active': isScreenOpen
                }),
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: theme_0/* .IconSmallMenu */.kv,
                    width: 20,
                    height: 20
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
                "aria-label": "mobile hamburger",
                className: dist_clsx('rp-nav-hamburger', 'rp-nav-hamburger__md', {
                    'rp-nav-hamburger--active': isScreenOpen
                }),
                onClick: handleMouseEnter,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                        icon: theme_0/* .IconSmallMenu */.kv
                    }),
                    hoverGroup
                ]
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavTitle/index.css
var NavTitle = __webpack_require__("HA");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/NavTitle/index.js





const NavTitle_NavTitle = ()=>{
    const { site } = (0,useSite/* .useSite */.Z)();
    const lang = useLang();
    const themeConfig = site?.themeConfig ?? {};
    const defaultLang = site.lang ?? '';
    const locales = themeConfig?.locales;
    const localeInfo = locales?.find((locale)=>locale.lang === lang);
    const title = (localeInfo?.title ?? site.title) || 'Home';
    const langRoutePrefix = lang === defaultLang ? '/' : (0,dist/* .addTrailingSlash */.hg)(lang);
    const { logo: rawLogo, logoText, logoHref } = site;
    const alt = logoText ? '' : title;
    const logo = (0,react.useMemo)(()=>{
        if (!rawLogo) return null;
        if ('string' == typeof rawLogo) return /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
            src: (0,utils/* .normalizeImagePath */.As)(rawLogo),
            alt: alt,
            id: "logo",
            className: "rspress-logo rp-nav__title__logo-image"
        });
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
                    src: (0,utils/* .normalizeImagePath */.As)(rawLogo.light),
                    alt: alt,
                    id: "logo",
                    width: rawLogo.width,
                    height: rawLogo.height,
                    className: "rspress-logo rp-nav__title__logo-image rp-nav__title__logo-image--light"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
                    src: (0,utils/* .normalizeImagePath */.As)(rawLogo.dark),
                    alt: alt,
                    width: rawLogo.width,
                    height: rawLogo.height,
                    className: "rspress-logo rp-nav__title__logo-image rp-nav__title__logo-image--dark"
                })
            ]
        });
    }, [
        rawLogo,
        alt
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "rp-nav__title",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(theme_0/* .Link */.N_, {
            href: logoHref || (0,dist/* .addLeadingSlash */.tb)(langRoutePrefix),
            className: "rp-nav__title__link",
            children: [
                logo && /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: "rp-nav__title__logo",
                    children: logo
                }),
                logoText && /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                    children: logoText
                }),
                !logo && !logoText && /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                    children: title
                })
            ]
        })
    });
};


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Outline/index.css
var Outline = __webpack_require__("qm");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Outline/ScrollToTop.js



function ScrollToTop() {
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const t = useI18n();
    const [, scrollTop] = (0,theme_0/* .useReadPercent */.dS)();
    if (scrollTop < 100) return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
        className: "rp-outline__action-row rp-scroll-to-top",
        onClick: scrollToTop,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                icon: theme_0/* .IconScrollToTop */.HO,
                width: "16",
                height: "16"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                children: t('scrollToTopText')
            })
        ]
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Outline/index.js





function Outline_Outline() {
    const t = useI18n();
    const { site: { themeConfig: { enableScrollToTop = true, llmsUI } } } = (0,useSite/* .useSite */.Z)();
    const placement = 'object' == typeof llmsUI ? llmsUI?.placement ?? 'title' : 'title';
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "rp-outline",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-outline__title",
                children: [
                    t('outlineTitle'),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .ReadPercent */.a9, {
                        size: 14,
                        strokeWidth: 2
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("nav", {
                className: "rp-outline__toc rp-scrollbar",
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Toc */.vN, {})
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-outline__divider"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-outline__bottom",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .EditLink */.Lp, {
                        isOutline: true
                    }),
                     true && 'outline' === placement && /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .LlmsCopyRow */.KG, {}),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .LlmsOpenRow */.vw, {})
                        ]
                    }),
                    enableScrollToTop && /*#__PURE__*/ (0,jsx_runtime.jsx)(ScrollToTop, {})
                ]
            })
        ]
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useActiveMatcher.js



const useActiveMatcher = ()=>{
    const { pathname: rawPathname } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const activeMatcher = (0,react.useCallback)((link)=>{
        const pathname = decodeURIComponent(rawPathname);
        return (0,runtime_route/* .isActive */.$m)(link, pathname);
    }, [
        rawPathname
    ]);
    return activeMatcher;
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useSidebar.js





const getSidebarDataGroup = (sidebar, currentPathname)=>{
    const navRoutes = Object.keys(sidebar).sort((a, b)=>b.length - a.length);
    for (const name of navRoutes)if ((0,dist/* .matchSidebar */.CR)(name, currentPathname)) {
        const sidebarGroup = sidebar[name];
        return sidebarGroup;
    }
    return [];
};
function useSidebar() {
    const { sidebar } = useLocaleSiteData();
    const { pathname: rawPathname } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const pathname = decodeURIComponent(rawPathname);
    const sidebarData = (0,react.useMemo)(()=>getSidebarDataGroup(sidebar, pathname), [
        sidebar,
        pathname
    ]);
    return sidebarData;
}
function createInitialSidebar(rawSidebarData, activeMatcher) {
    const matchCache = new WeakMap();
    const match = (item)=>{
        if (matchCache.has(item)) return matchCache.get(item);
        if ('link' in item && item.link && activeMatcher(item.link)) {
            matchCache.set(item, true);
            return true;
        }
        if ('items' in item) {
            const result = item.items.some((child)=>match(child));
            if (result) {
                matchCache.set(item, true);
                return true;
            }
        }
        matchCache.set(item, false);
        return false;
    };
    const traverse = (item)=>{
        if ('items' in item) {
            item.items.forEach(traverse);
            if (match(item)) item.collapsed = false;
        }
    };
    const newSidebarData = rawSidebarData.filter(Boolean).flat();
    newSidebarData.forEach(traverse);
    return newSidebarData;
}
function useSidebarDynamic() {
    const rawSidebarData = useSidebar();
    const activeMatcher = useActiveMatcher();
    const [sidebar, setSidebar] = (0,react.useState)(()=>createInitialSidebar(structuredClone(rawSidebarData), activeMatcher));
    (0,react.useLayoutEffect)(()=>{
        setSidebar(createInitialSidebar(rawSidebarData, activeMatcher));
    }, [
        activeMatcher,
        rawSidebarData
    ]);
    return [
        sidebar,
        setSidebar
    ];
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Sidebar/utils.js
const isSidebarDivider = (item)=>'dividerType' in item;
const isSidebarSingleFile = (item)=>!('items' in item) && 'link' in item;
const isSidebarSectionHeader = (item)=>'sectionHeaderText' in item;
const isSidebarGroup = (item)=>'items' in item && Array.isArray(item.items);


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Overview/index.css
var Overview = __webpack_require__("S");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Overview/utils.js


function removeIndex(link) {
    return (0,dist/* .normalizeHref */.Tj)(link, true);
}
function findItemByRoutePath(items, routePath) {
    function isRoutePathMatch(item) {
        if (isSidebarDivider(item)) return false;
        if (isSidebarSectionHeader(item)) return false;
        const removeIndexUrl = removeIndex(item.link || '/');
        const removeBackSlashedRoutePath = routePath.replace(/\/$/, '');
        return removeIndexUrl === routePath || removeIndexUrl === removeBackSlashedRoutePath;
    }
    const matchRoutePathItemIndex = items.findIndex((item)=>isRoutePathMatch(item));
    if (-1 === matchRoutePathItemIndex) return items.map((item)=>{
        if (!('items' in item)) return [];
        return findItemByRoutePath(item.items, routePath);
    }).flat();
    const matchRoutePathItem = items[matchRoutePathItemIndex];
    const isArray = (i)=>Array.isArray(i) && i.length >= 1;
    if ('items' in matchRoutePathItem && isArray(matchRoutePathItem.items)) {
        if (matchRoutePathItem.items.every((item)=>!('items' in item))) return [
            matchRoutePathItem
        ];
        return matchRoutePathItem.items.filter((item)=>!isSidebarDivider(item));
    }
    const result = [
        ...items
    ];
    if (!('items' in matchRoutePathItem)) result.splice(matchRoutePathItemIndex, 1);
    const res = result.filter((item)=>!isSidebarDivider(item));
    return res;
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Overview/index.js







const normalizeText = (s)=>s.toLowerCase().replace(/-/g, ' ');
const matchesQuery = (text, query)=>normalizeText(text).includes(normalizeText(query));
const OverviewSearchInput = (param)=>{
    let { query, setQuery, searchRef } = param;
    const t = useI18n();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "rp-overview-search",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("label", {
                htmlFor: "api-filter",
                className: "rp-overview-search__label",
                children: t('overview.filterNameText')
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                ref: searchRef,
                type: "search",
                placeholder: t('overview.filterPlaceholderText'),
                id: "api-filter",
                value: query,
                onChange: (e)=>setQuery(e.target.value),
                className: "rp-overview-search__input"
            })
        ]
    });
};
function Overview_Overview(props) {
    const { siteData, page: { routePath, title, frontmatter } } = usePageData();
    const { content, groups: customGroups } = props;
    const t = useI18n();
    const [query, setQuery] = (0,react.useState)('');
    const searchRef = (0,react.useRef)(null);
    (0,react.useEffect)(()=>{
        if (true === frontmatter.overview) searchRef.current?.focus();
    }, []);
    const subFilter = (link)=>link.startsWith(routePath.replace(/overview$/, '')) && !(0,utils/* .isEqualPath */.Oy)(link, routePath);
    const getChildLink = (traverseItem)=>{
        if ('link' in traverseItem && traverseItem.link) return traverseItem.link;
        if ('items' in traverseItem) return getChildLink(traverseItem.items[0]);
        return '';
    };
    const { pages } = siteData;
    const overviewModules = pages.filter((page)=>subFilter(page.routePath));
    let overviewSidebarGroups = useSidebar();
    if (overviewSidebarGroups[0]?.link !== routePath) overviewSidebarGroups = findItemByRoutePath(overviewSidebarGroups, routePath);
    function normalizeSidebarItem(item, sidebarGroup, frontmatter) {
        if (isSidebarDivider(item)) return false;
        if (isSidebarSectionHeader(item)) return false;
        if (item.link === `${routePath}index` && frontmatter?.overview === true) return false;
        const overviewHeaders = props?.overviewHeaders ?? item.overviewHeaders ?? frontmatter?.overviewHeaders ?? sidebarGroup?.overviewHeaders ?? [
            2
        ];
        const pageModule = overviewModules.find((m)=>(0,utils/* .isEqualPath */.Oy)(m.routePath, item.link || ''));
        const link = getChildLink(item);
        return {
            text: item.text,
            link,
            headers: pageModule?.toc?.filter((header)=>overviewHeaders.some((depth)=>header.depth === depth)) || []
        };
    }
    const groups = customGroups ?? (0,react.useMemo)(()=>{
        const group = overviewSidebarGroups.filter((normalizedSidebarGroup)=>{
            const sidebarGroup = normalizedSidebarGroup;
            if (Array.isArray(sidebarGroup?.items)) return sidebarGroup.items.filter((item)=>subFilter(getChildLink(item))).length > 0;
            if (isSidebarSingleFile(sidebarGroup) && subFilter(getChildLink(sidebarGroup))) return true;
            return false;
        }).map((normalizedSidebarGroup)=>{
            const sidebarGroup = normalizedSidebarGroup;
            let items = [];
            if (sidebarGroup?.items) items = sidebarGroup?.items?.map((item)=>normalizeSidebarItem(item, sidebarGroup, frontmatter)).filter(Boolean);
            else if (isSidebarSingleFile(sidebarGroup)) items = [
                normalizeSidebarItem({
                    link: sidebarGroup.link,
                    text: sidebarGroup.text || '',
                    tag: sidebarGroup.tag,
                    _fileKey: sidebarGroup._fileKey,
                    overviewHeaders: sidebarGroup.overviewHeaders
                }, void 0, frontmatter)
            ];
            return {
                name: sidebarGroup.text || '',
                items
            };
        });
        return group;
    }, [
        overviewSidebarGroups,
        routePath,
        frontmatter
    ]);
    const filtered = (0,react.useMemo)(()=>{
        if (!query) return groups;
        return groups.map((group)=>{
            if (matchesQuery(group.name, query)) return group;
            const matchedItems = group.items.map((item)=>{
                if (matchesQuery(item.text || '', query)) return item;
                const matchedHeaders = item.headers?.filter((param)=>{
                    let { text } = param;
                    return matchesQuery(text, query);
                });
                return matchedHeaders?.length ? {
                    ...item,
                    headers: matchedHeaders
                } : null;
            }).filter(Boolean);
            return matchedItems.length ? {
                ...group,
                items: matchedItems
            } : null;
        }).filter(Boolean);
    }, [
        groups,
        query
    ]);
    const overviewTitle = title || 'Overview';
    if (false) {}
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "rspress-doc rp-doc rspress-overview rp-overview",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .FallbackHeading */.x5, {
                level: 1,
                title: overviewTitle
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(OverviewSearchInput, {
                query: query,
                setQuery: setQuery,
                searchRef: searchRef
            }),
            content,
            filtered.length > 0 ? filtered.map((group)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .OverviewGroup */.v7, {
                    group: group
                }, group?.name)) : /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-overview__empty",
                children: `${t('overview.filterNoResultText')}: ${query}`
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/OverviewGroup/index.css
var OverviewGroup = __webpack_require__("VP");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/OverviewGroup/icons/plugin.js


const SvgPlugin = (props)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 106,
        height: 102,
        fill: "none",
        viewBox: "0 0 106 102",
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
            fill: "currentColor",
            fillOpacity: 0.05,
            d: "M131.722 7.637 124.908.822a1.26 1.26 0 0 0-.916-.37c-.338 0-.659.13-.916.37l-12.231 12.23A32.03 32.03 0 0 0 92.829 7.54c-8.228 0-16.457 3.134-22.741 9.418L53.711 33.335a1.29 1.29 0 0 0 0 1.816l43.666 43.666c.258.257.579.37.916.37.322 0 .66-.129.916-.37l16.377-16.377c11.073-11.09 12.375-28.237 3.906-40.74l12.23-12.231a1.31 1.31 0 0 0 0-1.832m-54.45 63.948a1.29 1.29 0 0 0-1.816 0L64.752 82.288 50.24 67.776l10.72-10.72a1.29 1.29 0 0 0 0-1.816l-5.85-5.85a1.29 1.29 0 0 0-1.817 0l-10.72 10.72-6.91-6.91a1.26 1.26 0 0 0-.916-.37 1.36 1.36 0 0 0-.916.37L17.47 69.575C6.396 80.649 5.094 97.813 13.564 110.317l-12.23 12.23a1.29 1.29 0 0 0 0 1.816l6.814 6.815c.257.257.578.369.916.369.337 0 .659-.128.916-.369l12.23-12.231c5.416 3.681 11.716 5.513 18.016 5.513 8.229 0 16.457-3.134 22.741-9.418l16.377-16.377a1.29 1.29 0 0 0 0-1.816l-6.91-6.91 10.72-10.72a1.29 1.29 0 0 0 0-1.816z"
        })
    });
var icons_plugin = SvgPlugin;
/* export default */ var OverviewGroup_icons_plugin = (icons_plugin);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/OverviewGroup/index.js






function OverviewGroupMarkdown(param) {
    let { group } = param;
    const lines = [];
    if (group.name) {
        lines.push(`## ${group.name}`);
        lines.push('');
    }
    for (const item of group.items){
        const itemTitle = item.link ? `[${item.text}](${routePathToMdPath(item.link)})` : `**${item.text}**`;
        lines.push(`### ${itemTitle}`);
        lines.push('');
        if (item.headers && item.headers.length > 0) {
            for (const header of item.headers){
                const headerLink = item.link ? `[${header.text}](${routePathToMdPath(item.link)}#${header.id})` : header.text;
                lines.push(`- ${headerLink}`);
            }
            lines.push('');
        }
        if (item.items && item.items.length > 0) {
            for (const subItem of item.items){
                const subItemLink = subItem.link ? `[${subItem.text}](${routePathToMdPath(subItem.link)})` : subItem.text;
                lines.push(`- ${subItemLink}`);
            }
            lines.push('');
        }
    }
    return /*#__PURE__*/ jsx(Fragment, {
        children: lines.join('\n')
    });
}
const OverviewGroup_OverviewGroup = (param)=>{
    let { group } = param;
    if (false) {}
    const { itemsWithContent, itemsWithoutContent } = (0,react.useMemo)(()=>{
        const itemsWithContent = group.items.filter((item)=>item.headers && item.headers.length > 0 || item.items && item.items.length > 0);
        const itemsWithoutContent = group.items.filter((item)=>!(item.headers && item.headers.length > 0) && !(item.items && item.items.length > 0));
        return {
            itemsWithContent,
            itemsWithoutContent
        };
    }, [
        group
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .FallbackHeading */.x5, {
                level: 2,
                title: group.name
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-overview-group rp-not-doc",
                children: [
                    itemsWithContent.map((item)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "rp-overview-group__item",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: "rp-overview-group__item__title",
                                    children: [
                                        item.link ? /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Link */.N_, {
                                            href: item.link,
                                            className: "rp-overview-group__item__title__link",
                                            ...(0,theme_0/* .renderInlineMarkdown */.nl)(item.text)
                                        }) : /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                            className: "rp-overview-group__item__title__text",
                                            ...(0,theme_0/* .renderInlineMarkdown */.nl)(item.text)
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                                            icon: OverviewGroup_icons_plugin,
                                            className: "rp-overview-group__item__title__icon"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                                    className: "rp-overview-group__item__content",
                                    children: [
                                        item.headers?.map((header)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                                className: "rp-overview-group__item__content__item",
                                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Link */.N_, {
                                                    className: "rp-overview-group__item__content__item__link",
                                                    href: `${item.link}#${header.id}`,
                                                    ...(0,theme_0/* .renderInlineMarkdown */.nl)(header.text)
                                                })
                                            }, header.id)),
                                        item.items?.map((param)=>{
                                            let { link, text } = param;
                                            return /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                                className: "rp-overview-group__item__content__item",
                                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Link */.N_, {
                                                    className: "rp-overview-group__item__content__item__link",
                                                    href: link,
                                                    ...(0,theme_0/* .renderInlineMarkdown */.nl)(text)
                                                })
                                            }, link);
                                        })
                                    ]
                                })
                            ]
                        }, item.link)),
                    itemsWithoutContent.length > 0 && /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "rp-overview-group__grid",
                        children: itemsWithoutContent.map((item)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                className: "rp-overview-group__grid-item rp-overview-group__item__title",
                                children: item.link ? /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Link */.N_, {
                                    href: item.link,
                                    className: "rp-overview-group__item__title__link",
                                    ...(0,theme_0/* .renderInlineMarkdown */.nl)(item.text)
                                }) : /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                    className: "rp-overview-group__item__title__text",
                                    ...(0,theme_0/* .renderInlineMarkdown */.nl)(item.text)
                                })
                            }, item.link))
                    })
                ]
            })
        ]
    });
};


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/PackageManagerTabs/index.js
var PackageManagerTabs = __webpack_require__("BO");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/PrevNextPage/index.css
var PrevNextPage = __webpack_require__("av");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/PrevNextPage/index.js





function PrevNextPage_PrevNextPage() {
    const { prevPage, nextPage } = (0,theme_0/* .usePrevNextPage */.ZZ)();
    const t = useI18n();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "rp-prev-next-page",
        children: [
            prevPage ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(theme_0/* .Link */.N_, {
                href: prevPage.link,
                className: dist_clsx('rp-prev-next-page__item', 'rp-prev-next-page__prev'),
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                        className: "rp-prev-next-page__item__desc",
                        children: t('prevPageText')
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                        className: "rp-prev-next-page__item__title",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                                icon: theme_0/* .IconArrowRight */.hI,
                                className: "rp-prev-next-page__icon rp-prev-next-page__rotate_180"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                ...(0,theme_0/* .renderInlineMarkdown */.nl)(prevPage.text)
                            })
                        ]
                    })
                ]
            }) : /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-prev-next-page__placeholder"
            }),
            nextPage ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(theme_0/* .Link */.N_, {
                href: nextPage.link,
                className: dist_clsx('rp-prev-next-page__item', 'rp-prev-next-page__next'),
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                        className: "rp-prev-next-page__item__desc",
                        children: t('nextPageText')
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                        className: "rp-prev-next-page__item__title",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                ...(0,theme_0/* .renderInlineMarkdown */.nl)(nextPage.text)
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                                icon: theme_0/* .IconArrowRight */.hI,
                                className: "rp-prev-next-page__icon"
                            })
                        ]
                    })
                ]
            }) : /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-prev-next-page__placeholder"
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/ReadPercent/index.css
var ReadPercent = __webpack_require__("BJ");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/ReadPercent/ProgressCircle.js



const ProgressCircle = (param)=>{
    let { percent, size = 100, strokeWidth = 8, strokeColor = 'var(--rp-c-brand)', backgroundColor = 'var(--rp-c-divider-light)', className } = param;
    const normalizedPercent = Math.min(100, Math.max(0, percent));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * radius * Math.PI;
    const offset = circumference - normalizedPercent / 100 * circumference;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        width: size,
        height: size,
        className: dist_clsx('rp-progress-circle', className),
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("circle", {
                cx: size / 2,
                cy: size / 2,
                r: radius,
                strokeLinecap: "round",
                fill: "none",
                stroke: backgroundColor,
                strokeWidth: strokeWidth
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("circle", {
                cx: size / 2,
                cy: size / 2,
                r: radius,
                strokeLinecap: "round",
                fill: "none",
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                transform: `rotate(-90 ${size / 2} ${size / 2})`,
                style: {
                    transition: 'stroke-dashoffset 0.3s'
                }
            })
        ]
    });
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useWindowSize.js

const RESIZE_DEBOUNCE_MS = 150;
function useWindowSize(initialWidth, initialHeight) {
    const [size, setSize] = (0,react.useState)({
        width: initialWidth ?? 1 / 0,
        height: initialHeight ?? 1 / 0
    });
    (0,react.useLayoutEffect)(()=>{
        let timeoutId = null;
        const handleResize = ()=>{
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(()=>{
                setSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }, RESIZE_DEBOUNCE_MS);
        };
        setSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
        window.addEventListener('resize', handleResize);
        return ()=>{
            if (timeoutId) clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return size;
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/ReadPercent/useReadPercent.js


const useReadPercent = ()=>{
    const [scrollTop, setScrollTop] = (0,react.useState)(0);
    const [h, setH] = (0,react.useState)(0);
    const { height } = useWindowSize();
    (0,react.useEffect)(()=>{
        const scrollElement = window || document.documentElement;
        const handler = ()=>{
            const dom = document.querySelector('.rspress-doc');
            if (dom) {
                const a = dom.getBoundingClientRect();
                setH(a.height || 0);
            }
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setScrollTop(scrollTop);
        };
        handler();
        scrollElement?.addEventListener('scroll', handler);
        return ()=>{
            scrollElement?.removeEventListener('scroll', handler);
        };
    }, []);
    const readPercent = (0,react.useMemo)(()=>{
        const deltaHeight = Math.min(scrollTop, height);
        return Math.floor(Math.min(Math.max(0, (scrollTop - 50 + deltaHeight) / h * 100), 100)) || 0;
    }, [
        h,
        scrollTop,
        height
    ]);
    return [
        readPercent,
        scrollTop
    ];
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/ReadPercent/index.js



function ReadPercent_ReadPercent(param) {
    let { size, strokeWidth } = param;
    const [readPercent] = useReadPercent();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(ProgressCircle, {
        percent: readPercent,
        size: size,
        strokeWidth: strokeWidth
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Root/index.js

function Root(param) {
    let { children } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: children
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/index.js




function Search() {
    const [focused, setFocused] = (0,react.useState)(false);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SearchButton */.vd, {
                setFocused: setFocused
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(NoSSR/* .NoSSR */.O, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SearchPanel */.Pl, {
                    focused: focused,
                    setFocused: setFocused
                })
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/SearchButton.css
var SearchButton = __webpack_require__("m");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/SearchButton.js





function SearchButton_SearchButton(param) {
    let { setFocused } = param;
    const [metaKey, setMetaKey] = (0,react.useState)(null);
    const t = useI18n();
    (0,react.useEffect)(()=>{
        setMetaKey(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl');
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
                className: "rp-search-button",
                onClick: ()=>setFocused(true),
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "rp-search-button__content",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                                icon: theme_0/* .IconSearch */.C0,
                                className: "rp-search-button__icon"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                className: "rp-search-button__word",
                                children: t('searchPlaceholderText')
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "rp-search-button__hotkey",
                        style: {
                            opacity: metaKey ? 1 : 0
                        },
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                children: metaKey
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                children: "K"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-search-button--mobile",
                onClick: ()=>setFocused(true),
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                    icon: theme_0/* .IconSearch */.C0
                })
            })
        ]
    });
}


// EXTERNAL MODULE: ./.rspress/runtime/virtual-search-hooks.js
var virtual_search_hooks = __webpack_require__("T");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useSearchHooks.js


const useSearchHooks_store = (0,createExternalStore/* .createExternalStore */.f)({
    ...virtual_search_hooks
});
function useSearchHooks() {
    return useSearchHooks_store.useValue();
}
if (false) {}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/logic/types.js
var types_RenderType = /*#__PURE__*/ function(RenderType) {
    RenderType["Default"] = "default";
    RenderType["Custom"] = "custom";
    return RenderType;
}({});


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/NoSearchResult.css
var NoSearchResult = __webpack_require__("Uf");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/NoSearchResult.js




function NoSearchResult_NoSearchResult(param) {
    let { query } = param;
    const t = useI18n();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "rp-no-search-result",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                icon: theme_0/* .IconEmpty */.Fw,
                className: "rp-no-search-result__icon"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                className: "rp-no-search-result__text",
                children: [
                    t('searchNoResultsText'),
                    " ",
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("b", {
                        children: [
                            '"',
                            query,
                            '"'
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                className: "rp-no-search-result__suggestion",
                children: t('searchSuggestedQueryText')
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/SearchPanel.css
var SearchPanel = __webpack_require__("CX");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/SuggestItem.css
var SuggestItem = __webpack_require__("c1");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/logic/util.js
const MAX_TITLE_LENGTH = 20;
const jRegex = /[\u3040-\u309f\u30a0-\u30ff\u31f0-\u31ff]/u;
const kRegex = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/u;
const cyrillicRegex = /[\u0400-\u04FF]/u;
function backTrackHeaders(rawHeaders, index) {
    let current = rawHeaders[index];
    let currentIndex = index;
    const res = [
        current
    ];
    while(current && current.depth > 2){
        let matchedParent = false;
        for(let i = currentIndex - 1; i >= 0; i--){
            const header = rawHeaders[i];
            if (header.depth > 1 && header.depth === current.depth - 1) {
                current = header;
                currentIndex = i;
                res.unshift(current);
                matchedParent = true;
                break;
            }
        }
        if (!matchedParent) break;
    }
    return res;
}
function formatText(text) {
    return text.length > MAX_TITLE_LENGTH ? `${text.slice(0, MAX_TITLE_LENGTH)}...` : text;
}
function normalizeTextCase(text) {
    const textNormalized = text.toString().toLowerCase().normalize('NFD');
    if (cyrillicRegex.test(String(text))) return textNormalized.normalize('NFC');
    const resultWithoutAccents = textNormalized.replace(/[\u0300-\u036f]/g, '');
    if (jRegex.test(String(text)) || kRegex.test(String(text))) return resultWithoutAccents.normalize('NFC');
    return resultWithoutAccents;
}
function removeDomain(url) {
    return url.replace(/https?:\/\/[^/]+/, '');
}
function getCharByteCount(char) {
    const charCode = char.charCodeAt(0);
    if (charCode > 255) return 3;
    return 1;
}
function substrByBytes(str, start, len) {
    let resultStr = '';
    let bytesCount = 0;
    const strLength = str.length;
    for(let i = 0; i < strLength; i++){
        bytesCount += getCharByteCount(str.charAt(i));
        if (bytesCount > start + len) break;
        if (bytesCount > start) resultStr += str.charAt(i);
    }
    return resultStr;
}
function byteToCharIndex(str, byteIndex) {
    let charIndex = 0;
    let byteCount = 0;
    for(let i = 0; i < str.length; i++){
        if (byteCount >= byteIndex) break;
        byteCount += getCharByteCount(str.charAt(i));
        charIndex++;
    }
    return charIndex;
}
function getSlicedStrByByteLength(str, start, length) {
    const slicedStr = str.slice(start);
    return substrByBytes(slicedStr, 0, length);
}
function getStrByteLength(str) {
    let byteLength = 0;
    for(let i = 0; i < str.length; i++)byteLength += getCharByteCount(str.charAt(i));
    return byteLength;
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/SuggestItem.js





function SuggestItem_SuggestItem(param) {
    let { suggestion, closeSearch, isCurrent, setCurrentSuggestionIndex, scrollTo, onMouseMove } = param;
    const ICON_MAP = {
        title: theme_0/* .IconTitle */.Mk,
        header: theme_0/* .IconHeader */.D7,
        content: theme_0/* .IconFile */.g6
    };
    const HitIcon = ICON_MAP[suggestion.type];
    const selfRef = (0,react.useRef)(null);
    if (isCurrent && selfRef.current?.offsetTop) scrollTo(selfRef.current?.offsetTop, selfRef.current?.offsetHeight);
    const getHighlightedFragments = (rawText, highlights)=>{
        const fragmentList = [];
        let lastIndex = 0;
        for (const highlightInfo of highlights){
            const { start, length } = highlightInfo;
            const prefix = rawText.slice(lastIndex, start);
            const queryStr = getSlicedStrByByteLength(rawText, start, length);
            fragmentList.push(prefix);
            fragmentList.push(/*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                className: "rp-suggest-item__mark",
                children: queryStr
            }, start));
            lastIndex = start + queryStr.length;
        }
        if (lastIndex < rawText.length) fragmentList.push(rawText.slice(lastIndex));
        return fragmentList;
    };
    const renderHeaderMatch = ()=>{
        if ('header' === suggestion.type || 'title' === suggestion.type) {
            const { header, highlightInfoList } = suggestion;
            return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-suggest-item__header",
                children: getHighlightedFragments(header, highlightInfoList)
            });
        }
        return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "rp-suggest-item__header",
            children: suggestion.header
        });
    };
    const renderStatementMatch = ()=>{
        if ('content' !== suggestion.type) return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {});
        const { statement, highlightInfoList } = suggestion;
        return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "rp-suggest-item__statement",
            children: getHighlightedFragments(statement, highlightInfoList)
        });
    };
    let hitContent = null;
    switch(suggestion.type){
        case 'title':
        case 'header':
            hitContent = renderHeaderMatch();
            break;
        case 'content':
            hitContent = /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                children: [
                    renderStatementMatch(),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "rp-suggest-item__title",
                        children: suggestion.title
                    })
                ]
            });
            break;
        default:
            break;
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
        className: `rp-suggest-item ${isCurrent ? 'rp-suggest-item--current' : ''}`,
        onMouseEnter: setCurrentSuggestionIndex,
        onMouseMove: onMouseMove,
        ref: selfRef,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Link */.N_, {
            href: suggestion.link,
            className: "rp-suggest-item__link",
            onClick: (e)=>{
                closeSearch();
                e.stopPropagation();
            },
            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-suggest-item__container",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "rp-suggest-item__icon",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                            icon: HitIcon
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "rp-suggest-item__content",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                            children: hitContent
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "rp-suggest-item__action-icon",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                            icon: theme_0/* .IconJump */.uO
                        })
                    })
                ]
            })
        })
    }, suggestion.link);
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useWebMcp.js

const useCommittedEffect = "u" < typeof window ? react.useEffect : react.useLayoutEffect;
const toError = (error)=>error instanceof Error ? error : new Error(String(error));
function useWebMcp(options) {
    const { execute, enabled = true, exposedTo, ...descriptor } = options;
    const current = (0,react.useRef)(execute);
    useCommittedEffect(()=>{
        current.current = execute;
    });
    let key = '';
    let preparationError = null;
    try {
        key = JSON.stringify({
            descriptor,
            exposedTo
        });
    } catch (error) {
        preparationError = toError(error);
    }
    const preparationMessage = preparationError?.message;
    const [state, setState] = (0,react.useState)({
        supported: false,
        registered: false,
        error: null
    });
    (0,react.useEffect)(()=>{
        const context = "u" < typeof document ? void 0 : document.modelContext;
        const supported = 'function' == typeof context?.registerTool;
        if (!supported || !enabled || void 0 !== preparationMessage) return void setState({
            supported,
            registered: false,
            error: void 0 === preparationMessage ? null : new Error(preparationMessage)
        });
        const controller = new AbortController();
        const metadata = JSON.parse(key);
        setState({
            supported: true,
            registered: false,
            error: null
        });
        const failed = (error)=>{
            if (controller.signal.aborted) return;
            controller.abort();
            setState({
                supported: true,
                registered: false,
                error: toError(error)
            });
            console.error(`[Rspress] Failed to register ${metadata.descriptor.name}:`, error);
        };
        try {
            const registration = context.registerTool({
                ...metadata.descriptor,
                execute: (input, executionOptions)=>{
                    executionOptions?.signal?.throwIfAborted();
                    return current.current(input, executionOptions ?? {});
                }
            }, {
                signal: controller.signal,
                exposedTo: metadata.exposedTo
            });
            Promise.resolve(registration).then(()=>{
                if (!controller.signal.aborted) setState({
                    supported: true,
                    registered: true,
                    error: null
                });
            }, failed);
        } catch (error) {
            failed(error);
        }
        return ()=>controller.abort();
    }, [
        key,
        enabled,
        preparationMessage
    ]);
    return state;
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+shared@2.1.3/node_modules/@rspress/shared/dist/4.js
function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
}
const _listCacheClear = listCacheClear;
function eq(value, other) {
    return value === other || value !== value && other !== other;
}
const lodash_es_eq = eq;
function assocIndexOf(array, key) {
    var length = array.length;
    while(length--)if (lodash_es_eq(array[length][0], key)) return length;
    return -1;
}
const _assocIndexOf = assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
    var data = this.__data__, index = _assocIndexOf(data, key);
    if (index < 0) return false;
    var lastIndex = data.length - 1;
    if (index == lastIndex) data.pop();
    else splice.call(data, index, 1);
    --this.size;
    return true;
}
const _listCacheDelete = listCacheDelete;
function listCacheGet(key) {
    var data = this.__data__, index = _assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
}
const _listCacheGet = listCacheGet;
function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
}
const _listCacheHas = listCacheHas;
function listCacheSet(key, value) {
    var data = this.__data__, index = _assocIndexOf(data, key);
    if (index < 0) {
        ++this.size;
        data.push([
            key,
            value
        ]);
    } else data[index][1] = value;
    return this;
}
const _listCacheSet = listCacheSet;
function ListCache(entries) {
    var index = -1, length = null == entries ? 0 : entries.length;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;
const _ListCache = ListCache;
function stackClear() {
    this.__data__ = new _ListCache;
    this.size = 0;
}
const _stackClear = stackClear;
function stackDelete(key) {
    var data = this.__data__, result = data['delete'](key);
    this.size = data.size;
    return result;
}
const _stackDelete = stackDelete;
function stackGet(key) {
    return this.__data__.get(key);
}
const _stackGet = stackGet;
function stackHas(key) {
    return this.__data__.has(key);
}
const _stackHas = stackHas;
var freeGlobal = 'object' == typeof global && global && global.Object === Object && global;
const _freeGlobal = freeGlobal;
var freeSelf = 'object' == typeof self && self && self.Object === Object && self;
var _4_root = _freeGlobal || freeSelf || Function('return this')();
const _root = _4_root;
var Symbol = _root.Symbol;
const _Symbol = Symbol;
var objectProto = Object.prototype;
var _getRawTag_hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = _Symbol ? _Symbol.toStringTag : void 0;
function getRawTag(value) {
    var isOwn = _getRawTag_hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
        value[symToStringTag] = void 0;
        var unmasked = true;
    } catch (e) {}
    var result = nativeObjectToString.call(value);
    if (unmasked) if (isOwn) value[symToStringTag] = tag;
    else delete value[symToStringTag];
    return result;
}
const _getRawTag = getRawTag;
var _objectToString_objectProto = Object.prototype;
var _objectToString_nativeObjectToString = _objectToString_objectProto.toString;
function objectToString(value) {
    return _objectToString_nativeObjectToString.call(value);
}
const _objectToString = objectToString;
var nullTag = '[object Null]', undefinedTag = '[object Undefined]';
var _baseGetTag_symToStringTag = _Symbol ? _Symbol.toStringTag : void 0;
function baseGetTag(value) {
    if (null == value) return void 0 === value ? undefinedTag : nullTag;
    return _baseGetTag_symToStringTag && _baseGetTag_symToStringTag in Object(value) ? _getRawTag(value) : _objectToString(value);
}
const _baseGetTag = baseGetTag;
function isObject(value) {
    var type = typeof value;
    return null != value && ('object' == type || 'function' == type);
}
const lodash_es_isObject = isObject;
var asyncTag = '[object AsyncFunction]', funcTag = '[object Function]', genTag = '[object GeneratorFunction]', proxyTag = '[object Proxy]';
function isFunction(value) {
    if (!lodash_es_isObject(value)) return false;
    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
const lodash_es_isFunction = isFunction;
var coreJsData = _root["__core-js_shared__"];
const _coreJsData = coreJsData;
var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
}();
function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
}
const _isMasked = isMasked;
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
    if (null != func) {
        try {
            return funcToString.call(func);
        } catch (e) {}
        try {
            return func + '';
        } catch (e) {}
    }
    return '';
}
const _toSource = toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var _baseIsNative_funcProto = Function.prototype, _baseIsNative_objectProto = Object.prototype;
var _baseIsNative_funcToString = _baseIsNative_funcProto.toString;
var _baseIsNative_hasOwnProperty = _baseIsNative_objectProto.hasOwnProperty;
var reIsNative = RegExp('^' + _baseIsNative_funcToString.call(_baseIsNative_hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
function baseIsNative(value) {
    if (!lodash_es_isObject(value) || _isMasked(value)) return false;
    var pattern = lodash_es_isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
}
const _baseIsNative = baseIsNative;
function getValue(object, key) {
    return null == object ? void 0 : object[key];
}
const _getValue = getValue;
function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : void 0;
}
const _getNative = getNative;
var _4_Map = _getNative(_root, 'Map');
const _Map = _4_Map;
var nativeCreate = _getNative(Object, 'create');
const _nativeCreate = nativeCreate;
function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
}
const _hashClear = hashClear;
function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
}
const _hashDelete = hashDelete;
var HASH_UNDEFINED = '__lodash_hash_undefined__';
var _hashGet_objectProto = Object.prototype;
var _hashGet_hasOwnProperty = _hashGet_objectProto.hasOwnProperty;
function hashGet(key) {
    var data = this.__data__;
    if (_nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
    }
    return _hashGet_hasOwnProperty.call(data, key) ? data[key] : void 0;
}
const _hashGet = hashGet;
var _hashHas_objectProto = Object.prototype;
var _hashHas_hasOwnProperty = _hashHas_objectProto.hasOwnProperty;
function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? void 0 !== data[key] : _hashHas_hasOwnProperty.call(data, key);
}
const _hashHas = hashHas;
var _hashSet_HASH_UNDEFINED = '__lodash_hash_undefined__';
function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = _nativeCreate && void 0 === value ? _hashSet_HASH_UNDEFINED : value;
    return this;
}
const _hashSet = hashSet;
function Hash(entries) {
    var index = -1, length = null == entries ? 0 : entries.length;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;
const _Hash = Hash;
function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
        hash: new _Hash,
        map: new (_Map || _ListCache),
        string: new _Hash
    };
}
const _mapCacheClear = mapCacheClear;
function isKeyable(value) {
    var type = typeof value;
    return 'string' == type || 'number' == type || 'symbol' == type || 'boolean' == type ? '__proto__' !== value : null === value;
}
const _isKeyable = isKeyable;
function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key) ? data['string' == typeof key ? 'string' : 'hash'] : data.map;
}
const _getMapData = getMapData;
function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
}
const _mapCacheDelete = mapCacheDelete;
function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
}
const _mapCacheGet = mapCacheGet;
function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
}
const _mapCacheHas = mapCacheHas;
function mapCacheSet(key, value) {
    var data = _getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
}
const _mapCacheSet = mapCacheSet;
function MapCache(entries) {
    var index = -1, length = null == entries ? 0 : entries.length;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;
const _MapCache = MapCache;
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof _ListCache) {
        var pairs = data.__data__;
        if (!_Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([
                key,
                value
            ]);
            this.size = ++data.size;
            return this;
        }
        data = this.__data__ = new _MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
}
const _stackSet = stackSet;
function Stack(entries) {
    var data = this.__data__ = new _ListCache(entries);
    this.size = data.size;
}
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;
const _Stack = Stack;
var defineProperty = function() {
    try {
        var func = _getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
    } catch (e) {}
}();
const _defineProperty = defineProperty;
function baseAssignValue(object, key, value) {
    if ('__proto__' == key && _defineProperty) _defineProperty(object, key, {
        configurable: true,
        enumerable: true,
        value: value,
        writable: true
    });
    else object[key] = value;
}
const _baseAssignValue = baseAssignValue;
function assignMergeValue(object, key, value) {
    if (void 0 !== value && !lodash_es_eq(object[key], value) || void 0 === value && !(key in object)) _baseAssignValue(object, key, value);
}
const _assignMergeValue = assignMergeValue;
function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while(length--){
            var key = props[fromRight ? length : ++index];
            if (false === iteratee(iterable[key], key, iterable)) break;
        }
        return object;
    };
}
const _createBaseFor = createBaseFor;
var baseFor = _createBaseFor();
const _baseFor = baseFor;
var freeExports = 'object' == typeof exports && exports && !exports.nodeType && exports;
var freeModule = freeExports && 'object' == typeof module && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? _root.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
    if (isDeep) return buffer.slice();
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
}
const _cloneBuffer = cloneBuffer;
var Uint8Array = _root.Uint8Array;
const _Uint8Array = Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
    return result;
}
const _cloneArrayBuffer = cloneArrayBuffer;
function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
const _cloneTypedArray = cloneTypedArray;
function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while(++index < length)array[index] = source[index];
    return array;
}
const _copyArray = copyArray;
var objectCreate = Object.create;
var baseCreate = function() {
    function object() {}
    return function(proto) {
        if (!lodash_es_isObject(proto)) return {};
        if (objectCreate) return objectCreate(proto);
        object.prototype = proto;
        var result = new object;
        object.prototype = void 0;
        return result;
    };
}();
const _baseCreate = baseCreate;
function overArg(func, transform) {
    return function(arg) {
        return func(transform(arg));
    };
}
const _overArg = overArg;
var getPrototype = _overArg(Object.getPrototypeOf, Object);
const _getPrototype = getPrototype;
var _isPrototype_objectProto = Object.prototype;
function isPrototype(value) {
    var Ctor = value && value.constructor, proto = 'function' == typeof Ctor && Ctor.prototype || _isPrototype_objectProto;
    return value === proto;
}
const _isPrototype = isPrototype;
function initCloneObject(object) {
    return 'function' != typeof object.constructor || _isPrototype(object) ? {} : _baseCreate(_getPrototype(object));
}
const _initCloneObject = initCloneObject;
function isObjectLike(value) {
    return null != value && 'object' == typeof value;
}
const lodash_es_isObjectLike = isObjectLike;
var argsTag = '[object Arguments]';
function baseIsArguments(value) {
    return lodash_es_isObjectLike(value) && _baseGetTag(value) == argsTag;
}
const _baseIsArguments = baseIsArguments;
var isArguments_objectProto = Object.prototype;
var isArguments_hasOwnProperty = isArguments_objectProto.hasOwnProperty;
var propertyIsEnumerable = isArguments_objectProto.propertyIsEnumerable;
var isArguments = _baseIsArguments(function() {
    return arguments;
}()) ? _baseIsArguments : function(value) {
    return lodash_es_isObjectLike(value) && isArguments_hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
const lodash_es_isArguments = isArguments;
var _4_isArray = Array.isArray;
const lodash_es_isArray = _4_isArray;
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
    return 'number' == typeof value && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
const lodash_es_isLength = isLength;
function isArrayLike(value) {
    return null != value && lodash_es_isLength(value.length) && !lodash_es_isFunction(value);
}
const lodash_es_isArrayLike = isArrayLike;
function isArrayLikeObject(value) {
    return lodash_es_isObjectLike(value) && lodash_es_isArrayLike(value);
}
const lodash_es_isArrayLikeObject = isArrayLikeObject;
function stubFalse() {
    return false;
}
const lodash_es_stubFalse = stubFalse;
var isBuffer_freeExports = 'object' == typeof exports && exports && !exports.nodeType && exports;
var isBuffer_freeModule = isBuffer_freeExports && 'object' == typeof module && module && !module.nodeType && module;
var isBuffer_moduleExports = isBuffer_freeModule && isBuffer_freeModule.exports === isBuffer_freeExports;
var isBuffer_Buffer = isBuffer_moduleExports ? _root.Buffer : void 0;
var nativeIsBuffer = isBuffer_Buffer ? isBuffer_Buffer.isBuffer : void 0;
var isBuffer = nativeIsBuffer || lodash_es_stubFalse;
const lodash_es_isBuffer = isBuffer;
var objectTag = '[object Object]';
var isPlainObject_funcProto = Function.prototype, isPlainObject_objectProto = Object.prototype;
var isPlainObject_funcToString = isPlainObject_funcProto.toString;
var isPlainObject_hasOwnProperty = isPlainObject_objectProto.hasOwnProperty;
var objectCtorString = isPlainObject_funcToString.call(Object);
function isPlainObject(value) {
    if (!lodash_es_isObjectLike(value) || _baseGetTag(value) != objectTag) return false;
    var proto = _getPrototype(value);
    if (null === proto) return true;
    var Ctor = isPlainObject_hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return 'function' == typeof Ctor && Ctor instanceof Ctor && isPlainObject_funcToString.call(Ctor) == objectCtorString;
}
const lodash_es_isPlainObject = isPlainObject;
var _baseIsTypedArray_argsTag = '[object Arguments]', arrayTag = '[object Array]', boolTag = '[object Boolean]', dateTag = '[object Date]', errorTag = '[object Error]', _baseIsTypedArray_funcTag = '[object Function]', mapTag = '[object Map]', numberTag = '[object Number]', _baseIsTypedArray_objectTag = '[object Object]', regexpTag = '[object RegExp]', setTag = '[object Set]', stringTag = '[object String]', weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]', dataViewTag = '[object DataView]', float32Tag = '[object Float32Array]', float64Tag = '[object Float64Array]', int8Tag = '[object Int8Array]', int16Tag = '[object Int16Array]', int32Tag = '[object Int32Array]', uint8Tag = '[object Uint8Array]', uint8ClampedTag = '[object Uint8ClampedArray]', uint16Tag = '[object Uint16Array]', uint32Tag = '[object Uint32Array]';
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[_baseIsTypedArray_argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[_baseIsTypedArray_funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[_baseIsTypedArray_objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
    return lodash_es_isObjectLike(value) && lodash_es_isLength(value.length) && !!typedArrayTags[_baseGetTag(value)];
}
const _baseIsTypedArray = baseIsTypedArray;
function baseUnary(func) {
    return function(value) {
        return func(value);
    };
}
const _baseUnary = baseUnary;
var _nodeUtil_freeExports = 'object' == typeof exports && exports && !exports.nodeType && exports;
var _nodeUtil_freeModule = _nodeUtil_freeExports && 'object' == typeof module && module && !module.nodeType && module;
var _nodeUtil_moduleExports = _nodeUtil_freeModule && _nodeUtil_freeModule.exports === _nodeUtil_freeExports;
var freeProcess = _nodeUtil_moduleExports && _freeGlobal.process;
var nodeUtil = function() {
    try {
        var types = _nodeUtil_freeModule && _nodeUtil_freeModule.require && _nodeUtil_freeModule.require('util').types;
        if (types) return types;
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
}();
const _nodeUtil = nodeUtil;
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
const lodash_es_isTypedArray = isTypedArray;
function safeGet(object, key) {
    if ('constructor' === key && 'function' == typeof object[key]) return;
    if ('__proto__' == key) return;
    return object[key];
}
const _safeGet = safeGet;
var _assignValue_objectProto = Object.prototype;
var _assignValue_hasOwnProperty = _assignValue_objectProto.hasOwnProperty;
function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(_assignValue_hasOwnProperty.call(object, key) && lodash_es_eq(objValue, value)) || void 0 === value && !(key in object)) _baseAssignValue(object, key, value);
}
const _assignValue = assignValue;
function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1, length = props.length;
    while(++index < length){
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        if (void 0 === newValue) newValue = source[key];
        if (isNew) _baseAssignValue(object, key, newValue);
        else _assignValue(object, key, newValue);
    }
    return object;
}
const _copyObject = copyObject;
function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while(++index < n)result[index] = iteratee(index);
    return result;
}
const _baseTimes = baseTimes;
var _isIndex_MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
    var type = typeof value;
    length = null == length ? _isIndex_MAX_SAFE_INTEGER : length;
    return !!length && ('number' == type || 'symbol' != type && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
const _isIndex = isIndex;
var _arrayLikeKeys_objectProto = Object.prototype;
var _arrayLikeKeys_hasOwnProperty = _arrayLikeKeys_objectProto.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
    var isArr = lodash_es_isArray(value), isArg = !isArr && lodash_es_isArguments(value), isBuff = !isArr && !isArg && lodash_es_isBuffer(value), isType = !isArr && !isArg && !isBuff && lodash_es_isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? _baseTimes(value.length, String) : [], length = result.length;
    for(var key in value)if ((inherited || _arrayLikeKeys_hasOwnProperty.call(value, key)) && !(skipIndexes && ('length' == key || isBuff && ('offset' == key || 'parent' == key) || isType && ('buffer' == key || 'byteLength' == key || 'byteOffset' == key) || _isIndex(key, length)))) result.push(key);
    return result;
}
const _arrayLikeKeys = arrayLikeKeys;
function nativeKeysIn(object) {
    var result = [];
    if (null != object) for(var key in Object(object))result.push(key);
    return result;
}
const _nativeKeysIn = nativeKeysIn;
var _baseKeysIn_objectProto = Object.prototype;
var _baseKeysIn_hasOwnProperty = _baseKeysIn_objectProto.hasOwnProperty;
function baseKeysIn(object) {
    if (!lodash_es_isObject(object)) return _nativeKeysIn(object);
    var isProto = _isPrototype(object), result = [];
    for(var key in object)if (!('constructor' == key && (isProto || !_baseKeysIn_hasOwnProperty.call(object, key)))) result.push(key);
    return result;
}
const _baseKeysIn = baseKeysIn;
function keysIn(object) {
    return lodash_es_isArrayLike(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}
const lodash_es_keysIn = keysIn;
function toPlainObject(value) {
    return _copyObject(value, lodash_es_keysIn(value));
}
const lodash_es_toPlainObject = toPlainObject;
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = _safeGet(object, key), srcValue = _safeGet(source, key), stacked = stack.get(srcValue);
    if (stacked) return void _assignMergeValue(object, key, stacked);
    var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : void 0;
    var isCommon = void 0 === newValue;
    if (isCommon) {
        var isArr = lodash_es_isArray(srcValue), isBuff = !isArr && lodash_es_isBuffer(srcValue), isTyped = !isArr && !isBuff && lodash_es_isTypedArray(srcValue);
        newValue = srcValue;
        if (isArr || isBuff || isTyped) if (lodash_es_isArray(objValue)) newValue = objValue;
        else if (lodash_es_isArrayLikeObject(objValue)) newValue = _copyArray(objValue);
        else if (isBuff) {
            isCommon = false;
            newValue = _cloneBuffer(srcValue, true);
        } else if (isTyped) {
            isCommon = false;
            newValue = _cloneTypedArray(srcValue, true);
        } else newValue = [];
        else if (lodash_es_isPlainObject(srcValue) || lodash_es_isArguments(srcValue)) {
            newValue = objValue;
            if (lodash_es_isArguments(objValue)) newValue = lodash_es_toPlainObject(objValue);
            else if (!lodash_es_isObject(objValue) || lodash_es_isFunction(objValue)) newValue = _initCloneObject(srcValue);
        } else isCommon = false;
    }
    if (isCommon) {
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
    }
    _assignMergeValue(object, key, newValue);
}
const _baseMergeDeep = baseMergeDeep;
function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) return;
    _baseFor(source, function(srcValue, key) {
        stack || (stack = new _Stack);
        if (lodash_es_isObject(srcValue)) _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        else {
            var newValue = customizer ? customizer(_safeGet(object, key), srcValue, key + '', object, source, stack) : void 0;
            if (void 0 === newValue) newValue = srcValue;
            _assignMergeValue(object, key, newValue);
        }
    }, lodash_es_keysIn);
}
const _baseMerge = baseMerge;
function identity(value) {
    return value;
}
const lodash_es_identity = identity;
function apply(func, thisArg, args) {
    switch(args.length){
        case 0:
            return func.call(thisArg);
        case 1:
            return func.call(thisArg, args[0]);
        case 2:
            return func.call(thisArg, args[0], args[1]);
        case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
}
const _apply = apply;
var nativeMax = Math.max;
function overRest(func, start, transform) {
    start = nativeMax(void 0 === start ? func.length - 1 : start, 0);
    return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while(++index < length)array[index] = args[start + index];
        index = -1;
        var otherArgs = Array(start + 1);
        while(++index < start)otherArgs[index] = args[index];
        otherArgs[start] = transform(array);
        return _apply(func, this, otherArgs);
    };
}
const _overRest = overRest;
function constant(value) {
    return function() {
        return value;
    };
}
const lodash_es_constant = constant;
var baseSetToString = _defineProperty ? function(func, string) {
    return _defineProperty(func, 'toString', {
        configurable: true,
        enumerable: false,
        value: lodash_es_constant(string),
        writable: true
    });
} : lodash_es_identity;
const _baseSetToString = baseSetToString;
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function() {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
            if (++count >= HOT_COUNT) return arguments[0];
        } else count = 0;
        return func.apply(void 0, arguments);
    };
}
const _shortOut = shortOut;
var setToString = _shortOut(_baseSetToString);
const _setToString = setToString;
function baseRest(func, start) {
    return _setToString(_overRest(func, start, lodash_es_identity), func + '');
}
const _baseRest = baseRest;
function isIterateeCall(value, index, object) {
    if (!lodash_es_isObject(object)) return false;
    var type = typeof index;
    if ('number' == type ? lodash_es_isArrayLike(object) && _isIndex(index, object.length) : 'string' == type && index in object) return lodash_es_eq(object[index], value);
    return false;
}
const _4_isIterateeCall = isIterateeCall;
function createAssigner(assigner) {
    return _baseRest(function(object, sources) {
        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
        customizer = assigner.length > 3 && 'function' == typeof customizer ? (length--, customizer) : void 0;
        if (guard && _4_isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? void 0 : customizer;
            length = 1;
        }
        object = Object(object);
        while(++index < length){
            var source = sources[index];
            if (source) assigner(object, source, index, customizer);
        }
        return object;
    });
}
const _createAssigner = createAssigner;
var mergeWith = _createAssigner(function(object, source, srcIndex, customizer) {
    _baseMerge(object, source, srcIndex, customizer);
});
const lodash_es_mergeWith = (/* unused pure expression or super */ null && (mergeWith));


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+shared@2.1.3/node_modules/@rspress/shared/dist/lodash-es.js

function baseSlice(array, start, end) {
    var index = -1, length = array.length;
    if (start < 0) start = -start > length ? 0 : length + start;
    end = end > length ? length : end;
    if (end < 0) end += length;
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var result = Array(length);
    while(++index < length)result[index] = array[index + start];
    return result;
}
const _baseSlice = (/* unused pure expression or super */ null && (baseSlice));
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
    var index = string.length;
    while(index-- && reWhitespace.test(string.charAt(index)));
    return index;
}
const _trimmedEndIndex = trimmedEndIndex;
var reTrimStart = /^\s+/;
function baseTrim(string) {
    return string ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
}
const _baseTrim = baseTrim;
var symbolTag = '[object Symbol]';
function isSymbol(value) {
    return 'symbol' == typeof value || lodash_es_isObjectLike(value) && _baseGetTag(value) == symbolTag;
}
const lodash_es_isSymbol = isSymbol;
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
    if ('number' == typeof value) return value;
    if (lodash_es_isSymbol(value)) return NAN;
    if (lodash_es_isObject(value)) {
        var other = 'function' == typeof value.valueOf ? value.valueOf() : value;
        value = lodash_es_isObject(other) ? other + '' : other;
    }
    if ('string' != typeof value) return 0 === value ? value : +value;
    value = _baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
const lodash_es_toNumber = toNumber;
var INFINITY = (/* unused pure expression or super */ null && (1 / 0)), MAX_INTEGER = 1.7976931348623157e+308;
function toFinite(value) {
    if (!value) return 0 === value ? value : 0;
    value = lodash_es_toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
}
const lodash_es_toFinite = (/* unused pure expression or super */ null && (toFinite));
function toInteger(value) {
    var result = lodash_es_toFinite(value), remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
}
const lodash_es_toInteger = (/* unused pure expression or super */ null && (toInteger));
var nativeCeil = (/* unused pure expression or super */ null && (Math.ceil)), lodash_es_nativeMax = (/* unused pure expression or super */ null && (Math.max));
function chunk(array, size, guard) {
    size = (guard ? _isIterateeCall(array, size, guard) : void 0 === size) ? 1 : lodash_es_nativeMax(lodash_es_toInteger(size), 0);
    var length = null == array ? 0 : array.length;
    if (!length || size < 1) return [];
    var index = 0, resIndex = 0, result = Array(nativeCeil(length / size));
    while(index < length)result[resIndex++] = _baseSlice(array, index, index += size);
    return result;
}
const lodash_es_chunk = (/* unused pure expression or super */ null && (chunk));
var now = function() {
    return _root.Date.now();
};
const lodash_es_now = now;
var FUNC_ERROR_TEXT = 'Expected a function';
var debounce_nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if ('function' != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
    wait = lodash_es_toNumber(wait) || 0;
    if (lodash_es_isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? debounce_nativeMax(lodash_es_toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }
    function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
        return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return void 0 === lastCallTime || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
        var time = lodash_es_now();
        if (shouldInvoke(time)) return trailingEdge(time);
        timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) return invokeFunc(time);
        lastArgs = lastThis = void 0;
        return result;
    }
    function cancel() {
        if (void 0 !== timerId) clearTimeout(timerId);
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
    }
    function flush() {
        return void 0 === timerId ? result : trailingEdge(lodash_es_now());
    }
    function debounced() {
        var time = lodash_es_now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
            if (void 0 === timerId) return leadingEdge(lastCallTime);
            if (maxing) {
                clearTimeout(timerId);
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (void 0 === timerId) timerId = setTimeout(timerExpired, wait);
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}
const lodash_es_debounce = debounce;
function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1, length = null == array ? 0 : array.length;
    while(++index < length){
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
}
const _arrayAggregator = arrayAggregator;
var nativeKeys = _overArg(Object.keys, Object);
const _nativeKeys = nativeKeys;
var lodash_es_objectProto = Object.prototype;
var _baseKeys_hasOwnProperty = lodash_es_objectProto.hasOwnProperty;
function baseKeys(object) {
    if (!_isPrototype(object)) return _nativeKeys(object);
    var result = [];
    for(var key in Object(object))if (_baseKeys_hasOwnProperty.call(object, key) && 'constructor' != key) result.push(key);
    return result;
}
const _baseKeys = baseKeys;
function keys(object) {
    return lodash_es_isArrayLike(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}
const lodash_es_keys = keys;
function baseForOwn(object, iteratee) {
    return object && _baseFor(object, iteratee, lodash_es_keys);
}
const _baseForOwn = baseForOwn;
function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
        if (null == collection) return collection;
        if (!lodash_es_isArrayLike(collection)) return eachFunc(collection, iteratee);
        var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
        while(fromRight ? index-- : ++index < length)if (false === iteratee(iterable[index], index, iterable)) break;
        return collection;
    };
}
const _createBaseEach = createBaseEach;
var baseEach = _createBaseEach(_baseForOwn);
const _baseEach = baseEach;
function baseAggregator(collection, setter, iteratee, accumulator) {
    _baseEach(collection, function(value, key, collection) {
        setter(accumulator, value, iteratee(value), collection);
    });
    return accumulator;
}
const _baseAggregator = baseAggregator;
var lodash_es_HASH_UNDEFINED = '__lodash_hash_undefined__';
function setCacheAdd(value) {
    this.__data__.set(value, lodash_es_HASH_UNDEFINED);
    return this;
}
const _setCacheAdd = setCacheAdd;
function setCacheHas(value) {
    return this.__data__.has(value);
}
const _setCacheHas = setCacheHas;
function SetCache(values) {
    var index = -1, length = null == values ? 0 : values.length;
    this.__data__ = new _MapCache;
    while(++index < length)this.add(values[index]);
}
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;
const _SetCache = SetCache;
function arraySome(array, predicate) {
    var index = -1, length = null == array ? 0 : array.length;
    while(++index < length)if (predicate(array[index], index, array)) return true;
    return false;
}
const _arraySome = arraySome;
function cacheHas(cache, key) {
    return cache.has(key);
}
const _cacheHas = cacheHas;
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) return arrStacked == other && othStacked == array;
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new _SetCache : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while(++index < arrLength){
        var arrValue = array[index], othValue = other[index];
        if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        if (void 0 !== compared) {
            if (compared) continue;
            result = false;
            break;
        }
        if (seen) {
            if (!_arraySome(other, function(othValue, othIndex) {
                if (!_cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) return seen.push(othIndex);
            })) {
                result = false;
                break;
            }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = false;
            break;
        }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
}
const _equalArrays = equalArrays;
function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
        result[++index] = [
            key,
            value
        ];
    });
    return result;
}
const _mapToArray = mapToArray;
function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
        result[++index] = value;
    });
    return result;
}
const _setToArray = setToArray;
var _equalByTag_COMPARE_PARTIAL_FLAG = 1, _equalByTag_COMPARE_UNORDERED_FLAG = 2;
var lodash_es_boolTag = '[object Boolean]', lodash_es_dateTag = '[object Date]', lodash_es_errorTag = '[object Error]', lodash_es_mapTag = '[object Map]', lodash_es_numberTag = '[object Number]', lodash_es_regexpTag = '[object RegExp]', lodash_es_setTag = '[object Set]', lodash_es_stringTag = '[object String]', _equalByTag_symbolTag = '[object Symbol]';
var lodash_es_arrayBufferTag = '[object ArrayBuffer]', lodash_es_dataViewTag = '[object DataView]';
var symbolProto = _Symbol ? _Symbol.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch(tag){
        case lodash_es_dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) break;
            object = object.buffer;
            other = other.buffer;
        case lodash_es_arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) break;
            return true;
        case lodash_es_boolTag:
        case lodash_es_dateTag:
        case lodash_es_numberTag:
            return lodash_es_eq(+object, +other);
        case lodash_es_errorTag:
            return object.name == other.name && object.message == other.message;
        case lodash_es_regexpTag:
        case lodash_es_stringTag:
            return object == other + '';
        case lodash_es_mapTag:
            var convert = _mapToArray;
        case lodash_es_setTag:
            var isPartial = bitmask & _equalByTag_COMPARE_PARTIAL_FLAG;
            convert || (convert = _setToArray);
            if (object.size != other.size && !isPartial) break;
            var stacked = stack.get(object);
            if (stacked) return stacked == other;
            bitmask |= _equalByTag_COMPARE_UNORDERED_FLAG;
            stack.set(object, other);
            var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack['delete'](object);
            return result;
        case _equalByTag_symbolTag:
            if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
    }
    return false;
}
const _equalByTag = equalByTag;
function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while(++index < length)array[offset + index] = values[index];
    return array;
}
const _arrayPush = arrayPush;
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return lodash_es_isArray(object) ? result : _arrayPush(result, symbolsFunc(object));
}
const _baseGetAllKeys = baseGetAllKeys;
function arrayFilter(array, predicate) {
    var index = -1, length = null == array ? 0 : array.length, resIndex = 0, result = [];
    while(++index < length){
        var value = array[index];
        if (predicate(value, index, array)) result[resIndex++] = value;
    }
    return result;
}
const _arrayFilter = arrayFilter;
function stubArray() {
    return [];
}
const lodash_es_stubArray = stubArray;
var _getSymbols_objectProto = Object.prototype;
var lodash_es_propertyIsEnumerable = _getSymbols_objectProto.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = nativeGetSymbols ? function(object) {
    if (null == object) return [];
    object = Object(object);
    return _arrayFilter(nativeGetSymbols(object), function(symbol) {
        return lodash_es_propertyIsEnumerable.call(object, symbol);
    });
} : lodash_es_stubArray;
const _getSymbols = getSymbols;
function getAllKeys(object) {
    return _baseGetAllKeys(object, lodash_es_keys, _getSymbols);
}
const _getAllKeys = getAllKeys;
var _equalObjects_COMPARE_PARTIAL_FLAG = 1;
var _equalObjects_objectProto = Object.prototype;
var _equalObjects_hasOwnProperty = _equalObjects_objectProto.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & _equalObjects_COMPARE_PARTIAL_FLAG, objProps = _getAllKeys(object), objLength = objProps.length, othProps = _getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) return false;
    var index = objLength;
    while(index--){
        var key = objProps[index];
        if (!(isPartial ? key in other : _equalObjects_hasOwnProperty.call(other, key))) return false;
    }
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) return objStacked == other && othStacked == object;
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while(++index < objLength){
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        if (!(void 0 === compared ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result = false;
            break;
        }
        skipCtor || (skipCtor = 'constructor' == key);
    }
    if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !('function' == typeof objCtor && objCtor instanceof objCtor && 'function' == typeof othCtor && othCtor instanceof othCtor)) result = false;
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
}
const _equalObjects = equalObjects;
var DataView = _getNative(_root, 'DataView');
const _DataView = DataView;
var lodash_es_Promise = _getNative(_root, 'Promise');
const _Promise = lodash_es_Promise;
var lodash_es_Set = _getNative(_root, 'Set');
const _Set = lodash_es_Set;
var lodash_es_WeakMap = _getNative(_root, 'WeakMap');
const _WeakMap = lodash_es_WeakMap;
var _getTag_mapTag = '[object Map]', lodash_es_objectTag = '[object Object]', promiseTag = '[object Promise]', _getTag_setTag = '[object Set]', lodash_es_weakMapTag = '[object WeakMap]';
var _getTag_dataViewTag = '[object DataView]';
var dataViewCtorString = _toSource(_DataView), mapCtorString = _toSource(_Map), promiseCtorString = _toSource(_Promise), setCtorString = _toSource(_Set), weakMapCtorString = _toSource(_WeakMap);
var getTag = _baseGetTag;
if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != _getTag_dataViewTag || _Map && getTag(new _Map) != _getTag_mapTag || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set) != _getTag_setTag || _WeakMap && getTag(new _WeakMap) != lodash_es_weakMapTag) getTag = function(value) {
    var result = _baseGetTag(value), Ctor = result == lodash_es_objectTag ? value.constructor : void 0, ctorString = Ctor ? _toSource(Ctor) : '';
    if (ctorString) switch(ctorString){
        case dataViewCtorString:
            return _getTag_dataViewTag;
        case mapCtorString:
            return _getTag_mapTag;
        case promiseCtorString:
            return promiseTag;
        case setCtorString:
            return _getTag_setTag;
        case weakMapCtorString:
            return lodash_es_weakMapTag;
    }
    return result;
};
const _getTag = getTag;
var _baseIsEqualDeep_COMPARE_PARTIAL_FLAG = 1;
var lodash_es_argsTag = '[object Arguments]', lodash_es_arrayTag = '[object Array]', _baseIsEqualDeep_objectTag = '[object Object]';
var _baseIsEqualDeep_objectProto = Object.prototype;
var _baseIsEqualDeep_hasOwnProperty = _baseIsEqualDeep_objectProto.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = lodash_es_isArray(object), othIsArr = lodash_es_isArray(other), objTag = objIsArr ? lodash_es_arrayTag : _getTag(object), othTag = othIsArr ? lodash_es_arrayTag : _getTag(other);
    objTag = objTag == lodash_es_argsTag ? _baseIsEqualDeep_objectTag : objTag;
    othTag = othTag == lodash_es_argsTag ? _baseIsEqualDeep_objectTag : othTag;
    var objIsObj = objTag == _baseIsEqualDeep_objectTag, othIsObj = othTag == _baseIsEqualDeep_objectTag, isSameTag = objTag == othTag;
    if (isSameTag && lodash_es_isBuffer(object)) {
        if (!lodash_es_isBuffer(other)) return false;
        objIsArr = true;
        objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
        stack || (stack = new _Stack);
        return objIsArr || lodash_es_isTypedArray(object) ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack) : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & _baseIsEqualDeep_COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && _baseIsEqualDeep_hasOwnProperty.call(object, '__wrapped__'), othIsWrapped = othIsObj && _baseIsEqualDeep_hasOwnProperty.call(other, '__wrapped__');
        if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new _Stack);
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
    }
    if (!isSameTag) return false;
    stack || (stack = new _Stack);
    return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
const _baseIsEqualDeep = baseIsEqualDeep;
function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) return true;
    if (null == value || null == other || !lodash_es_isObjectLike(value) && !lodash_es_isObjectLike(other)) return value !== value && other !== other;
    return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
const _baseIsEqual = baseIsEqual;
var _baseIsMatch_COMPARE_PARTIAL_FLAG = 1, _baseIsMatch_COMPARE_UNORDERED_FLAG = 2;
function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length, length = index, noCustomizer = !customizer;
    if (null == object) return !length;
    object = Object(object);
    while(index--){
        var data = matchData[index];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return false;
    }
    while(++index < length){
        data = matchData[index];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
            if (void 0 === objValue && !(key in object)) return false;
        } else {
            var stack = new _Stack;
            if (customizer) var result = customizer(objValue, srcValue, key, object, source, stack);
            if (!(void 0 === result ? _baseIsEqual(srcValue, objValue, _baseIsMatch_COMPARE_PARTIAL_FLAG | _baseIsMatch_COMPARE_UNORDERED_FLAG, customizer, stack) : result)) return false;
        }
    }
    return true;
}
const _baseIsMatch = baseIsMatch;
function isStrictComparable(value) {
    return value === value && !lodash_es_isObject(value);
}
const _isStrictComparable = isStrictComparable;
function getMatchData(object) {
    var result = lodash_es_keys(object), length = result.length;
    while(length--){
        var key = result[length], value = object[key];
        result[length] = [
            key,
            value,
            _isStrictComparable(value)
        ];
    }
    return result;
}
const _getMatchData = getMatchData;
function matchesStrictComparable(key, srcValue) {
    return function(object) {
        if (null == object) return false;
        return object[key] === srcValue && (void 0 !== srcValue || key in Object(object));
    };
}
const _matchesStrictComparable = matchesStrictComparable;
function baseMatches(source) {
    var matchData = _getMatchData(source);
    if (1 == matchData.length && matchData[0][2]) return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
    return function(object) {
        return object === source || _baseIsMatch(object, source, matchData);
    };
}
const _baseMatches = baseMatches;
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(value, object) {
    if (lodash_es_isArray(value)) return false;
    var type = typeof value;
    if ('number' == type || 'symbol' == type || 'boolean' == type || null == value || lodash_es_isSymbol(value)) return true;
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || null != object && value in Object(object);
}
const _isKey = isKey;
var memoize_FUNC_ERROR_TEXT = 'Expected a function';
function memoize(func, resolver) {
    if ('function' != typeof func || null != resolver && 'function' != typeof resolver) throw new TypeError(memoize_FUNC_ERROR_TEXT);
    var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) return cache.get(key);
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
    };
    memoized.cache = new (memoize.Cache || _MapCache);
    return memoized;
}
memoize.Cache = _MapCache;
const lodash_es_memoize = memoize;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
    var result = lodash_es_memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) cache.clear();
        return key;
    });
    var cache = result.cache;
    return result;
}
const _memoizeCapped = memoizeCapped;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = _memoizeCapped(function(string) {
    var result = [];
    if (46 === string.charCodeAt(0)) result.push('');
    string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
    });
    return result;
});
const _stringToPath = stringToPath;
function arrayMap(array, iteratee) {
    var index = -1, length = null == array ? 0 : array.length, result = Array(length);
    while(++index < length)result[index] = iteratee(array[index], index, array);
    return result;
}
const _arrayMap = arrayMap;
var _baseToString_INFINITY = 1 / 0;
var _baseToString_symbolProto = _Symbol ? _Symbol.prototype : void 0, symbolToString = _baseToString_symbolProto ? _baseToString_symbolProto.toString : void 0;
function baseToString(value) {
    if ('string' == typeof value) return value;
    if (lodash_es_isArray(value)) return _arrayMap(value, baseToString) + '';
    if (lodash_es_isSymbol(value)) return symbolToString ? symbolToString.call(value) : '';
    var result = value + '';
    return '0' == result && 1 / value == -_baseToString_INFINITY ? '-0' : result;
}
const _baseToString = baseToString;
function toString_toString(value) {
    return null == value ? '' : _baseToString(value);
}
const lodash_es_toString = toString_toString;
function castPath(value, object) {
    if (lodash_es_isArray(value)) return value;
    return _isKey(value, object) ? [
        value
    ] : _stringToPath(lodash_es_toString(value));
}
const _castPath = castPath;
var _toKey_INFINITY = 1 / 0;
function toKey(value) {
    if ('string' == typeof value || lodash_es_isSymbol(value)) return value;
    var result = value + '';
    return '0' == result && 1 / value == -_toKey_INFINITY ? '-0' : result;
}
const _toKey = toKey;
function baseGet(object, path) {
    path = _castPath(path, object);
    var index = 0, length = path.length;
    while(null != object && index < length)object = object[_toKey(path[index++])];
    return index && index == length ? object : void 0;
}
const _baseGet = baseGet;
function get_get(object, path, defaultValue) {
    var result = null == object ? void 0 : _baseGet(object, path);
    return void 0 === result ? defaultValue : result;
}
const lodash_es_get = get_get;
function baseHasIn(object, key) {
    return null != object && key in Object(object);
}
const _baseHasIn = baseHasIn;
function hasPath(object, path, hasFunc) {
    path = _castPath(path, object);
    var index = -1, length = path.length, result = false;
    while(++index < length){
        var key = _toKey(path[index]);
        if (!(result = null != object && hasFunc(object, key))) break;
        object = object[key];
    }
    if (result || ++index != length) return result;
    length = null == object ? 0 : object.length;
    return !!length && lodash_es_isLength(length) && _isIndex(key, length) && (lodash_es_isArray(object) || lodash_es_isArguments(object));
}
const _hasPath = hasPath;
function hasIn(object, path) {
    return null != object && _hasPath(object, path, _baseHasIn);
}
const lodash_es_hasIn = hasIn;
var _baseMatchesProperty_COMPARE_PARTIAL_FLAG = 1, _baseMatchesProperty_COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty(path, srcValue) {
    if (_isKey(path) && _isStrictComparable(srcValue)) return _matchesStrictComparable(_toKey(path), srcValue);
    return function(object) {
        var objValue = lodash_es_get(object, path);
        return void 0 === objValue && objValue === srcValue ? lodash_es_hasIn(object, path) : _baseIsEqual(srcValue, objValue, _baseMatchesProperty_COMPARE_PARTIAL_FLAG | _baseMatchesProperty_COMPARE_UNORDERED_FLAG);
    };
}
const _baseMatchesProperty = baseMatchesProperty;
function baseProperty(key) {
    return function(object) {
        return null == object ? void 0 : object[key];
    };
}
const _baseProperty = baseProperty;
function basePropertyDeep(path) {
    return function(object) {
        return _baseGet(object, path);
    };
}
const _basePropertyDeep = basePropertyDeep;
function property(path) {
    return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}
const lodash_es_property = property;
function baseIteratee(value) {
    if ('function' == typeof value) return value;
    if (null == value) return lodash_es_identity;
    if ('object' == typeof value) return lodash_es_isArray(value) ? _baseMatchesProperty(value[0], value[1]) : _baseMatches(value);
    return lodash_es_property(value);
}
const _baseIteratee = baseIteratee;
function createAggregator(setter, initializer) {
    return function(collection, iteratee) {
        var func = lodash_es_isArray(collection) ? _arrayAggregator : _baseAggregator, accumulator = initializer ? initializer() : {};
        return func(collection, setter, _baseIteratee(iteratee, 2), accumulator);
    };
}
const _createAggregator = createAggregator;
var groupBy_objectProto = Object.prototype;
var groupBy_hasOwnProperty = groupBy_objectProto.hasOwnProperty;
var groupBy = _createAggregator(function(result, value, key) {
    if (groupBy_hasOwnProperty.call(result, key)) result[key].push(value);
    else _baseAssignValue(result, key, [
        value
    ]);
});
const lodash_es_groupBy = (/* unused pure expression or super */ null && (groupBy));



;// CONCATENATED MODULE: ./node_modules/.pnpm/flexsearch@0.8.212/node_modules/flexsearch/dist/flexsearch.bundle.module.min.mjs
/**!
 * FlexSearch.js v0.8.212 (Bundle/Module)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/flexsearch
 */
var flexsearch_bundle_module_min_w;function flexsearch_bundle_module_min_H(a,c,b){const e=typeof b,d=typeof a;if(e!=="undefined"){if(d!=="undefined"){if(b){if(d==="function"&&e===d)return function(k){return a(b(k))};c=a.constructor;if(c===b.constructor){if(c===Array)return b.concat(a);if(c===Map){var f=new Map(b);for(var g of a)f.set(g[0],g[1]);return f}if(c===Set){g=new Set(b);for(f of a.values())g.add(f);return g}}}return a}return b}return d==="undefined"?c:a}function aa(a,c){return typeof a==="undefined"?c:a}function flexsearch_bundle_module_min_I(){return Object.create(null)}
function flexsearch_bundle_module_min_M(a){return typeof a==="string"}function ba(a){return typeof a==="object"}function ca(a,c){if(flexsearch_bundle_module_min_M(c))a=a[c];else for(let b=0;a&&b<c.length;b++)a=a[c[b]];return a};const ea=/[^\p{L}\p{N}]+/u,fa=/(\d{3})/g,ha=/(\D)(\d{3})/g,ia=/(\d{3})(\D)/g,ja=/[\u0300-\u036f]/g;function ka(a={}){if(!this||this.constructor!==ka)return new ka(...arguments);if(arguments.length)for(a=0;a<arguments.length;a++)this.assign(arguments[a]);else this.assign(a)}flexsearch_bundle_module_min_w=ka.prototype;
flexsearch_bundle_module_min_w.assign=function(a){this.normalize=flexsearch_bundle_module_min_H(a.normalize,!0,this.normalize);let c=a.include,b=c||a.exclude||a.split,e;if(b||b===""){if(typeof b==="object"&&b.constructor!==RegExp){let d="";e=!c;c||(d+="\\p{Z}");b.letter&&(d+="\\p{L}");b.number&&(d+="\\p{N}",e=!!c);b.symbol&&(d+="\\p{S}");b.punctuation&&(d+="\\p{P}");b.control&&(d+="\\p{C}");if(b=b.char)d+=typeof b==="object"?b.join(""):b;try{this.split=new RegExp("["+(c?"^":"")+d+"]+","u")}catch(f){this.split=/\s+/}}else this.split=b,e=b===!1||"a1a".split(b).length<
2;this.numeric=flexsearch_bundle_module_min_H(a.numeric,e)}else{try{this.split=flexsearch_bundle_module_min_H(this.split,ea)}catch(d){this.split=/\s+/}this.numeric=flexsearch_bundle_module_min_H(a.numeric,flexsearch_bundle_module_min_H(this.numeric,!0))}this.prepare=flexsearch_bundle_module_min_H(a.prepare,null,this.prepare);this.finalize=flexsearch_bundle_module_min_H(a.finalize,null,this.finalize);b=a.filter;this.filter=typeof b==="function"?b:flexsearch_bundle_module_min_H(b&&new Set(b),null,this.filter);this.dedupe=flexsearch_bundle_module_min_H(a.dedupe,!0,this.dedupe);this.matcher=flexsearch_bundle_module_min_H((b=a.matcher)&&new Map(b),null,this.matcher);this.mapper=flexsearch_bundle_module_min_H((b=a.mapper)&&new Map(b),null,this.mapper);this.stemmer=flexsearch_bundle_module_min_H((b=a.stemmer)&&new Map(b),
null,this.stemmer);this.replacer=flexsearch_bundle_module_min_H(a.replacer,null,this.replacer);this.minlength=flexsearch_bundle_module_min_H(a.minlength,1,this.minlength);this.maxlength=flexsearch_bundle_module_min_H(a.maxlength,1024,this.maxlength);this.rtl=flexsearch_bundle_module_min_H(a.rtl,!1,this.rtl);if(this.cache=b=flexsearch_bundle_module_min_H(a.cache,!0,this.cache))this.F=null,this.L=typeof b==="number"?b:2E5,this.B=new Map,this.D=new Map,this.I=this.H=128;this.h="";this.J=null;this.A="";this.K=null;if(this.matcher)for(const d of this.matcher.keys())this.h+=(this.h?"|":"")+d;if(this.stemmer)for(const d of this.stemmer.keys())this.A+=
(this.A?"|":"")+d;return this};flexsearch_bundle_module_min_w.addStemmer=function(a,c){this.stemmer||(this.stemmer=new Map);this.stemmer.set(a,c);this.A+=(this.A?"|":"")+a;this.K=null;this.cache&&Q(this);return this};flexsearch_bundle_module_min_w.addFilter=function(a){typeof a==="function"?this.filter=a:(this.filter||(this.filter=new Set),this.filter.add(a));this.cache&&Q(this);return this};
flexsearch_bundle_module_min_w.addMapper=function(a,c){if(typeof a==="object")return this.addReplacer(a,c);if(a.length>1)return this.addMatcher(a,c);this.mapper||(this.mapper=new Map);this.mapper.set(a,c);this.cache&&Q(this);return this};flexsearch_bundle_module_min_w.addMatcher=function(a,c){if(typeof a==="object")return this.addReplacer(a,c);if(a.length<2&&(this.dedupe||this.mapper))return this.addMapper(a,c);this.matcher||(this.matcher=new Map);this.matcher.set(a,c);this.h+=(this.h?"|":"")+a;this.J=null;this.cache&&Q(this);return this};
flexsearch_bundle_module_min_w.addReplacer=function(a,c){if(typeof a==="string")return this.addMatcher(a,c);this.replacer||(this.replacer=[]);this.replacer.push(a,c);this.cache&&Q(this);return this};
flexsearch_bundle_module_min_w.encode=function(a,c){if(this.cache&&a.length<=this.H)if(this.F){if(this.B.has(a))return this.B.get(a)}else this.F=setTimeout(Q,50,this);this.normalize&&(typeof this.normalize==="function"?a=this.normalize(a):a=ja?a.normalize("NFKD").replace(ja,"").toLowerCase():a.toLowerCase());this.prepare&&(a=this.prepare(a));this.numeric&&a.length>3&&(a=a.replace(ha,"$1 $2").replace(ia,"$1 $2").replace(fa,"$1 "));const b=!(this.dedupe||this.mapper||this.filter||this.matcher||this.stemmer||this.replacer);let e=
[],d=flexsearch_bundle_module_min_I(),f,g,k=this.split||this.split===""?a.split(this.split):[a];for(let l=0,m,p;l<k.length;l++)if((m=p=k[l])&&!(m.length<this.minlength||m.length>this.maxlength)){if(c){if(d[m])continue;d[m]=1}else{if(f===m)continue;f=m}if(b)e.push(m);else if(!this.filter||(typeof this.filter==="function"?this.filter(m):!this.filter.has(m))){if(this.cache&&m.length<=this.I)if(this.F){var h=this.D.get(m);if(h||h===""){h&&e.push(h);continue}}else this.F=setTimeout(Q,50,this);if(this.stemmer){this.K||(this.K=new RegExp("(?!^)("+
this.A+")$"));let u;for(;u!==m&&m.length>2;)u=m,m=m.replace(this.K,r=>this.stemmer.get(r))}if(m&&(this.mapper||this.dedupe&&m.length>1)){h="";for(let u=0,r="",t,n;u<m.length;u++)t=m.charAt(u),t===r&&this.dedupe||((n=this.mapper&&this.mapper.get(t))||n===""?n===r&&this.dedupe||!(r=n)||(h+=n):h+=r=t);m=h}this.matcher&&m.length>1&&(this.J||(this.J=new RegExp("("+this.h+")","g")),m=m.replace(this.J,u=>this.matcher.get(u)));if(m&&this.replacer)for(h=0;m&&h<this.replacer.length;h+=2)m=m.replace(this.replacer[h],
this.replacer[h+1]);this.cache&&p.length<=this.I&&(this.D.set(p,m),this.D.size>this.L&&(this.D.clear(),this.I=this.I/1.1|0));if(m){if(m!==p)if(c){if(d[m])continue;d[m]=1}else{if(g===m)continue;g=m}e.push(m)}}}this.finalize&&(e=this.finalize(e)||e);this.cache&&a.length<=this.H&&(this.B.set(a,e),this.B.size>this.L&&(this.B.clear(),this.H=this.H/1.1|0));return e};function Q(a){a.F=null;a.B.clear();a.D.clear()};function la(a,c,b){b||(c||typeof a!=="object"?typeof c==="object"&&(b=c,c=0):b=a);b&&(a=b.query||a,c=b.limit||c);let e=""+(c||0);b&&(e+=(b.offset||0)+!!b.context+!!b.suggest+(b.resolve!==!1)+(b.resolution||this.resolution)+(b.boost||0));a=(""+a).toLowerCase();this.cache||(this.cache=new ma);let d=this.cache.get(a+e);if(!d){const f=b&&b.cache;f&&(b.cache=!1);d=this.search(a,c,b);f&&(b.cache=f);this.cache.set(a+e,d)}return d}function ma(a){this.limit=a&&a!==!0?a:1E3;this.cache=new Map;this.h=""}
ma.prototype.set=function(a,c){this.cache.set(this.h=a,c);this.cache.size>this.limit&&this.cache.delete(this.cache.keys().next().value)};ma.prototype.get=function(a){const c=this.cache.get(a);c&&this.h!==a&&(this.cache.delete(a),this.cache.set(this.h=a,c));return c};ma.prototype.remove=function(a){for(const c of this.cache){const b=c[0];c[1].includes(a)&&this.cache.delete(b)}};ma.prototype.clear=function(){this.cache.clear();this.h=""};const na={normalize:!1,numeric:!1,dedupe:!1};const oa={};const ra=new Map([["b","p"],["v","f"],["w","f"],["z","s"],["x","s"],["d","t"],["n","m"],["c","k"],["g","k"],["j","k"],["q","k"],["i","e"],["y","e"],["u","o"]]);const sa=new Map([["ae","a"],["oe","o"],["sh","s"],["kh","k"],["th","t"],["ph","f"],["pf","f"]]),ta=[/([^aeo])h(.)/g,"$1$2",/([aeo])h([^aeo]|$)/g,"$1$2",/(.)\1+/g,"$1"];const ua={a:"",e:"",i:"",o:"",u:"",y:"",b:1,f:1,p:1,v:1,c:2,g:2,j:2,k:2,q:2,s:2,x:2,z:2,"\u00df":2,d:3,t:3,l:4,m:5,n:5,r:6};var va={Exact:na,Default:oa,Normalize:oa,LatinBalance:{mapper:ra},LatinAdvanced:{mapper:ra,matcher:sa,replacer:ta},LatinExtra:{mapper:ra,replacer:ta.concat([/(?!^)[aeo]/g,""]),matcher:sa},LatinSoundex:{dedupe:!1,include:{letter:!0},finalize:function(a){for(let b=0;b<a.length;b++){var c=a[b];let e=c.charAt(0),d=ua[e];for(let f=1,g;f<c.length&&(g=c.charAt(f),g==="h"||g==="w"||!(g=ua[g])||g===d||(e+=g,d=g,e.length!==4));f++);a[b]=e}}},CJK:{split:""},LatinExact:na,LatinDefault:oa,LatinSimple:oa};function wa(a,c,b,e){let d=[];for(let f=0,g;f<a.index.length;f++)if(g=a.index[f],c>=g.length)c-=g.length;else{c=g[e?"splice":"slice"](c,b);const k=c.length;if(k&&(d=d.length?d.concat(c):c,b-=k,e&&(a.length-=k),!b))break;c=0}return d}
function xa(a){if(!this||this.constructor!==xa)return new xa(a);this.index=a?[a]:[];this.length=a?a.length:0;const c=this;return new Proxy([],{get(b,e){if(e==="length")return c.length;if(e==="push")return function(d){c.index[c.index.length-1].push(d);c.length++};if(e==="pop")return function(){if(c.length)return c.length--,c.index[c.index.length-1].pop()};if(e==="indexOf")return function(d){let f=0;for(let g=0,k,h;g<c.index.length;g++){k=c.index[g];h=k.indexOf(d);if(h>=0)return f+h;f+=k.length}return-1};
if(e==="includes")return function(d){for(let f=0;f<c.index.length;f++)if(c.index[f].includes(d))return!0;return!1};if(e==="slice")return function(d,f){return wa(c,d||0,f||c.length,!1)};if(e==="splice")return function(d,f){return wa(c,d||0,f||c.length,!0)};if(e==="constructor")return Array;if(typeof e!=="symbol")return(b=c.index[e/2**31|0])&&b[e]},set(b,e,d){b=e/2**31|0;(c.index[b]||(c.index[b]=[]))[e]=d;c.length++;return!0}})}xa.prototype.clear=function(){this.index.length=0};xa.prototype.push=function(){};
function flexsearch_bundle_module_min_R(a=8){if(!this||this.constructor!==flexsearch_bundle_module_min_R)return new flexsearch_bundle_module_min_R(a);this.index=flexsearch_bundle_module_min_I();this.h=[];this.size=0;a>32?(this.B=Aa,this.A=BigInt(a)):(this.B=Ba,this.A=a)}flexsearch_bundle_module_min_R.prototype.get=function(a){const c=this.index[this.B(a)];return c&&c.get(a)};flexsearch_bundle_module_min_R.prototype.set=function(a,c){var b=this.B(a);let e=this.index[b];e?(b=e.size,e.set(a,c),(b-=e.size)&&this.size++):(this.index[b]=e=new Map([[a,c]]),this.h.push(e),this.size++)};
function flexsearch_bundle_module_min_S(a=8){if(!this||this.constructor!==flexsearch_bundle_module_min_S)return new flexsearch_bundle_module_min_S(a);this.index=flexsearch_bundle_module_min_I();this.h=[];this.size=0;a>32?(this.B=Aa,this.A=BigInt(a)):(this.B=Ba,this.A=a)}flexsearch_bundle_module_min_S.prototype.add=function(a){var c=this.B(a);let b=this.index[c];b?(c=b.size,b.add(a),(c-=b.size)&&this.size++):(this.index[c]=b=new Set([a]),this.h.push(b),this.size++)};flexsearch_bundle_module_min_w=flexsearch_bundle_module_min_R.prototype;flexsearch_bundle_module_min_w.has=flexsearch_bundle_module_min_S.prototype.has=function(a){const c=this.index[this.B(a)];return c&&c.has(a)};
flexsearch_bundle_module_min_w.delete=flexsearch_bundle_module_min_S.prototype.delete=function(a){const c=this.index[this.B(a)];c&&c.delete(a)&&this.size--};flexsearch_bundle_module_min_w.clear=flexsearch_bundle_module_min_S.prototype.clear=function(){this.index=flexsearch_bundle_module_min_I();this.h=[];this.size=0};flexsearch_bundle_module_min_w.values=flexsearch_bundle_module_min_S.prototype.values=function*(){for(let a=0;a<this.h.length;a++)for(let c of this.h[a].values())yield c};flexsearch_bundle_module_min_w.keys=flexsearch_bundle_module_min_S.prototype.keys=function*(){for(let a=0;a<this.h.length;a++)for(let c of this.h[a].keys())yield c};flexsearch_bundle_module_min_w.entries=flexsearch_bundle_module_min_S.prototype.entries=function*(){for(let a=0;a<this.h.length;a++)for(let c of this.h[a].entries())yield c};
function Ba(a){let c=2**this.A-1;if(typeof a=="number")return a&c;let b=0,e=this.A+1;for(let d=0;d<a.length;d++)b=(b*e^a.charCodeAt(d))&c;return this.A===32?b+2**31:b}function Aa(a){let c=BigInt(2)**this.A-BigInt(1);var b=typeof a;if(b==="bigint")return a&c;if(b==="number")return BigInt(a)&c;b=BigInt(0);let e=this.A+BigInt(1);for(let d=0;d<a.length;d++)b=(b*e^BigInt(a.charCodeAt(d)))&c;return b};let Ca,Da;
async function Ea(a){a=a.data;var c=a.task;const b=a.id;let e=a.args;switch(c){case "init":Da=a.options||{};(c=a.factory)?(Function("return "+c)()(self),Ca=new self.FlexSearch.Index(Da),delete self.FlexSearch):Ca=new flexsearch_bundle_module_min_T(Da);postMessage({id:b});break;default:let d;c==="export"&&(e[1]?(e[0]=Da.export,e[2]=0,e[3]=1):e=null);c==="import"?e[0]&&(a=await Da.import.call(Ca,e[0]),Ca.import(e[0],a)):((d=e&&Ca[c].apply(Ca,e))&&d.then&&(d=await d),d&&d.await&&(d=await d.await),c==="search"&&d.result&&(d=d.result));
postMessage(c==="search"?{id:b,msg:d}:{id:b})}};function Fa(a){Ga.call(a,"add");Ga.call(a,"append");Ga.call(a,"search");Ga.call(a,"update");Ga.call(a,"remove");Ga.call(a,"searchCache")}let Ha,Ia,Ja;function Ka(){Ha=Ja=0}
function Ga(a){this[a+"Async"]=function(){const c=arguments;var b=c[c.length-1];let e;typeof b==="function"&&(e=b,delete c[c.length-1]);Ha?Ja||(Ja=Date.now()-Ia>=this.priority*this.priority*3):(Ha=setTimeout(Ka,0),Ia=Date.now());if(Ja){const f=this;return new Promise(g=>{setTimeout(function(){g(f[a+"Async"].apply(f,c))},0)})}const d=this[a].apply(this,c);b=d.then?d:new Promise(f=>f(d));e&&b.then(e);return b}};let flexsearch_bundle_module_min_V=0;
function La(a={},c){function b(k){function h(l){l=l.data||l;const m=l.id,p=m&&f.h[m];p&&(p(l.msg),delete f.h[m])}this.worker=k;this.h=flexsearch_bundle_module_min_I();if(this.worker){d?this.worker.on("message",h):this.worker.onmessage=h;if(a.config)return new Promise(function(l){flexsearch_bundle_module_min_V>1E9&&(flexsearch_bundle_module_min_V=0);f.h[++flexsearch_bundle_module_min_V]=function(){l(f)};f.worker.postMessage({id:flexsearch_bundle_module_min_V,task:"init",factory:e,options:a})});this.priority=a.priority||4;this.encoder=c||null;this.worker.postMessage({task:"init",factory:e,options:a});return this}}if(!this||this.constructor!==La)return new La(a);
let e=typeof self!=="undefined"?self._factory:typeof window!=="undefined"?window._factory:null;e&&(e=e.toString());const d=typeof window==="undefined",f=this,g=Ma(e,d,a.worker);return g.then?g.then(function(k){return b.call(f,k)}):b.call(this,g)}flexsearch_bundle_module_min_W("add");flexsearch_bundle_module_min_W("append");flexsearch_bundle_module_min_W("search");flexsearch_bundle_module_min_W("update");flexsearch_bundle_module_min_W("remove");flexsearch_bundle_module_min_W("clear");flexsearch_bundle_module_min_W("export");flexsearch_bundle_module_min_W("import");La.prototype.searchCache=la;Fa(La.prototype);
function flexsearch_bundle_module_min_W(a){La.prototype[a]=function(){const c=this,b=[].slice.call(arguments);var e=b[b.length-1];let d;typeof e==="function"&&(d=e,b.pop());e=new Promise(function(f){a==="export"&&typeof b[0]==="function"&&(b[0]=null);flexsearch_bundle_module_min_V>1E9&&(flexsearch_bundle_module_min_V=0);c.h[++flexsearch_bundle_module_min_V]=f;c.worker.postMessage({task:a,id:flexsearch_bundle_module_min_V,args:b})});return d?(e.then(d),this):e}}
function Ma(a,c,b){return c?typeof module!=="undefined"?new(require("worker_threads")["Worker"])(__dirname+"/worker/node.js"):__webpack_require__.e(/* import() */ 2).then(__webpack_require__.t.bind(__webpack_require__, "IQ", 19)).then(function(worker){return new worker["Worker"]("/"+"/node/node.mjs")}):a?new window.Worker(URL.createObjectURL(new Blob(["onmessage="+Ea.toString()],{type:"text/javascript"}))):new window.Worker(typeof b==="string"?b:'file:///home/runner/work/docs/docs/node_modules/.pnpm/flexsearch@0.8.212/node_modules/flexsearch/dist/flexsearch.bundle.module.min.mjs'.replace("/worker.js","/worker/worker.js").replace("flexsearch.bundle.module.min.js",
"module/worker/worker.js").replace("flexsearch.bundle.module.min.mjs","module/worker/worker.js"),{type:"module"})};Na.prototype.add=function(a,c,b){ba(a)&&(c=a,a=ca(c,this.key));if(c&&(a||a===0)){if(!b&&this.reg.has(a))return this.update(a,c);for(let k=0,h;k<this.field.length;k++){h=this.B[k];var e=this.index.get(this.field[k]);if(typeof h==="function"){var d=h(c);d&&e.add(a,d,b,!0)}else if(d=h.G,!d||d(c))h.constructor===String?h=[""+h]:flexsearch_bundle_module_min_M(h)&&(h=[h]),Qa(c,h,this.D,0,e,a,h[0],b)}if(this.tag)for(e=0;e<this.A.length;e++){var f=this.A[e];d=this.tag.get(this.F[e]);let k=flexsearch_bundle_module_min_I();if(typeof f==="function"){if(f=f(c),!f)continue}else{var g=
f.G;if(g&&!g(c))continue;f.constructor===String&&(f=""+f);f=ca(c,f)}if(d&&f){flexsearch_bundle_module_min_M(f)&&(f=[f]);for(let h=0,l,m;h<f.length;h++)if(l=f[h],!k[l]&&(k[l]=1,(g=d.get(l))?m=g:d.set(l,m=[]),!b||!m.includes(a))){if(m.length===2**31-1){g=new xa(m);if(this.fastupdate)for(let p of this.reg.values())p.includes(m)&&(p[p.indexOf(m)]=g);d.set(l,m=g)}m.push(a);this.fastupdate&&((g=this.reg.get(a))?g.push(m):this.reg.set(a,[m]))}}}if(this.store&&(!b||!this.store.has(a))){let k;if(this.h){k=flexsearch_bundle_module_min_I();for(let h=0,l;h<this.h.length;h++){l=
this.h[h];if((b=l.G)&&!b(c))continue;let m;if(typeof l==="function"){m=l(c);if(!m)continue;l=[l.O]}else if(flexsearch_bundle_module_min_M(l)||l.constructor===String){k[l]=c[l];continue}Ra(c,k,l,0,l[0],m)}}this.store.set(a,k||c)}this.worker&&(this.fastupdate||this.reg.add(a))}return this};function Ra(a,c,b,e,d,f){a=a[d];if(e===b.length-1)c[d]=f||a;else if(a)if(a.constructor===Array)for(c=c[d]=Array(a.length),d=0;d<a.length;d++)Ra(a,c,b,e,d);else c=c[d]||(c[d]=flexsearch_bundle_module_min_I()),d=b[++e],Ra(a,c,b,e,d)}
function Qa(a,c,b,e,d,f,g,k){if(a=a[g])if(e===c.length-1){if(a.constructor===Array){if(b[e]){for(c=0;c<a.length;c++)d.add(f,a[c],!0,!0);return}a=a.join(" ")}d.add(f,a,k,!0)}else if(a.constructor===Array)for(g=0;g<a.length;g++)Qa(a,c,b,e,d,f,g,k);else g=c[++e],Qa(a,c,b,e,d,f,g,k)};function Sa(a,c,b,e){if(!a.length)return a;if(a.length===1)return a=a[0],a=b||a.length>c?a.slice(b,b+c):a,e?Ta.call(this,a):a;let d=[];for(let f=0,g,k;f<a.length;f++)if((g=a[f])&&(k=g.length)){if(b){if(b>=k){b-=k;continue}g=g.slice(b,b+c);k=g.length;b=0}k>c&&(g=g.slice(0,c),k=c);if(!d.length&&k>=c)return e?Ta.call(this,g):g;d.push(g);c-=k;if(!c)break}d=d.length>1?[].concat.apply([],d):d[0];return e?Ta.call(this,d):d};function Ua(a,c,b,e){var d=e[0];if(d[0]&&d[0].query)return a[c].apply(a,d);if(!(c!=="and"&&c!=="not"||a.result.length||a.await||d.suggest))return e.length>1&&(d=e[e.length-1]),(e=d.resolve)?a.await||a.result:a;let f=[],g=0,k=0,h,l,m,p,u;for(c=0;c<e.length;c++)if(d=e[c]){var r=void 0;if(d.constructor===flexsearch_bundle_module_min_X)r=d.await||d.result;else if(d.then||d.constructor===Array)r=d;else{g=d.limit||0;k=d.offset||0;m=d.suggest;l=d.resolve;h=((p=d.highlight||a.highlight)||d.enrich)&&l;r=d.queue;let t=d.async||r,n=d.index,
q=d.query;n?a.index||(a.index=n):n=a.index;if(q||d.tag){const x=d.field||d.pluck;x&&(!q||a.query&&!p||(a.query=q,a.field=x,a.highlight=p),n=n.index.get(x));if(r&&(u||a.await)){u=1;let v;const A=a.C.length,D=new Promise(function(F){v=F});(function(F,E){D.h=function(){E.index=null;E.resolve=!1;let B=t?F.searchAsync(E):F.search(E);if(B.then)return B.then(function(z){a.C[A]=z=z.result||z;v(z);return z});B=B.result||B;v(B);return B}})(n,Object.assign({},d));a.C.push(D);f[c]=D;continue}else d.resolve=!1,
d.index=null,r=t?n.searchAsync(d):n.search(d),d.resolve=l,d.index=n}else if(d.and)r=Va(d,"and",n);else if(d.or)r=Va(d,"or",n);else if(d.not)r=Va(d,"not",n);else if(d.xor)r=Va(d,"xor",n);else continue}r.await?(u=1,r=r.await):r.then?(u=1,r=r.then(function(t){return t.result||t})):r=r.result||r;f[c]=r}u&&!a.await&&(a.await=new Promise(function(t){a.return=t}));if(u){const t=Promise.all(f).then(function(n){for(let q=0;q<a.C.length;q++)if(a.C[q]===t){a.C[q]=function(){return b.call(a,n,g,k,h,l,m,p)};break}Wa(a)});
a.C.push(t)}else if(a.await)a.C.push(function(){return b.call(a,f,g,k,h,l,m,p)});else return b.call(a,f,g,k,h,l,m,p);return l?a.await||a.result:a}function Va(a,c,b){a=a[c];const e=a[0]||a;e.index||(e.index=b);b=new flexsearch_bundle_module_min_X(e);a.length>1&&(b=b[c].apply(b,a.slice(1)));return b};flexsearch_bundle_module_min_X.prototype.or=function(){return Ua(this,"or",Xa,arguments)};function Xa(a,c,b,e,d,f,g){a.length&&(this.result.length&&a.push(this.result),a.length<2?this.result=a[0]:(this.result=Ya(a,c,b,!1,this.h),b=0));d&&(this.await=null);return d?this.resolve(c,b,e,g):this};flexsearch_bundle_module_min_X.prototype.and=function(){return Ua(this,"and",Za,arguments)};function Za(a,c,b,e,d,f,g){if(!f&&!this.result.length)return d?this.result:this;let k;if(a.length)if(this.result.length&&a.unshift(this.result),a.length<2)this.result=a[0];else{let h=0;for(let l=0,m,p;l<a.length;l++)if((m=a[l])&&(p=m.length))h<p&&(h=p);else if(!f){h=0;break}h?(this.result=$a(a,h,c,b,f,this.h,d),k=!0):this.result=[]}else f||(this.result=a);d&&(this.await=null);return d?this.resolve(c,b,e,g,k):this};flexsearch_bundle_module_min_X.prototype.xor=function(){return Ua(this,"xor",ab,arguments)};
function ab(a,c,b,e,d,f,g){if(a.length)if(this.result.length&&a.unshift(this.result),a.length<2)this.result=a[0];else{a:{f=b;var k=this.h;const h=[],l=flexsearch_bundle_module_min_I();let m=0;for(let p=0,u;p<a.length;p++)if(u=a[p]){m<u.length&&(m=u.length);for(let r=0,t;r<u.length;r++)if(t=u[r])for(let n=0,q;n<t.length;n++)q=t[n],l[q]=l[q]?2:1}for(let p=0,u,r=0;p<m;p++)for(let t=0,n;t<a.length;t++)if(n=a[t])if(u=n[p])for(let q=0,x;q<u.length;q++)if(x=u[q],l[x]===1)if(f)f--;else if(d){if(h.push(x),h.length===c){a=h;break a}}else{const v=
p+(t?k:0);h[v]||(h[v]=[]);h[v].push(x);if(++r===c){a=h;break a}}a=h}this.result=a;k=!0}else f||(this.result=a);d&&(this.await=null);return d?this.resolve(c,b,e,g,k):this};flexsearch_bundle_module_min_X.prototype.not=function(){return Ua(this,"not",bb,arguments)};
function bb(a,c,b,e,d,f,g){if(!f&&!this.result.length)return d?this.result:this;if(a.length&&this.result.length){a:{f=b;var k=[];a=new Set(a.flat().flat());for(let h=0,l,m=0;h<this.result.length;h++)if(l=this.result[h])for(let p=0,u;p<l.length;p++)if(u=l[p],!a.has(u))if(f)f--;else if(d){if(k.push(u),k.length===c){a=k;break a}}else if(k[h]||(k[h]=[]),k[h].push(u),++m===c){a=k;break a}a=k}this.result=a;k=!0}d&&(this.await=null);return d?this.resolve(c,b,e,g,k):this};function flexsearch_bundle_module_min_cb(a,c,b,e,d){let f,g,k;typeof d==="string"?(f=d,d=""):f=d.template;g=f.indexOf("$1");k=f.substring(g+2);g=f.substring(0,g);let h=d&&d.boundary,l=!d||d.clip!==!1,m=d&&d.merge&&k&&g&&new RegExp(k+" "+g,"g");d=d&&d.ellipsis;var p=0;if(typeof d==="object"){var u=d.template;p=u.length-2;d=d.pattern}typeof d!=="string"&&(d=d===!1?"":"...");p&&(d=u.replace("$1",d));u=d.length-p;let r,t;typeof h==="object"&&(r=h.before,r===0&&(r=-1),t=h.after,t===0&&(t=-1),h=h.total||9E5);p=new Map;for(let Oa=0,
da,db,pa;Oa<c.length;Oa++){let qa;if(e)qa=c,pa=e;else{var n=c[Oa];pa=n.field;if(!pa)continue;qa=n.result}db=b.get(pa);da=db.encoder;n=p.get(da);typeof n!=="string"&&(n=da.encode(a),p.set(da,n));for(let ya=0;ya<qa.length;ya++){var q=qa[ya].doc;if(!q)continue;q=ca(q,pa);if(!q)continue;var x=q.trim().split(/\s+/);if(!x.length)continue;q="";var v=[];let za=[];var A=-1,D=-1,F=0;for(var E=0;E<x.length;E++){var B=x[E],z=da.encode(B);z=z.length>1?z.join(" "):z[0];let y;if(z&&B){var C=B.length,J=(da.split?
B.replace(da.split,""):B).length-z.length,G="",N=0;for(var O=0;O<n.length;O++){var P=n[O];if(P){var L=P.length;L+=J<0?0:J;N&&L<=N||(P=z.indexOf(P),P>-1&&(G=(P?B.substring(0,P):"")+g+B.substring(P,P+L)+k+(P+L<C?B.substring(P+L):""),N=L,y=!0))}}G&&(h&&(A<0&&(A=q.length+(q?1:0)),D=q.length+(q?1:0)+G.length,F+=C,za.push(v.length),v.push({match:G})),q+=(q?" ":"")+G)}if(!y)B=x[E],q+=(q?" ":"")+B,h&&v.push({text:B});else if(h&&F>=h)break}F=za.length*(f.length-2);if(r||t||h&&q.length-F>h)if(F=h+F-u*2,E=D-
A,r>0&&(E+=r),t>0&&(E+=t),E<=F)x=r?A-(r>0?r:0):A-((F-E)/2|0),v=t?D+(t>0?t:0):x+F,l||(x>0&&q.charAt(x)!==" "&&q.charAt(x-1)!==" "&&(x=q.indexOf(" ",x),x<0&&(x=0)),v<q.length&&q.charAt(v-1)!==" "&&q.charAt(v)!==" "&&(v=q.lastIndexOf(" ",v),v<D?v=D:++v)),q=(x?d:"")+q.substring(x,v)+(v<q.length?d:"");else{D=[];A={};F={};E={};B={};z={};G=J=C=0;for(O=N=1;;){var U=void 0;for(let y=0,K;y<za.length;y++){K=za[y];if(G)if(J!==G){if(E[y+1])continue;K+=G;if(A[K]){C-=u;F[y+1]=1;E[y+1]=1;continue}if(K>=v.length-
1){if(K>=v.length){E[y+1]=1;K>=x.length&&(F[y+1]=1);continue}C-=u}q=v[K].text;if(L=t&&z[y])if(L>0){if(q.length>L)if(E[y+1]=1,l)q=q.substring(0,L);else continue;(L-=q.length)||(L=-1);z[y]=L}else{E[y+1]=1;continue}if(C+q.length+1<=h)q=" "+q,D[y]+=q;else if(l)U=h-C-1,U>0&&(q=" "+q.substring(0,U),D[y]+=q),E[y+1]=1;else{E[y+1]=1;continue}}else{if(E[y])continue;K-=J;if(A[K]){C-=u;E[y]=1;F[y]=1;continue}if(K<=0){if(K<0){E[y]=1;F[y]=1;continue}C-=u}q=v[K].text;if(L=r&&B[y])if(L>0){if(q.length>L)if(E[y]=1,
l)q=q.substring(q.length-L);else continue;(L-=q.length)||(L=-1);B[y]=L}else{E[y]=1;continue}if(C+q.length+1<=h)q+=" ",D[y]=q+D[y];else if(l)U=q.length+1-(h-C),U>=0&&U<q.length&&(q=q.substring(U)+" ",D[y]=q+D[y]),E[y]=1;else{E[y]=1;continue}}else{q=v[K].match;r&&(B[y]=r);t&&(z[y]=t);y&&C++;let Pa;K?!y&&u&&(C+=u):(F[y]=1,E[y]=1);K>=x.length-1?Pa=1:K<v.length-1&&v[K+1].match?Pa=1:u&&(C+=u);C-=f.length-2;if(!y||C+q.length<=h)D[y]=q;else{U=N=O=F[y]=0;break}Pa&&(F[y+1]=1,E[y+1]=1)}C+=q.length;U=A[K]=1}if(U)J===
G?G++:J++;else{J===G?N=0:O=0;if(!N&&!O)break;N?(J++,G=J):G++}}q="";for(let y=0,K;y<D.length;y++)K=(F[y]?y?" ":"":(y&&!d?" ":"")+d)+D[y],q+=K;d&&!F[D.length]&&(q+=d)}m&&(q=q.replace(m," "));qa[ya].highlight=q}if(e)break}return c};function flexsearch_bundle_module_min_X(a,c){if(!this||this.constructor!==flexsearch_bundle_module_min_X)return new flexsearch_bundle_module_min_X(a,c);let b=0,e,d,f,g,k,h;if(a&&a.index){const l=a;c=l.index;b=l.boost||0;if(d=l.query){f=l.field||l.pluck;g=l.highlight;const m=l.resolve;a=l.async||l.queue;l.resolve=!1;l.index=null;a=a?c.searchAsync(l):c.search(l);l.resolve=m;l.index=c;a=a.result||a}else a=[]}if(a&&a.then){const l=this;a=a.then(function(m){l.C[0]=l.result=m.result||m;Wa(l)});e=[a];a=[];k=new Promise(function(m){h=m})}this.index=c||null;this.result=a||[];this.h=b;this.C=
e||[];this.await=k||null;this.return=h||null;this.highlight=g||null;this.query=d||"";this.field=f||""}flexsearch_bundle_module_min_w=flexsearch_bundle_module_min_X.prototype;flexsearch_bundle_module_min_w.limit=function(a){if(this.await){const c=this;this.C.push(function(){return c.limit(a).result})}else if(this.result.length){const c=[];for(let b=0,e;b<this.result.length;b++)if(e=this.result[b])if(e.length<=a){if(c[b]=e,a-=e.length,!a)break}else{c[b]=e.slice(0,a);break}this.result=c}return this};
flexsearch_bundle_module_min_w.offset=function(a){if(this.await){const c=this;this.C.push(function(){return c.offset(a).result})}else if(this.result.length){const c=[];for(let b=0,e;b<this.result.length;b++)if(e=this.result[b])e.length<=a?a-=e.length:(c[b]=e.slice(a),a=0);this.result=c}return this};flexsearch_bundle_module_min_w.boost=function(a){if(this.await){const c=this;this.C.push(function(){return c.boost(a).result})}else this.h+=a;return this};
function Wa(a,c){let b=a.result;var e=a.await;a.await=null;for(let d=0,f;d<a.C.length;d++)if(f=a.C[d])if(typeof f==="function")b=f(),a.C[d]=b=b.result||b,d--;else if(f.h)b=f.h(),a.C[d]=b=b.result||b,d--;else if(f.then)return a.await=e;e=a.return;a.C=[];a.return=null;c||e(b);return b}
flexsearch_bundle_module_min_w.resolve=function(a,c,b,e,d){let f=this.await?Wa(this,!0):this.result;if(f.then){const g=this;return f.then(function(){return g.resolve(a,c,b,e,d)})}f.length&&(typeof a==="object"?(e=a.highlight||this.highlight,b=!!e||a.enrich,c=a.offset,a=a.limit):(e=e||this.highlight,b=!!e||b),f=d?b?Ta.call(this.index,f):f:Sa.call(this.index,f,a||100,c,b));return this.finalize(f,e)};
flexsearch_bundle_module_min_w.finalize=function(a,c){if(a.then){const e=this;return a.then(function(d){return e.finalize(d,c)})}c&&a.length&&this.query&&(a=flexsearch_bundle_module_min_cb(this.query,a,this.index.index,this.field,c));const b=this.return;this.highlight=this.index=this.result=this.C=this.await=this.return=null;this.query=this.field="";b&&b(a);return a};function $a(a,c,b,e,d,f,g){const k=a.length;let h=[],l,m;l=flexsearch_bundle_module_min_I();for(let p=0,u,r,t,n;p<c;p++)for(let q=0;q<k;q++)if(t=a[q],p<t.length&&(u=t[p]))for(let x=0;x<u.length;x++){r=u[x];(m=l[r])?l[r]++:(m=0,l[r]=1);n=h[m]||(h[m]=[]);if(!g){let v=p+(q||!d?0:f||0);n=n[v]||(n[v]=[])}n.push(r);if(g&&b&&m===k-1&&n.length-e===b)return e?n.slice(e):n}if(a=h.length)if(d)h=h.length>1?Ya(h,b,e,g,f):(h=h[0])&&b&&h.length>b||e?h.slice(e,b+e):h;else{if(a<k)return[];h=h[a-1];if(b||e)if(g){if(h.length>b||e)h=h.slice(e,b+
e)}else{d=[];for(let p=0,u;p<h.length;p++)if(u=h[p])if(e&&u.length>e)e-=u.length;else{if(b&&u.length>b||e)u=u.slice(e,b+e),b-=u.length,e&&(e-=u.length);d.push(u);if(!b)break}h=d}}return h}
function Ya(a,c,b,e,d){const f=[],g=flexsearch_bundle_module_min_I();let k;var h=a.length;let l;if(e)for(d=h-1;d>=0;d--){if(l=(e=a[d])&&e.length)for(h=0;h<l;h++)if(k=e[h],!g[k])if(g[k]=1,b)b--;else if(f.push(k),f.length===c)return f}else for(let m=h-1,p,u=0;m>=0;m--){p=a[m];for(let r=0;r<p.length;r++)if(l=(e=p[r])&&e.length)for(let t=0;t<l;t++)if(k=e[t],!g[k])if(g[k]=1,b)b--;else{let n=(r+(m<h-1?d||0:0))/(m+1)|0;(f[n]||(f[n]=[])).push(k);if(++u===c)return f}}return f}
function eb(a,c,b,e,d){const f=flexsearch_bundle_module_min_I(),g=[];for(let k=0,h;k<c.length;k++){h=c[k];for(let l=0;l<h.length;l++)f[h[l]]=1}if(d)for(let k=0,h;k<a.length;k++){if(h=a[k],f[h])if(e)e--;else if(g.push(h),f[h]=0,b&&--b===0)break}else for(let k=0,h,l;k<a.result.length;k++)for(h=a.result[k],c=0;c<h.length;c++)l=h[c],f[l]&&((g[k]||(g[k]=[])).push(l),f[l]=0);return g};flexsearch_bundle_module_min_I();Na.prototype.search=function(a,c,b,e){b||(!c&&ba(a)?(b=a,a=""):ba(c)&&(b=c,c=0));let d=[];var f=[];let g;let k,h,l,m,p;let u=0,r=!0,t;if(b){b.constructor===Array&&(b={index:b});a=b.query||a;g=b.pluck;k=b.merge;l=b.boost;p=g||b.field||(p=b.index)&&(p.index?null:p);var n=this.tag&&b.tag;h=b.suggest;r=b.resolve!==!1;m=b.cache;t=r&&this.store&&b.highlight;var q=!!t||r&&this.store&&b.enrich;c=b.limit||c;var x=b.offset||0;c||(c=r?100:0);if(n&&(!this.db||!e)){n.constructor!==Array&&(n=[n]);var v=[];for(let B=
0,z;B<n.length;B++)if(z=n[B],z.field&&z.tag){var A=z.tag;if(A.constructor===Array)for(var D=0;D<A.length;D++)v.push(z.field,A[D]);else v.push(z.field,A)}else{A=Object.keys(z);for(let C=0,J,G;C<A.length;C++)if(J=A[C],G=z[J],G.constructor===Array)for(D=0;D<G.length;D++)v.push(J,G[D]);else v.push(J,G)}n=v;if(!a){f=[];if(v.length)for(n=0;n<v.length;n+=2){if(this.db){e=this.index.get(v[n]);if(!e)continue;f.push(e=e.db.tag(v[n+1],c,x,q))}else e=fb.call(this,v[n],v[n+1],c,x,q);d.push(r?{field:v[n],tag:v[n+
1],result:e}:[e])}if(f.length){const B=this;return Promise.all(f).then(function(z){for(let C=0;C<z.length;C++)r?d[C].result=z[C]:d[C]=z[C];return r?d:new flexsearch_bundle_module_min_X(d.length>1?$a(d,1,0,0,h,l):d[0],B)})}return r?d:new flexsearch_bundle_module_min_X(d.length>1?$a(d,1,0,0,h,l):d[0],this)}}r||g||!(p=p||this.field)||(flexsearch_bundle_module_min_M(p)?g=p:(p.constructor===Array&&p.length===1&&(p=p[0]),g=p.field||p.index));p&&p.constructor!==Array&&(p=[p])}p||(p=this.field);let F;v=(this.worker||this.db)&&!e&&[];for(let B=0,z,C,J;B<p.length;B++){C=p[B];if(this.db&&this.tag&&
!this.B[B])continue;let G;flexsearch_bundle_module_min_M(C)||(G=C,C=G.field,a=G.query||a,c=aa(G.limit,c),x=aa(G.offset,x),h=aa(G.suggest,h),t=r&&this.store&&aa(G.highlight,t),q=!!t||r&&this.store&&aa(G.enrich,q),m=aa(G.cache,m));if(e)z=e[B];else{A=G||b||{};D=A.enrich;var E=this.index.get(C);n&&(this.db&&(A.tag=n,A.field=p,F=E.db.support_tag_search),!F&&D&&(A.enrich=!1),F||(A.limit=0,A.offset=0));z=m?E.searchCache(a,n&&!F?0:c,A):E.search(a,n&&!F?0:c,A);n&&!F&&(A.limit=c,A.offset=x);D&&(A.enrich=D);if(v){v[B]=z;continue}}J=(z=
z.result||z)&&z.length;if(n&&J){A=[];D=0;if(this.db&&e){if(!F)for(E=p.length;E<e.length;E++){let N=e[E];if(N&&N.length)D++,A.push(N);else if(!h)return r?d:new flexsearch_bundle_module_min_X(d,this)}}else for(let N=0,O,P;N<n.length;N+=2){O=this.tag.get(n[N]);if(!O)if(h)continue;else return r?d:new flexsearch_bundle_module_min_X(d,this);if(P=(O=O&&O.get(n[N+1]))&&O.length)D++,A.push(O);else if(!h)return r?d:new flexsearch_bundle_module_min_X(d,this)}if(D){z=eb(z,A,c,x,r);J=z.length;if(!J&&!h)return r?z:new flexsearch_bundle_module_min_X(z,this);D--}}if(J)f[u]=C,d.push(z),u++;else if(p.length===1)return r?d:new flexsearch_bundle_module_min_X(d,
this)}if(v){if(this.db&&n&&n.length&&!F)for(q=0;q<n.length;q+=2){f=this.index.get(n[q]);if(!f)if(h)continue;else return r?d:new flexsearch_bundle_module_min_X(d,this);v.push(f.db.tag(n[q+1],c,x,!1))}const B=this;return Promise.all(v).then(function(z){b&&(b.resolve=r);z.length&&(z=B.search(a,c,b,z));return z})}if(!u)return r?d:new flexsearch_bundle_module_min_X(d,this);if(g&&(!q||!this.store))return d=d[0],r?d:new flexsearch_bundle_module_min_X(d,this);v=[];for(x=0;x<f.length;x++){n=d[x];q&&n.length&&typeof n[0].doc==="undefined"&&(this.db?v.push(n=this.index.get(this.field[0]).db.enrich(n)):
n=Ta.call(this,n));if(g)return r?t?flexsearch_bundle_module_min_cb(a,n,this.index,g,t):n:new flexsearch_bundle_module_min_X(n,this);d[x]={field:f[x],result:n}}if(q&&this.db&&v.length){const B=this;return Promise.all(v).then(function(z){for(let C=0;C<z.length;C++)d[C].result=z[C];t&&(d=flexsearch_bundle_module_min_cb(a,d,B.index,g,t));return k?gb(d):d})}t&&(d=flexsearch_bundle_module_min_cb(a,d,this.index,g,t));return k?gb(d):d};
function gb(a){const c=[],b=flexsearch_bundle_module_min_I(),e=flexsearch_bundle_module_min_I();for(let d=0,f,g,k,h,l,m,p;d<a.length;d++){f=a[d];g=f.field;k=f.result;for(let u=0;u<k.length;u++)if(l=k[u],typeof l!=="object"?l={id:h=l}:h=l.id,(m=b[h])?m.push(g):(l.field=b[h]=[g],c.push(l)),p=l.highlight)m=e[h],m||(e[h]=m={},l.highlight=m),m[g]=p}return c}function fb(a,c,b,e,d){a=this.tag.get(a);if(!a)return[];a=a.get(c);if(!a)return[];c=a.length-e;if(c>0){if(b&&c>b||e)a=a.slice(e,e+b);d&&(a=Ta.call(this,a))}return a}
function Ta(a){if(!this||!this.store)return a;if(this.db)return this.index.get(this.field[0]).db.enrich(a);const c=Array(a.length);for(let b=0,e;b<a.length;b++)e=a[b],c[b]={id:e,doc:this.store.get(e)};return c};function Na(a){if(!this||this.constructor!==Na)return new Na(a);const c=a.document||a.doc||a;let b,e;this.B=[];this.field=[];this.D=[];this.key=(b=c.key||c.id)&&hb(b,this.D)||"id";(e=a.keystore||0)&&(this.keystore=e);this.fastupdate=!!a.fastupdate;this.reg=!this.fastupdate||a.worker||a.db?e?new flexsearch_bundle_module_min_S(e):new Set:e?new flexsearch_bundle_module_min_R(e):new Map;this.h=(b=c.store||null)&&b&&b!==!0&&[];this.store=b?e?new flexsearch_bundle_module_min_R(e):new Map:null;this.cache=(b=a.cache||null)&&new ma(b);a.cache=!1;this.worker=a.worker||!1;this.priority=a.priority||
4;this.index=ib.call(this,a,c);this.tag=null;if(b=c.tag)if(typeof b==="string"&&(b=[b]),b.length){this.tag=new Map;this.A=[];this.F=[];for(let d=0,f,g;d<b.length;d++){f=b[d];g=f.field||f;if(!g)throw Error("The tag field from the document descriptor is undefined.");f.custom?this.A[d]=f.custom:(this.A[d]=hb(g,this.D),f.filter&&(typeof this.A[d]==="string"&&(this.A[d]=new String(this.A[d])),this.A[d].G=f.filter));this.F[d]=g;this.tag.set(g,new Map)}}if(this.worker){this.fastupdate=!1;a=[];for(const d of this.index.values())d.then&&
a.push(d);if(a.length){const d=this;return Promise.all(a).then(function(f){let g=0;for(const k of d.index.entries()){const h=k[0];let l=k[1];l.then&&(l=f[g],d.index.set(h,l),g++)}return d})}}else a.db&&(this.fastupdate=!1,this.mount(a.db))}flexsearch_bundle_module_min_w=Na.prototype;
flexsearch_bundle_module_min_w.mount=function(a){let c=this.field;if(this.tag)for(let f=0,g;f<this.F.length;f++){g=this.F[f];var b=void 0;this.index.set(g,b=new flexsearch_bundle_module_min_T({},this.reg));c===this.field&&(c=c.slice(0));c.push(g);b.tag=this.tag.get(g)}b=[];const e={db:a.db,type:a.type,fastupdate:a.fastupdate};for(let f=0,g,k;f<c.length;f++){e.field=k=c[f];g=this.index.get(k);const h=new a.constructor(a.id,e);h.id=a.id;b[f]=h.mount(g);g.document=!0;f?g.bypass=!0:g.store=this.store}const d=this;return this.db=Promise.all(b).then(function(){d.db=
!0})};flexsearch_bundle_module_min_w.commit=async function(){const a=[];for(const c of this.index.values())a.push(c.commit());await Promise.all(a);this.reg.clear()};flexsearch_bundle_module_min_w.destroy=function(){const a=[];for(const c of this.index.values())a.push(c.destroy());return Promise.all(a)};
function ib(a,c){const b=new Map;let e=c.index||c.field||c;flexsearch_bundle_module_min_M(e)&&(e=[e]);for(let f=0,g,k;f<e.length;f++){g=e[f];flexsearch_bundle_module_min_M(g)||(k=g,g=g.field);k=ba(k)?Object.assign({},a,k):a;if(this.worker){var d=void 0;d=(d=k.encoder)&&d.encode?d:new ka(typeof d==="string"?va[d]:d||{});d=new La(k,d);b.set(g,d)}this.worker||b.set(g,new flexsearch_bundle_module_min_T(k,this.reg));k.custom?this.B[f]=k.custom:(this.B[f]=hb(g,this.D),k.filter&&(typeof this.B[f]==="string"&&(this.B[f]=new String(this.B[f])),this.B[f].G=k.filter));this.field[f]=g}if(this.h){a=
c.store;flexsearch_bundle_module_min_M(a)&&(a=[a]);for(let f=0,g,k;f<a.length;f++)g=a[f],k=g.field||g,g.custom?(this.h[f]=g.custom,g.custom.O=k):(this.h[f]=hb(k,this.D),g.filter&&(typeof this.h[f]==="string"&&(this.h[f]=new String(this.h[f])),this.h[f].G=g.filter))}return b}function hb(a,c){const b=a.split(":");let e=0;for(let d=0;d<b.length;d++)a=b[d],a[a.length-1]==="]"&&(a=a.substring(0,a.length-2))&&(c[e]=!0),a&&(b[e++]=a);e<b.length&&(b.length=e);return e>1?b:b[0]}flexsearch_bundle_module_min_w.append=function(a,c){return this.add(a,c,!0)};
flexsearch_bundle_module_min_w.update=function(a,c){return this.remove(a).add(a,c)};flexsearch_bundle_module_min_w.remove=function(a){ba(a)&&(a=ca(a,this.key));for(var c of this.index.values())c.remove(a,!0);if(this.reg.has(a)){if(this.tag&&!this.fastupdate)for(let b of this.tag.values())for(let e of b){c=e[0];const d=e[1],f=d.indexOf(a);f>-1&&(d.length>1?d.splice(f,1):b.delete(c))}this.store&&this.store.delete(a);this.reg.delete(a)}this.cache&&this.cache.remove(a);return this};
flexsearch_bundle_module_min_w.clear=function(){const a=[];for(const c of this.index.values()){const b=c.clear();b.then&&a.push(b)}if(this.tag)for(const c of this.tag.values())c.clear();this.store&&this.store.clear();this.cache&&this.cache.clear();return a.length?Promise.all(a):this};flexsearch_bundle_module_min_w.contain=function(a){return this.db?this.index.get(this.field[0]).db.has(a):this.reg.has(a)};flexsearch_bundle_module_min_w.cleanup=function(){for(const a of this.index.values())a.cleanup();return this};
flexsearch_bundle_module_min_w.get=function(a){return this.db?this.index.get(this.field[0]).db.enrich(a).then(function(c){return c[0]&&c[0].doc||null}):this.store.get(a)||null};flexsearch_bundle_module_min_w.set=function(a,c){typeof a==="object"&&(c=a,a=ca(c,this.key));this.store.set(a,c);return this};flexsearch_bundle_module_min_w.searchCache=la;flexsearch_bundle_module_min_w.export=jb;flexsearch_bundle_module_min_w.import=kb;Fa(Na.prototype);function lb(a,c=0){let b=[],e=[];c&&(c=25E4/c*5E3|0);for(const d of a.entries())e.push(d),e.length===c&&(b.push(e),e=[]);e.length&&b.push(e);return b}function mb(a,c){c||(c=new Map);for(let b=0,e;b<a.length;b++)e=a[b],c.set(e[0],e[1]);return c}function nb(a,c=0){let b=[],e=[];c&&(c=25E4/c*1E3|0);for(const d of a.entries())e.push([d[0],lb(d[1])[0]||[]]),e.length===c&&(b.push(e),e=[]);e.length&&b.push(e);return b}
function ob(a,c){c||(c=new Map);for(let b=0,e,d;b<a.length;b++)e=a[b],d=c.get(e[0]),c.set(e[0],mb(e[1],d));return c}function pb(a){let c=[],b=[];for(const e of a.keys())b.push(e),b.length===25E4&&(c.push(b),b=[]);b.length&&c.push(b);return c}function qb(a,c){c||(c=new Set);for(let b=0;b<a.length;b++)c.add(a[b]);return c}
function rb(a,c,b,e,d,f,g=0){const k=e&&e.constructor===Array;var h=k?e.shift():e;if(!h)return this.export(a,c,d,f+1);if((h=a((c?c+".":"")+(g+1)+"."+b,JSON.stringify(h)))&&h.then){const l=this;return h.then(function(){return rb.call(l,a,c,b,k?e:null,d,f,g+1)})}return rb.call(this,a,c,b,k?e:null,d,f,g+1)}
function jb(a,c,b=0,e=0){if(b<this.field.length){const g=this.field[b];if((c=this.index.get(g).export(a,g,b,e=1))&&c.then){const k=this;return c.then(function(){return k.export(a,g,b+1)})}return this.export(a,g,b+1)}let d,f;switch(e){case 0:d="reg";f=pb(this.reg);c=null;break;case 1:d="tag";f=this.tag&&nb(this.tag,this.reg.size);c=null;break;case 2:d="doc";f=this.store&&lb(this.store);c=null;break;default:return}return rb.call(this,a,c,d,f||null,b,e)}
function kb(a,c){var b=a.split(".");b[b.length-1]==="json"&&b.pop();const e=b.length>2?b[0]:"";b=b.length>2?b[2]:b[1];if(this.worker&&e)return this.index.get(e).import(a);if(c){typeof c==="string"&&(c=JSON.parse(c));if(e)return this.index.get(e).import(b,c);switch(b){case "reg":this.fastupdate=!1;this.reg=qb(c,this.reg);for(let d=0,f;d<this.field.length;d++)f=this.index.get(this.field[d]),f.fastupdate=!1,f.reg=this.reg;if(this.worker){c=[];for(const d of this.index.values())c.push(d.import(a));return Promise.all(c)}break;
case "tag":this.tag=ob(c,this.tag);break;case "doc":this.store=mb(c,this.store)}}}function sb(a,c){let b="";for(const e of a.entries()){a=e[0];const d=e[1];let f="";for(let g=0,k;g<d.length;g++){k=d[g]||[""];let h="";for(let l=0;l<k.length;l++)h+=(h?",":"")+(c==="string"?'"'+k[l]+'"':k[l]);h="["+h+"]";f+=(f?",":"")+h}f='["'+a+'",['+f+"]]";b+=(b?",":"")+f}return b};flexsearch_bundle_module_min_T.prototype.remove=function(a,c){const b=this.reg.size&&(this.fastupdate?this.reg.get(a):this.reg.has(a));if(b){if(this.fastupdate)for(let e=0,d,f;e<b.length;e++){if((d=b[e])&&(f=d.length))if(d[f-1]===a)d.pop();else{const g=d.indexOf(a);g>=0&&d.splice(g,1)}}else tb(this.map,a),this.depth&&tb(this.ctx,a);c||this.reg.delete(a)}this.db&&(this.commit_task.push({del:a}),this.M&&ub(this));this.cache&&this.cache.remove(a);return this};
function tb(a,c){let b=0;var e=typeof c==="undefined";if(a.constructor===Array)for(let d=0,f,g,k;d<a.length;d++){if((f=a[d])&&f.length){if(e)return 1;g=f.indexOf(c);if(g>=0){if(f.length>1)return f.splice(g,1),1;delete a[d];if(b)return 1;k=1}else{if(k)return 1;b++}}}else for(let d of a.entries())e=d[0],tb(d[1],c)?b++:a.delete(e);return b};const vb={memory:{resolution:1},performance:{resolution:3,fastupdate:!0,context:{depth:1,resolution:1}},match:{tokenize:"forward"},score:{resolution:9,context:{depth:2,resolution:3}}};flexsearch_bundle_module_min_T.prototype.add=function(a,c,b,e){if(c&&(a||a===0)){if(!e&&!b&&this.reg.has(a))return this.update(a,c);e=this.depth;c=this.encoder.encode(c,!e);const l=c.length;if(l){const m=flexsearch_bundle_module_min_I(),p=flexsearch_bundle_module_min_I(),u=this.resolution;for(let r=0;r<l;r++){let t=c[this.rtl?l-1-r:r];var d=t.length;if(d&&(e||!p[t])){var f=this.score?this.score(c,t,r,null,0):wb(u,l,r),g="";switch(this.tokenize){case "tolerant":flexsearch_bundle_module_min_Y(this,p,t,f,a,b);if(d>2){for(let n=1,q,x,v,A;n<d-1;n++)q=t.charAt(n),x=t.charAt(n+1),v=t.substring(0,n)+x,A=t.substring(n+
2),g=v+q+A,flexsearch_bundle_module_min_Y(this,p,g,f,a,b),g=v+A,flexsearch_bundle_module_min_Y(this,p,g,f,a,b);flexsearch_bundle_module_min_Y(this,p,t.substring(0,t.length-1),f,a,b)}break;case "full":if(d>2){for(let n=0,q;n<d;n++)for(f=d;f>n;f--){g=t.substring(n,f);q=this.rtl?d-1-n:n;var k=this.score?this.score(c,t,r,g,q):wb(u,l,r,d,q);flexsearch_bundle_module_min_Y(this,p,g,k,a,b)}break}case "bidirectional":case "reverse":if(d>1){for(k=d-1;k>0;k--){g=t[this.rtl?d-1-k:k]+g;var h=this.score?this.score(c,t,r,g,k):wb(u,l,r,d,k);flexsearch_bundle_module_min_Y(this,p,g,h,a,b)}g=""}case "forward":if(d>1){for(k=0;k<d;k++)g+=t[this.rtl?d-1-k:k],flexsearch_bundle_module_min_Y(this,
p,g,f,a,b);break}default:if(flexsearch_bundle_module_min_Y(this,p,t,f,a,b),e&&l>1&&r<l-1)for(d=this.N,g=t,f=Math.min(e+1,this.rtl?r+1:l-r),k=1;k<f;k++){t=c[this.rtl?l-1-r-k:r+k];h=this.bidirectional&&t>g;const n=this.score?this.score(c,g,r,t,k-1):wb(d+(l/2>d?0:1),l,r,f-1,k-1);flexsearch_bundle_module_min_Y(this,m,h?g:t,n,a,b,h?t:g)}}}}this.fastupdate||this.reg.add(a)}}this.db&&(this.commit_task.push(b?{ins:a}:{del:a}),this.M&&ub(this));return this};
function flexsearch_bundle_module_min_Y(a,c,b,e,d,f,g){let k,h;if(!(k=c[b])||g&&!k[g]){g?(c=k||(c[b]=flexsearch_bundle_module_min_I()),c[g]=1,h=a.ctx,(k=h.get(g))?h=k:h.set(g,h=a.keystore?new flexsearch_bundle_module_min_R(a.keystore):new Map)):(h=a.map,c[b]=1);(k=h.get(b))?h=k:h.set(b,h=k=[]);if(f)for(let l=0,m;l<k.length;l++)if((m=k[l])&&m.includes(d)){if(l<=e)return;m.splice(m.indexOf(d),1);a.fastupdate&&(c=a.reg.get(d))&&c.splice(c.indexOf(m),1);break}h=h[e]||(h[e]=[]);h.push(d);if(h.length===2**31-1){c=new xa(h);if(a.fastupdate)for(let l of a.reg.values())l.includes(h)&&(l[l.indexOf(h)]=
c);k[e]=h=c}a.fastupdate&&((e=a.reg.get(d))?e.push(h):a.reg.set(d,[h]))}}function wb(a,c,b,e,d){return b&&a>1?c+(e||0)<=a?b+(d||0):(a-1)/(c+(e||0))*(b+(d||0))+1|0:0};flexsearch_bundle_module_min_T.prototype.search=function(a,c,b){b||(c||typeof a!=="object"?typeof c==="object"&&(b=c,c=0):(b=a,a=""));if(b&&b.cache)return b.cache=!1,a=this.searchCache(a,c,b),b.cache=!0,a;let e=[],d,f,g,k=0,h,l,m,p,u;b&&(a=b.query||a,c=b.limit||c,k=b.offset||0,f=b.context,g=b.suggest,u=(h=b.resolve)&&b.enrich,m=b.boost,p=b.resolution,l=this.db&&b.tag);typeof h==="undefined"&&(h=this.resolve);f=this.depth&&f!==!1;let r=this.encoder.encode(a,!f);d=r.length;c=c||(h?100:0);if(d===1)return xb.call(this,r[0],"",c,
k,h,u,l);if(d===2&&f&&!g)return xb.call(this,r[1],r[0],c,k,h,u,l);let t=flexsearch_bundle_module_min_I(),n=0,q;f&&(q=r[0],n=1);p||p===0||(p=q?this.N:this.resolution);if(this.db){if(this.db.search&&(b=this.db.search(this,r,c,k,g,h,u,l),b!==!1))return b;const x=this;return async function(){for(let v,A;n<d;n++){if((A=r[n])&&!t[A]){t[A]=1;v=await yb(x,A,q,0,0,!1,!1);if(v=zb(v,e,g,p)){e=v;break}q&&(g&&v&&e.length||(q=A))}g&&q&&n===d-1&&!e.length&&(p=x.resolution,q="",n=-1,t=flexsearch_bundle_module_min_I())}return Ab(e,p,c,k,g,m,h)}()}for(let x,v;n<d;n++){if((v=
r[n])&&!t[v]){t[v]=1;x=yb(this,v,q,0,0,!1,!1);if(x=zb(x,e,g,p)){e=x;break}q&&(g&&x&&e.length||(q=v))}g&&q&&n===d-1&&!e.length&&(p=this.resolution,q="",n=-1,t=flexsearch_bundle_module_min_I())}return Ab(e,p,c,k,g,m,h)};function Ab(a,c,b,e,d,f,g){let k=a.length,h=a;if(k>1)h=$a(a,c,b,e,d,f,g);else if(k===1)return g?Sa.call(null,a[0],b,e):new flexsearch_bundle_module_min_X(a[0],this);return g?h:new flexsearch_bundle_module_min_X(h,this)}
function xb(a,c,b,e,d,f,g){a=yb(this,a,c,b,e,d,f,g);return this.db?a.then(function(k){return d?k||[]:new flexsearch_bundle_module_min_X(k,this)}):a&&a.length?d?Sa.call(this,a,b,e):new flexsearch_bundle_module_min_X(a,this):d?[]:new flexsearch_bundle_module_min_X([],this)}function zb(a,c,b,e){let d=[];if(a&&a.length){if(a.length<=e){c.push(a);return}for(let f=0,g;f<e;f++)if(g=a[f])d[f]=g;if(d.length){c.push(d);return}}if(!b)return d}
function yb(a,c,b,e,d,f,g,k){let h;b&&(h=a.bidirectional&&c>b)&&(h=b,b=c,c=h);if(a.db)return a.db.get(c,b,e,d,f,g,k);a=b?(a=a.ctx.get(b))&&a.get(c):a.map.get(c);return a};function flexsearch_bundle_module_min_T(a,c){if(!this||this.constructor!==flexsearch_bundle_module_min_T)return new flexsearch_bundle_module_min_T(a);if(a){var b=flexsearch_bundle_module_min_M(a)?a:a.preset;b&&(a=Object.assign({},vb[b],a))}else a={};b=a.context;const e=b===!0?{depth:1}:b||{},d=flexsearch_bundle_module_min_M(a.encoder)?va[a.encoder]:a.encode||a.encoder||{};this.encoder=d.encode?d:typeof d==="object"?new ka(d):{encode:d};this.resolution=a.resolution||9;this.tokenize=b=(b=a.tokenize)&&b!=="default"&&b!=="exact"&&b||"strict";this.depth=b==="strict"&&e.depth||0;this.bidirectional=e.bidirectional!==!1;this.fastupdate=!!a.fastupdate;
this.score=a.score||null;(b=a.keystore||0)&&(this.keystore=b);this.map=b?new flexsearch_bundle_module_min_R(b):new Map;this.ctx=b?new flexsearch_bundle_module_min_R(b):new Map;this.reg=c||(this.fastupdate?b?new flexsearch_bundle_module_min_R(b):new Map:b?new flexsearch_bundle_module_min_S(b):new Set);this.N=e.resolution||3;this.rtl=d.rtl||a.rtl||!1;this.cache=(b=a.cache||null)&&new ma(b);this.resolve=a.resolve!==!1;if(b=a.db)this.db=this.mount(b);this.M=a.commit!==!1;this.commit_task=[];this.commit_timer=null;this.priority=a.priority||4}flexsearch_bundle_module_min_w=flexsearch_bundle_module_min_T.prototype;
flexsearch_bundle_module_min_w.mount=function(a){this.commit_timer&&(clearTimeout(this.commit_timer),this.commit_timer=null);return a.mount(this)};flexsearch_bundle_module_min_w.commit=function(){this.commit_timer&&(clearTimeout(this.commit_timer),this.commit_timer=null);return this.db.commit(this)};flexsearch_bundle_module_min_w.destroy=function(){this.commit_timer&&(clearTimeout(this.commit_timer),this.commit_timer=null);return this.db.destroy()};function ub(a){a.commit_timer||(a.commit_timer=setTimeout(function(){a.commit_timer=null;a.db.commit(a)},1))}
flexsearch_bundle_module_min_w.clear=function(){this.map.clear();this.ctx.clear();this.reg.clear();this.cache&&this.cache.clear();return this.db?(this.commit_timer&&clearTimeout(this.commit_timer),this.commit_timer=null,this.commit_task=[],this.db.clear()):this};flexsearch_bundle_module_min_w.append=function(a,c){return this.add(a,c,!0)};flexsearch_bundle_module_min_w.contain=function(a){return this.db?this.db.has(a):this.reg.has(a)};flexsearch_bundle_module_min_w.update=function(a,c){const b=this,e=this.remove(a);return e&&e.then?e.then(()=>b.add(a,c)):this.add(a,c)};
flexsearch_bundle_module_min_w.cleanup=function(){if(!this.fastupdate)return this;tb(this.map);this.depth&&tb(this.ctx);return this};flexsearch_bundle_module_min_w.searchCache=la;flexsearch_bundle_module_min_w.export=function(a,c,b=0,e=0){let d,f;switch(e){case 0:d="reg";f=pb(this.reg);break;case 1:d="cfg";f=null;break;case 2:d="map";f=lb(this.map,this.reg.size);break;case 3:d="ctx";f=nb(this.ctx,this.reg.size);break;default:return}return rb.call(this,a,c,d,f,b,e)};
flexsearch_bundle_module_min_w.import=function(a,c){if(c)switch(typeof c==="string"&&(c=JSON.parse(c)),a=a.split("."),a[a.length-1]==="json"&&a.pop(),a.length===3&&a.shift(),a=a.length>1?a[1]:a[0],a){case "reg":this.fastupdate=!1;this.reg=qb(c,this.reg);break;case "map":this.map=mb(c,this.map);break;case "ctx":this.ctx=ob(c,this.ctx)}};
flexsearch_bundle_module_min_w.serialize=function(a=!0){let c="",b="",e="";if(this.reg.size){let f;for(var d of this.reg.keys())f||(f=typeof d),c+=(c?",":"")+(f==="string"?'"'+d+'"':d);c="index.reg=new Set(["+c+"]);";b=sb(this.map,f);b="index.map=new Map(["+b+"]);";for(const g of this.ctx.entries()){d=g[0];let k=sb(g[1],f);k="new Map(["+k+"])";k='["'+d+'",'+k+"]";e+=(e?",":"")+k}e="index.ctx=new Map(["+e+"]);"}return a?"function inject(index){"+c+b+e+"}":c+b+e};Fa(flexsearch_bundle_module_min_T.prototype);const Bb=typeof window!=="undefined"&&(window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB),Cb=["map","ctx","tag","reg","cfg"],Db=flexsearch_bundle_module_min_I();
function Eb(a,c={}){if(!this||this.constructor!==Eb)return new Eb(a,c);typeof a==="object"&&(c=a,a=a.name);a||console.info("Default storage space was used, because a name was not passed.");this.id="flexsearch"+(a?":"+a.toLowerCase().replace(/[^a-z0-9_\-]/g,""):"");this.field=c.field?c.field.toLowerCase().replace(/[^a-z0-9_\-]/g,""):"";this.type=c.type;this.fastupdate=this.support_tag_search=!1;this.db=null;this.h={}}flexsearch_bundle_module_min_w=Eb.prototype;flexsearch_bundle_module_min_w.mount=function(a){if(a.index)return a.mount(this);a.db=this;return this.open()};
flexsearch_bundle_module_min_w.open=function(){if(this.db)return this.db;let a=this;navigator.storage&&navigator.storage.persist&&navigator.storage.persist();Db[a.id]||(Db[a.id]=[]);Db[a.id].push(a.field);const c=Bb.open(a.id,1);c.onupgradeneeded=function(){const b=a.db=this.result;for(let e=0,d;e<Cb.length;e++){d=Cb[e];for(let f=0,g;f<Db[a.id].length;f++)g=Db[a.id][f],b.objectStoreNames.contains(d+(d!=="reg"?g?":"+g:"":""))||b.createObjectStore(d+(d!=="reg"?g?":"+g:"":""))}};return a.db=Z(c,function(b){a.db=b;a.db.onversionchange=
function(){a.close()}})};flexsearch_bundle_module_min_w.close=function(){this.db&&this.db.close();this.db=null};flexsearch_bundle_module_min_w.destroy=function(){const a=Bb.deleteDatabase(this.id);return Z(a)};flexsearch_bundle_module_min_w.clear=function(){const a=[];for(let b=0,e;b<Cb.length;b++){e=Cb[b];for(let d=0,f;d<Db[this.id].length;d++)f=Db[this.id][d],a.push(e+(e!=="reg"?f?":"+f:"":""))}const c=this.db.transaction(a,"readwrite");for(let b=0;b<a.length;b++)c.objectStore(a[b]).clear();return Z(c)};
flexsearch_bundle_module_min_w.get=function(a,c,b=0,e=0,d=!0,f=!1){a=this.db.transaction((c?"ctx":"map")+(this.field?":"+this.field:""),"readonly").objectStore((c?"ctx":"map")+(this.field?":"+this.field:"")).get(c?c+":"+a:a);const g=this;return Z(a).then(function(k){let h=[];if(!k||!k.length)return h;if(d){if(!b&&!e&&k.length===1)return k[0];for(let l=0,m;l<k.length;l++)if((m=k[l])&&m.length){if(e>=m.length){e-=m.length;continue}const p=b?e+Math.min(m.length-e,b):m.length;for(let u=e;u<p;u++)h.push(m[u]);e=0;if(h.length===b)break}return f?
g.enrich(h):h}return k})};flexsearch_bundle_module_min_w.tag=function(a,c=0,b=0,e=!1){a=this.db.transaction("tag"+(this.field?":"+this.field:""),"readonly").objectStore("tag"+(this.field?":"+this.field:"")).get(a);const d=this;return Z(a).then(function(f){if(!f||!f.length||b>=f.length)return[];if(!c&&!b)return f;f=f.slice(b,b+c);return e?d.enrich(f):f})};
flexsearch_bundle_module_min_w.enrich=function(a){typeof a!=="object"&&(a=[a]);const c=this.db.transaction("reg","readonly").objectStore("reg"),b=[];for(let e=0;e<a.length;e++)b[e]=Z(c.get(a[e]));return Promise.all(b).then(function(e){for(let d=0;d<e.length;d++)e[d]={id:a[d],doc:e[d]?JSON.parse(e[d]):null};return e})};flexsearch_bundle_module_min_w.has=function(a){a=this.db.transaction("reg","readonly").objectStore("reg").getKey(a);return Z(a).then(function(c){return!!c})};flexsearch_bundle_module_min_w.search=null;flexsearch_bundle_module_min_w.info=function(){};
flexsearch_bundle_module_min_w.transaction=function(a,c,b){a+=a!=="reg"?this.field?":"+this.field:"":"";let e=this.h[a+":"+c];if(e)return b.call(this,e);let d=this.db.transaction(a,c);this.h[a+":"+c]=e=d.objectStore(a);const f=b.call(this,e);this.h[a+":"+c]=null;return Z(d).finally(function(){return f})};
flexsearch_bundle_module_min_w.commit=async function(a){let c=a.commit_task,b=[];a.commit_task=[];for(let e=0,d;e<c.length;e++)d=c[e],d.del&&b.push(d.del);b.length&&await this.remove(b);a.reg.size&&(await this.transaction("map","readwrite",function(e){for(const d of a.map){const f=d[0],g=d[1];g.length&&(e.get(f).onsuccess=function(){let k=this.result;var h;if(k&&k.length){const l=Math.max(k.length,g.length);for(let m=0,p,u;m<l;m++)if((u=g[m])&&u.length){if((p=k[m])&&p.length)for(h=0;h<u.length;h++)p.push(u[h]);else k[m]=u;h=
1}}else k=g,h=1;h&&e.put(k,f)})}}),await this.transaction("ctx","readwrite",function(e){for(const d of a.ctx){const f=d[0],g=d[1];for(const k of g){const h=k[0],l=k[1];l.length&&(e.get(f+":"+h).onsuccess=function(){let m=this.result;var p;if(m&&m.length){const u=Math.max(m.length,l.length);for(let r=0,t,n;r<u;r++)if((n=l[r])&&n.length){if((t=m[r])&&t.length)for(p=0;p<n.length;p++)t.push(n[p]);else m[r]=n;p=1}}else m=l,p=1;p&&e.put(m,f+":"+h)})}}}),a.store?await this.transaction("reg","readwrite",
function(e){for(const d of a.store){const f=d[0],g=d[1];e.put(typeof g==="object"?JSON.stringify(g):1,f)}}):a.bypass||await this.transaction("reg","readwrite",function(e){for(const d of a.reg.keys())e.put(1,d)}),a.tag&&await this.transaction("tag","readwrite",function(e){for(const d of a.tag){const f=d[0],g=d[1];g.length&&(e.get(f).onsuccess=function(){let k=this.result;k=k&&k.length?k.concat(g):g;e.put(k,f)})}}),a.map.clear(),a.ctx.clear(),a.tag&&a.tag.clear(),a.store&&a.store.clear(),a.document||
a.reg.clear())};function Fb(a,c,b){const e=a.value;let d,f=0;for(let g=0,k;g<e.length;g++){if(k=b?e:e[g]){for(let h=0,l,m;h<c.length;h++)if(m=c[h],l=k.indexOf(m),l>=0)if(d=1,k.length>1)k.splice(l,1);else{e[g]=[];break}f+=k.length}if(b)break}f?d&&a.update(e):a.delete();a.continue()}
flexsearch_bundle_module_min_w.remove=function(a){typeof a!=="object"&&(a=[a]);return Promise.all([this.transaction("map","readwrite",function(c){c.openCursor().onsuccess=function(){const b=this.result;b&&Fb(b,a)}}),this.transaction("ctx","readwrite",function(c){c.openCursor().onsuccess=function(){const b=this.result;b&&Fb(b,a)}}),this.transaction("tag","readwrite",function(c){c.openCursor().onsuccess=function(){const b=this.result;b&&Fb(b,a,!0)}}),this.transaction("reg","readwrite",function(c){for(let b=0;b<a.length;b++)c.delete(a[b])})])};
function Z(a,c){return new Promise((b,e)=>{a.onsuccess=a.oncomplete=function(){c&&c(this.result);c=null;b(this.result)};a.onerror=a.onblocked=e;a=null})};/* export default */ var flexsearch_bundle_module_min = ((/* unused pure expression or super */ null && ({Index:flexsearch_bundle_module_min_T,Charset:va,Encoder:ka,Document:Na,Worker:La,Resolver:flexsearch_bundle_module_min_X,IndexedDB:Eb,Language:{}})));
const Index=(/* unused pure expression or super */ null && (flexsearch_bundle_module_min_T));const Charset=(/* unused pure expression or super */ null && (va));const Encoder=(/* unused pure expression or super */ null && (ka));const Document=Na;const Worker=(/* unused pure expression or super */ null && (La));const Resolver=(/* unused pure expression or super */ null && (flexsearch_bundle_module_min_X));const IndexedDB=(/* unused pure expression or super */ null && (Eb));const Language=(/* unused pure expression or super */ null && ({}));
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/logic/Provider.js
const LOCAL_INDEX = 'default';
class Provider {
    async init(_options) {
        throw new Error('Not implemented');
    }
    async fetchSearchIndex(_options) {
        throw new Error('Not implemented');
    }
    search(_query) {
        throw new Error('Not implemented');
    }
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/logic/providers/LocalProvider.js





function getSearchIndexURL(lang, version) {
    const searchIndexGroupID = `${version ?? ''}###${lang ?? ''}`;
    const searchIndexHashValue = usePages/* .searchIndexHash */.zE[searchIndexGroupID];
    if (!searchIndexHashValue) return;
    const searchIndexVersion = version ? `.${version.replace('.', '_')}` : '';
    const searchIndexLang = lang ? `.${lang}` : '';
    return `${(0,dist/* .removeTrailingSlash */.UC)(__webpack_require__.p)}/static/${dist/* .SEARCH_INDEX_NAME */.OK}${searchIndexVersion}${searchIndexLang}.${searchIndexHashValue}.json`;
}
const cjkRegex = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]|[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]|[\u3041-\u3096]|[\u30A1-\u30FA]/giu;
const LocalProvider_cyrillicRegex = /[\u0400-\u04FF]/g;
function tokenize(str, regex) {
    const words = [];
    let m;
    do {
        m = regex.exec(str);
        if (m) words.push(m[0]);
    }while (m);
    return words;
}
class LocalProvider {
    #index;
    #cjkIndex;
    #cyrillicIndex;
    #fetchPromise;
    async #getPages(lang, version) {
        const searchIndexURL = getSearchIndexURL(lang, version);
        if (!searchIndexURL) return [];
        const handleError = (result)=>{
            console.error('Failed to fetch search index, please reload the page and try again.');
            console.error(result);
            throw result instanceof Error ? result : new Error('Failed to fetch search index');
        };
        try {
            const result = await fetch(searchIndexURL);
            if (result.ok) return result.json();
            throw result;
        } catch (error) {
            return handleError(error);
        }
    }
    async fetchSearchIndex(options) {
        if (this.#fetchPromise) return this.#fetchPromise;
        const { currentLang, currentVersion } = options;
        const versioned = options.versioned ?? true;
        this.#fetchPromise = this.#getPages(currentLang, versioned ? currentVersion : '').catch((error)=>{
            this.#fetchPromise = void 0;
            throw error;
        });
        return this.#fetchPromise;
    }
    async init(options) {
        const pagesForSearch = (await this.fetchSearchIndex(options)).map((page)=>({
                ...page,
                normalizedContent: normalizeTextCase(page.content),
                headers: page.toc.map((header)=>normalizeTextCase(header.text)).join(' '),
                normalizedTitle: normalizeTextCase(page.title)
            }));
        const createOptions = {
            tokenize: 'full',
            document: {
                id: 'id',
                store: true,
                index: [
                    'normalizedTitle',
                    'headers',
                    'normalizedContent'
                ]
            },
            cache: 100
        };
        this.#index = new Document({
            ...createOptions,
            encoder: {
                maxlength: 64
            }
        });
        this.#cjkIndex = new Document({
            ...createOptions,
            encoder: {
                finalize: (str)=>str.flatMap((s)=>tokenize(s, cjkRegex))
            }
        });
        this.#cyrillicIndex = new Document({
            ...createOptions,
            encoder: {
                finalize: (str)=>str.flatMap((s)=>tokenize(s, LocalProvider_cyrillicRegex))
            }
        });
        const pending = [];
        for (const item of pagesForSearch){
            const flexSearchItem = item;
            pending.push(this.#index.addAsync(item.routePath, flexSearchItem), this.#cjkIndex.addAsync(item.routePath, flexSearchItem), this.#cyrillicIndex.addAsync(item.routePath, flexSearchItem));
        }
        await Promise.all(pending);
    }
    async search(query) {
        const { keyword, limit } = query;
        const options = {
            enrich: true,
            limit,
            index: [
                'normalizedTitle',
                'headers',
                'normalizedContent'
            ]
        };
        const searchResult = await Promise.all([
            this.#index?.searchAsync(keyword, options),
            this.#cjkIndex?.searchAsync(keyword, options),
            this.#cyrillicIndex?.searchAsync(keyword, options)
        ]);
        const combinedSearchResult = [];
        const pushedId = new Set();
        function insertCombinedSearchResult(resultFromOneSearchIndex) {
            for (const item of resultFromOneSearchIndex)item.result.forEach((resultItem)=>{
                const id = resultItem.id;
                if (pushedId.has(id)) return;
                pushedId.add(id);
                if (resultItem.doc) combinedSearchResult.push(resultItem.doc);
            });
        }
        searchResult.forEach((searchResultItem)=>{
            searchResultItem && insertCombinedSearchResult(searchResultItem);
        });
        return [
            {
                index: LOCAL_INDEX,
                hits: combinedSearchResult
            }
        ];
    }
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/logic/search.js




const THRESHOLD_CONTENT_LENGTH = 100;
class PageSearcher {
    #options;
    #indexName = LOCAL_INDEX;
    #provider;
    constructor(options){
        this.#options = options;
        this.#indexName = options.indexName ?? LOCAL_INDEX;
        this.#provider = new LocalProvider();
    }
    async init() {
        await this.#provider?.init(this.#options);
    }
    async fetchSearchIndex() {
        return this.#provider?.fetchSearchIndex(this.#options);
    }
    async match(keyword) {
        let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 7;
        const searchResult = await this.#provider?.search({
            keyword,
            limit
        });
        const normalizedKeyWord = normalizeTextCase(keyword);
        const currentIndexInfo = searchResult?.find((res)=>this.#isCurrentIndex(res.index)) || {
            index: LOCAL_INDEX,
            renderType: types_RenderType.Default,
            hits: []
        };
        const matchResult = [
            {
                group: this.#indexName,
                renderType: types_RenderType.Default,
                result: this.#matchResultItem(normalizedKeyWord, currentIndexInfo)
            },
            ...(searchResult?.filter((res)=>!this.#isCurrentIndex(res.index)) || []).map((res)=>({
                    group: res.index,
                    renderType: types_RenderType.Default,
                    result: this.#matchResultItem(normalizedKeyWord, res)
                }))
        ];
        return matchResult;
    }
    #matchResultItem(normalizedKeyWord, resultItem) {
        const matchedResult = [];
        resultItem?.hits.forEach((item)=>{
            this.#matchTitle(item, normalizedKeyWord, matchedResult);
            const matchHeaderSet = this.#matchHeader(item, normalizedKeyWord, matchedResult);
            this.#matchContent(item, normalizedKeyWord, matchedResult, matchHeaderSet);
        });
        return matchedResult;
    }
    #matchTitle(item, query, matchedResult) {
        const { title = '' } = item;
        const normalizedTitle = normalizeTextCase(title);
        if (normalizedTitle.includes(query)) {
            matchedResult.push({
                type: 'title',
                title,
                header: title,
                link: item.routePath,
                query,
                highlightInfoList: [
                    {
                        start: normalizedTitle.indexOf(query),
                        length: getStrByteLength(query)
                    }
                ]
            });
            return true;
        }
        return false;
    }
    #matchHeader(item, query, matchedResult) {
        const matchHeaderSet = new WeakSet();
        const { toc = [], title = '' } = item;
        for (const [index, header] of toc.entries()){
            const normalizedHeader = normalizeTextCase(header.text);
            if (normalizedHeader.includes(query)) {
                const headerGroup = backTrackHeaders(toc, index);
                const headerStr = headerGroup.map((item)=>item.text).join(' > ');
                const headerMatchIndex = normalizeTextCase(headerStr).indexOf(query);
                const titlePrefix = `${title} > `;
                matchedResult.push({
                    type: 'header',
                    title: item.title,
                    header: `${titlePrefix}${headerStr}`,
                    highlightInfoList: [
                        {
                            start: headerMatchIndex + titlePrefix.length,
                            length: getStrByteLength(query)
                        }
                    ],
                    link: `${item.routePath}#${header.id}`,
                    query
                });
                matchHeaderSet.add(header);
            }
        }
        return matchHeaderSet;
    }
    #matchContent(item, query, matchedResult, matchHeaderSet) {
        const { content, toc } = item;
        if (!content.length) return;
        const normalizedContent = normalizeTextCase(content);
        let queryIndex = normalizedContent.indexOf(query);
        const headersIndex = toc.map((h)=>h.charIndex);
        const getCurrentHeader = (currentIndex)=>{
            const currentHeaderIndex = headersIndex.findIndex((hIndex, position)=>{
                if (!(position < toc.length - 1)) return hIndex < currentIndex;
                else {
                    const next = headersIndex[position + 1];
                    if (hIndex <= currentIndex && next >= currentIndex) return true;
                }
                return false;
            });
            return toc[currentHeaderIndex];
        };
        const isHeaderMatched = (header)=>header && matchHeaderSet?.has(header);
        if (-1 === queryIndex) {
            const highlightItems = item._matchesPosition?.content;
            if (!highlightItems?.length) return;
            const highlightStartIndex = item._matchesPosition.content[0].start;
            const currentHeader = getCurrentHeader(highlightStartIndex);
            if (isHeaderMatched(currentHeader)) return;
            const statementStartIndex = byteToCharIndex(content, highlightStartIndex);
            const statementEndIndex = byteToCharIndex(content, highlightStartIndex + THRESHOLD_CONTENT_LENGTH);
            const statement = content.slice(statementStartIndex, statementEndIndex);
            const highlightInfoList = [];
            const limitIndex = highlightStartIndex + THRESHOLD_CONTENT_LENGTH;
            for (const match of item._matchesPosition?.content || []){
                const { start, length } = match;
                if (start >= highlightStartIndex && start + length <= limitIndex) {
                    const startCharIndex = byteToCharIndex(content, start) - statementStartIndex + 3;
                    highlightInfoList.push({
                        start: startCharIndex,
                        length
                    });
                }
            }
            matchedResult.push({
                type: 'content',
                title: item.title,
                header: currentHeader?.text ?? item.title,
                link: `${item.routePath}${currentHeader ? `#${currentHeader.id}` : ''}`,
                query,
                highlightInfoList,
                statement: `...${statement}...`
            });
            return;
        }
        while(-1 !== queryIndex){
            const currentHeader = getCurrentHeader(queryIndex);
            let statementStartIndex = content.slice(0, queryIndex).lastIndexOf('\n');
            statementStartIndex = -1 === statementStartIndex ? 0 : statementStartIndex;
            let statementEndIndex = content.indexOf('\n\n', queryIndex + query.length);
            statementEndIndex = -1 === statementEndIndex ? content.length : statementEndIndex;
            let statement = content.slice(statementStartIndex, statementEndIndex);
            statement = this.#normalizeStatement(statement, query);
            const highlightIndex = normalizeTextCase(statement).indexOf(normalizeTextCase(query));
            const highlightInfoList = [
                {
                    start: highlightIndex,
                    length: getStrByteLength(query)
                }
            ];
            if (!isHeaderMatched(currentHeader)) {
                matchedResult.push({
                    type: 'content',
                    title: item.title,
                    header: currentHeader?.text ?? item.title,
                    statement,
                    highlightInfoList,
                    link: `${item.routePath}${currentHeader ? `#${currentHeader.id}` : ''}`,
                    query
                });
                currentHeader && matchHeaderSet?.add(currentHeader);
            }
            queryIndex = normalizedContent.indexOf(query, queryIndex + statement.length - highlightIndex);
        }
    }
    #normalizeStatement(statement, query) {
        if (statement.length <= THRESHOLD_CONTENT_LENGTH) return statement;
        const queryIndex = normalizeTextCase(statement).indexOf(normalizeTextCase(query));
        const maxPrefixOrSuffix = Math.floor((THRESHOLD_CONTENT_LENGTH - query.length) / 2);
        let prefix = statement.slice(0, queryIndex);
        if (prefix.length > maxPrefixOrSuffix) prefix = `...${statement.slice(queryIndex - maxPrefixOrSuffix + 3, queryIndex)}`;
        let suffix = statement.slice(queryIndex + query.length);
        if (suffix.length > maxPrefixOrSuffix) suffix = `${statement.slice(queryIndex + query.length, queryIndex + maxPrefixOrSuffix - 3)}...`;
        return prefix + query + suffix;
    }
    #isCurrentIndex(index) {
        return index === this.#indexName || index === LOCAL_INDEX;
    }
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/webMcp/tools.js

const queryField = {
    type: 'string',
    minLength: 1
};
const routePathField = {
    type: 'string',
    minLength: 1
};
function toWebMcpSearchResults(groups) {
    return groups.flatMap((param)=>{
        let { group, result } = param;
        try {
            const json = JSON.stringify(result, (_key, value)=>{
                if ([
                    'function',
                    'symbol',
                    'bigint'
                ].includes(typeof value)) throw new TypeError('Search result is not JSON-serializable.');
                return value;
            });
            return void 0 === json ? [] : [
                {
                    group,
                    results: JSON.parse(json)
                }
            ];
        } catch  {
            return [];
        }
    });
}
function argumentsObject(input, fields, required) {
    const value = void 0 === input ? {} : input;
    if (null === value || 'object' != typeof value || Array.isArray(value)) throw new TypeError('Tool arguments must be an object.');
    const args = value;
    for (const key of Object.keys(args))if (!Object.hasOwn(fields, key)) throw new TypeError(`Unknown argument: ${key}`);
    for (const [key, field] of Object.entries(fields)){
        const val = args[key];
        if (void 0 !== val || required.includes(key)) {
            if ('string' === field.type) {
                if ('string' != typeof val || field.minLength && !val.trim()) throw new TypeError(`${key} must be ${field.minLength ? 'a non-empty' : 'a'} string.`);
            } else if ('number' != typeof val || !Number.isSafeInteger(val) || val < field.minimum || void 0 !== field.maximum && val > field.maximum) throw new TypeError(`${key} must be an integer between ${field.minimum} and ${field.maximum ?? Number.MAX_SAFE_INTEGER}.`);
        }
    }
    return args;
}
function resolveInternalRoute(value, context) {
    if (!value.startsWith('/') || value.startsWith('//')) throw new TypeError('routePath must be an absolute internal path.');
    const url = new URL(value, context.origin);
    if (url.origin !== context.origin) throw new TypeError('External routes are not allowed.');
    const path = context.resolveRoute(url.pathname);
    if (!path) throw new TypeError(`Unknown internal route: ${url.pathname}`);
    return `${path}${url.search}${url.hash}`;
}
function tools_metadata(page) {
    return {
        title: page.title,
        description: page.description,
        routePath: page.routePath,
        lang: page.lang,
        version: page.version
    };
}
async function readPage(page, base, signal) {
    let fetcher = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : fetch;
    const url = `${(0,dist/* .removeTrailingSlash */.UC)(base)}${(0,dist/* .normalizeHref */.Tj)(page.routePath, false).replace(/\.html$/, '.md')}`;
    const response = await fetcher(url, {
        signal
    });
    if (!response.ok) throw new Error(`Failed to read Markdown for ${page.routePath}: ${response.status}`);
    const markdown = await response.text();
    if (response.headers.get('content-type')?.includes('text/html') || /^\s*(?:<!doctype\s+html|<html[\s>])/i.test(markdown)) throw new Error(`Markdown is unavailable for ${page.routePath}. Serve the output of rspress build with llms enabled.`);
    return {
        ...tools_metadata(page),
        frontmatter: page.frontmatter,
        toc: page.toc,
        markdown
    };
}
function listPages(pages, current, args) {
    const lang = args.lang ?? current.lang;
    const version = args.version ?? current.version;
    const terms = args.query?.trim().toLowerCase().split(/\s+/) ?? [];
    const matches = pages.filter((page)=>{
        const text = [
            page.title,
            page.description,
            page.routePath,
            ...page.toc.map((item)=>item.text)
        ].join(' ').toLowerCase();
        return page.lang === lang && page.version === version && terms.every((term)=>text.includes(term));
    });
    const limit = args.limit ?? 50;
    const offset = args.offset ?? 0;
    return {
        pages: matches.slice(offset, offset + limit).map((page)=>({
                ...tools_metadata(page),
                toc: page.toc
            })),
        total: matches.length,
        offset,
        limit
    };
}
function defineTool(name, description, fields, required, execute) {
    return {
        name,
        description,
        inputSchema: {
            type: 'object',
            properties: fields,
            required,
            additionalProperties: false
        },
        annotations: {
            readOnlyHint: 'navigate' !== name,
            untrustedContentHint: true
        },
        exposedTo: [],
        execute: (input, options)=>execute(argumentsObject(input, fields, required), options.signal)
    };
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/useSearchPanel.js







function useSearchPanel(param) {
    let { focused, searchInputRef } = param;
    const { siteData, page: { lang, version } } = usePageData();
    const userSearchHooks = useSearchHooks();
    const { search, title: siteTitle } = siteData;
    const [query, setQuery] = (0,react.useState)('');
    const [searchResult, setSearchResult] = (0,react.useState)([]);
    const [isSearching, setIsSearching] = (0,react.useState)(false);
    const [resultTabIndex, setResultTabIndex] = (0,react.useState)(0);
    const [currentSuggestionIndex, setCurrentSuggestionIndex] = (0,react.useState)(0);
    const [initStatus, setInitStatus] = (0,react.useState)('initial');
    const [searchError, setSearchError] = (0,react.useState)();
    const pageSearcherRef = (0,react.useRef)(null);
    const pageSearcherConfigRef = (0,react.useRef)(null);
    const pageSearcherURLRef = (0,react.useRef)(void 0);
    const initializationRef = (0,react.useRef)(void 0);
    const searchEnabled = false !== search;
    const searchOptions = false === search ? {} : search;
    const isSearchVersioned = searchEnabled && (search?.versioned ?? true);
    const searchVersion = isSearchVersioned ? version : '';
    const searchIndexURL = searchEnabled ? getSearchIndexURL(lang, searchVersion) : void 0;
    const DEFAULT_RESULT = [
        {
            group: siteTitle,
            result: [],
            renderType: types_RenderType.Default
        }
    ];
    const createSearcher = ()=>{
        const previous = pageSearcherConfigRef.current;
        if (pageSearcherRef.current && previous?.currentLang === lang && (!isSearchVersioned || previous.currentVersion === version) && pageSearcherURLRef.current === searchIndexURL) return pageSearcherRef.current;
        const pageSearcherConfig = {
            currentLang: lang,
            currentVersion: version
        };
        const pageSearcher = new PageSearcher({
            indexName: siteTitle,
            ...searchOptions,
            ...pageSearcherConfig
        });
        pageSearcherRef.current = pageSearcher;
        pageSearcherConfigRef.current = pageSearcherConfig;
        pageSearcherURLRef.current = searchIndexURL;
        return pageSearcher;
    };
    const initializeSearcher = (searcher)=>{
        if (initializationRef.current?.searcher === searcher) return initializationRef.current.promise;
        const promise = searcher.init().catch((error)=>{
            if (initializationRef.current?.searcher === searcher) initializationRef.current = void 0;
            throw error;
        });
        initializationRef.current = {
            searcher,
            promise
        };
        return promise;
    };
    const searchDocs = async (value, limit)=>{
        const searcher = createSearcher();
        let newQuery = value;
        const result = [];
        if (userSearchHooks.beforeSearch) {
            const transformedQuery = await userSearchHooks.beforeSearch(newQuery);
            if (transformedQuery) newQuery = transformedQuery;
        }
        await initializeSearcher(searcher);
        const defaultSearchResult = await searcher.match(newQuery, limit);
        result.push(...defaultSearchResult);
        if (userSearchHooks.onSearch) {
            const customSearchResult = await userSearchHooks.onSearch(newQuery, result);
            if (customSearchResult) result.push(...customSearchResult.map((item)=>({
                    renderType: types_RenderType.Custom,
                    ...item
                })));
        }
        await userSearchHooks.afterSearch?.(newQuery, result);
        return result;
    };
    if (true) useWebMcp({
        ...defineTool('search_docs', 'Search documentation through the active local search component.', {
            query: queryField,
            limit: {
                type: 'integer',
                minimum: 1,
                maximum: 20
            }
        }, [
            'query'
        ], async (args)=>toWebMcpSearchResults(await searchDocs(args.query, args.limit ?? 10))),
        enabled: searchEnabled && Boolean(searchIndexURL || userSearchHooks.onSearch)
    });
    const requestIdRef = (0,react.useRef)(0);
    const scheduleQuery = (0,react.useMemo)(()=>lodash_es_debounce((run)=>run(), 150), []);
    const invalidateQuery = (0,react.useCallback)(()=>{
        requestIdRef.current++;
        scheduleQuery.cancel();
    }, [
        scheduleQuery
    ]);
    (0,react.useLayoutEffect)(()=>invalidateQuery, [
        focused,
        searchEnabled,
        lang,
        searchVersion,
        searchIndexURL,
        invalidateQuery
    ]);
    (0,react.useLayoutEffect)(()=>{
        pageSearcherRef.current = null;
        setInitStatus('initial');
        setSearchError(void 0);
    }, [
        searchEnabled,
        lang,
        searchVersion,
        searchIndexURL
    ]);
    const initSearch = async ()=>{
        const searcher = createSearcher();
        if ('initial' !== initStatus && initializationRef.current?.searcher === searcher) return;
        setSearchError(void 0);
        setInitStatus('initing');
        try {
            await initializeSearcher(searcher);
            if (pageSearcherRef.current === searcher) setInitStatus('inited');
        } catch (error) {
            if (pageSearcherRef.current === searcher) {
                setSearchError(error instanceof Error ? error.message : String(error));
                setInitStatus('error');
            }
        }
    };
    const runQuery = async (value, requestId)=>{
        const isCurrent = ()=>requestId === requestIdRef.current && searchInputRef.current?.value === value;
        if (!isCurrent()) return;
        setQuery(value);
        try {
            const result = await searchDocs(value);
            if (isCurrent()) {
                setSearchError(void 0);
                setInitStatus('inited');
                setCurrentSuggestionIndex(0);
                setSearchResult(result);
                setIsSearching(false);
            }
        } catch (error) {
            if (isCurrent()) {
                setSearchError(error instanceof Error ? error.message : String(error));
                setInitStatus('error');
                setIsSearching(false);
            }
        }
    };
    const clearQuery = ()=>{
        invalidateQuery();
        setQuery('');
        setIsSearching(false);
    };
    const handleQueryInput = (value)=>{
        if (!value) return void clearQuery();
        const requestId = ++requestIdRef.current;
        setIsSearching(true);
        scheduleQuery(()=>{
            runQuery(value, requestId);
        });
    };
    (0,react.useEffect)(()=>{
        if (!focused || !searchEnabled) return void clearQuery();
        setSearchResult(DEFAULT_RESULT);
        const value = searchInputRef.current?.value;
        if (value) handleQueryInput(value);
        else initSearch();
    }, [
        focused,
        searchEnabled,
        lang,
        searchVersion,
        searchIndexURL
    ]);
    return {
        searchEnabled,
        clearQuery,
        currentRenderType: searchResult[resultTabIndex]?.renderType ?? types_RenderType.Default,
        currentSuggestions: searchResult[resultTabIndex]?.result ?? [],
        handleQueryInput,
        initStatus,
        isSearching,
        resultTabIndex,
        searchError,
        searchIndexURL,
        searchResult,
        query,
        currentSuggestionIndex,
        setCurrentSuggestionIndex,
        setResultTabIndex
    };
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Search/SearchPanel.js










const KEY_CODE = {
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ENTER: 'Enter',
    SEARCH: 'KeyK',
    ESC: 'Escape'
};
const normalizeSuggestions = (suggestions)=>suggestions.reduce((groups, item)=>{
        const group = item.title;
        if (!groups.has(group)) groups.set(group, []);
        groups.get(group).push(item);
        return groups;
    }, new Map());
function SearchPanel_SearchPanel(param) {
    let { focused, setFocused } = param;
    const searchInputRef = (0,react.useRef)(null);
    const searchResultRef = (0,react.useRef)(null);
    const searchResultTabRef = (0,react.useRef)(null);
    const mousePositionRef = (0,react.useRef)({
        pageX: null,
        pageY: null
    });
    const [canScroll, setCanScroll] = (0,react.useState)(false);
    const scrollTo = (offsetTop, offsetHeight)=>{
        const currentOffsetHeight = searchResultRef.current?.offsetHeight;
        const currentScrollTop = searchResultRef.current?.scrollTop;
        if (canScroll && void 0 !== currentOffsetHeight && void 0 !== currentScrollTop) {
            const scrollDown = offsetTop + offsetHeight - currentOffsetHeight - (1 === searchResult.length ? 50 : -10);
            if (scrollDown > currentScrollTop) searchResultRef.current?.scrollTo({
                top: scrollDown
            });
            const scrollUp = 1 === searchResult.length ? offsetTop - 70 : offsetTop - 10;
            if (scrollUp < currentScrollTop) searchResultRef.current?.scrollTo({
                top: scrollUp
            });
        }
    };
    const t = useI18n();
    const userSearchHooks = useSearchHooks();
    const navigate = (0,theme_0/* .useLinkNavigate */.X6)();
    const { currentRenderType, currentSuggestions, currentSuggestionIndex, clearQuery, handleQueryInput, initStatus, isSearching, query, resultTabIndex, searchError, searchIndexURL, searchResult, searchEnabled, setCurrentSuggestionIndex, setResultTabIndex } = useSearchPanel({
        focused,
        searchInputRef
    });
    if (!searchEnabled) return null;
    const clearSearchState = ()=>{
        setFocused(false);
        setResultTabIndex(0);
        setCurrentSuggestionIndex(0);
    };
    (0,react.useEffect)(()=>{
        const onKeyDown = (e)=>{
            switch(e.code){
                case KEY_CODE.SEARCH:
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        setFocused(!focused);
                    }
                    break;
                case KEY_CODE.ARROW_DOWN:
                    if (e.isComposing) return;
                    if (focused) {
                        e.preventDefault();
                        if (currentSuggestions && currentRenderType === types_RenderType.Default) {
                            setCanScroll(true);
                            setCurrentSuggestionIndex((currentSuggestionIndex + 1) % currentSuggestions.length);
                        }
                    }
                    break;
                case KEY_CODE.ARROW_UP:
                    if (e.isComposing) return;
                    if (focused) {
                        e.preventDefault();
                        if (currentRenderType === types_RenderType.Default) {
                            const currentSuggestionsLength = currentSuggestions.length;
                            setCanScroll(true);
                            setCurrentSuggestionIndex((currentSuggestionIndex - 1 + currentSuggestionsLength) % currentSuggestionsLength);
                        }
                    }
                    break;
                case KEY_CODE.ENTER:
                    if (e.isComposing) return;
                    if (focused && currentSuggestionIndex >= 0 && currentRenderType === types_RenderType.Default) {
                        const flatSuggestions = Array.from(normalizeSuggestions(currentSuggestions).values()).flat();
                        const suggestion = flatSuggestions[currentSuggestionIndex];
                        if (suggestion) {
                            navigate(suggestion.link);
                            clearSearchState();
                        }
                    }
                    break;
                case KEY_CODE.ESC:
                    clearSearchState();
                    break;
                default:
                    break;
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return ()=>{
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [
        setCurrentSuggestionIndex,
        setFocused,
        focused,
        resultTabIndex,
        currentSuggestions,
        currentSuggestionIndex
    ]);
    const renderSearchResult = (result)=>{
        if (1 === result.length) {
            const currentSearchResult = result[0].result;
            return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                ref: searchResultTabRef,
                children: renderSearchResultItem(currentSearchResult)
            });
        }
        const renderKey = 'render';
        return /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Tabs */.tU, {
            className: "rp-search-panel__tabs",
            onChange: (index)=>{
                setResultTabIndex(index);
                setCurrentSuggestionIndex(0);
            },
            keepDOM: false,
            ref: searchResultTabRef,
            children: result.map((item)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(theme_0/* .Tab */.oz, {
                    label: item.group,
                    children: [
                        item.renderType === types_RenderType.Default && renderSearchResultItem(item.result),
                        item.renderType === types_RenderType.Custom && userSearchHooks[renderKey]?.(item.result)
                    ]
                }, item.group))
        });
    };
    const renderSearchResultItem = (suggestionList)=>{
        if (0 === suggestionList.length && 'inited' === initStatus) return isSearching ? null : /*#__PURE__*/ (0,jsx_runtime.jsx)(NoSearchResult_NoSearchResult, {
            query: query
        });
        const normalizedSuggestions = normalizeSuggestions(suggestionList);
        let accumulateIndex = -1;
        return /*#__PURE__*/ (0,jsx_runtime.jsx)("ul", {
            children: Array.from(normalizedSuggestions.keys()).map((group)=>{
                const groupSuggestions = normalizedSuggestions.get(group) || [];
                return /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("ul", {
                        className: "rp-search-panel__group",
                        children: groupSuggestions.map((suggestion)=>{
                            accumulateIndex++;
                            const suggestionIndex = accumulateIndex;
                            return /*#__PURE__*/ (0,jsx_runtime.jsx)(SuggestItem_SuggestItem, {
                                suggestion: suggestion,
                                isCurrent: suggestionIndex === currentSuggestionIndex,
                                setCurrentSuggestionIndex: (event)=>{
                                    if (mousePositionRef.current.pageX === event.pageX && mousePositionRef.current.pageY === event.pageY) return;
                                    setCanScroll(false);
                                    setCurrentSuggestionIndex(suggestionIndex);
                                },
                                onMouseMove: (event)=>{
                                    mousePositionRef.current = {
                                        pageX: event.pageX,
                                        pageY: event.pageY
                                    };
                                },
                                closeSearch: ()=>{
                                    clearSearchState();
                                },
                                inCurrentDocIndex: 0 === resultTabIndex,
                                scrollTo: scrollTo
                            }, `${suggestion.title}-${suggestionIndex}`);
                        })
                    })
                }, group);
            })
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            searchIndexURL && /*#__PURE__*/ (0,jsx_runtime.jsx)(Head, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("link", {
                    rel: "prefetch",
                    href: searchIndexURL
                })
            }),
            focused && /*#__PURE__*/ (0,react_dom.createPortal)(/*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-search-panel__mask",
                onClick: ()=>{
                    clearSearchState();
                },
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "rp-search-panel__modal",
                    onClick: (e)=>{
                        setFocused(true);
                        e.stopPropagation();
                    },
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "rp-search-panel__header",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: "rp-search-panel__input-form",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("label", {
                                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                                                icon: theme_0/* .IconSearch */.C0,
                                                className: `rp-search-panel__search-icon${'initing' === initStatus || isSearching ? ' rp-search-panel__search-icon--loading' : ''}`
                                            })
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                                            className: "rp-search-panel__input",
                                            ref: searchInputRef,
                                            placeholder: t('searchPlaceholderText'),
                                            "aria-label": "SearchPanelInput",
                                            autoComplete: "off",
                                            autoFocus: true,
                                            inputMode: "search",
                                            onChange: (e)=>{
                                                const value = e.target.value;
                                                handleQueryInput(value);
                                            }
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("label", {
                                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                                                icon: theme_0/* .IconClose */.gz,
                                                className: "rp-search-panel__close",
                                                onClick: (e)=>{
                                                    if (searchInputRef.current) {
                                                        e.stopPropagation();
                                                        if (query) {
                                                            searchInputRef.current.value = '';
                                                            clearQuery();
                                                        } else clearSearchState();
                                                    }
                                                }
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                                    className: "rp-search-panel__cancel",
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        clearSearchState();
                                    },
                                    children: t('searchPanelCancelText')
                                })
                            ]
                        }),
                        (query || 'error' === initStatus) && ('inited' === initStatus || 'error' === initStatus) ? /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                            className: "rp-search-panel__results rp-scrollbar",
                            ref: searchResultRef,
                            children: 'error' === initStatus ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "rp-search-panel__error",
                                children: [
                                    "Error: ",
                                    searchError
                                ]
                            }) : renderSearchResult(searchResult)
                        }) : null
                    ]
                })
            }), document.getElementById('__rspress_modal_container'))
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Sidebar/SidebarDivider.css
var SidebarDivider = __webpack_require__("Dq");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Sidebar/SidebarDivider.js


function SidebarDivider_SidebarDivider(props) {
    const { depth, dividerType } = props;
    const className = 'dashed' === dividerType ? 'rp-sidebar-divider--dashed' : 'rp-sidebar-divider';
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: className,
        style: {
            paddingLeft: 0 === depth ? '12px' : `calc(12px * ${depth} + 12px)`
        }
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Sidebar/SidebarGroup.css
var SidebarGroup = __webpack_require__("N");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Sidebar/SidebarItem.css
var SidebarItem = __webpack_require__("HY");
;// CONCATENATED MODULE: ./node_modules/.pnpm/compute-scroll-into-view@3.2.2/node_modules/compute-scroll-into-view/dist/index.js
const dist_t=t=>"object"==typeof t&&null!=t&&1===t.nodeType,dist_e=(t,e)=>(!e||"hidden"!==t)&&("visible"!==t&&"clip"!==t),dist_n=(t,n)=>{if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){const o=getComputedStyle(t,null);return dist_e(o.overflowY,n)||dist_e(o.overflowX,n)||(t=>{const e=(t=>{if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}})(t);return!!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)})(t)}return!1},dist_o=(t,e,n,o,l,r,i,s)=>r<t&&i>e||r>t&&i<e?0:r<=t&&s<=n||i>=e&&s>=n?r-t-o:i>e&&s<n||r<t&&s>n?i-e+l:0,dist_l=t=>{const e=t.parentElement;return null==e?t.getRootNode().host||null:e},dist_r=(e,r)=>{var i,s,d,h;if("undefined"==typeof document)return[];const{scrollMode:c,block:f,inline:u,boundary:a,skipOverflowHiddenElements:g}=r,p="function"==typeof a?a:t=>t!==a;if(!dist_t(e))throw new TypeError("Invalid target");const m=document.scrollingElement||document.documentElement,w=[];let W=e;for(;dist_t(W)&&p(W);){if(W=dist_l(W),W===m){w.push(W);break}null!=W&&W===document.body&&dist_n(W)&&!dist_n(document.documentElement)||null!=W&&dist_n(W,g)&&w.push(W)}const b=null!=(s=null==(i=window.visualViewport)?void 0:i.width)?s:innerWidth,H=null!=(h=null==(d=window.visualViewport)?void 0:d.height)?h:innerHeight,{scrollX:y,scrollY:M}=window,{height:v,width:E,top:x,right:C,bottom:I,left:R}=e.getBoundingClientRect(),{top:T,right:B,bottom:F,left:V}=(t=>{const e=window.getComputedStyle(t);return{top:parseFloat(e.scrollMarginTop)||0,right:parseFloat(e.scrollMarginRight)||0,bottom:parseFloat(e.scrollMarginBottom)||0,left:parseFloat(e.scrollMarginLeft)||0}})(e);let k="start"===f||"nearest"===f?x-T:"end"===f?I+F:x+v/2-T+F,D="center"===u?R+E/2-V+B:"end"===u?C+B:R-V;const L=[];for(let t=0;t<w.length;t++){const e=w[t],{height:l,width:r,top:i,right:s,bottom:d,left:h}=e.getBoundingClientRect();if("if-needed"===c&&x>=0&&R>=0&&I<=H&&C<=b&&(e===m&&!dist_n(e)||x>=i&&I<=d&&R>=h&&C<=s))return L;const a=getComputedStyle(e),g=parseInt(a.borderLeftWidth,10),p=parseInt(a.borderTopWidth,10),W=parseInt(a.borderRightWidth,10),T=parseInt(a.borderBottomWidth,10);let B=0,F=0;const V="offsetWidth"in e?e.offsetWidth-e.clientWidth-g-W:0,S="offsetHeight"in e?e.offsetHeight-e.clientHeight-p-T:0,X="offsetWidth"in e?0===e.offsetWidth?0:r/e.offsetWidth:0,Y="offsetHeight"in e?0===e.offsetHeight?0:l/e.offsetHeight:0;if(m===e)B="start"===f?k:"end"===f?k-H:"nearest"===f?dist_o(M,M+H,H,p,T,M+k,M+k+v,v):k-H/2,F="start"===u?D:"center"===u?D-b/2:"end"===u?D-b:dist_o(y,y+b,b,g,W,y+D,y+D+E,E),B=Math.max(0,B+M),F=Math.max(0,F+y);else{B="start"===f?k-i-p:"end"===f?k-d+T+S:"nearest"===f?dist_o(i,d,l,p,T+S,k,k+v,v):k-(i+l/2)+S/2,F="start"===u?D-h-g:"center"===u?D-(h+r/2)+V/2:"end"===u?D-s+W+V:dist_o(h,s,r,g,W+V,D,D+E,E);const{scrollLeft:t,scrollTop:n}=e;B=0===Y?0:Math.max(0,Math.min(n+B/Y,e.scrollHeight-l/Y+S)),F=0===X?0:Math.max(0,Math.min(t+F/X,e.scrollWidth-r/X+V)),k+=n-B,D+=t-F}L.push({el:e,top:B,left:F})}return L};//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/.pnpm/scroll-into-view-if-needed@3.2.1/node_modules/scroll-into-view-if-needed/dist/index.js
const scroll_into_view_if_needed_dist_o=t=>!1===t?{block:"end",inline:"nearest"}:(t=>t===Object(t)&&0!==Object.keys(t).length)(t)?t:{block:"start",inline:"nearest"};function scroll_into_view_if_needed_dist_e(e,r){if(!e.isConnected||!(t=>{let o=t;for(;o&&o.parentNode;){if(o.parentNode===document)return!0;o=o.parentNode instanceof ShadowRoot?o.parentNode.host:o.parentNode}return!1})(e))return;const n=(t=>{const o=window.getComputedStyle(t);return{top:parseFloat(o.scrollMarginTop)||0,right:parseFloat(o.scrollMarginRight)||0,bottom:parseFloat(o.scrollMarginBottom)||0,left:parseFloat(o.scrollMarginLeft)||0}})(e);if((t=>"object"==typeof t&&"function"==typeof t.behavior)(r))return r.behavior(dist_r(e,r));const l="boolean"==typeof r||null==r?void 0:r.behavior;for(const{el:a,top:i,left:s}of dist_r(e,scroll_into_view_if_needed_dist_o(r))){const t=i-n.top+n.bottom,o=s-n.left+n.right;a.scroll({top:t,left:o,behavior:l})}}//# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Sidebar/SidebarItem.js







function SidebarItemRaw(param) {
    let { active, text, icon, tag, link, context, className, left, right, onClick, depth } = param;
    const ref = (0,react.useRef)(null);
    const [isPending, startTransition] = (0,react.useTransition)();
    (0,react.useEffect)(()=>{
        if (active && ref.current) scroll_into_view_if_needed_dist_e(ref.current, {
            scrollMode: 'if-needed',
            block: 'center',
            inline: 'center',
            boundary: (element)=>{
                const isBoundary = element.classList.contains('rp-doc-layout__sidebar') || element.classList.contains('rspress-doc');
                return !isBoundary;
            }
        });
    }, [
        active
    ]);
    const innerContent = /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-sidebar-item__left",
                ref: ref,
                children: [
                    icon && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                        icon: icon,
                        className: "rp-sidebar-item__icon"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                        className: "rp-doc",
                        ...(0,theme_0/* .renderInlineMarkdown */.nl)(text)
                    }),
                    left
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-sidebar-item__right",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Tag */.OT, {
                        tag: tag
                    }),
                    right
                ]
            })
        ]
    });
    if (link) return /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Link */.N_, {
        href: link,
        startTransition: startTransition,
        className: dist_clsx('rp-sidebar-item', {
            'rp-sidebar-item--active': active,
            'rp-sidebar-item--pending': isPending
        }, className),
        style: {
            marginLeft: 24 * depth
        },
        'data-depth': depth,
        ...context ? {
            'data-context': context
        } : {},
        onClick: onClick,
        children: innerContent
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        ref: ref,
        className: dist_clsx('rp-sidebar-item', {
            'rp-sidebar-item--active': active
        }, className),
        style: {
            marginLeft: 24 * depth
        },
        'data-depth': depth,
        ...context ? {
            'data-context': context
        } : {},
        onClick: onClick,
        children: innerContent
    });
}
function SidebarItem_SidebarItem(props) {
    const { item, depth, className } = props;
    const activeMatcher = useActiveMatcher();
    const active = Boolean('link' in item && item.link && activeMatcher(item.link));
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(SidebarItemRaw, {
        className: className,
        active: active,
        link: item.link,
        icon: item.icon,
        tag: item.tag,
        text: item.text,
        context: item.context,
        depth: depth
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Sidebar/SidebarSectionHeader.css
var SidebarSectionHeader = __webpack_require__("qg");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Sidebar/SidebarSectionHeader.js



function SidebarSectionHeader_SidebarSectionHeader(param) {
    let { icon, sectionHeaderText, tag } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "rp-sidebar-section-header",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-sidebar-section-header__left",
                children: [
                    icon && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                        icon: icon,
                        className: "rp-sidebar-section-header__icon"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                        ...(0,theme_0/* .renderInlineMarkdown */.nl)(sectionHeaderText)
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-sidebar-section-header__right",
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Tag */.OT, {
                    tag: tag
                })
            })
        ]
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Sidebar/SidebarGroup.js









const CollapsibleIcon = (param)=>{
    let { collapsed } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        style: {
            cursor: 'pointer',
            transition: 'transform 0.2s ease-out',
            transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)'
        },
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
            icon: theme_0/* .IconArrowRight */.hI
        })
    });
};
function SidebarGroup_SidebarGroup(props) {
    const activeMatcher = useActiveMatcher();
    const { item, depth, id, setSidebarData, className } = props;
    const navigate = (0,theme_0/* .useLinkNavigate */.X6)();
    const active = item.link && activeMatcher(item.link);
    const { collapsed = false, collapsible = true } = item;
    const toggleCollapse = ()=>{
        setSidebarData((sidebarData)=>{
            const newSidebarData = [
                ...sidebarData
            ];
            const indexes = id.split('-').map(Number);
            const initialIndex = indexes.shift();
            const root = newSidebarData[initialIndex];
            let current = root;
            for (const index of indexes)current = current.items[index];
            if ('items' in current) current.collapsed = !current.collapsed;
            return newSidebarData;
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(SidebarItemRaw, {
                active: Boolean(active),
                link: item.link,
                icon: item.icon,
                tag: item.tag,
                text: item.text,
                context: item.context,
                className: dist_clsx('rp-sidebar-group', className),
                depth: depth,
                onClick: (e)=>{
                    if (!active && item.link && !collapsed) return void navigate(item.link);
                    if (item.link) {
                        e.stopPropagation();
                        navigate(item.link).then(()=>{
                            collapsible && toggleCollapse();
                        });
                        return;
                    }
                    e.stopPropagation();
                    collapsible && toggleCollapse();
                },
                right: collapsible && /*#__PURE__*/ (0,jsx_runtime.jsx)(CollapsibleIcon, {
                    collapsed: collapsed
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                style: {
                    display: 'grid',
                    gridTemplateRows: collapsed ? '0fr' : '1fr',
                    transition: 'grid-template-rows 0.2s ease-out'
                },
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    style: {
                        overflow: 'hidden'
                    },
                    children: item.items?.map((item, index)=>isSidebarGroup(item) ? /*#__PURE__*/ (0,jsx_runtime.jsx)(SidebarGroup_SidebarGroup, {
                            id: `${id}-${index}`,
                            depth: depth + 1,
                            item: item,
                            setSidebarData: setSidebarData,
                            className: "rp-sidebar-item--group-item"
                        }, `${id}-${index}`) : isSidebarDivider(item) ? /*#__PURE__*/ (0,jsx_runtime.jsx)(SidebarDivider_SidebarDivider, {
                            depth: depth + 1,
                            dividerType: item.dividerType
                        }, index) : isSidebarSectionHeader(item) ? /*#__PURE__*/ (0,jsx_runtime.jsx)(SidebarSectionHeader_SidebarSectionHeader, {
                            icon: item.icon,
                            sectionHeaderText: item.sectionHeaderText,
                            tag: item.tag
                        }, index) : /*#__PURE__*/ (0,jsx_runtime.jsx)(SidebarItem_SidebarItem, {
                            item: item,
                            depth: depth + 1,
                            className: "rp-sidebar-item--group-item"
                        }, index))
                })
            })
        ]
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Sidebar/index.js







function Sidebar() {
    const [sidebarData, setSidebarData] = useSidebarDynamic();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(SidebarList, {
        sidebarData: sidebarData,
        setSidebarData: setSidebarData
    });
}
function SidebarList(param) {
    let { sidebarData, setSidebarData } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: sidebarData.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(SidebarListItem, {
                item: item,
                index: index,
                setSidebarData: setSidebarData
            }, index))
    });
}
function SidebarListItem(props) {
    const { item, index, setSidebarData } = props;
    if (isSidebarDivider(item)) return /*#__PURE__*/ (0,jsx_runtime.jsx)(SidebarDivider_SidebarDivider, {
        depth: 0,
        dividerType: item.dividerType
    }, index);
    if (isSidebarSectionHeader(item)) return /*#__PURE__*/ (0,jsx_runtime.jsx)(SidebarSectionHeader_SidebarSectionHeader, {
        icon: item.icon,
        sectionHeaderText: item.sectionHeaderText,
        tag: item.tag
    }, index);
    if (isSidebarGroup(item)) return /*#__PURE__*/ (0,jsx_runtime.jsx)(SidebarGroup_SidebarGroup, {
        id: String(index),
        item: item,
        depth: 0,
        setSidebarData: setSidebarData
    }, `${item.text}-${index}`);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(SidebarItem_SidebarItem, {
        item: item,
        depth: 0
    }, index);
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/SocialLinks/index.css
var SocialLinks = __webpack_require__("cE");
// EXTERNAL MODULE: ./.rspress/runtime/virtual-social-links.js
var virtual_social_links = __webpack_require__("AP");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/socialLinks.js

const socialLinks_socialLinks = virtual_social_links/* ["default"] */.A;


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/SocialLinks/GithubStars.js



const TTL_MS = 3600000;
function storageKey(repo) {
    return `rp-github-stars:${repo}`;
}
function parseRepo(content) {
    try {
        const url = new URL(content);
        const host = url.hostname.replace(/^www\./, '');
        if ('github.com' !== host) return null;
        const match = url.pathname.match(/^\/([^/]+)\/([^/]+)/);
        if (!match) return null;
        return `${match[1]}/${match[2].replace(/\.git$/, '')}`;
    } catch  {
        return null;
    }
}
function parseCache(raw) {
    try {
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if ('number' != typeof parsed?.count || 'number' != typeof parsed?.fetchedAt) return null;
        return parsed;
    } catch  {
        return null;
    }
}
function createCacheValue(count) {
    return JSON.stringify({
        count,
        fetchedAt: Date.now()
    });
}
function formatCount(count) {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return String(count);
}
const GithubStars = (props)=>{
    const { content, icon } = props;
    const repo = parseRepo(content);
    const [rawCache, setRawCache] = (0,theme_0/* .useStorageValue */.yL)(repo ? storageKey(repo) : '', null);
    const [isMounted, setIsMounted] = (0,react.useState)(false);
    const [count, setCount] = (0,react.useState)(null);
    (0,react.useEffect)(()=>{
        setIsMounted(true);
    }, []);
    (0,react.useEffect)(()=>{
        if (!repo) return void setCount(null);
        if (!isMounted) return;
        const cached = parseCache(rawCache);
        if (cached) {
            setCount(cached.count);
            if (Date.now() - cached.fetchedAt < TTL_MS) return;
        } else setCount(null);
        let cancelled = false;
        fetch(`https://api.github.com/repos/${repo}`).then((res)=>res.ok ? res.json() : Promise.reject(res.status)).then((data)=>{
            if (cancelled) return;
            if ('number' == typeof data?.stargazers_count) {
                setCount(data.stargazers_count);
                try {
                    setRawCache(createCacheValue(data.stargazers_count));
                } catch  {}
            }
        }).catch(()=>{});
        return ()=>{
            cancelled = true;
        };
    }, [
        isMounted,
        rawCache,
        repo,
        setRawCache
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("a", {
        href: content,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "rp-social-links__item rp-social-links__github-stars",
        "aria-label": null == count ? 'GitHub repository' : `GitHub repository, ${count.toLocaleString()} stars`,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-social-links__icon",
                children: icon
            }),
            null != count && /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                className: "rp-social-links__github-stars-count",
                children: formatCount(count)
            })
        ]
    });
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/SocialLinks/SocialLink.js





const SocialLink = (props)=>{
    const { link, hoverGroupPosition = 'center' } = props;
    const { icon, mode = 'link', content } = link;
    let IconComp = /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {});
    if (icon) {
        const html = 'string' == typeof icon ? socialLinks_socialLinks[icon] : icon.svg;
        IconComp = /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "rp-social-links__icon",
            dangerouslySetInnerHTML: {
                __html: html
            }
        });
    }
    const { handleMouseEnter, handleMouseLeave, hoverGroup } = useHoverGroup({
        position: hoverGroupPosition,
        customChildren: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "rp-social-links__item__hover-group",
            children: 'text' === mode ? /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-social-links__item__text",
                children: content
            }) : 'dom' === mode ? /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                dangerouslySetInnerHTML: {
                    __html: content
                }
            }) : 'img' === mode ? /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
                src: content,
                alt: "img"
            }) : null
        })
    });
    if ('link' === mode) return /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
        href: content,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "rp-social-links__item",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "rp-social-links__icon",
            children: IconComp
        })
    }, content);
    if ('github-stars' === mode) return /*#__PURE__*/ (0,jsx_runtime.jsx)(GithubStars, {
        content: content,
        icon: IconComp
    });
    if ('text' === mode) return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "rp-social-links__item",
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        children: [
            IconComp,
            hoverGroup
        ]
    });
    if ('img' === mode) return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "rp-social-links__item",
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        children: [
            IconComp,
            hoverGroup
        ]
    });
    if ('dom' === mode) return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "rp-social-links__item",
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        children: [
            IconComp,
            hoverGroup
        ]
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "rp-social-links__item"
    });
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/SocialLinks/index.js






const MORE_LENGTH = 5;
const SocialLinks_SocialLinks = (param)=>{
    let { socialLinks: socialLinksFromProps } = param;
    const { site } = (0,useSite/* .useSite */.Z)();
    const socialLinks = site.themeConfig.socialLinks || socialLinksFromProps || [];
    const isMore = socialLinks.length > MORE_LENGTH;
    const shownLinks = socialLinks.slice(0, MORE_LENGTH);
    const hiddenLinks = socialLinks.slice(MORE_LENGTH);
    const { hoverGroup, handleMouseEnter, handleMouseLeave } = useHoverGroup({
        position: 'right',
        customChildren: isMore ? /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: "rp-social-links__hidden",
            children: hiddenLinks.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(SocialLink, {
                    link: item,
                    hoverGroupPosition: index === hiddenLinks.length - 1 ? 'right' : 'center'
                }, item.content))
        }) : null
    });
    if (0 === socialLinks.length) return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {});
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "rp-social-links",
        onMouseLeave: handleMouseLeave,
        children: [
            shownLinks.map((item, index)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(SocialLink, {
                    link: item,
                    hoverGroupPosition: index === shownLinks.length - 1 ? 'right' : 'center'
                }, item.content)),
            isMore ? /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                icon: theme_0/* .IconArrowDown */.RG,
                onMouseEnter: handleMouseEnter,
                fontSize: 20
            }) : null,
            hoverGroup
        ]
    });
};


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Steps/index.css
var Steps = __webpack_require__("gy");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Steps/index.js


function Steps_Steps(param) {
    let { children } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "rp-steps",
        children: children
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/runtime/hooks/useDark.js
var useDark = __webpack_require__("WU");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/SwitchAppearance/global.css
var SwitchAppearance_global = __webpack_require__("sr");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/SwitchAppearance/index.css
var SwitchAppearance = __webpack_require__("Zm");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/SwitchAppearance/getClipPath.js
const roundPercentage = (value)=>Math.round(1e6 * value) / 1e6;
const getClipPath = (param)=>{
    let { height, width, x, y } = param;
    const endRadius = Math.hypot(Math.max(x, width - x + 200), Math.max(y, height - y + 200));
    const normalizedDiagonal = Math.hypot(width, height) / Math.SQRT2;
    const xPercentage = roundPercentage(x / width * 100);
    const yPercentage = roundPercentage(y / height * 100);
    const endRadiusPercentage = roundPercentage(endRadius / normalizedDiagonal * 100);
    return [
        `circle(0% at ${xPercentage}% ${yPercentage}%)`,
        `circle(${endRadiusPercentage}% at ${xPercentage}% ${yPercentage}%)`
    ];
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/SwitchAppearance/index.js








const supportAppearanceTransition = ()=>'function' == typeof document?.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let isAppearanceTransitioning = false;
function SwitchAppearance_SwitchAppearance(param) {
    let { onClick } = param;
    const { theme, setTheme = ()=>{} } = (0,react.useContext)(useDark/* .ThemeContext */.D);
    const { site } = (0,useSite/* .useSite */.Z)();
    const handleClick = (event)=>{
        if (isAppearanceTransitioning) return;
        const supported = supportAppearanceTransition();
        const enabled = site?.themeConfig?.enableAppearanceAnimation;
        const nextTheme = 'dark' === theme ? 'light' : 'dark';
        if (supported && enabled) {
            isAppearanceTransitioning = true;
            const x = event.clientX;
            const y = event.clientY;
            const clipPath = getClipPath({
                height: innerHeight,
                width: innerWidth,
                x,
                y
            });
            const root = document.documentElement;
            root.style.setProperty('--rp-vt-clip-start', clipPath[0]);
            root.style.setProperty('--rp-vt-clip-end', clipPath[1]);
            root.classList.add('rp-appearance-transition');
            const cleanup = ()=>{
                root.classList.remove('rp-appearance-transition');
                root.style.removeProperty('--rp-vt-clip-start');
                root.style.removeProperty('--rp-vt-clip-end');
                isAppearanceTransitioning = false;
            };
            let updated = false;
            const updateTheme = ()=>{
                updated = true;
                (0,react_dom.flushSync)(()=>{
                    setTheme(nextTheme);
                    onClick?.();
                });
            };
            try {
                const transition = document.startViewTransition(async ()=>{
                    updateTheme();
                });
                transition.updateCallbackDone.catch(()=>{
                    transition.skipTransition();
                });
                transition.ready.catch(()=>{
                    transition.skipTransition();
                });
                transition.finished.then(cleanup, cleanup);
            } catch  {
                cleanup();
                if (!updated) updateTheme();
            }
        } else {
            setTheme(nextTheme);
            onClick?.();
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        onClick: handleClick,
        className: "rp-switch-appearance",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                className: "rp-switch-appearance__icon rp-switch-appearance__icon--sun",
                icon: theme_0/* .IconSun */.mT,
                fill: "currentColor"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                className: "rp-switch-appearance__icon rp-switch-appearance__icon--moon",
                icon: theme_0/* .IconMoon */.l0,
                fill: "currentColor"
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Tabs/index.css
var Tabs = __webpack_require__("y");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Tabs/index.js





function getTabValuesFromChildren(children, values) {
    if (values && values.length > 0) return values.map((item, index)=>{
        const content = children.find((child)=>child.props?.value === item.value) ?? children[index];
        return {
            ...item,
            content
        };
    });
    return react.Children.map(children, (child, index)=>{
        if (/*#__PURE__*/ (0,react.isValidElement)(child)) return {
            label: child.props?.label || void 0,
            value: child.props?.value,
            disabled: child.props?.disabled,
            content: children[index]
        };
        return {
            label: index,
            content: children[index]
        };
    });
}
const groupIdPrefix = 'rspress.tabs.';
const Tabs_Tabs = /*#__PURE__*/ (0,react.forwardRef)((props, ref)=>{
    const { values, defaultIndex, defaultValue, onChange, children: rawChildren, groupId, tabPosition = 'left', className, labelItemClassName, contentItemClassName, keepDOM = true } = props;
    const children = react.Children.toArray(rawChildren).filter((child)=>!('string' == typeof child && '' === child.trim()) && /*#__PURE__*/ (0,react.isValidElement)(child));
    const tabValues = (0,react.useMemo)(()=>getTabValuesFromChildren(children, values), [
        children,
        values
    ]);
    const defaultValueIndex = void 0 !== defaultValue ? tabValues.findIndex((item)=>item.value === defaultValue) : -1;
    const initialActiveIndex = -1 === defaultValueIndex ? defaultIndex ?? 0 : defaultValueIndex;
    const [activeIndex, setActiveIndex] = (0,react.useState)(initialActiveIndex);
    const [storageIndex, setStorageIndex] = (0,theme_0/* .useStorageValue */.yL)(`${groupIdPrefix}${groupId}`, initialActiveIndex.toString());
    if (false) {}
    const currentIndex = groupId ? Number(storageIndex) : activeIndex;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: dist_clsx('rp-tabs', className),
        ref: ref,
        children: [
            tabValues.length ? /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-tabs__label rp-tabs__label--no-scrollbar",
                style: {
                    justifyContent: 'center' === tabPosition ? 'center' : 'flex-start'
                },
                children: tabValues.map((param, index)=>{
                    let { label, value, disabled } = param;
                    const isActive = index === currentIndex;
                    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: dist_clsx('rp-tabs__label__item', isActive ? 'rp-tabs__label__item--selected' : 'rp-tabs__label__item--not-selected', labelItemClassName),
                        "data-index": index,
                        onClick: ()=>{
                            if (disabled) return;
                            onChange?.(index);
                            if (groupId) setStorageIndex(index.toString());
                            else setActiveIndex(index);
                        },
                        children: label
                    }, value ?? index);
                })
            }) : null,
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-tabs__content",
                children: tabValues.map((param, index)=>{
                    let { value, content } = param;
                    const isActive = index === currentIndex;
                    if (!keepDOM && !isActive) return null;
                    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: dist_clsx('rp-tabs__content__item', isActive ? 'rp-tabs__content__item--active' : 'rp-tabs__content__item--hidden', contentItemClassName),
                        "aria-hidden": !isActive,
                        "data-index": index,
                        children: content
                    }, value ?? index);
                })
            })
        ]
    });
});
Tabs_Tabs.displayName = 'Tabs';
function Tab(param) {
    let { children } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: children
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Tag/index.js




const BADGE_TAGS = {
    tip: 'tip',
    info: 'info',
    warning: 'warning',
    danger: 'danger'
};
const IMAGE_EXT_REGEXP = /\.(?:avif|gif|ico|jpe?g|png|svg|webp)(?:[?#].*)?$/i;
function parseCommonTagsArrayStr(tagStr) {
    const tags = tagStr.split(',').map((tag)=>tag.trim()).filter((tag)=>tag.length > 0);
    return tags;
}
function isPublicFolderPath(tag) {
    return tag.startsWith('/');
}
const getTagType = (tag)=>{
    const normalizedTag = tag.trim();
    const isSvgTagString = normalizedTag.startsWith('<svg');
    const isPic = (0,dist/* .isExternalUrl */.My)(normalizedTag) || (0,dist/* .isDataUrl */.ax)(normalizedTag) || isPublicFolderPath(normalizedTag) && IMAGE_EXT_REGEXP.test(normalizedTag);
    const tagsArray = isSvgTagString || isPic ? null : parseCommonTagsArrayStr(normalizedTag);
    return {
        isSvgTagString,
        isPic,
        isTagsArray: tagsArray && tagsArray?.length > 1,
        tagsArray,
        normalizedTag
    };
};
const Tag_Tag = (param)=>{
    let { tag } = param;
    if (!tag) return null;
    const { isPic, isTagsArray, isSvgTagString, normalizedTag, tagsArray } = (0,react.useMemo)(()=>getTagType(tag), [
        tag
    ]);
    if (isTagsArray) return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: tagsArray?.map((tag, index)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Tag */.OT, {
                tag: tag
            }, `${tag}-${index}`))
    });
    if (isSvgTagString) return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        dangerouslySetInnerHTML: {
            __html: normalizedTag
        },
        style: {
            width: 20,
            marginRight: 4
        }
    });
    if (isPic) return /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
        src: (0,utils/* .normalizeImagePath */.As)(normalizedTag)
    });
    if ('experimental' === normalizedTag) return /*#__PURE__*/ (0,jsx_runtime.jsxs)(theme_0/* .Badge */.Ex, {
        type: "warning",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                icon: theme_0/* .IconExperimental */.kC
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                children: "experimental"
            })
        ]
    });
    else if ('deprecated' === normalizedTag) return /*#__PURE__*/ (0,jsx_runtime.jsxs)(theme_0/* .Badge */.Ex, {
        type: "danger",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                icon: theme_0/* .IconDeprecated */.nD
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                children: "deprecated"
            })
        ]
    });
    else if ('new' === normalizedTag) return /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Badge */.Ex, {
        text: "new",
        type: "tip"
    });
    if (BADGE_TAGS[normalizedTag]) return /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Badge */.Ex, {
        text: normalizedTag,
        type: BADGE_TAGS[normalizedTag]
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Badge */.Ex, {
        text: normalizedTag,
        type: "info"
    });
};


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Toc/TocItem.css
var TocItem = __webpack_require__("n1");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Toc/TocItem.js






const TocItem_TocItem = (param)=>{
    let { header, baseHeaderLevel, active } = param;
    const ref = (0,react.useRef)(null);
    (0,react.useEffect)(()=>{
        if (active && ref.current) scroll_into_view_if_needed_dist_e(ref.current, {
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
            boundary: (element)=>{
                const isBoundary = element.classList.contains('rp-doc-layout__outline') || element.classList.contains('rspress-doc');
                return !isBoundary;
            }
        });
    }, [
        active
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Link */.N_, {
        href: `#${header.id}`,
        ref: ref,
        title: (0,theme_0/* .parseInlineMarkdownText */.zE)(header.text),
        className: dist_clsx('rp-toc-item', {
            'rp-toc-item--active': active
        }),
        style: {
            paddingLeft: (header.depth - baseHeaderLevel) * 12
        },
        'data-depth': header.depth - baseHeaderLevel,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
            className: "rp-toc-item__text rp-doc",
            ...(0,theme_0/* .renderInlineMarkdown */.nl)(header.text)
        })
    });
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/Toc/index.js



const Toc_baseHeaderLevel = 2;
function Toc() {
    const headers = (0,theme_0/* .useDynamicToc */.J6)();
    const { activeAnchorId } = (0,theme_0/* .useActiveAnchor */.R3)(headers);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: headers.map((header, index)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(TocItem_TocItem, {
                baseHeaderLevel: Toc_baseHeaderLevel,
                header: header,
                active: activeAnchorId === header.id
            }, `${header.depth}_${header.text}_${header.id}_${index}`))
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/hooks/useActiveAnchor.js


function parseCSSLength(value) {
    if (!value || 'auto' === value || 'none' === value) return 0;
    const numValue = Number.parseFloat(value);
    if (Number.isNaN(numValue)) return 0;
    return numValue;
}
const useActiveAnchor = (headers)=>{
    const [activeAnchorId, setActiveAnchorId] = (0,react.useState)();
    const [scrolledHeader, setScrolledHeader] = (0,react.useState)();
    const { hash } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    (0,react.useEffect)(()=>{
        if ("u" < typeof window) return;
        const handleScroll = ()=>{
            const scrollPaddingTop = parseCSSLength(window.getComputedStyle(document.documentElement).getPropertyValue('scroll-padding-top'));
            const topOffset = scrollPaddingTop - 5;
            const offsets = headers.map((header)=>{
                const el = document.getElementById(header.id);
                if (!el) return {
                    id: header.id,
                    top: 1 / 0
                };
                const rect = el.getBoundingClientRect();
                return {
                    id: header.id,
                    top: rect.top
                };
            });
            const scrolledIds = offsets.filter((offset)=>offset.top < topOffset).map((offset)=>offset.id);
            const visibleIds = offsets.filter((offset)=>offset.top >= topOffset && offset.top <= window.innerHeight).map((offset)=>offset.id);
            const scrolledHeaderId = scrolledIds[scrolledIds.length - 1];
            const scrolledHeader = headers.find((header)=>header.id === scrolledHeaderId);
            0 === visibleIds.length ? setActiveAnchorId(scrolledHeaderId) : setActiveAnchorId(visibleIds[0]);
            setScrolledHeader(scrolledHeader);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return ()=>{
            window.removeEventListener('scroll', handleScroll);
        };
    }, [
        headers,
        hash
    ]);
    return {
        scrolledHeader,
        activeAnchorId
    };
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/hooks/processTitleElement.js
function processTitleElement(element) {
    const elementClone = element.cloneNode(true);
    const anchorElement = elementClone.querySelector('.rp-header-anchor');
    if (anchorElement) elementClone.removeChild(anchorElement);
    const excludeElements = elementClone.querySelectorAll('.rspress-toc-exclude,.rp-toc-exclude');
    excludeElements.forEach((excludeElement)=>{
        const parentElement = excludeElement.parentElement;
        if (parentElement) parentElement.removeChild(excludeElement);
    });
    const anchorElements = elementClone.querySelectorAll('a');
    anchorElements.forEach((anchor)=>{
        const tempContainer = document.createDocumentFragment();
        while(anchor.firstChild)tempContainer.appendChild(anchor.firstChild);
        anchor.replaceWith(tempContainer);
    });
    const commentNodes = elementClone.childNodes;
    commentNodes.forEach((node)=>{
        if (node.nodeType === Node.COMMENT_NODE) node.remove();
    });
    return elementClone;
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/hooks/useDynamicToc.js



let tocSnapshot;
const listeners = new Set();
const useDynamicToc_subscribe = (listener)=>{
    listeners.add(listener);
    return ()=>listeners.delete(listener);
};
const useDynamicToc_getSnapshot = ()=>tocSnapshot;
const useDynamicToc_getServerSnapshot = ()=>void 0;
function setSnapshot(snapshot) {
    tocSnapshot = snapshot;
    for (const listener of listeners)listener();
}
function isElementOnlyVisible(element) {
    const style = window.getComputedStyle(element);
    return 'none' !== style.display && '0' !== style.opacity && 'hidden' !== style.visibility;
}
function isElementVisible(element) {
    let currentElement = element;
    const rootElement = document.querySelector('.rspress-doc');
    while(currentElement)if (!isElementOnlyVisible(currentElement)) return false;
    else {
        currentElement = currentElement.parentElement;
        if (currentElement === rootElement) break;
    }
    return true;
}
const useDynamicToc = ()=>{
    const { page: { toc = [] } } = (0,usePage/* .usePage */.e)();
    const { pathname } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const snapshot = (0,react.useSyncExternalStore)(useDynamicToc_subscribe, useDynamicToc_getSnapshot, useDynamicToc_getServerSnapshot);
    return snapshot?.pathname === pathname ? snapshot.headers : toc;
};
function updateHeaders(target, pathname) {
    const collectedHeaders = [];
    const elements = target?.querySelectorAll('.rspress-doc h2.rp-toc-include, h3.rp-toc-include, h4.rp-toc-include');
    elements?.forEach((el)=>{
        if (!el.closest('.rspress-toc-exclude,.rp-toc-exclude') && isElementVisible(el)) collectedHeaders.push({
            id: el.id,
            text: processTitleElement(el).innerHTML,
            depth: Number.parseInt(el.tagName[1], 10),
            charIndex: 0
        });
    });
    setSnapshot({
        pathname,
        headers: collectedHeaders
    });
}
const TOC_HEADING_TAGS = new Set([
    'H2',
    'H3',
    'H4'
]);
const useWatchToc = ()=>{
    const [innerRef, setRef] = (0,react.useState)(null);
    const { pathname } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    (0,react.useEffect)(()=>{
        let observer = null;
        const target = innerRef;
        if (target) updateHeaders(target, pathname);
        if (target && !observer) {
            observer = new MutationObserver((mutationList)=>{
                let needUpdate = false;
                check: for (const mutation of mutationList){
                    if ('attributes' === mutation.type) {
                        needUpdate = true;
                        break;
                    }
                    for (const nodes of [
                        mutation.addedNodes,
                        mutation.removedNodes
                    ])for (const node of nodes){
                        if (TOC_HEADING_TAGS.has(node.tagName) || node.parentElement?.closest('h2,h3,h4')) {
                            needUpdate = true;
                            break check;
                        }
                        for (const child of node.childNodes)if (TOC_HEADING_TAGS.has(child.tagName)) {
                            needUpdate = true;
                            break check;
                        }
                    }
                }
                needUpdate && updateHeaders(target, pathname);
            });
            observer.observe(target, {
                childList: true,
                subtree: true
            });
            observer.observe(document.body, {
                attributes: true,
                attributeFilter: [
                    'data-page-tabs-active-index'
                ]
            });
        }
        return ()=>{
            observer?.disconnect();
            observer = null;
            setSnapshot(void 0);
        };
    }, [
        innerRef,
        pathname
    ]);
    const rspressDocRef = (0,react.useCallback)((ref)=>{
        setRef(ref);
    }, [
        setRef
    ]);
    return {
        rspressDocRef
    };
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/logic/usePrevNextPage.js

function usePrevNextPage() {
    const { pathname } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const items = useSidebar();
    const flattenTitles = [];
    const walk = (sidebarItem)=>{
        if ('items' in sidebarItem) {
            if (sidebarItem.link) flattenTitles.push({
                text: sidebarItem.text,
                link: sidebarItem.link
            });
            sidebarItem.items.forEach((item)=>{
                'dividerType' in item || 'sectionHeaderText' in item || walk(item);
            });
        } else if ('link' in sidebarItem && sidebarItem.link) flattenTitles.push(sidebarItem);
    };
    items.forEach((item)=>walk(item));
    const pageIndex = flattenTitles.findIndex((item)=>(0,utils/* .isEqualPath */.Oy)(item.link, pathname));
    const prevPage = flattenTitles[pageIndex - 1] || null;
    const nextPage = flattenTitles[pageIndex + 1] || null;
    return {
        prevPage,
        nextPage
    };
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/hooks/useWebMcpNavigation.js





function useAwaitedNavigation(result) {
    const location = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const navigation = (0,chunk_6KYCQHYJ/* .useNavigation */.cq)();
    const navigate = (0,chunk_6KYCQHYJ/* .useNavigate */.Zp)();
    const snapshot = (0,react.useRef)({
        result,
        location,
        state: navigation.state
    });
    const pending = (0,react.useRef)(void 0);
    const settle = (0,react.useCallback)(()=>{
        const request = pending.current;
        const current = snapshot.current;
        if (!request?.done || 'idle' !== current.state || current.location.key === request.startKey) return;
        pending.current = void 0;
        request.cleanup();
        if (current.result.routePath === request.target) request.resolve(current.result);
        else request.reject(new Error('Navigation was superseded by another route.'));
    }, []);
    (0,react.useLayoutEffect)(()=>{
        snapshot.current = {
            result,
            location,
            state: navigation.state
        };
        settle();
    });
    (0,react.useLayoutEffect)(()=>()=>{
            pending.current?.cleanup();
            pending.current?.reject(new Error('Navigation failed or the page runtime was unmounted.'));
            pending.current = void 0;
        }, []);
    return (0,react.useCallback)((target, signal)=>{
        signal?.throwIfAborted();
        pending.current?.cleanup();
        pending.current?.reject(new Error('Navigation was superseded by another tool call.'));
        pending.current = void 0;
        return new Promise((resolve, reject)=>{
            const cancel = ()=>{
                if (pending.current === request) pending.current = void 0;
                request.cleanup();
                reject(signal?.reason ?? new DOMException('Navigation cancelled.', 'AbortError'));
            };
            const request = {
                target,
                startKey: snapshot.current.location.key,
                done: false,
                resolve,
                reject,
                cleanup: ()=>signal?.removeEventListener('abort', cancel)
            };
            pending.current = request;
            signal?.addEventListener('abort', cancel, {
                once: true
            });
            Promise.resolve().then(()=>{
                if (pending.current === request) return navigate((0,utils/* .normalizeHrefInRuntime */.cc)(target));
            }).then(()=>{
                if (pending.current !== request) return;
                request.done = true;
                settle();
            }).catch((error)=>{
                if (pending.current === request) pending.current = void 0;
                request.cleanup();
                reject(error);
            });
        });
    }, [
        navigate,
        settle
    ]);
}
function useWebMcpNavigation() {
    const { page } = (0,usePage/* .usePage */.e)();
    const location = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const resolveRoute = (pathname)=>(0,runtime_route/* .pathnameToRouteService */.c5)(pathname)?.path;
    const { prevPage, nextPage } = usePrevNextPage();
    const toLink = (item)=>{
        if (!item?.link) return null;
        try {
            return {
                title: item.text,
                routePath: resolveInternalRoute(item.link, {
                    origin: window.location.origin,
                    resolveRoute
                })
            };
        } catch  {
            return null;
        }
    };
    const result = {
        routePath: `${page.routePath}${location.search}${location.hash}`,
        page: {
            title: page.title,
            description: page.description,
            lang: page.lang,
            version: page.version
        },
        sections: page.toc.map((section)=>({
                title: section.text,
                depth: section.depth,
                routePath: `${page.routePath}${location.search}#${section.id}`
            })),
        previousPage: toLink(prevPage),
        nextPage: toLink(nextPage)
    };
    const navigate = useAwaitedNavigation(result);
    useWebMcp(defineTool('navigate', 'Navigate to a known internal documentation route and return the rendered page metadata, section routes and adjacent pages. Paths are relative to the site base and may include a query or hash.', {
        routePath: routePathField
    }, [
        'routePath'
    ], (args, signal)=>navigate(resolveInternalRoute(args.routePath, {
            origin: window.location.origin,
            resolveRoute
        }), signal)));
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/hooks/useWebMcpPageList.js


function useWebMcpPageList() {
    const { page } = (0,usePage/* .usePage */.e)();
    const { pages } = (0,usePages/* .usePages */.Qd)();
    useWebMcp(defineTool('list_pages', "List documentation pages, optionally filtering titles, descriptions and headings. Defaults to the active language and version.", {
        query: queryField,
        lang: {
            type: 'string'
        },
        version: {
            type: 'string'
        },
        limit: {
            type: 'integer',
            minimum: 1,
            maximum: 100
        },
        offset: {
            type: 'integer',
            minimum: 0
        }
    }, [], (args)=>listPages(pages, page, args)));
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/hooks/useWebMcpPageReading.js


function useWebMcpPageReading() {
    const { page } = (0,usePage/* .usePage */.e)();
    const { site } = (0,useSite/* .useSite */.Z)();
    const { pages } = (0,usePages/* .usePages */.Qd)();
    useWebMcp(defineTool('get_page', 'Read metadata, frontmatter, table of contents and generated Markdown for the documentation page specified by routePath, without navigating. Paths are relative to the site base.', {
        routePath: routePathField
    }, [
        'routePath'
    ], (args, signal)=>{
        const target = resolveInternalRoute(args.routePath, {
            origin: window.location.origin,
            resolveRoute: (pathname)=>(0,runtime_route/* .pathnameToRouteService */.c5)(pathname)?.path
        });
        const path = (0,runtime_route/* .pathnameToRouteService */.c5)(new URL(target, window.location.origin).pathname)?.path;
        const targetPage = pages.find((page)=>page.routePath === path);
        if (!targetPage) throw new TypeError(`Unknown internal route: ${path}`);
        return readPage(targetPage, site.base, signal);
    }));
    useWebMcp(defineTool('get_current_page', 'Read metadata, frontmatter, table of contents and generated Markdown for the documentation page currently open in the browser.', {}, [], (_args, signal)=>readPage(page, site.base, signal)));
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/hooks/useWebMcpSiteInfo.js


function useWebMcpSiteInfo() {
    const { site } = (0,useSite/* .useSite */.Z)();
    const { page } = (0,usePage/* .usePage */.e)();
    const nav = useNav();
    const sidebar = useSidebar();
    useWebMcp(defineTool('get_site_info', 'Get documentation site metadata, languages, versions, navigation and the active sidebar.', {}, [], ()=>({
            title: site.title,
            description: site.description,
            base: site.base,
            siteOrigin: site.siteOrigin,
            lang: page.lang,
            version: page.version,
            locales: site.locales,
            versions: site.multiVersion.versions,
            defaultVersion: site.multiVersion.default,
            nav,
            sidebar
        })));
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/SidebarMenu/index.css
var SidebarMenu = __webpack_require__("ng");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/SidebarMenu/index.js






const SidebarMenu_SidebarMenu = /*#__PURE__*/ (0,react.forwardRef)((param, forwardedRef)=>{
    let { isSidebarOpen, onIsSidebarOpenChange, isOutlineOpen, onIsOutlineOpenChange, beforeOutline, afterOutline } = param;
    const sidebarMenuRef = (0,react.useRef)(null);
    const t = useI18n();
    const { pathname, hash } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const headers = (0,theme_0/* .useDynamicToc */.J6)();
    const { scrolledHeader } = (0,theme_0/* .useActiveAnchor */.R3)(headers);
    const outlineDisabled = !beforeOutline && !afterOutline && 0 === headers.length;
    const { frontmatter: { sidebar: sidebarConfig = true, outline: showOutline = true } } = useFrontmatter();
    const showSidebar = true === sidebarConfig;
    function openSidebar() {
        onIsSidebarOpenChange(true);
    }
    function closeSidebar() {
        onIsSidebarOpenChange(false);
    }
    function openOutline() {
        onIsOutlineOpenChange(!isOutlineOpen);
    }
    function closeOutline() {
        onIsOutlineOpenChange(false);
    }
    (0,react.useEffect)(()=>{
        closeSidebar();
    }, [
        pathname
    ]);
    (0,react.useEffect)(()=>{
        if (hash) closeOutline();
    }, [
        hash
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-sidebar-menu",
                ref: (ref)=>{
                    sidebarMenuRef.current = ref;
                    if ('function' == typeof forwardedRef) forwardedRef(sidebarMenuRef.current);
                    else if (forwardedRef) forwardedRef.current = sidebarMenuRef.current;
                },
                children: [
                    showSidebar ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
                        type: "button",
                        onClick: openSidebar,
                        className: "rp-sidebar-menu__left",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                                icon: theme_0/* .IconMenu */.dd
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                children: t('menuTitle')
                            })
                        ]
                    }) : /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "rp-sidebar-menu__left"
                    }),
                    showOutline ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
                        type: "button",
                        disabled: outlineDisabled,
                        onClick: (e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            openOutline();
                        },
                        className: "rp-sidebar-menu__right",
                        children: [
                            scrolledHeader?.text ? /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                className: "rp-sidebar-menu__right__text rp-doc",
                                ...(0,theme_0/* .renderInlineMarkdown */.nl)(scrolledHeader.text)
                            }) : /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                className: "rp-sidebar-menu__right__text",
                                children: t('outlineTitle')
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .ReadPercent */.a9, {
                                size: 14,
                                strokeWidth: 2
                            }),
                            !outlineDisabled && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .SvgWrapper */.Ge, {
                                icon: theme_0/* .IconArrowRight */.hI,
                                className: "rp-sidebar-menu__right__icon",
                                style: {
                                    transform: isOutlineOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease-out'
                                }
                            })
                        ]
                    }) : /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "rp-sidebar-menu__right"
                    })
                ]
            }),
            (isSidebarOpen || isOutlineOpen) && /*#__PURE__*/ (0,react_dom.createPortal)(/*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                onClick: closeSidebar,
                className: "rp-sidebar-menu__mask"
            }), document.getElementById('__rspress_modal_container'))
        ]
    });
});


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/SidebarMenu/useClickOutside.js

function useClickOutside(ref, handler) {
    (0,react.useEffect)(()=>{
        const listener = (event)=>{
            const refs = Array.isArray(ref) ? ref : [
                ref
            ];
            for (const r of refs){
                const { current: el } = r;
                if (el?.contains(event.target)) return;
            }
            handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchend', listener);
        return ()=>{
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchend', listener);
        };
    }, [
        ref,
        handler
    ]);
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/components/SidebarMenu/useSidebarMenu.js





function useSidebarMenu(beforeOutline, afterOutline) {
    const [isSidebarOpen, setIsSidebarOpen] = (0,react.useState)(false);
    const [isOutlineOpen, setIsOutlineOpen] = (0,react.useState)(false);
    const sidebarMenuRef = (0,react.useRef)(null);
    const sidebarLayoutRef = (0,react.useRef)(null);
    const asideLayoutRef = (0,react.useRef)(null);
    (0,react.useEffect)(()=>{
        sidebarMenuRef.current && isSidebarOpen && bodyScrollLock_esm_disableBodyScroll(sidebarMenuRef.current, {
            reserveScrollBarGap: true,
            allowTouchMove: ()=>true
        });
        return ()=>{
            bodyScrollLock_esm_clearAllBodyScrollLocks();
        };
    }, [
        isSidebarOpen
    ]);
    useClickOutside([
        sidebarMenuRef,
        sidebarLayoutRef
    ], ()=>{
        setIsSidebarOpen(false);
    });
    useClickOutside([
        sidebarMenuRef,
        asideLayoutRef
    ], ()=>{
        setIsOutlineOpen(false);
    });
    const sidebarMenu = (0,react.useMemo)(()=>/*#__PURE__*/ (0,jsx_runtime.jsx)(SidebarMenu_SidebarMenu, {
            isSidebarOpen: isSidebarOpen,
            onIsSidebarOpenChange: setIsSidebarOpen,
            isOutlineOpen: isOutlineOpen,
            onIsOutlineOpenChange: setIsOutlineOpen,
            ref: sidebarMenuRef,
            beforeOutline: beforeOutline,
            afterOutline: afterOutline
        }), [
        isOutlineOpen,
        isSidebarOpen,
        setIsOutlineOpen,
        setIsSidebarOpen,
        beforeOutline,
        afterOutline
    ]);
    return {
        sidebarMenu,
        isOutlineOpen,
        isSidebarOpen,
        sidebarLayoutRef,
        asideLayoutRef
    };
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/layout/DocLayout/index.css
var DocLayout = __webpack_require__("JG");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/layout/DocLayout/index.js






function DocLayout_DocLayout(props) {
    const { beforeDocFooter, afterDocFooter, beforeDoc, afterDoc, beforeDocContent, afterDocContent, beforeOutline, afterOutline, beforeSidebar, afterSidebar, components } = props;
    const { frontmatter } = useFrontmatter();
    const { isOutlineOpen, isSidebarOpen, sidebarMenu, asideLayoutRef, sidebarLayoutRef } = useSidebarMenu(beforeOutline, afterOutline);
    const { rspressDocRef } = (0,theme_0/* .useWatchToc */.n6)();
    const isOverviewPage = frontmatter?.overview ?? false;
    const sidebar = frontmatter?.sidebar ?? true;
    const showSidebar = true === sidebar;
    const showSidebarPlaceholder = false === sidebar || 'placeholder' === sidebar;
    const isLegacyPlaceholder = 'placeholder' === sidebar;
    const { outline: showOutline = true, footer: showDocFooter = true, pageType } = frontmatter;
    const showSidebarMenu = showSidebar || !isOverviewPage && showOutline;
    if (false) {}
    const isDocWide = 'doc-wide' === pageType;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            showSidebarMenu && /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-doc-layout__menu",
                children: sidebarMenu
            }),
            beforeDoc,
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: dist_clsx('rp-doc-layout__container', !showSidebarMenu && 'rp-doc-layout__container--no-menu'),
                children: [
                    showSidebar ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("aside", {
                        className: dist_clsx('rp-doc-layout__sidebar', isSidebarOpen && 'rp-doc-layout__sidebar--open', 'rp-scrollbar'),
                        ref: sidebarLayoutRef,
                        children: [
                            beforeSidebar,
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Sidebar */.Bx, {}),
                            afterSidebar
                        ]
                    }) : showSidebarPlaceholder ? /*#__PURE__*/ (0,jsx_runtime.jsx)("aside", {
                        className: dist_clsx('rp-doc-layout__sidebar-placeholder', isLegacyPlaceholder && 'rp-doc-layout__sidebar-placeholder--legacy'),
                        style: isDocWide ? {
                            width: '0'
                        } : {}
                    }) : null,
                    isOverviewPage ? /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("main", {
                            className: "rp-doc-layout__overview",
                            children: [
                                beforeDocContent,
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Overview */.Aw, {
                                    content: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .DocContent */.As, {
                                        components: components,
                                        isOverviewPage: true
                                    })
                                }),
                                afterDocContent
                            ]
                        })
                    }) : /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: dist_clsx('rp-doc-layout__doc', isDocWide && 'rp-doc-layout__doc--wide'),
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("main", {
                            className: "rp-doc-layout__doc-container",
                            children: [
                                beforeDocContent,
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                    className: "rp-doc rspress-doc",
                                    ref: rspressDocRef,
                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .DocContent */.As, {
                                        components: components
                                    })
                                }),
                                afterDocContent,
                                beforeDocFooter,
                                showDocFooter && /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .DocFooter */.co, {}),
                                afterDocFooter
                            ]
                        })
                    }),
                    isOverviewPage ? null : showOutline ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("aside", {
                        className: dist_clsx('rp-doc-layout__outline', isOutlineOpen && 'rp-doc-layout__outline--open', 'rp-scrollbar'),
                        ref: asideLayoutRef,
                        children: [
                            beforeOutline,
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Outline */.Rc, {}),
                            afterOutline
                        ]
                    }) : /*#__PURE__*/ (0,jsx_runtime.jsx)("aside", {
                        className: "rp-doc-layout__outline-placeholder",
                        style: isDocWide ? {
                            width: '0'
                        } : {}
                    })
                ]
            }),
            afterDoc
        ]
    });
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/layout/Layout/index.js





const concatTitle = (title, suffix)=>{
    if (!suffix) return title;
    title = title.trim();
    suffix = suffix.trim();
    if (!suffix.startsWith('-') && !suffix.startsWith('|')) return `${title} - ${suffix}`;
    return `${title} ${suffix}`;
};
const HeadTags = /*#__PURE__*/ (0,react.memo)((props)=>{
    const { lang, frontmatter, description, title } = props;
    const head = frontmatter.head;
    const frontmatterTags = (0,react.useMemo)(()=>head?.map((param)=>{
            let [tagName, attrs] = param;
            return tagName ? /*#__PURE__*/ react.createElement(tagName, {
                ...attrs
            }) : null;
        }), [
        head
    ]);
    const frontmatterMetaProperties = (0,react.useMemo)(()=>{
        const properties = new Set();
        if (head) for (const [tagName, attrs] of head){
            if ('meta' === tagName && attrs?.property) properties.add(attrs.property);
            if ('meta' === tagName && attrs?.name) properties.add(attrs.name);
        }
        return properties;
    }, [
        head
    ]);
    dist_useHead({
        htmlAttrs: {
            lang: lang || 'en'
        },
        title: title || void 0,
        meta: [
            frontmatterMetaProperties.has('og:type') ? void 0 : {
                property: 'og:type',
                content: 'website'
            },
            title && !frontmatterMetaProperties.has('og:title') ? {
                property: 'og:title',
                content: title
            } : void 0,
            ...description ? [
                frontmatterMetaProperties.has("description") ? void 0 : {
                    name: "description",
                    content: description
                },
                frontmatterMetaProperties.has("og:description") ? void 0 : {
                    property: "og:description",
                    content: description
                }
            ] : []
        ]
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(Head, {
        children: frontmatterTags ?? null
    });
});
const ClientEffects = ()=>{
    (0,theme_0/* .useSetup */.zV)();
    return null;
};
function Layout(props) {
    const { top, bottom, beforeDocFooter, afterDocFooter, beforeDoc, afterDoc, beforeDocContent, afterDocContent, beforeSidebar, afterSidebar, beforeOutline, afterOutline, beforeNavTitle, afterNavTitle, navTitle, beforeNav, afterNav, beforeHero, afterHero, beforeFeatures, afterFeatures, beforeLeftNavItems, afterLeftNavItems, beforeRightNavItems, afterRightNavItems, beforeNavMenu, afterNavMenu, components, HomeLayout = theme_0/* .HomeLayout */.mI, NotFoundLayout = theme_0/* .NotFoundLayout */.Ab } = props;
    const docProps = {
        beforeDocFooter,
        afterDocFooter,
        beforeDocContent,
        afterDocContent,
        beforeDoc,
        afterDoc,
        beforeSidebar,
        afterSidebar,
        beforeOutline,
        afterOutline,
        components
    };
    const homeProps = {
        beforeHero,
        afterHero,
        beforeFeatures,
        afterFeatures
    };
    const { page } = (0,usePage/* .usePage */.e)();
    const { site } = (0,useSite/* .useSite */.Z)();
    const { frontmatter } = useFrontmatter();
    const { pageType, lang: currentLang, title: articleTitle } = page;
    const localesData = useLocaleSiteData();
    const { navbar: showNavbar = true } = frontmatter;
    let title = frontmatter.title ?? articleTitle;
    const mainTitle = site.title || localesData.title || '';
    title = title && ('doc' === pageType || 'doc-wide' === pageType) ? concatTitle(title, frontmatter.titleSuffix || mainTitle) : 'home' === pageType ? concatTitle(mainTitle, frontmatter.titleSuffix) : '404' === pageType ? concatTitle('404', mainTitle) : mainTitle;
    const description = page.description || site.description || localesData.description;
    const getContentLayout = ()=>{
        switch(pageType){
            case 'home':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(HomeLayout, {
                    ...homeProps
                });
            case 'doc':
            case 'doc-wide':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .DocLayout */.fS, {
                    ...docProps,
                    navTitle: navTitle
                });
            case '404':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(NotFoundLayout, {});
            case 'custom':
            case 'blank':
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(Content, {});
            default:
                return /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .DocLayout */.fS, {
                    ...docProps
                });
        }
    };
    if (false) {}
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ClientEffects, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(HeadTags, {
                lang: currentLang,
                title: title,
                description: description,
                frontmatter: frontmatter
            }),
            top,
            'blank' !== pageType && showNavbar && /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                children: [
                    beforeNav,
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Nav */.so, {
                        beforeNavTitle: beforeNavTitle,
                        afterNavTitle: afterNavTitle,
                        navTitle: navTitle,
                        beforeLeftNavItems: beforeLeftNavItems,
                        afterLeftNavItems: afterLeftNavItems,
                        beforeRightNavItems: beforeRightNavItems,
                        afterRightNavItems: afterRightNavItems,
                        beforeNavMenu: beforeNavMenu,
                        afterNavMenu: afterNavMenu
                    }),
                    afterNav
                ]
            }),
            getContentLayout(),
            bottom
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/layout/NotFountLayout/index.css
var NotFountLayout = __webpack_require__("sS");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/layout/NotFountLayout/index.js




function NotFountLayout_NotFoundLayout() {
    const { siteData, page } = usePageData();
    const defaultLang = siteData.lang;
    const defaultVersion = siteData.multiVersion.default;
    const t = useI18n();
    if (defaultLang && "u" > typeof window) {
        const regexp = new RegExp(`/${defaultLang}(\\/|$)`);
        if (regexp.test(location.pathname)) {
            const redirectUrl = location.pathname.replace(regexp, '/');
            window.location.replace(redirectUrl);
            return null;
        }
    }
    let root = '/';
    if (defaultVersion && page.version !== defaultVersion) root += `${page.version}/`;
    if (defaultLang && page.lang !== defaultLang) root += `${page.lang}/`;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "rp-not-found",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                className: "rp-not-found__error-code",
                children: "404"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                className: "rp-not-found__title",
                children: t('notFoundText')
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-not-found__divider"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-not-found__action",
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(theme_0/* .Link */.N_, {
                    className: "rp-not-found__home-link",
                    href: root,
                    "aria-label": "go to home",
                    children: t('takeMeHomeText')
                })
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/layout/ErrorLayout/index.css
var ErrorLayout = __webpack_require__("mf");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/layout/ErrorLayout/index.js







function ErrorLayout_ErrorLayout(param) {
    let { error, lang, homeHref } = param;
    const i18n = useI18nText();
    const title = (0,react.useRef)(null);
    const text = (key, fallback)=>i18n[key]?.[lang] || fallback;
    const heading = text('errorTitleText', 'Something went wrong');
    dist_useHead({
        title: heading
    });
    const response = (0,chunk_6KYCQHYJ/* .isRouteErrorResponse */.pX)(error);
    const details =  false ? 0 : void 0;
    (0,react.useEffect)(()=>{
        title.current?.focus();
    }, [
        heading
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("main", {
        className: "rp-not-found rp-error",
        "aria-labelledby": "rp-error-title",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                className: "rp-not-found__error-code",
                children: response ? error.status : 'ERROR'
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                className: "rp-not-found__title",
                id: "rp-error-title",
                ref: title,
                tabIndex: -1,
                children: heading
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "rp-not-found__divider"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                className: "rp-error__description",
                children: text("errorDescriptionText", 'This page could not be loaded. Try reloading it or return to the home page.')
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "rp-not-found__action rp-error__actions",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                        type: "button",
                        className: "rp-not-found__home-link",
                        onClick: ()=>window.location.reload(),
                        children: text('reloadPageText', 'Reload page')
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                        className: "rp-not-found__home-link",
                        href: homeHref,
                        children: text('takeMeHomeText', 'Take me home')
                    })
                ]
            }),
            details && /*#__PURE__*/ (0,jsx_runtime.jsxs)("details", {
                className: "rp-error__details",
                open: true,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("summary", {
                        children: text('errorDetailsText', 'Error details')
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("pre", {
                        children: details
                    })
                ]
            })
        ]
    });
}


// EXTERNAL MODULE: ./node_modules/.pnpm/copy-to-clipboard@3.3.3/node_modules/copy-to-clipboard/index.js
var copy_to_clipboard = __webpack_require__("Sv");
var copy_to_clipboard_default = /*#__PURE__*/__webpack_require__.n(copy_to_clipboard);
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/logic/copyToClipboard.js

async function copyToClipboard(text) {
    if ("u" > typeof navigator && navigator.clipboard?.writeText) try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch  {}
    if ("u" < typeof document) return false;
    return copy_to_clipboard_default()(text);
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/logic/getCopyableText.js
function getCopyableText(element) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!element) return '';
    const { ignoreClasses = [], ignoreSelectors = [] } = options;
    const nodeFilter = element.ownerDocument.defaultView?.NodeFilter ?? NodeFilter;
    const walk = element.ownerDocument.createTreeWalker(element, nodeFilter.SHOW_TEXT);
    let text = '';
    let node = walk.nextNode();
    const markdownState = {
        seenNodes: new WeakSet()
    };
    let previousBlock = null;
    while(node){
        const parentElement = node.parentElement;
        const shouldIgnore = !parentElement || ignoreClasses.some((className)=>parentElement.classList.contains(className)) || ignoreSelectors.some((selector)=>parentElement.closest(selector));
        if (!shouldIgnore) {
            const currentBlock = getBlockElement(parentElement, element);
            if ((node.previousSibling?.nodeName === 'BR' || parentElement.previousSibling?.nodeName === 'BR') && !text.endsWith('\n')) text += '\n';
            if (currentBlock && previousBlock && currentBlock !== previousBlock && !text.endsWith('\n')) text += '\n';
            text += toMarkdown(parentElement, markdownState);
            text += node.nodeValue ?? '';
            previousBlock = currentBlock;
        }
        node = walk.nextNode();
    }
    return text;
}
function getBlockElement(element, rootElement) {
    const blockElement = element.closest('li, p, div, pre, blockquote');
    if (!blockElement) return null;
    return rootElement.contains(blockElement) ? blockElement : null;
}
function toMarkdown(node, state) {
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const element = node;
    if (element.closest('pre') || element.closest('code')) return '';
    const listItem = element.closest('li');
    if (listItem && !state.seenNodes.has(listItem)) {
        state.seenNodes.add(listItem);
        return toMarkdownListItem(listItem);
    }
    return '';
}
function toMarkdownListItem(listItem) {
    const list = listItem.parentElement;
    if (!list) return '- ';
    if ('OL' === list.tagName) {
        const listItems = Array.from(list.children).filter((child)=>'LI' === child.tagName);
        const index = listItems.indexOf(listItem);
        return `${index + 1}. `;
    }
    return '- ';
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/logic/useSetup.js
function useSetup() {}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/logic/useStorageValue.js

const SYNC_STORAGE_EVENT_NAME = 'RSPRESS_SYNC_STORAGE_EVENT_NAME';
const getStorageItem = (key)=>{
    if ("u" < typeof window) return null;
    try {
        return window.localStorage.getItem(key);
    } catch  {
        return null;
    }
};
const setStorageItem = (key, value)=>{
    if ("u" < typeof window) return;
    try {
        if (null == value) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, value);
    } catch (error) {
        console.warn(`[useStorageValue] Failed to set localStorage key "${key}":`, error);
    }
};
const useStorageValue = (key, defaultValue)=>{
    const subscribe = (0,react.useCallback)((onStoreChange)=>{
        if ("u" < typeof window) return ()=>{};
        const handleStorage = (event)=>{
            if (event.key === key || null === event.key) onStoreChange();
        };
        const handleCustomEvent = (event)=>{
            const customEvent = event;
            if (customEvent.detail?.key === key) onStoreChange();
        };
        window.addEventListener('storage', handleStorage);
        window.addEventListener(SYNC_STORAGE_EVENT_NAME, handleCustomEvent);
        return ()=>{
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener(SYNC_STORAGE_EVENT_NAME, handleCustomEvent);
        };
    }, [
        key
    ]);
    const getSnapshot = (0,react.useCallback)(()=>{
        const raw = getStorageItem(key);
        return null !== raw ? raw : defaultValue;
    }, [
        key,
        defaultValue
    ]);
    const getServerSnapshot = (0,react.useCallback)(()=>defaultValue, [
        defaultValue
    ]);
    const value = (0,react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
    const setValue = (0,react.useCallback)((action)=>{
        const currentStored = getStorageItem(key);
        const currentValue = null !== currentStored ? currentStored : defaultValue;
        const nextValue = 'function' == typeof action ? action(currentValue) : action;
        null == nextValue ? setStorageItem(key, null) : setStorageItem(key, String(nextValue));
        if ("u" > typeof window) window.dispatchEvent(new CustomEvent(SYNC_STORAGE_EVENT_NAME, {
            detail: {
                key,
                newValue: nextValue
            }
        }));
    }, [
        key,
        defaultValue
    ]);
    return [
        value,
        setValue
    ];
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/logic/applyThemeToDOM.js
const applyThemeToDOM = (theme)=>{
    const root = document?.documentElement;
    if (!root) return;
    const isDark = 'dark' === theme;
    const changed = root.classList.contains('dark') !== isDark;
    root.classList.toggle('dark', isDark);
    root.classList.toggle('rp-dark', isDark);
    root.style.colorScheme = theme;
    if (changed) {
        root.classList.add('rp-theme-switching');
        window.getComputedStyle(root).opacity;
        requestAnimationFrame(()=>{
            root.classList.remove('rp-theme-switching');
        });
    }
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/logic/useMediaQuery.js

const useMediaQuery = (query)=>{
    const [matches, setMatches] = (0,react.useState)(()=>"u" > typeof window ? window.matchMedia(query).matches : false);
    (0,react.useEffect)(()=>{
        const mediaQueryList = window.matchMedia(query);
        const listener = (e)=>setMatches(e.matches);
        mediaQueryList.addEventListener('change', listener);
        return ()=>mediaQueryList.removeEventListener('change', listener);
    }, [
        query
    ]);
    return matches;
};


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/logic/useThemeState.js






const APPEARANCE_KEY = 'rspress-theme-appearance';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';
function useSystemTheme() {
    const prefersDark = useMediaQuery(MEDIA_QUERY);
    const system = prefersDark ? 'dark' : 'light';
    return system;
}
function useThemeState() {
    const { site } = (0,useSite/* .useSite */.Z)();
    const { darkMode } = site.themeConfig;
    const canSwitchDarkMode = (0,dist/* .isDarkModeSwitchEnabled */.Nv)(darkMode);
    const defaultThemeConfig = (0,dist/* .getDefaultDarkModeValue */.Km)(darkMode);
    const [storedConfig, setStoredConfig] = useStorageValue(APPEARANCE_KEY, defaultThemeConfig);
    const validatedStoredConfig = 'light' === storedConfig || 'dark' === storedConfig || 'auto' === storedConfig ? storedConfig : null;
    const system = useSystemTheme();
    const themeConfigValue = canSwitchDarkMode ? validatedStoredConfig ?? defaultThemeConfig : defaultThemeConfig;
    const theme = 'auto' === themeConfigValue ? system : themeConfigValue;
    const setTheme = (0,react.useCallback)((value)=>{
        if (!canSwitchDarkMode) return;
        setStoredConfig(system === value ? 'auto' : value);
        applyThemeToDOM(value);
    }, [
        canSwitchDarkMode,
        system,
        setStoredConfig
    ]);
    (0,react.useLayoutEffect)(()=>{
        applyThemeToDOM(theme);
    }, [
        theme
    ]);
    return [
        theme,
        setTheme
    ];
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/logic/utils.js
function renderHtmlOrText(str) {
    if (!str) return {
        children: null
    };
    if ('number' == typeof str) return {
        children: str.toString()
    };
    const hasValidHtmlElements = /<([a-z]+)([^<]*)(?:>(.*?)<\/\1>|\s*\/>)/i.test(str);
    const hasValidHtmlEntities = /&(?:[a-z][0-9a-z]*|#(?:\d+|x[0-9a-f]+));/i.test(str);
    if (hasValidHtmlElements || hasValidHtmlEntities) return {
        dangerouslySetInnerHTML: {
            __html: str
        }
    };
    return {
        children: str.replace(/\\</g, '<').replace(/\\>/g, '>').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    };
}
const STRONG_TEXT_PATTERN = /\*{2}(?!\*)(.*?)\*{2}(?!\*)/g;
const EMPHASIS_TEXT_PATTERN = /\*(?!\*)(.*?)\*(?!\*)/g;
const DELETE_TEXT_PATTERN = /~{2}(.*?)~{2}/g;
const HTML_TAG_PATTERN = /<\/?[a-z][^>]*>/gi;
const HTML_VOID_ELEMENT_PATTERN = /<(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)(?=[\s/>])[^>]*>/gi;
const HTML_ENTITY_PATTERN = /&(#\d+|#x[0-9a-f]+|[a-z][0-9a-z]*);/gi;
const NAMED_HTML_ENTITIES = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: '\u00A0',
    quot: '"'
};
function decodeHtmlEntities(text) {
    return text.replace(HTML_ENTITY_PATTERN, (match, entity)=>{
        if (!entity.startsWith('#')) return NAMED_HTML_ENTITIES[entity.toLowerCase()] ?? match;
        const isHex = 'x' === entity[1] || 'X' === entity[1];
        const codePoint = Number.parseInt(isHex ? entity.slice(2) : entity.slice(1), isHex ? 16 : 10);
        const isScalarValue = codePoint <= 0x10ffff && !(codePoint >= 0xd800 && codePoint <= 0xdfff);
        return isScalarValue ? String.fromCodePoint(codePoint) : match;
    });
}
function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function protectInlineMarkdown(text) {
    let marker = '\u0000';
    while(text.includes(marker))marker += '\u0000';
    const fragments = [];
    const protect = function(value) {
        let html = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : escapeHtml(value);
        const index = fragments.push({
            text: value,
            html
        }) - 1;
        return `${marker}${index}${marker}`;
    };
    const pattern = /\\([!-/:-@[-`{-~])|`+|<code\b[^>]*>[\s\S]*?<\/code>|&(#\d+|#x[0-9a-f]+|[a-z][0-9a-z]*);/gi;
    const backticks = /`+/g;
    let result = '';
    let offset = 0;
    let match;
    while(match = pattern.exec(text)){
        result += text.slice(offset, match.index);
        if (match[1]) result += protect(match[1]);
        else if (match[0].startsWith('&')) result += protect(decodeHtmlEntities(match[0]), match[0]);
        else if (match[0].startsWith('<')) result += protect(decodeHtmlEntities(match[0].replace(HTML_TAG_PATTERN, '')), match[0]);
        else {
            backticks.lastIndex = pattern.lastIndex;
            let closing;
            while(closing = backticks.exec(text))if (closing[0].length === match[0].length) break;
            if (closing) {
                let value = text.slice(pattern.lastIndex, closing.index).replace(/\r\n?|\n/g, ' ');
                if (value.startsWith(' ') && value.endsWith(' ') && /[^ ]/.test(value)) value = value.slice(1, -1);
                result += protect(value, `<code>${escapeHtml(value)}</code>`);
                pattern.lastIndex = closing.index + closing[0].length;
            } else result += protect(match[0]);
        }
        offset = pattern.lastIndex;
    }
    result += text.slice(offset);
    return {
        text: result,
        restore: (value, format)=>value.replace(new RegExp(`${marker}(\\d+)${marker}`, 'g'), (_, index)=>fragments[Number(index)][format])
    };
}
function renderInlineMarkdown(text) {
    const protectedText = protectInlineMarkdown(text);
    const source = renderHtmlOrText(protectedText.text);
    const htmlText = ('children' in source ? escapeHtml(source.children ?? '') : source.dangerouslySetInnerHTML.__html).replace(STRONG_TEXT_PATTERN, '<strong>$1</strong>').replace(EMPHASIS_TEXT_PATTERN, '<em>$1</em>').replace(DELETE_TEXT_PATTERN, '<del>$1</del>');
    return {
        dangerouslySetInnerHTML: {
            __html: protectedText.restore(htmlText, 'html')
        }
    };
}
function parseInlineMarkdownText(mdx) {
    const protectedText = protectInlineMarkdown(mdx);
    const source = renderHtmlOrText(protectedText.text.replace(HTML_VOID_ELEMENT_PATTERN, ''));
    const plainText = ('children' in source ? source.children ?? '' : source.dangerouslySetInnerHTML.__html.replace(HTML_TAG_PATTERN, '')).replace(STRONG_TEXT_PATTERN, '$1').replace(EMPHASIS_TEXT_PATTERN, '$1').replace(DELETE_TEXT_PATTERN, '$1');
    return protectedText.restore(decodeHtmlEntities(plainText), 'text').trim();
}


;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/dist/theme/index.js












































































},
"WX"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.d(__webpack_exports__, {
  m: () => (HomeLayout)
});
/* import */ var react_jsx_runtime__rspack_import_0 = __webpack_require__("A8");
/* import */ var _rspress_core_theme__rspack_import_1 = __webpack_require__("L");



function HomeLayoutMarkdown() {
    const { frontmatter } = useFrontmatter();
    const hero = frontmatter?.hero;
    const features = frontmatter?.features;
    const lines = [];
    if (hero) {
        if (hero.name) {
            lines.push(`# ${hero.name}`);
            lines.push('');
        }
        if (hero.text) {
            lines.push(hero.text);
            lines.push('');
        }
        if (hero.tagline) {
            lines.push(`> ${hero.tagline}`);
            lines.push('');
        }
        if (hero.actions && hero.actions.length > 0) {
            const actionLinks = hero.actions.map((action)=>`[${action.text}](${action.link})`).join(' | ');
            lines.push(actionLinks);
            lines.push('');
        }
    }
    if (features && features.length > 0) {
        lines.push('## Features');
        lines.push('');
        for (const feature of features){
            const icon = feature.icon ? `${feature.icon} ` : '';
            const title = feature.link ? `[${icon}**${feature.title}**](${feature.link})` : `${icon}**${feature.title}**`;
            lines.push(`- ${title}: ${feature.details}`);
        }
        lines.push('');
    }
    return /*#__PURE__*/ jsx(Fragment, {
        children: lines.join('\n')
    });
}
function HomeLayout(props) {
    if (false) {}
    const { beforeHero, afterHero, beforeFeatures, afterFeatures, beforeHeroActions, afterHeroActions } = props;
    return /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsxs)(react_jsx_runtime__rspack_import_0.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)(_rspress_core_theme__rspack_import_1/* .HomeBackground */.Eg, {}),
            beforeHero,
            /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)(_rspress_core_theme__rspack_import_1/* .HomeHero */.UQ, {
                beforeHeroActions: beforeHeroActions,
                afterHeroActions: afterHeroActions
            }),
            afterHero,
            beforeFeatures,
            /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)(_rspress_core_theme__rspack_import_1/* .HomeFeature */.K6, {}),
            afterFeatures,
            /*#__PURE__*/ (0,react_jsx_runtime__rspack_import_0.jsx)(_rspress_core_theme__rspack_import_1/* .HomeFooter */.hM, {})
        ]
    });
}



},
"c"(__unused_rspack_module, __unused_rspack___webpack_exports__, __webpack_require__) {
"use strict";
/* import */ var nprogress_nprogress_css__rspack_import_0 = __webpack_require__("J");
/* import */ var _vars_brand_vars_css__rspack_import_1 = __webpack_require__("o");
/* import */ var _vars_shiki_vars_css__rspack_import_2 = __webpack_require__("Q");
/* import */ var _vars_code_vars_css__rspack_import_3 = __webpack_require__("g");
/* import */ var _vars_home_vars_css__rspack_import_4 = __webpack_require__("z");
/* import */ var _vars_base_vars_css__rspack_import_5 = __webpack_require__("a");
/* import */ var _base_css__rspack_import_6 = __webpack_require__("og");
/* import */ var _scrollbar_css__rspack_import_7 = __webpack_require__("W");
/* import */ var _shiki_css__rspack_import_8 = __webpack_require__("u");











},
"LS"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ MediumZoom_MediumZoom)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react-router@7.18.5_react-dom@19.3.1_react@19.3.1__react@19.3.1/node_modules/react-router/dist/development/chunk-6KYCQHYJ.mjs
var chunk_6KYCQHYJ = __webpack_require__("q");
;// CONCATENATED MODULE: ./node_modules/.pnpm/medium-zoom@1.1.2/node_modules/medium-zoom/dist/medium-zoom.esm.js
/*! medium-zoom 1.1.2 | MIT License | https://github.com/francoischalifour/medium-zoom */
function medium_zoom_esm_n(){return medium_zoom_esm_n=Object.assign?Object.assign.bind():function(n){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var e in t)({}).hasOwnProperty.call(t,e)&&(n[e]=t[e])}return n},medium_zoom_esm_n.apply(null,arguments)}var medium_zoom_esm_o=function(n){return"IMG"===n.tagName},medium_zoom_esm_t=function(n){return n&&1===n.nodeType},medium_zoom_esm_e=function(n){return".svg"===(n.currentSrc||n.src).substr(-4).toLowerCase()},medium_zoom_esm_i=function(n){try{return Array.isArray(n)?n.filter(medium_zoom_esm_o):function(n){return NodeList.prototype.isPrototypeOf(n)}(n)?[].slice.call(n).filter(medium_zoom_esm_o):medium_zoom_esm_t(n)?[n].filter(medium_zoom_esm_o):"string"==typeof n?[].slice.call(document.querySelectorAll(n)).filter(medium_zoom_esm_o):[]}catch(n){throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom")}},medium_zoom_esm_r=function(o,u){void 0===u&&(u={});var c=window.Promise||function(n){function o(){}n(o,o)},m=function(n,o){return n.dispatchEvent(function(n,o){if("function"==typeof window.CustomEvent)return new CustomEvent(n,{detail:o});var t=document.createEvent("CustomEvent");return t.initCustomEvent(n,!1,!1,o),t}("medium-zoom:"+o,{zoom:C}))},a=function(n){var o=n.target;o!==k?-1!==M.indexOf(o)&&b({target:o}):y()},d=function(){if(j.o){var n=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;if(j.t||window.visualViewport&&window.visualViewport.scale>j.i)return O=n,clearTimeout(j.u),void(j.u=null);E||Math.abs(O-n)>T.scrollOffset&&!j.u&&(j.u=setTimeout(y,150))}},f=function(n){n.touches.length>=2&&(j.t=!0),j.t&&d(),0===n.touches.length&&(j.t=!1)},s=function(n){var o=n.key||n.keyCode;"Escape"!==o&&"Esc"!==o&&27!==o||y()},l=!1,v=function(){var n=M.length>0;l!==n&&(document[n?"addEventListener":"removeEventListener"]("click",a),l=n)},p=function(){for(var n=arguments.length,o=new Array(n),t=0;t<n;t++)o[t]=arguments[t];var e=o.reduce(function(n,o){return[].concat(n,medium_zoom_esm_i(o))},[]);return e.filter(function(n){return-1===M.indexOf(n)}).forEach(function(n){M.push(n),n.classList.add("medium-zoom-image")}),x.forEach(function(n){var o=n.type,t=n.listener,i=n.options;e.forEach(function(n){n.addEventListener(o,t,i)})}),v(),C},w=!1,h=function(n){if(w!==n){var o=n?"addEventListener":"removeEventListener";document[o]("keyup",s),document[o]("scroll",d);var t={passive:!0};["touchstart","touchend","touchcancel"].forEach(function(n){return document[o](n,f,t)}),window[o]("resize",y),w=n}},g=function(n,o){var t,e,i=!1,r=window.matchMedia("(prefers-reduced-motion)"),u=function(n){return Math.max.apply(Math,n.split(",").map(parseFloat))},c=function(n){i||n&&"transform"!==n.propertyName||(a(),o())},m=function(){r.matches&&c()},a=function(){i=!0,clearTimeout(t),window.cancelAnimationFrame(e),n.removeEventListener("transitionend",c),r.removeListener(m)};n.addEventListener("transitionend",c),r.addListener(m);var d=window.getComputedStyle(n),f=1e3*(u(d.transitionDuration)+u(d.transitionDelay));return t=setTimeout(c,Math.max(0,f)+50),f<=0&&(e=window.requestAnimationFrame(function(){return c()})),a},z=function(o){var i=(void 0===o?{}:o).target,r={};return new c(function(o){if(j.o||i&&-1===M.indexOf(i))o(C);else{j=r;var u,c=function(){},a=function(){},d=function(n){r.m&&(c(),a(),window.cancelAnimationFrame(u),r.m=null,E=!1,o(C),n&&(document.body.classList.add("medium-zoom--opened"),m(r.o,"opened")))};if(r.m=d,r.o=i||M[0],r.o){if(r.i=window.visualViewport?window.visualViewport.scale:1,h(!0),E=!0,m(r.o,"open"),!r.l){if(O=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,r.v=function(n){var o=n.getBoundingClientRect(),t=o.top,e=o.left,i=o.width,r=o.height,u=n.cloneNode(),c=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,m=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;return u.removeAttribute("id"),u.style.position="absolute",u.style.top=t+c+"px",u.style.left=e+m+"px",u.style.width=i+"px",u.style.height=r+"px",u.style.transform="",u}(r.o),document.body.appendChild(k),T.template){var f=medium_zoom_esm_t(T.template)?T.template:document.querySelector(T.template);r.p=document.createElement("div"),r.p.appendChild(f.content.cloneNode(!0)),document.body.appendChild(r.p)}r.o.parentElement&&"PICTURE"===r.o.parentElement.tagName&&r.o.currentSrc&&(r.v.src=r.o.currentSrc),document.body.appendChild(r.v),u=window.requestAnimationFrame(function(){document.body.classList.add("medium-zoom--opened")}),r.o.classList.add("medium-zoom-image--hidden"),r.v.classList.add("medium-zoom-image--opened"),r.v.addEventListener("click",y);var s=function(){!function(){var o,i,u={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,left:0,top:0,right:0,bottom:0};if(T.container)if(T.container instanceof Object)o=(u=medium_zoom_esm_n({},u,T.container)).width-u.left-u.right-2*T.margin,i=u.height-u.top-u.bottom-2*T.margin;else{var c=(medium_zoom_esm_t(T.container)?T.container:document.querySelector(T.container)).getBoundingClientRect();u=medium_zoom_esm_n({},u,{width:c.width,height:c.height,left:c.left,top:c.top})}o=o||u.width-2*T.margin,i=i||u.height-2*T.margin;var m=r.h||r.o,a=medium_zoom_esm_e(m)?o:m.naturalWidth||o,d=medium_zoom_esm_e(m)?i:m.naturalHeight||i,f=m.getBoundingClientRect(),s=f.top,l=f.left,v=f.width,p=f.height;if(v&&p){var w=Math.min(Math.max(v,a),o)/v,h=Math.min(Math.max(p,d),i)/p,g=Math.min(w,h),z="scale("+g+") translate3d("+((o-v)/2-l+T.margin+u.left)/g+"px, "+((i-p)/2-s+T.margin+u.top)/g+"px, 0)";r.v.style.transform=z,r.h&&(r.h.style.transform=z)}}(),c=g(r.v,function(){return d(!0)})},l=r.o.getAttribute("data-zoom-src");if(l||r.o.hasAttribute("srcset")){var v=document.createElement("img");[].slice.call(r.v.attributes).forEach(function(n){var o=n.name,t=n.value;/^(src|srcset|sizes|loading)$/.test(o)||v.setAttribute(o,t)}),r.h=v;var p=function(){a(),r.l||(v.naturalWidth?(v.classList.add("medium-zoom-image--opened"),v.addEventListener("click",y),document.body.appendChild(v)):(console.warn("Unable to reach the zoom image target "+(v.currentSrc||v.src)),r.h=null),s())};a=function(){v.removeEventListener("load",p),v.removeEventListener("error",p)},v.addEventListener("load",p),v.addEventListener("error",p),l||(v.srcset=r.v.srcset),v.src=l||r.v.src}else s()}}else o(C)}})},y=function(){return new c(function(n){var o=j;if(o.o&&!o.l){o.l=!0,o.m&&o.m(),clearTimeout(o.u),E=!0;var t=function(){o.o.classList.remove("medium-zoom-image--hidden"),[o.v,o.h,o.p,k].forEach(function(n){n&&(n.removeEventListener("click",y),n.parentNode&&n.parentNode.removeChild(n))}),j={},E=!1,h(!1),n(C),m(o.o,"closed")};o.v&&g(o.v,t),document.body.classList.remove("medium-zoom--opened"),o.v&&(o.v.style.transform=""),o.h&&(o.h.style.transform=""),o.p&&(o.p.style.transition=parseFloat(window.getComputedStyle(o.v).transitionDuration)?"opacity 150ms":"none",o.p.style.opacity=0),m(o.o,"close"),o.v||t()}else n(C)})},b=function(n){var o=(void 0===n?{}:n).target;return j.o?y():z({target:o})},M=[],x=[],E=!1,O=0,T=u,j={};"[object Object]"===Object.prototype.toString.call(o)?T=o:(o||"string"==typeof o)&&p(o);var k=function(n){var o=document.createElement("div");return o.classList.add("medium-zoom-overlay"),o.style.background=n,o}((T=medium_zoom_esm_n({margin:0,background:"#fff",scrollOffset:40,container:null,template:null},T)).background),C={open:z,close:y,toggle:b,update:function(o){void 0===o&&(o={});var e=o;return o.background&&(k.style.background=o.background),o.container&&o.container instanceof Object&&(e.container=medium_zoom_esm_n({},T.container,o.container)),o.template&&(e.template=medium_zoom_esm_t(o.template)?o.template:document.querySelector(o.template)),T=medium_zoom_esm_n({},T,e),M.forEach(function(n){m(n,"update")}),C},clone:function(o){return medium_zoom_esm_r(medium_zoom_esm_n({},T,o))},attach:p,detach:function(){j.v&&y();for(var n=arguments.length,o=new Array(n),t=0;t<n;t++)o[t]=arguments[t];var e=o.length>0?o.reduce(function(n,o){return[].concat(n,medium_zoom_esm_i(o))},[]):M;return e.forEach(function(n){n.classList.remove("medium-zoom-image"),m(n,"detach")}),M=M.filter(function(n){return-1===e.indexOf(n)}),v(),C},on:function(n,o,t){void 0===t&&(t={});var e="medium-zoom:"+n;return M.forEach(function(n){n.addEventListener(e,o,t)}),x.push({type:e,listener:o,options:t}),C},off:function(n,o,t){void 0===t&&(t={});var e="medium-zoom:"+n;return M.forEach(function(n){n.removeEventListener(e,o,t)}),x=x.filter(function(n){return!(n.type===e&&n.listener.toString()===o.toString())}),C},getOptions:function(){return T},getImages:function(){return M},getZoomedImage:function(){return j.o||null}};return C};if("undefined"!=typeof document){var medium_zoom_esm_u=document.createElement("style");medium_zoom_esm_u.textContent=".medium-zoom-overlay{opacity:0;will-change:opacity;transition:opacity .3s;position:fixed;top:0;bottom:0;left:0;right:0}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{cursor:pointer;cursor:zoom-out;will-change:transform;position:relative}@media (prefers-reduced-motion:reduce){.medium-zoom-image,.medium-zoom-overlay{transition:none!important}}",document.head.appendChild(medium_zoom_esm_u)}var medium_zoom_esm_c=medium_zoom_esm_r;

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.3.1/node_modules/react/index.js
var react = __webpack_require__("U");
// EXTERNAL MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/static/MediumZoom.css
var MediumZoom = __webpack_require__("tj");
;// CONCATENATED MODULE: ./node_modules/.pnpm/@rspress+core@2.1.3_@rspack+core@2.3.2_@swc+helpers@0.5.24__micromark-util-types@2.0.3_micromark@4.0.3/node_modules/@rspress/core/static/MediumZoom.tsx




function MediumZoom_MediumZoom(props) {
    const { pathname } = (0,chunk_6KYCQHYJ/* .useLocation */.zy)();
    const { selector = '.rspress-doc img', options = {} } = props;
    (0,react.useEffect)(()=>{
        let zoom;
        const timeout = setTimeout(()=>{
            const images = document.querySelectorAll(selector);
            zoom = medium_zoom_esm_c(images, {
                ...options,
                background: 'var(--rp-c-bg)'
            });
        }, 100);
        return ()=>{
            clearTimeout(timeout);
            zoom?.detach();
            zoom?.close();
        };
    }, [
        pathname
    ]);
    return null;
}


},
"f"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
/* import */ var react__rspack_import_0 = __webpack_require__("U");
/**
 * @import {MDXComponents} from 'mdx/types.js'
 * @import {Component, ReactElement, ReactNode} from 'react'
 */

/**
 * @callback MergeComponents
 *   Custom merge function.
 * @param {Readonly<MDXComponents>} currentComponents
 *   Current components from the context.
 * @returns {MDXComponents}
 *   Additional components.
 *
 * @typedef Props
 *   Configuration for `MDXProvider`.
 * @property {ReactNode | null | undefined} [children]
 *   Children (optional).
 * @property {Readonly<MDXComponents> | MergeComponents | null | undefined} [components]
 *   Additional components to use or a function that creates them (optional).
 * @property {boolean | null | undefined} [disableParentContext=false]
 *   Turn off outer component context (default: `false`).
 */



/** @type {Readonly<MDXComponents>} */
const emptyComponents = {}

const MDXContext = react__rspack_import_0.createContext(emptyComponents)

/**
 * Get current components from the MDX Context.
 *
 * @param {Readonly<MDXComponents> | MergeComponents | null | undefined} [components]
 *   Additional components to use or a function that creates them (optional).
 * @returns {MDXComponents}
 *   Current components.
 */
function useMDXComponents(components) {
  const contextComponents = react__rspack_import_0.useContext(MDXContext)

  // Memoize to avoid unnecessary top-level context changes
  return react__rspack_import_0.useMemo(
    function () {
      // Custom merge via a function prop
      if (typeof components === 'function') {
        return components(contextComponents)
      }

      return {...contextComponents, ...components}
    },
    [contextComponents, components]
  )
}

/**
 * Provider for MDX context.
 *
 * @param {Readonly<Props>} properties
 *   Properties.
 * @returns {ReactElement}
 *   Element.
 * @satisfies {Component}
 */
function MDXProvider(properties) {
  /** @type {Readonly<MDXComponents>} */
  let allComponents

  if (properties.disableParentContext) {
    allComponents =
      typeof properties.components === 'function'
        ? properties.components(emptyComponents)
        : properties.components || emptyComponents
  } else {
    allComponents = useMDXComponents(properties.components)
  }

  return react__rspack_import_0.createElement(
    MDXContext.Provider,
    {value: allComponents},
    properties.children
  )
}

__webpack_require__.d(__webpack_exports__, {
}, {
  R: useMDXComponents,
  x: MDXProvider
});


},
"n"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
const QUERY_REGEXP = /\?.*$/s;
const HASH_REGEXP = /#.*$/s;
const MDX_OR_MD_REGEXP = /\.mdx?$/;
const SEARCH_INDEX_NAME = 'search_index';
const RSPRESS_TEMP_DIR = '.rspress';
const isProduction = ()=>'production' === "production";
const isDebugMode = ()=>{
    if (!process.env.DEBUG) return false;
    const values = process.env.DEBUG?.toLocaleLowerCase().split(',') ?? [];
    return [
        'rsbuild',
        'builder',
        '*'
    ].some((key)=>values.includes(key));
};
const isDevDebugMode = ()=>'rspress-dev' === process.env.DEBUG;
const utils_cleanUrl = (url)=>url.replace(HASH_REGEXP, '').replace(QUERY_REGEXP, '');
function slash(str) {
    return str.replace(/\\/g, '/');
}
function removeHash(str) {
    return str.replace(/#.*$/, '');
}
function normalizePosixPath(id) {
    const path = slash(id);
    const isAbsolutePath = path.startsWith('/');
    const parts = path.split('/');
    const normalizedParts = [];
    for (const part of parts)if ('.' === part || '' === part) ;
    else if ('..' === part) {
        if (normalizedParts.length > 0 && '..' !== normalizedParts[normalizedParts.length - 1]) normalizedParts.pop();
        else if (isAbsolutePath) normalizedParts.push('..');
    } else normalizedParts.push(part);
    let normalizedPath = normalizedParts.join('/');
    if (isAbsolutePath) normalizedPath = `/${normalizedPath}`;
    return normalizedPath;
}
const inBrowser = ()=>!false;
function addLeadingSlash(url) {
    return '/' === url.charAt(0) || isExternalUrl(url) ? url : `/${url}`;
}
function removeLeadingSlash(url) {
    return '/' === url.charAt(0) ? url.slice(1) : url;
}
function addTrailingSlash(url) {
    return '/' === url.charAt(url.length - 1) ? url : `${url}/`;
}
function removeTrailingSlash(url) {
    return '/' === url.charAt(url.length - 1) ? url.slice(0, -1) : url;
}
const EXTERNAL_URL_SCHEME_REGEXP = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;
const UNSAFE_EXTERNAL_URL_SCHEME_REGEXP = /^(?:javascript|data|file):/i;
function isExternalUrl(url = '') {
    return EXTERNAL_URL_SCHEME_REGEXP.test(url) && !UNSAFE_EXTERNAL_URL_SCHEME_REGEXP.test(url);
}
function isDataUrl(url = '') {
    return /^\s*data:/i.test(url);
}
function replaceLang(rawUrl, lang, version, base = '', cleanUrls = false, isPageNotFound = false) {
    let url = removeBase(rawUrl, base);
    if (!url || isPageNotFound) url = cleanUrls ? '/index' : '/index.html';
    if (url.endsWith('/')) url += cleanUrls ? '/index' : '/index.html';
    let versionPart = '';
    let langPart = '';
    const parts = url.split('/').filter(Boolean);
    if (version.current && version.current !== version.default) versionPart = parts.shift() || '';
    if (lang.target !== lang.default) {
        langPart = lang.target;
        if (lang.current !== lang.default) parts.shift();
    } else parts.shift();
    let purePathPart = parts.join('/') || '';
    if ((versionPart || langPart) && !purePathPart) purePathPart = cleanUrls ? 'index' : 'index.html';
    return addLeadingSlash([
        versionPart,
        langPart,
        purePathPart
    ].filter(Boolean).join('/'));
}
function replaceVersion(rawUrl, version, base = '', cleanUrls = false, isPageNotFound = false) {
    let url = removeBase(rawUrl, base);
    if (!url || isPageNotFound) url = cleanUrls ? '/index' : '/index.html';
    let versionPart = '';
    const parts = url.split('/').filter(Boolean);
    if (version.target !== version.default) {
        versionPart = version.target;
        if (version.current !== version.default) parts.shift();
    } else parts.shift();
    let restPart = parts.join('/') || '';
    if (versionPart && !restPart) restPart = cleanUrls ? 'index' : 'index.html';
    return addLeadingSlash([
        versionPart,
        restPart
    ].filter(Boolean).join('/'));
}
const parseUrl = (url)=>{
    const [withoutHash, hash = ''] = url.split('#');
    const [withoutSearch, search = ''] = withoutHash.split('?');
    return {
        url: withoutSearch,
        search,
        hash
    };
};
function normalizeHref(url, cleanUrls = false, assetExtensions = []) {
    if (!url) return '/';
    if (isExternalUrl(url)) return url;
    if (url.startsWith('#')) return url;
    if (!url.startsWith('/')) return url;
    let { url: cleanUrl, hash, search } = parseUrl(decodeURIComponent(url));
    if (cleanUrls) {
        if (cleanUrl.endsWith('.html')) cleanUrl = cleanUrl.replace(/\.html$/, '');
        if (cleanUrls && cleanUrl.endsWith('/index')) cleanUrl = cleanUrl.replace(/\/index$/, '/');
    } else {
        const hasExt = cleanUrl.endsWith('.html') || assetExtensions.some((i)=>cleanUrl.endsWith(i));
        if (!hasExt) if (cleanUrl.endsWith('/')) cleanUrl += 'index.html';
        else cleanUrl += '.html';
    }
    const finalUrl = [
        cleanUrl,
        search ? `?${search}` : '',
        hash ? `#${hash}` : ''
    ].join('');
    return addLeadingSlash(finalUrl);
}
function withoutLang(path, langs) {
    const langRegexp = new RegExp(`^\\/(${langs.join('|')})`);
    return addLeadingSlash(path.replace(langRegexp, ''));
}
function normalizeSlash(url) {
    return removeTrailingSlash(addLeadingSlash(normalizePosixPath(url)));
}
function withBase(url, base) {
    const normalizedUrl = addLeadingSlash(url);
    const normalizedBase = normalizeSlash(base);
    const hasBase = normalizedUrl === normalizedBase || normalizedUrl.startsWith(`${normalizedBase}/`);
    if (hasBase) {
        if (`${normalizedUrl}/` === base) return base;
        return normalizedUrl;
    }
    return `${normalizedBase}${normalizedUrl}`;
}
function withSiteOrigin(url, siteOrigin) {
    if (!siteOrigin || isExternalUrl(url)) return url;
    return new URL(addLeadingSlash(url), addTrailingSlash(siteOrigin)).href;
}
function removeBase(url, base) {
    const normalizedUrl = addLeadingSlash(url);
    const normalizedBase = normalizeSlash(base);
    const removedBaseUrl = normalizedUrl.replace(new RegExp(`^${normalizedBase}(?=/|$)`), '');
    if ('' === removedBaseUrl) return '/';
    return removedBaseUrl;
}
const matchSidebar = (pattern, currentPathname)=>{
    if (pattern === currentPathname) return true;
    if (currentPathname.startsWith(pattern)) return true;
    const prefixWithDot = `${pattern}.`;
    return currentPathname.startsWith(prefixWithDot);
};
const getSidebarDataGroup = (sidebar, currentPathname)=>{
    const navRoutes = Object.keys(sidebar).sort((a, b)=>b.length - a.length);
    for (const name of navRoutes)if (matchSidebar(name, currentPathname)) {
        const sidebarGroup = sidebar[name];
        return sidebarGroup;
    }
    return [];
};
const matchNavbar = (item, currentPathname)=>new RegExp(item.activeMatch || normalizeHref(item.link, true)).test(currentPathname);
const normalizeDarkMode = (darkMode)=>{
    if (false === darkMode) return 'force-light';
    if (true === darkMode || void 0 === darkMode) return 'auto';
    return darkMode;
};
const getDefaultDarkModeValue = (darkMode)=>{
    const normalizedDarkMode = normalizeDarkMode(darkMode);
    if (normalizedDarkMode.startsWith('force-')) return normalizedDarkMode.slice(6);
    return normalizedDarkMode;
};
const isDarkModeSwitchEnabled = (darkMode)=>!normalizeDarkMode(darkMode).startsWith('force-');


__webpack_require__.d(__webpack_exports__, {
}, {
  CR: matchSidebar,
  EJ: removeBase,
  Km: getDefaultDarkModeValue,
  My: isExternalUrl,
  Nv: isDarkModeSwitchEnabled,
  OK: SEARCH_INDEX_NAME,
  OM: withSiteOrigin,
  TG: utils_cleanUrl,
  Tj: normalizeHref,
  UC: removeTrailingSlash,
  ax: isDataUrl,
  cV: withBase,
  fr: removeHash,
  gT: MDX_OR_MD_REGEXP,
  hg: addTrailingSlash,
  sP: matchNavbar,
  tb: addLeadingSlash
});


},
"b"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
/* import */ var react__rspack_import_0 = __webpack_require__("U");


const UnheadContext = (0,react__rspack_import_0.createContext)(null);



__webpack_require__.d(__webpack_exports__, {
}, {
  U: UnheadContext
});


},
"F"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
"use strict";
const SelfClosingTags = /* @__PURE__ */ (/* unused pure expression or super */ null && (new Set(["meta", "link", "base"])));
const DupeableTags = /* @__PURE__ */ new Set(["link", "style", "script", "noscript"]);
const TagsWithInnerContent = /* @__PURE__ */ new Set(["title", "titleTemplate", "script", "style", "noscript"]);
const HasElementTags = /* @__PURE__ */ new Set([
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
]);
const ValidHeadTags = /* @__PURE__ */ new Set([
  "title",
  "base",
  "htmlAttrs",
  "bodyAttrs",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
]);
const UniqueTags = /* @__PURE__ */ new Set(["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"]);
const TagConfigKeys = /* @__PURE__ */ new Set(["key", "tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent", "processTemplateParams"]);
const ScriptNetworkEvents = /* @__PURE__ */ (/* unused pure expression or super */ null && (new Set(["onload", "onerror"])));
const UsesMergeStrategy = /* @__PURE__ */ new Set(["templateParams", "htmlAttrs", "bodyAttrs"]);
const MetaTagsArrayable = /* @__PURE__ */ new Set([
  "theme-color",
  "google-site-verification",
  "og",
  "article",
  "book",
  "profile",
  "twitter",
  "author"
]);
const hasContent = (value) => typeof value === "number" ? Number.isFinite(value) : value;



__webpack_require__.d(__webpack_exports__, {
}, {
  D: DupeableTags,
  H: HasElementTags,
  M: MetaTagsArrayable,
  T: TagConfigKeys,
  U: UniqueTags,
  V: ValidHeadTags,
  b: TagsWithInnerContent,
  c: UsesMergeStrategy,
  h: hasContent
});


},

}]);