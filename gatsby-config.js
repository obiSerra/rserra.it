/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `rserra.it`,
    author: {
      name: `Roberto Serra`,
      summary: `Hi there! My name is Roberto and I am a Senior Software Engineer with nearly 15 years of experience.`,
    },
    description: `Just my page.`,
    siteUrl: `https://www.rserra.it/`,
    social: {
      github: `https://github.com/obiSerra`,
      kaggle: `https://www.kaggle.com/oneobi`,
      linkedin: `https://linkedin.com/in/obiserra/`,
    },
    cvUrl:
      "https://github.com/obiSerra/resume/blob/f29cb52fddb6698f435a1775cec65c050d6d2b23/output/Roberto_Serra_CV.pdf?raw=true",
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images/blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-component-parent2div`,
          `gatsby-remark-gifs`,
          {
            resolve: "gatsby-plugin-iubenda-cookie-footer",
            options: {
              iubendaOptions: {
                askConsentAtCookiePolicyUpdate: true,
                enableFadp: true,
                enableLgpd: true,
                enableUspr: true,
                fadpApplies: true,
                floatingPreferencesButtonDisplay: "bottom-right",
                lang: "en",
                perPurposeConsent: true,
                siteId: process.env.IUBENDA_SITE_ID,
                usprApplies: true,
                whitelabel: false,
                cookiePolicyId: process.env.IUBENDA_COOKIE_POLICY_ID,
                banner: {
                  acceptButtonDisplay: true,
                  closeButtonDisplay: false,
                  customizeButtonDisplay: true,
                  explicitWithdrawal: true,
                  listPurposes: true,
                  position: "float-top-center",
                  rejectButtonDisplay: true,
                },
              },
            },
          },
          {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
              // You can add multiple tracking ids and a pageview event will be fired for all of them.
              trackingIds: [
                process.env.GAKEY,
              ],
              // This object gets passed directly to the gtag config command
              // This config will be shared across all trackingIds
              gtagConfig: {
              //   optimize_id: "OPT_CONTAINER_ID",
                anonymize_ip: true,
              //   cookie_expires: 0,
              },
              // This object is used for configuration specific to this plugin
              pluginConfig: {
                // Puts tracking script in the head instead of the body
                head: false,
                // Setting this parameter is also optional
                respectDNT: true,
                // Avoids sending pageview hits from custom paths
                // exclude: ["/preview/**", "/do-not-track/me/too/"],
                // Defaults to https://www.googletagmanager.com
                // origin: "YOUR_SELF_HOSTED_ORIGIN",
                // Delays processing pageview events on route update (in milliseconds)
                delayOnRouteUpdate: 0,
              },
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "rserra.it Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `Gatsby`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/avatar-face.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    // {
    //   resolve: "gatsby-transformer-remark",
    //   options: {
    //     plugins: ["gatsby-remark-component-parent2div"],
    //   },
    // },
  ],
}
