import ProviderComponent from "@/components/provider-component";
import "./globals.css";
import { Inter } from 'next/font/google' // Import Inter
import GlobalContextProvider from "@/context/GlobalContext";
import FeedContextProvider from "@/context/FeedContext";
import StoryContextProvider from "@/context/StoryContext";
import VibeContextProvider from "@/context/VibeContext";
import NotificationsContextProvider from "@/context/NotificationContext";

export const metadata = {
  title: "ColomboAI",
  description:
    "Your All-In-One Platform, Revolutionizing How You Search, Socialize, Shop, And Interact All Powered By Generative AI Technologies.",
};

// Setup Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Define the CSS variable name
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}> {/* Apply CSS variable to html tag */}
      <head>
        <link rel="icon" href="/images/favicon.svg" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}> {/* Apply Inter font class for direct styling */}
        <ProviderComponent>
          <GlobalContextProvider>
            <FeedContextProvider>
              <StoryContextProvider>
                <VibeContextProvider>
                  <NotificationsContextProvider>
                    {children}
                  </NotificationsContextProvider>
                </VibeContextProvider>
              </StoryContextProvider>
            </FeedContextProvider>
          </GlobalContextProvider>
        </ProviderComponent>
      </body>
    </html>
  );
}
