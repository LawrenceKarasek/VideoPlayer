import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

it('Header should be displayed on loading', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText('React Demo of useEffect, useCallback and useRef to manage a Video Player')).toBeDefined();
  });
});
