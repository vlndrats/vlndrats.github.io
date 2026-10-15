import { Children, type ReactNode } from 'react';

/** Stable media layers let CSS smoothly reverse transitions during rapid input. */
export default function ShowcaseSlides({ activeIndex, children }: { activeIndex: number; children: ReactNode }) {
  return (
    <div className="relative isolate h-full w-full overflow-hidden">
      {Children.map(children, (child, position) => (
        <div
          className="showcase-slide absolute inset-0"
          data-active={position === activeIndex}
          aria-hidden={position !== activeIndex}
          inert={position !== activeIndex}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
