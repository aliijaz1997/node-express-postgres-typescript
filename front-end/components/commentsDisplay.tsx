import { Comment } from "../pages/details/[id]";

function CommentsDisplay(data: Comment) {
  console.log(data);

  return (
    <div className="flex justify-center items-center mt-2">
      <div className=" bg-gray-600 max-w-lg rounded p-4">
        <h3 className="font-semibold text-pink-50 text-lg tracking-wide">
          {data.fullname}
        </h3>
        <p className="text-green-300 my-1">{data.description}</p>
      </div>
    </div>
  );
}

export default CommentsDisplay;
