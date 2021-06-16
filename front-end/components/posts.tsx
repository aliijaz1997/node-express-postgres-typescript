function Posts() {
  return (
    <div className="flex justify-center">
      <div className="max-w-md py-4 px-8 bg-gray-200 shadow-lg rounded-lg my-20">
        <div className="flex justify-center md:justify-end -mt-16">
          <img
            className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          />
        </div>
        <div>
          <h2 className="text-gray-800 text-3xl font-semibold">Design Tools</h2>
          <p className="mt-2 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            dolores deserunt ea doloremque natus error, rerum quas odio quaerat
            nam ex commodi hic, suscipit in a veritatis pariatur minus
            consequuntur!
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <a href="#" className="text-xl font-medium text-blue-800">
            8 Likes
          </a>
          <a href="#" className="text-xl font-medium text-red-600">
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}

export default Posts;
