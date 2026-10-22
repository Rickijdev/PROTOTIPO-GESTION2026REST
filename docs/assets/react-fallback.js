(function() {
  if (window.React && window.ReactDOM) return;

  var componentHooks = {};
  var pathStack = [];
  var rootContainer = null;
  var rootComponent = null;
  var pendingEffects = [];
  var isRendering = false;
  var Fragment = Symbol("Fragment");

  function currentCtx() {
    return pathStack[pathStack.length - 1] || { path: "root", hookIdx: 0 };
  }

  function flattenChildren(arr, out) {
    for (var i = 0; i < arr.length; i++) {
      var c = arr[i];
      if (Array.isArray(c)) flattenChildren(c, out);
      else out.push(c);
    }
  }

  function createElement(type, props) {
    var raw = [];
    for (var i = 2; i < arguments.length; i++) raw.push(arguments[i]);
    var children = [];
    flattenChildren(raw, children);
    return { type: type, props: Object.assign({}, props, { children: children }) };
  }

  function useState(initial) {
    var ctx = currentCtx();
    var key = ctx.path;
    var idx = ctx.hookIdx++;
    if (!componentHooks[key]) componentHooks[key] = [];
    var list = componentHooks[key];
    if (list[idx] === undefined) {
      list[idx] = typeof initial === "function" ? initial() : initial;
    }
    var setState = function(next) {
      var prev = list[idx];
      var val = typeof next === "function" ? next(prev) : next;
      if (val !== prev) {
        list[idx] = val;
        scheduleRender();
      }
    };
    return [list[idx], setState];
  }

  function useEffect(cb, deps) {
    var ctx = currentCtx();
    var key = ctx.path;
    var idx = ctx.hookIdx++;
    if (!componentHooks[key]) componentHooks[key] = [];
    var list = componentHooks[key];
    var prev = list[idx];
    var changed = true;
    if (prev && deps && prev.deps) {
      changed = deps.length !== prev.deps.length || deps.some(function(d, i) { return d !== prev.deps[i]; });
    }
    if (changed) {
      pendingEffects.push(function() {
        if (prev && typeof prev.cleanup === "function") prev.cleanup();
        var cleanup = cb();
        list[idx] = { deps: deps, cleanup: cleanup };
      });
    }
  }

  function useMemo(fn, deps) {
    var ctx = currentCtx();
    var key = ctx.path;
    var idx = ctx.hookIdx++;
    if (!componentHooks[key]) componentHooks[key] = [];
    var list = componentHooks[key];
    var prev = list[idx];
    if (prev && deps && prev.deps) {
      var same = deps.length === prev.deps.length && deps.every(function(d, i) { return d === prev.deps[i]; });
      if (same) return prev.value;
    }
    var value = fn();
    list[idx] = { deps: deps, value: value };
    return value;
  }

  var SVG_TAGS = {
    svg: 1, path: 1, circle: 1, rect: 1, line: 1, polyline: 1,
    polygon: 1, defs: 1, linearGradient: 1, stop: 1, g: 1
  };

  function renderVNode(vnode, isSvg, pathPrefix) {
    if (vnode === null || vnode === undefined || vnode === false || vnode === true) {
      return document.createTextNode("");
    }
    if (typeof vnode === "string" || typeof vnode === "number") {
      return document.createTextNode(String(vnode));
    }
    if (Array.isArray(vnode)) {
      var frag = document.createDocumentFragment();
      vnode.forEach(function(c, i) { frag.appendChild(renderVNode(c, isSvg, pathPrefix + "." + i)); });
      return frag;
    }
    if (vnode.type === Fragment) {
      var f = document.createDocumentFragment();
      (vnode.props.children || []).forEach(function(c, i) { f.appendChild(renderVNode(c, isSvg, pathPrefix + ".f" + i)); });
      return f;
    }
    if (typeof vnode.type === "function") {
      var compName = vnode.type.name || "Component";
      var compPath = pathPrefix + "/" + compName;
      pathStack.push({ path: compPath, hookIdx: 0 });
      var subTree = vnode.type(vnode.props || {});
      pathStack.pop();
      return renderVNode(subTree, isSvg, compPath);
    }
    var tag = vnode.type;
    var svgMode = isSvg || tag === "svg" || SVG_TAGS[tag];
    var el = svgMode
      ? document.createElementNS("http://www.w3.org/2000/svg", tag)
      : document.createElement(tag);

    var props = vnode.props || {};
    (props.children || []).forEach(function(c, i) {
      el.appendChild(renderVNode(c, svgMode, pathPrefix + "/" + tag + i));
    });

    Object.keys(props).forEach(function(k) {
      if (k === "children" || k === "key") return;
      var val = props[k];
      if (val === undefined || val === null || val === false) return;
      if (k === "className") {
        if (svgMode) el.setAttribute("class", val);
        else el.className = val;
      } else if (k === "style" && typeof val === "object") {
        Object.assign(el.style, val);
      } else if (k.indexOf("on") === 0 && typeof val === "function") {
        var evt = k.slice(2).toLowerCase();
        if (evt === "change" && (tag === "input" || tag === "textarea")) {
          el.addEventListener("input", val);
        }
        el.addEventListener(evt, val);
      } else if (k === "checked") {
        el.checked = Boolean(val);
        if (val) el.setAttribute("checked", "checked");
      } else if (k === "value" && (tag === "input" || tag === "select" || tag === "textarea")) {
        el.value = val;
        el.setAttribute("value", String(val));
      } else if (k === "defaultValue") {
        el.value = val;
        el.setAttribute("value", String(val));
      } else if (k === "disabled") {
        if (val) el.setAttribute("disabled", "disabled");
      } else {
        var attr = k.replace(/([A-Z])/g, function(m) {
          if (k === "viewBox" || k === "preserveAspectRatio" || k === "linearGradient") return m;
          return "-" + m.toLowerCase();
        });
        el.setAttribute(attr, String(val));
      }
    });

    if (tag === "select" && props.value !== undefined) {
      el.value = props.value;
    }
    return el;
  }

  function scheduleRender() {
    if (isRendering || !rootContainer || !rootComponent) return;
    isRendering = true;
    setTimeout(function() {
      isRendering = false;
      performRender();
    }, 0);
  }

  function performRender() {
    if (!rootContainer || !rootComponent) return;
    var activeEl = document.activeElement;
    var focusInfo = null;
    if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
      focusInfo = {
        placeholder: activeEl.getAttribute("placeholder"),
        value: activeEl.value,
        selStart: activeEl.selectionStart,
        selEnd: activeEl.selectionEnd
      };
    }
    pathStack = [];
    pendingEffects = [];
    var dom = renderVNode(rootComponent, false, "root");
    rootContainer.innerHTML = "";
    rootContainer.appendChild(dom);
    if (focusInfo && focusInfo.placeholder && document.querySelectorAll) {
      var inputs = document.querySelectorAll("input, textarea");
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute("placeholder") === focusInfo.placeholder) {
          inputs[i].focus();
          try { inputs[i].setSelectionRange(focusInfo.selStart, focusInfo.selEnd); } catch (e) {}
          break;
        }
      }
    }
    var effects = pendingEffects.slice();
    pendingEffects = [];
    effects.forEach(function(fn) { fn(); });
  }

  window.React = {
    createElement: createElement,
    Fragment: Fragment,
    useState: useState,
    useEffect: useEffect,
    useMemo: useMemo,
    StrictMode: Fragment
  };

  window.ReactDOM = {
    createRoot: function(container) {
      return {
        render: function(vnode) {
          rootContainer = container;
          rootComponent = vnode;
          performRender();
        }
      };
    },
    render: function(vnode, container) {
      rootContainer = container;
      rootComponent = vnode;
      performRender();
    }
  };
})();
