import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Add/i);
  expect(buttonElement).toBeInTheDocument();
});


// it('App should match with snapshot', () => {
//   expect(render(<App />)).toMatchSnapshot()  // snapshot from component 
// })