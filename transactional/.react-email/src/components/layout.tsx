import * as React from 'react';
import { Topbar } from './topbar';
import { Sidebar } from './sidebar';

type LayoutElement = React.ElementRef<'div'>;
type RootProps = React.ComponentPropsWithoutRef<'div'>;

interface LayoutProps extends RootProps {
  navItems: string[];
  markup?: string;
  viewMode?: string;
  setViewMode?: (viewMode: string) => void;
}

export const Layout = React.forwardRef<LayoutElement, Readonly<LayoutProps>>(
  (
    {
      className,
      title,
      navItems,
      children,
      markup,
      viewMode,
      setViewMode,
      ...props
    },
    forwardedRef,
  ) => {
    return (
      <>
        <div className="flex justify-between h-screen">
          <Sidebar navItems={navItems} />
          <main className="w-[calc(100%_-_275px)] bg-slate-2">
            {title && (
              <Topbar
                title={title}
                viewMode={viewMode}
                setViewMode={setViewMode}
                markup={markup}
              />
            )}
            <div className="relative h-[calc(100vh_-_70px)] overflow-auto">
              <div className="mx-auto">{children}</div>
            </div>
          </main>
        </div>
      </>
    );
  },
);

Layout.displayName = 'Layout';
