import { prisma } from '$lib/server/lucia/prisma';
import { generateRandomString, isWithinExpiration} from "lucia/utils";

export async function generateResetPasswordToken(userId: string){
	try {
		
		const expiresIn = 1000 * 60 * 10 ;
		const storedUserTokens = await prisma.resetPasswordToken.findMany({
		where:{
			user_id: userId
		}
	})
	if(storedUserTokens.length>0) {
		const reusableUserToken = storedUserTokens.find(token => isWithinExpiration(Number(token.expires)- expiresIn /2 ));
		if (reusableUserToken) return reusableUserToken.value;
	}
	const token = generateRandomString(32);
	await prisma.resetPasswordToken.create({
		data: {
			value: token,
			user_id: userId,
			expires: new Date().getTime() + expiresIn
		}
	})
	return token;
	} catch (error) {
		console.log(error)
	}
}


export async function validateResetPasswordToken(token: string){
	const storedUserToken = await prisma.$transaction(async (tx)=>{
		const storedToken = await prisma.resetPasswordToken.findUnique({
			where:{
				value: token
			}
		})
		if(!storedToken)  throw new Error('INVALID_TOKEN');
		await prisma.resetPasswordToken.delete({
			where:{
				value: token
			}
		})
		return storedToken;
	})
	const expiresAt = Number(storedUserToken.expires);
	if(!isWithinExpiration(expiresAt)) throw new Error('EXPIRED_TOKEN');
	return storedUserToken.user_id;
}