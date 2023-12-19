import { User } from '../../entity/User';
import { AppDataSource } from '../../db/DBconnection';
import { userdto } from '../../dto/UserDto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Task } from '../../entity/task';

export class UserService {
  private userrepo = AppDataSource.getRepository(User);

  async createUser(dto: userdto): Promise<User> {
    const hashedpassword = await bcrypt.hash(dto.password, 10);
    const newUser = new User();
    newUser.username = dto.username;
    newUser.email = dto.email;
    newUser.password = hashedpassword;
    newUser.isAdmin = dto.isAdmin;
    newUser.permission = dto.permission;
    return await this.userrepo.save(newUser);
  }

  async getAllUser(): Promise<User[]> {
    return await this.userrepo.find();
  }

  async getUserById(id: any): Promise<User | null> {
    return this.userrepo.findOne({ where: { id }, relations: ['task'] });
    //Finds first entity by a given find options. If entity was not found in the database - returns null.
  }

  async DeleteUser(id: number): Promise<User | any> {
    const data = await this.userrepo.findOne({ where: { id } });
    if (!data) {return null}
    return await this.userrepo.update(data.id, { isdeletedAt: true });
  }

  async LoginUser(email: string, password: string): Promise<any> {
    const viewdata = await this.userrepo.findOne({ where: { email } });
    if (viewdata) {
      const comparepass = await bcrypt.compare(password, viewdata.password);
      if (comparepass) {const token = await jwt.sign({ id: viewdata.id },'THISISMYTOKENSECRETKEY');
        return token;
      }
    } else {
      return null;
    }
  }

  async UpdateUser(id: number, dto: userdto): Promise<any> {
    await this.userrepo.update(id, dto);
    return this.userrepo.findOne({ where: { id } });
  }

  async AdminLogin(email: string, password: string): Promise<any> {
    const data = await this.userrepo.findOne({ where: { email } });
    console.log(data);
    if (data?.isAdmin == true) {
      const checkpass = await bcrypt.compare(password, data.password);
      if (!checkpass) {
        return null;
      } else {
        const token = await jwt.sign({ id: data.id }, 'THISISADMINTOKENKEY');

        return token;
      }
    }
  }

  async adminLogOut(email: string, password: string): Promise<any> {
    const data = await this.userrepo.findOne({ where: { email } });
    if (!data) {
      return null;
    } else {
      const checkpass = await bcrypt.compare(password, data.password);
      if (!checkpass) {
        return null;
      }
      return data;
    }
  }

  async forgetpassword(email: string): Promise<any> {
    const user = await this.userrepo.findOne({ where: { email } });

    if (!user) {
      return null;
    }
    const token = await jwt.sign({ id: user.id }, 'THISISFORGETPASSWORDKEY', {
      expiresIn: '10m',
    });
    await this.userrepo.update({ id: user.id }, { token });
    const link = `http://localhost:3000/api/resetpassword/${token}`;
    return link;





  }

  async resetpassword(token: string,password:string): Promise<User | any> {
    const finduser = await this.userrepo.findOne({ where: { token } });
    if (!finduser?.token) {
      return null;
    }
    const veryfiytoken = await jwt.verify(token, 'THISISFORGETPASSWORDKEY');
    if (!veryfiytoken) {
      return null;
    }
    const savepass = await this.userrepo.update({ id: finduser.id },{ password:password });
    return savepass;
  }

  // async confirmpassword(password:string,confpassword:string):Promise<any>{
  //   const comparepass = await bcrypt.compare(password,confpassword)
  //   if(!comparepass){
  //     return null
  //   }
  //   const savepass = await this.userrepo.update
  // }

  async pagination(page: number, perpage: number): Promise<any> {
    const skip = (page - 1) * perpage;
    const take = perpage;

    const user = await this.userrepo.find({
      where: {
        isdeletedAt: false,
      },
      skip,
      take,
    });

    const totalcount = await this.userrepo.count();
    return { user, totalcount };
  }
}
