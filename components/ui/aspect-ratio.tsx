import { cn } from '@/lib/utils';

function AspectRatio({
  ratio,
  className,
  style,
  ...props
}: React.ComponentProps<'div'> & { ratio: number }) {
  return (
    <div
      className={cn('relative aspect-(--ratio)', className)}
      data-slot="aspect-ratio"
      style={
        {
          '--ratio': ratio,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { AspectRatio };
