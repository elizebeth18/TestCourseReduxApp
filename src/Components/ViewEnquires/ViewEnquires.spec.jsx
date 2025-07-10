import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ViewEnquires from './ViewEnquires';
import viewEnquiresReducer from '../../store/viewEnquiresSlice';

// 🧪 Mock DisplayEnquiry component
vi.mock('./DisplayEnquiry', () => ({
  default: ({ listOfEnquiry }) => (
    <ul>
      {listOfEnquiry.map((e, i) => (
        <li key={i}>{e.message}</li>
      ))}
    </ul>
  ),
}));

// 🧪 Mock fetchEnquiresList thunk
vi.mock('../../store/viewEnquiresSlice', async () => {
    const actual = await vi.importActual('../../store/viewEnquiresSlice');
    return {
        ...actual,
        fetchEnquiresList: () => () => { }, // stub thunk
    };
});

describe("ViewEnquires Component", () => {
    it('renders enquires list', () => {
        const mockStore = configureStore({
            reducer: {
                viewEnquires: viewEnquiresReducer,
            },
            preloadedState: {
                viewEnquires: {
                    enquiresList: [
                        { id: 1, message: 'Hello there' },
                        { id: 2, message: 'Need help' },
                    ],
                    isLoading: false,
                    error: null,
                },
            },
        });

        render(
            <Provider store={mockStore}>
                <ViewEnquires />
            </Provider>
        );
        expect(screen.getByText('List of Enquires')).toBeInTheDocument();
        expect(screen.getByText('Hello there')).toBeInTheDocument();
        expect(screen.getByText('Need help')).toBeInTheDocument();
    });
});