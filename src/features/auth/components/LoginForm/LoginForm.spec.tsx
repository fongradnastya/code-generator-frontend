import { screen } from '@testing-library/react';

import { render } from 'src/tests/render';

import { LoginForm } from './LoginForm';

describe('LoginForm', () => {

  it('should render the form', () => {
    render(<LoginForm />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
