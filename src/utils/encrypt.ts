import bcrypt from "bcrypt";
import DIC from "./dic";


const encrypt = async (password: string) => {
    return await bcrypt.hash(password, DIC.SALT_ROUND);
}

const compare = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}

export  { encrypt,  compare }


