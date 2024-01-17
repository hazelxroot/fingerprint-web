var t,
  e,
  n,
  r = [
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
function u() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" == typeof Proxy) return !0;
  try {
    return (
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      ),
      !0
    );
  } catch (t) {
    return !1;
  }
}
function c(t, e, n) {
  return (c = u()
    ? Reflect.construct
    : function (t, e, n) {
        var r = [null];
        r.push.apply(r, e);
        var o = new (Function.bind.apply(t, r))();
        return n && i(o, n.prototype), o;
      }).apply(null, arguments);
}
function s(t) {
  var e = "function" == typeof Map ? new Map() : void 0;
  return (s = function (t) {
    if (null === t || -1 === Function.toString.call(t).indexOf("[native code]"))
      return t;
    if ("function" != typeof t)
      throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== e) {
      if (e.has(t)) return e.get(t);
      e.set(t, n);
    }
    function n() {
      return c(t, arguments, o(this).constructor);
    }
    return (
      (n.prototype = Object.create(t.prototype, {
        constructor: {
          value: n,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
      i(n, t)
    );
  })(t);
}
!(function (t) {
  (t.CREATED = "CREATED"),
    (t.UPLOADED = "UPLOADED"),
    (t.SUBMITTED = "SUBMITTED"),
    (t.ERROR = "ERROR"),
    (t.RESOLVED = "RESOLVED"),
    (t.NOT_FOUND = "NOT_FOUND"),
    (t.FOUND = "FOUND"),
    (t.DONE = "DONE"),
    (t.DELETED = "DELETED");
})(t || (t = {})),
  (function (t) {
    (t.UNKNOWN_ISRC = "Unknown ISRC"),
      (t.FAILED_TO_SUBMIT = "Failed to submit"),
      (t.FAILED_TO_PROCESS = "Failed to process");
  })(e || (e = {})),
  (function (t) {
    (t.URL = "url"), (t.REDIRECT = "redirect");
  })(n || (n = {}));
var a = (function (t) {
  var e, n;
  function r(e, n) {
    var o;
    return (
      ((o = t.call(this, e) || this).statusCode = void 0),
      (o.statusCode = n),
      Object.setPrototypeOf(
        (function (t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return t;
        })(o),
        r.prototype
      ),
      o
    );
  }
  return (
    (n = t),
    ((e = r).prototype = Object.create(n.prototype)),
    (e.prototype.constructor = e),
    i(e, n),
    r
  );
})(s(Error));
function f(t) {
  return t
    .replace(/((\r\n)|\r|\n)+/gm, "")
    .replace(/\\/gm, "/")
    .replace(/(\/|^)[\._\-\/]+\//g, "/");
}
function l(t) {
  var e = t.split(".").pop();
  if (!e) throw new a(t + " is missing an extension", 400);
  if (!r.includes("." + e.toLowerCase()))
    throw new a(e + " extension is not supported", 415);
  return f(t.substring(0, t.length - (e.length + 1))) + "." + e.toLowerCase();
}
function h(e, n) {
  return (
    void 0 === n && (n = !0),
    n
      ? e.status === t.CREATED
      : [
          t.CREATED,
          t.UPLOADED,
          t.SUBMITTED,
          t.NOT_FOUND,
          t.RESOLVED,
          t.FOUND,
          t.DONE,
        ].includes(e.status)
  );
}
function p(e, n) {
  return (
    void 0 === n && (n = !0),
    n
      ? e.status === t.UPLOADED
      : [
          t.UPLOADED,
          t.SUBMITTED,
          t.NOT_FOUND,
          t.RESOLVED,
          t.FOUND,
          t.DONE,
        ].includes(e.status)
  );
}
function d(e, n) {
  return (
    void 0 === n && (n = !0),
    n
      ? e.status === t.SUBMITTED
      : [t.SUBMITTED, t.NOT_FOUND, t.RESOLVED, t.FOUND, t.DONE].includes(
          e.status
        )
  );
}
function E(e, n) {
  return (
    void 0 === n && (n = !0),
    n
      ? e.status === t.RESOLVED
      : [t.RESOLVED, t.FOUND, t.DONE].includes(e.status)
  );
}
function m(e) {
  return e.status === t.NOT_FOUND;
}
function O(e, n) {
  return (
    void 0 === n && (n = !0),
    n ? e.status === t.FOUND : [t.FOUND, t.DONE].includes(e.status)
  );
}
function v(e) {
  return e.status === t.DONE;
}
function D(e) {
  return e.status === t.ERROR;
}
var w = (function () {
  function t(t) {
    var e = t.token,
      n = t.apiUrl,
      r =
        void 0 === n
          ? "https://w9dxkmzqu6.execute-api.eu-central-1.amazonaws.com"
          : n;
    (this.config = void 0), (this.config = { token: e, apiUrl: r });
  }
  var e = t.prototype;
  return (
    (e.upload = function (t, e) {
      void 0 === e && (e = function () {});
      try {
        var n = l(t.name);
        return Promise.resolve(
          fetch(
            this.config.apiUrl.replace(/\/$/, "") +
              "/upload/" +
              encodeURIComponent(n),
            {
              headers: {
                "x-mc-overwrite": t.overwrite ? "yes" : "no",
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
                c = new XMLHttpRequest();
              for (var s in r) u.append(s, r[s]);
              return (
                u.append("file", t),
                new Promise(function (t, n) {
                  (c.onload = function () {
                    204 === c.status ? t(i) : n(new Error("Upload Failed"));
                  }),
                    (c.onerror = n),
                    c.upload.addEventListener(
                      "progress",
                      function (t) {
                        e(t.loaded, t.total);
                      },
                      !1
                    ),
                    c.open("POST", o, !0),
                    c.send(u);
                })
              );
            });
          }
          var o = (function () {
            if (200 !== n.status)
              return Promise.resolve(n.text()).then(function (t) {
                throw new Error(t);
              });
          })();
          return o && o.then ? o.then(r) : r();
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
          var n = (function () {
            if (200 !== t.status)
              return Promise.resolve(t.text()).then(function (t) {
                throw new Error(t);
              });
          })();
          return n && n.then ? n.then(e) : e();
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
          var n = (function () {
            if (200 !== t.status)
              return Promise.resolve(t.text()).then(function (t) {
                throw new Error(t);
              });
          })();
          return n && n.then ? n.then(e) : e();
        });
      } catch (t) {
        return Promise.reject(t);
      }
    }),
    (e.file = function (t) {
      try {
        if (
          l(t) !== t ||
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
          var n = (function () {
            if (200 !== t.status)
              return Promise.resolve(t.text()).then(function (t) {
                throw new Error(t);
              });
          })();
          return n && n.then ? n.then(e) : e();
        });
      } catch (t) {
        return Promise.reject(t);
      }
    }),
    (e.delete = function (t) {
      try {
        if (
          l(t) !== t ||
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
          l(t) !== t ||
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
          l(t) !== t ||
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
                "x-mc-download": n.URL,
                authorization: "Bearer " + this.config.token,
              },
            }
          )
        ).then(function (t) {
          function e(e) {
            return t.text();
          }
          var n = (function () {
            if (200 !== t.status)
              return Promise.resolve(t.text()).then(function (t) {
                throw new Error(t);
              });
          })();
          return n && n.then ? n.then(e) : e();
        });
      } catch (t) {
        return Promise.reject(t);
      }
    }),
    t
  );
})();
export {
  t as STATUS,
  w as default,
  h as isCreated,
  v as isDone,
  D as isError,
  O as isFound,
  m as isNotFound,
  E as isResolved,
  d as isSubmitted,
  p as isUploaded,
};
//# sourceMappingURL=fingerprint-web.m.js.map
