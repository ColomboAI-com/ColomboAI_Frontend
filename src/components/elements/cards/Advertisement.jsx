/* eslint-disable @next/next/no-img-element */
const Advertisement = () => {
    return (
        <div className="border-[1px] border-brandprimary rounded-[10px] mt-4">
            <div className="flex items-center justify-between px-[10px] py-[12px]">
                <div className="flex items-center">
                    <img src="/images/home/coca-cola.svg" className="w-[30px]" />
                    <div>
                        <p className="pl-[4px] text-[#333333] text-[14px] font-sans">Coca Cola</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <img src="/images/home/more_horiz.png" />
                </div>
            </div>
            <img src="/images/home/coca-cola-img.svg" className="w-full" />
            
        </div>
    );
}

export default Advertisement;