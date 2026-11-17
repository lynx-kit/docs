"use strict";
(self["rspackChunkdocs"] = self["rspackChunkdocs"] || []).push([[1], {
"p0"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* import */ var react_jsx_runtime__rspack_import_0 = __webpack_require__("A8");
/* import */ var _mdx_js_react__rspack_import_1 = __webpack_require__("f");


function _createMdxContent(props) {
    const _components = {
        a: "a",
        code: "code",
        h1: "h1",
        h2: "h2",
        p: "p",
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
                id: "api-overview",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#api-overview",
                        children: "#"
                    }),
                    "API overview"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "components",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#components",
                        children: "#"
                    }),
                    "Components"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.table, {
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.thead, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tr, {
                            children: [
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.th, {
                                    children: "Package"
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.th, {
                                    children: "Component"
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.th, {
                                    children: "Description"
                                })
                            ]
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.tbody, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tr, {
                            children: [
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                    children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                        children: "@lynx-kit/modal"
                                    })
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                    children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                        href: "/apis/modal.html",
                                        children: "Modal"
                                    })
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                    children: "A customizable, animated modal dialog with title, description, icon, custom content and actions"
                                })
                            ]
                        })
                    })
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "conventions",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#conventions",
                        children: "#"
                    }),
                    "Conventions"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                children: "These rules apply to every Lynx Kit component."
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.table, {
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.thead, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tr, {
                            children: [
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.th, {
                                    children: "Convention"
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.th, {
                                    children: "Details"
                                })
                            ]
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tbody, {
                        children: [
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tr, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                        children: "Controlled"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.td, {
                                        children: [
                                            "State such as ",
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                                children: "visible"
                                            }),
                                            " is owned by your code. Components call your callbacks and never change it themselves."
                                        ]
                                    })
                                ]
                            }),
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tr, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                        children: "Events"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.td, {
                                        children: [
                                            "Lynx event names are used: ",
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
                                    })
                                ]
                            }),
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tr, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                        children: "Colors"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.td, {
                                        children: [
                                            "Color props such as ",
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                                children: "accentColor"
                                            }),
                                            " take any CSS color and are applied inline."
                                        ]
                                    })
                                ]
                            }),
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tr, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                        children: "Classes"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.td, {
                                        children: [
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                                children: "className"
                                            }),
                                            " props extend the defaults. Library classes use the ",
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                                children: "lk-"
                                            }),
                                            " prefix."
                                        ]
                                    })
                                ]
                            }),
                            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tr, {
                                children: [
                                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                        children: "Types"
                                    }),
                                    (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.td, {
                                        children: [
                                            "Every package ships ",
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                                children: ".d.ts"
                                            }),
                                            " files and exports its props type, for example ",
                                            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                                children: "ModalProps"
                                            }),
                                            "."
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
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
MDXContent.__RSPRESS_PAGE_META["apis%2Findex.mdx"] = {
    "toc": [
        {
            "id": "components",
            "text": "Components",
            "depth": 2
        },
        {
            "id": "conventions",
            "text": "Conventions",
            "depth": 2
        }
    ],
    "title": "API overview",
    "headingTitle": "API overview",
    "frontmatter": {}
};

__webpack_require__.d(__webpack_exports__, {
}, {
  "default": MDXContent
});


},

}]);