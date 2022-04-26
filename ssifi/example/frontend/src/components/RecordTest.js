import { useCallback, useState } from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'

const ExportWav = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true })
  const [file, setFile] = useState('')

  const show = () => console.log(mediaBlobUrl)
  const download = useCallback(() => {
    const sound = new File([mediaBlobUrl], 'soundBlob', {
      lastModified: new Date().getTime(),
      type: 'audio/wav',
    })
    console.log(sound)

    setFile(sound)
  }, [mediaBlobUrl])

  const play = () => {
    const audio = new Audio(file)
    audio.loop = false
    audio.volume = 1
    audio.play()
  }

  const send = () => {
    const formData = new FormData()
    formData.append(file)
    // postRequest()
  }

  const make = () => {
    const link = document.createElement('a')
    link.href = mediaBlobUrl
    link.download = 'media.wav'
    link.click()
    link.remove()
  }
  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={show}>blob보기</button>
      <button onClick={download}>down</button>
      <button onClick={send}>보내기</button>
      <button onClick={play}>플레이</button>
      <button onClick={make}>만들기</button>
      <audio src={mediaBlobUrl} controls autoPlay />
    </div>
  )
}
export default ExportWav
