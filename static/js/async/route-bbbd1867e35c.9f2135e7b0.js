"use strict";
(self["rspackChunkdocs"] = self["rspackChunkdocs"] || []).push([[7], {
"DG"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
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
                id: "quick-start",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#quick-start",
                        children: "#"
                    }),
                    "Quick start"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                children: "Show your first modal in a few minutes."
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_theme__rspack_import_1/* .Steps */.gj, {
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "install-and-configure",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#install-and-configure",
                                children: "#"
                            }),
                            "Install and configure"
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "Follow ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                href: "/guide/get-started/installation.html",
                                children: "Installation"
                            }),
                            " to add ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "@lynx-kit/modal"
                            }),
                            " and the\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "source.include"
                            }),
                            " entry."
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "add-the-modal-to-a-page",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#add-the-modal-to-a-page",
                                children: "#"
                            }),
                            "Add the modal to a page"
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "Keep the open state in your component and render ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "<Modal>"
                            }),
                            " at the root of the page:"
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
                            title: "src/App.tsx",
                            lang: "tsx",
                            children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "import"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " { useState } "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "from"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " '@lynx-js/react'"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ";"
                                            })
                                        ]
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "import"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " { Modal } "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "from"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " '@lynx-kit/modal'"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ";"
                                            })
                                        ]
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        className: "line"
                                    }),
                                    "\n",
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
                                                children: " function"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " App"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "() {"
                                            })
                                        ]
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  const"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " ["
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: "open"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ","
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " setOpen"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "] "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "="
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " useState"
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
                                        className: "line"
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  return"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " ("
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
                                                children: "    <"
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
                                                children: "      style"
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
                                                children: "        display"
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
                                                children: "        flexDirection"
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
                                                children: "        flex"
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
                                                children: "        alignItems"
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
                                                children: "        justifyContent"
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
                                            children: "      }}"
                                        })
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        className: "line",
                                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-foreground)"
                                            },
                                            children: "    >"
                                        })
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "      <"
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
                                                children: "        style"
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
                                                children: "{{ padding"
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
                                                children: " '12px 24px'"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ","
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " borderRadius"
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
                                                children: " '16px'"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ","
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " backgroundColor"
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
                                                children: " '#6366f1'"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " }}"
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
                                                children: "        bindtap"
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
                                                children: "{() "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "=>"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " setOpen"
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
                                                children: "true"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ")}"
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
                                            children: "      >"
                                        })
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "        <"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "text"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " style"
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
                                                children: "{{ color"
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
                                                children: " '#ffffff'"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " }}>Show modal</"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "text"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ">"
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
                                                children: "      </"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "view"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ">"
                                            })
                                        ]
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        className: "line"
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "      <"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: "Modal"
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
                                                children: "        visible"
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
                                                children: "{open}"
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
                                                children: "        onClose"
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
                                                children: "{() "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "=>"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " setOpen"
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
                                                children: ")}"
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
                                                children: "        title"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "="
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "\"Delete project?\""
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
                                                children: "        description"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "="
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "\"This action can't be undone.\""
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
                                                children: "        confirmText"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "="
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "\"Delete\""
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
                                                children: "        accentColor"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "="
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "\"#ef4444\""
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
                                                children: "        onConfirm"
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
                                                children: "{() "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "=>"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " setOpen"
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
                                                children: ")}"
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
                                            children: "      />"
                                        })
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "    </"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "view"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ">"
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
                                            children: "  );"
                                        })
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        className: "line",
                                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-foreground)"
                                            },
                                            children: "}"
                                        })
                                    })
                                ]
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "run-it",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#run-it",
                                children: "#"
                            }),
                            "Run it"
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
                                            children: "pnpm"
                                        }),
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-string)"
                                            },
                                            children: " dev"
                                        })
                                    ]
                                })
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                        children: "Scan the QR code with Lynx Explorer and tap the button."
                    })
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "things-to-know",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#things-to-know",
                        children: "#"
                    }),
                    "Things to know"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.ul, {
                children: [
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.strong, {
                                children: "Controlled component."
                            }),
                            " ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "onConfirm"
                            }),
                            " does not close the modal. Your code decides what happens, and\nyou close it by setting ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "visible"
                            }),
                            " to ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "false"
                            }),
                            "."
                        ]
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.strong, {
                                children: "Tap handlers."
                            }),
                            " Lynx uses ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "bindtap"
                            }),
                            ", not ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "onClick"
                            }),
                            "."
                        ]
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.strong, {
                                children: "Render at the page root."
                            }),
                            " Lynx has no portals, so the overlay covers whichever view it is\nrendered in. Place ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "<Modal>"
                            }),
                            " near the top of your page component."
                        ]
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.strong, {
                                children: "Layout."
                            }),
                            " A Lynx ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "view"
                            }),
                            " uses a linear layout by default, so set ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "display: 'flex'"
                            }),
                            " when you\nwant ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "align-items"
                            }),
                            " to apply. See ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                href: "/guide/troubleshooting.html",
                                children: "Troubleshooting"
                            }),
                            "."
                        ]
                    }),
                    "\n"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "Next, read the full ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        href: "/apis/modal.html",
                        children: "Modal API"
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
MDXContent.__RSPRESS_PAGE_META["guide%2Fget-started%2Fquick-start.mdx"] = {
    "toc": [
        {
            "id": "things-to-know",
            "text": "Things to know",
            "depth": 2
        }
    ],
    "title": "Quick start",
    "headingTitle": "Quick start",
    "frontmatter": {}
};

__webpack_require__.d(__webpack_exports__, {
}, {
  "default": MDXContent
});


},

}]);