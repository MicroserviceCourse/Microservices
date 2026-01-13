const CreateCategoryPage = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Create Blog Category</h2>
          <p className="text-sm text-gray-500">Add a new category for blog posts</p>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <input
                type="text"
                placeholder="Enter Title"
                className="
      w-full
      rounded-xl
      border border-blue-300
      px-4 py-3
      text-sm text-gray-700
      placeholder-gray-400
      outline-none
      focus:border-blue-500
      focus:ring-1 focus:ring-blue-400
    "
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <button className="border border-slate-200 rounded-lg px-5 py-2 text-sm">Cancel</button>
            <button className="bg-orange-500 text-white rounded-lg px-5 py-2 text-sm">
              Create Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateCategoryPage;
