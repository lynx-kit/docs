"use strict";
(self["rspackChunkdocs"] = self["rspackChunkdocs"] || []).push([["vk"], {
"au"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
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
        strong: "strong",
        table: "table",
        tbody: "tbody",
        td: "td",
        th: "th",
        thead: "thead",
        tr: "tr",
        ...(0,_mdx_js_react__rspack_import_1/* .useMDXComponents */.R)(),
        ...props.components
    };
    return (0,react_jsx_runtime__rspack_import_0.jsxs)(react_jsx_runtime__rspack_import_0.Fragment, {
        children: [
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h1, {
                id: "styling-and-theming",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#styling-and-theming",
                        children: "#"
                    }),
                    "Styling and theming"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                children: "Lynx Kit components are styled with Tailwind CSS v3, compiled when the library is built. That has\nthree consequences for you:"
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.ol, {
                children: [
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            "Your app does ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.strong, {
                                children: "not"
                            }),
                            " need Tailwind for the components to look right."
                        ]
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            "Every class inside the library starts with ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "lk-"
                            }),
                            ", for example ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "lk-bg-white"
                            }),
                            ", so the library\ncannot clash with your own classes."
                        ]
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.li, {
                        children: "There are no CSS variables to configure in the host app."
                    }),
                    "\n"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "change-colors-with-props",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#change-colors-with-props",
                        children: "#"
                    }),
                    "Change colors with props"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                children: "The quickest way to theme a component is through its color props. They accept any CSS color and are\napplied inline:"
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
                                        children: "  visible"
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
                                        children: "  onClose"
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
                                        children: "  title"
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
                                        children: "\"Sign out?\""
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
                                        children: "  confirmText"
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
                                        children: "\"Sign out\""
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
                                        children: "  accentColor"
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
                                        children: "\"#0ea5e9\""
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
                                        children: "  surfaceColor"
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
                                        children: "\"#0f172a\""
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
                                        children: "  overlayColor"
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
                                        children: "\"rgba(0, 0, 0, 0.7)\""
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
                                    children: "/>"
                                })
                            })
                        ]
                    })
                })
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.table, {
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.thead, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tr, {
                            children: [
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.th, {
                                    children: "Prop"
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.th, {
                                    children: "What it changes"
                                })
                            ]
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tbody, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tr, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                            children: "accentColor"
                                        })
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                        children: "The icon badge and the confirm button"
                                    })
                                ]
                            }),
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tr, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                            children: "surfaceColor"
                                        })
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                        children: "The card background"
                                    })
                                ]
                            }),
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tr, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                            children: "overlayColor"
                                        })
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                        children: "The dimmed backdrop"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "extend-with-classes",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#extend-with-classes",
                        children: "#"
                    }),
                    "Extend with classes"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "Every component accepts ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "className"
                    }),
                    " for the card and ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "overlayClassName"
                    }),
                    " for the backdrop. These\nclasses are added after the defaults."
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "If your app uses Tailwind v3, use the ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "!"
                    }),
                    " (important) modifier to win over a default:"
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
                    children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
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
                                        color: "var(--shiki-token-constant)"
                                    },
                                    children: "Modal"
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    style: {
                                        color: "var(--shiki-token-function)"
                                    },
                                    children: " className"
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
                                    children: "\"!bg-slate-900\""
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    style: {
                                        color: "var(--shiki-token-function)"
                                    },
                                    children: " overlayClassName"
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
                                    children: "\"!bg-black/80\""
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    style: {
                                        color: "var(--shiki-token-function)"
                                    },
                                    children: " visible"
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
                                    children: "{open} "
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    style: {
                                        color: "var(--shiki-token-function)"
                                    },
                                    children: "onClose"
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
                                    children: "{close} />"
                                })
                            ]
                        })
                    })
                })
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "Those classes are generated by ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.strong, {
                        children: "your"
                    }),
                    " Tailwind build, not the library's, so the app must have\nTailwind configured. Otherwise, use the color props above."
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "using-tailwind-in-your-own-lynx-app",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#using-tailwind-in-your-own-lynx-app",
                        children: "#"
                    }),
                    "Using Tailwind in your own Lynx app"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "Lynx currently requires Tailwind CSS v3. The v4 packages are not compatible with\n",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "@lynx-js/tailwind-preset"
                    }),
                    ", which removes the utilities Lynx does not support and swaps in\nLynx-specific alternatives. The preset is still marked unstable."
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
                                    children: " add"
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    style: {
                                        color: "var(--shiki-token-string)"
                                    },
                                    children: " -D"
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    style: {
                                        color: "var(--shiki-token-string)"
                                    },
                                    children: " tailwindcss@^3"
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    style: {
                                        color: "var(--shiki-token-string)"
                                    },
                                    children: " @lynx-js/tailwind-preset"
                                })
                            ]
                        })
                    })
                })
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
                    title: "postcss.config.mjs",
                    lang: "js",
                    children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
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
                                        color: "var(--shiki-foreground)"
                                    },
                                    children: " { plugins"
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
                                    children: " { tailwindcss"
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
                                    children: " {} } };"
                                })
                            ]
                        })
                    })
                })
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
                    title: "tailwind.config.mjs",
                    lang: "js",
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
                                        children: " lynxPreset "
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
                                        children: " '@lynx-js/tailwind-preset'"
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
                                        children: " default"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: " {"
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
                                        children: "  content"
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
                                        children: "'./src/**/*.{js,ts,jsx,tsx}'"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: "]"
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
                                        children: "  presets"
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
                                        children: " [lynxPreset]"
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
                                    children: "};"
                                })
                            })
                        ]
                    })
                })
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
                    title: "src/App.css",
                    lang: "css",
                    children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                className: "line",
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-token-keyword)"
                                        },
                                        children: "@tailwind"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: " base;"
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
                                        children: "@tailwind"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        style: {
                                            color: "var(--shiki-foreground)"
                                        },
                                        children: " utilities;"
                                    })
                                ]
                            })
                        ]
                    })
                })
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "animation",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#animation",
                        children: "#"
                    }),
                    "Animation"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                children: "Animation values (opacity, scale, translate and duration) are inline styles, because they change with\nstate and not every Tailwind transition or transform utility is supported by the Lynx preset."
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
MDXContent.__RSPRESS_PAGE_META["guide%2Fstyling.mdx"] = {
    "toc": [
        {
            "id": "change-colors-with-props",
            "text": "Change colors with props",
            "depth": 2
        },
        {
            "id": "extend-with-classes",
            "text": "Extend with classes",
            "depth": 2
        },
        {
            "id": "using-tailwind-in-your-own-lynx-app",
            "text": "Using Tailwind in your own Lynx app",
            "depth": 2
        },
        {
            "id": "animation",
            "text": "Animation",
            "depth": 2
        }
    ],
    "title": "Styling and theming",
    "headingTitle": "Styling and theming",
    "frontmatter": {}
};

__webpack_require__.d(__webpack_exports__, {
}, {
  "default": MDXContent
});


},

}]);