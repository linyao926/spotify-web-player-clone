import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from '~/styles/components/FilterBar.module.scss';

const cx = classNames.bind(styles);

const FilterBar = (props) => {
    const {
        filters, 
        onFilterChange, 
        hasAll = true, 
        defaultFilter = 'all', 
        isLibrary = false
    } = props;

  const [activeFilter, setActiveFilter] = useState(defaultFilter);

    const getHeaderButton = (text, active = false) => {
        return (
            <Button 
                variant={active ? "background-base" : "non-active"}
                borderRadius="rounded"
                size="size-small"
                padding="4px 12px"
                hoverEffect={["hover-none-scale", active ? "hover-button-light-color-highlight" : "hover-button-tinted-highlight"]} 
            >{text}</Button>
        )
    };

    const handleFilterClick = (filter) => {
        if (isLibrary && activeFilter === filter) {
            setActiveFilter(defaultFilter);
            onFilterChange(defaultFilter);
        } else {
            setActiveFilter(filter);
            onFilterChange(filter);
        }
    };

  return (
    <div className="filter-bar">
      {hasAll && !isLibrary && (
        <NavLink
          to="#"
          onClick={() => handleFilterClick('all')}
        >
          {({ isActive }) => getHeaderButton('All', isActive)}
        </NavLink>
      )}

      {filters.map((filter) =>
        isLibrary ? (
          <span
            key={filter.value}
            className={cx('btn-wrapper', activeFilter === filter.value ? 'active' : '')}
            onClick={() => handleFilterClick(filter.value)}
          >
            {getHeaderButton(filter.label)}
          </span>
        ) : (
          <NavLink
            key={filter.value}
            to={`/${filter.value}`}
            className={cx('btn-wrapper')}
            onClick={() => handleFilterClick(filter.value)}
          >
            {({ isActive }) => getHeaderButton(filter.label, isActive)}
          </NavLink>
        )
      )}
    </div>
  );
};

export default FilterBar;
