
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/common/base.schemas';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends BaseSchema {

    @Prop()
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    age: number;

    @Prop()
    gender: string;

    @Prop()
    address: string;

    @Prop({ type: Object })
    company: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
    };

    @Prop()
    role: string;

    @Prop()
    refreshToken: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
