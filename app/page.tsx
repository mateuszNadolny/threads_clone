import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='overflow-clip h-screen max-h-screen w-screen max-w-screen flex flex-col items-center'>
      <div className='max-h-[55vh] h-[55vh] flex justify-center'>
        <Image
          src='/lp_creatives.webp'
          alt='Threads'
          width={1790}
          height={200}
          className='min-w-[1790px]'
        />
      </div>
      <div className='flex flex-col items-center gap-4 mt-[-4rem] w-[358px] min-w-[358px] p-4'>
        <h1 className='text-base font-bold'>
          How would you like to use Threads?
        </h1>
        <div className='rounded-2xl border border-[#2e2e2e] pt-5 pb-5 px-6 cursor-pointer relative w-[358px] active:scale-[.98]'>
          <div className='flex justify-between mb-2 pt-1'>
            <h2 className='font-bold text-[15px]'>Continue with Gmail</h2>
            <Image src='/gmail.png' alt='Gmail' width={30} height={30} />
          </div>
          <p className='text-[12px] text-[#777777]'>
            Log in or create a Threads profile with you Gmail
            <br /> account. This will let you post and interact on Threads
          </p>
        </div>
        <Link href='/nonconsent'>
          <div className='rounded-2xl border border-[#2e2e2e] pt-5 pb-5 px-6 cursor-pointer relative w-[358px] active:scale-[.98]'>
            <h2 className='font-bold text-[15px] pt-1 mb-2'>
              Use without a profile{" "}
            </h2>

            <p className='text-[12px] text-[#777777]'>
              You can browse Threads without a profile, but you won't <br /> be
              able to post or interact with content{" "}
            </p>
          </div>
        </Link>
      </div>
      <div className='fixed text-[#777777] bottom-4 text-[12px] text-center px-4'>
        <p>
          This is not an actual Threads page. It is just a web dev project and
          is not affiliated with or endorsed by Threads. It serves as a
          demonstration of programming abilities in a fullstack context.
        </p>
      </div>
    </main>
  );
}
