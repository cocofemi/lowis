import Image from "next/image";
import supportWorker from "../../public/support-worker.avif";
import adminSupportWorker from "../../public/admin-spport.jpg";

export function MadeFor() {
  return (
    <section className="container mx-auto px-6 py-20 md:py-32">
      <p className="text-purple-600 text-lg mb-3">Who is kervah made for? </p>
      <p className="text-white text-4xl">Child Care Support Workers, </p>
      <p className="text-white text-4xl">Care Home Administrators, </p>
      <p className="text-white text-4xl">
        Anyone in the child care and support industry
      </p>

      <div className="flex flex-col lg:flex-row gap-8 lg:justify-around mt-10">
        <div className="group rounded-xl border border-white/10 bg-card transition-all hover:border-primary/50 hover:bg-card/80">
          <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-t-xl">
            <Image
              src={supportWorker}
              alt="productImage"
              className="object-cover"
              sizes="(min-width:1024px) 600px, 100vw"
            />
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-2xl font-semibold text-black">
              For support workers
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Lowis is your always-on teammate for the frontline—answering “how
              do I…?” with step-by-step guidance from your own policies,
              drafting concise visit notes, and auto-building shift handover
              summaries. Ask for de-escalation steps, medication prompts, or
              safeguarding checklists and get clear, in-the-moment support. It
              logs actions, timestamps updates, and keeps care plans consistent
              across the team. Let Lowis handle repetitive tasks while you focus
              on what matters most—people.
            </p>
          </div>
        </div>
        <div className="group rounded-xl border border-white/10 bg-card transition-all hover:border-primary/50 hover:bg-card/80">
          <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-t-xl">
            <Image
              src={adminSupportWorker}
              alt="productImage"
              className="object-cover"
              sizes="(min-width:1024px) 600px, 100vw"
            />
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-2xl font-semibold text-black">
              For Administrators
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Lowis clears the busywork from your desk: triaging inboxes,
              routing requests, filling forms, and turning scattered updates
              into neat meeting notes, reports, and SOP lookups. It helps
              schedule shifts, track tasks, and prepare weekly summaries with
              sources linked back to your files. Ask for a draft email, a
              checklist, or a quick policy summary and Lowis delivers in
              seconds. Let Lowis handle repetitive tasks while you focus on what
              matters most—smooth operations.
            </p>
          </div>
        </div>
        {/* <div className="group rounded-xl border border-white/10 bg-card transition-all hover:border-primary/50 hover:bg-card/80">
          <div className="mb-4 inline-flex h-90 w-full ">
            <Image
              src={productImage}
              alt="productImage"
              className="rounded-t-xl"
            />
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-2xl font-semibold text-black">
              Anyone in the industry
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Let kervah handle repetitive tasks while you focus on what matters
              most. Let kervah handle repetitive tasks while you focus on what
              matters most. Let kervah handle repetitive tasks while you focus on
              what matters most.
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
