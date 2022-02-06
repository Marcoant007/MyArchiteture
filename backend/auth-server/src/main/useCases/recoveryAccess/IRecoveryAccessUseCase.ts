import RecoveryAccess from "@models/RecoveryAccess";

export default interface IRecoveryAccess {
    execute(recoveryAccess: RecoveryAccess): Promise<object>;
}

