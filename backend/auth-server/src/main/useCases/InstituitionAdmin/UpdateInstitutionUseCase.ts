import Either from "@config/Either";
import { Failure } from "@errors/Failure";
import { InstituitionStatusEnum } from "@models/InstituitionStatusEnum";
import { Organization } from "@models/Organization";
import { OrganizationHasLanguage } from "@models/OrganizationHasLanguage";
import ILanguageOrganizationRepository from "@repositories/languageOrganization/ILanguageOrganizationRepository";
import IOrganizationRepository from "@repositories/organization/IOrganizationRepository";
import TYPES from "@types";
import { inject, injectable } from "inversify";
import InstituitionAdminDTO from "src/main/dto/InstituitionDTO";
import IUpdateInstitutionUseCase from "./IUpdateInstitutionUseCase";

@injectable()
class UpdateInstitutionUseCase implements IUpdateInstitutionUseCase {
    constructor(
        @inject(TYPES.organizationRepository)
        private readonly organizationRepository: IOrganizationRepository,
        @inject(TYPES.languageOrganizationRepository)
        private readonly languageOrganizationRepository: ILanguageOrganizationRepository
    ) {

    }
    public async execute(institution: InstituitionAdminDTO, id: number): Promise<Organization> {
        const institutionDb = await this.organizationRepository.findById(id);

        if (!institutionDb) {
            throw Failure.organizationNotExist;
        }

        this.languagesInstitutionCase(institution.languages);
        if (institution.status === InstituitionStatusEnum.Habilitado) {
            institution.active = true;
            institution.blocked = false;
        } else if (institution.status === InstituitionStatusEnum.Desabilitado) {
            institution.active = false;
            institution.blocked = false;
        } else if (institution.status === InstituitionStatusEnum.Bloqueado) {
            institution.active = false;
            institution.blocked = true;
        }

        const updateInstitution = await this.updateInstitutionFields(institution);
        const response = await this.organizationRepository.update(updateInstitution, id);
        if (response.isLeft()) {
            throw Failure.organizationUpdateError;
        }
        return updateInstitution;
    }

    private updateInstitutionFields(newData: InstituitionAdminDTO) {
        let updateDate = new Organization;
        updateDate.id = newData.id;
        updateDate.createdAt = newData.createdAt;
        updateDate.updatedAt = newData.updatedAt;
        updateDate.name = newData.name;
        updateDate.cnpj = newData.cnpj;
        updateDate.urlLogo = newData.urlLogo;
        updateDate.active = newData.active;
        updateDate.code = newData.code;
        updateDate.description = newData.description;
        updateDate.responsible = newData.responsible;
        updateDate.companyName = newData.companyName;
        updateDate.stateRegistration = newData.stateRegistration;
        updateDate.cellPhone = newData.cellPhone;
        updateDate.comercialPhone = newData.comercial_phone;
        updateDate.email = newData.email;

        return updateDate;
    }

    private async languagesInstitutionCase(languages: any) {
        await languages.forEach(async (relation: any) => {
            if (relation.language.active === false) {
                const resultDelete = await this.languageOrganizationRepository.deleteLanguageOrganization(relation.id);
                if (resultDelete.isLeft()) {
                    throw resultDelete.left()
                }
            }

            if (relation.organization_id !== undefined) {
                let newRelation = new OrganizationHasLanguage();
                newRelation.language = relation.language.id;
                newRelation.organization = relation.organization_id;
                const resultNewRelation = await this.languageOrganizationRepository.registerNewLanguageOrganization(newRelation);
                if (resultNewRelation.isLeft()) {
                    throw resultNewRelation.left()
                }
            }
        })
    }
}

export default UpdateInstitutionUseCase