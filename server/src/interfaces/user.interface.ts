import { Document } from 'mongoose';
import { WorkExp } from 'src/schema/workexp.schema';

export interface IsUser extends Document {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly gender: string;
    readonly skills: string[];
    readonly phoneNumber: number;
    readonly jobTitle: string | null;
    readonly industry: string | null;
    readonly yearsOfExp: number;
    readonly workHistory: WorkExp[];
}
