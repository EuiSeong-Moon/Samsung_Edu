// app/page.tsx
import { Button } from "@/components/ui/button"
import { auth, signOut } from "@/lib/auth"

export const dynamic = "force-dynamic"

const rolls = [
  {
    name: "Tuna Gimbap",
    description: "Savory tuna, crisp vegetables, and a clean, familiar flavor.",
  },
  {
    name: "Bulgogi Gimbap",
    description: "Sweet and rich bulgogi with a warm, satisfying bite.",
  },
  {
    name: "Veggie Gimbap",
    description: "Fresh, light, and simple. A quick pick for any time of day.",
  },
]

export default async function Home() {
  const session = await auth()

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f3e8] text-stone-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-300/35 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-4rem] h-80 w-80 rounded-full bg-amber-200/60 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12">
        {session ? (
          <section className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-sm shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Signed in as {session.user?.email}
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.35em] text-emerald-700">
                  KimBap Note
                </p>
                <h1 className="max-w-2xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                  Gimbap, presented
                  <span className="block text-emerald-700">simply and quickly.</span>
                </h1>
                <p className="max-w-xl text-lg leading-8 text-stone-700">
                  A tiny intro page for a classic Korean roll. Clean design, quick to scan,
                  and easy to expand later if you want a menu or ordering flow.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a href="#gimbap-cards">
                  <Button className="rounded-full bg-emerald-700 px-6 text-base text-white hover:bg-emerald-800">
                    See the rolls
                  </Button>
                </a>
                <form
                  action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/" })
                  }}
                >
                  <Button
                    type="submit"
                    variant="outline"
                    className="rounded-full border-stone-300 bg-white/80 px-6 text-base"
                  >
                    Sign out
                  </Button>
                </form>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.08)] backdrop-blur">
              <div className="space-y-4">
                <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,#1b5e20,#2e7d32_45%,#f2c94c_45%,#fef3c7_70%,#ffffff_70%)] p-6 text-white">
                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/80">
                    Featured Roll
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold">Tuna Gimbap</h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/90">
                    The most familiar pick: simple, savory, and easy to love.
                  </p>
                </div>

                <div className="grid gap-3 text-sm text-stone-700">
                  <div className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
                    <span>Style</span>
                    <span className="font-medium text-stone-900">Clean intro page</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
                    <span>Goal</span>
                    <span className="font-medium text-stone-900">Quick to read</span>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        ) : (
          <section className="mx-auto max-w-xl text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-700">KimBap Note</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Gimbap intro page
            </h1>
            <p className="mt-4 text-lg leading-8 text-stone-700">
              A simple landing page that appears after sign in.
            </p>
            <div className="mt-8">
              <a href="/login">
                <Button className="rounded-full bg-emerald-700 px-6 text-base text-white hover:bg-emerald-800">
                  Sign in with Google
                </Button>
              </a>
            </div>
          </section>
        )}
      </div>

      {session ? (
        <section id="gimbap-cards" className="relative mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-4 md:grid-cols-3">
            {rolls.map((roll) => (
              <article
                key={roll.name}
                className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur"
              >
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-700">
                  Gimbap
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-stone-900">{roll.name}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-700">{roll.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
