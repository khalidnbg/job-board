export default function Hero() {
  return (
    <section className="container my-16">
      <h1 className="text-4xl font-bold text-center">
        Find your next
        <br />
        dream job
      </h1>

      {/* <p className="text-center text-gray-600 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
        cupiditate itaque aliquam voluptates placeat, modi earum similique
        temporibus ipsam libero adipisci fuga at ex dolorem facilis repellendus
        asperiores accusamus ullam.
      </p> */}

      <form className="flex gap-2 mt-4 max-w-md mx-auto">
        <input
          type="search"
          className="border border-gray-400 w-full py-2 px-3 rounded-md"
          placeholder="Search phrase..."
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Search
        </button>
      </form>
    </section>
  );
}
