export class AppError extends Error {
	public readonly statusCode: number;
	public readonly isOperational: boolean;
	public readonly internalMessage: string;

	constructor(
		public readonly userMessage: string, // mensaje para el cliente
		statusCode = 500,
		internalMessage?: string, // opcional
		isOperational = true,
	) {
		super(internalMessage || userMessage); // mensaje base del Error
		this.statusCode = statusCode;
		this.internalMessage = internalMessage || userMessage;
		this.isOperational = isOperational;
		this.name = "AppError";

		if (isOperational) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
