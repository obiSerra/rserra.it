/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import CollapseNote from "./CollapseNote"

const query = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author {
          name
          summary
        }
        social {
          github
          kaggle
          linkedin
        }
        cvUrl
      }
    }
  }
`

const prompt = `
Your task is to perform the following this steps:
1. Read the text delimited by triple backticks (\`\`\`).
2. Re-write the text as a brief self-presentation of the author.

\`\`\`

Info:
    - Roberto
    - Senior Software Engineer
    - 10+ years of experience
    - based in Turin, Italy
    - working at Etiqa SRL as Director of Technology
Skills:
    - Python
    - JavaScript/TypeScript
    - Clojure
    - C#
    - CSS + HTML
    - AWS services

Intrestes:
    - Machine Learning
        - Reinforcement Learning
        - LLM
        - GAN
    - Game Development
    - Computer Science
        - Algorithms
        - Functional Programming
    - Physical Computing:
        - Arduino
        - RaspberryPi
    - Other stuff:
        - 3d Printing
        - Soccer
        - Cooking and food    
\`\`\`
`
const Bio = () => {
  const data = useStaticQuery(query)

  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
  const cvUrl = data.site.siteMetadata?.cvUrl
  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/avatar-face.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      <div>
        <p>
          Hi there! My name is <strong>{author.name}</strong>, and I am a Senior
          Software Engineer with more than 15 years of experience.
        </p>
        <p>
          I live in Turin, Italy, I work at WaterView SRL as MLOps and Developer; designing, building and maintaining the systems that enables our computer vision models to work effectively.
        </p>

        <p>
          I am proficient in various programming languages, including{" "}
          <span className="highlight">Python</span>,{" "}
          <span className="highlight">JavaScript/TypeScript</span>,{" "}
          <span className="highlight">Clojure</span>,{" "}
          <span className="highlight">C#</span>,{" "}
          <span className="highlight">CSS + HTML</span>; I also have excellent
          experience with <span className="highlight">AWS services</span>,{" "}
          <span className="highlight">Docker</span>,{" "}
          <span className="highlight">React/Redux</span>, to mention a few.
        </p>
        <p>
          I am keenly interested in <span className="highlight"></span>Machine
          Learning, particularly{" "}
          <span className="highlight">Reinforcement Learning</span>,{" "}
          <span className="highlight">LLMs</span>, and{" "}
          <span className="highlight">Data Analysis</span>; some of my
          experiments and side projects are here, on my{" "}
          <a
            href={social.github}
            title="github"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>{" "}
          and{" "}
          <a
            href={social.kaggle}
            title="github"
            target="_blank"
            rel="noreferrer"
          >
            Kaggle
          </a>{" "}
          pages.
        </p>

        <br />
        <p>
          You can find me on:{" "}
          <a
            href={social.github}
            title="github"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          ,{" "}
          <a
            href={social.linkedin}
            title="linkedin"
            target="_blank"
            rel="noreferrer"
          >
            Linkedin
          </a>{" "}
          or download my resume{" "}
          <a href={cvUrl} title="resume" target="_blank" rel="noreferrer">
            here
          </a>
        </p>
      </div>
    </div>
  )
}

export const ShortBio = () => {
  const data = useStaticQuery(query)
  const summary = data.site.siteMetadata?.author?.summary
  return (
    <>
      <div className="bio">
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/avatar-face.png"
          width={50}
          height={50}
          quality={95}
          alt="Profile picture"
        />
        <p>{summary}</p>
      </div>
    </>
  )
}

export default Bio
