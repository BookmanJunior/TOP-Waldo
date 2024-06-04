type Position = { x: number; y: number };

type DropdownProps = {
  setDropdown: (dropdown: boolean) => void;
  dropdownPosition: Position;
  children: React.ReactNode;
};

export default function Dropdown({ setDropdown, dropdownPosition, children }: DropdownProps) {
  return (
    <div
      className="absolute flex translate-x-[-10px] translate-y-[-10px] flex-wrap gap-4 
      md-[800px]:translate-x-[-20px] md-[800px]:translate-y-[-20px]"
      style={{
        top: `${dropdownPosition.y}px`,
        left: `${dropdownPosition.x}px`
      }}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setDropdown(false);
        }}
        className="h-[25px] w-[25px] cursor-pointer rounded-[50%] bg-red-800 bg-opacity-30 outline-dashed 
        outline-4 outline-red-400 md-[800px]:h-[50px] md-[800px]:w-[50px]"></div>
      {children}
    </div>
  );
}
