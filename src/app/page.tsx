import { CreateRandomFact } from "~/app/_components/postRandomfact";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#41444B] to-[#898AA6] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Random Fact
        </h1>
        <CreateRandomFact />
      </div>
    </main>
  );
}
