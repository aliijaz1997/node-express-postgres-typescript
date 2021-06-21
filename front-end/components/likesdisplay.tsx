import image from "next/image";
import { Likes } from "../pages/details/[id]";
function LikesDisplay(data: Likes) {
  return (
    <div className=" flex justify-center items-center mt-2">
      <div className=" flex max-w-lg rounded p-4">
        <h3 className="font-semibold mr-4 text-yellow-900 text-lg tracking-wide">
          {data.fullname}
        </h3>
        {data.name && (
          <img
            className=""
            alt="like"
            src="https://i.ytimg.com/vi/9If04WGY-2w/maxresdefault.jpg"
            width="50"
          />
        )}
      </div>
    </div>
  );
}

export default LikesDisplay;
