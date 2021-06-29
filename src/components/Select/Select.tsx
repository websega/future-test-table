import React, { useState } from 'react';

import classNames from 'classnames';

import ArrowIcon from '../../assets/images/icons/arrow.svg';

import Button from '../Button';

import classes from './Select.modules.scss';

type SelectPropsType = {
  onClickItem: (userPer: string) => void;
  items: Array<string>;
};

const Select = ({ onClickItem, items }: SelectPropsType): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [value, setValue] = useState<string>(items[0]);

  const handleClickItem = (val: string) => {
    onClickItem(val);
    setValue(val);
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
      const userPer = items[activeSuggestion];
      onClickItem(userPer);
      setValue(userPer);
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
        size="s"
        icon={<ArrowIcon />}
        rotateIcon={isOpen}
        onMouseDown={() => setIsOpen(!isOpen)}
        iconPosition="right"
      >
        <div className={classes.value}>{value}</div>
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
