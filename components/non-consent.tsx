import { NonConsentProps } from '@/lib/types';
import { UserX, Eye, CheckCircle } from 'lucide-react';
const NonConsent = ({ heading, description, image }: NonConsentProps) => {
  return (
    <div className="max-w-[358px]">
      <div className="flex gap-3 items-start">
        <div className="h-[30px] w-[30px]">
          {image === 'restrict' && <UserX size={30} />}
          {image === 'visibility' && <Eye size={30} />}
          {image === 'checkmark' && <CheckCircle size={30} />}
        </div>
        <div className="flex flex-col justify-start">
          <h2 className="text-[16px] font-bold">{heading}</h2>
          <p className="text-[15px] ">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NonConsent;
