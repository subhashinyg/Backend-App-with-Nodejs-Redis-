import { IDesignation } from "../interface/user-interface";
import { EDesgination } from "./enum/auth-enum";

export const initial_designation:IDesignation[] = [
    {
        name:EDesgination.CEO,
        public:true
    },
    {
        name:EDesgination.ASSOCIATE,
        public:true
    },
    {
        name:EDesgination.MANAGER,
        public:true
    },
    {
        name:EDesgination.EMPLOYEE,
        public:true
    },
    {
        name:EDesgination.FREELANCER,
        public:true
    }
]