// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const remarkReplace = require('./src/remark/remark-replace');
const siteRedirects = require('./site.redirects');
const path = require('path');


// Math equation plugins
const math = require('remark-math');
const katex = require('rehype-katex');


/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Weaviate',
    tagline:
        'Weaviate empowers developers to deliver, scalable vector search-powered apps painlessly',
    url: 'https://weaviate.io',
    baseUrl: '/',
    trailingSlash: false,
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'weaviate', // Usually your GitHub org/user name.
    projectName: 'weaviate-io', // Usually your repo name.
    customFields: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    plugins: [
        [
            '@docusaurus/plugin-google-gtag',
            {
                trackingID:  'None',
                anonymizeIP: true,
            },
        ],

        [
            '@docusaurus/plugin-google-tag-manager',
            {
                containerId: process.env.GOOGLE_CONTAINER_ID || 'None',
            },
        ],

        'docusaurus-plugin-sass',
        ['@docusaurus/plugin-client-redirects', siteRedirects],

        // Playbook configuration
        [
            '@docusaurus/plugin-content-blog',
            {
                blogTitle: 'Playbook',
                blogDescription: 'Learn How we run Weaviate as a Company',
                blogSidebarCount: 0,
                postsPerPage: 6,
                blogSidebarTitle: 'Weaviate Playbook',

                id: 'playbook-blog',
                routeBasePath: '/company/playbook',
                // path to data on filesystem relative to site dir.
                path: 'playbook',
                authorsMapPath: '../authors.yml',
                showReadingTime: true,
            },
        ],
        // Paper Reviews configuration
        [
            '@docusaurus/plugin-content-blog',
            {
                blogTitle: 'Paper Reviews',
                blogDescription: '<todo>',
                blogSidebarCount: 0,
                postsPerPage: 6,
                blogSidebarTitle: 'Weaviate Paper Reviews',

                id: 'papers-blog',
                routeBasePath: '/papers',
                // path to data on filesystem relative to site dir.
                path: 'papers',
                authorsMapPath: '../authors.yml',
                showReadingTime: true,
            },
        ],
         // iOS Apps and Vector Databases configuration
         [
            '@docusaurus/plugin-content-blog',
            {
                blogTitle: 'Apple Ecosystem Apps',
                blogDescription: 'iOS Apps and Vector Databases',
                blogSidebarCount: 0,
                postsPerPage: 6,
                blogSidebarTitle: 'iOS Apps and Vector Databases',

                id: 'apple-and-weaviate',
                routeBasePath: '/apple-and-weaviate',
                // path to data on filesystem relative to site dir.
                path: 'apple-and-weaviate',
                authorsMapPath: '../authors.yml',
                showReadingTime: true,
            },
        ],
        [
            '@scalar/docusaurus',
            {
              label: '.',
              route: '/developers/weaviate/api/rest',
              configuration: {
                spec: {
                  url: 'https://raw.githubusercontent.com/weaviate/weaviate/openapi_docs/openapi-specs/schema.json',
                },
                hideModels: true,
                // This feature currently broken - potentially fixed in: https://github.com/scalar/scalar/pull/1387
                // hiddenClients: [...],
              },
            },
        ],

        // Add HTML Header tags
        () => ({
            name: 'inject-tag',
            injectHtmlTags() {
                return {
                    headTags: [
                        // Add plausible
                        {
                            tagName: 'script',
                            attributes: {
                                defer: '',
                                'data-domain': 'weaviate.io',
                                src: 'https://plausible.io/js/plausible.js',
                            },
                        },
                        // Add Scarf
                        {
                            tagName: 'img',
                            attributes: {
                                src: 'https://static.scarf.sh/a.png?x-pxid=a41b0758-a3a9-4874-a880-8b5d5a363d40',
                                referrerPolicy: 'no-referrer-when-downgrade',
                                style: 'display: none;',
                            },
                        },

                        // Add hotjar
                        {
                            tagName: 'script',
                            innerHTML: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:3237492,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
                        },
                        // Add emailpig
                        {
                            tagName: 'script',
                            innerHTML: `(function (n) { if (typeof n !== "undefined" && n.webdriver) return; var script = document.createElement("script"); script.type = "text/javascript"; script.async = 1; script.src = "https://www.emailpig.com/_functions/myF/823adf31-4fd9-4a44-8491-9de559b8c428?q=" + encodeURIComponent(window.location.href) + "&r=" + document.referrer; document.head.appendChild(script); })(navigator);`,
                        },
                         // Add LinkedIn Insight Tag
                         {
                            tagName: 'script',
                            attributes: {
                                src: '/js/linkedin.js',
                                async: true,
                                type: 'text/javascript',
                            },
                        },
                        // LinkedIn Insight Tag noscript fallback
                        {
                            tagName: 'img',
                            attributes: {
                                src: 'https://px.ads.linkedin.com/collect/?pid=6758089&fmt=gif',
                                alt: '',
                                height: '1',
                                width: '1',
                                style: 'display:none;',
                            },
                        },

                         // Add CommonRoom
            {
                tagName: 'script',
                innerHTML: `(function() { if (typeof window === 'undefined') return; if (typeof window.signals !== 'undefined') return; var script = document.createElement('script'); script.src = 'https://cdn.cr-relay.com/v1/site/3709e2b3-c0eb-4239-9087-775e484fab16/signals.js'; script.async = true; window.signals = Object.assign([], ['page', 'identify', 'form'].reduce(function (acc, method){ acc[method] = function () { signals.push([method, arguments]); return signals; }; return acc; }, {})); document.head.appendChild(script); })();`,
              },
                 // Add Koala
                 {
                    tagName: 'script',
                    innerHTML: `!function(t){if(window.ko)return;window.ko=[],["identify","track","removeListeners","open","on","off","qualify","ready"].forEach(function(t){ko[t]=function(){var n=[].slice.call(arguments);return n.unshift(t),ko.push(n),ko}});var n=document.createElement("script");n.async=!0,n.setAttribute("src","https://cdn.getkoala.com/v1/pk_0c8211aa3107cd0bfa568f172689e16080c8/sdk.js"),(document.body || document.head).appendChild(n)}();`,
                },

                    ],
                };
            },
        }),
    ],

    stylesheets: [
        // Add Font Awesome stylesheets
        '/fonts/font-awesome/fontawesome.css',
        '/fonts/font-awesome/solid.css',
        '/fonts/font-awesome/regular.css',
        '/fonts/font-awesome/brands.css',

        {
            // styles for math equations
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:
                'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    /*   i18n: {
   defaultLocale: 'en',
   locales: ['en','ja'],
    }, */

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    path: 'developers', // folder name – where the docs are
                    routeBasePath: 'developers', // route name – where to navigate for docs i.e. weaviate.io/<route-base-path>/...

                    // TODO: Update to 'main' for release
                    editUrl:
                        'https://github.com/weaviate/weaviate-io/tree/main/',
                    remarkPlugins: [remarkReplace, math],
                    rehypePlugins: [katex],
                },
                blog: {
                    blogTitle: 'Blog',
                    showReadingTime: true,
                    authorsMapPath: '../authors.yml',
                    editUrl:
                        'https://github.com/weaviate/weaviate-io/tree/main/',
                    blogSidebarCount: 0,
                    postsPerPage: 12,
                    blogSidebarTitle: 'Weaviate Blog',
                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                },
                theme: {
                    customCss: [
                        require.resolve('./src/css/custom.scss'),
                        require.resolve('./src/css/blog-and-docs.scss'),
                    ],
                },
            }),
        ],
    ],



    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            image: 'og/default.jpg',
            announcementBar: {
                id: 'announcement-bar-may2024',
                content:`<a target="_blank" rel="noopener noreferrer" href="https://events.weaviate.io/update-126">Product Update Webinar: Thurs, Aug 22</a> | Learn about new capabilities for cost optimization, performance, and developer efficiency`,
                backgroundColor: '#1C1468',
                textColor: '#F5F5F5',
                isCloseable: true,
            },
            docs: {
                sidebar: {
                    hideable: true,
                    autoCollapseCategories: true,
                },
            },
            navbar: {
                title: '',
                // hideOnScroll: true,
                logo: {
                    alt: 'Weaviate',
                    src: '/img/site/weaviate-nav-logo-light.svg',
                },
                items: [
                    {
                        type: 'dropdown',
                        label: 'Product',
                        position: 'right',
                        items: [
                            {
                                type: 'html',
                                value : '<div class="holder"><ul class="holdRightnoBorder"><li class="dropDownLabel">Overview</li><li><a class="dropdown__link" href="/platform">Vector Database</a></li><li><a class="dropdown__link" href="/workbench">Workbench</a></li></ul><div class="divider"></div><ul class="holdRightnoBorder"><li class="dropDownLabel" >Deployment</li><li><a class="dropdown__link" href="/deployment/serverless">Serverless Cloud</a></li><li><a class="dropdown__link" href="/deployment/enterprise-cloud">Enterprise Cloud</a></li><li><a class="dropdown__link" href="/deployment/byoc">Bring Your Own Cloud</a></li><li><a class="dropdown__link" href="/deployment/enablement">Enablement</a></li></ul></div><ul class="menu__list mobileNav"><li class="dropDownLabel mobDrop">Overview</li><li class="menu__list-item"><a class="menu__link" href="/platform">Vector Database</a></li><li class="menu__list-item"><a class="menu__link" href="/workbench">Workbench</a></li><li class="dropDownLabel mobDrop">Deployment</li><li class="menu__list-item"><a class="menu__link" href="/deployment/serverless">Serverless Cloud</a></li><li class="menu__list-item"><a class="menu__link" href="/deployment/enterprise-cloud">Enterprise Cloud</a></li><li class="menu__list-item"><a class="menu__link" href="/deployment/byoc">Bring Your Own Cloud</a></li><li class="menu__list-item"><a class="menu__link" href="/deployment/enablement">Enablement</a></li></ul>',
                               className: 'dropDownContainer2',
                            },
                        ]

                    },
                    {  type: 'dropdown',
                    label: 'Solutions',
                    position: 'right',
                    items: [
                        {
                            type: 'html',
                            value : '<div class="holder"><ul class="holdRightnoBorder"><li class="dropDownLabel">Use Cases</li><li><a class="dropdown__link" href="/rag">RAG</a></li><li><a class="dropdown__link" href="/hybrid-search">Hybrid Search</a></li><li><a class="dropdown__link" href="/gen-feedback-loops">Generative Feedback Loops</a></li><li><a class="dropdown__link" href="/cost-performance-optimization">Cost-Performance Optimization</a></li></ul><div class="divider"></div><ul class="holdRightnoBorder"><li class="dropDownLabel" >Examples</li><li><a class="dropdown__link" href="/community/build-with-weaviate">Showcases</a></li><li><a class="dropdown__link" href="/community/demos">Demos</a></li></ul></div><ul class="menu__list mobileNav"><li class="dropDownLabel mobDrop">Use Cases</li><li class="menu__list-item"><a class="menu__link" href="/rag">RAG</a></li><li class="menu__list-item"><a class="menu__link" href="/hybrid-search">Hybrid Search</a></li><li class="menu__list-item"><a class="menu__link" href="/gen-feedback-loops">Generative Feedback Loops </a></li><li class="menu__list-item"><a class="menu__link" href="/deployment/enterprise-cloud">Infrastructure Optimization</a></li><li class="dropDownLabel mobDrop">Examples</li><li class="menu__list-item"><a class="menu__link" href="/community/build-with-weaviate">Showcases</a></li><li class="menu__list-item"><a class="menu__link" href="/community/demos">Demos</a></li></ul>',
                            className: 'dropDownContainer2',
                        },

                       /*  {
                            label: 'Serverless',
                            href: '/services/serverless',

                        },
                        {
                            label: 'Enterprise Cloud',
                            href: '/services/enterprise-cloud',

                        },
                        {
                            label: 'Bring Your Own Cloud',
                            href: '/services/byoc',

                        },
                        {
                            label: 'Education & Support',
                            href: '/services/education-and-support',

                        },
                        {
                            label: 'Pricing',
                            href: '/pricing',

                        }, */
                    ]
                },

                {
                        type: 'dropdown',
                        label: 'Developers',
                        position: 'right',
                        items: [
                            {
                                type: 'html',
                                value : '<div class="holder"><ul class="holdRightnoBorder"><li class="dropDownLabel">Build</li><li><a class="dropdown__link" href="/developers/weaviate">Documentation</a></li><li><a class="dropdown__link" href="/developers/wcs">Weaviate Cloud Docs</a></li><li><a class="dropdown__link" href="https://github.com/weaviate/weaviate">GitHub</a></li></ul><div class="divider"></div><ul class="holdRightnoBorder"><li class="dropDownLabel" >Learn</li><li><a class="dropdown__link" href="/blog">Blog</a></li><li><a class="dropdown__link" href="/developers/academy">Academy</a></li><li><a class="dropdown__link" href="/community/events">Workshops</a></li><li><a class="dropdown__link" href="/learn/knowledgecards">Knowledge Cards</a></li><li><a class="dropdown__link" href="/papers">Paper Reviews</a></li><li><a class="dropdown__link" href="/podcast">Podcasts</a></li></ul><div class="divider"></div><ul class="holdRightnoBorder"><li class="dropDownLabel" >Engage</li><li><a class="dropdown__link" href="/community/events">Events & Webinars</a></li><li><a class="dropdown__link" href="/community">Weaviate Hero Program</a></li><li><a class="dropdown__link" href="https://forum.weaviate.io/">Forum</a></li><li><a class="dropdown__link" href="https://weaviate.io/slack">Slack</a></li></ul></div><ul class="menu__list mobileNav"><li class="dropDownLabel mobDrop">Build</li><li class="menu__list-item"><a class="menu__link" href="/developers/weaviate">Documentation</a></li><li class="menu__list-item"><a class="menu__link" href="/developers/wcs">Weaviate Cloud Docs</a></li><li class="menu__list-item"><a class="menu__link" href="https://github.com/weaviate/weaviate">GitHub</a></li><li class="dropDownLabel mobDrop">Learn</li><li class="menu__list-item"><a class="menu__link" href="/blog">Blog</a></li><li class="menu__list-item"><a class="menu__link" href="/developers/academy">Academy</a></li><li class="menu__list-item"><a class="menu__link" href="/community/events">Workshops</a></li><li class="menu__list-item"><a class="menu__link" href="/learn/knowledgecards">Knowledge Cards</a></li><li class="menu__list-item"><a class="menu__link" href="/papers">Paper Reviews</a></li><li class="menu__list-item"><a class="menu__link" href="/podcast">Podcasts</a></li><li class="dropDownLabel mobDrop">Engage</li><li class="menu__list-item"><a class="menu__link" href="/community/events">Events & Webinars</a></li><li class="menu__list-item"><a class="menu__link" href="/community">Weaviate Hero Program</a></li><li class="menu__list-item"><a class="menu__link" href="https://forum.weaviate.io/">Forum</a></li><li class="menu__list-item"><a class="menu__link" href="https://weaviate.io/slack">Slack</a></li></ul>',
                                className: 'dropDownContainer2',
                            },
                         /*    {
                                label: 'Weaviate Docs',
                                docId: 'weaviate/index',
                                sidebarid: 'docsSidebar',
                                type: 'doc',
                            },
                            {
                                label: 'Weaviate Cloud Docs',
                                docId: 'wcs/index',
                                sidebarid: 'wcsSidebar',
                                type: 'doc',
                            },
                            {
                                label: 'Learn with Academy',
                                docId: 'academy/index',
                                sidebarid: 'academySidebar',
                                type: 'doc',
                            },
                            {
                                label: 'Blog',
                                to: '/blog',

                            },
                            {
                                label: 'Online Workshops & Events',
                                to: '/community/events',
                            },
                            {
                                label: 'Knowledge Cards',
                                to: '/learn/knowledgecards',
                            },
                            {
                                label: 'Newsletter',
                                to: 'https://newsletter.weaviate.io/',
                            },
                            {
                                label: 'Community',
                                href: '/community',
                            },
                            {
                                label: 'Demos',
                                href: '/community/demos',
                            },
                            {
                                label: 'Build With Weaviate',
                                href: '/community/build-with-weaviate',
                            },

                            {
                                label: 'Paper Reviews',
                                to: '/papers',
                            },
                            {
                                label: 'Contributor Guide',
                                docId: 'contributor-guide/index',
                                sidebarid: 'contributorSidebar',
                                type: 'doc',
                            },
                            {
                             label: 'Forum',
                             href: 'https://forum.weaviate.io',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/weaviate/weaviate',
                            },
                            {
                                label: 'Slack',
                                href: 'https://weaviate.io/slack',
                            }, */
                        ],
                    },
                    {
                        type: 'dropdown',
                        label: 'Company',
                        position: 'right',
                        items: [
                            {
                                type: 'html',
                                value : '<div class="holder"><ul class="holdRightnoBorder"><li class="dropDownLabel">Partners</li><li><a class="dropdown__link" href="/partners">Overview</a></li><li><a class="dropdown__link" href="/partners/aws">AWS</a></li><li><a class="dropdown__link" href="/partners/gcp">Google</a></li><li><a class="dropdown__link" href="/partners/snowflake">Snowflake</a></li></ul><div class="divider"></div><ul class="holdRightnoBorder"><li class="dropDownLabel" >About</li><li><a class="dropdown__link" href="/company/about-us">Company</a></li><li><a class="dropdown__link" href="/company/careers">Careers</a></li><li><a class="dropdown__link" href="/company/remote">Remote</a></li><li><a class="dropdown__link" href="/company/playbook">Playbook</a></li><li><a class="dropdown__link" href="/company/investors">Investors</a></li><li><a class="dropdown__link" href="/#contact-us">Contact Us</a></li></ul></div><ul class="menu__list mobileNav"><li class="dropDownLabel mobDrop">About</li><li class="menu__list-item"><a class="menu__link" href="/company/about-us">Company</a></li><li class="menu__list-item"><a class="menu__link" href="/company/careers">Careers</a></li><li class="menu__list-item"><a class="menu__link" href="/company/remote">Remote</a></li><li class="menu__list-item"><a class="menu__link" href="/company/playbook">Playbook</a></li><li class="menu__list-item"><a class="menu__link" href="/company/investors">Investors</a></li><li class="menu__list-item"><a class="menu__link" href="/#contact-us">Contact Us</a></li><li class="dropDownLabel mobDrop">Partners</li><li class="menu__list-item"><a class="menu__link" href="/partners">Overview</a></li><li class="menu__list-item"><a class="menu__link" href="/partners/aws">AWS</a></li><li class="menu__list-item"><a class="menu__link" href="/partners/gcp">Google</a></li><li class="menu__list-item"><a class="menu__link" href="/partners/snowflake">Snowflake</a></li><li class="menu__list-item"></ul>',
                               className: 'dropDownContainer2',
                            },
                        ],
                        /* items: [
                            {
                                label: 'About us',
                                to: '/company/about-us',
                            },
                            {
                                label: 'Playbook',
                                to: '/company/playbook',
                            },
                            {
                                label: 'Careers',
                                to: '/company/careers',
                            },
                            {
                                label: 'Remote',
                                to: '/company/remote',
                            },
                            {
                                label: 'Investors',
                                to: '/company/investors',
                            },
                            {
                                label: 'Partners',
                                href: '/partners',
                            },
                            {
                                label: 'Contact us',
                                href: '/#contact-us',
                            },
                        ], */
                    },
                    {

                        label: 'Pricing',
                        position: 'right',
                        href: '/pricing',

                    },
                    {
                        html: `<svg class="githubStars" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,

                        to: 'https://github.com/weaviate/weaviate',
                        position: 'right',
                      },

                    {
                        label: 'Try Now',
                        className: 'tryNow',
                        to: 'https://console.weaviate.cloud',
                        position: 'right',
                    },

                    {
                        type: 'search',
                        position: 'right',
                        className: 'hiddenSearch',
                    },
                ],
            },

            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Product',
                        items: [
                           
                            {
                                label: 'Vector Database',
                                to: '/platform',
                            },
                            
                            {
                                label: 'Workbench',
                                to: '/workbench',
                            },
                            {
                                label: 'Pricing',
                                to: '/pricing',
                            },
                            {

                                label: 'Weaviate Cloud',
                                to: 'https://console.weaviate.cloud/',
                            },
                            {
                                label: 'Deployment',
                                to: '#',
                                className: 'footer__title subtitle',
                            },
                            {
                                label: 'Serverless Cloud',
                                to: '/deployment/serverless',
                            },
                            {
                                label: 'Enterprise Cloud',
                                to: '/deployment/enterprise-cloud',
                            },
                            {
                                label: 'Bring Your Own Cloud',
                                to: '/deployment/byoc',
                            },
                            {
                                label: 'Enablement',
                                to: '/deployment/enablement',
                            },
                            {
                                label: 'Trust',
                                to: '#',
                                className: 'footer__title subtitle',
                            },
                            {
                                label: 'Security',
                                to: '/security',
                            },
                            {
                                label: 'Terms & Policies',
                                to: '/service',
                            },
                            
                        ],
                    },
                    {
                        title: 'Use Cases',
                        items: [
                          
                            {
                                label: 'RAG',
                                to: '/RAG',
                            },
                            {
                                label: 'Hybrid Search',
                                to: '/hybrid-search',
                            },
                            {
                                label: 'Generative Feedback Loops',
                                to: '/gen-feedback-loops',
                            },
                            {
                                label: 'Cost Performance Optimization',
                                to: '/cost-performance-optimization',
                            },
                            {
                                label: 'Examples',
                                to: '#',
                                className: 'footer__title subtitle',
                            },
                            {

                                label: 'Showcases',
                                to: '/community/build-with-weaviate',
                            },
                            {
                                label: 'Demos',
                                to: 'community/demos',
                            },
                        ],
                    },
                    {
                        title: 'Learn',
                        items: [
                            {
                                label: 'Blog',
                                to: '/blog',
                            },
                            {

                                label: 'Academy',
                                to: '/developers/academy',
                            },
                            {
                                label: 'Workshops',
                                to: '/community/events',
                            },
                            {
                                label: 'Knowledge Cards',
                                to: '/learn/knowledgecards',
                            },
                            {

                                label: 'Paper Reviews', 
                                to: '/papers',
                            },
                            {
                                label: 'Podcasts',
                                to: '/podcast',
                            },
                            
                            {
                                label: 'Build',
                                to: '#',
                                className: 'footer__title subtitle',
                            },
                            {
                                label: 'Documentation',
                                to: '/developers/weaviate',
                            },
                            {
                                label: 'Weaviate Cloud Docs',
                                to: '/developers/wcs',
                            },
                            {
                                label: 'GitHub',
                                to: 'https://github.com/weaviate/weaviate',
                            },
                        
                            {
                                label: 'Engage',
                                to: '#',
                                className: 'footer__title subtitle',
                            },
                            {
                                label: 'Events & Webinars',
                                to: '/community/events',
                            },
                            {
                                label: 'Weaviate Hero Program',
                                href: '/community',
                            },
                           
                            {
                                label: 'Forum',
                                to: 'https://forum.weaviate.io/',
                            },
                            {
                                label: 'Slack',
                                to: 'https://weaviate.io/slack',
                            },
                        ],
                    },
                   
                    {
                        title: 'About',
                        items: [
                           
                            {
                                label: 'Company',
                                to: '/company/about-us',
                            },
                            {
                                label: 'Careers',
                                to: '/company/careers',
                            },
                            {
                                label: 'Remote',
                                to: '/company/remote',
                            },
                            {
                                label: 'Playbook',
                                to: 'company/playbook',
                            },
                            {
                                label: 'Investors',
                                to: 'company/investors',
                            },
                            {
                                label: 'Contact Us',
                                to: '/#contact-us',
                            },
                            {
                                label: 'Partners',
                                to: '#',
                                className: 'footer__title subtitle',
                            },
                            {
                                label: 'Overview',
                                to: '/partners',

                            },
                            {
                                label: 'AWS',
                                to: '/partners/aws',

                            },
                            {
                                label: 'Google Cloud',
                                to: '/partners/gcp',

                            },
                            {
                                label: 'Snowflake',
                                to: '/partners/snowflake',

                            },
                        ],
                    },

                    {
                        title: 'Follow Us',
                        items: [

                            
                            {
                                label: 'Twitter',
                                to: 'https://twiiter.com/weaviate_io',
                            },
                            {
                                label: 'Instagram',
                                to: 'https://instagram.com/weaviate.io',
                            },
                            {
                                label: 'Youtube',
                                to: 'https://youtube.com/weaviate_io',
                            },
                            {

                                label: 'Linkedin',
                                to: 'https://www.linkedin.com/company/weaviate-io',
                            },
                            {
                                label: 'Meetups',
                                to: '#',
                                className: 'footer__title subtitle',
                            },
                            {
                                label: 'Amsterdam',
                                to: 'https://www.meetup.com/weaviate-amsterdam',

                            },
                            {
                                label: 'Boston',
                                to: 'https://www.meetup.com/weaviate-boston',

                            },
                            {
                                label: 'New York',
                                to: 'https://www.meetup.com/weaviate-NYC',

                            },
                            {
                                label: 'San Francisco',
                                to: 'https://www.meetup.com/weaviate-san-francisco',

                            },
                            {
                                label: 'Toronto',
                                to: 'https://www.meetup.com/weaviate-toronto',

                            },


                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Weaviate, B.V. Built with Docusaurus.`,
            },
            colorMode: {
                defaultMode: 'light',
                disableSwitch: false,
                respectPrefersColorScheme: false,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['java', 'scala'],
            },

            customConfig: {
                colorMode: {
                    defaultMode: 'light',
                    disableSwitch: false,
                    respectPrefersColorScheme: false,
                },
            },
        }),
};

module.exports = config;
