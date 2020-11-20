export interface ICreateBlogRequest {
    title: string;
    content: string;
    categories: string[];
    imageUrl: string;
    description?: string;
}
