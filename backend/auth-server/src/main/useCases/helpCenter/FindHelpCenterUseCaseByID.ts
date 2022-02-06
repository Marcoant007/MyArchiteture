import { Failure } from "@errors/Failure";
import { HelpPages } from "@models/HelpPages";
import IHelpCenterRepository from "@repositories/helpCenter/IHelpCenterRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import fs from 'fs';
import Pino from "@util/Pino";
import path from "path";
import showdown from "showdown";
import S3 from 'aws-sdk/clients/s3';
import AWS from 'aws-sdk';
import Amazon from "@config/Amazon";
import IFindHelpCenterByIDUseCase from "./IFindHelpCenterByIDUseCase";


@injectable()
class FindHelpCenterByIDUseCase implements IFindHelpCenterByIDUseCase {
    constructor(
        @inject(TYPES.helpeCenterRepository)
        private readonly helpCenterRepository: IHelpCenterRepository
    ) { }

    public async execute(id: number): Promise<string> {

        const helpPagesResult = await this.helpCenterRepository.findByID(id);

        if (helpPagesResult.isLeft()) {
            throw Failure.helpCenterError;
        }
        const helpDB = helpPagesResult.right();

        await this.getAwsDownloadLink(helpDB.filename);

        await this.getFileFromAwsAndSaveFolder(helpDB.filename);

        let content = await this.readMarkdownFileContent(helpDB.filename);

        let convertMarkdownToHtml = await this.convertMarkdownToHtml(content);

        return convertMarkdownToHtml;
    }

    private async getAwsDownloadLink(filename: string) {
        try {
            const s3 = new AWS.S3({
                accessKeyId: Amazon.aws_access_key_id,
                secretAccessKey: Amazon.aws_secret_acess_key,
                region: Amazon.aws_default_region,
                useAccelerateEndpoint: true
            });
            const nameFile = filename;
            const bucket = Amazon.bucket_name;
            const url = s3.getSignedUrl('getObject', {
                Bucket: bucket,
                Key: nameFile,
            });

            return url;

        } catch (error) {
             throw Failure.AmazonS3Error
        }
    }

    private async getFileFromAwsAndSaveFolder(filename: string) {
        try {
            const bucket = Amazon.bucket_name;
            AWS.config.update(
                {
                    accessKeyId: Amazon.aws_access_key_id,
                    secretAccessKey: Amazon.aws_secret_acess_key,
                    region: Amazon.aws_default_region
                }
            );
            const s3 = new AWS.S3();
            const options = {
                Bucket: bucket,
                Key: filename,
            };
            var filePath = path.resolve('./');
            const directoryPath = path.join(filePath, 'tmp', filename);

            const { Body } = await s3.getObject(options).promise();

            fs.writeFileSync(directoryPath, <Buffer> Body);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    private async convertMarkdownToHtml(markdown) {
        try {
            let converter = new showdown.Converter();
            let html = converter.makeHtml(markdown);
            return html;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    private async readMarkdownFileContent(filepath: string) {
        try {
            var filePath = path.resolve('./');
            const directoryPath = path.join(filePath, 'tmp', filepath);
            let file = fs.readFileSync(directoryPath, 'utf8');
            return file;
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

export default FindHelpCenterByIDUseCase