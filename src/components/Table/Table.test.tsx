import React from 'react';
import { render as renderRtl, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { TableProps } from './Table';
import { Table } from './Table';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

const render = (props: Partial<TableProps> = {}) => {
  const allProps = {
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableCell>Frukt</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow rowData={{ fruit: 'apple' }}>
            <TableCell>Apple</TableCell>
          </TableRow>
          <TableRow rowData={{ fruit: 'orange' }}>
            <TableCell>Orange</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
    onChange: jest.fn(),
    selectRows: true,
    selectedValue: {},
    ...props,
  };
  renderRtl(<Table {...allProps} />);
};

const user = userEvent.setup();

describe('Table', () => {
  it('should call handleChange with correct selectedValue when TableRow is clicked and selectRows is true', async () => {
    const handleChange = jest.fn();
    render({ onChange: handleChange, selectRows: true });

    await user.click(screen.getByRole('row', { name: 'Apple' }));
    expect(handleChange).toHaveBeenCalledWith({
      selectedValue: { fruit: 'apple' },
    });
  });
});

describe('Table', () => {
  it('should not call handleChange when when selectRows is false and TableRow is clicked', async () => {
    const handleChange = jest.fn();
    render({ onChange: handleChange, selectRows: false });

    await user.click(screen.getByRole('row', { name: 'Apple' }));
    expect(handleChange).toHaveBeenCalledTimes(0);
  });
});
