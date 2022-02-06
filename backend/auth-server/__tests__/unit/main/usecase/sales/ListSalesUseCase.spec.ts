import { Pagination } from "@database/Pagination";
import ILoginUseCase from "../../../../main/useCases/login/ILoginUseCase";
import ListSalesUseCase from "../../../../main/useCases/login/LoginUseCase";

describe('List sales', () => {
  class SaleRepository implements ISaleRepository {
    setPagination(pagination: Pagination): void {
      throw new Error("Method not implemented.");
    }
    async find(): Promise<{ sales: Sale[]; count: number; }> {
      let sales: Sale[] = [];
      let count: number = 1;

      return {sales, count};
    }
    save(diff: Sale): Promise<Sale> {
      throw new Error("Method not implemented.");
    }

  }
  it('should list all sales', async () => {
    let repository: ISaleRepository =  new SaleRepository();
    let listSalesUseCase: ILoginUseCase = new ListSalesUseCase(repository);
    let list = await listSalesUseCase.execute();
    console.log(list);
  });
})