//import Layout from "../../components/Layout"
import PropTypes from "prop-types"
import React from "react"
import { graphql } from "gatsby"

const Post = ({data}) => {
    const post = data.wpPost
    return (
		  <main>
			<h1>{post.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: post.content }} />
		  </main>
    )
}

Post.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}
export default Post
export const pageQuery = graphql`
  query($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      content
    }
  }`