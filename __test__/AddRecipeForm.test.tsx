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
  });
});
