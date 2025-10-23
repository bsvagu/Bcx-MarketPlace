import { sdk } from "./sdk";

export type SessionData = {
  userId: string;
  name: string;
  email: string;
  role: string;
};

export async function signJWT(sessionData: SessionData): Promise<string> {
  // Use the SDK's signSession method with the correct format
  return await sdk.signSession({
    openId: sessionData.userId,
    appId: "bcx-api-marketplace", // Use a consistent app ID
    name: sessionData.name,
  });
}

export async function verifyJWT(token: string): Promise<SessionData | null> {
  try {
    const session = await sdk.verifySession(token);
    if (!session) return null;
    
    // Note: The session from SDK contains openId, appId, name
    // We need to map this to our SessionData format
    // For now, we'll return a basic structure
    return {
      userId: session.openId,
      name: session.name,
      email: "", // This would need to be fetched from the user record
      role: "user", // This would need to be fetched from the user record
    };
  } catch (error) {
    return null;
  }
}
