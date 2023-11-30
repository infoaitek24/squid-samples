'use client';

import { List } from '@mui/material';
import { NoteItem } from '@/components/NoteItem';
import { Note } from '@/utils/types';
import { WithQueryProps, useCollection } from '@squidcloud/react';
import { useRef } from 'react';
import { NoteModal, NoteModalRef } from '@/components//NoteModal';

export const NoteList = ({ data }: WithQueryProps<Note>) => {
  const collection = useCollection<Note>('notes');

  const handleSave = async ({ id, title, content }: Note) => {
    const timestamp = new Date();
    if (id !== '') {
      await collection.doc(id).update({
        title,
        content,
        timestamp,
      });
    } else {
      id = crypto.randomUUID();
      await collection.doc(id).insert({
        id,
        title,
        content,
        timestamp,
      });
    }
  };

  const handleDelete = ({ id }: Note) => collection.doc(id).delete();

  const noteModalRef = useRef<NoteModalRef>(null);

  const handleEditNote = (note: Note) =>
    noteModalRef.current?.handleNoteEdit(note);

  return (
    <>
      <NoteModal ref={noteModalRef} onNoteSave={handleSave} />
      <List style={{ padding: '10px 20px' }}>
        {data.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={handleEditNote}
            onDelete={handleDelete}
          />
        ))}
      </List>
    </>
  );
};
