import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: Record<string, unknown>) => <img alt="" {...props} />,
}));

describe('Home page', () => {
  it('renders the Learn link', () => {
    render(<Home />);
    expect(screen.getByText('Learn')).toBeInTheDocument();
  });
});
