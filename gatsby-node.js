const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.jsx`);
  const publicationPost = path.resolve(`./src/templates/publication-post.jsx`);
  const result = await graphql(
    `
      {
        allBlogPosts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        allPublications: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: { fileAbsolutePath: { regex: "/content/publications/" } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.allBlogPosts.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  // Create publication pages.
  const publications = result.data.allPublications.edges;

  publications.forEach((publication, index) => {
    const previous =
      index === publications.length - 1
        ? null
        : publications[index + 1].node;
    const next = index === 0 ? null : publications[index - 1].node;

    createPage({
      path: publication.node.fields.slug,
      component: publicationPost,
      context: {
        slug: publication.node.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const parent = getNode(node.parent);
    const source = parent.sourceInstanceName;
    const value = createFilePath({ node, getNode, basePath: source });
    let slugPrefix = '';

    if (source === 'blog') {
      slugPrefix = '/blog';
    } else if (source === 'publications') {
      slugPrefix = '/publications';
    }

    createNodeField({
      name: `slug`,
      node,
      value: `${slugPrefix}${value}`,
    });

    createNodeField({
      name: `type`,
      node,
      value: source === 'publications' ? 'publication' : 'blog',
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type SiteSiteMetadata {
      siteUrl: String
      name: String
      title: String
      description: String
      author: String
      github: String
      linkedin: String
      about: String
      projects: [SectionItem]
      experience: [SectionItem]
      skills: [SectionItem]
    }

    type SectionItem {
      name: String!
      description: String!
      link: String!
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      subDescription: String
      date: Date @dateformat
    }
    
    type Fields {
      slug: String
      type: String
    }
  `;
  createTypes(typeDefs);
};
