import type { AboutFeatureItemProps } from '../../types/about.type'

const AboutFeatureItem = ({
  image,
  title,
  description,
}: AboutFeatureItemProps) => {
    return(
        <div className='space-y-6'>
            <div className='overflow-hidden'>
                <img
                src={image}
                alt={title}
                className='w-full h-[260px] object-cover'
                />
            </div>
            <div className='space-y-3'>
                <h3 className='text-xl font-semibold lowercase'>
                    {title}
                </h3>
                <p className='text-gray-500 leading-relaxed'>
                        {description}
                </p>
            </div>
        </div>
    )
}
export default AboutFeatureItem;