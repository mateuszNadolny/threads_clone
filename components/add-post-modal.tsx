'use client';

import { useState, useEffect, useRef } from 'react';

import { useUser } from '@clerk/nextjs';

import { findUserByClerkId, createPost } from '@/app/actions/dbActions';

import { CreatePostSchema } from '@/lib/types';

import { SquarePen, ImagePlus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import Form from '@/components/ui/form';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const AddPostModal = () => {
  const [value, setvalue] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useUser();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  const createPostFormAction = async (formData: FormData) => {
    const result = CreatePostSchema.safeParse({
      userId: await findUserByClerkId(user?.id as string),
      text: formData.get('text') as string,
      image: formData.get('image') as string
    });

    if (!result.success) {
      setErrorMessages(result.error.issues.map((issues) => issues.message));
      setIsPending(false);
      return;
    }

    try {
      console.log(result.data);
      await createPost(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setErrorMessages([]);
      setIsPending(false);
      setOpen(false);
      setvalue('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SquarePen className="h-[30px] w-[30px] stroke-border" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-auto overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">New Thread</DialogTitle>
        </DialogHeader>
        <Form
          action={createPostFormAction}
          onSubmit={() => {
            setIsPending(true);
          }}
          className="flex flex-col gap-6">
          {/* <input type="hidden" name="userId" value={currentUserId} /> */}
          <div className="flex items-center space-x-2">
            <div className="flex flex-col w-full gap-6">
              <Textarea
                id="link"
                name="text"
                disabled={isPending}
                className="resize-none h-auto h-[100px]"
                placeholder="Start new thread..."
                value={value}
                onChange={(e) => setvalue(e.target.value)}
                ref={textAreaRef}
              />
              <input type="hidden" name="image" value="image" />
              <ImagePlus className="ml-3 stroke-[#777777]" />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Publishing...' : 'Publish'}
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

export default AddPostModal;
