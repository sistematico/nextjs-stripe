"use client";

export function Card(
  { children, className = "", ...props }: { children: React.ReactNode, className?: string }
) {
  return (
    <div
      className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader(
  { children, className = "", ...props }:
    { children: React.ReactNode, className?: string }
) {
  return (
    <div
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle(
  { children, className = "", ...props }:
    { children: React.ReactNode, className?: string }
) {
  return (
    <div
      className={`font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardDescription(
  { children, className = "", ...props }:
    { children: React.ReactNode, className?: string }
) {
  return (
    <div
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// export function CardContent({ children: React.ReactNode, className = "", ...props }, ref: React.Ref<HTMLDivElement>: ) {
export function CardContent(
  { children, className = "", ...props }:
    { children: React.ReactNode, className?: string }
) {
  return (
    <div
      className={`p-6 pt-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter(
  { children, className = "", ...props }:
    { children: React.ReactNode, className?: string }
) {
  return (
    <div
      className={`flex items-center p-6 pt-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}