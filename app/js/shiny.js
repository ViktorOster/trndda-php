/*! shiny 1.4.0 | (c) 2012-2019 RStudio, Inc. | License: GPL-3 | file LICENSE */

"use strict";

function _defineProperty(a, b, c) {
    return b in a ? Object.defineProperty(a, b, {
        value: c,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[b] = c, a
}
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) {
    return typeof a
} : function (a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
};
! function () {
    function escapeHTML(a) {
        var b = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;",
            "/": "&#x2F;"
        };
        return a.replace(/[&<>'"\/]/g, function (a) {
            return b[a]
        })
    }

    function randomId() {
        return Math.floor(4294967296 + 64424509440 * Math.random()).toString(16)
    }

    function strToBool(a) {
        if (a && a.toLowerCase) switch (a.toLowerCase()) {
            case "true":
                return !0;
            case "false":
                return !1;
            default:
                return
        }
    }

    function getStyle(a, b) {
        var c;
        if (a.currentStyle) c = a.currentStyle[b];
        else if (window.getComputedStyle) {
            var d = document.defaultView.getComputedStyle(a, null);
            d && (c = d.getPropertyValue(b))
        }
        return c
    }

    function padZeros(a, b) {
        for (var c = a.toString(); c.length < b;) c = "0" + c;
        return c
    }

    function roundSignif(a) {
        var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        if (b < 1) throw "Significant digits must be at least 1.";
        return parseFloat(a.toPrecision(b))
    }

    function parseDate(a) {
        var b = new Date(a);
        return isNaN(b) && (b = new Date(a.replace(/-/g, "/"))), b
    }

    function formatDateUTC(a) {
        return a instanceof Date ? a.getUTCFullYear() + "-" + padZeros(a.getUTCMonth() + 1, 2) + "-" + padZeros(a.getUTCDate(), 2) : null
    }

    function makeResizeFilter(a, b) {
        var c = {};
        return function () {
            var d = {
                w: a.offsetWidth,
                h: a.offsetHeight
            };
            0 === d.w && 0 === d.h || d.w === c.w && d.h === c.h || (c = d, b(d.w, d.h))
        }
    }

    function makeBlob(a) {
        try {
            return new Blob(a)
        } catch (b) {
            var c = new _BlobBuilder;
            return $.each(a, function (a, b) {
                c.append(b)
            }), c.getBlob()
        }
    }

    function pixelRatio() {
        return window.devicePixelRatio ? window.devicePixelRatio : 1
    }

    function scopeExprToFunc(a) {
        var b = a.replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\b]/g, "\\b");
        try {
            var c = new Function("with (this) {\n        try {\n          return (" + a + ");\n        } catch (e) {\n          console.error('Error evaluating expression: " + b + "');\n          throw e;\n        }\n      }")
        } catch (d) {
            throw console.error("Error parsing expression: " + a), d
        }
        return function (a) {
            return c.call(a)
        }
    }

    function asArray(a) {
        return null === a || void 0 === a ? [] : $.isArray(a) ? a : [a]
    }

    function mergeSort(a, b) {
        function c(a, b, c) {
            for (var d = 0, e = 0, f = []; d < b.length && e < c.length;) a(b[d], c[e]) <= 0 ? f.push(b[d++]) : f.push(c[e++]);
            for (; d < b.length;) f.push(b[d++]);
            for (; e < c.length;) f.push(c[e++]);
            return f
        }
        a = a.slice(0);
        for (var d = 1; d < a.length; d *= 2)
            for (var e = 0; e < a.length; e += 2 * d) {
                var f = a.slice(e, e + d),
                    g = a.slice(e + d, e + 2 * d),
                    h = c(b, f, g),
                    i = [e, h.length];
                Array.prototype.push.apply(i, h), Array.prototype.splice.apply(a, i)
            }
        return a
    }

    function mapValues(a, b) {
        var c = {};
        for (var d in a) a.hasOwnProperty(d) && (c[d] = b(a[d], d, a));
        return c
    }

    function isnan(a) {
        return "number" == typeof a && isNaN(a)
    }

    function _equal(a, b) {
        if ("object" === $.type(a) && "object" === $.type(b)) {
            if (Object.keys(a).length !== Object.keys(b).length) return !1;
            for (var c in a)
                if (!b.hasOwnProperty(c) || !_equal(a[c], b[c])) return !1;
            return !0
        }
        if ("array" === $.type(a) && "array" === $.type(b)) {
            if (a.length !== b.length) return !1;
            for (var d = 0; d < a.length; d++)
                if (!_equal(a[d], b[d])) return !1;
            return !0
        }
        return a === b
    }

    function equal() {
        for (var a = arguments.length, b = Array(a), c = 0; c < a; c++) b[c] = arguments[c];
        if (b.length < 2) throw new Error("equal requires at least two arguments.");
        for (var d = 0; d < b.length - 1; d++)
            if (!_equal(b[d], b[d + 1])) return !1;
        return !0
    }

    function updateLabel(a, b) {
        if ("undefined" != typeof a) {
            if (1 !== b.length) throw new Error("labelNode must be of length 1");
            var c = $.isArray(a) && 0 === a.length;
            c ? b.addClass("shiny-label-null") : (b.text(a), b.removeClass("shiny-label-null"))
        }
    }

    function debounce(a, b) {
        var c, d, e = null;
        return function () {
            c = this, d = arguments, null !== e && (clearTimeout(e), e = null), e = setTimeout(function () {
                null !== e && (e = null, b.apply(c, d))
            }, a)
        }
    }

    function throttle(a, b) {
        function c() {
            d = null, e = null, null === g ? (g = setTimeout(function () {
                g = null, f && (f = !1, c.apply(d, e))
            }, a), b.apply(this, arguments)) : (f = !0, d = this, e = arguments)
        }
        var d, e, f = !1,
            g = null;
        return c
    }

    function addDefaultInputOpts(a) {
        if (a = $.extend({
            priority: "immediate",
            binding: null,
            el: null
        }, a), a && "undefined" != typeof a.priority) switch (a.priority) {
            case "deferred":
            case "immediate":
            case "event":
                break;
            default:
                throw new Error("Unexpected input value mode: '" + a.priority + "'")
        }
        return a
    }

    function splitInputNameType(a) {
        var b = a.split(":");
        return {
            name: b[0],
            inputType: b.length > 1 ? b[1] : ""
        }
    }

    function findScalingRatio(a) {
        var b = a[0].getBoundingClientRect();
        return {
            x: b.width / a.outerWidth(),
            y: b.height / a.outerHeight()
        }
    }

    function findOrigin(a) {
        var b = a.offset(),
            c = findScalingRatio(a),
            d = {
                left: parseInt(a.css("border-left-width")) + parseInt(a.css("padding-left")),
                top: parseInt(a.css("border-top-width")) + parseInt(a.css("padding-top"))
            };
        return {
            x: b.left + c.x * d.left,
            y: b.top + c.y * d.top
        }
    }

    function findDims(a) {
        var b = {
            x: a.width() / a.outerWidth(),
            y: a.height() / a.outerHeight()
        },
            c = a[0].getBoundingClientRect();
        return {
            x: b.x * c.width,
            y: b.y * c.height
        }
    }

    function registerDependency(a, b) {
        htmlDependencies[a] = b
    }

    function renderDependency(a) {
        if (htmlDependencies.hasOwnProperty(a.name)) return !1;
        registerDependency(a.name, a.version);
        var b = a.src.href,
            c = $("head").first();
        if (a.meta) {
            var d = $.map(asArray(a.meta), function (a, b) {
                var c = Object.keys(a)[0];
                return $("<meta>").attr("name", c).attr("content", a[c])
            });
            c.append(d)
        }
        if (a.stylesheet) {
            var e = $.map(asArray(a.stylesheet), function (a) {
                return $("<link rel='stylesheet' type='text/css'>").attr("href", b + "/" + encodeURI(a))
            });
            c.append(e)
        }
        if (a.script) {
            var f = $.map(asArray(a.script), function (a) {
                return $("<script>").attr("src", b + "/" + encodeURI(a))
            });
            c.append(f)
        }
        if (a.attachment) {
            var g = a.attachment;
            if ("string" == typeof g && (g = [g]), $.isArray(g)) {
                var h = {};
                $.each(g, function (a, b) {
                    h[a + 1 + ""] = b
                }), g = h
            }
            var i = $.map(g, function (c, d) {
                return $("<link rel='attachment'>").attr("id", a.name + "-" + d + "-attachment").attr("href", b + "/" + encodeURI(c))
            });
            c.append(i)
        }
        if (a.head) {
            var j = $("<head></head>");
            j.html(a.head), c.append(j.children())
        }
        return !0
    }

    function forceIonSliderUpdate(a) {
        a.$cache && a.$cache.input ? a.$cache.input.trigger("change") : console.log("Couldn't force ion slider to update")
    }

    function getTypePrettifyer(a, b, c) {
        var d, e;
        return "date" === a ? (d = strftime.utc(), e = function (a) {
            return d(b, new Date(a))
        }) : "datetime" === a ? (d = c ? strftime.timezone(c) : strftime, e = function (a) {
            return d(b, new Date(a))
        }) : e = function (a) {
            return formatNumber(a, this.prettify_separator)
        }, e
    }

    function formatNumber(a) {
        var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ",",
            c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".",
            d = a.toString().split(".");
        return d[0] = d[0].replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + b), 1 === d.length ? d[0] : 2 === d.length ? d[0] + c + d[1] : ""
    }

    function setFileText(a, b) {
        var c = a.closest("div.input-group").find("input[type=text]");
        1 === b.length ? c.val(b[0].name) : c.val(b.length + " files")
    }

    function abortCurrentUpload(a) {
        var b = a.data("currentUploader");
        b && b.abort(), a.removeAttr("data-restore")
    }

    function uploadDroppedFilesIE10Plus(a, b) {
        var c = $(a);
        abortCurrentUpload(c), setFileText(c, b), c.data("currentUploader", new FileUploader(exports.shinyapp, fileInputBinding.getId(a), b, a))
    }

    function uploadFiles(a) {
        var b = $(a.target);
        abortCurrentUpload(b);
        var c = a.target.files,
            d = "undefined" == typeof c,
            e = fileInputBinding.getId(a.target);
        if (d || 0 !== c.length) {
            var f = b.closest("div.input-group").find("input[type=text]");
            d ? f.val("[Uploaded file]") : setFileText(b, c), d ? new IE8FileUploader(exports.shinyapp, e, a.target) : b.data("currentUploader", new FileUploader(exports.shinyapp, e, c, a.target))
        }
    }

    function initShiny() {
        function a() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document;
            a = $(a);
            for (var b = outputBindings.getBindings(), c = 0; c < b.length; c++)
                for (var d = b[c].binding, e = d.find(a) || [], f = 0; f < e.length; f++) {
                    var g = e[f],
                        h = d.getId(g);
                    if (h && $.contains(document, g)) {
                        var i = $(g);
                        if (!i.hasClass("shiny-bound-output")) {
                            var j = new OutputBindingAdapter(g, d);
                            q.bindOutput(h, j), i.data("shiny-output-binding", j), i.addClass("shiny-bound-output"), i.trigger({
                                type: "shiny:bound",
                                binding: d,
                                bindingType: "output"
                            })
                        }
                    }
                }
            setTimeout(k, 0), setTimeout(n, 0)
        }

        function b() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document,
                b = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                c = $(a).find(".shiny-bound-output");
            b && $(a).hasClass("shiny-bound-output") && c.push(a);
            for (var d = 0; d < c.length; d++) {
                var e = $(c[d]),
                    f = e.data("shiny-output-binding");
                if (f) {
                    var g = f.binding.getId(c[d]);
                    q.unbindOutput(g, f), e.removeClass("shiny-bound-output"), e.removeData("shiny-output-binding"), e.trigger({
                        type: "shiny:unbound",
                        binding: f.binding,
                        bindingType: "output"
                    })
                }
            }
            setTimeout(k, 0), setTimeout(n, 0)
        }

        function c(a, b, c) {
            var d = a.getId(b);
            if (d) {
                var e = a.getValue(b),
                    f = a.getType(b);
                f && (d = d + ":" + f);
                var g = {
                    priority: c ? "deferred" : "immediate",
                    binding: a,
                    el: b
                };
                p.setInput(d, e, g)
            }
        }

        function d() {
            for (var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document, b = inputBindings.getBindings(), d = {}, e = 0; e < b.length; e++)
                for (var f = b[e].binding, g = f.find(a) || [], h = 0; h < g.length; h++) {
                    var i = g[h],
                        j = f.getId(i);
                    if (j && !w[j]) {
                        var k = f.getType(i),
                            l = k ? j + ":" + k : j;
                        d[l] = {
                            value: f.getValue(i),
                            opts: {
                                immediate: !0,
                                binding: f,
                                el: i
                            }
                        };
                        var m = function () {
                            var a = f,
                                b = i;
                            return function (d) {
                                c(a, b, d)
                            }
                        }();
                        f.subscribe(i, m), $(i).data("shiny-input-binding", f), $(i).addClass("shiny-bound-input");
                        var n = f.getRatePolicy(i);
                        null !== n && u.setRatePolicy(l, n.policy, n.delay), w[j] = {
                            binding: f,
                            node: i
                        }, $(i).trigger({
                            type: "shiny:bound",
                            binding: f,
                            bindingType: "input"
                        })
                    }
                }
            return d
        }

        function e() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document,
                b = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                c = $(a).find(".shiny-bound-input");
            b && $(a).hasClass("shiny-bound-input") && c.push(a);
            for (var d = 0; d < c.length; d++) {
                var e = c[d],
                    f = $(e).data("shiny-input-binding");
                if (f) {
                    var g = f.getId(e);
                    $(e).removeClass("shiny-bound-input"), delete w[g], f.unsubscribe(e), $(e).trigger({
                        type: "shiny:unbound",
                        binding: f,
                        bindingType: "input"
                    })
                }
            }
        }

        function f(b) {
            return a(b), d(b)
        }

        function g(a) {
            var c = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            e(a, c), b(a, c)
        }

        function h() {
            for (var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document, b = inputBindings.getBindings(), c = 0; c < b.length; c++)
                for (var d = b[c].binding, e = d.find(a) || [], f = 0; f < e.length; f++) e[f]._shiny_initialized || (e[f]._shiny_initialized = !0, d.initialize(e[f]))
        }

        function i(a) {
            var b = $(a),
                c = b.data("shiny-output-binding");
            return c ? c.getId() : null
        }

        function j() {
            $(".shiny-image-output, .shiny-plot-output, .shiny-report-size").each(function () {
                var a = i(this);
                0 === this.offsetWidth && 0 === this.offsetHeight || (p.setInput(".clientdata_output_" + a + "_width", this.offsetWidth), p.setInput(".clientdata_output_" + a + "_height", this.offsetHeight))
            }), $(".shiny-bound-output").each(function () {
                var a = $(this),
                    b = a.data("shiny-output-binding");
                a.trigger({
                    type: "shiny:visualchange",
                    visible: !l(this),
                    binding: b
                }), b.onResize()
            })
        }

        function k() {
            y.normalCall()
        }

        function l(a) {
            return null !== a && 0 === a.offsetWidth && 0 === a.offsetHeight && ("none" === getStyle(a, "display") || l(a.parentNode))
        }

        function m() {
            var a = {};
            $(".shiny-bound-output").each(function () {
                var b = i(this);
                delete z[b];
                var c = l(this),
                    d = {
                        type: "shiny:visualchange",
                        visible: !c
                    };
                c ? p.setInput(".clientdata_output_" + b + "_hidden", !0) : (a[b] = !0, p.setInput(".clientdata_output_" + b + "_hidden", !1));
                var e = $(this);
                d.binding = e.data("shiny-output-binding"), e.trigger(d)
            });
            for (var b in z) z.hasOwnProperty(b) && p.setInput(".clientdata_output_" + b + "_hidden", !0);
            z = a
        }

        function n() {
            A.normalCall()
        }

        function o(a, b) {
            return a = a.split("."),
                function (c) {
                    for (var d = c.namespace.split("."), e = 0; e < a.length; e++)
                        if (d.indexOf(a[e]) === -1) return;
                    b.apply(this, arguments)
                }
        }
        var p, q = exports.shinyapp = new ShinyApp,
            r = new InputBatchSender(q),
            s = new InputNoResendDecorator(r),
            t = new InputEventDecorator(s),
            u = new InputRateDecorator(t),
            v = new InputDeferDecorator(t);
        $('input[type="submit"], button[type="submit"]').length > 0 ? (p = v, $('input[type="submit"], button[type="submit"]').each(function () {
            $(this).click(function (a) {
                a.preventDefault(), v.submit()
            })
        })) : p = u, p = new InputValidateDecorator(p), exports.setInputValue = exports.onInputChange = function (a, b, c) {
            c = addDefaultInputOpts(c), p.setInput(a, b, c)
        };
        var w = {};
        exports.bindAll = function (a) {
            var b = f(a);
            $.each(b, function (a, b) {
                p.setInput(a, b.value, b.opts)
            }), initDeferredIframes()
        }, exports.unbindAll = g, exports.initializeInputs = h, h(document);
        var x = mapValues(f(document), function (a) {
            return a.value
        });
        $(".shiny-image-output, .shiny-plot-output, .shiny-report-size").each(function () {
            var a = i(this);
            0 === this.offsetWidth && 0 === this.offsetHeight || (x[".clientdata_output_" + a + "_width"] = this.offsetWidth, x[".clientdata_output_" + a + "_height"] = this.offsetHeight)
        });
        var y = new Debouncer(null, j, 0);
        r.lastChanceCallback.push(function () {
            y.isPending() && y.immediateCall()
        });
        var z = {};
        $(".shiny-bound-output").each(function () {
            var a = i(this);
            l(this) ? x[".clientdata_output_" + a + "_hidden"] = !0 : (z[a] = !0, x[".clientdata_output_" + a + "_hidden"] = !1)
        });
        var A = new Debouncer(null, m, 0);
        r.lastChanceCallback.push(function () {
            A.isPending() && A.immediateCall()
        }), $(window).resize(debounce(500, k));
        var B = ["modal", "dropdown", "tab", "tooltip", "popover", "collapse"];
        $.each(B, function (a, b) {
            $(document.body).on("shown.bs." + b + ".sendImageSize", "*", o("bs", k)), $(document.body).on("shown.bs." + b + ".sendOutputHiddenState hidden.bs." + b + ".sendOutputHiddenState", "*", o("bs", n))
        }), $(document.body).on("shown.sendImageSize", "*", k), $(document.body).on("shown.sendOutputHiddenState hidden.sendOutputHiddenState", "*", n), x[".clientdata_pixelratio"] = pixelRatio(), $(window).resize(function () {
            p.setInput(".clientdata_pixelratio", pixelRatio())
        }), x[".clientdata_url_protocol"] = window.location.protocol, x[".clientdata_url_hostname"] = window.location.hostname, x[".clientdata_url_port"] = window.location.port, x[".clientdata_url_pathname"] = window.location.pathname, x[".clientdata_url_search"] = window.location.search, $(window).on("pushstate", function (a) {
            p.setInput(".clientdata_url_search", window.location.search)
        }), $(window).on("popstate", function (a) {
            p.setInput(".clientdata_url_search", window.location.search)
        }), x[".clientdata_url_hash_initial"] = window.location.hash, x[".clientdata_url_hash"] = window.location.hash, $(window).on("hashchange", function (a) {
            p.setInput(".clientdata_url_hash", window.location.hash)
        });
        var C = x[".clientdata_singletons"] = $('script[type="application/shiny-singletons"]').text();
        singletons.registerNames(C.split(/,/));
        var D = $('script[type="application/html-dependencies"]').text();
        $.each(D.split(/;/), function (a, b) {
            var c = /\s*^(.+)\[(.+)\]\s*$/.exec(b);
            c && registerDependency(c[1], c[2])
        }), x[".clientdata_allowDataUriScheme"] = "undefined" != typeof WebSocket, s.reset(x), q.connect(x), $(document).one("shiny:connected", function () {
            initDeferredIframes()
        })
    }

    function initDeferredIframes() {
        window.Shiny && window.Shiny.shinyapp && window.Shiny.shinyapp.isConnected() && $(".shiny-frame-deferred").each(function (a, b) {
            var c = $(b);
            c.removeClass("shiny-frame-deferred"), c.attr("src", c.attr("data-deferred-src")), c.attr("data-deferred-src", null)
        })
    }
    var $ = jQuery,
        exports = window.Shiny = window.Shiny || {};
    exports.version = "1.4.0";
    var origPushState = window.history.pushState;
    window.history.pushState = function () {
        var a = origPushState.apply(this, arguments);
        return $(document).trigger("pushstate"), a
    }, $(document).on("submit", "form:not([action])", function (a) {
        a.preventDefault()
    });
    var _BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
        $escape = exports.$escape = function (a) {
            return a.replace(/([!"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~])/g, "\\$1")
        };
    exports.compareVersion = function (a, b, c) {
        function d(a) {
            return (a + "").replace(/-/, ".").replace(/(\.0)+[^\.]*$/, "").split(".")
        }

        function e(a, b) {
            a = d(a), b = d(b);
            for (var c, e = Math.min(a.length, b.length), f = 0; f < e; f++)
                if (c = parseInt(a[f], 10) - parseInt(b[f], 10), 0 !== c) return c;
            return a.length - b.length
        }
        var f = e(a, c);
        if ("==" === b) return 0 === f;
        if (">=" === b) return f >= 0;
        if (">" === b) return f > 0;
        if ("<=" === b) return f <= 0;
        if ("<" === b) return f < 0;
        throw "Unknown operator: " + b
    };
    var browser = function () {
        function a() {
            var a = -1;
            if (c) {
                var b = navigator.userAgent,
                    d = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
                null !== d.exec(b) && (a = parseFloat(RegExp.$1))
            }
            return a
        }
        var b = !1;
        /\bQt\//.test(window.navigator.userAgent) && ($(document.documentElement).addClass("qt"), b = !0), /\bQt\/5/.test(window.navigator.userAgent) && /Linux/.test(window.navigator.userAgent) && $(document.documentElement).addClass("qt5");
        var c = "Microsoft Internet Explorer" === navigator.appName;
        return {
            isQt: b,
            isIE: c,
            IEVersion: a()
        }
    }(),
        Invoker = function (a, b) {
            this.target = a, this.func = b
        };
    (function () {
        this.normalCall = this.immediateCall = function () {
            this.func.apply(this.target, arguments)
        }
    }).call(Invoker.prototype);
    var Debouncer = function (a, b, c) {
        this.target = a, this.func = b, this.delayMs = c, this.timerId = null, this.args = null
    };
    (function () {
        this.normalCall = function () {
            var a = this;
            this.$clearTimer(), this.args = arguments, this.timerId = setTimeout(function () {
                null !== a.timerId && (a.$clearTimer(), a.$invoke())
            }, this.delayMs)
        }, this.immediateCall = function () {
            this.$clearTimer(), this.args = arguments, this.$invoke()
        }, this.isPending = function () {
            return null !== this.timerId
        }, this.$clearTimer = function () {
            null !== this.timerId && (clearTimeout(this.timerId), this.timerId = null)
        }, this.$invoke = function () {
            this.func.apply(this.target, this.args), this.args = null
        }
    }).call(Debouncer.prototype);
    var Throttler = function (a, b, c) {
        this.target = a, this.func = b, this.delayMs = c, this.timerId = null, this.args = null
    };
    (function () {
        this.normalCall = function () {
            var a = this;
            this.args = arguments, null === this.timerId && (this.$invoke(), this.timerId = setTimeout(function () {
                null !== a.timerId && (a.$clearTimer(), a.args && a.normalCall.apply(a, a.args))
            }, this.delayMs))
        }, this.immediateCall = function () {
            this.$clearTimer(), this.args = arguments, this.$invoke()
        }, this.isPending = function () {
            return null !== this.timerId
        }, this.$clearTimer = function () {
            null !== this.timerId && (clearTimeout(this.timerId), this.timerId = null)
        }, this.$invoke = function () {
            this.func.apply(this.target, this.args), this.args = null
        }
    }).call(Throttler.prototype);
    var InputBatchSender = function (a) {
        this.shinyapp = a, this.timerId = null, this.pendingData = {}, this.reentrant = !1, this.lastChanceCallback = []
    };
    (function () {
        this.setInput = function (a, b, c) {
            this.pendingData[a] = b, this.reentrant || ("event" === c.priority ? this.$sendNow() : this.timerId || (this.timerId = setTimeout(this.$sendNow.bind(this), 0)))
        }, this.$sendNow = function () {
            this.reentrant && console.trace("Unexpected reentrancy in InputBatchSender!"), this.reentrant = !0;
            try {
                this.timerId = null, $.each(this.lastChanceCallback, function (a, b) {
                    b()
                });
                var a = this.pendingData;
                this.pendingData = {}, this.shinyapp.sendInput(a)
            } finally {
                this.reentrant = !1
            }
        }
    }).call(InputBatchSender.prototype);
    var InputNoResendDecorator = function (a, b) {
        this.target = a, this.lastSentValues = this.reset(b)
    };
    (function () {
        this.setInput = function (a, b, c) {
            var d = splitInputNameType(a),
                e = d.name,
                f = d.inputType,
                g = JSON.stringify(b);
            "event" !== c.priority && this.lastSentValues[e] && this.lastSentValues[e].jsonValue === g && this.lastSentValues[e].inputType === f || (this.lastSentValues[e] = {
                jsonValue: g,
                inputType: f
            }, this.target.setInput(a, b, c))
        }, this.reset = function () {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                b = {};
            for (var c in a)
                if (a.hasOwnProperty(c)) {
                    var d = splitInputNameType(c),
                        e = d.name,
                        f = d.inputType;
                    b[e] = {
                        jsonValue: JSON.stringify(a[c]),
                        inputType: f
                    }
                }
            this.lastSentValues = b
        }
    }).call(InputNoResendDecorator.prototype);
    var InputEventDecorator = function (a) {
        this.target = a
    };
    (function () {
        this.setInput = function (a, b, c) {
            var d = jQuery.Event("shiny:inputchanged"),
                e = splitInputNameType(a);
            if (d.name = e.name, d.inputType = e.inputType, d.value = b, d.binding = c.binding, d.el = c.el, d.priority = c.priority, $(c.el).trigger(d), !d.isDefaultPrevented()) {
                var f = d.name;
                "" !== d.inputType && (f += ":" + d.inputType), this.target.setInput(f, d.value, {
                    priority: c.priority
                })
            }
        }
    }).call(InputEventDecorator.prototype);
    var InputRateDecorator = function (a) {
        this.target = a, this.inputRatePolicies = {}
    };
    (function () {
        this.setInput = function (a, b, c) {
            var d = splitInputNameType(a),
                e = d.name;
            this.$ensureInit(e), "deferred" !== c.priority ? this.inputRatePolicies[e].immediateCall(a, b, c) : this.inputRatePolicies[e].normalCall(a, b, c)
        }, this.setRatePolicy = function (a, b, c) {
            var d = splitInputNameType(a),
                e = d.name;
            "direct" === b ? this.inputRatePolicies[e] = new Invoker(this, this.$doSetInput) : "debounce" === b ? this.inputRatePolicies[e] = new Debouncer(this, this.$doSetInput, c) : "throttle" === b && (this.inputRatePolicies[e] = new Throttler(this, this.$doSetInput, c))
        }, this.$ensureInit = function (a) {
            a in this.inputRatePolicies || this.setRatePolicy(a, "direct")
        }, this.$doSetInput = function (a, b, c) {
            this.target.setInput(a, b, c)
        }
    }).call(InputRateDecorator.prototype);
    var InputDeferDecorator = function (a) {
        this.target = a, this.pendingInput = {}
    };
    (function () {
        this.setInput = function (a, b, c) {
            /^\./.test(a) ? this.target.setInput(a, b, c) : this.pendingInput[a] = {
                value: b,
                opts: c
            }
        }, this.submit = function () {
            for (var a in this.pendingInput)
                if (this.pendingInput.hasOwnProperty(a)) {
                    var b = this.pendingInput[a],
                        c = b.value,
                        d = b.opts;
                    this.target.setInput(a, c, d)
                }
        }
    }).call(InputDeferDecorator.prototype);
    var InputValidateDecorator = function (a) {
        this.target = a
    };
    (function () {
        this.setInput = function (a, b, c) {
            if (!a) throw "Can't set input with empty name.";
            c = addDefaultInputOpts(c), this.target.setInput(a, b, c)
        }
    }).call(InputValidateDecorator.prototype);
    var ShinyApp = function () {
        this.$socket = null, this.$inputValues = {}, this.$initialInput = {}, this.$bindings = {}, this.$values = {}, this.$errors = {}, this.$conditionals = {}, this.$pendingMessages = [], this.$activeRequests = {}, this.$nextRequestId = 0, this.$allowReconnect = !1
    };
    (function () {
        function narrowScopeComponent(a, b) {
            return Object.keys(a).filter(function (a) {
                return 0 === a.indexOf(b)
            }).map(function (c) {
                return _defineProperty({}, c.substring(b.length), a[c])
            }).reduce(function (a, b) {
                return $.extend(a, b)
            }, {})
        }

        function narrowScope(a, b) {
            return b ? {
                input: narrowScopeComponent(a.input, b),
                output: narrowScopeComponent(a.output, b)
            } : a
        }

        function addMessageHandler(a, b) {
            if (messageHandlers[a]) throw 'handler for message of type "' + a + '" already added.';
            if ("function" != typeof b) throw "handler must be a function.";
            if (1 !== b.length) throw "handler must be a function that takes one argument.";
            messageHandlerOrder.push(a), messageHandlers[a] = b
        }

        function addCustomMessageHandler(a, b) {
            if (customMessageHandlers[a]) {
                var c = customMessageHandlerOrder.indexOf(a);
                c !== -1 && (customMessageHandlerOrder.splice(c, 1), delete customMessageHandlers[a])
            }
            if ("function" != typeof b) throw "handler must be a function.";
            if (1 !== b.length) throw "handler must be a function that takes one argument.";
            customMessageHandlerOrder.push(a), customMessageHandlers[a] = b
        }

        function getTabset(a) {
            var b = $("#" + $escape(a));
            if (0 === b.length) throw "There is no tabsetPanel (or navbarPage or navlistPanel) with id equal to '" + a + "'";
            return b
        }

        function getTabContent(a) {
            var b = a.attr("data-tabsetid"),
                c = $("div.tab-content[data-tabsetid='" + $escape(b) + "']");
            return c
        }

        function getTargetTabs(a, b, c) {
            var d = "[data-value='" + $escape(c) + "']",
                e = a.find("a" + d),
                f = e.parent();
            if (0 === f.length) throw "There is no tabPanel (or navbarMenu) with value (or menuName) equal to '" + c + "'";
            var g = [],
                h = [];
            if ("dropdown" === e.attr("data-toggle")) {
                var i = e.find("+ ul.dropdown-menu"),
                    j = i.attr("data-tabsetid"),
                    k = i.find("a[data-toggle='tab']").parent("li");
                k.each(function (a, b) {
                    g.push($(b))
                });
                var l = "div.tab-pane[id^='tab-" + $escape(j) + "']",
                    m = b.find(l);
                m.each(function (a, b) {
                    h.push($(b))
                })
            } else h.push(b.find("div" + d));
            return {
                $liTag: f,
                $liTags: g,
                $divTags: h
            }
        }

        function ensureTabsetHasVisibleTab(a) {
            if (0 === a.find("li.active").not(".dropdown").length) {
                var b = getFirstTab(a),
                    c = a.data("shiny-input-binding"),
                    d = jQuery.Event("shiny:updateinput");
                d.binding = c, a.trigger(d), c.setValue(a[0], b)
            }
        }

        function getFirstTab(a) {
            return a.find("li:visible a[data-toggle='tab']").first().attr("data-value") || null
        }

        function tabApplyFunction(a, b) {
            var c = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            $.each(a, function (a, d) {
                "$liTag" === a ? b(d) : "$divTags" === a ? $.each(d, function (a, c) {
                    b(c)
                }) : c && "$liTags" === a && $.each(d, function (a, c) {
                    b(c)
                })
            })
        }
        this.connect = function (a) {
            if (this.$socket) throw "Connect was already called on this application object";
            this.$socket = this.createSocket(), this.$initialInput = a, $.extend(this.$inputValues, a), this.$updateConditionals()
        }, this.isConnected = function () {
            return !!this.$socket
        };
        var scheduledReconnect = null;
        this.reconnect = function () {
            if (clearTimeout(scheduledReconnect), this.isConnected()) throw "Attempted to reconnect, but already connected.";
            this.$socket = this.createSocket(), this.$initialInput = $.extend({}, this.$inputValues), this.$updateConditionals()
        }, this.createSocket = function () {
            var a = this,
                b = exports.createSocket || function () {
                    var a = "ws:";
                    "https:" === window.location.protocol && (a = "wss:");
                    var b = window.location.pathname;
                    /^([$#!&-;=?-[\]_a-z~]|%[0-9a-fA-F]{2})+$/.test(b) || (b = encodeURI(b), browser.isQt && (b = encodeURI(b))), /\/$/.test(b) || (b += "/"), b += "websocket/";
                    var c = new WebSocket(a + "//" + window.location.host + b);
                    return c.binaryType = "arraybuffer", c
                },
                c = b(),
                d = !1;
            return c.onopen = function () {
                for (d = !0, $(document).trigger({
                    type: "shiny:connected",
                    socket: c
                }), a.onConnected(), c.send(JSON.stringify({
                    method: "init",
                    data: a.$initialInput
                })); a.$pendingMessages.length;) {
                    var b = a.$pendingMessages.shift();
                    c.send(b)
                }
            }, c.onmessage = function (b) {
                a.dispatchMessage(b.data)
            }, c.onclose = function () {
                d && ($(document).trigger({
                    type: "shiny:disconnected",
                    socket: c
                }), a.$notifyDisconnected()), a.onDisconnected(), a.$removeSocket()
            }, c
        }, this.sendInput = function (a) {
            var b = JSON.stringify({
                method: "update",
                data: a
            });
            this.$sendMsg(b), $.extend(this.$inputValues, a), this.$updateConditionals()
        }, this.$notifyDisconnected = function () {
            window.parent && window.parent.postMessage("disconnected", "*")
        }, this.$removeSocket = function () {
            this.$socket = null
        }, this.$scheduleReconnect = function (a) {
            var b = this;
            scheduledReconnect = setTimeout(function () {
                b.reconnect()
            }, a)
        };
        var reconnectDelay = function () {
            var a = 0,
                b = [1500, 1500, 2500, 2500, 5500, 5500, 10500];
            return {
                next: function () {
                    var c = a;
                    return c >= b.length && (c = b.length - 1), a++ , b[c]
                },
                reset: function () {
                    a = 0
                }
            }
        }();
        this.onDisconnected = function () {
            var a = $("#shiny-disconnected-overlay");
            if (0 === a.length && $(document.body).append('<div id="shiny-disconnected-overlay"></div>'), this.$allowReconnect === !0 && this.$socket.allowReconnect === !0 || "force" === this.$allowReconnect) {
                var b = reconnectDelay.next();
                exports.showReconnectDialog(b), this.$scheduleReconnect(b)
            }
        }, this.onConnected = function () {
            $("#shiny-disconnected-overlay").remove(), exports.hideReconnectDialog(), reconnectDelay.reset()
        }, this.makeRequest = function (a, b, c, d, e) {
            for (var f = this.$nextRequestId; this.$activeRequests[f];) f = (f + 1) % 1e9;
            this.$nextRequestId = f + 1, this.$activeRequests[f] = {
                onSuccess: c,
                onError: d
            };
            var g = JSON.stringify({
                method: a,
                args: b,
                tag: f
            });
            if (e) {
                var h = function (a) {
                    var b = new ArrayBuffer(4),
                        c = new DataView(b);
                    return c.setUint32(0, a, !0), b
                },
                    i = [];
                i.push(h(16908802));
                var j = makeBlob([g]);
                i.push(h(j.size)), i.push(j);
                for (var k = 0; k < e.length; k++) i.push(h(e[k].byteLength || e[k].size || 0)), i.push(e[k]);
                g = makeBlob(i)
            }
            this.$sendMsg(g)
        }, this.$sendMsg = function (a) {
            this.$socket.readyState ? this.$socket.send(a) : this.$pendingMessages.push(a)
        }, this.receiveError = function (a, b) {
            if (this.$errors[a] !== b) {
                this.$errors[a] = b, delete this.$values[a];
                var c = this.$bindings[a],
                    d = jQuery.Event("shiny:error");
                d.name = a, d.error = b, d.binding = c, $(c ? c.el : document).trigger(d), !d.isDefaultPrevented() && c && c.onValueError && c.onValueError(d.error)
            }
        }, this.receiveOutput = function (a, b) {
            var c = this.$bindings[a],
                d = jQuery.Event("shiny:value");
            return d.name = a, d.value = b, d.binding = c, this.$values[a] === b ? void $(c ? c.el : document).trigger(d) : (this.$values[a] = b, delete this.$errors[a], $(c ? c.el : document).trigger(d), !d.isDefaultPrevented() && c && c.onValueChange(d.value), b)
        }, this.bindOutput = function (a, b) {
            if (!a) throw "Can't bind an element with no ID";
            if (this.$bindings[a]) throw "Duplicate binding for ID " + a;
            return this.$bindings[a] = b, void 0 !== this.$values[a] ? b.onValueChange(this.$values[a]) : void 0 !== this.$errors[a] && b.onValueError(this.$errors[a]), b
        }, this.unbindOutput = function (a, b) {
            return this.$bindings[a] === b && (delete this.$bindings[a], !0)
        }, this.$updateConditionals = function () {
            $(document).trigger({
                type: "shiny:conditional"
            });
            var a = {};
            for (var b in this.$inputValues)
                if (this.$inputValues.hasOwnProperty(b)) {
                    var c = b.replace(/:.*/, "");
                    a[c] = this.$inputValues[b]
                }
            for (var d = {
                input: a,
                output: this.$values
            }, e = $(document).find("[data-display-if]"), f = 0; f < e.length; f++) {
                var g = $(e[f]),
                    h = g.data("data-display-if-func");
                if (!h) {
                    var i = g.attr("data-display-if");
                    h = scopeExprToFunc(i), g.data("data-display-if-func", h)
                }
                var j = g.attr("data-ns-prefix"),
                    k = narrowScope(d, j),
                    l = h(k),
                    m = "none" !== g.css("display");
                l !== m && (l ? (g.trigger("show"), g.show(), g.trigger("shown")) : (g.trigger("hide"), g.hide(), g.trigger("hidden")))
            }
        };
        var messageHandlerOrder = [],
            messageHandlers = {},
            customMessageHandlerOrder = [],
            customMessageHandlers = {};
        exports.addCustomMessageHandler = addCustomMessageHandler, this.dispatchMessage = function (a) {
            var b = {};
            if ("string" == typeof a) b = JSON.parse(a);
            else {
                for (var c = new DataView(a, 0, 1).getUint8(0), d = new DataView(a, 1, c), e = [], f = 0; f < c; f++) e.push(String.fromCharCode(d.getUint8(f)));
                var g = e.join("");
                a = a.slice(c + 1), b.custom = {}, b.custom[g] = a
            }
            var h = jQuery.Event("shiny:message");
            h.message = b, $(document).trigger(h), h.isDefaultPrevented() || (this._sendMessagesToHandlers(h.message, messageHandlers, messageHandlerOrder), this.$updateConditionals())
        }, this._sendMessagesToHandlers = function (a, b, c) {
            for (var d = 0; d < c.length; d++) {
                var e = c[d];
                a.hasOwnProperty(e) && b[e].call(this, a[e])
            }
        }, addMessageHandler("values", function (a) {
            for (var b in this.$bindings) this.$bindings.hasOwnProperty(b) && this.$bindings[b].showProgress(!1);
            for (var c in a) a.hasOwnProperty(c) && this.receiveOutput(c, a[c])
        }), addMessageHandler("errors", function (a) {
            for (var b in a) a.hasOwnProperty(b) && this.receiveError(b, a[b])
        }), addMessageHandler("inputMessages", function (a) {
            for (var b = 0; b < a.length; b++) {
                var c = $(".shiny-bound-input#" + $escape(a[b].id)),
                    d = c.data("shiny-input-binding");
                if (c.length > 0) {
                    var e = c[0],
                        f = jQuery.Event("shiny:updateinput");
                    f.message = a[b].message, f.binding = d, $(e).trigger(f), f.isDefaultPrevented() || d.receiveMessage(e, f.message)
                }
            }
        }), addMessageHandler("javascript", function (message) {
            eval(message)
        }), addMessageHandler("console", function (a) {
            for (var b = 0; b < a.length; b++) console.log && console.log(a[b])
        }), addMessageHandler("progress", function (a) {
            if (a.type && a.message) {
                var b = progressHandlers[a.type];
                b && b.call(this, a.message)
            }
        }), addMessageHandler("notification", function (a) {
            if ("show" === a.type) exports.notifications.show(a.message);
            else {
                if ("remove" !== a.type) throw "Unkown notification type: " + a.type;
                exports.notifications.remove(a.message)
            }
        }), addMessageHandler("modal", function (a) {
            if ("show" === a.type) exports.modal.show(a.message);
            else {
                if ("remove" !== a.type) throw "Unkown modal type: " + a.type;
                exports.modal.remove()
            }
        }), addMessageHandler("response", function (a) {
            var b = a.tag,
                c = this.$activeRequests[b];
            c && (delete this.$activeRequests[b], "value" in a ? c.onSuccess(a.value) : c.onError(a.error))
        }), addMessageHandler("allowReconnect", function (a) {
            if (a !== !0 && a !== !1 && "force" !== a) throw "Invalid value for allowReconnect: " + a;
            this.$allowReconnect = a
        }), addMessageHandler("custom", function (a) {
            exports.oncustommessage && exports.oncustommessage(a), this._sendMessagesToHandlers(a, customMessageHandlers, customMessageHandlerOrder)
        }), addMessageHandler("config", function (a) {
            this.config = {
                workerId: a.workerId,
                sessionId: a.sessionId
            }, a.user && (exports.user = a.user), $(document).trigger("shiny:sessioninitialized")
        }), addMessageHandler("busy", function (a) {
            "busy" === a ? ($(document.documentElement).addClass("shiny-busy"), $(document).trigger("shiny:busy")) : "idle" === a && ($(document.documentElement).removeClass("shiny-busy"), $(document).trigger("shiny:idle"))
        }), addMessageHandler("recalculating", function (a) {
            if (a.hasOwnProperty("name") && a.hasOwnProperty("status")) {
                var b = this.$bindings[a.name];
                $(b ? b.el : null).trigger({
                    type: "shiny:" + a.status
                })
            }
        }), addMessageHandler("reload", function (a) {
            window.location.reload()
        }), addMessageHandler("shiny-insert-ui", function (a) {
            var b = $(a.selector);
            0 === b.length ? (console.warn('The selector you chose ("' + a.selector + '") could not be found in the DOM.'), exports.renderHtml(a.content.html, $([]), a.content.deps)) : b.each(function (b, c) {
                return exports.renderContent(c, a.content, a.where), a.multiple
            })
        }), addMessageHandler("shiny-remove-ui", function (a) {
            var b = $(a.selector);
            b.each(function (b, c) {
                return exports.unbindAll(c, !0),
                    $(c).remove(), a.multiple
            })
        }), addMessageHandler("shiny-insert-tab", function (a) {
            function b(a, b) {
                var c = [0];
                return a.find("> li").each(function () {
                    var a = $(this).find("> a[data-toggle='tab']");
                    if (a.length > 0) {
                        var d = a.attr("href").replace(/.*(?=#[^\s]+$)/, ""),
                            e = d.replace("#tab-" + b + "-", "");
                        c.push(Number(e))
                    }
                }), Math.max.apply(null, c) + 1
            }

            function c() {
                if (null !== a.menuName) {
                    var b = $("a.dropdown-toggle[data-value='" + $escape(a.menuName) + "']");
                    if (0 === b.length) throw "There is no navbarMenu with menuName equal to '" + a.menuName + "'";
                    var c = b.find("+ ul.dropdown-menu"),
                        d = c.attr("data-tabsetid");
                    return {
                        $tabset: c,
                        id: d
                    }
                }
                if (null !== a.target) {
                    var e = l.parent("ul");
                    if (e.hasClass("dropdown-menu")) {
                        var f = e.attr("data-tabsetid");
                        return {
                            $tabset: e,
                            id: f
                        }
                    }
                }
                return null
            }
            var d = getTabset(a.inputId),
                e = d,
                f = getTabContent(e),
                g = d.attr("data-tabsetid"),
                h = $(a.divTag.html),
                i = $(a.liTag.html),
                j = i.find("> a"),
                k = null,
                l = null;
            null !== a.target && (k = getTargetTabs(e, f, a.target), l = k.$liTag);
            var m = c();
            if (null !== m) {
                if ("dropdown" === j.attr("data-toggle")) throw "Cannot insert a navbarMenu inside another one";
                e = m.$tabset, g = m.id
            }
            if ("tab" === j.attr("data-toggle")) {
                var n = b(e, g),
                    o = "tab-" + g + "-" + n;
                i.find("> a").attr("href", "#" + o), h.attr("id", o)
            }
            "before" === a.position ? l ? l.before(i) : e.append(i) : "after" === a.position && (l ? l.after(i) : e.prepend(i)), exports.renderContent(i[0], {
                html: i.html(),
                deps: a.liTag.deps
            }), exports.renderContent(f[0], {
                html: "",
                deps: a.divTag.deps
            }, "beforeend"), h.get().forEach(function (a) {
                f[0].appendChild(a), exports.renderContent(a, a.innerHTML || a.textContent)
            }), a.select && i.find("a").tab("show")
        }), addMessageHandler("shiny-remove-tab", function (a) {
            function b(a) {
                exports.unbindAll(a, !0), a.remove()
            }
            var c = getTabset(a.inputId),
                d = getTabContent(c),
                e = getTargetTabs(c, d, a.target);
            tabApplyFunction(e, b), ensureTabsetHasVisibleTab(c)
        }), addMessageHandler("shiny-change-tab-visibility", function (a) {
            function b(b) {
                "show" === a.type ? b.css("display", "") : "hide" === a.type && (b.hide(), b.removeClass("active"))
            }
            var c = getTabset(a.inputId),
                d = getTabContent(c),
                e = getTargetTabs(c, d, a.target);
            tabApplyFunction(e, b, !0), ensureTabsetHasVisibleTab(c)
        }), addMessageHandler("updateQueryString", function (a) {
            if ("replace" === a.mode) return void window.history.replaceState(null, null, a.queryString);
            var b = null;
            if ("#" === a.queryString.charAt(0)) b = "hash";
            else {
                if ("?" !== a.queryString.charAt(0)) throw "The 'query' string must start with either '?' (to update the query string) or with '#' (to update the hash).";
                b = "query"
            }
            var c = window.location.pathname,
                d = window.location.search,
                e = window.location.hash,
                f = c;
            f += "query" === b ? a.queryString : d + a.queryString, window.history.pushState(null, null, f), a.queryString.indexOf("#") !== -1 && (b = "hash"), window.location.hash !== e && (b = "hash"), "hash" === b && $(document).trigger("hashchange")
        }), addMessageHandler("resetBrush", function (a) {
            exports.resetBrush(a.brushId)
        });
        var progressHandlers = {
            binding: function a(b) {
                var c = b.id,
                    a = this.$bindings[c];
                a && ($(a.el).trigger({
                    type: "shiny:outputinvalidated",
                    binding: a,
                    name: c
                }), a.showProgress && a.showProgress(!0))
            },
            open: function (a) {
                if ("notification" === a.style) exports.notifications.show({
                    html: '<div id="shiny-progress-' + a.id + '" class="shiny-progress-notification"><div class="progress progress-striped active" style="display: none;"><div class="progress-bar"></div></div><div class="progress-text"><span class="progress-message">message</span> <span class="progress-detail"></span></div></div>',
                    id: a.id,
                    duration: null
                });
                else if ("old" === a.style) {
                    var b = $(".shiny-progress-container");
                    0 === b.length && (b = $('<div class="shiny-progress-container"></div>'), $(document.body).append(b));
                    var c = $(".shiny-progress.open").length,
                        d = $('<div class="shiny-progress open"><div class="progress progress-striped active"><div class="progress-bar bar"></div></div><div class="progress-text"><span class="progress-message">message</span><span class="progress-detail"></span></div></div>');
                    d.attr("id", a.id), b.append(d);
                    var e = d.find(".progress");
                    e.css("top", c * e.height() + "px");
                    var f = d.find(".progress-text");
                    f.css("top", 3 * e.height() + c * f.outerHeight() + "px"), d.hide()
                }
            },
            update: function (a) {
                if ("notification" === a.style) {
                    var b = $("#shiny-progress-" + a.id);
                    if (0 === b.length) return;
                    "undefined" != typeof a.message && b.find(".progress-message").text(a.message), "undefined" != typeof a.detail && b.find(".progress-detail").text(a.detail), "undefined" != typeof a.value && null !== a.value && (b.find(".progress").show(), b.find(".progress-bar").width(100 * a.value + "%"))
                } else if ("old" === a.style) {
                    var b = $("#" + a.id + ".shiny-progress");
                    "undefined" != typeof a.message && b.find(".progress-message").text(a.message), "undefined" != typeof a.detail && b.find(".progress-detail").text(a.detail), "undefined" != typeof a.value && null !== a.value && (b.find(".progress").show(), b.find(".bar").width(100 * a.value + "%")), b.fadeIn()
                }
            },
            close: function (a) {
                if ("notification" === a.style) exports.notifications.remove(a.id);
                else if ("old" === a.style) {
                    var b = $("#" + a.id + ".shiny-progress");
                    b.removeClass("open"), b.fadeOut({
                        complete: function () {
                            b.remove(), 0 === $(".shiny-progress").length && $(".shiny-progress-container").remove()
                        }
                    })
                }
            }
        };
        exports.progressHandlers = progressHandlers, this.getTestSnapshotBaseUrl = function () {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                b = a.fullUrl,
                c = void 0 === b || b,
                d = window.location,
                e = "";
            return c && (e = d.origin + d.pathname.replace(/\/[^\/]*$/, "")), e += "/session/" + encodeURIComponent(this.config.sessionId) + "/dataobj/shinytest?w=" + encodeURIComponent(this.config.workerId) + "&nonce=" + randomId()
        }
    }).call(ShinyApp.prototype), exports.showReconnectDialog = function () {
        function a() {
            var c = $("#shiny-reconnect-time");
            if (0 !== c.length) {
                var d = Math.floor((b - (new Date).getTime()) / 1e3);
                d > 0 ? c.text(" in " + d + "s") : c.text("..."), setTimeout(a, 1e3)
            }
        }
        var b = null;
        return function (c) {
            if (b = (new Date).getTime() + c, !($("#shiny-reconnect-text").length > 0)) {
                var d = '<span id="shiny-reconnect-text">Attempting to reconnect</span><span id="shiny-reconnect-time"></span>',
                    e = '<a id="shiny-reconnect-now" href="#" onclick="Shiny.shinyapp.reconnect();">Try now</a>';
                exports.notifications.show({
                    id: "reconnect",
                    html: d,
                    action: e,
                    duration: null,
                    closeButton: !1,
                    type: "warning"
                }), a()
            }
        }
    }(), exports.hideReconnectDialog = function () {
        exports.notifications.remove("reconnect")
    }, exports.notifications = function () {
        function a() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                b = a.html,
                d = void 0 === b ? "" : b,
                e = a.action,
                j = void 0 === e ? "" : e,
                k = a.deps,
                l = void 0 === k ? [] : k,
                m = a.duration,
                n = void 0 === m ? 5e3 : m,
                o = a.id,
                p = void 0 === o ? null : o,
                q = a.closeButton,
                r = void 0 === q || q,
                s = a.type,
                t = void 0 === s ? null : s;
            p || (p = randomId()), f();
            var u = c(p);
            0 === u.length && (u = g(p));
            var v = '<div class="shiny-notification-content-text">' + d + "</div>" + ('<div class="shiny-notification-content-action">' + j + "</div>"),
                w = u.find(".shiny-notification-content");
            exports.renderContent(w, {
                html: v,
                deps: l
            });
            var x = u.attr("class").split(/\s+/).filter(function (a) {
                return a.match(/^shiny-notification-/)
            }).join(" ");
            u.removeClass(x), t && "default" !== t && u.addClass("shiny-notification-" + t);
            var y = u.find(".shiny-notification-close");
            return r && 0 === y.length ? u.append('<div class="shiny-notification-close">&times;</div>') : r || 0 === y.length || y.remove(), n ? h(p, n) : i(p), p
        }

        function b(a) {
            c(a).fadeOut(j, function () {
                exports.unbindAll(this), $(this).remove(), 0 === d().length && e().remove()
            })
        }

        function c(a) {
            return a ? e().find("#shiny-notification-" + $escape(a)) : null
        }

        function d() {
            return e().find(".shiny-notification").map(function () {
                return this.id.replace(/shiny-notification-/, "")
            }).get()
        }

        function e() {
            return $("#shiny-notification-panel")
        }

        function f() {
            var a = e();
            return a.length > 0 ? a : ($(document.body).append('<div id="shiny-notification-panel">'), a)
        }

        function g(a) {
            var d = c(a);
            return 0 === d.length && (d = $('<div id="shiny-notification-' + a + '" class="shiny-notification"><div class="shiny-notification-close">&times;</div><div class="shiny-notification-content"></div></div>'), d.find(".shiny-notification-close").on("click", function (c) {
                c.preventDefault(), c.stopPropagation(), b(a)
            }), e().append(d)), d
        }

        function h(a, d) {
            i(a);
            var e = setTimeout(function () {
                b(a)
            }, d);
            c(a).data("removalCallback", e)
        }

        function i(a) {
            var b = c(a),
                d = b.data("removalCallback");
            d && clearTimeout(d)
        }
        var j = 250;
        return {
            show: a,
            remove: b
        }
    }(), exports.modal = {
        show: function () {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                b = a.html,
                c = void 0 === b ? "" : b,
                d = a.deps,
                e = void 0 === d ? [] : d;
            $(".modal-backdrop").remove();
            var f = $("#shiny-modal-wrapper");
            0 === f.length && (f = $('<div id="shiny-modal-wrapper"></div>'), $(document.body).append(f), f.on("hidden.bs.modal", function (a) {
                a.target === $("#shiny-modal")[0] && (exports.unbindAll(f), f.remove())
            })), f.on("keydown.shinymodal", function (a) {
                $("#shiny-modal").data("keyboard") !== !1 && 27 === a.keyCode && (a.stopPropagation(), a.preventDefault())
            }), exports.renderContent(f, {
                html: c,
                deps: e
            })
        },
        remove: function () {
            var a = $("#shiny-modal-wrapper");
            a.off("keydown.shinymodal"), a.find(".modal").length > 0 ? a.find(".modal").modal("hide") : (exports.unbindAll(a), a.remove())
        }
    };
    var FileProcessor = function (a) {
        this.files = a, this.fileIndex = -1, this.aborted = !1, this.completed = !1, this.$run()
    };
    (function () {
        this.onBegin = function (a, b) {
            setTimeout(b, 0)
        }, this.onFile = function (a, b) {
            setTimeout(b, 0)
        }, this.onComplete = function () { }, this.onAbort = function () { }, this.abort = function () {
            this.completed || this.aborted || (this.aborted = !0, this.onAbort())
        }, this.$getRun = function () {
            var a = this,
                b = !1;
            return function () {
                b || (b = !0, a.$run())
            }
        }, this.$run = function () {
            if (!this.aborted && !this.completed) {
                if (this.fileIndex < 0) return this.fileIndex = 0, void this.onBegin(this.files, this.$getRun());
                if (this.fileIndex === this.files.length) return this.completed = !0, void this.onComplete();
                var a = this.files[this.fileIndex++];
                this.onFile(a, this.$getRun())
            }
        }
    }).call(FileProcessor.prototype);
    var BindingRegistry = function () {
        this.bindings = [], this.bindingNames = {}
    };
    (function () {
        this.register = function (a, b, c) {
            var d = {
                binding: a,
                priority: c || 0
            };
            this.bindings.unshift(d), b && (this.bindingNames[b] = d, a.name = b)
        }, this.setPriority = function (a, b) {
            var c = this.bindingNames[a];
            if (!c) throw "Tried to set priority on unknown binding " + a;
            c.priority = b || 0
        }, this.getPriority = function (a) {
            var b = this.bindingNames[a];
            return !!b && b.priority
        }, this.getBindings = function () {
            return mergeSort(this.bindings, function (a, b) {
                return b.priority - a.priority
            })
        }
    }).call(BindingRegistry.prototype);
    var inputBindings = exports.inputBindings = new BindingRegistry,
        outputBindings = exports.outputBindings = new BindingRegistry,
        OutputBinding = exports.OutputBinding = function () { };
    (function () {
        this.find = function (a) {
            throw "Not implemented"
        }, this.getId = function (a) {
            return a["data-input-id"] || a.id
        }, this.onValueChange = function (a, b) {
            this.clearError(a), this.renderValue(a, b)
        }, this.onValueError = function (a, b) {
            this.renderError(a, b)
        }, this.renderError = function (a, b) {
            if (this.clearError(a), "" === b.message) return void $(a).empty();
            var c = "shiny-output-error";
            null !== b.type && (c = c + " " + $.map(asArray(b.type), function (a) {
                return c + "-" + a
            }).join(" ")), $(a).addClass(c).text(b.message)
        }, this.clearError = function (a) {
            $(a).attr("class", function (a, b) {
                return b.replace(/(^|\s)shiny-output-error\S*/g, "")
            })
        }, this.showProgress = function (a, b) {
            var c = "recalculating";
            b ? $(a).addClass(c) : $(a).removeClass(c)
        }
    }).call(OutputBinding.prototype);
    var textOutputBinding = new OutputBinding;
    $.extend(textOutputBinding, {
        find: function (a) {
            return $(a).find(".shiny-text-output")
        },
        renderValue: function (a, b) {
            $(a).text(b)
        }
    }), outputBindings.register(textOutputBinding, "shiny.textOutput");
    var imageOutputBinding = new OutputBinding;
    $.extend(imageOutputBinding, {
        find: function (a) {
            return $(a).find(".shiny-image-output, .shiny-plot-output")
        },
        renderValue: function (a, b) {
            function c(a, b) {
                return void 0 === a ? b : a
            }
            var d, e = this.getId(a),
                f = $(a),
                g = f.find("img");
            if (0 === g.length ? (d = document.createElement("img"), f.append(d), g = $(d)) : (d = g[0], g.trigger("reset")), !b) return void f.empty();
            var h = {
                clickId: f.data("click-id"),
                clickClip: c(strToBool(f.data("click-clip")), !0),
                dblclickId: f.data("dblclick-id"),
                dblclickClip: c(strToBool(f.data("dblclick-clip")), !0),
                dblclickDelay: c(f.data("dblclick-delay"), 400),
                hoverId: f.data("hover-id"),
                hoverClip: c(strToBool(f.data("hover-clip")), !0),
                hoverDelayType: c(f.data("hover-delay-type"), "debounce"),
                hoverDelay: c(f.data("hover-delay"), 300),
                hoverNullOutside: c(strToBool(f.data("hover-null-outside")), !1),
                brushId: f.data("brush-id"),
                brushClip: c(strToBool(f.data("brush-clip")), !0),
                brushDelayType: c(f.data("brush-delay-type"), "debounce"),
                brushDelay: c(f.data("brush-delay"), 300),
                brushFill: c(f.data("brush-fill"), "#666"),
                brushStroke: c(f.data("brush-stroke"), "#000"),
                brushOpacity: c(f.data("brush-opacity"), .3),
                brushDirection: c(f.data("brush-direction"), "xy"),
                brushResetOnNew: c(strToBool(f.data("brush-reset-on-new")), !1),
                coordmap: b.coordmap
            };
            $.each(b, function (a, b) {
                null !== b && "coordmap" !== a && ("src" === a && b === d.getAttribute("src") && d.removeAttribute("src"), d.setAttribute(a, b))
            });
            for (var i = 0; i < d.attributes.length; i++) {
                var j = d.attributes[i];
                j.specified && !b.hasOwnProperty(j.name) && d.removeAttribute(j.name)
            }
            h.coordmap || (h.coordmap = {
                panels: [],
                dims: {
                    height: null,
                    width: null
                }
            }), f.off(".image_output"), g.off(".image_output"), g.off("load.shiny_image_interaction"), g.one("load.shiny_image_interaction", function () {
                imageutils.initCoordmap(f, h.coordmap);
                var a = imageutils.createClickInfo(f, h.dblclickId, h.dblclickDelay);
                if (f.on("mousedown.image_output", a.mousedown), browser.isIE && 8 === browser.IEVersion && f.on("dblclick.image_output", a.dblclickIE8), h.clickId) {
                    imageutils.disableDrag(f, g);
                    var c = imageutils.createClickHandler(h.clickId, h.clickClip, h.coordmap);
                    f.on("mousedown2.image_output", c.mousedown), f.on("resize.image_output", c.onResize), g.on("reset.image_output", c.onResetImg)
                }
                if (h.dblclickId) {
                    imageutils.disableDrag(f, g);
                    var d = imageutils.createClickHandler(h.dblclickId, h.clickClip, h.coordmap);
                    f.on("dblclick2.image_output", d.mousedown), f.on("resize.image_output", d.onResize), g.on("reset.image_output", d.onResetImg)
                }
                if (h.hoverId) {
                    imageutils.disableDrag(f, g);
                    var i = imageutils.createHoverHandler(h.hoverId, h.hoverDelay, h.hoverDelayType, h.hoverClip, h.hoverNullOutside, h.coordmap);
                    f.on("mousemove.image_output", i.mousemove), f.on("mouseout.image_output", i.mouseout), f.on("resize.image_output", i.onResize), g.on("reset.image_output", i.onResetImg)
                }
                if (h.brushId) {
                    imageutils.disableDrag(f, g);
                    var j = imageutils.createBrushHandler(h.brushId, f, h, h.coordmap, e);
                    f.on("mousedown.image_output", j.mousedown), f.on("mousemove.image_output", j.mousemove), f.on("resize.image_output", j.onResize), g.on("reset.image_output", j.onResetImg)
                } (h.clickId || h.dblclickId || h.hoverId || h.brushId) && f.addClass("crosshair"), b.error && console.log("Error on server extracting coordmap: " + b.error)
            })
        },
        renderError: function (a, b) {
            $(a).find("img").trigger("reset"), OutputBinding.prototype.renderError.call(this, a, b)
        },
        clearError: function (a) {
            $(a).contents().filter(function () {
                return "IMG" !== this.tagName && this.id !== a.id + "_brush"
            }).remove(), OutputBinding.prototype.clearError.call(this, a)
        },
        resize: function (a, b, c) {
            $(a).find("img").trigger("resize")
        }
    }), outputBindings.register(imageOutputBinding, "shiny.imageOutput");
    var imageutils = {};
    imageutils.disableDrag = function (a, b) {
        b.css("-webkit-user-drag", "none"), b.off("dragstart.image_output"), b.on("dragstart.image_output", function () {
            return !1
        }), a.off("selectstart.image_output"), a.on("selectstart.image_output", function () {
            return !1
        })
    }, imageutils.initPanelScales = function (a) {
        function b(a, b, c, d, e, f) {
            f = f || !0;
            var g = (e - d) / (c - b),
                h = a - b,
                i = h * g + d;
            if (f) {
                var j = Math.max(e, d),
                    k = Math.min(e, d);
                i > j ? i = j : i < k && (i = k)
            }
            return i
        }

        function c(a, c, d, e, f) {
            return {
                scale: function (g, h) {
                    return f && (g = Math.log(g) / Math.log(f)), b(g, a, c, d, e, h)
                },
                scaleInv: function (g, h) {
                    var i = b(g, d, e, a, c, h);
                    return f && (i = Math.pow(f, i)), i
                }
            }
        }

        function d(a) {
            var b = a.domain,
                d = a.range,
                e = a.log && a.log.x ? a.log.x : null,
                f = a.log && a.log.y ? a.log.y : null,
                g = c(b.left, b.right, d.left, d.right, e),
                h = c(b.bottom, b.top, d.bottom, d.top, f);
            a.scaleDataToImg = function (a, b) {
                return mapValues(a, function (a, c) {
                    var d = c.substring(0, 1);
                    return "x" === d ? g.scale(a, b) : "y" === d ? h.scale(a, b) : null
                })
            }, a.scaleImgToData = function (a, b) {
                return mapValues(a, function (a, c) {
                    var d = c.substring(0, 1);
                    return "x" === d ? g.scaleInv(a, b) : "y" === d ? h.scaleInv(a, b) : null
                })
            }, a.clipImg = function (b) {
                var c = {
                    x: b.x,
                    y: b.y
                },
                    d = a.range;
                return b.x > d.right ? c.x = d.right : b.x < d.left && (c.x = d.left), b.y > d.bottom ? c.y = d.bottom : b.y < d.top && (c.y = d.top), c
            }
        }
        for (var e = 0; e < a.length; e++) {
            var f = a[e];
            d(f)
        }
    }, imageutils.initCoordmap = function (a, b) {
        var c = a.find("img"),
            d = c[0];
        if (0 === b.panels.length) {
            var e = {
                top: 0,
                left: 0,
                right: d.clientWidth - 1,
                bottom: d.clientHeight - 1
            };
            b.panels[0] = {
                domain: e,
                range: e,
                mapping: {}
            }
        }
        b.dims.height = b.dims.height || d.naturalHeight, b.dims.width = b.dims.width || d.naturalWidth, imageutils.initPanelScales(b.panels), b.mouseOffsetCss = function (a) {
            var b = findOrigin(c);
            return {
                x: a.pageX - b.x,
                y: a.pageY - b.y
            }
        }, b.scaleCssToImg = function (a) {
            var c = b.imgToCssScalingRatio(),
                d = mapValues(a, function (b, d) {
                    var e = d.substring(0, 1);
                    return "x" === e ? a[d] / c.x : "y" === e ? a[d] / c.y : null
                });
            return d
        }, b.scaleImgToCss = function (a) {
            var c = b.imgToCssScalingRatio(),
                d = mapValues(a, function (b, d) {
                    var e = d.substring(0, 1);
                    return "x" === e ? a[d] * c.x : "y" === e ? a[d] * c.y : null
                });
            return d
        }, b.imgToCssScalingRatio = function () {
            var a = findDims(c);
            return {
                x: a.x / b.dims.width,
                y: a.y / b.dims.height
            }
        }, b.cssToImgScalingRatio = function () {
            var a = b.imgToCssScalingRatio();
            return {
                x: 1 / a.x,
                y: 1 / a.y
            }
        }, b.getPanelCss = function (a) {
            for (var c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, d = b.scaleCssToImg(a), e = d.x, f = d.y, g = b.cssToImgScalingRatio(), h = {
                x: c * g.x,
                y: c * g.y
            }, i = [], j = [], k = void 0, l = 0; l < b.panels.length; l++)
                if (k = b.panels[l].range, e <= k.right + h.x && e >= k.left - h.x && f <= k.bottom + h.y && f >= k.top - h.y) {
                    i.push(b.panels[l]);
                    var m = 0,
                        n = 0;
                    e > k.right && e <= k.right + h.x ? m = e - k.right : e < k.left && e >= k.left - h.x && (m = e - k.left), f > k.bottom && f <= k.bottom + h.y ? n = f - k.bottom : f < k.top && f >= k.top - h.y && (n = f - k.top), j.push(Math.sqrt(Math.pow(m, 2) + Math.pow(n, 2)))
                }
            if (i.length) {
                var o = Math.min.apply(null, j);
                for (l = 0; l < i.length; l++)
                    if (j[l] === o) return i[l]
            }
            return null
        }, b.isInPanelCss = function (a) {
            var c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return !!b.getPanelCss(a, c)
        }, b.mouseCoordinateSender = function (a, c, d) {
            return void 0 === c && (c = !0), void 0 === d && (d = !1),
                function (e) {
                    if (null === e) return void exports.setInputValue(a, null);
                    var f = {},
                        g = b.mouseOffsetCss(e);
                    if (!b.isInPanelCss(g)) {
                        if (d) return void exports.setInputValue(a, null);
                        if (c) return;
                        return f.coords_css = g, f.coords_img = b.scaleCssToImg(g), void exports.setInputValue(a, f, {
                            priority: "event"
                        })
                    }
                    var h = b.getPanelCss(g),
                        i = b.scaleCssToImg(g),
                        j = h.scaleImgToData(i);
                    f.x = j.x, f.y = j.y, f.coords_css = g, f.coords_img = i, f.img_css_ratio = b.cssToImgScalingRatio(), $.extend(f, h.panel_vars), f.mapping = h.mapping, f.domain = h.domain, f.range = h.range, f.log = h.log, exports.setInputValue(a, f, {
                        priority: "event"
                    })
                }
        }
    }, imageutils.findBox = function (a, b) {
        return {
            xmin: Math.min(a.x, b.x),
            xmax: Math.max(a.x, b.x),
            ymin: Math.min(a.y, b.y),
            ymax: Math.max(a.y, b.y)
        }
    }, imageutils.shiftToRange = function (a, b, c) {
        a instanceof Array || (a = [a]);
        var d = Math.max.apply(null, a),
            e = Math.min.apply(null, a),
            f = 0;
        d > c ? f = c - d : e < b && (f = b - e);
        for (var g = [], h = 0; h < a.length; h++) g[h] = a[h] + f;
        return g
    }, imageutils.createClickInfo = function (a, b, c) {
        function d(b, c) {
            var d = $.Event(b, {
                which: c.which,
                pageX: c.pageX,
                pageY: c.pageY
            });
            a.trigger(d)
        }

        function e() {
            j && (d("mousedown2", j), j = null)
        }

        function f(a) {
            j = a, i = setTimeout(function () {
                e()
            }, c)
        }

        function g(a) {
            if (1 === a.which) return b ? void (null === j ? f(a) : (clearTimeout(i), j && Math.abs(j.pageX - a.pageX) > 2 || Math.abs(j.pageY - a.pageY) > 2 ? (e(), f(a)) : (j = null, d("dblclick2", a)))) : void d("mousedown2", a)
        }

        function h(a) {
            a.which = 1, d("dblclick2", a)
        }
        var i = null,
            j = null;
        return {
            mousedown: g,
            dblclickIE8: h
        }
    }, imageutils.createClickHandler = function (a, b, c) {
        var d = c.mouseCoordinateSender(a, b);
        return {
            mousedown: function (a) {
                1 === a.which && d(a)
            },
            onResetImg: function () {
                d(null)
            },
            onResize: null
        }
    }, imageutils.createHoverHandler = function (a, b, c, d, e, f) {
        var g, h = f.mouseCoordinateSender(a, d, e);
        g = "throttle" === c ? new Throttler(null, h, b) : new Debouncer(null, h, b);
        var i;
        return i = e ? function () {
            g.normalCall(null)
        } : function () { }, {
                mousemove: function (a) {
                    g.normalCall(a)
                },
                mouseout: i,
                onResetImg: function () {
                    g.immediateCall(null)
                },
                onResize: null
            }
    }, imageutils.createBrushHandler = function (a, b, c, d, e) {
        function f(a) {
            b.removeClass("crosshair grabbable grabbing ns-resize ew-resize nesw-resize nwse-resize"), a && b.addClass(a)
        }

        function g() {
            var f = s.boundsData();
            if (isNaN(f.xmin)) return exports.setInputValue(a, null), void imageOutputBinding.find(document).trigger("shiny-internal:brushed", {
                brushId: a,
                outputId: null
            });
            var g = s.getPanel();
            $.extend(f, g.panel_vars), f.coords_css = s.boundsCss(), f.coords_img = d.scaleCssToImg(f.coords_css), f.img_css_ratio = d.cssToImgScalingRatio(), f.mapping = g.mapping, f.domain = g.domain, f.range = g.range, f.log = g.log, f.direction = c.brushDirection, f.brushId = a, f.outputId = e, exports.setInputValue(a, f), b.data("mostRecentBrush", !0), imageOutputBinding.find(document).trigger("shiny-internal:brushed", f)
        }

        function h(a) {
            if (!(s.isBrushing() || s.isDragging() || s.isResizing()) && 1 === a.which) {
                var b = d.mouseOffsetCss(a);
                if (!c.brushClip || d.isInPanelCss(b, r))
                    if (s.up({
                        x: NaN,
                        y: NaN
                    }), s.down(b), s.isInResizeArea(b)) s.startResizing(b), $(document).on("mousemove.image_brush", l).on("mouseup.image_brush", o);
                    else if (s.isInsideBrush(b)) s.startDragging(b), f("grabbing"), $(document).on("mousemove.image_brush", k).on("mouseup.image_brush", n);
                    else {
                        var e = d.getPanelCss(b, r);
                        s.startBrushing(e.clipImg(d.scaleCssToImg(b))), $(document).on("mousemove.image_brush", j).on("mouseup.image_brush", m)
                    }
            }
        }

        function i(a) {
            var b = d.mouseOffsetCss(a);
            if (!(s.isBrushing() || s.isDragging() || s.isResizing()))
                if (s.isInResizeArea(b)) {
                    var c = s.whichResizeSides(b);
                    c.left && c.top || c.right && c.bottom ? f("nwse-resize") : c.left && c.bottom || c.right && c.top ? f("nesw-resize") : c.left || c.right ? f("ew-resize") : (c.top || c.bottom) && f("ns-resize")
                } else f(s.isInsideBrush(b) ? "grabbable" : d.isInPanelCss(b, r) ? "crosshair" : null)
        }

        function j(a) {
            s.brushTo(d.mouseOffsetCss(a)), t.normalCall()
        }

        function k(a) {
            s.dragTo(d.mouseOffsetCss(a)), t.normalCall()
        }

        function l(a) {
            s.resizeTo(d.mouseOffsetCss(a)), t.normalCall()
        }

        function m(a) {
            if (1 === a.which) return $(document).off("mousemove.image_brush").off("mouseup.image_brush"), s.up(d.mouseOffsetCss(a)), s.stopBrushing(), f("crosshair"), s.down().x === s.up().x && s.down().y === s.up().y ? (s.reset(), void t.immediateCall()) : void (t.isPending() && t.immediateCall())
        }

        function n(a) {
            1 === a.which && ($(document).off("mousemove.image_brush").off("mouseup.image_brush"), s.up(d.mouseOffsetCss(a)), s.stopDragging(), f("grabbable"), t.isPending() && t.immediateCall())
        }

        function o(a) {
            1 === a.which && ($(document).off("mousemove.image_brush").off("mouseup.image_brush"), s.up(d.mouseOffsetCss(a)), s.stopResizing(), t.isPending() && t.immediateCall())
        }

        function p() {
            c.brushResetOnNew && b.data("mostRecentBrush") && (s.reset(), t.immediateCall())
        }

        function q() {
            s.onResize(), t.immediateCall()
        }
        var r = 20,
            s = imageutils.createBrush(b, c, d, r);
        b.on("shiny-internal:brushed.image_output", function (c, d) {
            d.brushId === a && d.outputId !== e && (b.data("mostRecentBrush", !1), s.reset())
        });
        var t;
        return t = "throttle" === c.brushDelayType ? new Throttler(null, g, c.brushDelay) : new Debouncer(null, g, c.brushDelay), c.brushResetOnNew || b.data("mostRecentBrush") && (s.importOldBrush(), t.immediateCall()), {
            mousedown: h,
            mousemove: i,
            onResetImg: p,
            onResize: q
        }
    }, imageutils.createBrush = function (a, b, c, d) {
        function e() {
            G.brushing = !1, G.dragging = !1, G.resizing = !1, G.down = {
                x: NaN,
                y: NaN
            }, G.up = {
                x: NaN,
                y: NaN
            }, G.resizeSides = {
                left: !1,
                right: !1,
                top: !1,
                bottom: !1
            }, G.boundsCss = {
                xmin: NaN,
                xmax: NaN,
                ymin: NaN,
                ymax: NaN
            }, G.boundsData = {
                xmin: NaN,
                xmax: NaN,
                ymin: NaN,
                ymax: NaN
            }, G.panel = null, G.changeStartBounds = {
                xmin: NaN,
                xmax: NaN,
                ymin: NaN,
                ymax: NaN
            }, F && F.remove()
        }

        function f() {
            var b = a.find("#" + E.id + "_brush");
            if (0 !== b.length) {
                var d = b.data("bounds-data"),
                    e = b.data("panel");
                if (d && e) {
                    for (var f = 0; f < c.panels.length; f++) {
                        var g = c.panels[f];
                        if (equal(e.mapping, g.mapping) && equal(e.panel_vars, g.panel_vars)) {
                            G.panel = c.panels[f];
                            break
                        }
                    }
                    if (null === G.panel) return void b.remove();
                    F = b, l(d), o()
                }
            }
        }

        function g() {
            var a = l();
            for (var b in a)
                if (isnan(a[b])) return;
            l(a), o()
        }

        function h(a) {
            var b = G.boundsCss;
            return a.x <= b.xmax && a.x >= b.xmin && a.y <= b.ymax && a.y >= b.ymin
        }

        function i(a) {
            var b = j(a);
            return b.left || b.right || b.top || b.bottom
        }

        function j(a) {
            var c = G.boundsCss,
                d = {
                    xmin: c.xmin - D,
                    xmax: c.xmax + D,
                    ymin: c.ymin - D,
                    ymax: c.ymax + D
                },
                e = {
                    left: !1,
                    right: !1,
                    top: !1,
                    bottom: !1
                };
            return ("xy" === b.brushDirection || "x" === b.brushDirection) && a.y <= d.ymax && a.y >= d.ymin && (a.x < c.xmin && a.x >= d.xmin ? e.left = !0 : a.x > c.xmax && a.x <= d.xmax && (e.right = !0)), ("xy" === b.brushDirection || "y" === b.brushDirection) && a.x <= d.xmax && a.x >= d.xmin && (a.y < c.ymin && a.y >= d.ymin ? e.top = !0 : a.y > c.ymax && a.y <= d.ymax && (e.bottom = !0)), e
        }

        function k(a) {
            if (void 0 === a) return $.extend({}, G.boundsCss);
            var c = {
                x: a.xmin,
                y: a.ymin
            },
                d = {
                    x: a.xmax,
                    y: a.ymax
                },
                e = G.panel,
                f = e.range;
            b.brushClip && (c = I(e.clipImg(H(c))), d = I(e.clipImg(H(d)))), "xy" === b.brushDirection || ("x" === b.brushDirection ? (c.y = I({
                y: f.top
            }).y, d.y = I({
                y: f.bottom
            }).y) : "y" === b.brushDirection && (c.x = I({
                x: f.left
            }).x, d.x = I({
                x: f.right
            }).x)), G.boundsCss = {
                xmin: c.x,
                xmax: d.x,
                ymin: c.y,
                ymax: d.y
            };
            var g = G.panel.scaleImgToData(H(c)),
                h = G.panel.scaleImgToData(H(d));
            G.boundsData = imageutils.findBox(g, h), G.boundsData = mapValues(G.boundsData, function (a) {
                return roundSignif(a, 14)
            }), F.data("bounds-data", G.boundsData), F.data("panel", G.panel)
        }

        function l(a) {
            if (void 0 === a) return $.extend({}, G.boundsData);
            var b = I(G.panel.scaleDataToImg(a));
            b = mapValues(b, function (a) {
                return roundSignif(a, 13)
            }), k({
                xmin: Math.min(b.xmin, b.xmax),
                xmax: Math.max(b.xmin, b.xmax),
                ymin: Math.min(b.ymin, b.ymax),
                ymax: Math.max(b.ymin, b.ymax)
            })
        }

        function m() {
            return G.panel
        }

        function n() {
            F && F.remove(), F = $(document.createElement("div")).attr("id", E.id + "_brush").css({
                "background-color": b.brushFill,
                opacity: b.brushOpacity,
                "pointer-events": "none",
                position: "absolute"
            }).hide();
            var c = "1px solid " + b.brushStroke;
            "xy" === b.brushDirection ? F.css({
                border: c
            }) : "x" === b.brushDirection ? F.css({
                "border-left": c,
                "border-right": c
            }) : "y" === b.brushDirection && F.css({
                "border-top": c,
                "border-bottom": c
            }), a.append(F), F.offset({
                x: 0,
                y: 0
            }).width(0).outerHeight(0)
        }

        function o() {
            var b = findOrigin(a.find("img")),
                c = G.boundsCss;
            F.offset({
                top: b.y + c.ymin,
                left: b.x + c.xmin
            }).outerWidth(c.xmax - c.xmin + 1).outerHeight(c.ymax - c.ymin + 1)
        }

        function p(a) {
            return void 0 === a ? G.down : void (G.down = a)
        }

        function q(a) {
            return void 0 === a ? G.up : void (G.up = a)
        }

        function r() {
            return G.brushing
        }

        function s() {
            G.brushing = !0, n(), G.panel = c.getPanelCss(G.down, d), k(imageutils.findBox(G.down, G.down)), o()
        }

        function t(a) {
            k(imageutils.findBox(G.down, a)), F.show(), o()
        }

        function u() {
            G.brushing = !1, k(imageutils.findBox(G.down, G.up))
        }

        function v() {
            return G.dragging
        }

        function w() {
            G.dragging = !0, G.changeStartBounds = $.extend({}, G.boundsCss)
        }

        function x(a) {
            var c = a.x - G.down.x,
                d = a.y - G.down.y,
                e = G.changeStartBounds,
                f = {
                    xmin: e.xmin + c,
                    xmax: e.xmax + c,
                    ymin: e.ymin + d,
                    ymax: e.ymax + d
                };
            if (b.brushClip) {
                var g = G.panel.range,
                    h = H(f),
                    i = [h.xmin, h.xmax],
                    j = [h.ymin, h.ymax];
                i = imageutils.shiftToRange(i, g.left, g.right), j = imageutils.shiftToRange(j, g.top, g.bottom), f = I({
                    xmin: i[0],
                    xmax: i[1],
                    ymin: j[0],
                    ymax: j[1]
                })
            }
            k(f), o()
        }

        function y() {
            G.dragging = !1
        }

        function z() {
            return G.resizing
        }

        function A() {
            G.resizing = !0, G.changeStartBounds = $.extend({}, G.boundsCss), G.resizeSides = j(G.down)
        }

        function B(a) {
            var b = {
                x: a.x - G.down.x,
                y: a.y - G.down.y
            },
                c = H(b),
                d = H(G.changeStartBounds),
                e = G.panel.range;
            if (G.resizeSides.left) {
                var f = imageutils.shiftToRange(d.xmin + c.x, e.left, d.xmax)[0];
                d.xmin = f
            } else if (G.resizeSides.right) {
                var g = imageutils.shiftToRange(d.xmax + c.x, d.xmin, e.right)[0];
                d.xmax = g
            }
            if (G.resizeSides.top) {
                var h = imageutils.shiftToRange(d.ymin + c.y, e.top, d.ymax)[0];
                d.ymin = h
            } else if (G.resizeSides.bottom) {
                var i = imageutils.shiftToRange(d.ymax + c.y, d.ymin, e.bottom)[0];
                d.ymax = i
            }
            k(I(d)), o()
        }

        function C() {
            G.resizing = !1
        }
        var D = 10,
            E = a[0],
            F = null,
            G = {},
            H = c.scaleCssToImg,
            I = c.scaleImgToCss;
        return e(), {
            reset: e,
            importOldBrush: f,
            isInsideBrush: h,
            isInResizeArea: i,
            whichResizeSides: j,
            onResize: g,
            boundsCss: k,
            boundsData: l,
            getPanel: m,
            down: p,
            up: q,
            isBrushing: r,
            startBrushing: s,
            brushTo: t,
            stopBrushing: u,
            isDragging: v,
            startDragging: w,
            dragTo: x,
            stopDragging: y,
            isResizing: z,
            startResizing: A,
            resizeTo: B,
            stopResizing: C
        }
    }, exports.resetBrush = function (a) {
        exports.setInputValue(a, null), imageOutputBinding.find(document).trigger("shiny-internal:brushed", {
            brushId: a,
            outputId: null
        })
    };
    var htmlOutputBinding = new OutputBinding;
    $.extend(htmlOutputBinding, {
        find: function (a) {
            return $(a).find(".shiny-html-output")
        },
        onValueError: function (a, b) {
            exports.unbindAll(a), this.renderError(a, b)
        },
        renderValue: function (a, b) {
            exports.renderContent(a, b)
        }
    }), outputBindings.register(htmlOutputBinding, "shiny.htmlOutput");
    var renderDependencies = exports.renderDependencies = function (a) {
        a && $.each(a, function (a, b) {
            renderDependency(b)
        })
    };
    exports.renderContent = function (a, b) {
        var c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "replace";
        "replace" === c && exports.unbindAll(a);
        var d, e = [];
        null === b ? d = "" : "string" == typeof b ? d = b : "object" === ("undefined" == typeof b ? "undefined" : _typeof(b)) && (d = b.html, e = b.deps || []), exports.renderHtml(d, a, e, c);
        var f = a;
        if ("replace" === c) exports.initializeInputs(a), exports.bindAll(a);
        else {
            var g = $(a).parent();
            if (g.length > 0 && (f = g, "beforeBegin" === c || "afterEnd" === c)) {
                var h = g.parent();
                h.length > 0 && (f = h)
            }
            exports.initializeInputs(f), exports.bindAll(f)
        }
    }, exports.renderHtml = function (a, b, c) {
        var d = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "replace";
        return renderDependencies(c), singletons.renderHtml(a, b, d)
    };
    var htmlDependencies = {},
        singletons = {
            knownSingletons: {},
            renderHtml: function (a, b, c) {
                var d = this._processHtml(a);
                return this._addToHead(d.head), this.register(d.singletons), "replace" === c ? $(b).html(d.html) : b.insertAdjacentHTML(c, d.html), d
            },
            register: function (a) {
                $.extend(this.knownSingletons, a)
            },
            registerNames: function (a) {
                if ("string" == typeof a) this.knownSingletons[a] = !0;
                else if (a instanceof Array)
                    for (var b = 0; b < a.length; b++) this.knownSingletons[a[b]] = !0
            },
            _addToHead: function (a) {
                if (a.length > 0)
                    for (var b = $("<div>" + a + "</div>")[0], c = $("head"); b.hasChildNodes();) c.append(b.firstChild)
            },
            _processHtml: function (a) {
                for (var b, c = this, d = {}, e = function (a, b, e, f) {
                    return c.knownSingletons[e] || d[e] ? "" : (d[e] = !0, f)
                }; ;) {
                    if (b = a.replace(c._reSingleton, e), a.length === b.length) break;
                    a = b
                }
                for (var f = [], g = function (a, b) {
                    return f.push(b), ""
                }; ;) {
                    if (b = a.replace(c._reHead, g), a.length === b.length) break;
                    a = b
                }
                return {
                    html: a,
                    head: f.join("\n"),
                    singletons: d
                }
            },
            _reSingleton: /<!--(SHINY.SINGLETON\[([\w]+)\])-->([\s\S]*?)<!--\/\1-->/,
            _reHead: /<head(?:\s[^>]*)?>([\s\S]*?)<\/head>/
        },
        downloadLinkOutputBinding = new OutputBinding;
    $.extend(downloadLinkOutputBinding, {
        find: function (a) {
            return $(a).find("a.shiny-download-link")
        },
        renderValue: function (a, b) {
            $(a).attr("href", b)
        }
    }), outputBindings.register(downloadLinkOutputBinding, "shiny.downloadLink"), $(document).on("click.shinyDownloadLink", "a.shiny-download-link", function (a) {
        var b = jQuery.Event("shiny:filedownload");
        b.name = this.id, b.href = this.href, $(document).trigger(b)
    });
    var datatableOutputBinding = new OutputBinding;
    $.extend(datatableOutputBinding, {
        find: function (a) {
            return $(a).find(".shiny-datatable-output")
        },
        onValueError: function (a, b) {
            exports.unbindAll(a), this.renderError(a, b)
        },
        renderValue: function renderValue(el, _data) {
            var $el = $(el).empty();
            if (_data && _data.colnames) {
                var colnames = $.makeArray(_data.colnames),
                    header = $.map(colnames, function (a) {
                        return "<th>" + a + "</th>"
                    }).join("");
                header = "<thead><tr>" + header + "</tr></thead>";
                var footer = "";
                null !== _data.options && _data.options.searching === !1 || (footer = $.map(colnames, function (a) {
                    return '<th><input type="text" placeholder="' + escapeHTML(a.replace(/(<([^>]+)>)/gi, "")) + '" /></th>'
                }).join(""), footer = "<tfoot>" + footer + "</tfoot>");
                var content = '<table class="table table-striped table-hover">' + header + footer + "</table>";
                $el.append(content), _data.evalOptions && $.each(_data.evalOptions, function (i, x) {
                    _data.options[x] = eval("(" + _data.options[x] + ")")
                });
                var searchCI = null === _data.options || "undefined" == typeof _data.options.search || _data.options.search.caseInsensitive !== !1,
                    oTable = $(el).children("table").DataTable($.extend({
                        processing: !0,
                        serverSide: !0,
                        order: [],
                        orderClasses: !1,
                        pageLength: 25,
                        ajax: {
                            url: _data.action,
                            type: "POST",
                            data: function (a) {
                                a.search.caseInsensitive = searchCI, a.escape = _data.escape
                            }
                        }
                    }, _data.options));
                if ("string" == typeof _data.callback) {
                    var callback = eval("(" + _data.callback + ")");
                    "function" == typeof callback && callback(oTable)
                }
                $el.find("label input").first().unbind("keyup").keyup(debounce(_data.searchDelay, function () {
                    oTable.search(this.value).draw()
                }));
                var searchInputs = $el.find("tfoot input");
                searchInputs.length > 0 && ($.each(oTable.settings()[0].aoColumns, function (a, b) {
                    b.bSearchable || searchInputs.eq(a).hide()
                }), searchInputs.keyup(debounce(_data.searchDelay, function () {
                    oTable.column(searchInputs.index(this)).search(this.value).draw()
                }))), $el.parents(".tab-content").css("overflow", "visible")
            }
        }
    }), outputBindings.register(datatableOutputBinding, "shiny.datatableOutput");
    var OutputBindingAdapter = function (a, b) {
        this.el = a, this.binding = b, b.resize && (this.onResize = makeResizeFilter(a, function (c, d) {
            b.resize(a, c, d)
        }))
    };
    (function () {
        this.getId = function () {
            return this.binding.getId(this.el)
        }, this.onValueChange = function (a) {
            this.binding.onValueChange(this.el, a)
        }, this.onValueError = function (a) {
            this.binding.onValueError(this.el, a)
        }, this.showProgress = function (a) {
            this.binding.showProgress(this.el, a)
        }, this.onResize = function () { }
    }).call(OutputBindingAdapter.prototype);
    var InputBinding = exports.InputBinding = function () { };
    (function () {
        this.find = function (a) {
            throw "Not implemented"
        }, this.getId = function (a) {
            return a["data-input-id"] || a.id
        }, this.getType = function () {
            return !1
        }, this.getValue = function (a) {
            throw "Not implemented"
        }, this.subscribe = function (a, b) { }, this.unsubscribe = function (a) { }, this.receiveMessage = function (a, b) {
            throw "Not implemented"
        }, this.getState = function (a, b) {
            throw "Not implemented"
        }, this.getRatePolicy = function () {
            return null
        }, this.initialize = function (a) { }, this.dispose = function (a) { }
    }).call(InputBinding.prototype);
    var textInputBinding = new InputBinding;
    $.extend(textInputBinding, {
        find: function (a) {
            var b = $(a).find('input[type="text"], input[type="search"], input[type="url"], input[type="email"]');
            return b.not('input[type="text"][id$="-selectized"]')
        },
        getId: function (a) {
            return InputBinding.prototype.getId.call(this, a) || a.name
        },
        getValue: function (a) {
            return a.value
        },
        setValue: function (a, b) {
            a.value = b
        },
        subscribe: function (a, b) {
            $(a).on("keyup.textInputBinding input.textInputBinding", function (a) {
                b(!0)
            }), $(a).on("change.textInputBinding", function (a) {
                b(!1)
            })
        },
        unsubscribe: function (a) {
            $(a).off(".textInputBinding")
        },
        receiveMessage: function (a, b) {
            b.hasOwnProperty("value") && this.setValue(a, b.value), updateLabel(b.label, this._getLabelNode(a)), b.hasOwnProperty("placeholder") && (a.placeholder = b.placeholder), $(a).trigger("change")
        },
        getState: function (a) {
            return {
                label: this._getLabelNode(a).text(),
                value: a.value,
                placeholder: a.placeholder
            }
        },
        getRatePolicy: function () {
            return {
                policy: "debounce",
                delay: 250
            }
        },
        _getLabelNode: function (a) {
            return $(a).parent().find('label[for="' + $escape(a.id) + '"]')
        }
    }), inputBindings.register(textInputBinding, "shiny.textInput");
    var textareaInputBinding = {};
    $.extend(textareaInputBinding, textInputBinding, {
        find: function (a) {
            return $(a).find("textarea")
        }
    }), inputBindings.register(textareaInputBinding, "shiny.textareaInput");
    var passwordInputBinding = {};
    $.extend(passwordInputBinding, textInputBinding, {
        find: function (a) {
            return $(a).find('input[type="password"]')
        },
        getType: function (a) {
            return "shiny.password"
        }
    }), inputBindings.register(passwordInputBinding, "shiny.passwordInput");
    var numberInputBinding = {};
    $.extend(numberInputBinding, textInputBinding, {
        find: function (a) {
            return $(a).find('input[type="number"]')
        },
        getValue: function (a) {
            var b = $(a).val();
            return /^\s*$/.test(b) ? null : isNaN(b) ? b : +b
        },
        setValue: function (a, b) {
            a.value = b
        },
        getType: function (a) {
            return "shiny.number"
        },
        receiveMessage: function (a, b) {
            b.hasOwnProperty("value") && (a.value = b.value), b.hasOwnProperty("min") && (a.min = b.min), b.hasOwnProperty("max") && (a.max = b.max), b.hasOwnProperty("step") && (a.step = b.step), updateLabel(b.label, this._getLabelNode(a)), $(a).trigger("change")
        },
        getState: function (a) {
            return {
                label: this._getLabelNode(a).text(),
                value: this.getValue(a),
                min: Number(a.min),
                max: Number(a.max),
                step: Number(a.step)
            }
        },
        _getLabelNode: function (a) {
            return $(a).parent().find('label[for="' + $escape(a.id) + '"]')
        }
    }), inputBindings.register(numberInputBinding, "shiny.numberInput");
    var checkboxInputBinding = new InputBinding;
    $.extend(checkboxInputBinding, {
        find: function (a) {
            return $(a).find('input[type="checkbox"]')
        },
        getValue: function (a) {
            return a.checked
        },
        setValue: function (a, b) {
            a.checked = b
        },
        subscribe: function (a, b) {
            $(a).on("change.checkboxInputBinding", function (a) {
                b(!0)
            })
        },
        unsubscribe: function (a) {
            $(a).off(".checkboxInputBinding")
        },
        getState: function (a) {
            return {
                label: $(a).parent().find("span").text(),
                value: a.checked
            }
        },
        receiveMessage: function (a, b) {
            b.hasOwnProperty("value") && (a.checked = b.value), b.hasOwnProperty("label") && $(a).parent().find("span").text(b.label), $(a).trigger("change")
        }
    }), inputBindings.register(checkboxInputBinding, "shiny.checkboxInput");
    var sliderInputBinding = {};
    $.extend(sliderInputBinding, textInputBinding, {
        find: function (a) {
            return $.fn.ionRangeSlider ? $(a).find("input.js-range-slider") : []
        },
        getType: function (a) {
            var b = $(a).data("data-type");
            return "date" === b ? "shiny.date" : "datetime" === b && "shiny.datetime"
        },
        getValue: function (a) {
            var b, c = $(a),
                d = $(a).data("ionRangeSlider").result,
                e = c.data("data-type");
            return b = "date" === e ? function (a) {
                return formatDateUTC(new Date((+a)))
            } : "datetime" === e ? function (a) {
                return +a / 1e3
            } : function (a) {
                return +a
            }, 2 === this._numValues(a) ? [b(d.from), b(d.to)] : b(d.from)
        },
        setValue: function (a, b) {
            var c = $(a),
                d = c.data("ionRangeSlider");
            c.data("immediate", !0);
            try {
                2 === this._numValues(a) && b instanceof Array ? d.update({
                    from: b[0],
                    to: b[1]
                }) : d.update({
                    from: b
                }), forceIonSliderUpdate(d)
            } finally {
                c.data("immediate", !1)
            }
        },
        subscribe: function (a, b) {
            $(a).on("change.sliderInputBinding", function (c) {
                b(!$(a).data("immediate") && !$(a).data("animating"))
            })
        },
        unsubscribe: function (a) {
            $(a).off(".sliderInputBinding")
        },
        receiveMessage: function (a, b) {
            var c = $(a),
                d = c.data("ionRangeSlider"),
                e = {};
            b.hasOwnProperty("value") && (2 === this._numValues(a) && b.value instanceof Array ? (e.from = b.value[0], e.to = b.value[1]) : e.from = b.value);
            for (var f = ["min", "max", "step"], g = 0; g < f.length; g++) {
                var h = f[g];
                b.hasOwnProperty(h) && (e[h] = b[h])
            }
            updateLabel(b.label, this._getLabelNode(a));
            for (var i = ["data-type", "time-format", "timezone"], g = 0; g < i.length; g++) {
                var j = i[g];
                b.hasOwnProperty(j) && c.data(j, b[j])
            }
            var k = c.data("data-type"),
                l = c.data("time-format"),
                m = c.data("timezone");
            e.prettify = getTypePrettifyer(k, l, m), c.data("immediate", !0);
            try {
                d.update(e), forceIonSliderUpdate(d)
            } finally {
                c.data("immediate", !1)
            }
        },
        getRatePolicy: function () {
            return {
                policy: "debounce",
                delay: 250
            }
        },
        getState: function (a) { },
        initialize: function (a) {
            var b = {},
                c = $(a),
                d = c.data("data-type"),
                e = c.data("time-format"),
                f = c.data("timezone");
            b.prettify = getTypePrettifyer(d, e, f), c.ionRangeSlider(b)
        },
        _getLabelNode: function (a) {
            return $(a).parent().find('label[for="' + $escape(a.id) + '"]')
        },
        _numValues: function (a) {
            return "double" === $(a).data("ionRangeSlider").options.type ? 2 : 1
        }
    }), inputBindings.register(sliderInputBinding, "shiny.sliderInput"), $(document).on("click", ".slider-animate-button", function (a) {
        a.preventDefault();
        var b = $(this),
            c = $("#" + $escape(b.attr("data-target-id"))),
            d = "Play",
            e = "Pause",
            f = void 0 !== b.attr("data-loop") && !/^\s*false\s*$/i.test(b.attr("data-loop")),
            g = b.attr("data-interval");
        if (g = isNaN(g) ? 1500 : +g, c.data("animTimer")) clearTimeout(c.data("animTimer")), c.removeData("animTimer"), b.attr("title", d), b.removeClass("playing"), c.removeData("animating");
        else {
            var h, i;
            if (c.hasClass("jslider")) h = c.slider(), h.canStepNext() || h.resetToStart(), i = setInterval(function () {
                f && !h.canStepNext() ? h.resetToStart() : (h.stepNext(), f || h.canStepNext() || b.click())
            }, g);
            else {
                h = c.data("ionRangeSlider");
                var j = function () {
                    return "double" === h.options.type ? h.result.to < h.result.max : h.result.from < h.result.max
                },
                    k = function () {
                        var a = {
                            from: h.result.min
                        };
                        "double" === h.options.type && (a.to = a.from + (h.result.to - h.result.from)), h.update(a), forceIonSliderUpdate(h)
                    },
                    l = function () {
                        var a = {
                            from: Math.min(h.result.max, h.result.from + h.options.step)
                        };
                        "double" === h.options.type && (a.to = Math.min(h.result.max, h.result.to + h.options.step)), h.update(a), forceIonSliderUpdate(h)
                    };
                j() || k(), i = setInterval(function () {
                    f && !j() ? k() : (l(), f || j() || b.click())
                }, g)
            }
            c.data("animTimer", i), b.attr("title", e), b.addClass("playing"), c.data("animating", !0)
        }
    });
    var dateInputBinding = new InputBinding;
    $.extend(dateInputBinding, {
        find: function (a) {
            return $(a).find(".shiny-date-input")
        },
        getType: function (a) {
            return "shiny.date"
        },
        getValue: function (a) {
            var b = $(a).find("input").bsDatepicker("getUTCDate");
            return formatDateUTC(b)
        },
        setValue: function (a, b) {
            if (null === b) return void $(a).find("input").val("").bsDatepicker("update");
            var c = this._newDate(b);
            isNaN(c) || $(a).find("input").bsDatepicker("setUTCDate", c)
        },
        getState: function (a) {
            var b = $(a),
                c = b.find("input"),
                d = c.data("datepicker").startDate,
                e = c.data("datepicker").endDate;
            d = d === -(1 / 0) ? null : formatDateUTC(d), e = e === 1 / 0 ? null : formatDateUTC(e);
            var f = c.data("datepicker").startViewMode;
            return 2 === f ? f = "decade" : 1 === f ? f = "year" : 0 === f && (f = "month"), {
                label: this._getLabelNode(a).text(),
                value: this.getValue(a),
                valueString: c.val(),
                min: d,
                max: e,
                language: c.data("datepicker").language,
                weekstart: c.data("datepicker").weekStart,
                format: this._formatToString(c.data("datepicker").format),
                startview: f
            }
        },
        receiveMessage: function (a, b) {
            var c = $(a).find("input");
            updateLabel(b.label, this._getLabelNode(a)), b.hasOwnProperty("min") && this._setMin(c[0], b.min), b.hasOwnProperty("max") && this._setMax(c[0], b.max), b.hasOwnProperty("value") && this.setValue(a, b.value), $(a).trigger("change")
        },
        subscribe: function (a, b) {
            $(a).on("keyup.dateInputBinding input.dateInputBinding", function (a) {
                b(!0)
            }), $(a).on("changeDate.dateInputBinding change.dateInputBinding", function (a) {
                b(!1)
            })
        },
        unsubscribe: function (a) {
            $(a).off(".dateInputBinding")
        },
        getRatePolicy: function () {
            return {
                policy: "debounce",
                delay: 250
            }
        },
        initialize: function (a) {
            var b = $(a).find("input"),
                c = b.data("initial-date");
            void 0 !== c && null !== c || (c = this._dateAsUTC(new Date)), this.setValue(a, c), void 0 !== b.data("min-date") && this._setMin(b[0], b.data("min-date")), void 0 !== b.data("max-date") && this._setMax(b[0], b.data("max-date"))
        },
        _getLabelNode: function (a) {
            return $(a).find('label[for="' + $escape(a.id) + '"]')
        },
        _formatToString: function (a) {
            for (var b = "", c = 0; c < a.parts.length; c++) b += a.separators[c] + a.parts[c];
            return b += a.separators[c]
        },
        _setMin: function (a, b) {
            if (void 0 !== b) {
                if (null === b) return void $(a).bsDatepicker("setStartDate", null);
                if (b = this._newDate(b), null !== b && (b = this._UTCDateAsLocal(b), !isNaN(b))) {
                    var c = $(a).bsDatepicker("getUTCDate");
                    $(a).bsDatepicker("setStartDate", b), $(a).bsDatepicker("setUTCDate", c), "function" == typeof b.toDateString && "function" == typeof c.toDateString && b.toDateString() === c.toDateString() && ($(a).bsDatepicker("setStartDate", null), $(a).bsDatepicker("setUTCDate", c), $(a).bsDatepicker("setStartDate", b))
                }
            }
        },
        _setMax: function (a, b) {
            if (void 0 !== b) {
                if (null === b) return void $(a).bsDatepicker("setEndDate", null);
                if (b = this._newDate(b), null !== b && (b = this._UTCDateAsLocal(b), !isNaN(b))) {
                    var c = $(a).bsDatepicker("getUTCDate");
                    $(a).bsDatepicker("setEndDate", b), $(a).bsDatepicker("setUTCDate", c), "function" == typeof b.toDateString && "function" == typeof c.toDateString && b.toDateString() === c.toDateString() && ($(a).bsDatepicker("setEndDate", null), $(a).bsDatepicker("setUTCDate", c), $(a).bsDatepicker("setEndDate", b))
                }
            }
        },
        _newDate: function (a) {
            if (a instanceof Date) return a;
            if (!a) return null;
            var b = parseDate(a);
            return isNaN(b) ? null : new Date(b.getTime())
        },
        _dateAsUTC: function (a) {
            return new Date(a.getTime() - 6e4 * a.getTimezoneOffset())
        },
        _UTCDateAsLocal: function (a) {
            return new Date(a.getTime() + 6e4 * a.getTimezoneOffset())
        }
    }), inputBindings.register(dateInputBinding, "shiny.dateInput");
    var dateRangeInputBinding = {};
    $.extend(dateRangeInputBinding, dateInputBinding, {
        find: function (a) {
            return $(a).find(".shiny-date-range-input")
        },
        getValue: function (a) {
            var b = $(a).find("input"),
                c = b.eq(0).bsDatepicker("getUTCDate"),
                d = b.eq(1).bsDatepicker("getUTCDate");
            return [formatDateUTC(c), formatDateUTC(d)]
        },
        setValue: function (a, b) {
            if (b instanceof Object) {
                var c = $(a).find("input");
                if (void 0 !== b.start)
                    if (null === b.start) c.eq(0).val("").bsDatepicker("update");
                    else {
                        var d = this._newDate(b.start);
                        c.eq(0).bsDatepicker("setUTCDate", d)
                    }
                if (void 0 !== b.end)
                    if (null === b.end) c.eq(1).val("").bsDatepicker("update");
                    else {
                        var e = this._newDate(b.end);
                        c.eq(1).bsDatepicker("setUTCDate", e)
                    }
            }
        },
        getState: function (a) {
            var b = $(a),
                c = b.find("input"),
                d = c.eq(0),
                e = c.eq(1),
                f = d.bsDatepicker("getStartDate"),
                g = d.bsDatepicker("getEndDate");
            f = f === -(1 / 0) ? null : formatDateUTC(f), g = g === 1 / 0 ? null : formatDateUTC(g);
            var h = d.data("datepicker").startView;
            return 2 === h ? h = "decade" : 1 === h ? h = "year" : 0 === h && (h = "month"), {
                label: this._getLabelNode(a).text(),
                value: this.getValue(a),
                valueString: [d.val(), e.val()],
                min: f,
                max: g,
                weekstart: d.data("datepicker").weekStart,
                format: this._formatToString(d.data("datepicker").format),
                language: d.data("datepicker").language,
                startview: h
            }
        },
        receiveMessage: function (a, b) {
            var c = $(a),
                d = c.find("input"),
                e = d.eq(0),
                f = d.eq(1);
            updateLabel(b.label, this._getLabelNode(a)), b.hasOwnProperty("min") && (this._setMin(e[0], b.min), this._setMin(f[0], b.min)), b.hasOwnProperty("max") && (this._setMax(e[0], b.max), this._setMax(f[0], b.max)), b.hasOwnProperty("value") && this.setValue(a, b.value), c.trigger("change")
        },
        initialize: function (a) {
            var b = $(a),
                c = b.find("input"),
                d = c.eq(0),
                e = c.eq(1),
                f = d.data("initial-date"),
                g = e.data("initial-date");
            void 0 !== f && null !== f || (f = this._dateAsUTC(new Date)), void 0 !== g && null !== g || (g = this._dateAsUTC(new Date)), this.setValue(a, {
                start: f,
                end: g
            }), this._setMin(d[0], d.data("min-date")), this._setMin(e[0], d.data("min-date")), this._setMax(d[0], e.data("max-date")), this._setMax(e[0], e.data("max-date"))
        },
        subscribe: function (a, b) {
            $(a).on("keyup.dateRangeInputBinding input.dateRangeInputBinding", function (a) {
                b(!0)
            }), $(a).on("changeDate.dateRangeInputBinding change.dateRangeInputBinding", function (a) {
                b(!1)
            })
        },
        unsubscribe: function (a) {
            $(a).off(".dateRangeInputBinding")
        },
        _getLabelNode: function (a) {
            return $(a).find('label[for="' + $escape(a.id) + '"]')
        }
    }), inputBindings.register(dateRangeInputBinding, "shiny.dateRangeInput");
    var selectInputBinding = new InputBinding;
    $.extend(selectInputBinding, {
        find: function (a) {
            return $(a).find("select")
        },
        getType: function (a) {
            var b = $(a);
            return b.hasClass("symbol") ? "multiple" === b.attr("multiple") ? "shiny.symbolList" : "shiny.symbol" : null
        },
        getId: function (a) {
            return InputBinding.prototype.getId.call(this, a) || a.name
        },
        getValue: function (a) {
            return $(a).val()
        },
        setValue: function (a, b) {
            if (this._is_selectize(a)) {
                var c = this._selectize(a);
                c && c.setValue(b)
            } else $(a).val(b)
        },
        getState: function (a) {
            for (var b = new Array(a.length), c = 0; c < a.length; c++) b[c] = {
                value: a[c].value,
                label: a[c].label
            };
            return {
                label: this._getLabelNode(a),
                value: this.getValue(a),
                options: b
            }
        },
        receiveMessage: function (a, b) {
            var c, d = $(a);
            if (b.hasOwnProperty("options") && (c = this._selectize(a), c && c.destroy(), d.empty().append(b.options), this._selectize(a)), b.hasOwnProperty("config") && (d.parent().find('script[data-for="' + $escape(a.id) + '"]').replaceWith(b.config), this._selectize(a, !0)), b.hasOwnProperty("url")) {
                c = this._selectize(a), c.clearOptions();
                var e = !1;
                c.settings.load = function (a, d) {
                    var f = c.settings;
                    $.ajax({
                        url: b.url,
                        data: {
                            query: a,
                            field: JSON.stringify([f.searchField]),
                            value: f.valueField,
                            conju: f.searchConjunction,
                            maxop: f.maxOptions
                        },
                        type: "GET",
                        error: function () {
                            d()
                        },
                        success: function (a) {
                            $.each(a, function (a, b) {
                                var d = b[f.optgroupField || "optgroup"],
                                    e = {};
                                e[f.optgroupLabelField || "label"] = d, e[f.optgroupValueField || "value"] = d, c.addOptionGroup(d, e)
                            }), d(a), e || (b.hasOwnProperty("value") ? c.setValue(b.value) : 1 === f.maxItems && c.setValue(a[0].value)), e = !0
                        }
                    })
                }, c.load(function (a) {
                    c.settings.load.apply(c, ["", a])
                })
            } else b.hasOwnProperty("value") && this.setValue(a, b.value);
            updateLabel(b.label, this._getLabelNode(a)), $(a).trigger("change")
        },
        subscribe: function (a, b) {
            var c = this;
            $(a).on("change.selectInputBinding", function (d) {
                a.nonempty && "" === c.getValue(a) || b()
            })
        },
        unsubscribe: function (a) {
            $(a).off(".selectInputBinding")
        },
        initialize: function (a) {
            this._selectize(a)
        },
        _getLabelNode: function (a) {
            var b = $escape(a.id);
            return this._is_selectize(a) && (b += "-selectized"), $(a).parent().parent().find('label[for="' + b + '"]')
        },
        _is_selectize: function (a) {
            var b = $(a).parent().find('script[data-for="' + $escape(a.id) + '"]');
            return b.length > 0
        },
        _selectize: function _selectize(el, update) {
            if ($.fn.selectize) {
                var $el = $(el),
                    config = $el.parent().find('script[data-for="' + $escape(el.id) + '"]');
                if (0 !== config.length) {
                    var options = $.extend({
                        labelField: "label",
                        valueField: "value",
                        searchField: ["label"]
                    }, JSON.parse(config.html()));
                    "undefined" != typeof config.data("nonempty") ? (el.nonempty = !0, options = $.extend(options, {
                        onItemRemove: function (a) {
                            "" === this.getValue() && $("select#" + $escape(el.id)).empty().append($("<option/>", {
                                value: a,
                                selected: !0
                            })).trigger("change")
                        },
                        onDropdownClose: function (a) {
                            "" === this.getValue() && this.setValue($("select#" + $escape(el.id)).val())
                        }
                    })) : el.nonempty = !1, config.data("eval") instanceof Array && $.each(config.data("eval"), function (i, x) {
                        options[x] = eval("(" + options[x] + ")")
                    });
                    var control = $el.selectize(options)[0].selectize;
                    if (update) {
                        var settings = $.extend(control.settings, options);
                        control.destroy(), control = $el.selectize(settings)[0].selectize
                    }
                    return control
                }
            }
        }
    }), inputBindings.register(selectInputBinding, "shiny.selectInput");
    var radioInputBinding = new InputBinding;
    $.extend(radioInputBinding, {
        find: function (a) {
            return $(a).find(".shiny-input-radiogroup")
        },
        getValue: function (a) {
            return $('input:radio[name="' + $escape(a.id) + '"]:checked').val()
        },
        setValue: function (a, b) {
            $('input:radio[name="' + $escape(a.id) + '"][value="' + $escape(b) + '"]').prop("checked", !0)
        },
        getState: function (a) {
            for (var b = $('input:radio[name="' + $escape(a.id) + '"]'), c = new Array(b.length), d = 0; d < c.length; d++) c[d] = {
                value: b[d].value,
                label: this._getLabel(b[d])
            };
            return {
                label: this._getLabelNode(a).text(),
                value: this.getValue(a),
                options: c
            }
        },
        receiveMessage: function (a, b) {
            var c = $(a);
            b.hasOwnProperty("options") && (c.find("div.shiny-options-group").remove(), c.find("label.radio").remove(), c.append(b.options)), b.hasOwnProperty("value") && this.setValue(a, b.value), updateLabel(b.label, this._getLabelNode(a)), $(a).trigger("change")
        },
        subscribe: function (a, b) {
            $(a).on("change.radioInputBinding", function (a) {
                b()
            })
        },
        unsubscribe: function (a) {
            $(a).off(".radioInputBinding")
        },
        _getLabelNode: function (a) {
            return $(a).parent().find('label[for="' + $escape(a.id) + '"]')
        },
        _getLabel: function (a) {
            return "LABEL" === a.parentNode.tagName ? $.trim($(a.parentNode).find("span").text()) : null
        },
        _setLabel: function (a, b) {
            return "LABEL" === a.parentNode.tagName && $(a.parentNode).find("span").text(b), null
        }
    }), inputBindings.register(radioInputBinding, "shiny.radioInput");
    var checkboxGroupInputBinding = new InputBinding;
    $.extend(checkboxGroupInputBinding, {
        find: function (a) {
            return $(a).find(".shiny-input-checkboxgroup")
        },
        getValue: function (a) {
            for (var b = $('input:checkbox[name="' + $escape(a.id) + '"]:checked'), c = new Array(b.length), d = 0; d < b.length; d++) c[d] = b[d].value;
            return c
        },
        setValue: function (a, b) {
            if ($('input:checkbox[name="' + $escape(a.id) + '"]').prop("checked", !1), b instanceof Array)
                for (var c = 0; c < b.length; c++) $('input:checkbox[name="' + $escape(a.id) + '"][value="' + $escape(b[c]) + '"]').prop("checked", !0);
            else $('input:checkbox[name="' + $escape(a.id) + '"][value="' + $escape(b) + '"]').prop("checked", !0)
        },
        getState: function (a) {
            for (var b = $('input:checkbox[name="' + $escape(a.id) + '"]'), c = new Array(b.length), d = 0; d < c.length; d++) c[d] = {
                value: b[d].value,
                label: this._getLabel(b[d])
            };
            return {
                label: this._getLabelNode(a).text(),
                value: this.getValue(a),
                options: c
            }
        },
        receiveMessage: function (a, b) {
            var c = $(a);
            b.hasOwnProperty("options") && (c.find("div.shiny-options-group").remove(), c.find("label.checkbox").remove(), c.append(b.options)), b.hasOwnProperty("value") && this.setValue(a, b.value), updateLabel(b.label, this._getLabelNode(a)), $(a).trigger("change")
        },
        subscribe: function (a, b) {
            $(a).on("change.checkboxGroupInputBinding", function (a) {
                b()
            })
        },
        unsubscribe: function (a) {
            $(a).off(".checkboxGroupInputBinding")
        },
        _getLabelNode: function (a) {
            return $(a).find('label[for="' + $escape(a.id) + '"]')
        },
        _getLabel: function (a) {
            return "LABEL" === a.parentNode.tagName ? $.trim($(a.parentNode).find("span").text()) : null
        },
        _setLabel: function (a, b) {
            return "LABEL" === a.parentNode.tagName && $(a.parentNode).find("span").text(b), null
        }
    }), inputBindings.register(checkboxGroupInputBinding, "shiny.checkboxGroupInput");
    var actionButtonInputBinding = new InputBinding;
    $.extend(actionButtonInputBinding, {
        find: function (a) {
            return $(a).find(".action-button")
        },
        getValue: function (a) {
            return $(a).data("val") || 0
        },
        setValue: function (a, b) {
            $(a).data("val", b)
        },
        getType: function (a) {
            return "shiny.action"
        },
        subscribe: function (a, b) {
            $(a).on("click.actionButtonInputBinding", function (a) {
                var c = $(this),
                    d = c.data("val") || 0;
                c.data("val", d + 1), b()
            })
        },
        getState: function (a) {
            return {
                value: this.getValue(a)
            }
        },
        receiveMessage: function (a, b) {
            var c = $(a),
                d = c.text(),
                e = "";
            if (c.find("i[class]").length > 0) {
                var f = c.find("i[class]")[0];
                f === c.children()[0] && (e = $(f).prop("outerHTML"))
            }
            b.hasOwnProperty("label") && (d = b.label), b.hasOwnProperty("icon") && (e = b.icon, 0 === e.length && (e = "")), c.html(e + " " + d)
        },
        unsubscribe: function (a) {
            $(a).off(".actionButtonInputBinding")
        }
    }), inputBindings.register(actionButtonInputBinding, "shiny.actionButtonInput"), $(document).on("click", "a.action-button", function (a) {
        a.preventDefault()
    });
    var bootstrapTabInputBinding = new InputBinding;
    $.extend(bootstrapTabInputBinding, {
        find: function (a) {
            return $(a).find("ul.nav.shiny-tab-input")
        },
        getValue: function (a) {
            var b = $(a).find("li:not(.dropdown).active").children("a");
            return 1 === b.length ? this._getTabName(b) : null
        },
        setValue: function (a, b) {
            var c = this,
                d = !1;
            if (b) {
                var e = $(a).find("li:not(.dropdown)").children("a");
                e.each(function () {
                    return c._getTabName($(this)) !== b || ($(this).tab("show"), d = !0, !1)
                })
            }
            d || $(a).trigger("change")
        },
        getState: function (a) {
            return {
                value: this.getValue(a)
            }
        },
        receiveMessage: function (a, b) {
            b.hasOwnProperty("value") && this.setValue(a, b.value)
        },
        subscribe: function (a, b) {
            $(a).on("change shown.bootstrapTabInputBinding shown.bs.tab.bootstrapTabInputBinding", function (a) {
                b()
            })
        },
        unsubscribe: function (a) {
            $(a).off(".bootstrapTabInputBinding")
        },
        _getTabName: function (a) {
            return a.attr("data-value") || a.text()
        }
    }), inputBindings.register(bootstrapTabInputBinding, "shiny.bootstrapTabInput");
    var IE8FileUploader = function (a, b, c) {
        this.shinyapp = a, this.id = b, this.fileEl = c, this.beginUpload()
    };
    (function () {
        this.beginUpload = function () {
            var a = this,
                b = "shinyupload_iframe_" + this.id;
            this.iframe = document.createElement("iframe"), this.iframe.id = b, this.iframe.name = b, this.iframe.setAttribute("style", "position: fixed; top: 0; left: 0; width: 0; height: 0; border: none"), $(document.body).append(this.iframe);
            var c = function () {
                a.shinyapp.makeRequest("uploadieFinish", [], function () { }, function () { }), $(a.iframe).remove(), $(a.fileEl).val("")
            };
            this.iframe.attachEvent ? this.iframe.attachEvent("onload", c) : this.iframe.onload = c, this.form = document.createElement("form"), this.form.method = "POST", this.form.setAttribute("enctype", "multipart/form-data"), this.form.action = "session/" + encodeURI(this.shinyapp.config.sessionId) + "/uploadie/" + encodeURI(this.id), this.form.id = "shinyupload_form_" + this.id, this.form.target = b, $(this.form).insertAfter(this.fileEl).append(this.fileEl), this.form.submit()
        }
    }).call(IE8FileUploader.prototype);
    var FileUploader = function (a, b, c, d) {
        this.shinyapp = a, this.id = b, this.el = d, FileProcessor.call(this, c)
    };
    $.extend(FileUploader.prototype, FileProcessor.prototype),
        function () {
            this.makeRequest = function (a, b, c, d, e) {
                this.shinyapp.makeRequest(a, b, c, d, e)
            }, this.onBegin = function (a, b) {
                var c = this;
                this.$setError(null), this.$setActive(!0), this.$setVisible(!0), this.onProgress(null, 0), this.totalBytes = 0, this.progressBytes = 0, $.each(a, function (a, b) {
                    c.totalBytes += b.size
                });
                var d = $.map(a, function (a, b) {
                    return {
                        name: a.name,
                        size: a.size,
                        type: a.type
                    }
                });
                this.makeRequest("uploadInit", [d], function (a) {
                    c.jobId = a.jobId, c.uploadUrl = a.uploadUrl, b()
                }, function (a) {
                    c.onError(a)
                })
            }, this.onFile = function (a, b) {
                var c = this;
                this.onProgress(a, 0), $.ajax(this.uploadUrl, {
                    type: "POST",
                    cache: !1,
                    xhr: function () {
                        var b = $.ajaxSettings.xhr();
                        return b.upload && (b.upload.onprogress = function (b) {
                            b.lengthComputable && c.onProgress(a, (c.progressBytes + b.loaded) / c.totalBytes)
                        }), b
                    },
                    data: a,
                    contentType: "application/octet-stream",
                    processData: !1,
                    success: function () {
                        c.progressBytes += a.size, b()
                    },
                    error: function (a, b, d) {
                        c.onError(a.responseText || b)
                    }
                })
            }, this.onComplete = function () {
                var a = this,
                    b = $.map(this.files, function (a, b) {
                        return {
                            name: a.name,
                            size: a.size,
                            type: a.type
                        }
                    }),
                    c = jQuery.Event("shiny:inputchanged");
                c.name = this.id, c.value = b, c.binding = fileInputBinding, c.el = this.el, c.inputType = "shiny.fileupload", $(document).trigger(c), this.makeRequest("uploadEnd", [this.jobId, this.id], function (b) {
                    a.$setActive(!1), a.onProgress(null, 1), a.$bar().text("Upload complete"), $(c.el).val("")
                }, function (b) {
                    a.onError(b)
                }), this.$bar().text("Finishing upload")
            }, this.onError = function (a) {
                this.$setError(a || ""), this.$setActive(!1)
            }, this.onAbort = function () {
                this.$setVisible(!1)
            }, this.onProgress = function (a, b) {
                this.$bar().width(Math.round(100 * b) + "%"), this.$bar().text(a ? a.name : "")
            }, this.$container = function () {
                return $("#" + $escape(this.id) + "_progress.shiny-file-input-progress")
            }, this.$bar = function () {
                return $("#" + $escape(this.id) + "_progress.shiny-file-input-progress .progress-bar")
            }, this.$setVisible = function (a) {
                this.$container().css("visibility", a ? "visible" : "hidden")
            }, this.$setError = function (a) {
                this.$bar().toggleClass("progress-bar-danger", null !== a), null !== a && (this.onProgress(null, 1), this.$bar().text(a))
            }, this.$setActive = function (a) {
                this.$container().toggleClass("active", !!a)
            }
        }.call(FileUploader.prototype);
    var $fileInputs = $(),
        fileInputBinding = new InputBinding;
    $.extend(fileInputBinding, {
        find: function (a) {
            return $(a).find('input[type="file"]')
        },
        getId: function (a) {
            return InputBinding.prototype.getId.call(this, a) || a.name
        },
        getValue: function (a) {
            var b = $(a).attr("data-restore");
            if (b) {
                b = JSON.parse(b);
                var c = $(a).closest("div.input-group").find("input[type=text]");
                1 === b.name.length ? c.val(b.name[0]) : c.val(b.name.length + " files");
                var d = $(a).closest("div.form-group").find(".progress"),
                    e = d.find(".progress-bar");
                return d.removeClass("active"), e.width("100%"), e.css("visibility", "visible"), b
            }
            return null
        },
        setValue: function (a, b) { },
        getType: function (a) {
            return "shiny.file"
        },
        _zoneOf: function (a) {
            return $(a).closest("div.input-group")
        },
        _enableDraghover: function (a) {
            var b = $(a),
                c = 0;
            return b.on({
                "dragenter.draghover": function (a) {
                    0 === c++ && b.trigger("draghover:enter", a)
                },
                "dragleave.draghover": function (a) {
                    0 === --c && b.trigger("draghover:leave", a), c < 0 && console.error("draghover childCounter is negative somehow")
                },
                "dragover.draghover": function (a) {
                    a.preventDefault()
                },
                "drop.draghover": function (a) {
                    c = 0, b.trigger("draghover:drop", a), a.preventDefault()
                }
            }), b
        },
        _disableDraghover: function (a) {
            return $(a).off(".draghover")
        },
        _ZoneClass: {
            ACTIVE: "shiny-file-input-active",
            OVER: "shiny-file-input-over"
        },
        _enableDocumentEvents: function () {
            var a = this,
                b = $("html"),
                c = this._ZoneClass,
                d = c.ACTIVE,
                e = c.OVER;
            this._enableDraghover(b).on({
                "draghover:enter.draghover": function (b) {
                    a._zoneOf($fileInputs).addClass(d)
                },
                "draghover:leave.draghover": function (b) {
                    a._zoneOf($fileInputs).removeClass(d)
                },
                "draghover:drop.draghover": function (b) {
                    a._zoneOf($fileInputs).removeClass(e).removeClass(d)
                }
            })
        },
        _disableDocumentEvents: function () {
            var a = $("html");
            a.off(".draghover"), this._disableDraghover(a)
        },
        _canSetFiles: function (a) {
            var b = document.createElement("input");
            b.type = "file";
            try {
                b.files = a
            } catch (c) {
                return !1
            }
            return !0
        },
        _handleDrop: function (a, b) {
            var c = a.originalEvent.dataTransfer.files,
                d = $(b);
            void 0 === c || null === c ? console.log("Dropping files is not supported on this browser. (no FileList)") : this._canSetFiles(c) ? (d.val(""), b.files = a.originalEvent.dataTransfer.files, d.trigger("change")) : (d.val(""), uploadDroppedFilesIE10Plus(b, c))
        },
        _isIE9: function () {
            try {
                return window.navigator.userAgent.match(/MSIE 9\./) && !0 || !1
            } catch (a) {
                return !1
            }
        },
        subscribe: function (a, b) {
            var c = this;
            if ($(a).on("change.fileInputBinding", uploadFiles), !this._isIE9()) {
                0 === $fileInputs.length && this._enableDocumentEvents(), $fileInputs = $fileInputs.add(a);
                var d = this._zoneOf(a),
                    e = this._ZoneClass.OVER;
                this._enableDraghover(d).on({
                    "draghover:enter.draghover": function (a) {
                        d.addClass(e)
                    },
                    "draghover:leave.draghover": function (a) {
                        d.removeClass(e), a.stopPropagation()
                    },
                    "draghover:drop.draghover": function (b, d) {
                        c._handleDrop(d, a)
                    }
                })
            }
        },
        unsubscribe: function (a) {
            var b = $(a),
                c = this._zoneOf(a);
            c.removeClass(this._ZoneClass.OVER).removeClass(this._ZoneClass.ACTIVE), this._disableDraghover(c), b.off(".fileInputBinding"), c.off(".draghover"), $fileInputs = $fileInputs.not(a), 0 === $fileInputs.length && this._disableDocumentEvents()
        }
    }), inputBindings.register(fileInputBinding, "shiny.fileInputBinding"), $(function () {
        setTimeout(initShiny, 1)
    }), $(document).on("keydown", function (a) {
        if (114 === a.which && (a.ctrlKey || a.metaKey) && !a.shiftKey && !a.altKey) {
            var b = "reactlog?w=" + window.escape(exports.shinyapp.config.workerId) + "&s=" + window.escape(exports.shinyapp.config.sessionId);
            window.open(b), a.preventDefault()
        }
    }), $(document).on("keydown", function (a) {
        if (115 === a.which && (a.ctrlKey || a.metaKey) && !a.shiftKey && !a.altKey || 114 === a.which && (a.ctrlKey || a.metaKey) && a.shiftKey && !a.altKey) {
            var b = "reactlog/mark?w=" + window.escape(exports.shinyapp.config.workerId) + "&s=" + window.escape(exports.shinyapp.config.sessionId);
            $.get(b, function (a) {
                if ("marked" === a) {
                    var b = '<span id="shiny-reactlog-mark-text">Marked time point in reactlog</span>';
                    exports.notifications.show({
                        html: b,
                        closeButton: !0
                    })
                }
            }).fail(function () {
                window.open(b)
            }), a.preventDefault()
        }
    })
}();
//# sourceMappingURL=shiny.min.js.map