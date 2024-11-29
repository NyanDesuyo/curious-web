import { GetRandomFact } from "~/app/_components/getRandomFact";

export default function ListPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#C9BBCF] to-[#898AA6] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          List Random Fact
        </h1>
        <GetRandomFact />
      </div>
    </main>
  );
}
