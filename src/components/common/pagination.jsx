import React from "react";
import _ from "lodash"; // Optimized version of Underscore.js

const Pagination = props => {
  const { itemsCount, pageSize } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null; // Nothing will be rendered
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul class="pagination">
        {pages.map(page => (
          <li key={page} class="page-item">
            <a class="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
