import React, { useState } from 'react';

import classNames from 'classnames';

import ArrowIcon from '../../assets/images/icons/arrow.svg';

import Button from '../Button';

import classes from './Select.modules.scss';

type SelectPropsType = {
  onClickItem: (val: string) => void;
  items: Array<string>;
  placeholder?: string;
  value: string;
};

const Select = ({
  onClickItem,
  items,
  placeholder,
  value,
}: SelectPropsType): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);

  const handleClickItem = (val: string) => {
    onClickItem(val);
    setIsOpen(false);
  };

  const handleClickKeyDownItem = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      (e.code === 'ArrowUp' && activeSuggestion === 0) ||
      (e.code === 'ArrowDown' && activeSuggestion + 1 === items?.length)
    ) {
      return;
    }

    if (e.code === 'ArrowUp') {
      setActiveSuggestion(activeSuggestion - 1);
    }

    if (e.code === 'ArrowDown') {
      setActiveSuggestion(activeSuggestion + 1);
    }

    if (e.code === 'Enter' && items) {
      const val = items[activeSuggestion];
      onClickItem(val);
      setIsOpen(false);
    }
  };

  return (
    <div
      className={classes.wrapper}
      role="presentation"
      onKeyDown={handleClickKeyDownItem}
    >
      <Button
        size="l"
        icon={<ArrowIcon />}
        rotateIcon={isOpen}
        onMouseDown={() => setIsOpen(!isOpen)}
        iconPosition="right"
        iconSize="s"
      >
        <div className={classes.value}>{value || placeholder}</div>
      </Button>

      {isOpen && (
        <ul className={classes.list}>
          {items.map((item, i) => {
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <li
                className={classNames(classes.item, {
                  [classes.active]: activeSuggestion === i,
                })}
                onClick={() => handleClickItem(item)}
                key={item}
                role="menuitem"
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
