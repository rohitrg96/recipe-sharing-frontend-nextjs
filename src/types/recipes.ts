import { Dispatch, SetStateAction } from 'react';

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  image: string;
  starsCount: number;
  averageStars: number;
}

export interface UserComment {
  _id: string;
  comment: string;
  createdAt: string;
}

export interface UserRating {
  _id: string;
  rating: string;
  createdAt: string;
}

export interface UserFeedback {
  data: {
    checkIfUserhasCommented: UserComment | null;
    checkIfUserhasRated: UserRating | null;
  };
}

// Define types for Recipe and UserFeedback
export interface RecipeData {
  _id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  image: string | null;
  preparationTime: number;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  stars: Array<{
    user: { _id: string; firstName: string; lastName: string; email: string };
    rating: number;
    _id: string;
  }>;
  comments: Comment[];
}

export interface Comment {
  user: { _id: string; firstName: string; lastName: string; email: string };
  comment: string;
  _id: string;
  createdAt: string;
}

export interface RecipeCardsProps {
  recipes: Recipe[];
  currentPage: string;
  totalPages: number;
  onPageChange: (page: SetStateAction<string>) => void;
}

export interface HomePageProps {
  initialFilters: Filter;
  initialRecipes: Recipe[];
  initialTotalPages: number;
}

export interface Filter {
  minRating: string;
  maxPreparationTime: string;
  ingredients: string;
}

export interface HeaderProps {
  filters: Filter;
  onFiltersChange: (key: string, value: string | number) => void;
  setFiltersState: Dispatch<SetStateAction<Filter>>;
  initialFilters: Filter;
}

interface Pagination {
  totalPages: number;
  total: number;
  page: number;
  limit: number;
}

export interface FetchRecipesResponse {
  data: Recipe[];
  pagination: Pagination;
}
