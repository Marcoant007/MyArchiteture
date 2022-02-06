import ChargeDTO from "src/main/dto/ChargeDTO";

export default interface IFindChargesByOrganizationUseCase {
    execute(configPagination: any): Promise<{ charges: ChargeDTO[], count: number }>
}