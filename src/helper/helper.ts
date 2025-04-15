import type { ApiResponse } from "@/interface/ApiResponse";

const Helper = {
	formatApiResponse: (
		statusCode: number,
		message: string,
		context: Record<string, any> = {},
	): ApiResponse => {
		return {
			code: statusCode,
			message: message,
			data: context,
		};
	},
};

export default Helper;
