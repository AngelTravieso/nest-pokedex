export interface HttpAdapter {

    // Get esperando un genérico
    get<T>( url: string ): Promise<T>;

}