import Amazon from "@config/Amazon";
import IOrganizationRepository from "@repositories/organization/IOrganizationRepository";
import TYPES from "@types";
import AWS from "aws-sdk";
import { inject, injectable } from "inversify";
import fs from "fs";
import IUploadImageOrganization from "./IUploadImageOrganization";
import { Failure } from "@errors/Failure";

@injectable()
class UploadImageOrganization implements IUploadImageOrganization {
    constructor(
        @inject(TYPES.organizationRepository)
        private readonly organizationRepository: IOrganizationRepository
    ) {
    }
    async execute(file: Express.Multer.File, idOrganization: number): Promise<any> {
        try {
            const resultFind = await this.organizationRepository.findById(idOrganization);

            if (!resultFind) {
                throw Failure.organizationNotExist;
            }

            const organizationDB = resultFind.right();
            const fileName = organizationDB.id + '_' + organizationDB.name + '.' + file.mimetype.match(/[^/]*$/);

            const s3 = new AWS.S3({
                accessKeyId: Amazon.aws_access_key_id,
                secretAccessKey: Amazon.aws_secret_acess_key,
                region: Amazon.aws_default_region,
                useAccelerateEndpoint: true
            });

            const fileStream = fs.readFileSync("./tmp/" + file.filename);
            const params = {
                ACL: 'public-read',
                Bucket: Amazon.bucket_name_logo,
                Key: fileName,
                ContentType: file.mimetype,
                Body: fileStream
            };

            const data = await s3.upload(params).promise();

            organizationDB.urlLogo = data.Location;
            delete organizationDB.languages;
            await this.organizationRepository.update(organizationDB, idOrganization);

            return data
        } catch (error) {
            return error
        }
    }
}

export default UploadImageOrganization;