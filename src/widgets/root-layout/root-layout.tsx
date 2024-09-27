import { Outlet } from 'react-router-dom';

export function RootLayout({
  sidebarElement,
}: {
  sidebarElement: React.ReactNode;
}) {
  return (
    <div className="flex ">
      {sidebarElement}
      <div>
        <Outlet />
      </div>
    </div>
  );
}
