import { getCustomRepository, Repository } from 'typeorm';
import User from '../../models/users/User';
import UsersRepository from '../../repositories/users/UsersRepository';

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  public async execute(email: string) {
    // Verificar se o usuário existe
    const userExists = await this.usersRepository.findOne({ email });

    // Se existir, retornar user
    if (userExists) {
      return userExists;
    }

    // Se não existir, salvar no DB
    const user = this.usersRepository.create({ email });

    await this.usersRepository.save(user);

    return user;
  }
}

export default UsersService;
