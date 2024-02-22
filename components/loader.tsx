import { useEffect } from 'react';

export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { tailspin } = await import('ldrs');
      tailspin.register();
    }
    getLoader();
  }, []);
  return (
    <div className="fixed top-0 left-0 h-screen w-screen max-h-screen max-w-screen flex items-center justify-center">
      <l-tailspin size="40" stroke="5" speed="0.9" color="white"></l-tailspin>
    </div>
  );
}
