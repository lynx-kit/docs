"use strict";
(self["rspackChunkdocs"] = self["rspackChunkdocs"] || []).push([["l"], {
"pw"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
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
                id: "creating-a-component",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#creating-a-component",
                        children: "#"
                    }),
                    "Creating a component"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "This guide shows how ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "@lynx-kit/modal"
                    }),
                    " was built, so you can add the next component to the kit\n(a bottom sheet, a toast and so on) the same way. Every component is its own package in a pnpm\nworkspace, with a playground app to try it in."
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "workspace-layout",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#workspace-layout",
                        children: "#"
                    }),
                    "Workspace layout"
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
                    lang: "text",
                    children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    children: "lynx-kit/"
                                })
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    children: "├─ package.json"
                                })
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    children: "├─ pnpm-workspace.yaml"
                                })
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    children: "├─ .changeset/"
                                })
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    children: "├─ packages/"
                                })
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    children: "│  └─ modal/          -> @lynx-kit/modal"
                                })
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    children: "└─ apps/"
                                })
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    children: "   ├─ playground/     -> an Rspeedy app used to try components"
                                })
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                className: "line",
                                children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                    children: "   └─ docs/           -> this website"
                                })
                            })
                        ]
                    })
                })
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_theme__rspack_import_1/* .Steps */.gj, {
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "create-the-workspace",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#create-the-workspace",
                                children: "#"
                            }),
                            "Create the workspace"
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
                                                children: "mkdir"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " lynx-kit"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: " &&"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " cd"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " lynx-kit"
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
                                                children: " init"
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
                                                children: "mkdir"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " packages"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " apps"
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsx)(react_jsx_runtime__rspack_import_0.Fragment, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.pre, {
                            className: "shiki css-variables",
                            style: {
                                backgroundColor: "var(--shiki-background)",
                                color: "var(--shiki-foreground)"
                            },
                            tabIndex: "0",
                            title: "pnpm-workspace.yaml",
                            lang: "yaml",
                            children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "packages"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: ":"
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
                                                children: "  - "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "'packages/*'"
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
                                                children: "  - "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "'apps/*'"
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsx)(react_jsx_runtime__rspack_import_0.Fragment, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.pre, {
                            className: "shiki css-variables",
                            style: {
                                backgroundColor: "var(--shiki-background)",
                                color: "var(--shiki-foreground)"
                            },
                            tabIndex: "0",
                            title: "package.json (root)",
                            lang: "json",
                            children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        className: "line",
                                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-foreground)"
                                            },
                                            children: "{"
                                        })
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"private\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " true"
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"scripts\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "    \"build\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"pnpm -r --filter './packages/*' build\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "    \"release\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"pnpm build && changeset publish\""
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
                                            children: "  }"
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
                                            children: " -Dw"
                                        }),
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-string)"
                                            },
                                            children: " @changesets/cli"
                                        }),
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-punctuation)"
                                            },
                                            children: " &&"
                                        }),
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-function)"
                                            },
                                            children: " pnpm"
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
                                            children: " init"
                                        })
                                    ]
                                })
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "In ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: ".changeset/config.json"
                            }),
                            ", set ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "\"access\": \"public\""
                            }),
                            "."
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "scaffold-the-library-package",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#scaffold-the-library-package",
                                children: "#"
                            }),
                            "Scaffold the library package"
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
                                            children: " create"
                                        }),
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-string)"
                                            },
                                            children: " @lynx-js/lynx@latest"
                                        }),
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-string)"
                                            },
                                            children: " packages/modal"
                                        }),
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-string)"
                                            },
                                            children: " --template"
                                        }),
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-string)"
                                            },
                                            children: " rslib-react-ts"
                                        })
                                    ]
                                })
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "The template creates a Rslib project with a ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "Counter"
                            }),
                            " example. Keep its ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "rslib.config.ts"
                            }),
                            ": it must\nkeep ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "target: \"web\""
                            }),
                            ", preserve JSX and build in bundleless mode (",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "bundle: false"
                            }),
                            "), so that ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "dist/"
                            }),
                            "\nkeeps ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "import './styles.css'"
                            }),
                            " and emits the CSS next to the JavaScript."
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "name-the-package",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#name-the-package",
                                children: "#"
                            }),
                            "Name the package"
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "The template names the package after its folder (",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "modal"
                            }),
                            "). pnpm links workspace packages by the\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "name"
                            }),
                            " field, so change it to the scoped name:"
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
                            title: "packages/modal/package.json",
                            lang: "json",
                            children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        className: "line",
                                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-foreground)"
                                            },
                                            children: "{"
                                        })
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"name\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"@lynx-kit/modal\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"version\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"0.1.0\""
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
                                            children: "}"
                                        })
                                    })
                                ]
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "set-up-tailwind-v3-with-a-prefix",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#set-up-tailwind-v3-with-a-prefix",
                                children: "#"
                            }),
                            "Set up Tailwind v3 with a prefix"
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
                                ]
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsx)(react_jsx_runtime__rspack_import_0.Fragment, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.pre, {
                            className: "shiki css-variables",
                            style: {
                                backgroundColor: "var(--shiki-background)",
                                color: "var(--shiki-foreground)"
                            },
                            tabIndex: "0",
                            title: "packages/modal/tailwind.config.mjs",
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
                                                children: "  prefix"
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
                                                children: " 'lk-'"
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
                                                children: "'./src/**/*.{ts,tsx}'"
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
                    (0,react_jsx_runtime__rspack_import_0.jsx)(react_jsx_runtime__rspack_import_0.Fragment, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.pre, {
                            className: "shiki css-variables",
                            style: {
                                backgroundColor: "var(--shiki-background)",
                                color: "var(--shiki-foreground)"
                            },
                            tabIndex: "0",
                            title: "packages/modal/postcss.config.mjs",
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
                    (0,react_jsx_runtime__rspack_import_0.jsx)(react_jsx_runtime__rspack_import_0.Fragment, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.pre, {
                            className: "shiki css-variables",
                            style: {
                                backgroundColor: "var(--shiki-background)",
                                color: "var(--shiki-foreground)"
                            },
                            tabIndex: "0",
                            title: "packages/modal/src/styles.css",
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
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "The library runs Tailwind at build time, so apps do not need to scan ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "node_modules"
                            }),
                            " for class names.\nThe ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "lk-"
                            }),
                            " prefix keeps the library's classes from clashing with the app's own."
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "write-the-component",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#write-the-component",
                                children: "#"
                            }),
                            "Write the component"
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "Create ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "src/Modal.tsx"
                            }),
                            ". Layout, color and typography come from ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "lk-"
                            }),
                            " classes. Animation values live\nin inline styles because they depend on state."
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
                            title: "packages/modal/src/Modal.tsx",
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
                                                children: " { useEffect"
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
                                                children: " useState } "
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: " type"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " { ReactNode } "
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
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " './styles.css'"
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
                                                children: "const"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " DURATION"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: " ="
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " 240"
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
                                                children: "function"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " usePresence"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "(visible"
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
                                                children: " boolean"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ") {"
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
                                                children: "mounted"
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
                                                children: " setMounted"
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
                                                children: "(visible);"
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
                                                children: "shown"
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
                                                children: " setShown"
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
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "  useEffect"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "(() "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "=>"
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "    if"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " (visible) {"
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
                                                children: "      setMounted"
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
                                                children: ");"
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
                                                children: "      const"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " t"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: " ="
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " setTimeout"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "(() "
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
                                                children: " setShown"
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
                                                children: ")"
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
                                                children: " 16"
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
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "      return"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " () "
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
                                                children: " clearTimeout"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "(t);"
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
                                            children: "    }"
                                        })
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "    setShown"
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
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "    const"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " t"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: " ="
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " setTimeout"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "(() "
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
                                                children: " setMounted"
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
                                                children: ")"
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
                                                children: " DURATION"
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
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "    return"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " () "
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
                                                children: " clearTimeout"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "(t);"
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
                                                children: "  }"
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
                                                children: " [visible]);"
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
                                                children: " { mounted"
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
                                                children: " shown };"
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
                                            children: "}"
                                        })
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
                                                children: " interface"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " ModalProps"
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
                                                children: "  visible"
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
                                                children: " boolean"
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
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "  onClose"
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
                                                children: " () "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "=>"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " void"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "  title"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " string"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "  description"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " string"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "  icon"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " ReactNode"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "  children"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " ReactNode"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "  confirmText"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " string"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "  cancelText"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " string"
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
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "  onConfirm"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " () "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "=>"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " void"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "  footer"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " ReactNode"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "  closeOnOverlayTap"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " boolean"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "  accentColor"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " string"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "  surfaceColor"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " string"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "  overlayColor"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " string"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "  className"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " string"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "  overlayClassName"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?:"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " string"
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
                                        className: "line",
                                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-foreground)"
                                            },
                                            children: "}"
                                        })
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
                                                children: " Modal"
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
                                                children: "  visible"
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
                                                children: "  onClose"
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
                                                children: "  title"
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
                                                children: "  description"
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
                                                children: "  icon"
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
                                                children: "  children"
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
                                                children: "  confirmText"
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
                                                children: "  cancelText "
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
                                                children: " 'Cancel'"
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
                                                children: "  onConfirm"
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
                                                children: "  footer"
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
                                                children: "  closeOnOverlayTap "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "="
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " true"
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
                                                children: "  accentColor"
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
                                                children: "  surfaceColor"
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
                                                children: "  overlayColor "
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
                                                children: " 'rgba(10, 12, 24, 0.55)'"
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
                                                children: "  className "
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
                                                children: " ''"
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
                                                children: "  overlayClassName "
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
                                                children: " ''"
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
                                                children: "}"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " ModalProps"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ") {"
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
                                                children: " { "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: "mounted"
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
                                                children: " shown"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " } "
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
                                                children: " usePresence"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "(visible);"
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
                                                children: "  if"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " ("
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "!"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "mounted) "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "return"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " null"
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
                                                children: "  const"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " accent"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: " ="
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " accentColor "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " { backgroundColor"
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
                                                children: " accentColor } "
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
                                                children: " undefined"
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
                                                children: "      className"
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
                                                children: "{"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "`lk-fixed lk-top-0 lk-left-0 lk-right-0 lk-bottom-0 lk-flex lk-flex-col lk-items-center lk-justify-center "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "${"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "overlayClassName"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "}"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "`"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "}"
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
                                                children: "        zIndex"
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
                                                children: " 1000"
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
                                                children: "        backgroundColor"
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
                                                children: " shown "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " overlayColor "
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
                                                children: " 'rgba(0, 0, 0, 0)'"
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
                                                children: "        transition"
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
                                                children: " `background-color "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "${"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: "DURATION"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "}"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "ms ease`"
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
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "      bindtap"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " closeOnOverlayTap "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "&&"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: " onClose"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "()}"
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
                                                children: "        className"
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
                                                children: "{"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "`lk-flex lk-flex-col lk-items-center lk-w-5/6 lk-px-6 lk-pt-7 lk-pb-5 lk-bg-white lk-rounded-3xl "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "${"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "className"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "}"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "`"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "}"
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
                                                children: "          maxWidth"
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
                                                children: " '360px'"
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "          ..."
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: "(surfaceColor "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " { backgroundColor"
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
                                                children: " surfaceColor } "
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
                                                children: " null"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ")"
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
                                                children: "          opacity"
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
                                                children: " shown "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " 1"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: " :"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: " 0"
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
                                                children: "          transform"
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
                                                children: " shown "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "?"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " 'scale(1) translateY(0px)'"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: " :"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " 'scale(0.92) translateY(16px)'"
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
                                                children: "          transition"
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
                                                children: " `opacity "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "${"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: "DURATION"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "}"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "ms ease, transform "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "${"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-constant)"
                                                },
                                                children: "DURATION"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "}"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "ms ease`"
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
                                                children: "          boxShadow"
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
                                                children: " '0 24px 60px rgba(10, 12, 24, 0.28)'"
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
                                            children: "        }}"
                                        })
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-function)"
                                                },
                                                children: "        catchtap"
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
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " {}}"
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
                                                children: "        {icon "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "&&"
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
                                                children: "          <"
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
                                                children: "            className"
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
                                                children: "\"lk-flex lk-items-center lk-justify-center lk-w-14 lk-h-14 lk-mb-4 lk-rounded-full lk-bg-indigo-500\""
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
                                                children: "            style"
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
                                                children: "{accent}"
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
                                            children: "          >"
                                        })
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        className: "line",
                                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-foreground)"
                                            },
                                            children: "            {icon}"
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
                                                children: "          </"
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
                                            children: "        )}"
                                        })
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
                                                children: "        {title "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "&&"
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
                                                children: "          <"
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
                                                children: "\"lk-text-xl lk-font-bold lk-text-center lk-text-slate-900\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ">{title}</"
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
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        className: "line",
                                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-foreground)"
                                            },
                                            children: "        )}"
                                        })
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
                                                children: "        {description "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "&&"
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
                                                children: "          <"
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
                                                children: "\"lk-mt-2 lk-text-sm lk-text-center lk-text-slate-500\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ">{description}</"
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
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        className: "line",
                                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-foreground)"
                                            },
                                            children: "        )}"
                                        })
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
                                                children: "        {children "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "&&"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " <"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "view"
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
                                                children: "\"lk-w-full lk-mt-4\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ">{children}</"
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
                                                children: ">}"
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
                                                children: "        {footer "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "??"
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
                                                children: "          <"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: "view"
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
                                                children: "\"lk-flex lk-flex-row lk-gap-3 lk-w-full lk-mt-6\""
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
                                                children: "            <"
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
                                                children: "              className"
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
                                                children: "\"lk-flex lk-flex-1 lk-items-center lk-justify-center lk-h-12 lk-rounded-2xl lk-bg-slate-100\""
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
                                                children: "              bindtap"
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
                                                children: "{onClose}"
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
                                            children: "            >"
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
                                                children: "              <"
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
                                                children: "\"lk-text-base lk-font-semibold lk-text-slate-800\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ">{cancelText}</"
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
                                                children: "            </"
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
                                                children: "            {confirmText "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "&&"
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
                                                children: "              <"
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
                                                children: "                className"
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
                                                children: "\"lk-flex lk-flex-1 lk-items-center lk-justify-center lk-h-12 lk-rounded-2xl lk-bg-indigo-500\""
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
                                                children: "                style"
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
                                                children: "{accent}"
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
                                                children: "                bindtap"
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
                                                children: "{onConfirm}"
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
                                            children: "              >"
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
                                                children: "                <"
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
                                                children: "\"lk-text-base lk-font-semibold lk-text-white\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ">{confirmText}</"
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
                                                children: "              </"
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
                                            children: "            )}"
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
                                                children: "          </"
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
                                            children: "        )}"
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
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                        children: "Design notes:"
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.ul, {
                        children: [
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                        children: "usePresence"
                                    }),
                                    " keeps the element mounted for ",
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                        children: "DURATION"
                                    }),
                                    " after ",
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                        children: "visible"
                                    }),
                                    " becomes ",
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                        children: "false"
                                    }),
                                    ", so the exit\nanimation can play. The 16 ms delay on enter lets the first frame render at the start values."
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                                children: [
                                    "The backdrop handles ",
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                        children: "bindtap"
                                    }),
                                    " to close. The card uses ",
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                        children: "catchtap"
                                    }),
                                    ", which stops the tap from\nbubbling to the backdrop."
                                ]
                            }),
                            "\n",
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                        children: "onConfirm"
                                    }),
                                    " does not close the modal. The parent owns the state, which is the more predictable\ncontrolled pattern."
                                ]
                            }),
                            "\n"
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "export-it",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#export-it",
                                children: "#"
                            }),
                            "Export it"
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "Use extensionless relative imports. The build keeps JSX, so the output files are ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: ".jsx"
                            }),
                            ", and a ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: ".js"
                            }),
                            "\nextension in the import would point to a file that does not exist."
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
                            title: "packages/modal/src/index.ts",
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
                                                children: " type"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " { ModalProps } "
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
                                                children: " './Modal'"
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
                                                children: "export"
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
                                                children: " './Modal'"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: ";"
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "point-the-package-at-its-output",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#point-the-package-at-its-output",
                                children: "#"
                            }),
                            "Point the package at its output"
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "Build once and look at what ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "dist"
                            }),
                            " contains:"
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
                                            children: " --filter"
                                        }),
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-string-expression)"
                                            },
                                            children: " \"@lynx-kit/modal\""
                                        }),
                                        (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-token-string)"
                                            },
                                            children: " build"
                                        })
                                    ]
                                })
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "With JSX preserved you get ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "index.jsx"
                            }),
                            ", ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "Modal.jsx"
                            }),
                            ", ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "styles.css"
                            }),
                            " and the ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: ".d.ts"
                            }),
                            " files, so the entry\npoints must name ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: ".jsx"
                            }),
                            ":"
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
                            title: "packages/modal/package.json",
                            lang: "json",
                            children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.code, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                        className: "line",
                                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                            style: {
                                                color: "var(--shiki-foreground)"
                                            },
                                            children: "{"
                                        })
                                    }),
                                    "\n",
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.span, {
                                        className: "line",
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"name\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"@lynx-kit/modal\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"version\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"0.1.0\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"description\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"A customizable modal for Lynx apps, styled with Tailwind.\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"license\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"MIT\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"keywords\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
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
                                                children: "\"lynx\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ","
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"lynxjs\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ","
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"reactlynx\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ","
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"modal\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ","
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"tailwindcss\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ","
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"ui\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"type\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"module\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"sideEffects\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
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
                                                children: "\"**/*.css\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"main\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"./dist/index.jsx\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"types\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"./dist/index.d.ts\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"exports\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "    \".\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "      \"types\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"./dist/index.d.ts\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "      \"import\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"./dist/index.jsx\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "      \"default\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"./dist/index.jsx\""
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
                                                children: "    }"
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "    \"./package.json\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"./package.json\""
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
                                                children: "  }"
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"files\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
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
                                                children: "\"dist\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ","
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"README.md\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"publishConfig\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " { "
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "\"access\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"public\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-foreground)"
                                                },
                                                children: " }"
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"scripts\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "    \"build\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"rslib build\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "    \"dev\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"rslib build --watch\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "    \"prepublishOnly\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"pnpm build\""
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
                                                children: "  }"
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "  \"peerDependencies\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "    \"@lynx-js/react\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \">=0.100.0\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "    \"@lynx-js/types\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \">=4\""
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
                                                    color: "var(--shiki-token-keyword)"
                                                },
                                                children: "    \"@types/react\""
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-punctuation)"
                                                },
                                                children: ":"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \">=19\""
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
                                            children: "  }"
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
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "Keep the template's ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "devDependencies"
                            }),
                            ". The ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "default"
                            }),
                            " condition matters: Rspeedy builds an app twice\n(a background layer and a main-thread layer), and an ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "exports"
                            }),
                            " map with only ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "import"
                            }),
                            " can fail to\nresolve in one of them."
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "After the build, confirm that ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "dist/"
                            }),
                            " contains a ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: ".css"
                            }),
                            " file with ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "lk-"
                            }),
                            " classes and that the built\ncomponent still imports it."
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h3, {
                        id: "try-it-in-the-playground",
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                className: "rp-header-anchor",
                                "aria-hidden": "true",
                                tabIndex: "-1",
                                href: "#try-it-in-the-playground",
                                children: "#"
                            }),
                            "Try it in the playground"
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
                                                children: " apps/playground"
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
                                                children: " add"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " @lynx-kit/modal"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " --workspace"
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
                                                children: "cd"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " ../.."
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
                                                children: " --filter"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string-expression)"
                                                },
                                                children: " \"@lynx-kit/modal\""
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
                                                children: " --filter"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " playground"
                                            }),
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.span, {
                                                style: {
                                                    color: "var(--shiki-token-string)"
                                                },
                                                children: " dev"
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "The playground imports ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "dist/"
                            }),
                            ", which does not update until you rebuild. Run\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "pnpm --filter \"@lynx-kit/modal\" dev"
                            }),
                            " in a second terminal for a watcher."
                        ]
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                        children: [
                            "Start with the template's ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "Counter"
                            }),
                            " to prove that the wiring works, then swap the export to ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "Modal"
                            }),
                            "."
                        ]
                    })
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "growing-the-kit",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#growing-the-kit",
                        children: "#"
                    }),
                    "Growing the kit"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.ul, {
                children: [
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.strong, {
                                children: "More components."
                            }),
                            " Add ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "packages/bottom-sheet"
                            }),
                            ", ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "packages/toast"
                            }),
                            " and so on, each published as\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "@lynx-kit/<name>"
                            }),
                            ". When two packages share code such as ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "usePresence"
                            }),
                            ", move it into\n",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "@lynx-kit/core"
                            }),
                            "."
                        ]
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.strong, {
                                children: "Starter app."
                            }),
                            " A future unscoped ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "create-lynx-kit"
                            }),
                            " package could scaffold an Rspeedy app with\nTailwind v3, the Lynx preset, PostCSS and ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "source.include"
                            }),
                            " already configured."
                        ]
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.li, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.strong, {
                                children: "Design tokens."
                            }),
                            " A shared ",
                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                children: "@lynx-kit/tailwind-preset"
                            }),
                            " can hold brand colors and radii once there\nis more than one component."
                        ]
                    }),
                    "\n"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "Next, learn how to ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        href: "/guide/publishing.html",
                        children: "publish to npm"
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
MDXContent.__RSPRESS_PAGE_META["guide%2Fcreating-a-component.mdx"] = {
    "toc": [
        {
            "id": "workspace-layout",
            "text": "Workspace layout",
            "depth": 2
        },
        {
            "id": "growing-the-kit",
            "text": "Growing the kit",
            "depth": 2
        }
    ],
    "title": "Creating a component",
    "headingTitle": "Creating a component",
    "frontmatter": {}
};

__webpack_require__.d(__webpack_exports__, {
}, {
  "default": MDXContent
});


},

}]);