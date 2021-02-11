import { Contract } from "../models/Contract.model"
import { Op } from "sequelize"


export class ContractsService {

  public async getContractByClientId(clientId: string, where?): Promise<Contract> {
    where = where ? where : []

    const contract = await Contract.findOne({
      where: {
        [Op.and]: [
          { clientId },
          ...where
        ]
      }
    })

    return contract
  }
}