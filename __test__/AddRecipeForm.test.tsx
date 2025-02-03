import { render, screen } from '@testing-library/react';
import AddRecipeForm from '@/components/AddRecipe/AddRecipeForm';

// Mock the `useRouter` hook from Next.js
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('AddRecipeForm Component', () => {
  it('should render the form fields correctly', () => {
    render(<AddRecipeForm />);

    const myElem = screen.getByLabelText('Recipe Title');

    // Check for Title field
    expect(myElem).toBeInTheDocument();

    // Check for Ingredients field
    expect(screen.getByText('Ingredients')).toBeInTheDocument();

    // Check for Steps field
    expect(screen.getByText('Steps')).toBeInTheDocument();

    // Check for Preparation Time field
    expect(
      screen.getByLabelText('Preparation Time (in minutes)')
    ).toBeInTheDocument();

    // Check for Image upload section
    expect(screen.getByText('Image Upload')).toBeInTheDocument();

    // Check for Submit Button
    expect(
      screen.getByRole('button', { name: /Submit Recipe/i })
    ).toBeInTheDocument();
  });
});
