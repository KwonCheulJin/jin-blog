type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function HamburgerBar({ isOpen, setIsOpen }: Props) {
  return (
    <button
      className="hidden flex-col items-center justify-center lg:flex"
      onClick={() => setIsOpen(prev => !prev)}
    >
      <span
        className={`block h-0.5 w-6 rounded-sm bg-dark transition-all duration-300 ease-out dark:bg-light ${
          isOpen ? 'translate-y-1 rotate-45' : '-translate-y-0.5'
        }`}
      ></span>
      <span
        className={`my-0.5 block h-0.5 w-6 rounded-sm bg-dark transition-all duration-300 ease-out dark:bg-light ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      ></span>
      <span
        className={`block h-0.5 w-6 rounded-sm bg-dark transition-all duration-300 ease-out dark:bg-light ${
          isOpen ? '-translate-y-1 -rotate-45' : 'translate-y-0.5'
        }`}
      ></span>
    </button>
  );
}
