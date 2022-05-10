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
  constructor(props) {
    super(props)

    this.canvasRef = React.createRef()
  }

  static propTypes = {
    state: PropTypes.string,
    type: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    foregroundColor: PropTypes.string,
    canvasWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    canvasHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    onStop: PropTypes.func,
  }
  static defaultProps = {
    state: RecordState.NONE,
    type: 'audio/wav',
    backgroundColor: 'rgb(200, 200, 200)',
    foregroundColor: 'rgb(0, 0, 0)',
    canvasWidth: 300,
    canvasHeight: 300,
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
    this.canvas = this.canvasRef.current
    this.canvasCtx = this.canvas.getContext('2d')
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
      if (e.playbackTime > 5) {
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
    this.visualize()
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

  visualize = () => {
    this.WIDTH = this.canvas.width
    this.HEIGHT = this.canvas.height
    this.CENTERX = this.canvas.width / 2
    this.CENTERY = this.canvas.height / 2

    if (!this.analyser) return

    this.analyser.fftSize = 2048
    const bufferLength = this.analyser.fftSize
    const dataArray = new Uint8Array(bufferLength)

    this.canvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT)

    let self = this
    const draw = function () {
      self.drawVisual = requestAnimationFrame(draw)

      self.analyser.getByteTimeDomainData(dataArray)

      self.canvasCtx.fillStyle = 'rgb(0, 0, 0)'

      self.canvasCtx.fillRect(0, 0, self.WIDTH, self.HEIGHT)

      self.canvasCtx.lineWidth = 2
      self.canvasCtx.strokeStyle = 'rgb(255, 255, 255)'

      self.canvasCtx.beginPath()

      var sliceWidth = (self.WIDTH * 1.0) / bufferLength
      var x = 0

      for (var i = 0; i < bufferLength; i++) {
        self.canvasCtx.clearRect(0, 0, self.WIDTH, self.HEIGHT)
        var v = dataArray[i] / 128.0
        var y = (v * self.HEIGHT) / 2

        if (i === 0) {
          self.canvasCtx.moveTo(x, y)
        } else {
          self.canvasCtx.lineTo(x, y)
        }

        x += sliceWidth
      }

      self.canvasCtx.lineTo(self.canvas.width, self.canvas.height / 2)
      self.canvasCtx.stroke()
    }
    draw()
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
    const { canvasWidth, canvasHeight } = this.props

    return (
      <div style={{ margin: '0 50px' }}>
        <canvas ref={this.canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
      </div>
    )
  }
}
