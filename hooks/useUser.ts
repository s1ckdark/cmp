import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { login } from '#/services/auth';

const getUserAll = () => {
  return useQuery(["posts"], exampleService.getAllPosts());
};

const getUserById = () => {
  return useQuery(["posts"], exampleService.getByUserId());
}

// const useCreatePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     () => {
//       return exampleService.addPost();
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("posts");
//       },
//     }
//   );
// };

// const useUpdatePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     () => {
//       return exampleService.updatePost();
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("posts");
//       },
//     }
//   );
// };

// const useDeletePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     () => {
//       return exampleService.deletePost();
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("posts");
//       },
//     }
//   );
// };

export {
  getUserAll,
  getUserById
};