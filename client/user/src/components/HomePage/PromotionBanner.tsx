import React from "react";
const PromotionBanner = () => {
    return (
        <section className="w-full min-h-screen flex justify-end items-center px-20 py-16 text-center">
            <div className="text-right max-w-sm">
                <h2 className="text-[100px] font-bold font-[cursive] leading-none">30%</h2>
                <p className="text-xl font-medium mt-2">shopping everyday</p>
                <div className="w-12 h-px bg-black mx-auto mt-3 mb-6"></div>
                <button className="bg-black text-white px-6 py-2 uppercase text-sm font-semibold tracking-wider flex items-center gap-2 mx-auto">
                    subscribe →
                </button>
            </div>
        </section>

    )
}
export default PromotionBanner;