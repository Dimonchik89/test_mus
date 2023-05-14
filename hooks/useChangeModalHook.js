import { useState } from "react"

const useChangeModalHook = () => {
  const [fixModal, setFixModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [patreonModal, setPatreonModal] = useState(false)

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

  return {fixModal, errorModal, openFixModal, closeFixModal, openErrorModal, closeErrorModal, patreonModal, openPatreonModal, closePatreonModal}
}
export default useChangeModalHook;