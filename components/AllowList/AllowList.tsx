import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import AllowListForm from "../AllowListForm"
import AllowListMintButton from "../AllowListMintButton"

const AllowList = () => {
  const [cre8orType, setCre8orType] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [twitterHandle, setTwitterHandle] = useState("")
  const [whyCre8or, setWhyCre8or] = useState("")
  const [signedUp, setSignedUp] = useState(false)

  const handleSignUp = async () => {
    try {
      await axios.post(
        "/api/allowlist",
        {
          walletAddress,
          twitterHandle,
          reason: whyCre8or,
          creatorType: cre8orType,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ALLOWLIST_API_KEY}`,
          },
        },
      )
      setSignedUp(true)
      setCre8orType("")
      setWalletAddress("")
      setTwitterHandle("")
    } catch (e) {
      toast.error("Error signing up, please try again!")
    }
  }
  return (
    <>
      {!signedUp && (
        <AllowListForm
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          twitterHandle={twitterHandle}
          setTwitterHandle={setTwitterHandle}
          whyCre8or={whyCre8or}
          setWhyCre8or={setWhyCre8or}
          creatorType={cre8orType}
          setCreatorType={setCre8orType}
          handleSignUp={handleSignUp}
        />
      )}
      {signedUp && (
        <AllowListMintButton
          whyCre8or={whyCre8or}
          setWhyCre8or={setWhyCre8or}
          setSignedUp={setSignedUp}
        />
      )}
    </>
  )
}

export default AllowList
