import Link from "next/link";
import { Button } from "@/components/ui/button";
import NonConsent from "@/components/NonConsent";

const NONCONSENTDATA = [
  {
    heading: "Using Threads without a profile",
    description: `You can use Threads without a profile to browse content, but you won't be able to post, interact or see recommendations for you.`,
    image: "/restrict.svg",
  },
  {
    heading: "You can change your choice at any time",
    description: `If you want to use Threads with a profile, you can log in with an Gmail account.`,
    image: "/visibility.svg",
  },
  {
    heading: "Terms and privacy",
    description: `This is not an actual Threads page. It is just a web dev project and
    is not affiliated with or endorsed by Threads. It serves as a
    demonstration of programming abilities in a fullstack context. You can visit the actual Threads page by goint to threads.net`,
    image: "/checkmark.svg",
  },
];

const NonConsentPage = () => {
  return (
    <main className='bg-[#0a0a0a] min-h-screen max-h-screen min-w-screen max-w-screen overflow-clip'>
      <div className='flex flex-col gap-4 justify-center items-center h-screen w-screen'>
        <h1 className='text-2xl font-bold text-center'>
          Use Threads without a profile?
        </h1>
        <div className='flex flex-col gap-7 mb-[130px]'>
          {NONCONSENTDATA.map((data) => (
            <NonConsent key={data.heading} {...data} />
          ))}
        </div>
        <div className='fixed bottom-10 flex flex-col gap-2 w-[358px]'>
          <Button
            asChild
            className='rounded-2xl bg-[#f3f5f7] text-[#0a0a0a] font-bold text-[15px] h-[52px] active:scale-[.98] hover:bg-[#f3f5f7] hover:text-[#0a0a0a]'
          >
            <Link href='/dashboard'>Use without a profile</Link>
          </Button>
          <Button
            asChild
            className='rounded-2xl bg-transparent border border-[#2e2e2e] font-bold text-[15px] h-[52px] active:scale-[.98] hover:bg-transparent hover:text-[#f3f5f7]'
          >
            <Link href='/'>Go back</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NonConsentPage;
