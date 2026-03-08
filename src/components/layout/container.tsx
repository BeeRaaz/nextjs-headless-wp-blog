interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <>
      <div className={`w-full px-5 mx-auto ${className}`}>{children}</div>
    </>
  );
}
