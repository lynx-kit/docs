"use strict";
(self["rspackChunkdocs"] = self["rspackChunkdocs"] || []).push([["h"], {
"VA"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* import */ var react_jsx_runtime__rspack_import_0 = __webpack_require__("A8");
/* import */ var _mdx_js_react__rspack_import_2 = __webpack_require__("f");
/* import */ var _theme__rspack_import_1 = __webpack_require__("L");



function _createMdxContent(props) {
    const _components = {
        a: "a",
        code: "code",
        h1: "h1",
        h2: "h2",
        h3: "h3",
        li: "li",
        p: "p",
        pre: "pre",
        span: "span",
        strong: "strong",
        ul: "ul",
        ...(0,_mdx_js_react__rspack_import_2/* .useMDXComponents */.R)(),
        ...props.components
    };
    return (0,react_jsx_runtime__rspack_import_0.jsxs)(react_jsx_runtime__rspack_import_0.Fragment, {
        children: [
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h1, {
                id: "publishing-to-npm",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#publishing-to-npm",
                        children: "#"
                    }),
                    "Publishing to npm"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "How to publish a package from the workspace to the ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "@lynx-kit"
                    }),
                    " scope."
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "before-the-first-publish",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#before-the-first-publish",
                        children: "#"
                    }),
                    "Before the first publish"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.ul, {
                children: [
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "src/index.ts"
                            }),
                            " exports the component you are shipping."
                        ]
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "packages/<name>/README.md"
                            }),
                            " has the install command, a props table and a usage example."
                        ]
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "packages/<name>/LICENSE"
                            }),
                            " contains the MIT license text. Without it the package declares a license\nit does not include."
                        ]
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "pnpm --filter \"@lynx-kit/<name>\" build"
                            }),
                            " succeeds and ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "dist/"
                            }),
                            " contains the ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: ".jsx"
                            }),
                            ", ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: ".d.ts"
                            }),
                            " and\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: ".css"
                            }),
                            " files."
                        ]
                    }),
                    "\n"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "publish",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#publish",
                        children: "#"
                    }),
                    "Publish"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_theme__rspack_import_1/* .Steps */.gj, {
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "turn-on-two-factor-authentication",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#turn-on-two-factor-authentication",
                                children: "#"
                            }),
                            "Turn on two-factor authentication"
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "npm requires 2FA for publishing. On npmjs.com open ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.strong, {
                                children: "Account"
                            }),
                            ", then ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.strong, {
                                children: "Two-Factor Authentication"
                            }),
                            ",\nand enable it with the ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.strong, {
                                children: "Authorization and publishing"
                            }),
                            " level. Without it, the registry answers with\na ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "403 Forbidden"
                            }),
                            " and never asks for a one-time code."
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "log-in-and-confirm-ownership",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#log-in-and-confirm-ownership",
                                children: "#"
                            }),
                            "Log in and confirm ownership"
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "Run these from your home folder, not from the repository. The repository declares pnpm as its package\nmanager, so npm refuses to run inside it (",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "EBADDEVENGINES"
                            }),
                            ")."
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsx)(react_jsx_runtime__rspack_import_0.Fragment, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.pre, {
                            className: "shiki css-variables",
                            style: {
                                backgroundColor: "var(--shiki-background)",
                                color: "var(--shiki-foreground)"
                            },
                            tabIndex: "0",
                            lang: "bash",
                            children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "cd"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " ~"
                                            })
                                        ]
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "npm"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " login"
                                            })
                                        ]
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "npm"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " whoami"
                                            })
                                        ]
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "npm"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " org"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " ls"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " lynx-kit"
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "You should appear in the list with the ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "owner"
                            }),
                            " role."
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "inspect-what-will-ship",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#inspect-what-will-ship",
                                children: "#"
                            }),
                            "Inspect what will ship"
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsx)(react_jsx_runtime__rspack_import_0.Fragment, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.pre, {
                            className: "shiki css-variables",
                            style: {
                                backgroundColor: "var(--shiki-background)",
                                color: "var(--shiki-foreground)"
                            },
                            tabIndex: "0",
                            lang: "bash",
                            children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "cd"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " packages/modal"
                                            })
                                        ]
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "pnpm"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " build"
                                            })
                                        ]
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "pnpm"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " publish"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " --dry-run"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " --no-git-checks"
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "The tarball should contain only ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "dist/"
                            }),
                            ", ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "package.json"
                            }),
                            ", ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "README.md"
                            }),
                            " and ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "LICENSE"
                            }),
                            "."
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "publish-1",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#publish-1",
                                children: "#"
                            }),
                            "Publish"
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsx)(react_jsx_runtime__rspack_import_0.Fragment, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.pre, {
                            className: "shiki css-variables",
                            style: {
                                backgroundColor: "var(--shiki-background)",
                                color: "var(--shiki-foreground)"
                            },
                            tabIndex: "0",
                            lang: "bash",
                            children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                    className: "line",
                                    children: [
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-function)"
                                            },
                                            children: "npm"
                                        }),
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-string)"
                                            },
                                            children: " publish"
                                        }),
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-string)"
                                            },
                                            children: " --access"
                                        }),
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-string)"
                                            },
                                            children: " public"
                                        })
                                    ]
                                })
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "npm opens a browser prompt (or asks for a one-time code). Scoped packages default to private, so\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "--access public"
                            }),
                            " is required. The ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "publishConfig"
                            }),
                            " in ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "package.json"
                            }),
                            " already sets it."
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "verify",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#verify",
                                children: "#"
                            }),
                            "Verify"
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsx)(react_jsx_runtime__rspack_import_0.Fragment, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.pre, {
                            className: "shiki css-variables",
                            style: {
                                backgroundColor: "var(--shiki-background)",
                                color: "var(--shiki-foreground)"
                            },
                            tabIndex: "0",
                            lang: "bash",
                            children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "cd"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " ~"
                                            })
                                        ]
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "npm"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " view"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " @lynx-kit/modal"
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                        children: "Then install it in a fresh Rspeedy app outside the monorepo and render it."
                    })
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "releasing-a-new-version",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#releasing-a-new-version",
                        children: "#"
                    }),
                    "Releasing a new version"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                children: "Versions are permanent. You cannot republish a version number, so bump it first:"
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsx)(react_jsx_runtime__rspack_import_0.Fragment, {
                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.pre, {
                    className: "shiki css-variables",
                    style: {
                        backgroundColor: "var(--shiki-background)",
                        color: "var(--shiki-foreground)"
                    },
                    tabIndex: "0",
                    lang: "bash",
                    children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-function)"
                                        },
                                        children: "pnpm"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string)"
                                        },
                                        children: " changeset"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-comment)"
                                        },
                                        children: "          # pick the package, choose major, minor or patch, write a summary"
                                    })
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-function)"
                                        },
                                        children: "pnpm"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string)"
                                        },
                                        children: " changeset"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string)"
                                        },
                                        children: " version"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-comment)"
                                        },
                                        children: "  # bumps the version and writes CHANGELOG.md"
                                    })
                                ]
                            })
                        ]
                    })
                })
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                children: "Then publish again from the package folder."
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "giving-your-team-access",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#giving-your-team-access",
                        children: "#"
                    }),
                    "Giving your team access"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "After the first publish, open the organization's ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.strong, {
                        children: "Teams"
                    }),
                    " page on npmjs.com, add the package to a\nteam and choose read-only or read/write. The package list stays empty until a package exists."
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "publishing-from-ci",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#publishing-from-ci",
                        children: "#"
                    }),
                    "Publishing from CI"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                children: "npm is restricting tokens that bypass 2FA for direct publishing. When you automate releases, use\nnpm's trusted publishing (OIDC) from GitHub Actions instead of a long-lived token."
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "test-the-tarball-before-you-publish",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#test-the-tarball-before-you-publish",
                        children: "#"
                    }),
                    "Test the tarball before you publish"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsx)(react_jsx_runtime__rspack_import_0.Fragment, {
                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.pre, {
                    className: "shiki css-variables",
                    style: {
                        backgroundColor: "var(--shiki-background)",
                        color: "var(--shiki-foreground)"
                    },
                    tabIndex: "0",
                    lang: "bash",
                    children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-function)"
                                        },
                                        children: "cd"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string)"
                                        },
                                        children: " packages/modal"
                                    })
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-function)"
                                        },
                                        children: "pnpm"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string)"
                                        },
                                        children: " pack"
                                    })
                                ]
                            })
                        ]
                    })
                })
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "In a fresh Rspeedy app run ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "pnpm add path/to/lynx-kit-modal-0.1.0.tgz"
                    }),
                    ". If you hit a JSX error, add\n",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "source.include"
                    }),
                    " as described in ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        href: "/guide/get-started/installation.html",
                        children: "Installation"
                    }),
                    "."
                ]
            })
        ]
    });
}
function MDXContent() {
    let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { wrapper: MDXLayout } = {
        ...(0,_mdx_js_react__rspack_import_2/* .useMDXComponents */.R)(),
        ...props.components
    };
    return MDXLayout ? (0,react_jsx_runtime__rspack_import_0.jsx)(MDXLayout, {
        ...props,
        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_createMdxContent, {
            ...props
        })
    }) : _createMdxContent(props);
}
MDXContent.__RSPRESS_PAGE_META = {};
MDXContent.__RSPRESS_PAGE_META["guide%2Fpublishing.mdx"] = {
    "toc": [
        {
            "id": "before-the-first-publish",
            "text": "Before the first publish",
            "depth": 2
        },
        {
            "id": "publish",
            "text": "Publish",
            "depth": 2
        },
        {
            "id": "releasing-a-new-version",
            "text": "Releasing a new version",
            "depth": 2
        },
        {
            "id": "giving-your-team-access",
            "text": "Giving your team access",
            "depth": 2
        },
        {
            "id": "publishing-from-ci",
            "text": "Publishing from CI",
            "depth": 2
        },
        {
            "id": "test-the-tarball-before-you-publish",
            "text": "Test the tarball before you publish",
            "depth": 2
        }
    ],
    "title": "Publishing to npm",
    "headingTitle": "Publishing to npm",
    "frontmatter": {}
};

__webpack_require__.d(__webpack_exports__, {
}, {
  "default": MDXContent
});


},

}]);