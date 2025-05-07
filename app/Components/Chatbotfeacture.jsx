import { MailQuestion, Frame, Images, PrinterCheck } from 'lucide-react'
import Link from 'next/link'


const ChatbotFeature = () => {
  return (
    <section
    id="chatbot"
    className="text-white mx-10 md:mx-28 lg:mx-28 mt-20 mb-10 transition-all"
  >
    <div className="flex gap-5 flex-col">
      <div className="flex flex-col gap-5 items-center align-center justify-center">
      <h2 className="font-clashSemibold text-2xl uppercase text-center ">
            Swel Pay Lar's Chatbot
          </h2>
          <Link
              className="btn-rounded"
              href={`/chatbot`}
            >
              Chat now!
            </Link>
      </div>
         
          <p className="text-center text-secondary text-base">
          Feel free to ask about any of these topics — we’ve included some example questions to help you get started. 
          </p>
        </div>

    <div className=" flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* First Card - Orange */}
        <div className="bg-[#392a13] p-6 rounded-lg">
          <div className="w-10 h-10 bg-[#f79827] rounded-md flex items-center justify-center mb-4">
            <MailQuestion className="w-5 h-5 text-[#1e1e1e]" />
          </div>
          <h3 className="text-white font-medium mb-2">Frequently Asked Questions</h3>
          <ul>
            <li className="list-inside text-gray-400 text-sm">
              ဘယ်လို service တွေရလဲ?
            </li>
            <li className="list-inside text-gray-400 text-sm">
              Revise ဘယ်နှခါပေးလဲ?
            </li>
          </ul>
        </div>

        {/* Second Card - Green */}
        <div className="bg-[#0d291c] p-6 rounded-lg">
          <div className="w-10 h-10 bg-[#00c051] rounded-md flex items-center justify-center mb-4">
            <Frame className="w-5 h-5 text-[#1e1e1e]" />
          </div>
          <h3 className="text-white font-medium mb-2">Logo Design</h3>
          <ul>
            <li className="list-inside text-gray-400 text-sm">
              Logo Packages
            </li>
            <li className="list-inside text-gray-400 text-sm">
              Logo Design Samples
            </li>
          </ul>
        </div>

        {/* Third Card - Purple */}
        <div className="bg-[#290d29] p-6 rounded-lg">
          <div className="w-10 h-10 bg-[#ab00a5] rounded-md flex items-center justify-center mb-4">
            <Images className="w-5 h-5 text-[#ffffff]" />
          </div>
          <h3 className="text-white font-medium mb-2">Social Ads</h3>
          <ul>
            <li className="list-inside text-gray-400 text-sm">
              Social Ads Packages
            </li>
            <li className="list-inside text-gray-400 text-sm">
              ပုံစံတူပြီး Data ပဲ ပြောင်းတဲ့ ပုံတွေကျတော့ ဘယ်လိုယူလဲ။
            </li>
          </ul>
        </div>

        {/* Fourth Card - Blue (chosen as appealing) */}
        <div className="bg-[#0d1a29] p-6 rounded-lg">
          <div className="w-10 h-10 bg-[#0078ff] rounded-md flex items-center justify-center mb-4">
            <PrinterCheck className="w-5 h-5 text-[#ffffff]" />
          </div>
          <h3 className="text-white font-medium mb-2">Printing Design</h3>
          <ul>
            <li className="list-inside text-gray-400 text-sm">
              Printing Design Samples
            </li>
            <li className="list-inside text-gray-400 text-sm">
              အပြီးအစီး တစ်ခါတည်း Print ထုတ်ပေးလား
            </li>
          </ul>
        </div>
      </div>
    </div>
   </section>
  )
}

export default ChatbotFeature
