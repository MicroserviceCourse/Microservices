const AboutHero =()=>{
    return(
        <section className="relative w-full h-[420px] bg-center bg-cover flex
        items-center justify-center bg-fixed  "
        style={{
        backgroundImage:
          'url(https://bazaar.qodeinteractive.com/wp-content/uploads/2017/06/about-us-title-img.jpg)',
      }}
        >
           
            <div className="absolute inset-0 bg-black/10"/>
            <div className="relative z-10 flex items-center justify-center h-full">
                <h1 className="text-white text-4xl md:text-5xl font-light tracking-wide lowercase">
                    About Us
                </h1>
            </div>
        </section>
    )
}
export default AboutHero;