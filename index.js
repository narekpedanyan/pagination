import React from 'react';
import PropTypes from 'prop-types';
import PerPageControl from './per_page_control';
import './index.scss';

const Pagination = ({
  perPageOptions = [12, 24, 120],
  showPerPageControlOnBottom,
  perPageDropdownFromTop,
  onChangePerPage,
  showTopControl,
  itemsPerPage,
  currentPage,
  totalCount,
  prevAction,
  nextAction,
  selectPage
}) => {
  const pagesCount = Math.ceil(totalCount / itemsPerPage);
  return (
    <React.Fragment>
      {
        showTopControl && (
          <div className="pagination-top-control">
            <p className="items-count">
              <p>
                {`Found ${totalCount || 0} results`}
              </p>
            </p>
            <PerPageControl
              onChangePerPage={onChangePerPage}
              perPageOptions={perPageOptions}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )
      }
      {
        !showTopControl && (
          <div className="pagination-redesign">
            {
              pagesCount > 1 && (
                <React.Fragment>
                  <div className="pages">
                    <button
                      onClick={currentPage === 1 ? () => null : prevAction}
                      className="icon-arrow-down-thick1 prev"
                      disabled={currentPage === 1}
                      type="button"
                    />
                    {
                      [...(new Array(pagesCount))].map((_item, index) => {
                        const page = index + 1;
                        const showPrevSelected = page < currentPage && page + 1 === currentPage;
                        const showNextSelected = page > currentPage && page - 1 === currentPage;
                        const prevDot = page < currentPage && page + 2 === currentPage;
                        const nextDot = page > currentPage && page - 2 === currentPage;
                        const drawDot = (page !== 1 && page !== pagesCount) && (prevDot || nextDot);
                        if (page === 1 || page === pagesCount || page === currentPage || showPrevSelected || showNextSelected || prevDot || nextDot) {
                          return (
                            <button
                              className={`page ${page === currentPage ? 'active' : ''}`}
                              onClick={drawDot ? () => null : () => selectPage(page)}
                              key={page}
                              type="button"
                            >
                              {drawDot ? '...' : page}
                            </button>
                          );
                        }
                        return null;
                      })
                    }
                    <button
                      onClick={pagesCount === currentPage ? () => null : nextAction}
                      className="icon-arrow-down-thick1 next"
                      disabled={pagesCount === currentPage}
                      type="button"
                    />
                  </div>
                  {
                    showPerPageControlOnBottom && (
                      <PerPageControl
                        dropdownFromTop={perPageDropdownFromTop}
                        onChangePerPage={onChangePerPage}
                        perPageOptions={perPageOptions}
                        itemsPerPage={itemsPerPage}
                      />
                    )
                  }
                </React.Fragment>
              )
            }
          </div>
        )
      }
    </React.Fragment>
  );
};

Pagination.propTypes = {
  showPerPageControlOnBottom: PropTypes.bool,
  perPageDropdownFromTop: PropTypes.bool,
  perPageOptions: PropTypes.array,
  onChangePerPage: PropTypes.func,
  showTopControl: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,
  prevAction: PropTypes.func,
  nextAction: PropTypes.func,
  selectPage: PropTypes.func
};

export default Pagination;
