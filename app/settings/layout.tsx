import SideNavigation from "@/components/profile/side-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-[fit-content(100%)_1fr_1fr_1fr] gap-4">
      <aside className="w-fit sm:w-30 md:w-45">
        <SideNavigation />
      </aside>
      <div className="dark:bg-primary-foreground bg-secondary relative col-span-3 min-h-100 rounded-md p-4 sm:p-6">
        {children}
      </div>
    </section>
  );
}
