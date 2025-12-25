import { Link } from 'gatsby';
import React from 'react';

const classes = {
  wrapper: 'mb-6 flex items-center gap-4',
  thumbnailWrapper: 'w-20 h-20 flex-none overflow-hidden rounded-xl',
  thumbnail: 'w-full h-full object-cover',
  thumbnailPlaceholder: 'bg-gray-200',
  content: 'flex-1 min-w-0',
  name: 'text-sm font-semibold text-gray-900 pb-1',
  description: 'text-sm text-gray-600 font-light',
};

const SummaryItem = ({
  name,
  description,
  subDescription,
  link = false,
  internal = false,
  thumbnailSrc = false,
  thumbnailAlt = '',
}) => {
  let linkContent;
  if (internal) {
    linkContent = <Link to={link}>{name}</Link>;
  } else {
    linkContent = <a href={link}>{name}</a>;
  }

  return (
    <div className={classes.wrapper}>
      {thumbnailSrc ? (
        <div className={classes.thumbnailWrapper}>
          <img
            className={classes.thumbnail}
            src={thumbnailSrc}
            alt={thumbnailAlt || name}
            loading="lazy"
          />
        </div>
      ) : <div className={classes.thumbnailWrapper + " " + classes.thumbnailPlaceholder}></div>
      }
      <div className={classes.content}>
        <h3
          className={`${classes.name} ${
            link ? 'hover:underline hover:text-black' : ''
          }`}
        >
          {link ? linkContent : name}
        </h3>
        <p className={classes.description}>{description}</p>
        { subDescription && <p className={classes.description}>{subDescription}</p> }
      </div>
    </div>
  );
};

export default SummaryItem;
