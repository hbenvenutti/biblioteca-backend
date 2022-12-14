import { UserCreationData } from '@accounts:dtos/Users.dto';
import { User } from '@accounts:entities/User';
import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';

// ---------------------------------------------------------------------------------------------- //

export class UsersRepositoryMock implements UsersRepositoryInterface {
  private users: User[] = [];

  async create(data: UserCreationData): Promise<User> {
    const { name, lastName, password, email } = data;

    const id = `${name}${lastName}${email}`;

    const user: User = {
      id,
      name,
      lastName,
      email,
      password
    };

    this.users.push(user);

    return user;
  }

  list(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  findById(_: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }

  delete(_: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
