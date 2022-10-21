import React, { useState } from 'react';
import cn from 'classnames';

import classes from './TableCell.module.css';
import type { ChangeHandler } from './Context';
import { useSortContext, useTableRowTypeContext, Variant } from './Context';
import { ReactComponent as SortIcon } from './sort_arrow.svg';

export interface TableCellProps {
  children?: React.ReactNode;
  variant?: string;
  colSpan?: number;
  type?: string;
  src?: string;
  alt?: string;
  sortable?: boolean;
  onChange?: ChangeHandler;
}

export const TableCell = ({
  children,
  colSpan = 1,
  variant,
  sortable,
  onChange,
}: TableCellProps) => {
  const { selectSort } = useSortContext();
  const { variantStandard } = useTableRowTypeContext();
  const [sortType, setSortType] = useState('');

  const handleChange = () => {
    if (onChange != undefined && children != undefined) {
      if (sortType === 'asc') {
        onChange({
          selectedValue: children?.toString(),
          selectedSortType: sortType,
        });
        setSortType('dec');
      } else if (sortType === '' || sortType === 'dec') {
        onChange({
          selectedValue: children?.toString(),
          selectedSortType: sortType,
        });
        setSortType('asc');
      }
    }
  };
  return (
    <>
      {(variant == undefined
        ? variantStandard === Variant.Header
        : variant === 'header') && (
        <th
          className={cn(classes['header-table-cell'])}
          colSpan={colSpan}
        >
          <div
            className={
              sortable
                ? cn(classes['container-sortable'])
                : cn(classes['container'])
            }
            onClick={() => handleChange()}
            onKeyUp={() => handleChange()}
            role={sortable ? 'button' : undefined}
            tabIndex={sortable ? 0 : undefined}
          >
            <div className={cn(classes['input'])}>{children}</div>
            {sortable && (
              <SortIcon
                className={cn(classes['icon'], {
                  [classes['icon-asc']]:
                    sortType === 'asc' && selectSort === children?.toString(),
                  [classes['icon-dec']]:
                    sortType === 'dec' && selectSort === children?.toString(),
                })}
              ></SortIcon>
            )}
          </div>
        </th>
      )}
      {(variant == undefined
        ? variantStandard === Variant.Body
        : variant === 'body') && (
        <>
          <td
            className={cn(classes['body-table-cell'])}
            colSpan={colSpan}
          >
            <div className={cn(classes['input'])}>{children}</div>
          </td>
        </>
      )}
      {variantStandard === Variant.Footer && (
        <td colSpan={colSpan}>
          <div className={cn(classes['input'])}>{children}</div>
        </td>
      )}
    </>
  );
};

export default TableCell;