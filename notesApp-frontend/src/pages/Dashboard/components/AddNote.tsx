import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { noteFormSchema, type NoteFormSchema } from '@/schema/formSchema';
import { toast } from 'sonner'; // or any toast lib you use
import { useCreateNoteMutation, useUploadImageMutation } from '@/services/notesApi';
import { LoaderCircle } from 'lucide-react';

const AddNote: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const [uploadImage, {isLoading: isImageUploading}] = useUploadImageMutation();
  const [createNote, {isLoading: isNoteCreating}] = useCreateNoteMutation();

  const form = useForm<NoteFormSchema>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: '',
      description: '',
      image: null,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: NoteFormSchema) => {
    try {
      // 1. Upload image
      const formData = new FormData();
      formData.append('file', data.image as File);

      const imageRes = await uploadImage(formData).unwrap();

      // 2. Create note with image data
      await createNote({
        title: data.title,
        description: data.description,
        imageUrl: imageRes.imageUrl,
        imagePublicId: imageRes.imagePublicId,
      }).unwrap();

      toast.success('Note created successfully!');
      form.reset();
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to create note');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Add Note</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="space-y-4"
        >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FormControl>
                <FormMessage />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 rounded-lg max-h-48 object-cover"
                  />
                )}
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isImageUploading || isNoteCreating}>
            {isImageUploading || isNoteCreating ? (
                <span className='flex items-center gap-2'><LoaderCircle className='animate-spin'/>Adding a note...</span>
            ): (
                <span>Add a note</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddNote;
