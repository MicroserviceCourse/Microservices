import type { BreadCrumbProps } from "../../types";

const Breadcrumb = ({ items }: BreadCrumbProps) => {
    return (
      <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm font-light text-gray-400">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            {item.href ? (
              <a
                href={item.href}
                className="hover:text-gray-600 transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-400">{item.label}</span>
            )}

            {idx < items.length - 1 && (
              <span className="text-gray-300">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
    )
}
export default Breadcrumb;