import { render, screen } from '@testing-library/react';
import { Badge } from '../../../components/ui/Badge';

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies primary variant class by default', () => {
    render(<Badge>Primary</Badge>);
    const badge = screen.getByText('Primary');
    expect(badge).toHaveClass('bg-primary');
    expect(badge).toHaveClass('text-white');
  });

  it('applies secondary variant class', () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    const badge = screen.getByText('Secondary');
    expect(badge).toHaveClass('bg-gray-200');
    expect(badge).toHaveClass('text-gray-800');
  });

  it('applies danger variant class', () => {
    render(<Badge variant="danger">Danger</Badge>);
    const badge = screen.getByText('Danger');
    expect(badge).toHaveClass('bg-red-500');
    expect(badge).toHaveClass('text-white');
  });

  it('applies success variant class', () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText('Success');
    expect(badge).toHaveClass('bg-green-500');
  });

  it('applies warning variant class', () => {
    render(<Badge variant="warning">Warning</Badge>);
    const badge = screen.getByText('Warning');
    expect(badge).toHaveClass('bg-yellow-500');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByText('Custom');
    expect(badge).toHaveClass('custom-class');
  });
});
