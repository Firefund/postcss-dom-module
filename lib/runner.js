/**
 * Spawn child process helper.
 * @param {object} _ref
 * @param  {string} _ref.exec       - path to executable, default: process.execPath
 * @param  {string} _ref.file       - path to file you want to execute with exec
 * @param  {string[]} _ref.args     - default: []
 * @param  {object} _ref.env        - default: process.execPath
 * @param  {string[]} _ref.stdio    - default: ["ignore", "ignore", "ignore"]
 * @param  {boolean[]} _ref.pipes   - default: [false, false, false]}
 * @param  {boolean[]} _ref.mutiple - NOT IMPLEMENTED determine how many process to create, default: 1
 * @return {child_process} A child process running your file
 */
function createChild({
    exec=process.execPath,
    file,
    args=[],
    env=process.env,
    stdio=["ignore", "ignore", "ignore"],
    pipes=[false, false, false],
    multiple=1
})
{
  if(!file) throw new TypeError("path to the file you want to execute is omitted")

  const spawnArgs = [file, ...args], // prepend file to args
				child = spawn(exec, spawnArgs, { env, stdio }),
        fileDescriptorNames = ["stdin", "stdout", "stderr"]
// console.log("spawnArgs", spawnArgs)

  //setEncoding to utf8 for stdio file descriptors that is set to pipe
  //to get a string instead of a bufffer when reading from them
  const fileDescriptors = fileDescriptorNames.map((fd, n) =>
    stdio[n] === "pipe" ? child[fd].setEncoding("utf8") : child[fd]
  )
// console.dir(fileDescriptors)

  // auto remove file descriptor if they are closed
  fileDescriptors.forEach(autoRemoveFileDescriptor)
  // remove file descriptors if user ctrl+c
  process.on('SIGINT', () => { fileDescriptors.forEach(closeFileDescriptor) })

  child.on("close", (code, signal) => {
    fileDescriptors.forEach(closeFileDescriptor)
  })

  // for each true item in pipes,
  // auto pipe file descriptors to their corresponding process file descriptor
  fileDescriptors.forEach(pipeToProcess)

  return child


  function autoRemoveFileDescriptor(fd, n, all) {
    if(fd === null) return
    fd.on("close", () => {
      const indexOfFileDescriptor = all.indexOf(fd)
      if(indexOfFileDescriptor > -1) all[indexOfFileDescriptor] = null
    })
  }
  function closeFileDescriptor(fd) {
    if(fd !== null && fd.destroyed === false) fd.destroy()
  }
  function pipeToProcess(fd, n) {
    if(fd !== null && pipes[n]) fd.pipe(process[fileDescriptorNames[n]])
  }
}

export default createChild