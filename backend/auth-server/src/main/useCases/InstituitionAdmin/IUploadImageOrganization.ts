export default interface IUploadImageOrganization {
    execute(file: Express.Multer.File, idOrganization: number): Promise<any>;
}