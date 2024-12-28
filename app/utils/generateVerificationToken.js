import jwt from 'jsonwebtoken';

// generates token for newly created account
export async function generateVerificationToken(userData) {
    const { id, email } = userData;
    
    try {
        const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "12h" });
        return token;

    } catch (error) {
        console.error("Failed generating verification token", error)
    }
}
