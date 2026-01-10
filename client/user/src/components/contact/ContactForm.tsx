const ContactForm = () => {
  return (
    <form className="space-y-6">
      <input
        placeholder="Full Name"
        className="w-full border px-4 py-4 focus:outline-none"
      />
      <input
        placeholder="Email Address"
        className="w-full border px-4 py-4 focus:outline-none"
      />
      <input
        placeholder="Website"
        className="w-full border px-4 py-4 focus:outline-none"
      />
      <textarea
        rows={5}
        placeholder="Write a comment..."
        className="w-full border px-4 py-4 focus:outline-none"
      />

      <button
        type="submit"
        className="bg-black text-white px-12 py-4 uppercase text-sm tracking-wider hover:bg-gray-900 transition"
      >
        subscribe
      </button>
    </form>
  )
}

export default ContactForm
