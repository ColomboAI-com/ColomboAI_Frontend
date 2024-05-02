import ProviderComponent from "@/components/provider-component"
import "./globals.css"
import GlobalContextProvider from "@/context/GlobalContext"
import FeedContextProvider from "@/context/FeedContext"

export const metadata = {
  title: "ColomboAI",
  description: "Your All-In-One Platform, Revolutionizing How You Search, Socialize, Shop, And Interact All Powered By Generative AI Technologies.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ProviderComponent>
          <GlobalContextProvider>
            <FeedContextProvider>
              {children}
            </FeedContextProvider>
          </GlobalContextProvider>
        </ProviderComponent>
      </body>
    </html>
  )
}
