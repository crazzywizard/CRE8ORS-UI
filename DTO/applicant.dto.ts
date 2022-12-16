import { IsNotEmpty, IsString } from "class-validator"

export class ApplicantDTO {
  @IsNotEmpty()
  @IsString()
  walletAddress: string

  @IsNotEmpty()
  @IsString()
  twitterHandle: string

  @IsNotEmpty()
  @IsString()
  reason: string

  @IsNotEmpty()
  @IsString()
  creatorType: string
}
