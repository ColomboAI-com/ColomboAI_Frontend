import { SendIcon } from "../Icons";

/* eslint-disable @next/next/no-img-element */
const InputBar = () => {
    return (
        <div className="relative py-7">
            <input
            type="text"
            placeholder="Ask or create anything..."
            className="w-full h-[80px] border-[1px] border-brandprimary rounded-[50px] py-[28px] px-[35px] text-[#ACACAC] text-[20px] tracking-[4px] font-sans"
            ></input>
            <button className="absolute top-[52px] right-[34px]">
                <SendIcon w={31} h={31} fill={'#1E71F2'} />
            </button>
      </div>
    );
}

export default InputBar;