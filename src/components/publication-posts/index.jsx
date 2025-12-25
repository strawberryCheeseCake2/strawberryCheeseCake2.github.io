import React from 'react';

import Section from '../section';
import SummaryItem from '../summary-item';

const getFirstImageSrc = (html = '') => {
  if (!html) return '';
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : '';
};

const PublicationPosts = ({ publications }) => {
  return (
    <Section title="All Publications">
      {publications.map((publication) => (
        <SummaryItem
          key={publication.node.fields.slug}
          name={publication.node.frontmatter.title}
          description={publication.node.frontmatter.description}
          link={publication.node.fields.slug}
          internal
          thumbnailSrc={getFirstImageSrc(publication.node.html)}
        />
      ))}
    </Section>
  );
};

export default PublicationPosts;
