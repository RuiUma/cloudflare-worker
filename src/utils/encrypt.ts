import bcrypt from "bcrypt";

const saltRounds = 10;

const encrypt = async (password: string) => {
    return await bcrypt.hash(password, saltRounds);
}

const compare = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}

export  default { encrypt,  compare }


