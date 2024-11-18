import axios from "axios"

export const getSpotifyAccessToken = async (
	clientId: string,
	code: string,
): Promise<{access_token:string, refresh_token:string}> => {
	const verifier = localStorage.getItem("verifier")

	const params = new URLSearchParams()
	params.append("client_id", clientId)
	params.append("grant_type", "authorization_code")
	params.append("code", code)
	params.append("redirect_uri", "http://localhost:3000")
	params.append("code_verifier", verifier!)

	const result = await axios.post(
		"https://accounts.spotify.com/api/token",
		params.toString(),
		{
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		},
	)

	const token_data = await result.data
	return token_data
}

