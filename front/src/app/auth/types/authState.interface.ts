export interface AuthStateInterface {
    isSubmitting: boolean,
    token: string,
    userId : string,
    roleIds: [number]
}
