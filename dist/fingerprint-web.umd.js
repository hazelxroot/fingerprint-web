!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? t(exports)
        : "function" == typeof define && define.amd
            ? define(["exports"], t)
            : t(((e || self).fingerprintWeb = {}));
})(this, function (e) {
    var t,
        n,
        r,
        o = [
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
    function i(e) {
        return (i = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
    }
    function u(e, t) {
        return (u =
            Object.setPrototypeOf ||
            function (e, t) {
                return (e.__proto__ = t), e;
            })(e, t);
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
        } catch (e) {
            return !1;
        }
    }
    function c(e, t, n) {
        return (c = s()
            ? Reflect.construct
            : function (e, t, n) {
                var r = [null];
                r.push.apply(r, t);
                var o = new (Function.bind.apply(e, r))();
                return n && u(o, n.prototype), o;
            }).apply(null, arguments);
    }
    function a(e) {
        var t = "function" == typeof Map ? new Map() : void 0;
        return (a = function (e) {
            if (
                null === e ||
                -1 === Function.toString.call(e).indexOf("[native code]")
            )
                return e;
            if ("function" != typeof e)
                throw new TypeError(
                    "Super expression must either be null or a function"
                );
            if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, n);
            }
            function n() {
                return c(e, arguments, i(this).constructor);
            }
            return (
                (n.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: n,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                    },
                })),
                u(n, e)
            );
        })(e);
    }
    (e.STATUS = void 0),
        ((t = e.STATUS || (e.STATUS = {})).CREATED = "CREATED"),
        (t.UPLOADED = "UPLOADED"),
        (t.SUBMITTED = "SUBMITTED"),
        (t.ERROR = "ERROR"),
        (t.RESOLVED = "RESOLVED"),
        (t.NOT_FOUND = "NOT_FOUND"),
        (t.FOUND = "FOUND"),
        (t.DONE = "DONE"),
        (t.DELETED = "DELETED"),
        (function (e) {
            (e.UNKNOWN_ISRC = "Unknown ISRC"),
                (e.FAILED_TO_SUBMIT = "Failed to submit"),
                (e.FAILED_TO_PROCESS = "Failed to process");
        })(n || (n = {})),
        (function (e) {
            (e.URL = "url"), (e.REDIRECT = "redirect");
        })(r || (r = {}));
    var f = (function (e) {
        var t, n;
        function r(t, n) {
            var o;
            return (
                ((o = e.call(this, t) || this).statusCode = void 0),
                (o.statusCode = n),
                Object.setPrototypeOf(
                    (function (e) {
                        if (void 0 === e)
                            throw new ReferenceError(
                                "this hasn't been initialised - super() hasn't been called"
                            );
                        return e;
                    })(o),
                    r.prototype
                ),
                o
            );
        }
        return (
            (n = e),
            ((t = r).prototype = Object.create(n.prototype)),
            (t.prototype.constructor = t),
            u(t, n),
            r
        );
    })(a(Error));
    function l(e) {
        return e
            .replace(/((\r\n)|\r|\n)+/gm, "")
            .replace(/\\/gm, "/")
            .replace(/(\/|^)[\._\-\/]+\//g, "/");
    }
    function h(e) {
        var t = e.split(".").pop();
        if (!t) throw new f(e + " is missing an extension", 400);
        if (!o.includes("." + t.toLowerCase()))
            throw new f(t + " extension is not supported", 415);
        return l(e.substring(0, e.length - (t.length + 1))) + "." + t.toLowerCase();
    }
    (e.default = (function () {
        function e(e) {
            var t = e.token,
                n = e.apiUrl,
                r =
                    void 0 === n
                        ? "https://w9dxkmzqu6.execute-api.eu-central-1.amazonaws.com"
                        : n;
            (this.config = void 0), (this.config = { token: t, apiUrl: r });
        }
        var t = e.prototype;
        return (
            (t.upload = function (e, t) {
                void 0 === t && (t = function () { });
                try {
                    var n = h(e.name);
                    return Promise.resolve(
                        fetch(
                            this.config.apiUrl.replace(/\/$/, "") +
                            "/upload/" +
                            encodeURIComponent(n),
                            {
                                headers: {
                                    "x-mc-overwrite": e.overwrite ? "yes" : "no",
                                    authorization: "Bearer " + this.config.token,
                                },
                            }
                        )
                    ).then(function (n) {
                        function r(r) {
                            return Promise.resolve(n.json()).then(function (n) {
                                var r = n.fields,
                                    o = n.url,
                                    i = n.name,
                                    u = new FormData(),
                                    s = new XMLHttpRequest();
                                for (var c in r) u.append(c, r[c]);
                                return (
                                    u.append("file", e),
                                    new Promise(function (e, n) {
                                        (s.onload = function () {
                                            204 === s.status ? e(i) : n(new Error("Upload Failed"));
                                        }),
                                            (s.onerror = n),
                                            s.upload.addEventListener(
                                                "progress",
                                                function (e) {
                                                    t(e.loaded, e.total);
                                                },
                                                !1
                                            ),
                                            s.open("POST", o, !0),
                                            s.send(u);
                                    })
                                );
                            });
                        }
                        var o = (function () {
                            if (200 !== n.status)
                                return Promise.resolve(n.text()).then(function (e) {
                                    throw new Error(e);
                                });
                        })();
                        return o && o.then ? o.then(r) : r();
                    });
                } catch (e) {
                    return Promise.reject(e);
                }
            }),
            (t.folders = function () {
                try {
                    return Promise.resolve(
                        fetch(this.config.apiUrl.replace(/\/$/, "") + "/audio/", {
                            headers: { authorization: "Bearer " + this.config.token },
                        })
                    ).then(function (e) {
                        function t(t) {
                            return Promise.resolve(e.json()).then(function (e) {
                                return e.folders;
                            });
                        }
                        var n = (function () {
                            if (200 !== e.status)
                                return Promise.resolve(e.text()).then(function (e) {
                                    throw new Error(e);
                                });
                        })();
                        return n && n.then ? n.then(t) : t();
                    });
                } catch (e) {
                    return Promise.reject(e);
                }
            }),
            (t.files = function (e) {
                try {
                    if (l(e) !== e) throw new Error("Invalid folder name: " + e);
                    return Promise.resolve(
                        fetch(
                            this.config.apiUrl.replace(/\/$/, "") +
                            "/audio/" +
                            encodeURIComponent(e) +
                            "/",
                            { headers: { authorization: "Bearer " + this.config.token } }
                        )
                    ).then(function (e) {
                        function t(t) {
                            return Promise.resolve(e.json()).then(function (e) {
                                return e.files;
                            });
                        }
                        var n = (function () {
                            if (200 !== e.status)
                                return Promise.resolve(e.text()).then(function (e) {
                                    throw new Error(e);
                                });
                        })();
                        return n && n.then ? n.then(t) : t();
                    });
                } catch (e) {
                    return Promise.reject(e);
                }
            }),
            (t.file = function (e) {
                try {
                    if (
                        h(e) !== e ||
                        2 !==
                        e.split("/").filter(function (e) {
                            return e && e.length;
                        }).length
                    )
                        throw new Error("Invalid file name: " + e);
                    return Promise.resolve(
                        fetch(
                            this.config.apiUrl.replace(/\/$/, "") +
                            "/audio/" +
                            encodeURIComponent(e),
                            { headers: { authorization: "Bearer " + this.config.token } }
                        )
                    ).then(function (e) {
                        function t(t) {
                            return Promise.resolve(e.json()).then(function (e) {
                                return e.file;
                            });
                        }
                        var n = (function () {
                            if (200 !== e.status)
                                return Promise.resolve(e.text()).then(function (e) {
                                    throw new Error(e);
                                });
                        })();
                        return n && n.then ? n.then(t) : t();
                    });
                } catch (e) {
                    return Promise.reject(e);
                }
            }),
            (t.delete = function (e) {
                try {
                    if (
                        h(e) !== e ||
                        2 !==
                        e.split("/").filter(function (e) {
                            return e && e.length;
                        }).length
                    )
                        throw new Error("Invalid file name: " + e);
                    return Promise.resolve(
                        fetch(
                            this.config.apiUrl.replace(/\/$/, "") +
                            "/audio/" +
                            encodeURIComponent(e),
                            {
                                method: "DELETE",
                                headers: { authorization: "Bearer " + this.config.token },
                            }
                        )
                    ).then(function (e) {
                        return (function () {
                            if (204 !== e.status)
                                return Promise.resolve(e.text()).then(function (e) {
                                    throw new Error(e);
                                });
                        })();
                    });
                } catch (e) {
                    return Promise.reject(e);
                }
            }),
            (t.resubmit = function (e) {
                try {
                    if (
                        h(e) !== e ||
                        2 !==
                        e.split("/").filter(function (e) {
                            return e && e.length;
                        }).length
                    )
                        throw new Error("Invalid file name: " + e);
                    return Promise.resolve(
                        fetch(
                            this.config.apiUrl.replace(/\/$/, "") +
                            "/audio/" +
                            encodeURIComponent(e),
                            {
                                method: "POST",
                                headers: {
                                    "x-mc-resubmit": "yes",
                                    authorization: "Bearer " + this.config.token,
                                },
                            }
                        )
                    ).then(function (e) {
                        return (function () {
                            if (204 !== e.status)
                                return Promise.resolve(e.text()).then(function (e) {
                                    throw new Error(e);
                                });
                        })();
                    });
                } catch (e) {
                    return Promise.reject(e);
                }
            }),
            (t.downloadLink = function (e) {
                try {
                    if (
                        h(e) !== e ||
                        2 !==
                        e.split("/").filter(function (e) {
                            return e && e.length;
                        }).length
                    )
                        throw new Error("Invalid file name: " + e);
                    return Promise.resolve(
                        fetch(
                            this.config.apiUrl.replace(/\/$/, "") +
                            "/audio/" +
                            encodeURIComponent(e),
                            {
                                headers: {
                                    "x-mc-download": r.URL,
                                    authorization: "Bearer " + this.config.token,
                                },
                            }
                        )
                    ).then(function (e) {
                        function t(t) {
                            return e.text();
                        }
                        var n = (function () {
                            if (200 !== e.status)
                                return Promise.resolve(e.text()).then(function (e) {
                                    throw new Error(e);
                                });
                        })();
                        return n && n.then ? n.then(t) : t();
                    });
                } catch (e) {
                    return Promise.reject(e);
                }
            }),
            e
        );
    })()),
        (e.isCreated = function (t, n) {
            return (
                void 0 === n && (n = !0),
                n
                    ? t.status === e.STATUS.CREATED
                    : [
                        e.STATUS.CREATED,
                        e.STATUS.UPLOADED,
                        e.STATUS.SUBMITTED,
                        e.STATUS.NOT_FOUND,
                        e.STATUS.RESOLVED,
                        e.STATUS.FOUND,
                        e.STATUS.DONE,
                    ].includes(t.status)
            );
        }),
        (e.isDone = function (t) {
            return t.status === e.STATUS.DONE;
        }),
        (e.isError = function (t) {
            return t.status === e.STATUS.ERROR;
        }),
        (e.isFound = function (t, n) {
            return (
                void 0 === n && (n = !0),
                n
                    ? t.status === e.STATUS.FOUND
                    : [e.STATUS.FOUND, e.STATUS.DONE].includes(t.status)
            );
        }),
        (e.isNotFound = function (t) {
            return t.status === e.STATUS.NOT_FOUND;
        }),
        (e.isResolved = function (t, n) {
            return (
                void 0 === n && (n = !0),
                n
                    ? t.status === e.STATUS.RESOLVED
                    : [e.STATUS.RESOLVED, e.STATUS.FOUND, e.STATUS.DONE].includes(
                        t.status
                    )
            );
        }),
        (e.isSubmitted = function (t, n) {
            return (
                void 0 === n && (n = !0),
                n
                    ? t.status === e.STATUS.SUBMITTED
                    : [
                        e.STATUS.SUBMITTED,
                        e.STATUS.NOT_FOUND,
                        e.STATUS.RESOLVED,
                        e.STATUS.FOUND,
                        e.STATUS.DONE,
                    ].includes(t.status)
            );
        }),
        (e.isUploaded = function (t, n) {
            return (
                void 0 === n && (n = !0),
                n
                    ? t.status === e.STATUS.UPLOADED
                    : [
                        e.STATUS.UPLOADED,
                        e.STATUS.SUBMITTED,
                        e.STATUS.NOT_FOUND,
                        e.STATUS.RESOLVED,
                        e.STATUS.FOUND,
                        e.STATUS.DONE,
                    ].includes(t.status)
            );
        });
});
//# sourceMappingURL=fingerprint-web.umd.js.map
