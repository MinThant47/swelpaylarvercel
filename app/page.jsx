import Contact from "./Components/Contact";
import Landing from "./Components/Landing";
import Portfolio from "./Components/Portfolio";
import Services from "./Components/Services";
import ChatbotFeature from "./Components/Chatbotfeacture";

export default function Home() {
  return (
    <main>
      <Landing />
      <Services />
      <Portfolio />
      <ChatbotFeature />
      <Contact />
    </main>
  );
}
