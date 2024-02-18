'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { editUserProfile } from '@/app/actions/dbActions';

import Form from './ui/form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

import { UserProps, EditUserSchema } from '@/lib/types';

const EditProfile = ({ currentUser }: { currentUser: UserProps }) => {
  const [currentFormData, setCurrentFormData] = useState({
    id: currentUser?.id || '',
    biogram: currentUser?.biogram || '',
    link: currentUser?.link || ''
  });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const editUserFormAction = async (formData: FormData) => {
    const result = EditUserSchema.safeParse({
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
      setErrorMessages([]);
      setIsPending(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <Form
          action={editUserFormAction}
          onSubmit={() => {
            setIsPending(true);
          }}
          className="flex flex-col gap-6">
          <input type="hidden" name="id" value={currentUser?.id} />
          <div>
            <Label htmlFor="biogram">Biogram</Label>
            <Input
              type="text"
              id="biogram"
              name="biogram"
              placeholder="+ Add biogram"
              required
              value={currentFormData.biogram}
              disabled={isPending}
              onChange={(e) => setCurrentFormData({ ...currentFormData, biogram: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="link">Link</Label>
            <Input
              type="text"
              id="link"
              name="link"
              placeholder="+ Add link"
              required
              value={currentFormData.link}
              disabled={isPending}
              onChange={(e) => setCurrentFormData({ ...currentFormData, link: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
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
