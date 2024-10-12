import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { App } from 'src/App';
import { UserSecretStorageService } from 'src/api/services/userSecretStorage';
import { MIN_PASSWORD_LENGTH_ERROR_MESSAGE } from 'src/mocks/dtos/loginDto';
import { buildLoginMock } from 'src/mocks/models/login';
import { render, screen, waitForElementToBeRemoved } from 'src/utils/tests';

const waitForLoading = (): Promise<void> => (
  waitForElementToBeRemoved(() => screen.queryByRole('progressbar')));

describe('Login', () => {

  beforeEach(async() => {
    await UserSecretStorageService.clear();
  });

  it('redirects to login page after user clicks on login button', async() => {
    render(<App />);
    await waitForLoading();
    await userEvent.click(screen.getByRole('link', { name: /login/i }));

    expect(await screen.findByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('login user with correct credentials', async() => {
    render(<App />, { initialRoute: '/login' });
    await waitForLoading();

    const { email, password } = buildLoginMock();

    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/password/i), password);

    const loginButton = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(loginButton);
    expect(loginButton).toBeDisabled();

    expect(await screen.findByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('shows error message from the server', async() => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => undefined);

    render(<App />, { initialRoute: '/login' });

    await waitForLoading();

    const { email, password } = buildLoginMock({ password: faker.internet.password(4) });

    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/password/i), password);

    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(MIN_PASSWORD_LENGTH_ERROR_MESSAGE)).toBeInTheDocument();
  });
});
