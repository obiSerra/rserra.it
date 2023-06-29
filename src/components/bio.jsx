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
const completion = `
Self-Presentation:
Hi there! My name is Roberto and I am a Senior Software Engineer with over 10 years of experience. 
Currently based in Turin, Italy, I am working at Etiqa SRL as Director of Technology. 
I am proficient in various programming languages including Python, JavaScript/TypeScript, Clojure, C#, CSS + HTML and AWS services. 
I have a keen interest in Machine Learning, particularly Reinforcement Learning, LLM and GAN, as well as in Game Development and Computer Science. 
My interests also extend to Physical Computing, where I enjoy working with Arduino and RaspberryPi. 
In my free time, I love exploring other interests such as 3d Printing, Soccer, Cooking and food.
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
          Hi there! My name is <strong>{author.name}</strong> and I am a Senior
          Software Engineer with over 10 years of experience. <br />
          Currently based in Turin, Italy, I am working at Etiqa SRL as Director
          of Technology. <br />I am proficient in various programming languages
          including <span className="highlight">Python</span>,{" "}
          <span className="highlight">JavaScript/TypeScript</span>,{" "}
          <span className="highlight">Clojure</span>,{" "}
          <span className="highlight">C#</span>,{" "}
          <span className="highlight">CSS + HTML</span>,{" "}
          <span className="highlight">AWS services</span>, and{" "}
          <span className="highlight">React</span>.
          <br />I have a keen interest in Machine Learning, particularly{" "}
          <span className="highlight">Reinforcement Learning</span>,{" "}
          <span className="highlight">LLM</span> and{" "}
          <span className="highlight">GAN</span>, as well as in{" "}
          <span className="highlight">Game Development</span> and{" "}
          <span className="highlight">Computer Science</span>. <br />
          My interests also extend to Physical Computing, where I enjoy working
          with <span className="highlight">Arduino</span> and{" "}
          <span className="highlight">RaspberryPi</span>. <br />
          In my free time, I love exploring other interests such as{" "}
          <span className="highlight">3d Printing</span>,
          <span className="highlight">Soccer</span>,{" "}
          <span className="highlight">Cooking and food</span>. **
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
            github
          </a>{" "}
          or get my resume{" "}
          <a href={cvUrl} title="resume" target="_blank" rel="noreferrer">
            here
          </a>
        </p>

        <div>
          <br />
          <br />
          <small>
            ** Base description generated with <i>gpt-3.5-turbo</i> and a little
            bit of prompt engineering (chain-of-thoughts and some retries).
          </small>
          <CollapseNote open="full prompt" close="close prompt">
            <strong>Prompt</strong>
            <pre>{prompt}</pre>
            <strong>Completion</strong>
            <pre>{completion}</pre>
          </CollapseNote>
        </div>
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
