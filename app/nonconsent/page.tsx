import Link from 'next/link';
import { Button } from '@/components/ui/button';
import NonConsent from '@/components/non-consent';

const NONCONSENTDATA = [
  {
    heading: 'Using Threads without a profile',
    description: `You can use Threads without a profile to browse content, but you won't be able to post, interact or see recommendations for you.`,
    image: 'restrict'
  },
  {
    heading: 'You can change your choice at any time',
    description: `If you want to use Threads with a profile, you can log in with an Gmail account.`,
    image: 'visibility'
  },
  {
    heading: 'Terms and privacy',
    description: `This is not an actual Threads page. It is just a web dev project and
    is not affiliated with or endorsed by Threads. It serves as a
    demonstration of programming abilities in a fullstack context. You can visit the actual Threads page by going to threads.net`,
    image: 'checkmark'
  }
];

const NonConsentPage = () => {
  return (
    <main className="min-h-screen max-h-screen min-w-screen max-w-screen overflow-clip">
      <div className="flex flex-col gap-4 justify-center items-center h-screen w-screen">
        <h1 className="text-2xl font-bold text-center">Use Threads without a profile?</h1>
        <div className="flex flex-col gap-7 mb-[130px]">
          {NONCONSENTDATA.map((data) => (
            <NonConsent key={data.heading} {...data} />
          ))}
        </div>
        <div className="fixed bottom-10 flex flex-col gap-2 w-[358px]">
          <Button asChild className="rounded-2xl font-bold text-[15px] h-[52px] active:scale-[.98]">
            <Link href="/dashboard">Use without a profile</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-2xl border font-bold text-[15px] h-[52px] active:scale-[.98]">
            <Link href="/">Go back</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NonConsentPage;
