type Position = { x: number; y: number };

type DropdownProps = {
  setDropdown: (dropdown: boolean) => void;
  dropdownPosition: Position;
  children: React.ReactNode;
};

export default function Dropdown({ setDropdown, dropdownPosition, children }: DropdownProps) {
  return (
    <div
      className="absolute flex translate-x-[-20px] translate-y-[-20px]  flex-wrap gap-4"
      style={{
        top: `${dropdownPosition.y}px`,
        left: `${dropdownPosition.x}px`
      }}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setDropdown(false);
        }}
        className="h-[50px] w-[50px] cursor-pointer rounded-[50%] bg-red-800 bg-opacity-30 outline-dashed outline-4 outline-red-400"></div>
      {children}
    </div>
  );
}
