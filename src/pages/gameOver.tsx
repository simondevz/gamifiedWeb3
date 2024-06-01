import bgImage from "../assets/home_bg.jpeg";
import profilePic from "../assets/profile_pic.png";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useWriteContract, useAccount, useWatchContractEvent } from "wagmi";
import ClaimTokenAbi from "../components/abis/ClaimToken.json";
import AchievmentAbi from "../components/abis/Achievment.json";
import axios from "axios";

export default function GameOver() {
  const location = useLocation();
  const game = location.pathname.includes("scrabble") ? "scrabble" : ""; // Todo if Introducing other games add conditions for their name
  const score = useAppSelector((state) => state.app.score);

  const navigate = useNavigate();
  const [newHighscore, setNewHighScore] = useState(false);
  const { writeContractAsync } = useWriteContract();

  const { address } = useAccount();
  const [tokenClaimed, setTokenClaimed] = useState(false);
  const [tokenClaimeText, setTokenClaimeText] = useState("Claim Token");

  const nftBaseurl = useAppSelector((state) => state.app.nftbaseurl);
  const [achievmentClaimed, setAchievmentClaimed] = useState(false);
  const [achievmentClaimText, setAchievmentClaimText] = useState(
    "Mint Achievment Nft"
  );

  useWatchContractEvent({
    address: process.env.ACHIEVMENT_NFT_ADDRESS as `0x${string}`,
    abi: AchievmentAbi,
    eventName: "AchievementMinted",
    onLogs(logs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log("New logs!", (logs[0] as any).args);
      (async () => {
        const metadata = {
          description: "Your Current Highscore at Learn3Play",
          external_url:
            "https://asset.cloudinary.com/df4c9rdyq/730941af3f3faf9da2d80543c61f392e",
          name: "Highscore",
          image:
            "https://asset.cloudinary.com/df4c9rdyq/730941af3f3faf9da2d80543c61f392e",
          attributes: [
            {
              trait_type: "Score",
              value: score,
            },
          ],
        };

        const requestData = {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tokenId: Number((logs[0] as any).args.achievementId),
          metadata,
        };
        console.log(requestData);

        const { data } = await axios.post(nftBaseurl, {
          data: requestData,
        });
        console.log(data);

        setAchievmentClaimText("Achievment Minted.");
      })();
    },
  });

  // Check if the player made a new highscore and store the score, in local storage for now
  useEffect(() => {
    const highscoreKey = "HIGHSCORE";
    const highscore = Number(
      JSON.parse(localStorage.getItem(highscoreKey) || "0")
    );
    if (highscore < score) {
      setNewHighScore(() => true);
      // localStorage.setItem(highscoreKey, score.toString())
    }
  }, [score]);

  // Claim token function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const claimTokens = async (event: any) => {
    event.preventDefault();

    try {
      setTokenClaimeText("Claiming...");
      if (address)
        await writeContractAsync({
          abi: ClaimTokenAbi as unknown[],
          address: process.env.CLAIM_TOKEN_ADDRESS as `0x${string}`,
          functionName: "claim",
          args: [parseEther(score.toString())],
        });
      setTokenClaimed(() => true);
      setTokenClaimeText("Tokens Claimed");
    } catch (err) {
      console.log(err);
    }
  };

  // Minting Achievements
  const mintAchiement = async () => {
    try {
      setAchievmentClaimText("Minting Achievment...");
      if (address)
        await writeContractAsync({
          abi: AchievmentAbi as unknown[],
          address: process.env.ACHIEVMENT_NFT_ADDRESS as `0x${string}`,
          functionName: "mintAchievement",
          args: [address, "Highscore Achievment", 0, false],
        });

      setAchievmentClaimed(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
      className="flex w-screen  bg-cover bg-center bg-no-repeat scale-x-[-1]"
    >
      <div className="flex flex-col gap-16 p-12 w-full h-screen bg-white/40 scale-x-[-1]">
        <div className="flex justify-center w-full">
          <div className="flex w-full justify-between ">
            <div className="flex w-full">
              <button
                onClick={() => navigate("/")}
                className="p-2 flex justify-center bg-primary rounded-md "
              >
                <span className="my-auto text-white">
                  <MdOutlineKeyboardArrowLeft size={"1.5rem"} />
                </span>
              </button>
            </div>
            <h1 className="bg-gradient-to-b from-primary via-primary to-white inline-block text-transparent bg-clip-text -my-4 font-racing text-[3rem] uppercase">
              {game.toString()}
            </h1>
            <span className="flex w-full"></span>
          </div>
        </div>
        <div className="flex flex-col w-full gap-8">
          <div className="flex w-full justify-center ">
            <span className="bg-gradient-to-b from-primary via-primary to-white inline-block text-transparent bg-clip-text -my-4 font-racing text-[2rem] capitalize">
              Score: {score}
            </span>
          </div>
          <span className="flex w-full justify-center ">
            <span
              style={{
                backgroundImage: `url(${profilePic})`,
              }}
              className="flex bg-cover bg-center bg-no-repeat h-48 w-52 rounded-3xl border-2 border-primary"
            ></span>
          </span>
          <div className="flex w-full flex-col gap-4 justify-center ">
            {newHighscore && (
              <span className="mx-auto w-fit bg-gradient-to-l from-transparent via-dark_text_bg from-5% via-90% text-center py-[0.2rem] px-8 text-white">
                Achievement Unlocked: New highscore
              </span>
            )}
            {score > 0 && (
              <span className="mx-auto w-fit bg-gradient-to-l from-transparent via-dark_text_bg from-5% via-90% text-center py-[0.2rem] px-8 text-white">
                You earned {score} L3P
              </span>
            )}
          </div>
          <div className="flex w-full justify-center gap-4">
            {score > 0 && (
              <button
                onClick={claimTokens}
                disabled={tokenClaimed}
                className="flex px-6 py-2 bg-primary rounded-full text-white font-inter disabled:bg-ash-700"
              >
                <span>{tokenClaimeText}</span>
              </button>
            )}

            {newHighscore && (
              <button
                onClick={mintAchiement}
                disabled={achievmentClaimed}
                className="flex px-6 py-2 bg-primary rounded-full text-white font-inter"
              >
                <span>{achievmentClaimText}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
