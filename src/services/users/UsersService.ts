import { getCustomRepository } from 'typeorm';
import UsersRepository from '../../repositories/users/UsersRepository';

interface Request {
  email: string;
}

class UsersService {
  public async execute({ email }: Request) {
    const usersRepository = getCustomRepository(UsersRepository);
    // Verificar se o usuário existe
    const userExists = await usersRepository.findOne({ email });

    // Se existir, retornar user
    if (userExists) {
      return userExists;
    }

    // Se não existir, salvar no DB
    const user = usersRepository.create({ email });

    await usersRepository.save(user);

    return user;
  }
}

export default UsersService;
