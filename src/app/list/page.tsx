import { GetRandomFact } from "~/app/_components/getRandomFact";

import { CustomLink } from "~/app/_components/link";

export default function ListPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#41444B] to-[#898AA6] text-white">
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          List Random Fact
        </h1>
        <div className="flex items-center justify-center">
          <GetRandomFact />
        </div>
        <div className="flex items-center justify-center">
          <CustomLink href="/">
            <a className="text-2xl font-semibold text-white">Home</a>
          </CustomLink>
        </div>
      </div>
    </main>
  );
}
