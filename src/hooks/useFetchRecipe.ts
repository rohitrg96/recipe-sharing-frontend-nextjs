import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { RecipeData, UserFeedback } from '@/types/recipes';
import {
  addComment,
  fetchRecipeService,
  fetchUserFeedback,
  addRating,
} from '@/services/recipeServices';
import { getAuthToken } from '@/utils/getAuthToken';

const useRecipeDetails = (initialData: RecipeData) => {
  const recipeId = initialData._id;
  const token = getAuthToken(false, null);
  const [newComment, setNewComment] = useState('');
  // const [rating, setRating] = useState<number | null>(null);
  const queryClient = useQueryClient();

  /**
   * Fetch recipe data using React Query.
   * The queryKey and query function are memoized using `useMemo`.
   */
  const recipeQueryKey = useMemo(() => ['recipe', recipeId], [recipeId]);

  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery<RecipeData>({
    queryKey: recipeQueryKey,
    queryFn: () => fetchRecipeService(recipeId, token),
    initialData,
  });

  // Mutation for adding comments
  const commentMutation = useMutation({
    mutationFn: (comment: string) => addComment(recipeId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: recipeQueryKey,
      });
    },
  });

  // Handle comment submission
  const handleSubmitComment = () => {
    if (newComment.trim()) {
      commentMutation.mutate(newComment);
      setNewComment('');
    }
  };

  /**
   * Fetch user feedback using React Query.
   * Memoizing the queryKey to ensure stability across renders.
   */
  const userFeedbackQueryKey = useMemo(
    () => ['userFeedback', recipeId],
    [recipeId]
  );
  const { data: userFeedback, isLoading: isFeedbackLoading } =
    useQuery<UserFeedback>({
      queryKey: userFeedbackQueryKey,
      queryFn: () => fetchUserFeedback(recipeId, token),
    });

  /**
   * Memoized userComment and userRating to avoid recalculating them unnecessarily.
   */
  const userComment = useMemo(
    () => userFeedback?.data.checkIfUserhasCommented || null,
    [userFeedback]
  );
  const userRating = useMemo(
    () => userFeedback?.data.checkIfUserhasRated || null,
    [userFeedback]
  );

  /**
   * Mutation to add a rating.
   * The mutation function and invalidation logic are memoized using `useCallback`.
   */
  const addRatingMutation = useMutation({
    mutationFn: useCallback(
      (newRating: number) => addRating(recipeId, newRating, token),
      [recipeId, token]
    ),
    onSuccess: useCallback(() => {
      queryClient.invalidateQueries({ queryKey: recipeQueryKey });
      queryClient.invalidateQueries({ queryKey: userFeedbackQueryKey });
    }, [queryClient, recipeQueryKey, userFeedbackQueryKey]),
  });

  const handleRate = (newRating: number) => {
    addRatingMutation.mutate(newRating, {
      onError: (error) => {
        console.error('Error submitting rating:', error);
      },
    });
  };

  return {
    recipe,
    isLoading,
    error,
    userFeedback,
    userComment,
    userRating,
    newComment,
    isFeedbackLoading,
    handleRate,
    setNewComment,
    handleSubmitComment,
  };
};

export default useRecipeDetails;
