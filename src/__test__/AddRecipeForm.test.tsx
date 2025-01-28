// import { render, screen } from '@testing-library/react';
// import AddRecipeForm from '@components/AddRecipe/AddRecipeForm';

// describe('AddRecipeForm Component', () => {
//   it('should render the form fields correctly', () => {
//     render(<AddRecipeForm />);

//     // Check for Title field
//     expect(screen.getByLabelText('Recipe Title')).toBeInTheDocument();

//     // Check for Ingredients field
//     expect(screen.getByText('Ingredients')).toBeInTheDocument();

//     // Check for Steps field
//     expect(screen.getByText('Steps')).toBeInTheDocument();

//     // Check for Preparation Time field
//     expect(
//       screen.getByLabelText('Preparation Time (in minutes)')
//     ).toBeInTheDocument();

//     // Check for Image upload section
//     expect(screen.getByText('Image Upload')).toBeInTheDocument();

//     // Check for Submit Button
//     expect(
//       screen.getByRole('button', { name: /Submit Recipe/i })
//     ).toBeInTheDocument();
//   });
// });
