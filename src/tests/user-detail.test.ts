import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';
import { GET_USERS_API_ENDPOINT } from '../shared/constants';
import UserDetail from '../components/UserDetail';

export const DUMMY_USER = {
  id: 1,
  name: 'Linh Nguyen D.Q.',
  email: 'linh.nguyen@supremetech.vn'
};

const API_ENDPOINT = `${GET_USERS_API_ENDPOINT}/${DUMMY_USER.id}`;

const server = setupServer(
  rest.get(`${API_ENDPOINT}`, (req, res, ctx) => {
    return res(ctx.json(DUMMY_USER ));
  }),
);

describe('Users Detail Page', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('Navigated from list and Fetching data success!', async () => {
    render(
      <MemoryRouter initialEntries={['/users']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Fetching Users')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('users-list')).toBeInTheDocument();
    });

    expect(screen.queryByText('Fetching Users')).toBeNull();

    act(() => {
      fireEvent.click(screen.getByTestId(`${DUMMY_USER.id}`));
    });

    await waitFor(() => {
      expect(screen.getByRole('user-name')).toBeInTheDocument();
      expect(screen.getByRole('user-name')).toHaveTextContent(`${DUMMY_USER.name}`);
    });
  });
  test('Fetching data not found!', async () => {
    render(
      <UserDetail />, { wrapper: BrowserRouter }
    );

    server.use(
      rest.get(`${API_ENDPOINT}`, (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole('detail-page')).toHaveTextContent('User not found');
    });
  });
});
