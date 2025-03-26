import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DropdownCleaner from './DropdownCleaner';

describe('<DropdownCleaner />', () => {
  test('Deve chamar onClean ao clicar no componente', async () => {
    const onCleanMock = jest.fn();
    render(<DropdownCleaner onClean={onCleanMock} />);
    const cleanerElement = screen.getByTestId('dropdown-cleaner');
    await userEvent.click(cleanerElement);
    expect(onCleanMock).toHaveBeenCalledTimes(1);
  });
});
