import { Service } from '../models/Service.model'
import { TransferMethod } from '../models/TransferMethod.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { secretOrKey } from '../config/config'
import { validateLoginInput } from '../utils'
import { User } from '../models/User.model'

export class AdminService {

  public async getServices(): Promise<Service[]> {
    const services = await Service.findAll()
    return services
  }

  public async createService(body): Promise<Service> {
    const service = new Service(body)
    await service.save()

    return service
  }

  public async createTransferMethod(body): Promise<TransferMethod> {
    const transferMethod = new TransferMethod(body)
    await transferMethod.save()

    return transferMethod
  }

  public async getTransferMethods(): Promise<TransferMethod[]> {
    const transferMethods = await TransferMethod.findAll()
    return transferMethods
  }

  public async loginUser(body): Promise<{ success: boolean, errors?: {}, code?: number, token?: any }> {
    const { username, password } = body
    const { errors, isValid } = validateLoginInput({ username, password })

    if (!isValid) { return { success: false, errors, code: 400 } }

    const user = await User.findOne({ where: { username } })
    if (!user) {
      return {
        success: false, errors: { error: 'Username not found' }, code: 404
      }
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const payload = {
        id: user.id,
        clientId: user.clientId,
        role: user.role
      }

      const token = jwt.sign(
        payload,
        secretOrKey,
        {
          expiresIn: 31556926
        },
        // (err, token) => {
        //   res.json({
        //     success: true,
        //     token: 'Bearer ' + token
        //   })
        // }
      )
      return { success: true, token }
    } else {
      return {
        success: false, errors: { error: 'Password incorrect' }, code: 400
      }
    }
  }
}