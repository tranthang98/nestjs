import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/common/base.schema';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true })
export class Permission extends BaseSchema {
    @Prop()
    name: string;

    @Prop()
    apiPath: string;

    @Prop()
    method: string;

    @Prop()
    module: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);