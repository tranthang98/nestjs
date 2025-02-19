import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/common/base.schema';

export type SubscriberDocument = HydratedDocument<Subscriber>;

@Schema({ timestamps: true })
export class Subscriber extends BaseSchema {

    @Prop({ required: true })
    email: string;

    @Prop()
    name: string;

    @Prop()
    skills: string[];

}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);