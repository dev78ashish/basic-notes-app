import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { useGetNotesQuery } from '@/services/notesApi';

const AllNotes: React.FC = () => {
  const { data: notes, error, isLoading } = useGetNotesQuery();

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading notes...</p>;
  if (error) return <p className="text-sm text-destructive">Error fetching notes.</p>;

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
      {notes && notes.length > 0 ? (
        notes.map((note) => (
          <Card key={note._id} className="shadow-md">
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
              <CardDescription>
                {new Date(note.createdAt).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {note.imageUrl && (
                <img
                  src={note.imageUrl}
                  alt={note.title}
                  className="w-full h-48 object-cover rounded"
                />
              )}
              <p className="text-sm text-muted-foreground">{note.description}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">No notes found.</p>
      )}
    </div>
  );
};

export default AllNotes;
