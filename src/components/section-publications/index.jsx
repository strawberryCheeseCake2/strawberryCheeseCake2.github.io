import React from 'react';

import { Link } from 'gatsby';
import Section from '../section';
import SummaryItem from '../summary-item';

const getFirstImageSrc = (html = '') => {
  if (!html) return '';
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : '';
};

const SectionPublications = ({ publications }) => {
  if (!publications.length) return null;

  return (
    <Section title="Publications">
      {publications.map((publication) => (
        <SummaryItem
          key={publication.node.fields.slug}
          name={publication.node.frontmatter.title}
          description={publication.node.frontmatter.description}
          subDescription={publication.node.frontmatter.subDescription}
          link={publication.node.fields.slug}
          internal
          thumbnailSrc={getFirstImageSrc(publication.node.html)}
        />
      ))}
      {publications.length >= 5 && (
        <Link
          className="text-gray-500 text-sm hover:text-black"
          to="/publications"
        >
          View all publications &rarr;
        </Link>
      )}
    </Section>
  );
};

export default SectionPublications;
