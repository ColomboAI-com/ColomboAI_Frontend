import { SendIcon } from "../Icons";

/* eslint-disable @next/next/no-img-element */
const InputBar = () => {
    return (
        <div className="relative py-[21px]">
            <input
            type="text"
            placeholder="Ask or create anything..."
            className="w-full h-[50px] border-[1px] border-brandprimary rounded-[50px] py-[17px] px-[35px] text-[#ACACAC] text-[16px] tracking-[4px] font-sans"
            ></input>
            <button className="absolute top-[39px] right-[34px]">
                <SendIcon w={20} h={16} fill={'#1E71F2'} />
            </button>
      </div>
    );
}

export default InputBar;