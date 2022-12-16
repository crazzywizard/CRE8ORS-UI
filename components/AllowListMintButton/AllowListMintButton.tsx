import { useState } from "react"
import { Web3Button } from "@thirdweb-dev/react"
import Confetti from "react-confetti"
import { toast } from "react-toastify"
import abi from "../../lib/abi-allow-list.json"
import useWindowSize from "../../lib/useWindowSize"

const AllowListMintButton = ({ whyCre8or, setWhyCre8or, setSignedUp }) => {
  const [startConfetti, setStartConfetti] = useState(false)
  const { width, height } = useWindowSize()
  const contractAddress = String(process.env.NEXT_PUBLIC_ALLOW_LIST_ADDRESS)
  const handleSuccess = () => {
    setStartConfetti(true)
    toast.success("NFT minted successfully!", { autoClose: 5000 })
    setTimeout(() => {
      setStartConfetti(false)
      if (whyCre8or.length) setWhyCre8or("")
      setSignedUp(false)
    }, 5000)
  }
  const handleError = () => {
    toast.error("Error minting NFT, looks like you already have one!")
  }

  return (
    <>
      {whyCre8or.length > 0 && (
        <Web3Button
          contractAddress={contractAddress}
          contractAbi={abi}
          action={(contract) => contract.call("purchase", 1, whyCre8or)}
          onSuccess={handleSuccess}
          onError={handleError}
          accentColor="#4287f5"
          colorMode="light"
        >
          Mint Receipt
        </Web3Button>
      )}
      {startConfetti && <Confetti width={width} height={height} />}
    </>
  )
}
export default AllowListMintButton
