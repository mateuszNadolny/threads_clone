import Image from "next/image";
import { NonConsentProps } from "@/lib/types";
const NonConsent = ({ heading, description, image }: NonConsentProps) => {
  console.log(image);
  return (
    <div className='max-w-[358px]'>
      <div className='flex gap-3 items-start'>
        <Image src={image} alt={heading} width={30} height={30} />
        <div className='flex flex-col justify-start'>
          <h2 className='text-[16px] font-bold'>{heading}</h2>
          <p className='text-[15px] text-[#777777]'>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NonConsent;
