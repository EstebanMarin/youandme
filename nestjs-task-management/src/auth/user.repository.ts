import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    private async hashPassword(password : string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword (authCredentials : AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentials;
        const user = await this.findOne({ username })
        if(user && await user.validatePassword(password)){
            return user.username;
        } else {
            return null;
        }
    }

    async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentials;
        const user = new User();
        user.salt = await bcrypt.genSalt();
        const hashPassword =  await this.hashPassword(password, user.salt);

        user.username = username;
        user.password = hashPassword;

        try {
            await user.save();
        } catch(error) {
            if (error.code === '23505') {
                throw new ConflictException('Duplicate username')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}