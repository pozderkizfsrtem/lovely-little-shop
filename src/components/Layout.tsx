import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-background relative">
      {/* Animated blue gradient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,hsl(210_90%_18%/0.55),transparent_55%),radial-gradient(circle_at_85%_15%,hsl(195_90%_22%/0.45),transparent_50%),radial-gradient(circle_at_50%_90%,hsl(220_90%_20%/0.5),transparent_55%)]" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,hsl(0_0%_7%/0.7)_100%)]" />
      </div>
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
