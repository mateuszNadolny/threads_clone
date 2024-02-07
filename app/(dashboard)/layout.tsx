import Navbar from '@/components/navbar';

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="min-w-screen min-h-screen">
      <Navbar />
      {children}
    </main>
  );
};

export default DashboardLayout;
