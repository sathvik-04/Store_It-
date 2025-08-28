"use server";

import { ID, Query } from "node-appwrite";
import { appwriteConfig } from "../appwrite/config";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";
const getUserByEmail = async (email: string) => {
    const {  databases } = await createAdminClient();
    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersTableId,
        [Query.equal("email", [email])]
    );
    return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown , message: string) => {
    console.error(message, error);
    throw new Error(message);
};

const sendEmailOTP = async({email}: {email: string}) => {
    const { account } = await createAdminClient();
    try{
        const session = await account.createEmailToken(ID.unique(), email); 
        return session.userId;
    } catch(error){
        handleError(error, 'Failed to send email OTP');
    }
};

export const createAccount = async ({ fullName, email }: { fullName: string; email: string; }) => {
    const existingUser = await getUserByEmail(email);

    const accountId = await sendEmailOTP({email});
    if(!accountId) throw new Error('Failed to send an OTP');

    if(!existingUser){
        const { databases } = await createAdminClient();
        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersTableId,
            ID.unique(),
            {
                fullName,
                email,
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK4qEfbnd-RN82wdL2awn_PMviy_pelocqQ&s",
                accountId,
            }
        );
    }

   return parseStringify({accountId});

};
