import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';

@Injectable()
export class CompaniesService {

  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>
  ) { }

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    let company = await this.companyModel.create({
      ...createCompanyDto,
      createBy: {
        _id: user._id,
        email: user.email
      }
    })
    return company;
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    let company = await this.companyModel.updateOne(
      { _id: id }, {
      ...updateCompanyDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return company;
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return `not found company`;
    }
    await this.companyModel.updateOne(
      { _id: id }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    });
    return this.companyModel.softDelete({ _id: id });
  }
}
