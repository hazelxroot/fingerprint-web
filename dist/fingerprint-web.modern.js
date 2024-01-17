const t = [
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
var e, n, o;
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
})(e || (e = {})),
  (function (t) {
    (t.UNKNOWN_ISRC = "Unknown ISRC"),
      (t.FAILED_TO_SUBMIT = "Failed to submit"),
      (t.FAILED_TO_PROCESS = "Failed to process");
  })(n || (n = {})),
  (function (t) {
    (t.URL = "url"), (t.REDIRECT = "redirect");
  })(o || (o = {}));
class r extends Error {
  constructor(t, e) {
    super(t),
      (this.statusCode = void 0),
      (this.statusCode = e),
      Object.setPrototypeOf(this, r.prototype);
  }
}
function a(t) {
  return t
    .replace(/((\r\n)|\r|\n)+/gm, "")
    .replace(/\\/gm, "/")
    .replace(/(\/|^)[\._\-\/]+\//g, "/");
}
function i(e) {
  const n = e.split(".").pop();
  if (!n) throw new r(`${e} is missing an extension`, 400);
  if (!t.includes(`.${n.toLowerCase()}`))
    throw new r(`${n} extension is not supported`, 415);
  return `${a(e.substring(0, e.length - (n.length + 1)))}.${n.toLowerCase()}`;
}
function s(t, n = !0) {
  return n
    ? t.status === e.CREATED
    : [
        e.CREATED,
        e.UPLOADED,
        e.SUBMITTED,
        e.NOT_FOUND,
        e.RESOLVED,
        e.FOUND,
        e.DONE,
      ].includes(t.status);
}
function c(t, n = !0) {
  return n
    ? t.status === e.UPLOADED
    : [
        e.UPLOADED,
        e.SUBMITTED,
        e.NOT_FOUND,
        e.RESOLVED,
        e.FOUND,
        e.DONE,
      ].includes(t.status);
}
function u(t, n = !0) {
  return n
    ? t.status === e.SUBMITTED
    : [e.SUBMITTED, e.NOT_FOUND, e.RESOLVED, e.FOUND, e.DONE].includes(
        t.status
      );
}
function l(t, n = !0) {
  return n
    ? t.status === e.RESOLVED
    : [e.RESOLVED, e.FOUND, e.DONE].includes(t.status);
}
function f(t) {
  return t.status === e.NOT_FOUND;
}
function E(t, n = !0) {
  return n ? t.status === e.FOUND : [e.FOUND, e.DONE].includes(t.status);
}
function h(t) {
  return t.status === e.DONE;
}
function d(t) {
  return t.status === e.ERROR;
}
class w {
  constructor({
    token: t,
    apiUrl: e = "https://w9dxkmzqu6.execute-api.eu-central-1.amazonaws.com",
  }) {
    (this.config = void 0), (this.config = { token: t, apiUrl: e });
  }
  async upload(t, e = () => {}) {
    const n = i(t.name),
      o = await fetch(
        `${this.config.apiUrl.replace(/\/$/, "")}/upload/${encodeURIComponent(
          n
        )}`,
        {
          headers: {
            "x-mc-overwrite": t.overwrite ? "yes" : "no",
            authorization: `Bearer ${this.config.token}`,
          },
        }
      );
    if (200 !== o.status) throw new Error(await o.text());
    const { fields: r, url: a, name: s } = await o.json(),
      c = new FormData(),
      u = new XMLHttpRequest();
    for (const t in r) c.append(t, r[t]);
    return (
      c.append("file", t),
      new Promise((t, n) => {
        (u.onload = () => {
          204 === u.status ? t(s) : n(new Error("Upload Failed"));
        }),
          (u.onerror = n),
          u.upload.addEventListener(
            "progress",
            (t) => {
              e(t.loaded, t.total);
            },
            !1
          ),
          u.open("POST", a, !0),
          u.send(c);
      })
    );
  }
  async folders() {
    const t = await fetch(`${this.config.apiUrl.replace(/\/$/, "")}/audio/`, {
      headers: { authorization: `Bearer ${this.config.token}` },
    });
    if (200 !== t.status) throw new Error(await t.text());
    return (await t.json()).folders;
  }
  async files(t) {
    if (a(t) !== t) throw new Error(`Invalid folder name: ${t}`);
    const e = await fetch(
      `${this.config.apiUrl.replace(/\/$/, "")}/audio/${encodeURIComponent(
        t
      )}/`,
      { headers: { authorization: `Bearer ${this.config.token}` } }
    );
    if (200 !== e.status) throw new Error(await e.text());
    return (await e.json()).files;
  }
  async file(t) {
    if (i(t) !== t || 2 !== t.split("/").filter((t) => t && t.length).length)
      throw new Error(`Invalid file name: ${t}`);
    const e = await fetch(
      `${this.config.apiUrl.replace(/\/$/, "")}/audio/${encodeURIComponent(t)}`,
      { headers: { authorization: `Bearer ${this.config.token}` } }
    );
    if (200 !== e.status) throw new Error(await e.text());
    return (await e.json()).file;
  }
  async delete(t) {
    if (i(t) !== t || 2 !== t.split("/").filter((t) => t && t.length).length)
      throw new Error(`Invalid file name: ${t}`);
    const e = await fetch(
      `${this.config.apiUrl.replace(/\/$/, "")}/audio/${encodeURIComponent(t)}`,
      {
        method: "DELETE",
        headers: { authorization: `Bearer ${this.config.token}` },
      }
    );
    if (204 !== e.status) throw new Error(await e.text());
  }
  async resubmit(t) {
    if (i(t) !== t || 2 !== t.split("/").filter((t) => t && t.length).length)
      throw new Error(`Invalid file name: ${t}`);
    const e = await fetch(
      `${this.config.apiUrl.replace(/\/$/, "")}/audio/${encodeURIComponent(t)}`,
      {
        method: "POST",
        headers: {
          "x-mc-resubmit": "yes",
          authorization: `Bearer ${this.config.token}`,
        },
      }
    );
    if (204 !== e.status) throw new Error(await e.text());
  }
  async downloadLink(t) {
    if (i(t) !== t || 2 !== t.split("/").filter((t) => t && t.length).length)
      throw new Error(`Invalid file name: ${t}`);
    const e = await fetch(
      `${this.config.apiUrl.replace(/\/$/, "")}/audio/${encodeURIComponent(t)}`,
      {
        headers: {
          "x-mc-download": o.URL,
          authorization: `Bearer ${this.config.token}`,
        },
      }
    );
    if (200 !== e.status) throw new Error(await e.text());
    return e.text();
  }
}
export {
  e as STATUS,
  w as default,
  s as isCreated,
  h as isDone,
  d as isError,
  E as isFound,
  f as isNotFound,
  l as isResolved,
  u as isSubmitted,
  c as isUploaded,
};
//# sourceMappingURL=fingerprint-web.modern.js.map
