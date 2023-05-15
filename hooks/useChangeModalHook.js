import { useState } from "react"

const useChangeModalHook = () => {
  const [fixModal, setFixModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [patreonModal, setPatreonModal] = useState(false)
  const [downloadModal, setDownloadModal] = useState(false)

  const openFixModal = () => {
    setFixModal(true)
  }

  const closeFixModal = () => {
    setFixModal(false)
  }

  const openErrorModal = () => {
    setErrorModal(true)
  }

  const closeErrorModal = () => {
    setErrorModal(false)
  }

  const openPatreonModal = () => {
    setPatreonModal(true)
  }

  const closePatreonModal = () => {
    setPatreonModal(false)
  }

  const openDownloadModal = () => {
    setDownloadModal(true)
  }

  const closeDownloadModal = () => {
    setDownloadModal(false)
  }

  return {fixModal, errorModal, openFixModal, closeFixModal, openErrorModal, closeErrorModal, patreonModal, openPatreonModal, closePatreonModal, downloadModal, openDownloadModal, closeDownloadModal}
}
export default useChangeModalHook;