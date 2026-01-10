import AboutFeatureItem from "./AboutFeatureItem"

const FEATURES = [
  {
    image:
      'https://bazaar.qodeinteractive.com/wp-content/uploads/2017/06/about-us-img-with-text-1.jpg',
    title: 'strategy and timing',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcor leo eget.',
  },
  {
    image:
      'https://bazaar.qodeinteractive.com/wp-content/uploads/2017/06/about-us-img-with-text-2.jpg',
    title: 'social integration',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcor leo eget.',
  },
  {
    image:
      'https://bazaar.qodeinteractive.com/wp-content/uploads/2017/06/about-us-img-with-text-3.jpg',
    title: 'shopping experience',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcor leo eget.',
  },
]
const AboutFeatures = ()=>{
    return(
        <section className="max-w-7xl mx-auto px-10 py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {FEATURES.map((item,idx)=>(
                    <AboutFeatureItem key={idx} {...item}/>
                ))}
            </div>
        </section>
    )
}
export default AboutFeatures;