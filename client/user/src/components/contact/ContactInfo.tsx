// components/contact/ContactInfo.tsx
import { FiMapPin, FiClock, FiMail } from 'react-icons/fi'

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <p className="font-serif italic text-gray-400 text-lg">find and visit</p>

      <h2 className="text-4xl font-semibold">our contact</h2>
      <div className="w-12 h-[2px] bg-black" />

      <p className="text-gray-500 leading-relaxed max-w-md">
        Alierewnum phaedrum torquatos nec eu, dasvis detraxit ertssa periculiser
        reex, nihil dexpetendis in mei.
      </p>

      <ul className="space-y-4 text-gray-600">
        <li className="flex gap-3 items-center">
          <FiMapPin />
          Via S. Raffaele, 6, 20121 Milano
        </li>
        <li className="flex gap-3 items-center">
          <FiClock />
          Monday to Friday: 9am to 8pm
        </li>
        <li className="flex gap-3 items-center">
          <FiMail />
          bazaar@qodeinteractive.com
        </li>
      </ul>

      <div className="flex gap-4 text-gray-500 text-lg">
        <i className="fab fa-twitter" />
        <i className="fab fa-instagram" />
        <i className="fab fa-facebook-f" />
      </div>
    </div>
  )
}

export default ContactInfo
