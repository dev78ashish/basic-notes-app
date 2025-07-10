import { Apis } from "./api";

// interface Note {
//   _id: string;
//   title: string;
//   content: string;
//   userId: string;
//   createdAt: string;
// }
export const notesApi = Apis.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<any, void>({
      query: () => ({
        url: '/note/get-notes',
        method: 'GET',
      }),
    }),

    // ⬇️ Upload image first
    uploadImage: builder.mutation<{ imageUrl: string; imagePublicId: string }, FormData>({
      query: (formData) => ({
        url: '/upload/image',
        method: 'POST',
        body: formData,
      }),
    }),

    // ⬇️ Then create note using image response
    createNote: builder.mutation<any, {
      title: string;
      description: string;
      imageUrl: string;
      imagePublicId: string;
    }>({
      query: (noteData) => ({
        url: '/note/create-note',
        method: 'POST',
        body: noteData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNotesQuery,
  useUploadImageMutation,
  useCreateNoteMutation,
} = notesApi;
