import { graphql } from 'gatsby';
import moment from 'moment';
import React from 'react';

import Header from '../components/header';
import Layout from '../components/layout';
import SEO from '../components/seo';

const classes = {
  wrapper: 'mt-16 blog-content',
  title: 'mt-16 text-4xl text-gray-900 font-bold mb-2',
  date: 'text-gray-600 font-light',
};

const PublicationPost = ({ data }) => {
  const publication = data.markdownRemark;

  return (
    <Layout>
      <Header metadata={data.site.siteMetadata} />
      <SEO title={publication.frontmatter.title} />
      <h1 className={classes.title}>{publication.frontmatter.title}</h1>
      {publication.frontmatter.date && (
        <p className={classes.date}>
          Published on {moment(publication.frontmatter.date).format('MMMM D, YYYY')}
        </p>
      )}
      <div
        className={classes.wrapper}
        dangerouslySetInnerHTML={{ __html: publication.html }}
      />
    </Layout>
  );
};

export default PublicationPost;

export const pageQuery = graphql`
  query PublicationPostBySlug($slug: String!) {
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
