import { graphql } from 'gatsby';
import React from 'react';

import Header from '../components/header';
import Layout from '../components/layout';
import PublicationPosts from '../components/publication-posts';
import SEO from '../components/seo';
import NotFound from '../pages/404';

const Publications = ({ data }) => {
  const publications = data.allPublications.edges;
  const noPublications = !publications || !publications.length;

  if (noPublications) {
    return <NotFound />;
  }

  return (
    <Layout>
      <SEO title="Publications" />
      <Header metadata={data.site.siteMetadata} />
      {!noPublications && <PublicationPosts publications={publications} />}
    </Layout>
  );
};

export default Publications;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        name
        title
        description
        about
        author
        github
        linkedin
      }
    }
    allPublications: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/content/publications/" } }
    ) {
      edges {
        node {
          excerpt
          html
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            subDescription
          }
        }
      }
    }
  }
`;
