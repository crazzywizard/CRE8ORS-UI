/* eslint-disable class-methods-use-this */
import { createHandler, Post, Body, ValidationPipe } from "next-api-decorators"
import { ApplicantDTO } from "../../../DTO/applicant.dto"
import dbConnect from "../../../utils/db"
import { ApplicantRegistered } from "../../../middleware/unique.middleware"
import AllowList from "../../../Models/AllowList"
import { AllowListAuthGuard } from "../../../middleware/auth.middleware"

class AllowListApplicants {
  @Post()
  @AllowListAuthGuard()
  @ApplicantRegistered()
  async addAllowListApplicant(@Body(ValidationPipe) body: ApplicantDTO) {
    try {
      await dbConnect()
      const result = await AllowList.create(body)
      return { sucess: true, result }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default createHandler(AllowListApplicants)
