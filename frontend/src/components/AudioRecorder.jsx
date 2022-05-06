import React from 'react'
import PropTypes from 'prop-types'

// https://github.com/doppelgunner/audio-react-recorder/blob/master/src/index.js

export const RecordState = Object.freeze({
  START: 'start',
  PAUSE: 'pause',
  STOP: 'stop',
  NONE: 'none',
})

export default class AudioReactRecorder extends React.Component {
  static propTypes = {
    state: PropTypes.string,
    type: PropTypes.string.isRequired,

    onStop: PropTypes.func,
  }
  static defaultProps = {
    state: RecordState.NONE,
    type: 'audio/wav',
  }

  componentDidMount() {
    this.init()
  }

  componentDidUpdate(prevProps, prevState) {
    const { state } = this.props

    this.checkState(prevProps.state, state)
  }

  checkState(previousState) {
    switch (previousState) {
      case RecordState.START:
        this.doIfState(RecordState.PAUSE, this.pause)
        this.doIfState(RecordState.STOP, this.stop)
        break
      case RecordState.PAUSE:
        this.doIfState(RecordState.START, this.resume)
        this.doIfState(RecordState.STOP, this.stop)
        break
      case RecordState.STOP:
        this.doIfState(RecordState.START, this.start)
        break
      default:
        this.doIfState(RecordState.START, this.start)
        break
    }
  }

  doIfState(state, cb) {
    if (this.props.state === state) {
      cb && cb()
    }
  }

  componentWillUnmount() {}

  init = async () => {
    this.leftchannel = []
    this.rightchannel = []
    this.recorder = null
    this.recording = false
    this.recordingLength = 0
    this.volume = null
    this.audioInput = null
    this.sampleRate = null
    this.AudioContext = window.AudioContext || window.webkitAudioContext
    this.context = null
    this.analyser = null
    this.stream = null
    this.tested = false

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
  }

  getStream = constraints => {
    if (!constraints) {
      constraints = { audio: true, video: false }
    }

    return navigator.mediaDevices.getUserMedia(constraints)
  }

  setUpRecording = () => {
    this.context = new this.AudioContext()
    this.sampleRate = this.context.sampleRate

    this.volume = this.context.createGain()

    this.audioInput = this.context.createMediaStreamSource(this.stream)

    this.analyser = this.context.createAnalyser()

    this.audioInput.connect(this.analyser)

    let bufferSize = 2048
    this.recorder = this.context.createScriptProcessor(bufferSize, 2, 2)

    this.analyser.connect(this.recorder)

    this.recorder.connect(this.context.destination)

    const self = this
    this.recorder.onaudioprocess = function (e) {
      // recording time 20sec limit
      if (e.playbackTime > 2) {
        self.stop()
        self.stream.getTracks().forEach(function (track) {
          track.stop()
        })
        self.context.close()
      }
      if (!self.recording) return
      let left = e.inputBuffer.getChannelData(0)
      let right = e.inputBuffer.getChannelData(1)
      if (!self.tested) {
        self.tested = true
        if (!left.reduce((a, b) => a + b)) {
          console.log('Error: There seems to be an issue with your Mic')
          self.stop()
          self.stream.getTracks().forEach(function (track) {
            track.stop()
          })
          self.context.close()
        }
      }
      self.leftchannel.push(new Float32Array(left))
      self.rightchannel.push(new Float32Array(right))
      self.recordingLength += bufferSize
    }
  }

  mergeBuffers = (channelBuffer, recordingLength) => {
    let result = new Float32Array(recordingLength)
    let offset = 0
    let lng = channelBuffer.length
    for (let i = 0; i < lng; i++) {
      let buffer = channelBuffer[i]
      result.set(buffer, offset)
      offset += buffer.length
    }
    return result
  }

  interleave = (leftChannel, rightChannel) => {
    let length = leftChannel.length + rightChannel.length
    let result = new Float32Array(length)

    let inputIndex = 0

    for (let index = 0; index < length; ) {
      result[index++] = leftChannel[inputIndex]
      result[index++] = rightChannel[inputIndex]
      inputIndex++
    }
    return result
  }

  writeUTFBytes = (view, offset, string) => {
    let lng = string.length
    for (let i = 0; i < lng; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }

  setupMic = async () => {
    try {
      window.stream = this.stream = await this.getStream()
    } catch (err) {
      console.log('Error: Issue getting mic', err)
    }

    this.setUpRecording()
  }

  start = async () => {
    await this.setupMic()

    this.recording = true
    this.leftchannel.length = this.rightchannel.length = 0
    this.recordingLength = 0
  }

  stop = () => {
    const { onStop, type } = this.props
    this.recording = false
    this.closeMic()

    this.leftBuffer = this.mergeBuffers(this.leftchannel, this.recordingLength)
    this.rightBuffer = this.mergeBuffers(this.rightchannel, this.recordingLength)
    let interleaved = this.interleave(this.leftBuffer, this.rightBuffer)

    let buffer = new ArrayBuffer(44 + interleaved.length * 2)
    let view = new DataView(buffer)

    this.writeUTFBytes(view, 0, 'RIFF')
    view.setUint32(4, 44 + interleaved.length * 2, true)
    this.writeUTFBytes(view, 8, 'WAVE')
    this.writeUTFBytes(view, 12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, 2, true)
    view.setUint32(24, this.sampleRate, true)
    view.setUint32(28, this.sampleRate * 4, true)
    view.setUint16(32, 4, true)
    view.setUint16(34, 16, true)
    this.writeUTFBytes(view, 36, 'data')
    view.setUint32(40, interleaved.length * 2, true)

    let lng = interleaved.length
    let index = 44
    let volume = 1
    for (let i = 0; i < lng; i++) {
      view.setInt16(index, interleaved[i] * (0x7fff * volume), true)
      index += 2
    }

    const blob = new Blob([view], { type: type })
    const audioUrl = URL.createObjectURL(blob)

    onStop &&
      onStop({
        blob: blob,
        url: audioUrl,
        type,
      })
  }

  pause = () => {
    this.recording = false
    this.closeMic()
  }

  resume = () => {
    this.setupMic()
    this.recording = true
  }

  closeMic = () => {
    this.stream.getAudioTracks().forEach(track => {
      track.stop()
    })
    this.audioInput.disconnect(0)
    this.analyser.disconnect(0)
    this.recorder.disconnect(0)
  }

  render() {
    return <></>
  }
}
