import { render, screen } from '@testing-library/react';
import CoreApp from './CoreApp';

test('renders learn react link', () => {
  render(<CoreApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
