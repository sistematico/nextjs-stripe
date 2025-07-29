export function Button(
  {
    children,
    className = "",
    props
  }: {
    children?: React.ReactNode;
    className?: string;
    props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  }
) {
  return (
    <button
      className={`
        text-white bg-indigo-500 
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