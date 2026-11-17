"use strict";
(self["rspackChunkdocs"] = self["rspackChunkdocs"] || []).push([["v"], {
"IW"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* import */ var react_jsx_runtime__rspack_import_0 = __webpack_require__("A8");
/* import */ var _mdx_js_react__rspack_import_1 = __webpack_require__("f");


function _createMdxContent(props) {
    const _components = {
        a: "a",
        code: "code",
        h1: "h1",
        h2: "h2",
        li: "li",
        ol: "ol",
        p: "p",
        pre: "pre",
        span: "span",
        ...(0,_mdx_js_react__rspack_import_1/* .useMDXComponents */.R)(),
        ...props.components
    };
    return (0,react_jsx_runtime__rspack_import_0.jsxs)(react_jsx_runtime__rspack_import_0.Fragment, {
        children: [
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h1, {
                id: "troubleshooting",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#troubleshooting",
                        children: "#"
                    }),
                    "Troubleshooting"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "jsx-syntax-error-from-node_moduleslynx-kitmodal",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#jsx-syntax-error-from-node_moduleslynx-kitmodal",
                        children: "#"
                    }),
                    "JSX syntax error from ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "node_modules/@lynx-kit/modal"
                    })
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "The package ships ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: ".jsx"
                    }),
                    " files and bundlers skip ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "node_modules"
                    }),
                    " by default. Add the package to\n",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "source.include"
                    }),
                    " in your ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "lynx.config.ts"
                    }),
                    ", then restart the dev server:"
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
                    lang: "ts",
                    children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "export"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: " default"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-function)"
                                        },
                                        children: " defineConfig"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "({"
                                    })
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "  source"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: ":"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: " { include"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: ":"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: " ["
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string-expression)"
                                        },
                                        children: "/@lynx-kit/"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "] }"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-punctuation)"
                                        },
                                        children: ","
                                    })
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    style: {
                                        color: "var(--shiki-token-comment)"
                                    },
                                    children: "  // ..."
                                })
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    style: {
                                        color: "var(--shiki-foreground)"
                                    },
                                    children: "});"
                                })
                            })
                        ]
                    })
                })
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "items-are-not-centered",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#items-are-not-centered",
                        children: "#"
                    }),
                    "Items are not centered"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "A Lynx ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "view"
                    }),
                    " defaults to ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "display: linear"
                    }),
                    ", where ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "justify-content"
                    }),
                    " works but ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "align-items"
                    }),
                    " is\nignored. Set the display mode explicitly:"
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
                    lang: "tsx",
                    children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "<"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string-expression)"
                                        },
                                        children: "view"
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
                                        children: "  style"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "="
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "{{"
                                    })
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "    display"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: ":"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string-expression)"
                                        },
                                        children: " 'flex'"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-punctuation)"
                                        },
                                        children: ","
                                    })
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "    flexDirection"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: ":"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string-expression)"
                                        },
                                        children: " 'column'"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-punctuation)"
                                        },
                                        children: ","
                                    })
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "    flex"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: ":"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-constant)"
                                        },
                                        children: " 1"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-punctuation)"
                                        },
                                        children: ","
                                    })
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "    alignItems"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: ":"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string-expression)"
                                        },
                                        children: " 'center'"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-punctuation)"
                                        },
                                        children: ","
                                    })
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "    justifyContent"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: ":"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-string-expression)"
                                        },
                                        children: " 'center'"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-punctuation)"
                                        },
                                        children: ","
                                    })
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    style: {
                                        color: "var(--shiki-foreground)"
                                    },
                                    children: "  }}"
                                })
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    style: {
                                        color: "var(--shiki-foreground)"
                                    },
                                    children: ">"
                                })
                            })
                        ]
                    })
                })
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "If the view does not fill the screen, give the root element a defined size, since ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "flex: 1"
                    }),
                    " needs a\nsized parent."
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "the-modal-does-not-close",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#the-modal-does-not-close",
                        children: "#"
                    }),
                    "The modal does not close"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "onConfirm"
                    }),
                    " never closes the modal. Set ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "visible"
                    }),
                    " to ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "false"
                    }),
                    " in your handler:"
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
                    lang: "tsx",
                    children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "onConfirm"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "="
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "{() => {"
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
                                        children: "  save"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "();"
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
                                        children: "  setOpen"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "("
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-constant)"
                                        },
                                        children: "false"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: ");"
                                    })
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    style: {
                                        color: "var(--shiki-foreground)"
                                    },
                                    children: "}}"
                                })
                            })
                        ]
                    })
                })
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "click-handlers-do-nothing",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#click-handlers-do-nothing",
                        children: "#"
                    }),
                    "Click handlers do nothing"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "Lynx uses ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "bindtap"
                    }),
                    " and ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "catchtap"
                    }),
                    ", not ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "onClick"
                    }),
                    "."
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "the-modal-is-hidden-behind-other-content",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#the-modal-is-hidden-behind-other-content",
                        children: "#"
                    }),
                    "The modal is hidden behind other content"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "Lynx has no portals. Render ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "<Modal>"
                    }),
                    " at the root of the page, not inside a scroll view or a\nclipped container."
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "cant-resolve-lynx-kitmodal-in-a-monorepo",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#cant-resolve-lynx-kitmodal-in-a-monorepo",
                        children: "#"
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "Can't resolve '@lynx-kit/modal'"
                    }),
                    " in a monorepo"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                children: "When you develop the library inside a pnpm workspace, check these in order:"
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.ol, {
                children: [
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            "The ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "name"
                            }),
                            " field in ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "packages/modal/package.json"
                            }),
                            " must be exactly ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "@lynx-kit/modal"
                            }),
                            ". Run\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "pnpm ls -r --depth -1"
                            }),
                            " to see the names pnpm uses."
                        ]
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            "The playground must depend on it: ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "\"@lynx-kit/modal\": \"workspace:*\""
                            }),
                            "."
                        ]
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            "Build output decides the entry. Check ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "dist"
                            }),
                            " and make sure ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "main"
                            }),
                            ", ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "types"
                            }),
                            " and ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "exports"
                            }),
                            " point at\nfiles that exist. See ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                href: "/guide/creating-a-component.html",
                                children: "Creating a component"
                            }),
                            "."
                        ]
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            "Restart the dev server after changing ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "package.json"
                            }),
                            ", since resolution failures are cached."
                        ]
                    }),
                    "\n"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "npm-commands-fail-with-ebaddevengines",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#npm-commands-fail-with-ebaddevengines",
                        children: "#"
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "npm"
                    }),
                    " commands fail with ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "EBADDEVENGINES"
                    })
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "The repository declares pnpm as its package manager, so npm refuses to run inside it. Run ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "npm login"
                    }),
                    "\nand ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "npm org ls"
                    }),
                    " from your home folder, and use ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "pnpm"
                    }),
                    " for everything inside the repository."
                ]
            })
        ]
    });
}
function MDXContent() {
    let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const { wrapper: MDXLayout } = {
        ...(0,_mdx_js_react__rspack_import_1/* .useMDXComponents */.R)(),
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
MDXContent.__RSPRESS_PAGE_META["guide%2Ftroubleshooting.mdx"] = {
    "toc": [
        {
            "id": "jsx-syntax-error-from-node_moduleslynx-kitmodal",
            "text": "JSX syntax error from `node_modules/@lynx-kit/modal`",
            "depth": 2
        },
        {
            "id": "items-are-not-centered",
            "text": "Items are not centered",
            "depth": 2
        },
        {
            "id": "the-modal-does-not-close",
            "text": "The modal does not close",
            "depth": 2
        },
        {
            "id": "click-handlers-do-nothing",
            "text": "Click handlers do nothing",
            "depth": 2
        },
        {
            "id": "the-modal-is-hidden-behind-other-content",
            "text": "The modal is hidden behind other content",
            "depth": 2
        },
        {
            "id": "cant-resolve-lynx-kitmodal-in-a-monorepo",
            "text": "`Can't resolve '@lynx-kit/modal'` in a monorepo",
            "depth": 2
        },
        {
            "id": "npm-commands-fail-with-ebaddevengines",
            "text": "`npm` commands fail with `EBADDEVENGINES`",
            "depth": 2
        }
    ],
    "title": "Troubleshooting",
    "headingTitle": "Troubleshooting",
    "frontmatter": {}
};

__webpack_require__.d(__webpack_exports__, {
}, {
  "default": MDXContent
});


},

}]);