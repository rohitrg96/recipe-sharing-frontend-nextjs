import { Dispatch, SetStateAction } from 'react';

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  image: string;
  starsCount: number;
  averageStars: number;
}

export interface RecipeCardsProps {
  recipes: Recipe[];
  currentPage: string;
  totalPages: number;
  onPageChange: (page: string) => Promise<void>;
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
