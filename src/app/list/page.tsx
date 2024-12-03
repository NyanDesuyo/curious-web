import { GetRandomFact } from "~/app/_components/getRandomFact";

export default function ListPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#41444B] to-[#898AA6] text-white">
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          List Random Fact
        </h1>
        <div className="max-w-full">
          <GetRandomFact />
        </div>
      </div>
    </main>
  );
}
