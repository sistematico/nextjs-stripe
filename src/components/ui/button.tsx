export function Input(
  {
    children,
    props,
    className = ""
  }: {
    children?: React.ReactNode;
    props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    className?: string;
  }
) {
  return (
    <button
      className={`
        flex mx-auto text-white bg-indigo-500 
        border-0 py-2 px-8 rounded text-lg
        focus:outline-none hover:bg-indigo-600 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}