import axios from "axios"

export const downloadFile = async ({e, track}) => {
    e.preventDefault()
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music/download?filename=${track?.audio}`)
    if(response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = downloadUrl
        link.download = track.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}