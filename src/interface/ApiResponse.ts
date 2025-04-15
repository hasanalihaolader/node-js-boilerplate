export interface ApiResponse {
	code: number;
	message: string;
	data: Record<string, any>;
}