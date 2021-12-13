import React from 'react';
import PropTypes from 'prop-types';
import DropDown from './dropdown';

const PerPageControl = ({
  dropdownFromTop,
  onChangePerPage,
  perPageOptions,
  itemsPerPage
}) => (
  <div className="items-per-page">
    <p>Show</p>
    <DropDown
      handleChange={onChangePerPage}
      dropUp={dropdownFromTop}
      selected={itemsPerPage}
      list={perPageOptions}
    />
    <p>items per page</p>
  </div>
);

PerPageControl.propTypes = {
  dropdownFromTop: PropTypes.bool,
  perPageOptions: PropTypes.array,
  onChangePerPage: PropTypes.func,
  itemsPerPage: PropTypes.number
};

export default PerPageControl;
