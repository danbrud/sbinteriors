import { observable } from "mobx";


export class GeneralAdmin {
  @observable services = []
  @observable availableTransferMethods = []
}

export const GeneralAdminStore = new GeneralAdmin()