import axiosInstance from "@/utils/axios";

export async function getPersonasByPrisonerId(prisonerId) {
    try {
        const response = await axiosInstance(`/api/personas/by-prisoner/${prisonerId}`);
        console.log("Response data:", response.data);
        console.log("Response status:", response.status);
        if (!response.status === 200) {
            if (response.status === 204) {
                return [];
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.data;
    } catch (error) {
        console.error("Failed to fetch personas:", error);
        throw error;
    }
}