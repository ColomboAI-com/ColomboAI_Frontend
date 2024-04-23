/* eslint-disable @next/next/no-img-element */
const InputBar = () => {
    return (
        <div className="relative py-7">
            <input
            type="text"
            placeholder="Ask or create anything..."
            className="w-full h-[80px] border-[1px] border-brandprimary rounded-[50px] py-[28px] px-[35px] text-[#ACACAC] text-[20px] tracking-[4px] font-sans"
            ></input>
            <img
            src="/images/home/search-icon.png"
            className="absolute top-[55px] right-[35px]"
            alt="serch_icon"
            />
      </div>
    );
}

export default InputBar;