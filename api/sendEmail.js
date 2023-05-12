
export const sendEmail = async (link) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/email`, 
            {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({link})
            }
        )
    return response
}