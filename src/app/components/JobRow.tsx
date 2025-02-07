export default function JobRow() {
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm flex gap-4">
        <div className="content-center">
          <img
            src="https://i1.wp.com/applesofgoldcommunications.com/wp-content/uploads/2020/01/1024px-Spotify_logo_without_text.svg_.png?ssl=1"
            alt=""
            className="size-12"
          />
        </div>

        <div className="grow">
          <div className="text-gray-500 text-sm">Spotify</div>
          <div className="font-bold mb-1 text-lg">Product designer</div>
          <div className="text-gray-400 text-sm">
            Remote &middot; New York, USA &middot; Full time
          </div>
        </div>

        <div className="content-end text-gray-500 text-sm">2 weeks ago</div>
      </div>
    </>
  );
}
