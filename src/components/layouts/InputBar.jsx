import { SendIcon } from "../Icons";
import { Plus_Jakarta_Sans } from '@next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const InputBar = () => {
    return (
        <main className={plusJakartaSans.className}>
        <div className="relative py-[21px]">
            <div
                className="w-full h-[50px] rounded-[50px] p-[1px]"
                style={{
                    background: 'linear-gradient(180deg, #FF0049, #FFBE3B, #00BB5C, #187DC3, #58268B)',
                }}
            >
                <input
                    type="text"
                    placeholder="Ask or create anything..."
                    className="w-full h-full rounded-[50px] border-none py-[17px] px-[35px] text-[#ACACAC] text-[16px] tracking-[2px]"
                    style={{
                        background: '#fff',
                    }}
                />
            </div>
            <button className="absolute top-[39px] right-[34px]">
                <SendIcon w={20} h={16} fill={'#1E71F2'} />
            </button>
        </div>
        </main>
    );
}

export default InputBar;
