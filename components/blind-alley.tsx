import { Button } from './ui/button';
const BlindAlley = () => {
  const backHandler = () => {
    history.back();
  };

  return (
    <div className="w-screen h-screen bg-background flex flex-col gap-4 justify-center items-center fixed top-0 z-[0] text-center">
      <h3>We are sorry, this page does not exist</h3>
      <p className="text-[15px] text-[#777777]">
        Link you have used might be broken or the page might have been deleted
      </p>
      <Button onClick={backHandler} variant="outline">
        Go back
      </Button>
    </div>
  );
};

export default BlindAlley;
