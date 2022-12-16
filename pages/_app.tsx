import "../styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import type { AppProps } from "next/app"
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { allChains, configureChains, createClient, WagmiConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react"

const { chains, provider, webSocketProvider } = configureChains(
  allChains.filter(
    (c) =>
      c.id === Number(process.env.NEXT_PUBLIC_CHAIN_ID) ||
      c.id === Number(process.env.NEXT_PUBLIC_ALLOW_LIST_CHAIN_ID),
  ),
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      stallTimeout: 1_000,
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
  ],
)

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <ThirdwebProvider
          sdkOptions={{
            gasless: {
              openzeppelin: {
                relayerUrl: String(process.env.NEXT_PUBLIC_OPENZEPPELIN_URL),
                relayerForwarderAddress: "0xc82BbE41f2cF04e3a8efA18F7032BDD7f6d98a81",
              },
            },
            gasSettings: { speed: "fastest", maxPriceInGwei: 1000 },
          }}
          desiredChainId={ChainId.Mumbai}
          supportedChains={[ChainId.Mumbai, ChainId.Goerli]}
        >
          <Component {...pageProps} />
        </ThirdwebProvider>
        <ToastContainer />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
export default MyApp
