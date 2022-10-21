import React from 'react';
import cn from 'classnames';

import { IconVariant } from './utils';
import { ReactComponent as ErrorIcon } from './error.svg';
import classes from './TextField.module.css';

export interface IconProps {
  variant?: IconVariant;
}

export const Icon = ({ variant }: IconProps) => {
  if (variant === IconVariant.Error) {
    return (
      <div className={cn(classes['input-wrapper__icon'])}>
        <ErrorIcon data-testid='input-icon-error' />
      </div>
    );
  }

  return null;
};