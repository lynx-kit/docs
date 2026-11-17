"use strict";
(self["rspackChunkdocs"] = self["rspackChunkdocs"] || []).push([["p"], {
"j"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* import */ var react_jsx_runtime__rspack_import_0 = __webpack_require__("A8");
/* import */ var _mdx_js_react__rspack_import_1 = __webpack_require__("f");


function _createMdxContent(props) {
    const _components = {
        a: "a",
        code: "code",
        h2: "h2",
        li: "li",
        p: "p",
        table: "table",
        tbody: "tbody",
        td: "td",
        th: "th",
        thead: "thead",
        tr: "tr",
        ul: "ul",
        ...(0,_mdx_js_react__rspack_import_1/* .useMDXComponents */.R)(),
        ...props.components
    };
    return (0,react_jsx_runtime__rspack_import_0.jsxs)(react_jsx_runtime__rspack_import_0.Fragment, {
        children: [
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "what-is-lynx-kit",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#what-is-lynx-kit",
                        children: "#"
                    }),
                    "What is Lynx Kit?"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.p, {
                children: [
                    "Lynx Kit is a growing collection of UI components for ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        href: "https://lynxjs.org",
                        rel: "noopener noreferrer",
                        target: "_blank",
                        children: "Lynx"
                    }),
                    " apps. Each component is\npublished as its own package under the ",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                        children: "@lynx-kit"
                    }),
                    " scope, so you install only what you use."
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                children: "Today the kit contains one component:"
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
                                    children: "Description"
                                })
                            ]
                        })
                    }),
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.tbody, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.tr, {
                            children: [
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                    children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                                        href: "/apis/modal.html",
                                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.code, {
                                            children: "@lynx-kit/modal"
                                        })
                                    })
                                }),
                                (0,react_jsx_runtime__rspack_import_0.jsx)(_components.td, {
                                    children: "A customizable, animated modal dialog"
                                })
                            ]
                        })
                    })
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsx)(_components.p, {
                children: "More components, such as a bottom sheet, are planned."
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.h2, {
                id: "quick-links",
                children: [
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                        className: "rp-header-anchor",
                        "aria-hidden": "true",
                        tabIndex: "-1",
                        href: "#quick-links",
                        children: "#"
                    }),
                    "Quick links"
                ]
            }),
            "\n",
            (0,react_jsx_runtime__rspack_import_0.jsxs)(_components.ul, {
                children: [
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.li, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                            href: "/guide/get-started/installation.html",
                            children: "Install the modal"
                        })
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.li, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                            href: "/guide/get-started/quick-start.html",
                            children: "Quick start"
                        })
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.li, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                            href: "/apis/modal.html",
                            children: "Modal API reference"
                        })
                    }),
                    "\n",
                    (0,react_jsx_runtime__rspack_import_0.jsx)(_components.li, {
                        children: (0,react_jsx_runtime__rspack_import_0.jsx)(_components.a, {
                            href: "/guide/creating-a-component.html",
                            children: "Create your own component in the kit"
                        })
                    }),
                    "\n"
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
MDXContent.__RSPRESS_PAGE_META["index.mdx"] = {
    "toc": [
        {
            "id": "what-is-lynx-kit",
            "text": "What is Lynx Kit?",
            "depth": 2
        },
        {
            "id": "quick-links",
            "text": "Quick links",
            "depth": 2
        }
    ],
    "title": "Lynx Kit",
    "headingTitle": "",
    "frontmatter": {
        "pageType": "home",
        "title": "Lynx Kit",
        "description": "Customizable UI components for Lynx apps, styled with Tailwind",
        "hero": {
            "name": "Public Beta",
            "text": "UI components for Lynx apps",
            "tagline": "Customizable, animated and typed. Install one package and use it.",
            "actions": [
                {
                    "text": "Get Started",
                    "link": "/guide/get-started/installation",
                    "theme": "brand"
                },
                {
                    "text": "API Reference",
                    "link": "/apis/modal",
                    "theme": "alt"
                }
            ]
        },
        "features": [
            {
                "icon": "/icons/icon-lynx-native.svg",
                "title": "Built for Lynx",
                "details": "Written with Lynx elements and events (view, text, bindtap), so it renders natively on Android and iOS."
            },
            {
                "icon": "/icons/icon-tailwind.svg",
                "title": "Tailwind, precompiled",
                "details": "Styled with Tailwind v3 at build time. Your app does not need Tailwind, and every class uses an lk- prefix so nothing clashes."
            },
            {
                "icon": "/icons/icon-controlled.svg",
                "title": "Controlled API",
                "details": "You own the state. Pass visible and onClose, and the component never surprises you."
            },
            {
                "icon": "/icons/icon-colors.svg",
                "title": "Easy to theme",
                "details": "Override the accent, surface and overlay colors with plain props, or extend the classes."
            },
            {
                "icon": "/icons/icon-typed.svg",
                "title": "Typed",
                "details": "Ships TypeScript declarations, so props autocomplete in your editor."
            },
            {
                "icon": "/icons/icon-animated.svg",
                "title": "Animated",
                "details": "Enter and exit transitions are built in, driven by a small presence hook."
            }
        ]
    }
};

__webpack_require__.d(__webpack_exports__, {
}, {
  "default": MDXContent
});


},

}]);