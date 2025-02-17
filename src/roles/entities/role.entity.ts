import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/common/base.schema';
import { Permission } from 'src/permissions/entities/permission.entity';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role extends BaseSchema {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    isActive: boolean;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Permission.name })
    permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);