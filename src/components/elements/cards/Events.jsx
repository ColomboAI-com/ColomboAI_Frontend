/* eslint-disable @next/next/no-img-element */
const Events = () => {
    return (
        <div className="border-[1px] border-brandprimary rounded-[10px] mt-4">
            <div className="relative">
            <img src="/images/home/event-img.png" className="w-full" />
            <div className="absolute top-[18%] pl-8">
                <div className="flex items-center gap-4">
                <img src="/images/home/event-icon.png" />
                <p className="text-[#ceadad] font-sans text-[17px]">Events</p>
                </div>
                <h5 className="text-[#fff] font-sans text-[24px] pt-6 leading-[24px]">
                Surburn Event in XYZ ground, New York.
                </h5>
                <button className="bg-[#ffffffed] text-[14px] w-[197px] h-[47px] py-[15px] px-[29px] mt-8 rounded-[40px] font-sans text-brandprimary">
                EXPLORE
                </button>
            </div>
            </div>
            <div className="flex items-center pl-[30px] pr-[26px] pt-[30px] pb-[40px] gap-10">
            <div className="flex items-center">
                <img
                src="/images/home/event-people1.png"
                className="w-[30px]"
                />
                <img
                src="/images/home/event-people2.png"
                className="w-[30px] ml-[-12px]"
                />
                <img
                src="/images/home/event-people3.png"
                className="w-[30px] ml-[-12px]"
                />
            </div>
            <p className="text-[#788292] font-sans text-[14px]">
                12k people going to this event on Sunday.
            </p>
            </div>
        </div>
    );
}

export default Events;