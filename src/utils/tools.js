function trimSpace(str) {
  return str.replace(/\s+/g, '')
}

function getDatas(res, navigate) {
  const { err_code, err_msg, data } = res
  return new Promise((resolve, reject) => {
    if (err_code === 10006) {
      navigate('/login')
      reject(err_msg)
      return
    }
    if (err_code === 0 && data) {
      resolve(data)
    } else {
      navigate('/error')
      reject(err_msg)
    }
  })
}
export { trimSpace, getDatas }
