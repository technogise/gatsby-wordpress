import React, { Component } from "react"
import { graphql } from "gatsby"

class Homepage extends Component {
  render() {
    const data = this.props.data

    return (
      <>
        <div>
          <h1>Posts</h1>
          {data.allWordpressPost.edges.map(({ node }) => (
            <div key={node.slug}>
              <a href={node.slug}>
                <h2 dangerouslySetInnerHTML={{ __html: node.title }}/>
              </a>
              <h3 dangerouslySetInnerHTML={{ __html: node.excerpt }}/>
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default Homepage

export const pageQuery = graphql`
    query {
        allWordpressPost {
            edges {
                node {
                    title
                    excerpt
                    slug
                }
            }
        }
    }
`
