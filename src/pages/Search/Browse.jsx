import React, { useRef } from 'react';
import { useLoaderData } from "react-router";
import ScrollWrapper from '~/components/ScrollWrapper/ScrollWrapper';
import BrowseCard from '~/components/Card/BrowseCard/BrowseCard';
import classNames from 'classnames/bind';
import styles from '~/styles/pages/Search.module.scss';

const cx = classNames.bind(styles);

function Browse() {
    const { browse } = useLoaderData();

    const contentRef = useRef(null);

    // console.log(browseData);

    const browseCards = browse?.categories?.items?.map((item) => (
      <BrowseCard 
          key={item.id}
          routeLink={`/genre/${item.id}`}
          title={item.name}
          imgUrl={item.icons[0].url}
      />
    ))

    return (
      <>
          <ScrollWrapper target={contentRef} />
          <div className={cx('browse-page', 'search-page-content')} ref={contentRef}>
            <h3>Browse all</h3>
            <div className={cx('browse-content')}>{browseCards}</div>
          </div>
      </>
    );
}
  
export default Browse;