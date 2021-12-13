import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldsTypes } from './fieldsTypes';
import './dropDown.scss';

const defaultMapping = {
  decimal: 'Decimal odds', // :translate
  fractional: 'Fractional odds', // :translate
  american: 'American odds', // :translate
  hongkong: 'Hong Kong odds', // :translate
  malay: 'Malay odds', // :translate
  indo: 'Indo odds', // :translate
  en: 'English', // :translate
  ru: 'Russian', // :translate
  single: 'Single Bets', // :translate
  express: 'Express Bets', // :translate
  system: 'System Bets', // :translate
  chain: 'Chain Bets' // :translate
};

const lookup = (key, passedMapping) => {
  const mapping = passedMapping || defaultMapping;
  return mapping[key] || key;
};

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected
    };
    this.onOpen = this.onOpen.bind(this);
    this.close = this.close.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.selected < state.selected && props.keepUpdated) {
      return {
        selected: props.selected
      };
    }
    return null;
  }

  onOpen() {
    const { scrollToBottom } = this.props;
    document.body.addEventListener('mouseup', this.close);
    this.setState({ opened: true });
    scrollToBottom && scrollToBottom();
  }

  onSelect(payload) {
    return () => {
      const { handleChange, handleChangeHandler } = this.props;
      handleChange(payload);
      handleChangeHandler && handleChangeHandler(payload);
      this.setState({ selected: payload });
    };
  }

  close() {
    document.body.removeEventListener('mouseup', this.close);
    setTimeout(() => {
      this.setState({ opened: false });
    });
  }

  render() {
    const { opened, selected } = this.state;
    const {
      showDisplayKeyForSelected,
      styleType = fieldsTypes[''],
      requiredField,
      lookupMapping,
      selectedKey,
      displayKey,
      className,
      addPrefix,
      disabled,
      dropUp,
      list,
      label
    } = this.props;
    let selectedDisplayKey;
    if (showDisplayKeyForSelected && displayKey && selectedKey) {
      selectedDisplayKey = list.find(data => data[selectedKey] === selected);
      selectedDisplayKey = selectedDisplayKey && selectedDisplayKey[displayKey];
    }

    return (
      <label
        className={`dropdown ${className || ''} ${dropUp ? 'drop-up' : ''} ${disabled ? 'disabled' : ''} ${styleType} ${requiredField ? 'required-field' : ''}`}
        >
        <div className="visible-ctrl">
          {label && (
            <div className="field-label">
              <p>{lookup(label, lookupMapping)}</p>
            </div>
          )}
          <div
            className={`selected-holder ${opened ? 'opened' : ''}`}
            onClick={(!opened && !disabled) ? this.onOpen : null}
            id={selected ? 'selected' : ''}
            role="presentation"
            >
            <div className="selected-label">
              <p>{lookup(selectedDisplayKey || selected || 'Select', lookupMapping)}</p>
            </div>
            <span className="dropdown-icon icon-arrow-down" />
          </div>
        </div>
        {
          opened && (
            <ul className="fallback-content">
              {
                list.map(
                  listItem => (
                    <li
                      role="presentation"
                      onClick={this.onSelect(selectedKey ? listItem[selectedKey] : listItem)}
                      key={selectedKey ? listItem[selectedKey] : listItem}
                      className={`fall-item ${(selectedKey ? listItem[selectedKey] : listItem) === selected ? 'active' : ''}`}
                      >
                      {lookup(`${displayKey ? listItem[displayKey] : listItem}${typeof addPrefix === 'function' ? ` ${addPrefix(listItem)}` : ''}`, lookupMapping)}
                    </li>
                  )
                )
              }
            </ul>
          )
        }
      </label>
    );
  }
}

DropDown.propTypes = {
  selected: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  handleChange: PropTypes.any.isRequired,
  handleChangeHandler: PropTypes.func,
  list: PropTypes.array.isRequired,
  scrollToBottom: PropTypes.func,
  displayKey: PropTypes.string,
  selectedKey: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  addPrefix: PropTypes.func,
  showDisplayKeyForSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  styleType: PropTypes.string,
  requiredField: PropTypes.bool,
  lookupMapping: PropTypes.object,
  dropUp: PropTypes.bool
};

export default DropDown;

