'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormState } from 'react-hook-form';
import { z } from 'zod';

import { editUserProfile } from '@/app/actions/dbActions';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

import { UserProps } from '@/lib/types';

const formSchema = z.object({
  biogram: z
    .string()
    .min(2, {
      message: 'Biogram must be at least 2 characters.'
    })
    .max(50, { message: 'Biogram must be max 50 characters.' }),
  link: z.string().url({ message: 'Please enter a valid URL.' })
});

const EditProfile = ({ currentUser }: { currentUser: UserProps }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      biogram: currentUser?.biogram as string,
      link: currentUser?.link as string
    }
  });
  const { control } = useForm<z.infer<typeof formSchema>>();
  const { isDirty, isSubmitting } = useFormState({ control });

  function onSubmit(values: z.infer<typeof formSchema>) {
    editUserProfile(currentUser?.id as string, values.biogram, values.link);
    location.reload();
    console.log(isSubmitting);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full h-[35px] rounded-lg"
          variant="outline"
          onClick={() => {
            form.reset();
          }}>
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%]">
        <div>
          <Label>Name</Label>
          <p>🔒{currentUser.username}</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              disabled={isSubmitting}
              control={form.control}
              name="biogram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biogram</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+ Add biogram"
                      {...field}
                      className="border-b-2 border-border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isSubmitting}
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+ Add link"
                      {...field}
                      className="border-b-2 border-border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" aria-disabled={!isDirty} disabled={!isDirty}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
