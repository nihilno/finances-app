import SideNavigation from "@/components/settings/side-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-[fit-content(100%)_1fr_1fr_1fr] gap-8">
      <aside className="w-fit sm:w-30 md:w-40">
        <SideNavigation />
      </aside>
      <div className="col-span-3">{children}</div>
    </section>
  );
}
