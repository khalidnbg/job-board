import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function JobRow() {
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm relative">
        <div className="absolute cursor-pointer top-4 right-4">
          <FontAwesomeIcon icon={faHeart} className="size-4 text-gray-300" />
        </div>

        <div className="flex grow gap-4">
          <div className="content-center">
            <img
              src="https://i1.wp.com/applesofgoldcommunications.com/wp-content/uploads/2020/01/1024px-Spotify_logo_without_text.svg_.png?ssl=1"
              alt=""
              className="size-12"
            />
          </div>

          <div className="grow sm:flex">
            <div className="grow">
              <div className="text-gray-500 text-sm">Spotify</div>
              <div className="font-bold mb-1 text-lg">Product designer</div>
              <div className="text-gray-400 text-sm">
                Remote &middot; New York, USA &middot; Full time
              </div>
            </div>

            <div className="content-end text-gray-500 text-sm">2 weeks ago</div>
          </div>
        </div>
      </div>
    </>
  );
}
