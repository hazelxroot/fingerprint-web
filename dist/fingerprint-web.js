var t,
    e,
    r,
    n = [
        ".mp3",
        ".ogg",
        ".spx",
        ".mpc",
        ".ape",
        ".flac",
        ".wv",
        ".tta",
        ".wma",
        ".m4a",
        ".m4b",
        ".m4p",
        ".mp4",
        ".3g2",
        ".wav",
        ".aif",
        ".aiff",
        ".opus",
    ];
function o(t) {
    return (o = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
}
function i(t, e) {
    return (i =
        Object.setPrototypeOf ||
        function (t, e) {
            return (t.__proto__ = e), t;
        })(t, e);
}
function s() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
        return (
            Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () { })
            ),
            !0
        );
    } catch (t) {
        return !1;
    }
}
function u(t, e, r) {
    return (u = s()
        ? Reflect.construct
        : function (t, e, r) {
            var n = [null];
            n.push.apply(n, e);
            var o = new (Function.bind.apply(t, n))();
            return r && i(o, r.prototype), o;
        }).apply(null, arguments);
}
function c(t) {
    var e = "function" == typeof Map ? new Map() : void 0;
    return (c = function (t) {
        if (null === t || -1 === Function.toString.call(t).indexOf("[native code]"))
            return t;
        if ("function" != typeof t)
            throw new TypeError("Super expression must either be null or a function");
        if (void 0 !== e) {
            if (e.has(t)) return e.get(t);
            e.set(t, r);
        }
        function r() {
            return u(t, arguments, o(this).constructor);
        }
        return (
            (r.prototype = Object.create(t.prototype, {
                constructor: {
                    value: r,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                },
            })),
            i(r, t)
        );
    })(t);
}
(exports.STATUS = void 0),
    ((t = exports.STATUS || (exports.STATUS = {})).CREATED = "CREATED"),
    (t.UPLOADED = "UPLOADED"),
    (t.SUBMITTED = "SUBMITTED"),
    (t.ERROR = "ERROR"),
    (t.RESOLVED = "RESOLVED"),
    (t.NOT_FOUND = "NOT_FOUND"),
    (t.FOUND = "FOUND"),
    (t.DONE = "DONE"),
    (t.DELETED = "DELETED"),
    (function (t) {
        (t.UNKNOWN_ISRC = "Unknown ISRC"),
            (t.FAILED_TO_SUBMIT = "Failed to submit"),
            (t.FAILED_TO_PROCESS = "Failed to process");
    })(e || (e = {})),
    (function (t) {
        (t.URL = "url"), (t.REDIRECT = "redirect");
    })(r || (r = {}));
var a = (function (t) {
    var e, r;
    function n(e, r) {
        var o;
        return (
            ((o = t.call(this, e) || this).statusCode = void 0),
            (o.statusCode = r),
            Object.setPrototypeOf(
                (function (t) {
                    if (void 0 === t)
                        throw new ReferenceError(
                            "this hasn't been initialised - super() hasn't been called"
                        );
                    return t;
                })(o),
                n.prototype
            ),
            o
        );
    }
    return (
        (r = t),
        ((e = n).prototype = Object.create(r.prototype)),
        (e.prototype.constructor = e),
        i(e, r),
        n
    );
})(c(Error));
function f(t) {
    return t
        .replace(/((\r\n)|\r|\n)+/gm, "")
        .replace(/\\/gm, "/")
        .replace(/(\/|^)[\._\-\/]+\//g, "/");
}
function p(t) {
    var e = t.split(".").pop();
    if (!e) throw new a(t + " is missing an extension", 400);
    if (!n.includes("." + e.toLowerCase()))
        throw new a(e + " extension is not supported", 415);
    return f(t.substring(0, t.length - (e.length + 1))) + "." + e.toLowerCase();
}
(exports.default = (function () {
    function t(t) {
        var e = t.token,
            r = t.apiUrl,
            n =
                void 0 === r
                    ? "https://w9dxkmzqu6.execute-api.eu-central-1.amazonaws.com"
                    : r;
        (this.config = void 0), (this.config = { token: e, apiUrl: n });
    }
    var e = t.prototype;
    return (
        (e.upload = function (t, e) {
            void 0 === e && (e = function () { });
            try {
                var r = p(t.name);
                return Promise.resolve(
                    fetch(
                        this.config.apiUrl.replace(/\/$/, "") +
                        "/upload/" +
                        encodeURIComponent(r),
                        {
                            headers: {
                                "x-mc-overwrite": t.overwrite ? "yes" : "no",
                                authorization: "Bearer " + this.config.token,
                            },
                        }
                    )
                ).then(function (r) {
                    function n(n) {
                        return Promise.resolve(r.json()).then(function (r) {
                            var n = r.fields,
                                o = r.url,
                                i = r.name,
                                s = new FormData(),
                                u = new XMLHttpRequest();
                            for (var c in n) s.append(c, n[c]);
                            return (
                                s.append("file", t),
                                new Promise(function (t, r) {
                                    (u.onload = function () {
                                        204 === u.status ? t(i) : r(new Error("Upload Failed"));
                                    }),
                                        (u.onerror = r),
                                        u.upload.addEventListener(
                                            "progress",
                                            function (t) {
                                                e(t.loaded, t.total);
                                            },
                                            !1
                                        ),
                                        u.open("POST", o, !0),
                                        u.send(s);
                                })
                            );
                        });
                    }
                    var o = (function () {
                        if (200 !== r.status)
                            return Promise.resolve(r.text()).then(function (t) {
                                throw new Error(t);
                            });
                    })();
                    return o && o.then ? o.then(n) : n();
                });
            } catch (t) {
                return Promise.reject(t);
            }
        }),
        (e.folders = function () {
            try {
                return Promise.resolve(
                    fetch(this.config.apiUrl.replace(/\/$/, "") + "/audio/", {
                        headers: { authorization: "Bearer " + this.config.token },
                    })
                ).then(function (t) {
                    function e(e) {
                        return Promise.resolve(t.json()).then(function (t) {
                            return t.folders;
                        });
                    }
                    var r = (function () {
                        if (200 !== t.status)
                            return Promise.resolve(t.text()).then(function (t) {
                                throw new Error(t);
                            });
                    })();
                    return r && r.then ? r.then(e) : e();
                });
            } catch (t) {
                return Promise.reject(t);
            }
        }),
        (e.files = function (t) {
            try {
                if (f(t) !== t) throw new Error("Invalid folder name: " + t);
                return Promise.resolve(
                    fetch(
                        this.config.apiUrl.replace(/\/$/, "") +
                        "/audio/" +
                        encodeURIComponent(t) +
                        "/",
                        { headers: { authorization: "Bearer " + this.config.token } }
                    )
                ).then(function (t) {
                    function e(e) {
                        return Promise.resolve(t.json()).then(function (t) {
                            return t.files;
                        });
                    }
                    var r = (function () {
                        if (200 !== t.status)
                            return Promise.resolve(t.text()).then(function (t) {
                                throw new Error(t);
                            });
                    })();
                    return r && r.then ? r.then(e) : e();
                });
            } catch (t) {
                return Promise.reject(t);
            }
        }),
        (e.file = function (t) {
            try {
                if (
                    p(t) !== t ||
                    2 !==
                    t.split("/").filter(function (t) {
                        return t && t.length;
                    }).length
                )
                    throw new Error("Invalid file name: " + t);
                return Promise.resolve(
                    fetch(
                        this.config.apiUrl.replace(/\/$/, "") +
                        "/audio/" +
                        encodeURIComponent(t),
                        { headers: { authorization: "Bearer " + this.config.token } }
                    )
                ).then(function (t) {
                    function e(e) {
                        return Promise.resolve(t.json()).then(function (t) {
                            return t.file;
                        });
                    }
                    var r = (function () {
                        if (200 !== t.status)
                            return Promise.resolve(t.text()).then(function (t) {
                                throw new Error(t);
                            });
                    })();
                    return r && r.then ? r.then(e) : e();
                });
            } catch (t) {
                return Promise.reject(t);
            }
        }),
        (e.delete = function (t) {
            try {
                if (
                    p(t) !== t ||
                    2 !==
                    t.split("/").filter(function (t) {
                        return t && t.length;
                    }).length
                )
                    throw new Error("Invalid file name: " + t);
                return Promise.resolve(
                    fetch(
                        this.config.apiUrl.replace(/\/$/, "") +
                        "/audio/" +
                        encodeURIComponent(t),
                        {
                            method: "DELETE",
                            headers: { authorization: "Bearer " + this.config.token },
                        }
                    )
                ).then(function (t) {
                    return (function () {
                        if (204 !== t.status)
                            return Promise.resolve(t.text()).then(function (t) {
                                throw new Error(t);
                            });
                    })();
                });
            } catch (t) {
                return Promise.reject(t);
            }
        }),
        (e.resubmit = function (t) {
            try {
                if (
                    p(t) !== t ||
                    2 !==
                    t.split("/").filter(function (t) {
                        return t && t.length;
                    }).length
                )
                    throw new Error("Invalid file name: " + t);
                return Promise.resolve(
                    fetch(
                        this.config.apiUrl.replace(/\/$/, "") +
                        "/audio/" +
                        encodeURIComponent(t),
                        {
                            method: "POST",
                            headers: {
                                "x-mc-resubmit": "yes",
                                authorization: "Bearer " + this.config.token,
                            },
                        }
                    )
                ).then(function (t) {
                    return (function () {
                        if (204 !== t.status)
                            return Promise.resolve(t.text()).then(function (t) {
                                throw new Error(t);
                            });
                    })();
                });
            } catch (t) {
                return Promise.reject(t);
            }
        }),
        (e.downloadLink = function (t) {
            try {
                if (
                    p(t) !== t ||
                    2 !==
                    t.split("/").filter(function (t) {
                        return t && t.length;
                    }).length
                )
                    throw new Error("Invalid file name: " + t);
                return Promise.resolve(
                    fetch(
                        this.config.apiUrl.replace(/\/$/, "") +
                        "/audio/" +
                        encodeURIComponent(t),
                        {
                            headers: {
                                "x-mc-download": r.URL,
                                authorization: "Bearer " + this.config.token,
                            },
                        }
                    )
                ).then(function (t) {
                    function e(e) {
                        return t.text();
                    }
                    var r = (function () {
                        if (200 !== t.status)
                            return Promise.resolve(t.text()).then(function (t) {
                                throw new Error(t);
                            });
                    })();
                    return r && r.then ? r.then(e) : e();
                });
            } catch (t) {
                return Promise.reject(t);
            }
        }),
        t
    );
})()),
    (exports.isCreated = function (t, e) {
        return (
            void 0 === e && (e = !0),
            e
                ? t.status === exports.STATUS.CREATED
                : [
                    exports.STATUS.CREATED,
                    exports.STATUS.UPLOADED,
                    exports.STATUS.SUBMITTED,
                    exports.STATUS.NOT_FOUND,
                    exports.STATUS.RESOLVED,
                    exports.STATUS.FOUND,
                    exports.STATUS.DONE,
                ].includes(t.status)
        );
    }),
    (exports.isDone = function (t) {
        return t.status === exports.STATUS.DONE;
    }),
    (exports.isError = function (t) {
        return t.status === exports.STATUS.ERROR;
    }),
    (exports.isFound = function (t, e) {
        return (
            void 0 === e && (e = !0),
            e
                ? t.status === exports.STATUS.FOUND
                : [exports.STATUS.FOUND, exports.STATUS.DONE].includes(t.status)
        );
    }),
    (exports.isNotFound = function (t) {
        return t.status === exports.STATUS.NOT_FOUND;
    }),
    (exports.isResolved = function (t, e) {
        return (
            void 0 === e && (e = !0),
            e
                ? t.status === exports.STATUS.RESOLVED
                : [
                    exports.STATUS.RESOLVED,
                    exports.STATUS.FOUND,
                    exports.STATUS.DONE,
                ].includes(t.status)
        );
    }),
    (exports.isSubmitted = function (t, e) {
        return (
            void 0 === e && (e = !0),
            e
                ? t.status === exports.STATUS.SUBMITTED
                : [
                    exports.STATUS.SUBMITTED,
                    exports.STATUS.NOT_FOUND,
                    exports.STATUS.RESOLVED,
                    exports.STATUS.FOUND,
                    exports.STATUS.DONE,
                ].includes(t.status)
        );
    }),
    (exports.isUploaded = function (t, e) {
        return (
            void 0 === e && (e = !0),
            e
                ? t.status === exports.STATUS.UPLOADED
                : [
                    exports.STATUS.UPLOADED,
                    exports.STATUS.SUBMITTED,
                    exports.STATUS.NOT_FOUND,
                    exports.STATUS.RESOLVED,
                    exports.STATUS.FOUND,
                    exports.STATUS.DONE,
                ].includes(t.status)
        );
    });
//# sourceMappingURL=fingerprint-web.js.map
