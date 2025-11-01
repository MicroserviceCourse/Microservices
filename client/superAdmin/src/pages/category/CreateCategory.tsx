const CreateCategory = () => {
  return (
    <div className="p-6  min-h-screen">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Add Categories
      </h2>

      {/* Card Container */}
      <div className=" mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <form className="space-y-6">
          {/* Product name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Categories Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Category name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

    
          {/* Save Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-10 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
