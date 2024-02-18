'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';

import { z } from 'zod';
import { editUserProfile } from '@/app/actions/dbActions';

import Form from './ui/form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

import { UserProps } from '@/lib/types';

const schema = z.object({
  id: z.string().uuid(),
  biogram: z
    .string()
    .trim()
    .min(5, { message: 'Biogram must be at least 5 characters' })
    .max(50, { message: 'Biogram must not exceed 50 characters' }),
  link: z
    .string()
    .trim()
    .url({ message: 'Link must be a valid URL' })
    .min(5, { message: 'Link must be at least 5 characters' })
    .max(50, { message: 'Link must not exceed 50 characters' })
});

const EditProfile = ({ currentUser }: { currentUser: UserProps }) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { pending } = useFormStatus();

  const editUserFormAction = async (formData: FormData) => {
    setIsPending(true);
    console.log(pending);
    const result = schema.safeParse({
      id: formData.get('id') as string,
      biogram: formData.get('biogram') as string,
      link: formData.get('link') as string
    });

    if (!result.success) {
      setErrorMessages(result.error.issues.map((issues) => issues.message));
      setIsPending(false);
      return;
    }

    try {
      await editUserProfile(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
      setErrorMessages([]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full h-[35px] rounded-lg" variant="outline">
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%]">
        <div>
          <Label>Name</Label>
          <p>🔒{currentUser.username}</p>
        </div>
        <Form action={editUserFormAction} className="flex flex-col gap-6">
          <input type="hidden" name="id" value={currentUser?.id} />
          <div>
            <Label htmlFor="biogram">Biogram</Label>
            <Input type="text" id="biogram" name="biogram" placeholder="+ Add biogram" required />
          </div>
          <div>
            <Label htmlFor="link">Link</Label>
            <Input type="text" id="link" name="link" placeholder="+ Add link" required />
          </div>
          <Button type="submit" className="w-full" aria-disabled={isPending}>
            Save
          </Button>
          {pending && <p>Saving...</p>}
          {errorMessages.length > 0 &&
            errorMessages.map((message) => (
              <p className="text-red-500" key={message}>
                {message}
              </p>
            ))}
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
